import React, { memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faDownload,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Table, Button } from "reactstrap";
import SearchNotFound from "components/SearchNotFound";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { TourBillService } from "services/normal/tourBill";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import moment from "moment";
import { fCurrency2VND } from "utils/formatNumber";
import DownloadTourBill from "./DownloadTourBill";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { DataPagination, TableHeaderLabel } from "models/general";
import InputSearch from "components/common/inputs/InputSearch";
import TableHeader from "components/Table/TableHeader";
import {
  DeleteOutlineOutlined,
  EditOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import { FindAll, TourBill } from "models/tourBill";
import useDebounce from "hooks/useDebounce";
import StatusPayment from "components/StatusPayment";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useRouter } from "next/router";
const tableHeaders: TableHeaderLabel[] = [
  { name: "No.", label: "No.", sortable: false },
  { name: "name", label: "Name", sortable: false },
  { name: "status", label: "Status", sortable: false },
  { name: "actions", label: "Actions", sortable: false },
];

// eslint-disable-next-line react/display-name
const Tour = memo(() => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();

  const [modalDownloadTourBill, setModalDownloadTourBill] = useState({
    isOpenModal: false,
    tourBill: null,
  });
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [openConfirmCancelBookTour, setOpenConfirmCancelBookTour] =
    useState(false);
  const [tourBillId, setTourBillId] = useState();
  const [data, setData] = useState<DataPagination<TourBill>>();
  const [keyword, setKeyword] = useState<string>("");
  const [itemAction, setItemAction] = useState<TourBill>();
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);

  const onTogglePopupConfirmCancel = () => {
    setOpenConfirmCancelBookTour(!openConfirmCancelBookTour);
  };

  const handleAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: TourBill
  ) => {
    setItemAction(item);
    setActionAnchor(event.currentTarget);
  };

  const onCloseActionMenu = () => {
    setItemAction(null);
    setActionAnchor(null);
  };

  const sortDate = (a, b) => {
    if (moment(a?.createdAt).toDate() > moment(b?.createdAt).toDate()) {
      return 1;
    } else if (moment(a?.createdAt).toDate() < moment(b?.createdAt).toDate()) {
      return -1;
    } else {
      return 0;
    }
  };

  const getTAllTourBill = () => {
    // TourBillService.getAllTourBills(user?.id)
    //   .then((res) => {
    //     setListHistory(res.data.sort(sortDate));
    //   })
    //   .catch((e) => {
    //     dispatch(setErrorMess(e));
    //   })
    //   .finally(() => {
    //     dispatch(setLoading(false));
    //   });
  };

  const onDownloadBill = (bill) => {
    setModalDownloadTourBill({
      isOpenModal: true,
      tourBill: bill,
    });
  };

  const onCloseModalDownloadTourBill = () => {
    setModalDownloadTourBill({
      isOpenModal: false,
      tourBill: null,
    });
  };

  // const isExpire = (item) => {
  //   var currentDate = new Date();
  //   let isExpired = false;
  //   var date = new Date(item?.createdAt);
  //   if (
  //     currentDate.setDate(currentDate.getDate()) >
  //     date.setDate(date.getDate() + 2)
  //   ) {
  //     isExpired = true;
  //   } else {
  //     isExpired = false;
  //   }
  //   return isExpired;
  // };

  // const onCancelBookTour = (e, id) => {
  //   setTourBillId(id);
  //   onTogglePopupConfirmCancel();
  // };

  const onYesCancel = () => {
    dispatch(setLoading(true));
    TourBillService.cancelBookTour(tourBillId)
      .then(() => {
        dispatch(setSuccessMess("Cancel book tour successfully"));
        getTAllTourBill();
        onTogglePopupConfirmCancel();
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
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
    TourBillService.getAllTourBills(params)
      .then((res) => {
        setData({
          data: res.data.sort(sortDate),
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

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    _onSearch(e.target.value);
  };

  const onPaymentAgain = () => {
    if (!itemAction) return;
    TourBillService.payAgain(itemAction?.id)
      .then((res) => {
        router.push(res?.data?.checkoutUrl);
      })
      .catch((err) => {
        dispatch(setErrorMess(err));
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
          <div className={classes.boxInputSearch}>
            <InputSearch
              autoComplete="off"
              placeholder="Search ..."
              value={keyword || ""}
              onChange={onSearch}
            />
          </div>
        </Row>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHeader headers={tableHeaders} />
            <TableBody>
              {data?.data?.length ? (
                data.data?.map((item, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell scope="row" className={classes.tableCell}>
                        {index + 1}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        TV{item?.id}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        <StatusPayment status={item?.status} />
                      </TableCell>
                      <TableCell className="text-center" component="th">
                        <IconButton
                          className={clsx(classes.actionButton)}
                          color="primary"
                          onClick={(e) => {
                            handleAction(e, item);
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
          <MenuItem sx={{ fontSize: "0.875rem" }} className={classes.menuItem}>
            <Box display="flex" alignItems={"center"}>
              <EditOutlined sx={{ marginRight: "0.25rem" }} fontSize="small" />
              <span>Update tour bill</span>
            </Box>
          </MenuItem>
          <MenuItem
            sx={{ fontSize: "0.875rem" }}
            className={classes.menuItem}
            onClick={onPaymentAgain}
          >
            <Box display="flex" alignItems={"center"}>
              <AddCardIcon
                sx={{ marginRight: "0.25rem" }}
                color="info"
                fontSize="small"
              />
              <span>Pay</span>
            </Box>
          </MenuItem>
          <MenuItem sx={{ fontSize: "0.875rem" }} className={classes.menuItem}>
            <Box display="flex" alignItems={"center"}>
              <DeleteOutlineOutlined
                sx={{ marginRight: "0.25rem" }}
                color="error"
                fontSize="small"
              />
              <span>Cancel</span>
            </Box>
          </MenuItem>
        </Menu>
      </div>
      <DownloadTourBill
        onClose={onCloseModalDownloadTourBill}
        isOpen={modalDownloadTourBill.isOpenModal}
        tourBill={modalDownloadTourBill.tourBill}
      />
      <PopupConfirmDelete
        title="Are you sure cancel this tour ?"
        isOpen={openConfirmCancelBookTour}
        onClose={onTogglePopupConfirmCancel}
        toggle={onTogglePopupConfirmCancel}
        onYes={onYesCancel}
      />
    </>
  );
});

export default Tour;
