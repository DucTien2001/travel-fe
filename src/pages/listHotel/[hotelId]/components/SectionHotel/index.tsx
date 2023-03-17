import React, { memo, useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import { HOTEL_SECTION, ICreateHotel, IHotel } from "models/hotel";
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
  faSquareParking,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import Stars from "components/Stars";
import PopupModalImages from "components/Popup/PopupModalImages";
import { Grid } from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PoolIcon from "@mui/icons-material/Pool";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ElevatorIcon from "@mui/icons-material/Elevator";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
interface Props {
  hotel: IHotel;
}
const listFacilities = [
  {
    icon: <AcUnitIcon />,
    name: "AC",
  },
  {
    icon: <RestaurantIcon />,
    name: "Restaurant",
  },
  {
    icon: <PoolIcon />,
    name: "Swimming Pool",
  },
  {
    icon: <AccessAlarmIcon />,
    name: "24h Front-Desk",
  },
  {
    icon: <LocalParkingIcon />,
    name: "Parking",
  },
  {
    icon: <ElevatorIcon />,
    name: "Elevator",
  },
];
// eslint-disable-next-line react/display-name
const SectionTour = memo(({ hotel }: Props) => {
  const { user } = useAuth();
  const [openPopupModalImages, setOpenPopupModalImages] = useState(false);

  const onOpenPopupModalImages = () =>
    setOpenPopupModalImages(!openPopupModalImages);

  const scrollToElement = () => {
    var scrollDiv = document.getElementById(
      HOTEL_SECTION.section_check_room
    ).offsetTop;
    window.scrollTo({ top: scrollDiv - 90, behavior: "smooth" });
  };

  return (
    <>
      <div
        className={clsx("section", classes.root)}
        id={HOTEL_SECTION.section_overview}
      >
        <Container className={classes.container}>
          <Grid>
            <Col className={classes.rootImg}>
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
                  {hotel?.rate !== 0 && (
                    <Stars
                      numberOfStars={Math.floor(hotel?.rate)}
                      className={classes.starRating}
                    />
                  )}
                </div>
              </div>
              <Grid className={classes.boxLocation}>
                <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                <p>
                  962 Ngo Quyen, An Hai Tay Ward, Son Tra District, Da Nang,
                  Vietnam
                </p>
              </Grid>
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
          </Grid>
          <Grid
            sx={{
              padding: "24px 24px 0 24px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Grid className={classes.boxReview}>
              <h5>Travelix</h5>
              <Grid className={classes.review}>
                <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                <p>
                  {hotel?.rate.toFixed(2)} From {hotel?.numberOfReviewer}{" "}
                  reviews
                </p>
              </Grid>
            </Grid>
            <Grid className={classes.boxPrice}>
              <p>Price/room/night start from</p>
              <h5>763,000 VND</h5>
              <Button btnType={BtnType.Primary} onClick={scrollToElement}>
                Select Room
              </Button>
            </Grid>
          </Grid>
          <Grid sx={{ padding: "24px 24px 0 24px" }}>
            <h5>What about our hotel ?</h5>
            <p>
              Ba Na Hills is the most significant resort and recreational
              complex in and of Vietnam. Take a full day tour at Ba Na Hills to
              enjoy cool air and fantastic natural landscape, and max out the
              fun with foods, numerous festivities, as well as recreational
              activities offered on top of the world.
            </p>
          </Grid>
          <Grid className={classes.boxFacilities}>
            <h5>Facilities</h5>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{ justifyContent: "center", alignItems: "center" }}
            >
              {listFacilities?.map((item, index) => (
                <Grid
                  item
                  xs={2}
                  sm={4}
                  md={4}
                  className={classes.itemFacilities}
                  key={index}
                >
                  {item?.icon}
                  <p>{item?.name}</p>
                </Grid>
              ))}
            </Grid>
            <Grid className={classes.boxSeeMore}>
              <p>See More Facilities</p>
            </Grid>
          </Grid>
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
