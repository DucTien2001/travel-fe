import React, { useEffect, useState } from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { images } from "configs/images";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Button, { BtnType } from "components/common/buttons/Button";
import SectionHeader from "components/Header/SectionHeader";
import CardItemList from "components/CardItemList";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import SearchNotFound from "components/SearchNotFound";
import InputSelect from "components/common/inputs/InputSelect";
import { useTranslation } from "react-i18next";
import { NormalGetStay, Stay } from "models/stay";
import { DataPagination, ESortOption, sortOption } from "models/general";
import { Moment } from "moment";
import { StayService } from "services/normal/stay";
import { Grid, Pagination } from "@mui/material";
import InputSearch from "components/common/inputs/InputSearch";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import moment from "moment";
import { useRouter } from "next/router";

const ListHotels: NextPage = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  const [data, setData] = useState<DataPagination<Stay>>();
  const [keyword, setKeyword] = useState<string>("");
  const [dateStart, setDateStart] = useState<Moment>(null);
  const [dateEnd, setDateEnd] = useState<Moment>(null);
  const [numberOfAdult, setNumberOfAdult] = useState(1);
  const [numberOfChild, setNumberOfChild] = useState(0);
  const [numberOfRoom, setNumberOfRoom] = useState(1);

  const [stayFilter, setStayFilter] = useState<number>(
    ESortOption.LOWEST_PRICE
  );

  const fetchData = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
    startDate?: Date;
    endDate?: Date;
  }) => {
    const params: NormalGetStay = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: keyword,
      startDate: dateStart?.toDate() || value?.startDate,
      endDate: dateEnd?.toDate() || value?.endDate,
      sort: stayFilter,
      numberOfAdult: numberOfAdult || 1,
      numberOfChildren: numberOfChild || 0,
      numberOfRoom: numberOfRoom || 1,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    StayService.findAll(params)
      .then((res) => {
        setData({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const onSearchStartDate = (e) => {
    setDateStart(moment(e?._d));
  };

  const onSearchEndDate = (e) => {
    setDateEnd(moment(e?._d));
  };

  const onClearFilter = () => {
    setKeyword("");
    setDateStart(null);
    setDateEnd(null);
    setStayFilter(null);
    setNumberOfAdult(1);
    setNumberOfChild(0);
    setNumberOfRoom(1);
  };

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    fetchData({
      page: newPage + 1,
    });
  };

  useEffect(() => {
    if (router.query?.keyword) {
      setKeyword(String(router.query?.keyword));
    }
    if (router.query?.dateStart) {
      setDateStart(moment(router.query?.dateStart));
    }
    if (router.query?.dateEnd) {
      setDateEnd(moment(router.query?.dateEnd));
    }
    if (router.query?.numberOfAdult) {
      setNumberOfAdult(Number(router.query?.numberOfAdult));
    }
    if (router.query?.numberOfChild) {
      setNumberOfChild(Number(router.query?.numberOfChild));
    }
    if (router.query?.numberOfRoom) {
      setNumberOfRoom(Number(router.query?.numberOfRoom));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dateStart,
    dateEnd,
    stayFilter,
    numberOfAdult,
    numberOfChild,
    numberOfRoom,
    keyword,
    router,
  ]);

  return (
    <>
      <SectionHeader
        title={t("list_hotels_section_title_hero")}
        src={images.imagesListHotel.src}
        className={classes.imgHeader}
      />
      <Row className={classes.containerBody}>
        <Container>
          <Row className={classes.titleBody}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="anh" src={images.iconSearch.src}></img>
            </div>
            <h1>{t("list_hotels_section_title")}</h1>
            <div className={classes.divider}></div>
            <p>{t("list_hotels_section_sub_title")}</p>
          </Row>
          <Row className={classes.containerSearch}>
            <div className={classes.boxControlSearch}>
              <div className={classes.boxTitleSearch}>
                <p>
                  {t("list_hotels_header_search_title")} /{" "}
                  <span>{t("list_hotels_header_search_results")}</span>
                </p>
              </div>
              <Grid className={classes.searchControlWrapper}>
                <InputSearch
                  placeholder={t("list_tours_header_search_placeholder")}
                  autoComplete="off"
                  value={keyword || ""}
                  onChange={onSearch}
                />
                <InputDatePicker
                  className={classes.inputSearchDate}
                  placeholder={t(
                    "landing_page_section_search_tour_input_start_time"
                  )}
                  dateFormat="DD/MM/YYYY"
                  timeFormat={false}
                  closeOnSelect
                  isValidDate={disablePastDt}
                  value={dateStart ? dateStart : ""}
                  initialValue={dateStart ? dateStart : ""}
                  _onChange={(e) => onSearchStartDate(e)}
                />
                <InputDatePicker
                  className={classes.inputSearchDate}
                  placeholder={t(
                    "landing_page_section_search_tour_input_start_time"
                  )}
                  dateFormat="DD/MM/YYYY"
                  timeFormat={false}
                  closeOnSelect
                  isValidDate={disablePastDt}
                  value={dateEnd ? dateEnd : ""}
                  initialValue={dateEnd ? dateEnd : ""}
                  _onChange={(e) => onSearchEndDate(e)}
                />
              </Grid>
            </div>
            <Grid className={classes.boxResult} container>
              <Grid className={classes.boxControlLayout} item xs={2}></Grid>
              {/* ======================= RESULT DESKTOP ===================== */}
              <Grid className={classes.rowResult} container item xs={10}>
                <Grid className={classes.controlSelect} xs={4} item></Grid>
                <Grid>
                  <h5>
                    {t("list_tours_result")} <span>{data?.data?.length}</span>
                  </h5>
                </Grid>
              </Grid>
            </Grid>
          </Row>
          <Row className={classes.rowResultBody}>
            <Col xs={2} className={classes.btnResetWrapper}>
              <Button
                btnType={BtnType.Primary}
                className={classes.btnResetOption}
                onClick={onClearFilter}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />{" "}
                {t("list_tours_reset_filter")}
              </Button>
              <Grid sx={{ width: "100%", marginTop: "14px" }}>
                <InputSelect
                  className={classes.inputSelect}
                  bindLabel="translation"
                  selectProps={{
                    options: sortOption,
                    placeholder: t("list_tours_sort_by_placeholder"),
                  }}
                  onChange={(e) => setStayFilter(e?.value)}
                />
              </Grid>
            </Col>
            <Col xs={10} className={classes.list}>
              <div className={classes.containerListHotel}>
                {/* ==================== List view ===================== */}
                <div>
                  {data?.data?.map((stay, index) => (
                    <CardItemList
                      key={index}
                      linkView="listHotel"
                      linkBook="/book/hotel"
                      id={stay.id}
                      type={stay?.type}
                      src={stay.images[0]}
                      title={stay.name}
                      description={stay.description}
                      checkInTime={stay.checkInTime}
                      checkOutTime={stay.checkOutTime}
                      commune={stay?.commune?.name}
                      district={stay?.district?.name}
                      city={stay?.city?.name}
                      contact={stay.contact}
                      minPrice={stay?.minPrice}
                      maxPrice={stay?.maxPrice}
                      rate={Math.floor(stay?.rate)}
                      isHotel={true}
                    />
                  ))}
                </div>
                {!data?.data?.length && (
                  <div>
                    <SearchNotFound mess={t("common_not_found")} />
                  </div>
                )}
              </div>
              <Row className={classes.pigination}>
                <Pagination
                  count={data?.meta?.pageCount || 0}
                  page={data?.meta?.page}
                  onChange={handleChangePage}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
      <Social />
    </>
  );
};

export default ListHotels;
