import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Row } from "reactstrap";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import SearchNotFound from "components/SearchNotFound";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Paper,
  Grid,
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
import { RoomBillService } from "services/admin/roomBill";
import { IStatisticOneRoom, StatisticOneRoom } from "models/admin/roomBill";
import moment from "moment";

interface Props {
  roomId?: number;
}
// eslint-disable-next-line react/display-name
const StayStatistic = memo(({ roomId }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, i18n } = useTranslation("common");
  const stayId = Number(router.query?.type);
  const enterpriseId = Number(router.query?.action);

  const tableHeaders: TableHeaderLabel[] = [
    { name: "#", label: "#", sortable: false },

    {
      name: "booked date",
      label: t("admin_management_section_tour_bill_header_table_booking_date"),
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
      name: "number of booking",
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
  ];

  const [dateFilter, setDateFilter] = useState<Moment>(null);
  const [data, setData] = useState<DataPagination<IStatisticOneRoom>>();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateFilter, roomId]);

  const onChangeMonth = (date: Moment) => {
    setDateFilter(date);
  };

  const onClear = () => {
    setDateFilter(null);
  };

  const fetchData = (value?: { take?: number; page?: number }) => {
    const params: StatisticOneRoom = {
      month: dateFilter ? dateFilter.month() + 1 : -1,
      year: dateFilter ? dateFilter.year() : -1,
    };
    dispatch(setLoading(true));

    RoomBillService.statisticOneRoom(roomId, params)
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

  const onBack = () => {
    router.push({
      pathname: `/admin/statisticStayBills/${enterpriseId}/${stayId}`,
    });
  };

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3>{t("enterprise_management_section_stay_statistic_title")}</h3>
        </Row>
        <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
          <Grid className={classes.boxInputSearch} container xs={6} spacing={2}>
            <Grid xs={4} item>
              <InputDatePicker
                value={dateFilter ? dateFilter : ""}
                initialValue={dateFilter ? dateFilter : ""}
                _onChange={(date) => onChangeMonth(date)}
                placeholder={t(
                  "admin_management_section_tour_bill_input_date_placeholder"
                )}
                closeOnSelect={true}
                timeFormat={false}
                dateFormat="M/YYYY"
              />
            </Grid>
          </Grid>
          <Grid className={classes.headerBtn}>
            <Button btnType={BtnType.Outlined} onClick={onClear}>
              {t("common_clear")}
            </Button>
            <Button btnType={BtnType.Primary} onClick={onBack}>
              {t("common_back")}
            </Button>
          </Grid>
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
                        {moment(item?.bookedDate).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.numberOfBookings}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.totalNumberOfRoom}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {fCurrency2VND(item?.revenue)} VND
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {fCurrency2VND(item?.commission)}
                        VND
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
        </TableContainer>
      </div>
    </>
  );
});

export default StayStatistic;
