import React, { useEffect, useState, useMemo } from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faList,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Aos from "aos";
import "aos/dist/aos.css";
import InputRecentSearch from "components/common/inputs/InputRecentSearch";
import Button, { BtnType } from "components/common/buttons/Button";
import SectionHeader from "components/Header/SectionHeader";
import CardItemGrid from "components/CardItemGrid";
import CardItemList from "components/CardItemList";
import BoxSmallLeft from "components/BoxSmallLeft";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/normal/tour";
import SearchNotFound from "components/SearchNotFound";
import FilterPanel from "../../components/FilterPanel";
import ReactPaginate from "react-paginate";
import CustomSelect from "components/common/CustomSelect";
import InputSelect from "components/common/inputs/InputSelect";
import {
  DataPagination,
  ESortOption,
  sortOption,
  sortType,
} from "models/general";
import { Grid, Pagination } from "@mui/material";
import { NormalGetTours, Tour } from "models/tour";
import useDebounce from "hooks/useDebounce";
import { useTranslation } from "react-i18next";
import InputSearch from "components/common/inputs/InputSearch";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Moment } from "moment";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import moment from "moment";
import { useRouter } from "next/router";
import _ from "lodash";

const ListTours: NextPage = () => {
  const { t, i18n } = useTranslation("common");

  const dispatch = useDispatch();
  const router = useRouter();

  const [changeViewLayout, setChangeViewLayout] = useState(false);
  const [data, setData] = useState<DataPagination<Tour>>();
  const [keyword, setKeyword] = useState<string>("");
  const [dateStart, setDateStart] = useState<Moment>(null);
  const [tourFilter, setTourFilter] = useState<number>(
    ESortOption.LOWEST_PRICE
  );

  const onChangeViewLayout = () => {
    setChangeViewLayout(!changeViewLayout);
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  // const handleSelectRating = (event, value) =>
  //   !value ? null : setSelectedRating(value);

  // const handleChangeChecked = (id) => {
  //   const tagStateList = tags;
  //   const changeCheckedTags = tagStateList.map((item) =>
  //     item.id === id ? { ...item, checked: !item.checked } : item
  //   );
  //   setTags(changeCheckedTags);
  // };

  // const handleChangePrice = (event, value) => {
  //   setSelectedPrice(value);
  // };

  // const applyFilters = () => {
  //   let updatedList = allTours;
  //   // Rating Filter
  //   if (selectedRating) {
  //     updatedList = updatedList.filter(
  //       (item) => Math.floor(item?.rate) === parseInt(selectedRating)
  //     );
  //   }
  //   //Tag filter
  //   const tagsChecked = tags
  //     .filter((item) => item.checked)
  //     .map((item) => item.label.toLowerCase());
  //   if (tagsChecked.length) {
  //     updatedList = updatedList.filter((item) =>
  //       tagsChecked.every((filterTag) =>
  //         item.tags.map((tag) => tag.toLowerCase()).includes(filterTag)
  //       )
  //     );
  //   }

  //   // Price Filter
  //   const minPrice = selectedPrice[0];
  //   const maxPrice = selectedPrice[1];

  //   updatedList = updatedList.filter(
  //     (item) => item.price >= minPrice && item.price <= maxPrice
  //   );
  //   setListTours(updatedList);
  // };

  const fetchData = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
    dateSearch?: Date;
  }) => {
    const params: NormalGetTours = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: keyword,
      dateSearch: dateStart?.toDate() || value?.dateSearch,
      sort: tourFilter,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    TourService.getAllTours(params)
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
    _onSearch(e.target.value);
  };

  const _onSearch = useDebounce(
    (keyword: string) => fetchData({ keyword, page: 1 }),
    500
  );

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    fetchData({
      page: newPage + 1,
    });
  };

  const onSearchDate = (e) => {
    setDateStart(moment(e?._d));
  };

  const onClearFilter = () => {
    setKeyword("");
    setDateStart(null);
    setTourFilter(-1);
  };

  // useEffect(() => {
  //   applyFilters();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tags, selectedPrice, selectedRating]);

  //sort by
  // const watchSortType = watch("sortType");
  // useEffect(() => {
  //   const items = [...listTours];
  //   if (watchSortType?.id === 1) {
  //     const listSortLowPrice = items?.sort(function (a, b) {
  //       return a?.price - b?.price;
  //     });
  //     setListTours(listSortLowPrice);
  //   } else if (watchSortType?.id === 2) {
  //     const listSortHighPrice = items?.sort(function (a, b) {
  //       return b?.price - a?.price;
  //     });
  //     setListTours(listSortHighPrice);
  //   } else if (watchSortType?.id === 3) {
  //     const listSortHighRate = items?.sort(function (a, b) {
  //       return b?.rate - a?.rate;
  //     });
  //     setListTours(listSortHighRate);
  //   }
  // }, [watchSortType]);
  useEffect(() => {
    if (router.query?.keyword) {
      setKeyword(String(router.query?.keyword));
    }
    if (router.query?.dateSearch) {
      setDateStart(moment(router.query?.dateSearch));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateStart, tourFilter]);

  return (
    <>
      <SectionHeader
        title={t("list_tours_section_title_hero")}
        src={images.imagesListTour.src}
        className={classes.imgHeader}
      />
      <Row className={classes.containerBody}>
        <Container>
          <Row className={classes.titleBody}>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="anh" src={images.iconSearch.src}></img>
            </div>
            <h1>{t("list_tours_section_title")}</h1>
            <div className={classes.divider}></div>
            <p>{t("list_tours_section_sub_title")}</p>
          </Row>
          <Row className={classes.containerSearch}>
            <div className={classes.boxControlSearch}>
              <div className={classes.boxTitleSearch}>
                <p>
                  {t("list_tours_header_search_title")} /{" "}
                  <span>{t("list_tours_header_search_results")}</span>
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
                  _onChange={(e) => onSearchDate(e)}
                />
              </Grid>
            </div>
            <Grid className={classes.boxResult} container>
              {/* ======================= RESULT DESKTOP ===================== */}
              <Grid className={classes.boxControlLayout} item xs={2}>
                <Button
                  className={clsx(
                    !changeViewLayout ? "active" : null,
                    classes.layoutBtn
                  )}
                  btnType={BtnType.Outlined}
                  onClick={onChangeViewLayout}
                >
                  <FontAwesomeIcon icon={faGrip} />
                </Button>
                <Button
                  className={clsx(
                    changeViewLayout ? "active" : null,
                    classes.layoutBtn
                  )}
                  btnType={BtnType.Outlined}
                  onClick={onChangeViewLayout}
                >
                  <FontAwesomeIcon icon={faList} />
                </Button>
              </Grid>
              <Grid className={classes.rowResult} container item xs={10}>
                <Grid>
                  <h5>{t("list_tours_sort_by")}: </h5>
                </Grid>
                <Grid className={classes.controlSelect} xs={4} item>
                  <Grid sx={{ width: "100%" }}>
                    <InputSelect
                      className={classes.inputSelect}
                      bindLabel="translation"
                      selectProps={{
                        options: sortOption,
                        placeholder: t("list_tours_sort_by_placeholder"),
                      }}
                      onChange={(e) => setTourFilter(e?.value)}
                    />
                  </Grid>
                </Grid>
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
            </Col>
            <Col xs={10} className={classes.listTours}>
              <div className={classes.containerListTour}>
                {/* ==================== Grid view ===================== */}
                {!changeViewLayout && (
                  <Row className={classes.rowGridView}>
                    {data?.data?.map((tour, index) => (
                      <CardItemGrid
                        linkView="listTour"
                        linkBook="book/tour"
                        key={index}
                        id={tour?.id}
                        src={tour?.images[0]}
                        title={tour.title}
                        description={tour.description}
                        contact={tour.contact}
                        commune={tour?.commune?.name}
                        district={tour?.district?.name}
                        city={tour?.city?.name}
                        minPrice={tour?.minPrice}
                        maxPrice={tour?.maxPrice}
                        price={
                          tour?.tourOnSales.length &&
                          tour?.tourOnSales[0]?.adultPrice
                        }
                        discount={
                          tour?.tourOnSales.length &&
                          tour?.tourOnSales[0]?.discount
                        }
                        rate={Math.floor(tour?.rate)}
                        numberOfReviewers={tour?.numberOfReviewer}
                        isDelete={tour.isDeleted}
                        tourOnSale={
                          tour?.tourOnSales.length &&
                          _.sortBy(tour?.tourOnSales, function (o) {
                            return o.adultPrice;
                          })
                        }
                      />
                    ))}
                  </Row>
                )}
                {/* ==================== List view ===================== */}
                {changeViewLayout && (
                  <div>
                    {data?.data.map((tour, index) => (
                      <CardItemList
                        linkView="listTour"
                        linkBook="book/tour"
                        key={index}
                        id={tour?.id}
                        src={tour?.images[0]}
                        title={tour.title}
                        description={tour.description}
                        commune={tour?.commune?.name}
                        district={tour?.district?.name}
                        city={tour?.city?.name}
                        price={
                          tour?.tourOnSales.length &&
                          tour?.tourOnSales[0]?.adultPrice
                        }
                        discount={
                          tour?.tourOnSales.length &&
                          tour?.tourOnSales[0]?.discount
                        }
                        minPrice={tour?.minPrice}
                        maxPrice={tour?.maxPrice}
                        rate={Math.floor(tour?.rate)}
                        numberOfReviewers={tour?.numberOfReviewer}
                      />
                    ))}
                  </div>
                )}
                {!data?.data?.length && (
                  <div>
                    <SearchNotFound mess={t("common_not_found")} />
                  </div>
                )}
              </div>
              <Row className={classes.pigination}>
                <Pagination
                  count={data?.meta?.pageCount || 0}
                  page={data?.meta?.page ? data?.meta?.page - 1 : 0}
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

export default ListTours;

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale)),
//     }
//   }
// }
