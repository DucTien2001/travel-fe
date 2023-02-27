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
      <div
        className={clsx("section", classes.root)}
        id={HOTEL_SECTION.section_overview}
      >
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
