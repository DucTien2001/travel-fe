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
import { Tour } from "models/tour";
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
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
// import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PopupModalImages from "components/Popup/PopupModalImages";
import { Grid } from "@mui/material";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputSelect from "components/common/inputs/InputSelect";
import InputCounter from "components/common/inputs/InputCounter";

const steps = [
  {
    label: "9:00 pick up",
  },
  {
    label: "Visit phu quoc",
  },
  {
    label: "End of tour",
  },
];
export interface FormData {
  startDate: Date;
  startTime: string;
  language: any;
  numberOfAdult?: number;
  numberOfChild?: number;
}
interface Props {
  tour: Tour;
  listRates: number[];
}

const languageOptions = [
  { id: 1, name: "English", value: "English" },
  { id: 2, name: "VietNamese", value: "VietNamese" },
];

// eslint-disable-next-line react/display-name
const SectionTour = memo(({ tour, listRates }: Props) => {
  const { user } = useAuth();
  const schema = useMemo(() => {
    return yup.object().shape({
      startDate: yup.date().required("Start datetime is required"),
      startTime: yup.string().required("Start time is required"),
      language: yup.string().required("Start time is required"),
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
    setValue,
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      startDate: new Date(),
      numberOfAdult: 1,
      numberOfChild: 0,
      language: languageOptions[0],
    },
  });

  const [openPopupModalImages, setOpenPopupModalImages] = useState(false);
  const [verticalTabs, setVerticalTabs] = useState(1);

  const onOpenPopupModalImages = () =>
    setOpenPopupModalImages(!openPopupModalImages);

  const onChangeTab = (numberOfDate: number) => {
    switch (numberOfDate) {
      case 1:
        setVerticalTabs(numberOfDate);
        break;
      case 2:
        setVerticalTabs(numberOfDate);
        break;
      default:
        break;
    }
  };

  const _numberOfAdult = watch("numberOfAdult");
  const _numberOfChild = watch("numberOfChild");

  return (
    <>
      <Grid component="form" className={clsx("section", classes.root)}>
        <Container className={classes.container}>
          <Row>
            <Col>
              <h2 className={`title ${classes.nameTour}`}>
                {tour?.title} - {tour?.location}
              </h2>
              <div className={classes.subProduct}>
                <div className={classes.tags}>
                  <Badge pill className={classes.badgeTags}>
                    tour
                  </Badge>
                </div>
                <div className={classes.locationRate}>
                  <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                  <p>{tour?.location}</p>
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
              <ul className={classes.highlightContent}>
                <li>oak in the idyllic sunset of Phu Quoc island</li>
                <li>oak in the idyllic sunset of Phu Quoc island</li>
                <li>oak in the idyllic sunset of Phu Quoc island</li>
                <li>oak in the idyllic sunset of Phu Quoc island</li>
                <li>oak in the idyllic sunset of Phu Quoc island</li>
              </ul>
              <div className={classes.goodWrapper}>
                <FontAwesomeIcon icon={faFaceSmile}></FontAwesomeIcon>
                <p>
                  <span>Good for:</span> Tasty Dinners, Adventure Junkies,
                  Relaxation, Nature Enthusiasts, Sightseeing, Asian Cuisine
                </p>
              </div>
              <div className={classes.itineraryBox}>
                <h5 className={classes.leftTextPanel}>Tour Itinerary</h5>
                <Nav className={classes.boxTabControl} nav>
                  <NavItem
                    className={classes.navItem}
                    onClick={() => onChangeTab(1)}
                  >
                    <Grid
                      sx={{
                        padding: "10px 16px",
                        backgroundColor: "var(--primary-color)",
                        borderRadius: "8px",
                        color: "var(--white-color)",
                        fontWeight: "500",
                      }}
                    >
                      Day 1
                    </Grid>
                  </NavItem>
                </Nav>
                <TabContent activeTab={"verticalTabs" + verticalTabs}>
                  <TabPane tabId="verticalTabs1">
                    <Box sx={{ maxWidth: 400 }} className={classes.boxStep}>
                      <Stepper
                        orientation="vertical"
                        className={classes.stepper}
                      >
                        {steps.map((step, index) => (
                          <Step key={step.label} className={classes.step}>
                            <StepLabel>
                              <p>{step.label}</p>
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </TabPane>
                </TabContent>
              </div>
              <Grid sx={{ marginBottom: "24px" }}>
                <h5 className={classes.leftTextPanel}>
                  What You’ll Experience
                </h5>
                <p className={classes.textDescription}>{tour?.description}</p>
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
                    143 Trần Hưng Đạo, KP 7, TT Dương Đông, H.Phú Quốc, tỉnh
                    Kiên Giang, Vietnam
                  </p>
                  <div className={classes.map}></div>
                  <div className={classes.contactBox}>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <p>Contact Partner: </p>
                    <a href={`tel: ${tour?.contact}`}>{tour?.contact}</a>
                  </div>
                </Grid>
              </div>
              <div className="mt-4">
                <h5 className={classes.leftTextPanel}>
                  {" "}
                  Additional Information
                </h5>
                <p className={classes.textDescription}>{tour?.description}</p>
              </div>
            </Col>
            <Col xs={4} className={classes.rightContent}>
              <Grid className={classes.boxSelect}>
                <p>When are you going?</p>
                <Grid sx={{ paddingTop: "14px" }}>
                  <InputDatePicker
                    name="startDate"
                    control={control}
                    placeholder="Check-out"
                    dateFormat="DD/MM/YYYY"
                    timeFormat={false}
                    inputRef={register("startDate")}
                    errorMessage={errors.startDate?.message}
                  />
                </Grid>
                <Grid className={classes.boxTime}>
                  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                  <p>7:30</p>
                </Grid>
              </Grid>
              <Grid className={classes.boxSelect}>
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
                    <p>Adult (age 10-99)</p>
                    <span>220,000 VND</span>
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
                    <p>Child (age 3-9)</p>
                    <span>220,000 VND</span>
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
                {tour?.discount !== 0 && (
                  <p className={classes.discount}>
                    Discount: <span>{tour?.discount} %</span>
                  </p>
                )}

                <p>Total Price</p>
                <h2 className={classes.price}>
                  {fCurrency2(
                    (tour?.price * _numberOfAdult * (100 - tour?.discount)) /
                      100 +
                      (tour?.price * _numberOfChild * (100 - tour?.discount)) /
                        100
                  )}{" "}
                  VND
                </h2>
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
                    Tour duration: <span>{tour?.businessHours}</span>
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
