import React, { memo, useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
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
interface Props {
  tour: Tour;
  listRates: number[];
}

// eslint-disable-next-line react/display-name
const SectionTour = memo(({ tour, listRates }: Props) => {
  const { user } = useAuth();
  const [openPopupModalImages, setOpenPopupModalImages] = useState(false);

  const onOpenPopupModalImages = () =>
    setOpenPopupModalImages(!openPopupModalImages);

  return (
    <>
      <div className={clsx("section", classes.root)}>
        <Container className={classes.container}>
          <Row>
            <Col>
              <h2 className={`title ${classes.nameTour}`}>
                {tour?.title} - {tour?.location}
              </h2>
              <div className={classes.subProduct}>
                <div className={classes.tags}>
                  {tour?.tags?.map((item, index) => (
                    <Badge pill className={classes.badgeTags} key={index}>
                      {item}
                    </Badge>
                  ))}
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
                <Box sx={{ maxWidth: 400 }} className={classes.boxStep}>
                  <Stepper orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={step.label} className={classes.step}>
                        <StepLabel>
                          <p>{step.label}</p>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>
              <div className="ml-2">
                <h5 className={classes.leftTextPanel}>
                  What You’ll Experience
                </h5>
                <p className={classes.textDescription}>{tour?.description}</p>
              </div>
              <div className={classes.mapBox}>
                <h5 className={classes.leftTextPanel}> Location Detail</h5>
                <div>
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
                </div>
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
              <div className={classes.priceWrapper}>
                <h5>Starting from</h5>
                <h2
                  className={
                    tour?.discount ? classes.price : classes.priceDiscount
                  }
                >
                  {fCurrency2(tour?.price)} VND{" "}
                  {!tour?.discount && <span>/ person</span>}
                </h2>
                {tour?.discount !== 0 && (
                  <h2 className={classes.priceDiscount}>
                    {fCurrency2((tour?.price * (100 - tour?.discount)) / 100)}{" "}
                    VND<span>/ person</span>
                  </h2>
                )}
              </div>
              {user ? (
                <Link href={`/book/tour/:${tour?.id}`}>
                  <a>
                    <Button
                      btnType={BtnType.Primary}
                      isDot={true}
                      className={classes.btnBookNow}
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
      </div>
    </>
  );
});

export default SectionTour;
