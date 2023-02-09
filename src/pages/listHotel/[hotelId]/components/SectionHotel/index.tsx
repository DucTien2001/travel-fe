import React, { memo, useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import { HOTEL_SECTION, ICreateHotel } from "models/hotel";
import useAuth from "hooks/useAuth";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faCalendar,
  faClock,
  faFaceSmile,
  faLocationDot,
  faPhone,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Stars from "components/Stars";
import PopupModalImages from "components/Popup/PopupModalImages";

interface Props {
  hotel: ICreateHotel;
}

// eslint-disable-next-line react/display-name
const SectionTour = memo(({ hotel }: Props) => {
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [collapses, setCollapses] = React.useState([1]);
  const changeCollapse = (collapse: number) => {
    if (collapses.includes(collapse)) {
      setCollapses(collapses.filter((prop) => prop !== collapse));
    } else {
      setCollapses([...collapses, collapse]);
    }
  };

  React.useEffect(() => {
    document.body.classList.add("product-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("product-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  useEffect(() => {
    const newImages = hotel?.images?.map((item, index) => {
      return {
        altText: "Slide",
        caption: "Slide",
        key: index + 1,
        src: item,
      };
    });
    setImages(newImages);
  }, [hotel]);
  const [openPopupModalImages, setOpenPopupModalImages] = useState(false);

  const onOpenPopupModalImages = () =>
    setOpenPopupModalImages(!openPopupModalImages);

  const scrollToElement = (id: string) => {
    var scrollDiv = document.getElementById(id).offsetTop;
    window.scrollTo({ top: scrollDiv, behavior: "smooth" });
  };
  return (
    <>
      <div className={clsx("section", classes.root)}>
        <Container className={classes.container}>
          <Row>
            <Col>
              <h2 className={`title ${classes.nameHotel}`}>
                {hotel?.name} - {hotel?.location}
              </h2>
              <div className={classes.subProduct}>
                <div className={classes.tags}>
                  {hotel?.tags?.map((item, index) => (
                    <Badge pill className={classes.badgeTags} key={index}>
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className={classes.locationRate}>
                  <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                  <p>{hotel?.location}</p>
                  {hotel?.rate !== 0 && (
                    <Stars
                      numberOfStars={Math.floor(hotel?.rate)}
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
                  <img src={hotel?.images[0]} alt="anh" />
                </Col>
                <Col
                  className={clsx(classes.wrapperImg, classes.wrapperImg1)}
                  md="4"
                >
                  <div className={clsx(classes.rowImg, classes.mobileImg)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hotel?.images[1]} alt="anh" />
                  </div>
                  <div className={clsx(classes.rowImg, classes.moreImg)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={hotel?.images[1]} alt="anh" />
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
              <div className="ml-2">
                <h5 className={classes.leftTextPanel}>
                  What You’ll Experience
                </h5>
                <p className={classes.textDescription}>{hotel?.description}</p>
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
                    <a href={`tel: ${hotel?.contact}`}>{hotel?.contact}</a>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h5 className={classes.leftTextPanel}>
                  {" "}
                  Additional Information
                </h5>
                <p className={classes.textDescription}>{hotel?.description}</p>
              </div>
            </Col>
            <Col xs={4} className={classes.rightContent}>
              <div></div>
              <Button
                btnType={BtnType.Primary}
                isDot={true}
                className={classes.btnBookNow}
                onClick={() =>
                  scrollToElement(HOTEL_SECTION.section_check_room)
                }
              >
                Select Room
              </Button>
              <div className={classes.tipWrapper}>
                <div className={classes.serviceTip}>
                  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
                  <p>
                    Tour duration:{" "}
                    <span>
                      {hotel?.checkInTime} - {hotel?.checkOutTime}
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
          <PopupModalImages
            isOpen={openPopupModalImages}
            toggle={onOpenPopupModalImages}
            images={hotel?.images}
          />
        </Container>
      </div>
    </>
  );
});

export default SectionTour;
