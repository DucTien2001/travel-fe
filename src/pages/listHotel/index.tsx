import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
// reactstrap components
import { Container, Row, Col, PaginationItem, PaginationLink, Pagination } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList, faXmark, faSearch, faCalendarDays, faBed, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Aos from "aos";
import "aos/dist/aos.css";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import InputTextField from "components/common/inputs/InputTextField";
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
import { HotelService} from "services/normal/hotel";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import SearchNotFound from "components/SearchNotFound";
import FilterPanel from "components/FilterPanel";

interface SearchData {
  location?: string;
  // departure?: Date;
  // return?: Date;
  // numberOfRoom: number;
  checkOptions?: boolean;
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
  const [tags, setTags] = useState([
    { id: 1, checked: false, label: 'Shopping' },
    { id: 2, checked: false, label: 'Sea' },
    { id: 3, checked: false, label: 'Family' },
    { id: 4, checked: false, label: 'Mountain' },
    { id: 5, checked: false, label: 'Trekking' },
    { id: 6, checked: false, label: 'Music' },
    { id: 7, checked: false, label: 'Chill' },
    { id: 8, checked: false, label: 'Eat' },
  ]);


  const schema = useMemo(() => {
    return yup.object().shape({
      location: yup.string().notRequired(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<SearchData>({
    resolver: yupResolver(schema),
    mode: "onChange",
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
      { id: 1, checked: false, label: 'Shopping' },
      { id: 2, checked: false, label: 'Sea' },
      { id: 3, checked: false, label: 'Family' },
      { id: 4, checked: false, label: 'Mountain' },
      { id: 5, checked: false, label: 'Trekking' },
      { id: 6, checked: false, label: 'Music' },
      { id: 7, checked: false, label: 'Chill' },
      { id: 8, checked: false, label: 'Eat' },
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
  }

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

  const handleChangePage = (e, page: number) =>{
    dispatch(setLoading(true));
    HotelService.getAllHotelsByPage(page + 1)
    .then((res) => {
      setListHotels(res?.data)
    })
    .catch((err) => {
      dispatch(setErrorMess(err))
    })
    .finally(() => {
      dispatch(setLoading(false));
    })
  }
  useEffect(() => {
    HotelService.getAllHotelsByPage(1)
    .then((res) => {
      setListHotels(res?.data)
    })
    .catch((err) => {
      dispatch(setErrorMess(err))
    })
    .finally(() => {
    })
  }, [dispatch])

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, selectedRating]);

  const numberOfPage = Math.ceil(allHotels.length / 9);

  return (
    <>
      <SectionHeader title="MULTI-HOTELS" src={images.imagesListHotel.src} className={classes.imgHeader} />
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
              Choose from our portfolio of unforgettable multi-country tours of Asia and embark on the journey of a lifetime. Each private
              tour is tailor-made to show the very best that Asia has to offer.
            </p>
          </Row>
          {/* ======================= RESULT DESKTOP ===================== */}
          <Row className={classes.resultDesktop}>
            <Col xs={2} className={clsx("mb-3", classes.colBtnLayout)}>
              <Button
                className={clsx(!changeViewLayout ? "active" : null, classes.layoutBtn)}
                btnType={BtnType.Outlined}
                onClick={onChangeViewLayout}
              >
                <FontAwesomeIcon icon={faGrip} />
                GRID VIEW
              </Button>
            </Col>
            <Col xs={2} className={classes.colBtnLayout}>
              <Button
                className={clsx(changeViewLayout ? "active" : null, classes.layoutBtn)}
                btnType={BtnType.Outlined}
                onClick={onChangeViewLayout}
              >
                <FontAwesomeIcon icon={faList} />
                LIST VIEW
              </Button>
            </Col>
            <Col xs={8} className={classes.rowResult}>
              <h5>
                RESULTS-FOUND: <span>{listHotels?.length}</span>
              </h5>
            </Col>
          </Row>
          <Row className={classes.rowResultBody}>
            <Col xs={2} className={classes.btnResetWrapper}>
              <Button btnType={BtnType.Outlined} className={classes.btnResetOption} onClick={onClearOption}>
                <FontAwesomeIcon icon={faXmark} /> reset option
              </Button>
              <BoxSmallLeft title="Search hotels">
                <InputTextField
                  className={classes.inputSearch}
                  label="Search"
                  labelIcon={<FontAwesomeIcon icon={faSearch} />}
                  placeholder="Search"
                  name="location"
                  onKeyPress={handleKeyPress}
                  inputRef={register("location")}
                />
                <Button btnType={BtnType.Primary} className={classes.btnSearch} onClick={() => handleSearch()}>
                  Search
                </Button>
              </BoxSmallLeft>
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
              {/* ==================== Grid view ===================== */}
              {!changeViewLayout && (
                <Row className={classes.rowGridView}>
                  {listHotels?.map((hotel, index) => (
                    <CardItemGrid
                      linkView="listHotel"
                      linkBook="/book/hotel"
                      key={index}
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
                </Row>
              )}
              {/* ==================== List view ===================== */}
              {changeViewLayout && (
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
              )}
              {!listHotels?.length && (<div>
                <SearchNotFound mess="No hotel found"/>
              </div>)}
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
                          <PaginationItem key={index} onClick={(e) => handleChangePage(e, index)}>
                            <PaginationLink>
                                {index + 1}
                            </PaginationLink>
                          </PaginationItem>
                        )
                    })}
                  <PaginationItem >
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
