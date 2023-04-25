import React, { memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row } from "reactstrap";
import Button, { BtnType } from "components/common/buttons/Button";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { AdminGetTours, ETour } from "models/enterprise";
import { useDispatch } from "react-redux";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { TourService } from "services/enterprise/tour";
import SearchNotFound from "components/SearchNotFound";
import PopupConfirmWarning from "components/Popup/PopupConfirmWarning";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import TableHeader from "components/Table/TableHeader";
import { DataPagination, TableHeaderLabel } from "models/general";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { useRouter } from "next/router";
import useDebounce from "hooks/useDebounce";
import InputSearch from "components/common/inputs/InputSearch";
import { FindAll, IStaff } from "models/enterprise/staff";
import { StaffService } from "services/enterprise/staff";
import PopupSendOffer from "./components/PopupSendOffer";
import { getRoleUser } from "utils/getOption";
import StatusChip from "components/StatusChip";

const tableHeaders: TableHeaderLabel[] = [
  { name: "id", label: "Staff Id", sortable: false },
  { name: "name", label: "Name", sortable: false },
  { name: "role", label: "Role", sortable: false },
  { name: "status", label: "Status", sortable: false },
  { name: "actions", label: "Actions", sortable: false },
];

interface Props {
  handleTourEdit?: () => void;
}
// eslint-disable-next-line react/display-name
const Staff = memo(({ handleTourEdit }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [staffDelete, setStaffDelete] = useState<IStaff>(null);
  const [keyword, setKeyword] = useState<string>("");
  const [data, setData] = useState<DataPagination<IStaff>>();
  const [openPopupSendOffer, setOpenPopupSendOffer] = useState(false);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    newPage: number
  ) => {
    fetchData({
      page: newPage + 1,
    });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    fetchData({
      take: Number(event.target.value),
      page: 1,
    });
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    _onSearch(e.target.value);
  };

  const fetchData = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
  }) => {
    const params: FindAll = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: keyword,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    StaffService.findAll(params)
      .then((res) => {
        setData({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const _onSearch = useDebounce(
    (keyword: string) => fetchData({ keyword, page: 1 }),
    500
  );

  const onOpenPopupSendOffer = () => setOpenPopupSendOffer(!openPopupSendOffer);

  const onRedirectOfferStaff = () => {
    router.push("/enterprises/staffs/list-offers");
  };

  const onShowConfirmDelete = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: IStaff
  ) => {
    setStaffDelete(item);
  };

  const onClosePopupConfirmDelete = () => {
    if (!staffDelete) return;
    setStaffDelete(null);
  };

  const onYesDelete = () => {
    if (!staffDelete) return;
    onClosePopupConfirmDelete();
    dispatch(setLoading(true));
    StaffService.delete(staffDelete?.id)
      .then(() => {
        dispatch(setSuccessMess("Delete successfully"));
        fetchData();
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    fetchData();
    console.log(fetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3>Staffs</h3>
        </Row>
        <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
          <div className={classes.boxInputSearch}>
            <InputSearch
              autoComplete="off"
              placeholder="Search ..."
              value={keyword || ""}
              onChange={onSearch}
            />
          </div>
          <Button btnType={BtnType.Primary} onClick={onOpenPopupSendOffer}>
            <FontAwesomeIcon icon={faPlus} />
            Create
          </Button>
          <Button btnType={BtnType.Outlined} onClick={onRedirectOfferStaff}>
            <ScheduleSendIcon />
            Offers Staff
          </Button>
        </Row>
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          <Table className={classes.table}>
            <TableHeader headers={tableHeaders} />
            <TableBody>
              {data?.data?.length ? (
                data.data?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell scope="row" className={classes.tableCell}>
                        Staff {item.id}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        <a
                          href={`/listTour/:${item?.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classes.tourName}
                        >
                          {item?.username}
                        </a>
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {getRoleUser(item?.role)}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        <StatusChip status={!item.isDeleted} />
                      </TableCell>
                      <TableCell className="text-center" component="th">
                        <IconButton
                          className={clsx(classes.actionButton)}
                          color="primary"
                          onClick={(event) => {
                            onShowConfirmDelete(event, item);
                          }}
                        >
                          <DeleteOutlineOutlined
                            sx={{ marginRight: "0.25rem" }}
                            color="error"
                            fontSize="small"
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={6}>
                    <SearchNotFound searchQuery={keyword} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            className={classes.pagination}
            count={data?.meta?.itemCount || 0}
            rowsPerPage={data?.meta?.take || 10}
            page={data?.meta?.page ? data?.meta?.page - 1 : 0}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <PopupSendOffer
          isOpen={openPopupSendOffer}
          onClose={onOpenPopupSendOffer}
          toggle={onOpenPopupSendOffer}
          onYes={onYesDelete}
        />
        <PopupConfirmDelete
          title="Are you sure delete this staff ?"
          isOpen={!!staffDelete}
          onClose={onClosePopupConfirmDelete}
          toggle={onClosePopupConfirmDelete}
          onYes={onYesDelete}
        />
      </div>
    </>
  );
});

export default Staff;
