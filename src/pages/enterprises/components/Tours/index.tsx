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
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
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
import { DataPagination, langSupports, TableHeaderLabel } from "models/general";
import {
  EditOutlined,
  DeleteOutlineOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";

import { useRouter } from "next/router";
import useDebounce from "hooks/useDebounce";
import InputSearch from "components/common/inputs/InputSearch";

const tableHeaders: TableHeaderLabel[] = [
  { name: "id", label: "Id", sortable: false },
  { name: "name", label: "Name", sortable: false },
  { name: "languages", label: "Languages", sortable: false },
  { name: "actions", label: "Actions", sortable: false },
];

interface Props {
  handleTourEdit?: () => void;
}
// eslint-disable-next-line react/display-name
const Tour = memo(({ handleTourEdit }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [itemAction, setItemAction] = useState<ETour>();
  const [keyword, setKeyword] = useState<string>("");
  const [data, setData] = useState<DataPagination<ETour>>();
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);
  const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(
    null
  );

  const handleAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: ETour
  ) => {
    // setTourAction(item);
    setActionAnchor(event.currentTarget);
  };

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
    const params: AdminGetTours = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: keyword,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    TourService.getTours(params)
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

  const onCreateTour = () => {
    router.push("/enterprises/tours/create-tour");
  };

  const onCloseActionMenu = () => {
    setItemAction(null);
    setActionAnchor(null);
    setLanguageAnchor(null);
  };

  const onShowLangAction = (event: React.MouseEvent<HTMLElement>) => {
    setLanguageAnchor(event.currentTarget);
  };

  const onCloseLangAction = () => {
    setLanguageAnchor(null);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3>Tours</h3>
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
          <Button btnType={BtnType.Primary} onClick={onCreateTour}>
            <FontAwesomeIcon icon={faPlus} />
            Create
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
                        {item.id}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        <a
                          href={`/listTour/:${item?.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classes.tourName}
                        >
                          {item?.title}
                        </a>
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        vi
                      </TableCell>
                      <TableCell className="text-center" component="th">
                        <IconButton
                          className={clsx(classes.actionButton)}
                          color="primary"
                          onClick={(event) => {
                            handleAction(event, item);
                          }}
                        >
                          <ExpandMoreOutlined />
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
        <Menu
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          anchorEl={actionAnchor}
          keepMounted
          open={Boolean(actionAnchor)}
          onClose={onCloseActionMenu}
        >
          <MenuItem
            sx={{ fontSize: "0.875rem" }}
            onClick={onShowLangAction}
            className={classes.menuItem}
          >
            <Box display="flex" alignItems={"center"}>
              <EditOutlined sx={{ marginRight: "0.25rem" }} fontSize="small" />
              <span>Edit Languages</span>
            </Box>
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.875rem" }} className={classes.menuItem}>
            <Box display="flex" alignItems={"center"}>
              <DeleteOutlineOutlined
                sx={{ marginRight: "0.25rem" }}
                color="error"
                fontSize="small"
              />
              <span>Delete</span>
            </Box>
          </MenuItem>
        </Menu>
        <Menu
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          anchorEl={languageAnchor}
          keepMounted
          open={Boolean(languageAnchor)}
          onClose={onCloseLangAction}
        >
          <MenuItem sx={{ fontSize: "0.875rem" }} className={classes.menuItem}>
            <span>Default</span>
          </MenuItem>
          {langSupports.map((item, index) => (
            <MenuItem
              key={index}
              sx={{ fontSize: "0.875rem" }}
              className={classes.menuItem}
            >
              <span>{item.name}</span>
            </MenuItem>
          ))}
        </Menu>
        {/* <PopupConfirmDelete
          title="Are you sure delete this tour ?"
          isOpen={!!tourDelete}
          onClose={onClosePopupConfirmDelete}
          toggle={onClosePopupConfirmDelete}
          onYes={onYesDelete}
        />
        <PopupConfirmWarning
          title="Are you sure stop working ?"
          isOpen={openPopupConfirmStop}
          onClose={onToggleConfirmStop}
          toggle={onToggleConfirmStop}
          onYes={onYesStopWorking}
        /> */}
      </div>
    </>
  );
});

export default Tour;
