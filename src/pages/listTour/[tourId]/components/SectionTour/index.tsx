import React, { memo, useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  Badge,
  Nav,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap";
// import { Carousel } from 'react-responsive-carousel'
// import {images} from "configs/images";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import Link from "next/link";
import { Schedule, Tour } from "models/tour";
import { fCurrency2 } from "utils/formatNumber";
import clsx from "clsx";
import useAuth from "hooks/useAuth";
import Stars from "components/Stars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faCalendar,
  faClock,
  faLocationDot,
  faPhone,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import Box from "@mui/material/Box";

import PopupModalImages from "components/Popup/PopupModalImages";
import { Grid, Tab, Tabs } from "@mui/material";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSelect from "components/common/inputs/InputSelect";
import InputCounter from "components/common/inputs/InputCounter";

import TourSchedule from "../TourSchedule";
import _ from "lodash";
import { TabContext, TabList } from "@material-ui/lab";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import moment from "moment";
import Geocode from "react-geocode";

const AnyReactComponent = ({ text, lat, lng }) => <div>{text}</div>;
export interface FormData {
  startDate: Date;
  language: any;
  numberOfAdult?: number;
  numberOfChild?: number;
}

interface PriceAndAge {
  childrenAgeMin: number;
  childrenAgeMax: number;
  priceChildren: number;
  adultPrice: number;
  discount: number;
  quantity: number;
}
interface Props {
  tour: Tour;
  tourSchedule?: any[];
}

const languageOptions = [
  { id: 1, name: "English", value: "English" },
  { id: 2, name: "VietNamese", value: "VietNamese" },
];

// eslint-disable-next-line react/display-name
const SectionTour = memo(({ tour, tourSchedule }: Props) => {
  const { user } = useAuth();
  Geocode.setApiKey("AIzaSyCRzSrswCY_UoHgkZnUW7JsPeq4VizUB2k");
  const [openPopupModalImages, setOpenPopupModalImages] = useState(false);
  const [tab, setTab] = React.useState("1");
  const [coords, setCoords] = useState(null);
  const [priceAndAge, setPriceAndAge] = useState<PriceAndAge>({
    childrenAgeMin: tour?.tourOnSales[0]?.childrenAgeMin,
    childrenAgeMax: tour?.tourOnSales[0]?.childrenAgeMax,
    priceChildren: tour?.tourOnSales[0]?.childrenPrice,
    adultPrice: tour?.tourOnSales[0]?.adultPrice,
    discount: tour?.tourOnSales[0]?.discount,
    quantity: tour?.tourOnSales[0]?.quantity,
  });

  const dayCategory = useMemo(() => {
    return _.chain(tourSchedule)
      .groupBy((item) => item?.day)
      .map((value) => ({ day: value[0].day, schedule: value }))
      .value();
  }, [tourSchedule]);

  const dayValid = useMemo(() => {
    return [];
  }, [tour]);

  const schema = useMemo(() => {
    return yup.object().shape({
      startDate: yup.date().required("Please choose start time"),
      language: yup.string().required("Please choose language"),
      numberOfAdult: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .typeError("Number must be a number")
        .notRequired(),
      numberOfChild: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .typeError("Number must be a number")
        .notRequired(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      numberOfAdult: 1,
      numberOfChild: 0,
      language: languageOptions[0],
    },
  });

  const onOpenPopupModalImages = () =>
    setOpenPopupModalImages(!openPopupModalImages);

  const handleChangeDaySchedule = (event: any, newValue: string) => {
    setTab(newValue);
  };

  const disableCustomDt = (current) => {
    return dayValid.includes(current.format("DD/MM/YYYY"));
  };

  const _numberOfChild = watch("numberOfChild");
  const _numberOfAdult = watch("numberOfAdult");

  const handleChangeStartDate = (e) => {
    tour?.tourOnSales.forEach((item) => {
      if (
        moment(item.startDate).format("DD/MM/YYYY") ===
        moment(e._d).format("DD/MM/YYYY")
      ) {
        setPriceAndAge({
          childrenAgeMin: item.childrenAgeMin,
          childrenAgeMax: item.childrenAgeMax,
          priceChildren: item.childrenPrice,
          adultPrice: item.adultPrice,
          discount: item.discount,
          quantity: item.quantity,
        });
      }
    });
  };

  useEffect(() => {
    setPriceAndAge({
      childrenAgeMin: tour?.tourOnSales[0]?.childrenAgeMin,
      childrenAgeMax: tour?.tourOnSales[0]?.childrenAgeMax,
      priceChildren: tour?.tourOnSales[0]?.childrenPrice,
      adultPrice: tour?.tourOnSales[0]?.adultPrice,
      discount: tour?.tourOnSales[0]?.discount,
      quantity: tour?.tourOnSales[0]?.quantity,
    });
  }, [tour]);

  useEffect(() => {
    tour?.tourOnSales.forEach((item) => {
      dayValid.push(moment(item.startDate).format("DD/MM/YYYY"));
    });
  }, [tour]);

  useEffect(() => {
    Geocode.fromAddress(
      `${tour?.moreLocation}, ${tour?.commune.name}, ${tour?.district.name}, ${tour?.city.name}`
    ).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setCoords({ lat, lng });
      },
      (error) => {
        console.error(error);
      }
    );
  }, [tour]);

  return (
    <>
      <Grid component="form" className={clsx("section", classes.root)}>
        <Container className={classes.container}>
          <Row>
            <Col>
              <h2 className={`title ${classes.nameTour}`}>
                {tour?.title} - {tour?.city.name}
              </h2>
              <div className={classes.subProduct}>
                <div className={classes.tags}>
                  <Badge pill className={classes.badgeTags}>
                    tour
                  </Badge>
                </div>
                <div className={classes.locationRate}>
                  <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                  <p>
                    {tour?.commune.name}, {tour?.district.name},{" "}
                    {tour?.city.name}
                  </p>
                  {tour?.rate !== 0 && (
                    <Stars
                      numberOfStars={Math.floor(tour?.rate)}
                      className={classes.starRating}
                    />
                  )}
                </div>
              </div>
              <Row
                className={classes.containerImg}
                onClick={onOpenPopupModalImages}
              >
                <Col
                  className={clsx(classes.wrapperImg, classes.mobileImg)}
                  md="8"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={tour?.images[0]} alt="anh" />
                </Col>
                <Col
                  className={clsx(classes.wrapperImg, classes.wrapperImg1)}
                  md="4"
                >
                  <div className={clsx(classes.rowImg, classes.mobileImg)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tour?.images[1]} alt="anh" />
                  </div>
                  <div className={clsx(classes.rowImg, classes.moreImg)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tour?.images[1]} alt="anh" />
                    <div className={classes.modalImg}>
                      <p>See All</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={classes.content}>
            <Col xs={8} className={classes.leftContent}>
              <h2 className={classes.leftTextTitle}>Product Details</h2>
              <h5 className={classes.leftTextPanel}>Highlight</h5>
              <div className={classes.highlightContent}>
                <p dangerouslySetInnerHTML={{ __html: tour?.highlight }}></p>
              </div>
              <div className={classes.goodWrapper}>
                <FontAwesomeIcon icon={faFaceSmile}></FontAwesomeIcon>
                <p>
                  <span>Good for:</span> {tour?.suitablePerson}
                </p>
              </div>
              <div className={classes.itineraryBox}>
                <h5 className={classes.leftTextPanel}>Tour Itinerary</h5>
                <Box sx={{ width: "100%" }}>
                  <TabContext value={tab}>
                    <Box>
                      <TabList onChange={handleChangeDaySchedule}>
                        {dayCategory?.map((item, index) => (
                          <Tab
                            key={index}
                            label={`Day ${item?.day}`}
                            value={`${item?.day}`}
                          />
                        ))}
                      </TabList>
                    </Box>
                    {dayCategory?.map((item, index) => (
                      <TourSchedule
                        key={index}
                        tourSchedule={(dayCategory || [])[index]?.schedule}
                        value={`${index + 1}`}
                      />
                    ))}
                  </TabContext>
                </Box>
              </div>
              <Grid sx={{ marginBottom: "24px" }}>
                <h5 className={classes.leftTextPanel}>
                  What You’ll Experience
                </h5>
                <p
                  className={classes.textDescription}
                  dangerouslySetInnerHTML={{ __html: tour?.description }}
                ></p>
              </Grid>
              <div className={classes.mapBox}>
                <h5 className={classes.leftTextPanel}> Location Detail</h5>
                <Grid
                  sx={{
                    padding: "18px",
                    backgroundColor: "#F6F2F2",
                    borderRadius: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <p className={classes.locationDetail}>
                    {tour?.moreLocation}, {tour?.commune.name},
                    {tour?.district.name}, {tour?.city.name}
                  </p>
                  <div style={{ height: "30vh", width: "100%" }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyCRzSrswCY_UoHgkZnUW7JsPeq4VizUB2k",
                      }}
                      defaultCenter={coords}
                      defaultZoom={11}
                      center={coords}
                    >
                      <AnyReactComponent
                        lat={coords?.lat}
                        lng={coords?.lng}
                        text={
                          <LocationOnIcon
                            sx={{ color: "var(--danger-color)" }}
                          />
                        }
                      />
                    </GoogleMapReact>
                  </div>
                  <div className={classes.contactBox}>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <p>Contact Partner: </p>
                    <a href={`tel: ${tour?.contact}`}>{tour?.contact}</a>
                  </div>
                </Grid>
              </div>
              {/* <div className="mt-4">
                <h5 className={classes.leftTextPanel}>
                  {" "}
                  Additional Information
                </h5>
                <p className={classes.textDescription} dangerouslySetInnerHTML={{ __html: tour?. }}></p>
              </div> */}
            </Col>
            <Col xs={4} className={classes.rightContent}>
              <Grid className={classes.boxSelect}>
                <p>When are you going?</p>
                <Grid sx={{ paddingTop: "14px" }}>
                  <InputDatePicker
                    name="startDate"
                    control={control}
                    initialValue={moment(
                      tour?.tourOnSales[0]?.startDate
                    ).format("DD/MM/YYYY")}
                    placeholder="Check-out"
                    dateFormat="DD/MM/YYYY"
                    timeFormat={false}
                    isValidDate={disableCustomDt}
                    inputRef={register("startDate")}
                    onChange={(e) => handleChangeStartDate(e)}
                    errorMessage={errors.startDate?.message}
                  />
                </Grid>
                {/* <Grid className={classes.boxTime}>
                  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                  <p>7:30</p>
                </Grid> */}
              </Grid>
              <Grid className={classes.boxSelect} sx={{ paddingTop: "14px" }}>
                <p>Language options?</p>
                <InputSelect
                  className={classes.inputSelect}
                  control={control}
                  name="language"
                  selectProps={{
                    options: languageOptions,
                  }}
                />
              </Grid>
              <Grid className={classes.boxSelect}>
                <p>How many tickets?</p>
                <Grid className={classes.boxNumberTickets}>
                  <Grid>
                    <p>Adult (age &gt; {priceAndAge?.childrenAgeMax})</p>
                    <span>{fCurrency2(priceAndAge?.adultPrice)} VND</span>
                  </Grid>
                  <Grid>
                    <Controller
                      name="numberOfAdult"
                      control={control}
                      render={({ field }) => (
                        <InputCounter
                          className={classes.inputCounter}
                          max={1000}
                          min={1}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Grid className={classes.boxNumberTickets}>
                  <Grid>
                    <p>
                      Child (age {priceAndAge?.childrenAgeMin}-
                      {priceAndAge?.childrenAgeMax})
                    </p>
                    <span>{fCurrency2(priceAndAge?.priceChildren)} VND</span>
                  </Grid>
                  <Grid>
                    <Controller
                      name="numberOfChild"
                      control={control}
                      render={({ field }) => (
                        <InputCounter
                          className={classes.inputCounter}
                          max={1000}
                          min={0}
                          onChange={field.onChange}
                          value={field.value}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <div className={classes.priceWrapper}>
                {priceAndAge?.discount !== 0 && (
                  <p className={classes.discount}>
                    Discount: <span>{priceAndAge?.discount} %</span>
                  </p>
                )}
                <Grid sx={{ display: "flex" }}>
                  <p>Total Price &nbsp;</p>
                  <h2 className={classes.price}>
                    {fCurrency2(
                      (priceAndAge?.adultPrice *
                        _numberOfAdult *
                        (100 - priceAndAge?.discount)) /
                        100 +
                        (priceAndAge?.priceChildren *
                          _numberOfChild *
                          (100 - priceAndAge?.discount)) /
                          100
                    )}{" "}
                    VND
                  </h2>
                </Grid>
              </div>
              {user ? (
                <Link href={`/book/tour/:${tour?.id}`}>
                  <a>
                    <Button
                      btnType={BtnType.Primary}
                      isDot={true}
                      className={classes.btnBookNow}
                      type="submit"
                    >
                      Book Now
                    </Button>
                  </a>
                </Link>
              ) : (
                <Link href={"/auth/login"}>
                  <a>
                    <Button
                      btnType={BtnType.Primary}
                      isDot={true}
                      className={classes.btnBookNow}
                      type="submit"
                    >
                      Book Now
                    </Button>
                  </a>
                </Link>
              )}
              <div className={classes.tipWrapper}>
                <div className={classes.serviceTip}>
                  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                  <p>
                    Tour duration:{" "}
                    <span>
                      {tour?.numberOfDays} days - {tour?.numberOfNights} nights
                    </span>
                  </p>
                </div>
                <div className={classes.serviceTip}>
                  <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
                  <p>Available today</p>
                </div>
                <div className={classes.serviceTip}>
                  <FontAwesomeIcon icon={faBusinessTime}></FontAwesomeIcon>
                  <p>Service Available in: Vietnamese</p>
                </div>
              </div>
              <div className={classes.featureWrapper}>
                <p className={classes.featureTitle}>Features</p>
                <div>
                  <FontAwesomeIcon icon={faWallet}></FontAwesomeIcon>
                  <p>Free cancellation</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <PopupModalImages
          isOpen={openPopupModalImages}
          toggle={onOpenPopupModalImages}
          images={tour?.images}
        />
      </Grid>
    </>
  );
});

export default SectionTour;
