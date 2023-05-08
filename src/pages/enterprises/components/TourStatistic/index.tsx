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
import InputSearch from "components/common/inputs/InputSearch";
import "react-loading-skeleton/dist/skeleton.css";
import { StatisticAll, ITourStatistic } from "models/enterprise/tourBill";
import { TourBillService } from "services/enterprise/tourBill";
import { fCurrency2VND } from "utils/formatNumber";
import { Moment } from "moment";
import VisibilityIcon from "@mui/icons-material/Visibility";

const tableHeaders: TableHeaderLabel[] = [
  { name: "#", label: "#", sortable: false },
  { name: "name", label: "Tour Name", sortable: false },
  { name: "duration", label: "Duration", sortable: false },
  { name: "number of booking", label: "Number of booking", sortable: false },
  { name: "total number of tickets", label: "Total number of tickets", sortable: false },
  { name: "revenue", label: "Revenue", sortable: false },
  { name: "commission", label: "Commission", sortable: false },
  { name: "profit", label: "Profit", sortable: false },
  { name: "actions", label: "Actions", sortable: false },
];

interface Props {}
// eslint-disable-next-line react/display-name
const TourStatistic = memo(({}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [itemAction, setItemAction] = useState<ITourStatistic>();
  const [keyword, setKeyword] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<Moment>(null);
  const [data, setData] = useState<DataPagination<ITourStatistic>>();
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, dateFilter]);

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

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onChangeMonth = (date: Moment) => {
    setDateFilter(date);
  };

  const onClear = () => {
    setKeyword("");
    setDateFilter(null);
  };

  const fetchData = (value?: { take?: number; page?: number }) => {
    const params: StatisticAll = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: keyword || "",
      month: dateFilter ? dateFilter.month() + 1 : -1,
      year: dateFilter ? dateFilter.year() : -1,
    };
    dispatch(setLoading(true));

    TourBillService.statisticAll(params)
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

  const handleAction = (event: React.MouseEvent<HTMLButtonElement>, item: ITourStatistic) => {
    setItemAction(item);
    setActionAnchor(event.currentTarget);
  };

  const handleRedirect = () => {
    if (!itemAction) return;
    onRedirectEdit(itemAction);
    onCloseActionMenu();
  };

  const onRedirectEdit = (item: ITourStatistic) => {
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
          <div className={classes.boxInputSearch}>
            <InputSearch autoComplete="off" placeholder="Search ..." value={keyword || ""} onChange={onSearch} />
          </div>
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
                        <a href={`/listTour/:${item?.tourInfo?.id}`} target="_blank" rel="noreferrer" className={classes.tourName}>
                          {item?.tourInfo?.title}
                        </a>
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {`${item?.tourInfo?.numberOfDays} days ${item?.tourInfo?.numberOfNights} nights`}
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

export default TourStatistic;