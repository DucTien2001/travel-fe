import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
// reactstrap components
import {
  Container,
  Row,
  Col,
  PaginationItem,
  PaginationLink,
  Pagination,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faList,
  faXmark,
  faSearch,
  faCalendarDays,
  faBed,
  faChevronLeft,
  faChevronRight,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Aos from "aos";
import "aos/dist/aos.css";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import InputTextfield from "components/common/inputs/InputTextfieldttt";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import InputCounter from "components/common/inputs/InputCounter";
import Button, { BtnType } from "components/common/buttons/Button";
import SectionHeader from "components/Header/SectionHeader";
import CardItemGrid from "components/CardItemGrid";
import CardItemList from "components/CardItemList";
import BoxSmallLeft from "components/BoxSmallLeft";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { HotelService } from "services/normal/hotel";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import SearchNotFound from "components/SearchNotFound";
import FilterPanel from "components/FilterPanel";
import InputSelect from "components/common/inputs/InputSelect";

interface SearchData {
  location?: string;
  // departure?: Date;
  // return?: Date;
  // numberOfRoom: number;
  checkOptions?: boolean;
  sortType?: any;
}

const ListHotels: NextPage = () => {
  const dispatch = useDispatch();
  const { allHotels } = useSelector((state: ReducerType) => state.normal);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const [changeViewLayout, setChangeViewLayout] = useState(false);
  const [listHotels, setListHotels] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const sortType = [
    { id: 1, name: "Lowest price", value: "Lowest price" },
    { id: 2, name: "Highest price", value: "Highest price" },
    { id: 3, name: "Highest rating", value: "Highest rating" },
  ];
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
      sortType: yup.object().required("This field is required"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    watch,
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

  const onClearOption = () => {
    clearForm();
    getAllHotelsDefault();
    setTags([
      { id: 1, checked: false, label: "Shopping" },
      { id: 2, checked: false, label: "Sea" },
      { id: 3, checked: false, label: "Family" },
      { id: 4, checked: false, label: "Mountain" },
      { id: 5, checked: false, label: "Trekking" },
      { id: 6, checked: false, label: "Music" },
      { id: 7, checked: false, label: "Chill" },
      { id: 8, checked: false, label: "Eat" },
    ]);
    setSelectedRating(null);
  };

  useEffect(() => {
    setListHotels(allHotels);
  }, [allHotels]);

  const onChangeViewLayout = () => {
    setChangeViewLayout(!changeViewLayout);
  };

  const handleSearch = () => {
    dispatch(setLoading(true));
    HotelService.searchLocationHotels(getValues("location"))
      .then((res) => {
        setListHotels(res?.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const getAllHotelsDefault = () => {
    dispatch(setLoading(true));
    HotelService.getAllHotelsByPage(1)
      .then((res) => {
        setListHotels(res?.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  const handleKeyPress = (e) => {
    var code = e.keyCode || e.which;
    if (code === 13) {
      handleSearch();
    }
  };
  const handleSelectRating = (event, value) =>
    !value ? null : setSelectedRating(value);

  const handleChangeChecked = (id) => {
    const tagStateList = tags;
    const changeCheckedTags = tagStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTags(changeCheckedTags);
  };

  const applyFilters = () => {
    let updatedList = allHotels;
    // Rating Filter
    if (selectedRating) {
      updatedList = updatedList.filter(
        (item) => Math.floor(item?.rate) === parseInt(selectedRating)
      );
    }
    //Tag filter
    const tagsChecked = tags
      .filter((item) => item.checked)
      .map((item) => item.label.toLowerCase());
    if (tagsChecked.length) {
      updatedList = updatedList.filter((item) =>
        tagsChecked.every((filterTag) =>
          item.tags.map((tag) => tag.toLowerCase()).includes(filterTag)
        )
      );
    }

    setListHotels(updatedList);
  };

  const handleChangePage = (e, page: number) => {
    dispatch(setLoading(true));
    HotelService.getAllHotelsByPage(page + 1)
      .then((res) => {
        setListHotels(res?.data);
      })
      .catch((err) => {
        dispatch(setErrorMess(err));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  useEffect(() => {
    HotelService.getAllHotelsByPage(1)
      .then((res) => {
        setListHotels(res?.data);
      })
      .catch((err) => {
        dispatch(setErrorMess(err));
      })
      .finally(() => {});
  }, [dispatch]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, selectedRating]);

  const numberOfPage = Math.ceil(allHotels.length / 9);
  //sort by

  return (
    <>
      <SectionHeader
        title="MULTI-HOTELS"
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
            <h1>BROWSE OUR MULTI-HOTELS </h1>
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
                  Hotels / <span>Search Results</span>
                </p>
              </div>
              <div>
                <InputTextfield
                  className={classes.inputSearch}
                  startAdornment={<FontAwesomeIcon icon={faSearch} />}
                  placeholder="Search city, hotel"
                  name="location"
                  onKeyPress={handleKeyPress}
                  inputRef={register("location")}
                />
              </div>
            </div>
            <div className={classes.boxResult}>
              {/* ======================= RESULT DESKTOP ===================== */}
              <Col xs={2} className={classes.boxControlLayout}>
                <Button
                  btnType={BtnType.Primary}
                  className={classes.btnResetOption}
                  onClick={onClearOption}
                >
                  <FontAwesomeIcon icon={faArrowsRotate} /> reset filter
                </Button>
              </Col>
              <Col xs={10} className={classes.rowResult}>
                <div className={classes.controlSelect}>
                  <h5>SORT BY: </h5>
                  <InputSelect
                    className={classes.inputSelect}
                    selectProps={{
                      options: sortType,
                    }}
                  />
                </div>
                <h5>
                  RESULTS-FOUND: <span>{listHotels?.length}</span>
                </h5>
              </Col>
            </div>
          </Row>
          <Row className={classes.rowResultBody}>
            <Col xs={2} className={classes.btnResetWrapper}>
              <FilterPanel
                // selectedCategory={selectedCategory}
                // selectCategory={handleSelectCategory}
                selectedRating={selectedRating}
                selectRating={handleSelectRating}
                tags={tags}
                changeChecked={handleChangeChecked}
                // changePrice={handleChangePrice}
              />
            </Col>
            <Col xs={10} className={classes.listTours}>
              <div className={classes.containerListHotel}>
                {/* ==================== List view ===================== */}
                <div>
                  {listHotels.map((hotel, index) => (
                    <CardItemList
                      key={index}
                      linkView="listHotel"
                      linkBook="/book/hotel"
                      id={hotel.id}
                      src={hotel.images[0]}
                      title={hotel.name}
                      description={hotel.description}
                      checkInTime={hotel.checkInTime}
                      checkOutTime={hotel.checkOutTime}
                      location={hotel.location}
                      contact={hotel.contact}
                      tags={hotel.tags}
                      rate={Math.floor(hotel?.rate)}
                      creator={hotel.creator}
                      isTemporarilyStopWorking={hotel.isTemporarilyStopWorking}
                      isHotel={true}
                    />
                  ))}
                </div>
                {!listHotels?.length && (
                  <div>
                    <SearchNotFound mess="No hotel found" />
                  </div>
                )}
              </div>
              <Row className={classes.pigination}>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink>
                      <span aria-hidden={true}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </span>
                    </PaginationLink>
                  </PaginationItem>
                  {[...Array(numberOfPage)].map((page, index) => {
                    return (
                      <PaginationItem
                        key={index}
                        onClick={(e) => handleChangePage(e, index)}
                      >
                        <PaginationLink>{index + 1}</PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationItem>
                    <PaginationLink>
                      <span aria-hidden={true}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
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
