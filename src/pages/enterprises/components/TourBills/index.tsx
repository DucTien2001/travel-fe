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
import TableHeader from "components/Table/TableHeader";
import { DataPagination, TableHeaderLabel } from "models/general";
import { EditOutlined, ExpandMoreOutlined } from "@mui/icons-material";

import { useRouter } from "next/router";
import useDebounce from "hooks/useDebounce";
import InputSearch from "components/common/inputs/InputSearch";
import "react-loading-skeleton/dist/skeleton.css";
import { FindAll, TourBill } from "models/enterprise/tourBill";
import { TourBillService } from "services/enterprise/tourBill";
import { fCurrency2VND } from "utils/formatNumber";
import moment from "moment";
import StatusPayment from "components/StatusPayment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PopupChangeStatus from "./components/PopupChangeStatus";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import { useTranslation } from "react-i18next";

interface Props {}
// eslint-disable-next-line react/display-name
const Tour = memo(({}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

  const tableHeaders: TableHeaderLabel[] = [
    { name: "id", label: "#", sortable: false },
    {
      name: "name",
      label: t("enterprise_management_section_tour_bill_header_table_name"),
      sortable: false,
    },
    {
      name: "total bill",
      label: t("enterprise_management_section_tour_bill_header_table_total"),
      sortable: false,
    },
    {
      name: "amount",
      label: t("enterprise_management_section_tour_bill_header_table_amount"),
      sortable: false,
    },
    {
      name: "booking date",
      label: t(
        "enterprise_management_section_tour_bill_header_table_booking_date"
      ),
      sortable: false,
    },
    {
      name: "status",
      label: t("enterprise_management_section_tour_bill_header_table_status"),
      sortable: false,
    },
    {
      name: "actions",
      label: t("enterprise_management_section_tour_bill_header_table_action"),
      sortable: false,
    },
  ];

  const [itemAction, setItemAction] = useState<TourBill>();
  const [keyword, setKeyword] = useState<string>("");
  const [data, setData] = useState<DataPagination<TourBill>>();
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);
  const [openPopupChangeStatus, setOpenPopupChangeStatus] = useState(false);
  const [tourBillId, setTourBillId] = useState(null);

  const onClosePopupChangeStatus = () => {
    setOpenPopupChangeStatus(!openPopupChangeStatus);
  };

  const handleAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: TourBill
  ) => {
    setItemAction(item);
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
    const params: FindAll = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: keyword,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));

    TourBillService.findAll(params)
      .then((res) => {
        setData({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => dispatch(setLoading(false)));
  };

  const _onSearch = useDebounce(
    (keyword: string) => fetchData({ keyword, page: 1 }),
    500
  );

  const onCloseActionMenu = () => {
    setItemAction(null);
    setActionAnchor(null);
  };

  const handleRedirect = () => {
    if (!itemAction) return;
    onRedirectEdit(itemAction);
    onCloseActionMenu();
  };

  const onRedirectEdit = (item: TourBill) => {
    router.push({
      pathname: `/enterprises/tourBills/${item.id}`,
    });
  };

  const onChangeStatus = () => {
    setTourBillId(itemAction?.id);
    onClosePopupChangeStatus();
    onCloseActionMenu();
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3>Tour bills</h3>
        </Row>
        <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
          <div className={classes.boxInputSearch}>
            <InputSearch
              autoComplete="off"
              placeholder={t("common_search")}
              value={keyword || ""}
              onChange={onSearch}
            />
          </div>
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
                        <a
                          href={`/listTour/:${item?.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className={classes.tourName}
                        >
                          {item?.tourData?.title}
                        </a>
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {fCurrency2VND(item?.totalBill)} VND
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {item?.amountAdult + item?.amountChild}{" "}
                        {t(
                          "enterprise_management_section_tour_bill_body_table_amount"
                        )}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        {moment(item?.createdAt).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className={classes.tableCell} component="th">
                        <StatusPayment status={item?.status} type={true} />
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
              />
              <span>
                {t("enterprise_management_section_tour_bill_action_view")}
              </span>
            </Box>
          </MenuItem>
          <MenuItem
            sx={{ fontSize: "0.875rem" }}
            onClick={onChangeStatus}
            className={classes.menuItem}
          >
            <Box display="flex" alignItems={"center"}>
              <PublishedWithChangesIcon
                sx={{ marginRight: "0.25rem" }}
                fontSize="small"
              />
              <span>
                {t(
                  "enterprise_management_section_tour_bill_action_change_status"
                )}
              </span>
            </Box>
          </MenuItem>
        </Menu>
      </div>
      <PopupChangeStatus
        isOpen={openPopupChangeStatus}
        onClose={onClosePopupChangeStatus}
        tourBillId={tourBillId}
        fetchData={fetchData}
      />
    </>
  );
});

export default Tour;
