import React, { memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Row, Table } from "reactstrap";
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
import {
  DataPagination,
  EBillStatus,
  EPaymentStatus,
  EServiceType,
  TableHeaderLabel,
} from "models/general";
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
import Link from "next/link";
import PopupSelectDate from "./PopupChangeDate";
import { TourService } from "services/normal/tour";
import { Tour } from "models/tour";
import PopupAddInformation from "./PopupAddInformation";
import PopupConfirmCancel from "./PopupConfirmCancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCommentIcon from "@mui/icons-material/AddComment";
import PopupAddTourComment from "pages/listTour/[tourId]/components/PopupAddTourComment";
import { CommentService } from "services/normal/comment";
const tableHeaders: TableHeaderLabel[] = [
  { name: "Invoice no.", label: "Invoice no.", sortable: false },
  { name: "Tour name", label: "Tour name", sortable: false },
  { name: "Booking date", label: "Booking date", sortable: false },
  { name: "price", label: "Total bill", sortable: false },
  { name: "statusPayment", label: "Status payment", sortable: false },
  { name: "statusBill", label: "Status bill", sortable: false },
  { name: "download", label: "Download / View", sortable: false },
  { name: "actions", label: "Actions", sortable: false },
];

// eslint-disable-next-line react/display-name
const Tour = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [modalDownloadTourBill, setModalDownloadTourBill] = useState(false);
  const [tourBill, setTourBill] = useState<TourBill>(null);
  const [openConfirmCancelBookTour, setOpenConfirmCancelBookTour] =
    useState(false);

  const [data, setData] = useState<DataPagination<TourBill>>();
  const [keyword, setKeyword] = useState<string>("");
  const [itemAction, setItemAction] = useState<TourBill>();
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);
  const [openPopupSelectDate, setOpenPopupSelectDate] = useState(false);
  const [tour, setTour] = useState<Tour>(null);
  const [openAddInformation, setOpenAddInformation] = useState(false);
  const [openPopupAddComment, setOpenPopupAddComment] = useState(false);

  const onToggleAddComment = () => setOpenPopupAddComment(!openPopupAddComment);

  const onTogglePopupConfirmCancel = () => {
    setOpenConfirmCancelBookTour(!openConfirmCancelBookTour);
  };

  const onToggleAddInformation = () => {
    setOpenAddInformation(!openAddInformation);
    onCloseActionMenu();
    setTourBill(itemAction);
  };

  const onTogglePopupSelectDate = () => {
    setOpenPopupSelectDate(!openPopupSelectDate);
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

  const sortDataByDate = (first, second) =>
    Number(Date.parse(second)) - Number(Date.parse(first));

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
          data: res.data.sort(sortDataByDate),
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

  const onDownloadBill = (
    event: React.MouseEvent<HTMLButtonElement>,
    bill: TourBill
  ) => {
    setModalDownloadTourBill(true);
    setTourBill(bill);
  };

  const onCloseModalDownloadTourBill = () => {
    setModalDownloadTourBill(false);
    setTourBill(null);
  };

  const fetchTour = () => {
    TourService.getTour(itemAction?.tourData?.id)
      .then((res) => {
        setTour(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      });
  };

  const onSelectDate = () => {
    setTourBill(itemAction);
    fetchTour();
    onTogglePopupSelectDate();
    onCloseActionMenu();
  };

  const onUpdateInfo = () => {
    setTourBill(itemAction);
    onToggleAddInformation();
    onCloseActionMenu();
  };

  const onCancel = () => {
    setTourBill(itemAction);
    fetchTour();
    onTogglePopupConfirmCancel();
    onCloseActionMenu();
  };

  const onRate = () => {
    setTourBill(itemAction);
    onToggleAddComment();
    onCloseActionMenu();
  };

  const onSubmitRate = (data) => {
    dispatch(setLoading(true));
    CommentService?.createCommentTour(data)
      .then(() => {
        dispatch(setSuccessMess("Rating successfully"));
        onToggleAddComment();
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
                        TV{item?.id}
                      </TableCell>
                      <TableCell
                        className={clsx(classes.linkTour, classes.tableCell)}
                        component="th"
                      >
                        <Link href={`/listTour/:${item?.tourData?.id}`}>
                          {item?.tourData?.title}
                        </Link>
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {moment(item?.createdAt).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {fCurrency2VND(item?.totalBill)} VND
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        <StatusPayment status={item?.paymentStatus} />
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.paymentStatus === EPaymentStatus.PAID ? (
                          <StatusPayment status={item?.status} type={true} />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        <IconButton
                          onClick={(e) => {
                            onDownloadBill(e, item);
                          }}
                        >
                          <VisibilityIcon
                            sx={{
                              fontSize: "28px",
                              color: "var(--primary-color)",
                            }}
                          />
                        </IconButton>
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
                  <TableCell align="center" colSpan={7}>
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
          {itemAction?.paymentStatus === EPaymentStatus.PAID && (
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              className={classes.menuItem}
              onClick={onSelectDate}
            >
              <Box display="flex" alignItems={"center"}>
                <EditOutlined
                  sx={{ marginRight: "0.25rem" }}
                  fontSize="small"
                />
                <span>Reschedule</span>
              </Box>
            </MenuItem>
          )}
          {itemAction?.paymentStatus === EPaymentStatus.PAID && (
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              className={classes.menuItem}
              onClick={onUpdateInfo}
            >
              <Box display="flex" alignItems={"center"}>
                <EditOutlined
                  sx={{ marginRight: "0.25rem" }}
                  fontSize="small"
                />
                <span>Update contact information</span>
              </Box>
            </MenuItem>
          )}
          {itemAction?.paymentStatus !== EPaymentStatus.PAID && (
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
          )}
          {itemAction?.paymentStatus === EPaymentStatus.PAID && (
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              className={classes.menuItem}
              onClick={onCancel}
            >
              <Box display="flex" alignItems={"center"}>
                <DeleteOutlineOutlined
                  sx={{ marginRight: "0.25rem" }}
                  color="error"
                  fontSize="small"
                />
                <span>Cancel</span>
              </Box>
            </MenuItem>
          )}
          {itemAction?.status === EBillStatus.USED && (
            <MenuItem
              sx={{ fontSize: "0.875rem" }}
              className={classes.menuItem}
              onClick={onRate}
            >
              <Box display="flex" alignItems={"center"}>
                <AddCommentIcon
                  sx={{ marginRight: "0.25rem" }}
                  fontSize="small"
                  color="info"
                />
                <span>Rate</span>
              </Box>
            </MenuItem>
          )}
        </Menu>
      </div>
      <DownloadTourBill
        onClose={onCloseModalDownloadTourBill}
        isOpen={modalDownloadTourBill}
        tourBill={tourBill}
      />
      <PopupSelectDate
        onClose={onTogglePopupSelectDate}
        isOpen={openPopupSelectDate}
        tour={tour}
        tourBill={tourBill}
      />
      <PopupConfirmCancel
        isOpen={openConfirmCancelBookTour}
        onClose={onTogglePopupConfirmCancel}
        toggle={onTogglePopupConfirmCancel}
        tourBill={tourBill}
        tour={tour}
      />
      <PopupAddInformation
        onClose={onToggleAddInformation}
        isOpen={openAddInformation}
        tourBill={tourBill}
        fetchDataTourBill={fetchData}
      />
      <PopupAddTourComment
        isOpen={openPopupAddComment}
        // commentEdit={commentEdit}
        onClose={onToggleAddComment}
        toggle={onToggleAddComment}
        onSubmit={onSubmitRate}
        // onGetTourComments={onGetTourComments}
        tourBill={tourBill}
      />
    </>
  );
});

export default Tour;
