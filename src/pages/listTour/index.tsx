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
import { DataPagination, sortType } from "models/general";
import { Grid, Pagination } from "@mui/material";
import { NormalGetTours, Tour } from "models/tour";
import useDebounce from "hooks/useDebounce";
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface SearchData {
  location?: string;
  checkOptions?: boolean;
  sortType?: any;
}

const ListTours: NextPage = () => {
  const dispatch = useDispatch();
  const [changeViewLayout, setChangeViewLayout] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState([10000, 3000000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [data, setData] = useState<DataPagination<Tour>>();
  const [keyword, setKeyword] = useState<string>("");

  const [tags, setTags] = useState([
    { id: 1, checked: false, label: "Shopping" },
    { id: 2, checked: false, label: "Sea" },
    { id: 3, checked: false, label: "Family" },
    { id: 4, checked: false, label: "Mountain" },
    { id: 5, checked: false, label: "Trekking" },
    { id: 6, checked: false, label: "Music" },
    { id: 7, checked: false, label: "Chill" },
    { id: 8, checked: false, label: "Eat" },
  ]);

  const schema = useMemo(() => {
    return yup.object().shape({
      location: yup.string().notRequired(),
      checkOptions: yup.boolean().notRequired(),
      sortType: yup.object().required("This field is required"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<SearchData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      sortType: sortType[0],
    },
  });

  const clearForm = () => {
    reset({
      location: "",
      checkOptions: false,
    });
  };

  // const onClearOption = () => {
  //   clearForm();
  //   setTags([
  //     { id: 1, checked: false, label: "Shopping" },
  //     { id: 2, checked: false, label: "Sea" },
  //     { id: 3, checked: false, label: "Family" },
  //     { id: 4, checked: false, label: "Mountain" },
  //     { id: 5, checked: false, label: "Trekking" },
  //     { id: 6, checked: false, label: "Music" },
  //     { id: 7, checked: false, label: "Chill" },
  //     { id: 8, checked: false, label: "Eat" },
  //   ]);
  //   setSelectedRating(null);
  //   setSelectedPrice([10000, 3000000]);
  // };

  const onChangeViewLayout = () => {
    setChangeViewLayout(!changeViewLayout);
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
  }) => {
    const params: NormalGetTours = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: keyword,
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

  // useEffect(() => {
  //   applyFilters();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [tags, selectedPrice, selectedRating]);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

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
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SectionHeader
        title="MULTI-TOURS"
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
            <h1>BROWSE OUR MULTI-COUNTRY TOURS</h1>
            <div className={classes.divider}></div>
            <p data-aos="fade-up">
              Choose from our portfolio of unforgettable multi-country tours of
              Asia and embark on the journey of a lifetime. Each private tour is
              tailor-made to show the very best that Asia has to offer.
            </p>
          </Row>
          <Row className={classes.containerSearch}>
            <div className={classes.boxControlSearch}>
              <div className={classes.boxTitleSearch}>
                <p>
                  Tours / <span>Search Results</span>
                </p>
              </div>
              <div>
                <InputRecentSearch
                  placeholder="Search tour"
                  autoComplete="off"
                  value={keyword || ""}
                  onChange={onSearch}
                />
              </div>
            </div>
            <div className={classes.boxResult}>
              {/* ======================= RESULT DESKTOP ===================== */}
              <Grid className={classes.boxControlLayout}>
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
              <Grid className={classes.rowResult}>
                <Grid className={classes.controlSelect}>
                  <Grid>
                    <h5>SORT BY: </h5>
                  </Grid>
                  {/* <CustomSelect
                    className={classes.inputSelect}
                    options={sortType}
                    control={control}
                    name="sortType"
                    errorMessage={errors.sortType?.message}
                  /> */}
                  <Grid className={classes.inputSelect}>
                    <InputSelect
                      selectProps={{
                        options: sortType,
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid>
                  <h5>
                    RESULTS-FOUND: <span>{data?.data?.length}</span>
                  </h5>
                </Grid>
              </Grid>
            </div>
          </Row>
          <Row className={classes.rowResultBody}>
            <Col xs={2} className={classes.btnResetWrapper}>
              <Button
                btnType={BtnType.Primary}
                className={classes.btnResetOption}
              >
                <FontAwesomeIcon icon={faArrowsRotate} /> reset filter
              </Button>
              {/* <BoxSmallLeft title="Search tours">
                <InputTextField
                  label="Search"
                  className={classes.inputSearch}
                  placeholder="Search"
                  name="location"
                  onKeyPress={handleKeyPress}
                  startIcon={<FontAwesomeIcon icon={faSearch} />}
                  inputRef={register("location")}
                />
                <Button
                  btnType={BtnType.Primary}
                  className={classes.btnSearch}
                  onClick={() => handleSearch()}
                >
                  Search
                </Button>
              </BoxSmallLeft> */}
              {/* <FilterPanel
                selectedRating={selectedRating}
                selectedPrice={selectedPrice}
                selectRating={handleSelectRating}
                tags={tags}
                changeChecked={handleChangeChecked}
                changePrice={handleChangePrice}
              /> */}
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
                        price={
                          tour?.tourOnSales.length
                            ? Math.min(
                                ...tour?.tourOnSales?.map(
                                  (price) => price?.adultPrice
                                )
                              )
                            : 0
                        }
                        discount={
                          tour?.tourOnSales.length
                            ? Math.min(
                                ...tour?.tourOnSales?.map(
                                  (price) => price?.discount
                                )
                              )
                            : 0
                        }
                        rate={Math.floor(tour?.rate)}
                        numberOfReviewers={tour?.numberOfReviewer}
                        isDelete={tour.isDeleted}
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
                          tour?.tourOnSales.length
                            ? Math.min(
                                ...tour?.tourOnSales?.map(
                                  (price) => price?.adultPrice
                                )
                              )
                            : 0
                        }
                        discount={
                          tour?.tourOnSales.length
                            ? Math.min(
                                ...tour?.tourOnSales?.map(
                                  (price) => price?.discount
                                )
                              )
                            : 0
                        }
                        rate={Math.floor(tour?.rate)}
                        numberOfReviewers={tour?.numberOfReviewer}
                      />
                    ))}
                  </div>
                )}
                {!data?.data?.length && (
                  <div>
                    <SearchNotFound mess="No tour found" />
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