import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
// reactstrap components
import { Container, Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip, faList, faXmark, faSearch, faCalendarDays, faBed } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Pagination from "components/Pagination";
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
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";

interface SearchData {
  hotelName?: string;
  departure?: Date;
  return?: Date;
  numberOfRoom: number;
  checkOptions?: boolean;
}

const ListHotels: NextPage = () => {
  const dispatch = useDispatch();
  const { allHotels } = useSelector((state: ReducerType) => state.normal);
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  const [changeViewLayout, setChangeViewLayout] = useState(false);

  // const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = listTour.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const schema = useMemo(() => {
    return yup.object().shape({
      tourName: yup.string().notRequired(),
      departure: yup.date().notRequired(),
      return: yup.date().min(yup.ref("departure"), "Return date must be start departure").notRequired(),
      numberOfRoom: yup.number().notRequired(),
      checkOptions: yup.boolean().notRequired(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SearchData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      numberOfRoom: 1,
    },
  });

  const clearForm = () => {
    reset({
      hotelName: "",
      departure: new Date(),
      return: new Date(),
      numberOfRoom: 1,
      checkOptions: false,
    });
  };

  const onClearOption = () => {
    clearForm();
  };
  const onChangeViewLayout = () => {
    setChangeViewLayout(!changeViewLayout);
  };

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
              Choose from our portfolio of unforgettable multi-country tours of Asia and embark on the journey of a
              lifetime. Each private tour is tailor-made to show the very best that Asia has to offer.
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
                RESULTS-FOUND: <span>32</span>
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
                  label="Hotel name"
                  labelIcon={<FontAwesomeIcon icon={faSearch} />}
                  placeholder="Hotel name"
                  name="Hotel name"
                  inputRef={register("hotelName")}
                />
                <InputDatePicker
                  className={classes.inputSearchDate}
                  label="Departure date"
                  labelIcon={<FontAwesomeIcon icon={faCalendarDays} />}
                  placeholder="Departure"
                  name="Departure date"
                  timeFormat={false}
                  inputRef={register("departure")}
                  errorMessage={errors.departure?.message}
                />
                <InputDatePicker
                  className={classes.inputSearchDate}
                  label="Return date"
                  placeholder="Return"
                  name="Return date"
                  timeFormat={false}
                  labelIcon={<FontAwesomeIcon icon={faCalendarDays} />}
                  inputRef={register("return")}
                  errorMessage={errors.return?.message}
                />
                <Controller
                  name="numberOfRoom"
                  control={control}
                  render={({ field }) => (
                    <>
                      <div className={classes.numberRooms}>
                        <InputCounter
                          label="Rooms"
                          labelIcon={<FontAwesomeIcon icon={faBed} />}
                          max={9999}
                          min={1}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </div>
                    </>
                  )}
                />
                <Button btnType={BtnType.Primary} className={classes.btnSearch}>
                  Search
                </Button>
              </BoxSmallLeft>
              <BoxSmallLeft title="Options">
                <InputCheckbox content="Sea" inputRef={register("checkOptions")} />
                <InputCheckbox content="Shopping" inputRef={register("checkOptions")} />
                <InputCheckbox content="3 stars" inputRef={register("checkOptions")} />
                <InputCheckbox content="4 stars" inputRef={register("checkOptions")} />
                <InputCheckbox content="5 stars" inputRef={register("checkOptions")} />
                <InputCheckbox content="Discount" inputRef={register("checkOptions")} />
              </BoxSmallLeft>
            </Col>
            <Col xs={10} className={classes.listTours}>
              {/* ==================== Grid view ===================== */}
              {!changeViewLayout && (
                <Row className={classes.rowGridView}>
                  {allHotels.map((hotel, index) => (
                    <CardItemGrid
                      linkView="listHotel"
                      linkBook="/book/hotel"
                      key={index}
                      id={hotel.id}
                      src={hotel.images[0]}
                      title={hotel.name}
                      description={hotel.description}
                      businessHours={hotel.checkInTime}
                      price={0}
                      location={hotel.location}
                      contact={hotel.contact}
                      tags={hotel.tags}
                      creator={hotel.creator}
                      isTemporarilyStopWorking={hotel.isTemporarilyStopWorking}
                    />
                  ))}
                </Row>
              )}
              {/* ==================== List view ===================== */}
              {changeViewLayout && (
                <div>
                  {allHotels.map((hotel, index) => (
                    <CardItemList
                      key={index}
                      linkView="listHotel"
                      linkBook="/book/hotel"
                      id={hotel.id}
                      src={hotel.images[0]}
                      title={hotel.name}
                      description={hotel.description}
                      businessHours={hotel.checkInTime}
                      price={0}
                      location={hotel.location}
                      contact={hotel.contact}
                      tags={hotel.tags}
                      creator={hotel.creator}
                      isTemporarilyStopWorking={hotel.isTemporarilyStopWorking}
                    />
                  ))}
                </div>
              )}
              {/* <Row className={classes.pigination}>
                <Pagination postPerPage={postsPerPage} totalPosts={listTour.length} paginate={paginate} />
              </Row> */}
            </Col>
          </Row>
        </Container>
      </Row>
      <Social />
    </>
  );
};

export default ListHotels;
