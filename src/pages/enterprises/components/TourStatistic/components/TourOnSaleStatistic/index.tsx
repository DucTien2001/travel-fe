import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import SearchNotFound from "components/SearchNotFound";
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
import Button, { BtnType } from "components/common/buttons/Button";
import TableHeader from "components/Table/TableHeader";
import { DataPagination, TableHeaderLabel } from "models/general";
import { ExpandMoreOutlined } from "@mui/icons-material";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import { useRouter } from "next/router";
import "react-loading-skeleton/dist/skeleton.css";
import { StatisticAll, ITourOnSaleStatistic } from "models/enterprise/tourBill";
import { TourBillService } from "services/enterprise/tourBill";
import { fCurrency2VND } from "utils/formatNumber";
import moment, { Moment } from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";

const tableHeaders: TableHeaderLabel[] = [
  { name: "#", label: "#", sortable: false },
  { name: "departure day", label: "Departure day", sortable: false },
  { name: "quantity", label: "Quantity", sortable: false },
  { name: "number of booking", label: "Number of booking", sortable: false },
  { name: "number of tickets booked", label: "Number of tickets booked", sortable: false },
  { name: "revenue", label: "Revenue", sortable: false },
  { name: "commission", label: "Commission", sortable: false },
  { name: "profit", label: "Profit", sortable: false },
  { name: "actions", label: "Actions", sortable: false },
];

interface Props {
  tourId: number;
}
// eslint-disable-next-line react/display-name
const TourOnSaleStatistic = memo(({ tourId }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [itemAction, setItemAction] = useState<ITourOnSaleStatistic>();
  const [dateFilter, setDateFilter] = useState<Moment>(null);
  const [data, setData] = useState<DataPagination<ITourOnSaleStatistic>>();
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter]);

  const handleChangePage = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, newPage: number) => {
    fetchData({
      page: newPage + 1,
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetchData({
      take: Number(event.target.value),
      page: 1,
    });
  };

  const onChangeMonth = (date: Moment) => {
    setDateFilter(date);
  };

  const onClear = () => {
    setDateFilter(null);
  };

  const onBack = () => {
    router.push("/enterprises/tourStatistic");
  };

  const fetchData = (value?: { take?: number; page?: number }) => {
    const params: StatisticAll = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      month: dateFilter ? dateFilter.month() + 1 : -1,
      year: dateFilter ? dateFilter.year() : -1,
    };
    dispatch(setLoading(true));

    TourBillService.statisticOneTour(tourId, params)
      .then((res) => {
        if (res.success) {
          setData({
            data: res.data,
            meta: res.meta,
          });
        }
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const onCloseActionMenu = () => {
    setItemAction(null);
    setActionAnchor(null);
  };

  const handleAction = (event: React.MouseEvent<HTMLButtonElement>, item: ITourOnSaleStatistic) => {
    setItemAction(item);
    setActionAnchor(event.currentTarget);
  };

  const handleRedirect = () => {
    if (!itemAction) return;
    onRedirectEdit(itemAction);
    onCloseActionMenu();
  };

  const onRedirectEdit = (item: ITourOnSaleStatistic) => {
    router.push({
      pathname: `/enterprises/tourStatistic/${item.tourId}`,
    });
  };

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3>Tour Statistics</h3>
        </Row>
        <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
          <Box className={classes.boxFilterControl}>
            <InputDatePicker
              value={dateFilter ? dateFilter : ""}
              initialValue={dateFilter ? dateFilter : ""}
              _onChange={(date) => onChangeMonth(date)}
              placeholder="Select month"
              closeOnSelect={true}
              timeFormat={false}
              dateFormat="M/YYYY"
            />
            <Button btnType={BtnType.Primary} onClick={onClear}>
              Clear
            </Button>
          </Box>
          <Button btnType={BtnType.Primary} onClick={onBack}>
            Back
          </Button>
        </Row>
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          <Table className={classes.table}>
            <TableHeader headers={tableHeaders} />
            <TableBody>
              {data?.data?.length ? (
                data.data?.map((item, index) => {
                  return (
                    <TableRow key={item?.tourId}>
                      <TableCell scope="row" className={classes.tableCell}>
                        {index}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        <a href={`/listTour/:${item?.tourOnSaleInfo?.id}`} target="_blank" rel="noreferrer" className={classes.tourName}>
                          {moment(item?.tourOnSaleInfo?.startDate).format("D/M/YYYY")}
                        </a>
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.tourOnSaleInfo?.quantity}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.numberOfBookings}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {Number(item?.totalAmountChild) + Number(item?.totalAmountAdult)}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {fCurrency2VND(item?.revenue)} VND
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {fCurrency2VND(item?.commission)} VND
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {fCurrency2VND(item?.revenue - item?.commission)} VND
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
                    <SearchNotFound />
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
          <MenuItem sx={{ fontSize: "0.875rem" }} onClick={handleRedirect} className={classes.menuItem}>
            <Box display="flex" alignItems={"center"}>
              <VisibilityIcon sx={{ marginRight: "0.25rem" }} fontSize="small" />
              <span>View detail</span>
            </Box>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
});

export default TourOnSaleStatistic;
