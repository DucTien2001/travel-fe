import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import SearchNotFound from "components/SearchNotFound";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import Button, { BtnType } from "components/common/buttons/Button";
import TableHeader from "components/Table/TableHeader";
import { DataPagination, TableHeaderLabel } from "models/general";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import { useRouter } from "next/router";
import "react-loading-skeleton/dist/skeleton.css";
import { fCurrency2VND } from "utils/formatNumber";
import { Moment } from "moment";
import { useTranslation } from "react-i18next";
import { ExpandMoreOutlined } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { RoomBillService } from "services/enterprise/roomBill";
import {
  IStayDetailStatistic,
  StatisticOneStay,
} from "models/enterprise/roomBill";

interface Props {
  stayId: number;
}
// eslint-disable-next-line react/display-name
const DetailStayStatistic = memo(({ stayId }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const tableHeaders: TableHeaderLabel[] = [
    { name: "#", label: "#", sortable: false },
    {
      name: "departure day",
      label: t(
        "enterprise_management_section_tour_statistic_header_table_departure"
      ),
      sortable: false,
    },
    {
      name: "quantity",
      label: t(
        "enterprise_management_section_stay_statistic_header_table_quantity"
      ),
      sortable: false,
    },
    {
      name: "quantity",
      label: t(
        "enterprise_management_section_stay_statistic_header_table_room"
      ),
      sortable: false,
    },
    {
      name: "quantity",
      label: t("enterprise_management_section_stay_statistic_header_table_bed"),
      sortable: false,
    },
    {
      name: "number of booking",
      label: t(
        "enterprise_management_section_tour_statistic_header_table_number_booking"
      ),
      sortable: false,
    },
    {
      name: "number of tickets booked",
      label: t(
        "enterprise_management_section_stay_statistic_header_table_total_ticket"
      ),
      sortable: false,
    },
    {
      name: "revenue",
      label: t(
        "enterprise_management_section_tour_statistic_header_table_revenue"
      ),
      sortable: false,
    },
    {
      name: "commission",
      label: t(
        "enterprise_management_section_tour_statistic_header_table_commission"
      ),
      sortable: false,
    },
    {
      name: "profit",
      label: t(
        "enterprise_management_section_tour_statistic_header_table_profit"
      ),
      sortable: false,
    },
    {
      name: "actions",
      label: t(
        "enterprise_management_section_tour_statistic_header_table_action"
      ),
      sortable: false,
    },
  ];

  const [itemAction, setItemAction] = useState<IStayDetailStatistic>();
  const [dateFilter, setDateFilter] = useState<Moment>(null);
  const [data, setData] = useState<DataPagination<IStayDetailStatistic>>();
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter]);

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

  const onChangeMonth = (date: Moment) => {
    setDateFilter(date);
  };

  const onClear = () => {
    setDateFilter(null);
  };

  const onBack = () => {
    router.push("/enterprises/stayStatistic");
  };

  const fetchData = (value?: { take?: number; page?: number }) => {
    const params: StatisticOneStay = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      month: dateFilter ? dateFilter.month() + 1 : -1,
      year: dateFilter ? dateFilter.year() : -1,
    };
    dispatch(setLoading(true));

    RoomBillService.statisticOneStay(stayId, params)
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

  const handleAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: IStayDetailStatistic
  ) => {
    setItemAction(item);
    setActionAnchor(event.currentTarget);
  };

  const handleRedirect = () => {
    if (!itemAction) return;
    onRedirectEdit(itemAction);
    onCloseActionMenu();
  };

  const onRedirectEdit = (item: IStayDetailStatistic) => {
    router.push({
      pathname: `/enterprises/stayStatistic/${Number(router.query.action)}/${
        item.roomInfo?.id
      }`,
    });
  };

  console.log(itemAction);

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3> {t("enterprise_management_section_stay_statistic_title")}</h3>
        </Row>
        <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
          <Box className={classes.boxFilterControl}>
            <InputDatePicker
              value={dateFilter ? dateFilter : ""}
              initialValue={dateFilter ? dateFilter : ""}
              _onChange={(date) => onChangeMonth(date)}
              placeholder={t(
                "enterprise_management_section_tour_statistic_input_placeholder"
              )}
              closeOnSelect={true}
              timeFormat={false}
              dateFormat="M/YYYY"
            />
            <Button btnType={BtnType.Primary} onClick={onClear}>
              {t("enterprise_management_section_tour_statistic_btn_clear")}
            </Button>
          </Box>
          <Button btnType={BtnType.Primary} onClick={onBack}>
            {t("common_back")}
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
                        {index + 1}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.roomInfo?.title}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.roomInfo?.numberOfAdult} adult -{" "}
                        {item?.roomInfo?.numberOfChildren} children
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.roomInfo?.numberOfRoom}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.roomInfo?.numberOfBed}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.numberOfBookings}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {Number(item?.totalNumberOfRoom)}
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
                  <TableCell align="center" colSpan={9}>
                    <SearchNotFound />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            labelRowsPerPage={t("common_row_per_page")}
            labelDisplayedRows={function defaultLabelDisplayedRows({
              from,
              to,
              count,
            }) {
              return t("common_row_of_page", {
                from: from,
                to: to,
                count: count,
              });
            }}
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
            onClick={handleRedirect}
            className={classes.menuItem}
          >
            <Box display="flex" alignItems={"center"}>
              <VisibilityIcon
                sx={{ marginRight: "0.25rem" }}
                fontSize="small"
                color="info"
              />
              <span>
                {t("enterprise_management_section_tour_statistic_view_detail")}
              </span>
            </Box>
          </MenuItem>
        </Menu>
      </div>
    </>
  );
});

export default DetailStayStatistic;
