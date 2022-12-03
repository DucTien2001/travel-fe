import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList, faXmark, faSearch, } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Aos from "aos";
import "aos/dist/aos.css";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import InputTextField from "components/common/inputs/InputTextField";
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
interface SearchData {
  tourName?: string;
  checkOptions?: boolean;
}

const ListTours: NextPage = () => {
  const dispatch = useDispatch();
  const { allTours } = useSelector((state: ReducerType) => state.normal);
  const [changeViewLayout, setChangeViewLayout] = useState(false);
  const [listTours, setListTours] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([10000, 3000000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [tags, setTags] = useState([
    { id: 1, checked: false, label: 'Shopping' },
    { id: 2, checked: false, label: 'Sea' },
    { id: 3, checked: false, label: 'Family' },
    { id: 4, checked: false, label: 'Mountain' },
    { id: 5, checked: false, label: 'Trekking' },
  ]);

  const schema = useMemo(() => {
    return yup.object().shape({
      tourName: yup.string().notRequired(),
      checkOptions: yup.boolean().notRequired(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, getValues, handleSubmit, reset } = useForm<SearchData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const clearForm = () => {
    reset({
      tourName: "",
      checkOptions: false,
    });
  };

  const onClearOption = () => {
    clearForm();
    getAllTours();
    setTags([
      { id: 1, checked: false, label: 'Shopping' },
      { id: 2, checked: false, label: 'Sea' },
      { id: 3, checked: false, label: 'Family' },
      { id: 4, checked: false, label: 'Mountain' },
      { id: 5, checked: false, label: 'Trekking' },
    ]);
  };

  const onChangeViewLayout = () => {
    setChangeViewLayout(!changeViewLayout);
  };

  const handleSearch = () => {
    dispatch(setLoading(true));
    TourService.searchTours(getValues("tourName"))
      .then((res) => {
        setListTours(res?.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  
  const getAllTours = () => {
    dispatch(setLoading(true));
    TourService.getAllTours()
    .then((res) => {
      setListTours(res?.data);
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

  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  };

  const applyFilters = () => {
    let updatedList = allTours;
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

    // Price Filter
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];

    updatedList = updatedList.filter(
      (item) => item.price >= minPrice && item.price <= maxPrice
    );
    setListTours(updatedList);
  };

  useEffect(() => {
    applyFilters();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags, selectedPrice, selectedRating]);

  useEffect(() => {
    setListTours(allTours);
  }, [allTours]);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <>
      <SectionHeader title="MULTI-TOURS" src={images.imagesListTour.src} className={classes.imgHeader} />
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
              {/* <UncontrolledDropdown className={classes.perPageContainer}>
                            <DropdownToggle
                            caret
                            color="default"
                            data-toggle="dropdown"
                            href="#pablo"
                            id="navbarDropdownMenuLink1"
                            nav
                            onClick={(e) => e.preventDefault()}
                            >
                            <p>Services</p>
                            </DropdownToggle>
                            <DropdownMenu aria-labelledby="navbarDropdownMenuLink1">
                            <DropdownItem className={classes.dropdownItem}>
                                9
                            </DropdownItem>
                            <DropdownItem className={classes.dropdownItem}>
                                12
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
              {/* <select className={classes.selectPerPage} value={limit} onChange={(e) => handlePerPage(e.target.value)}>
                <option value="9" className={classes.option}>
                  9
                </option>
                <option value="12" className={classes.option}>
                  12
                </option>
              </select> */}
              <h5>
                RESULTS-FOUND: <span>{listTours?.length}</span>
              </h5>
            </Col>
          </Row>
          <Row className={classes.rowResultBody}>
            <Col xs={2} className={classes.btnResetWrapper}>
              <Button btnType={BtnType.Outlined} className={classes.btnResetOption} onClick={onClearOption}>
                <FontAwesomeIcon icon={faXmark} /> reset option
              </Button>
              <BoxSmallLeft title="Search tours">
                <InputTextField
                  className={classes.inputSearch}
                  placeholder="Tour name"
                  name="tourName"
                  // value={search}
                  // onChange={e => setSearch(e.target.value)}
                  onKeyPress={handleKeyPress}
                  startIcon={<FontAwesomeIcon icon={faSearch} />}
                  inputRef={register("tourName")}
                />
                <Button btnType={BtnType.Primary} className={classes.btnSearch} onClick={() => handleSearch()}>
                  Search
                </Button>
              </BoxSmallLeft>
              <BoxSmallLeft title="Options">
                {/* <InputCheckbox id="sea"  content="Sea" value="sea" onChange={filterHandler} inputRef={register("checkOptions")}/>
                <InputCheckbox id="shopping" content="Shopping" value="shopping" onChange={filterHandler} inputRef={register("checkOptions")}/>
                <InputCheckbox id="family" content="Family" value="family" onChange={filterHandler} inputRef={register("checkOptions")}/>
                <InputCheckbox id="mountain" content="Mountain" value="mountain" onChange={filterHandler} inputRef={register("checkOptions")}/> */}
                <FilterPanel
                // selectedCategory={selectedCategory}
                // selectCategory={handleSelectCategory}
                selectedRating={selectedRating}
                selectedPrice={selectedPrice}
                selectRating={handleSelectRating}
                tags={tags}
                changeChecked={handleChangeChecked}
                changePrice={handleChangePrice}
                />
              </BoxSmallLeft>

            </Col>
            <Col xs={10} className={classes.listTours}>
              {/* ==================== Grid view ===================== */}
              {!changeViewLayout && (
                <Row className={classes.rowGridView}>
                  {listTours?.map((tour, index) => (
                    <CardItemGrid
                      linkView="listTour"
                      linkBook="book/tour"
                      key={index}
                      id={tour.id}
                      src={tour.images[0]}
                      title={tour.title}
                      description={tour.description}
                      businessHours={tour.businessHours}
                      location={tour.location}
                      contact={tour.contact}
                      price={tour.price}
                      discount={tour.discount}
                      tags={tour.tags}
                      rate={Math.floor(tour?.rate)}
                      creator={tour.creator}
                      isTemporarilyStopWorking={tour.isTemporarilyStopWorking}
                      isDelete={tour.isDelete}
                      className={tour.isTemporarilyStopWorking ? classes.stopWorking : ""}
                    />
                  ))}
                </Row>
              )}
              {/* ==================== List view ===================== */}
              {changeViewLayout && (
                <div>
                  {listTours?.map((tour, index) => (
                    <CardItemList
                      linkView="listTour"
                      linkBook="book/tour"
                      key={index}
                      id={index}
                      src={tour.images[0]}
                      title={tour.title}
                      description={tour.description}
                      businessHours={tour.businessHours}
                      location={tour.location}
                      contact={tour.contact}
                      price={tour.price}
                      discount={tour.discount}
                      tags={tour.tags}
                      rate={Math.floor(tour?.rate)}
                      creator={tour.creator}
                      isTemporarilyStopWorking={tour.isTemporarilyStopWorking}
                      className={tour.isTemporarilyStopWorking ? classes.stopWorking : ""}
                    />
                  ))}
                </div>
              )}
              {!listTours.length && (<div>
                <SearchNotFound mess="No tour found"/>
              </div>)}
              <Row className={classes.pigination}>
                {/* <Pagination>
                  <PaginationItem onClick={() => handlePagination(page - 1)}>
                    <PaginationLink>
                      <span aria-hidden={true}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                      </span>
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem onClick={() => handlePagination(page + 1)}>
                    <PaginationLink>
                      <span aria-hidden={true}>
                        <FontAwesomeIcon icon={faChevronRight} />
                      </span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination> */}
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
