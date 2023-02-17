import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
} from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { fCurrency2, fCurrency2VND } from "utils/formatNumber";
import Link from "next/link";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Stars from "components/Stars";
import Aos from "aos";
import "aos/dist/aos.css";
import { Divider } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";

// eslint-disable-next-line react/display-name
const OfferComponent = memo(() => {
  const { allTours, allHotels } = useSelector(
    (state: ReducerType) => state.normal
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const listBestSeller = allTours.filter((item) => {
    return item.discount;
  });

  const listHotelLove = allHotels.filter((item) => {
    return item?.rate >= 4;
  });

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <>
      <div className="team-4">
        <Container>
          <Row>
            <Col md="8" data-aos="fade-up">
              <h2 className={clsx("title", classes.titleSection)}>
                THE BEST OFFERS WITH YOU
              </h2>
            </Col>
          </Row>
          <Divider
            variant="inset"
            data-aos="fade-right"
            className={classes.divider}
          />
        </Container>
        <div className={classes.containerBestSeller}>
          <Container>
            <h3
              className={clsx(classes.titleSwiper, "mt-5")}
              data-aos="fade-right"
            >
              Best seller
            </h3>
            <Swiper
              slidesPerView={isMobile ? 1 : 4}
              spaceBetween={30}
              slidesPerGroup={isMobile ? 1 : 4}
              initialSlide={0}
              loop={true}
              data-aos="fade-right"
              // onSlideChange={(e) => console.log(e.realIndex)}
              // loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className={clsx("mySwiper", classes.swiperBestSeller)}
            >
              {listBestSeller?.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Card className={clsx("card-blog", classes.card)}>
                      <div className="card-image">
                        <a href={`/listTour/:${item?.id}`}>
                          <img
                            alt="..."
                            className="img rounded"
                            src={item?.images[0]}
                          ></img>
                        </a>
                      </div>
                      <CardBody>
                        <div className={classes.locationBox}>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <h6 className={clsx("category", classes.location)}>
                            {item?.location}
                          </h6>
                        </div>

                        <CardTitle tag="h5" className={classes.titleCard}>
                          {item?.title}
                        </CardTitle>
                        <Stars numberOfStars={item?.rate} />
                        <div className={classes.priceWrapper}>
                          <h6
                            className={
                              item?.discount
                                ? classes.price
                                : classes.priceDiscount
                            }
                          >
                            {fCurrency2(item?.price)} VND{" "}
                            {!item?.discount && <span>/ person</span>}
                          </h6>
                          {item?.discount !== 0 && (
                            <h6 className={classes.priceDiscount}>
                              {fCurrency2(
                                (item?.price * (100 - item?.discount)) / 100
                              )}{" "}
                              VND<span>/ person</span>
                            </h6>
                          )}
                        </div>
                        <p
                          className={clsx("card-description", classes.textDesc)}
                        >
                          {item?.description}
                        </p>
                      </CardBody>
                    </Card>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Container>
        </div>
        <Container>
          <h3 className={classes.titleSwiper} data-aos="fade-right">
            Browse by property type
          </h3>
          <Swiper
            data-aos="fade-left"
            slidesPerView={isMobile ? 1 : 4}
            spaceBetween={30}
            slidesPerGroup={isMobile ? 1 : 4}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={clsx("mySwiper", classes.swiper)}
          >
            <SwiperSlide>
              <Col>
                <Card>
                  <div className="card-image">
                    <img
                      alt="..."
                      className="rounded"
                      src={allTours[5]?.images[0]}
                    ></img>
                  </div>
                  <div className="text-center">
                    <h4 className="info-title">Reply detection</h4>
                    <p className="description">1000 rooms</p>
                  </div>
                </Card>
              </Col>
            </SwiperSlide>
            <SwiperSlide>
              <Col>
                <Card>
                  <div className="card-image">
                    <img
                      alt="..."
                      className="rounded"
                      src={allTours[5]?.images[0]}
                    ></img>
                  </div>
                  <div className="text-center">
                    <h4 className="info-title">Reply detection</h4>
                    <p className="description">1000 rooms</p>
                  </div>
                </Card>
              </Col>
            </SwiperSlide>
            <SwiperSlide>
              <Col>
                <Card>
                  <div className="card-image">
                    <img
                      alt="..."
                      className="rounded"
                      src={allTours[5]?.images[0]}
                    ></img>
                  </div>
                  <div className="text-center">
                    <h4 className="info-title">Reply detection</h4>
                    <p className="description">1000 rooms</p>
                  </div>
                </Card>
              </Col>
            </SwiperSlide>
            <SwiperSlide>
              <Col>
                <Card>
                  <div className="card-image">
                    <img
                      alt="..."
                      className="rounded"
                      src={allTours[5]?.images[0]}
                    ></img>
                  </div>
                  <div className="text-center">
                    <h4 className="info-title">Reply detection</h4>
                    <p className="description">1000 rooms</p>
                  </div>
                </Card>
              </Col>
            </SwiperSlide>
          </Swiper>
        </Container>
        <Container>
          <h3 className={classes.titleSwiper} data-aos="fade-right">
            Home guests love
          </h3>
          <Swiper
            slidesPerView={isMobile ? 1 : 4}
            spaceBetween={30}
            slidesPerGroup={isMobile ? 1 : 4}
            initialSlide={0}
            loop={true}
            data-aos="fade-right"
            // onSlideChange={(e) => console.log(e.realIndex)}
            // loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={clsx("mySwiper", classes.swiperBestSeller)}
          >
            {listHotelLove?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Card className="card-blog card-plain">
                    <div className="card-image">
                      <a href={`/listHotel/:${item?.id}`}>
                        <img
                          alt="..."
                          className="img rounded img-raised"
                          src={item?.images[0]}
                        ></img>
                      </a>
                    </div>
                    <CardBody>
                      <CardTitle tag="h5" className={classes.titleCard}>
                        <a href={`/listHotel/:${item?.id}`}>{item?.name}</a>
                      </CardTitle>
                      <p className={clsx("card-description", classes.textDesc)}>
                        {item?.description}
                      </p>
                      <div className={classes.boxPrice}>
                        <p>Starting from </p>
                      </div>
                      <CardFooter className={classes.cardFooter}>
                        <div className={classes.rateBox}>
                          {item?.rate.toFixed(1)}
                        </div>
                        <div>
                          <span>{item?.numberOfReviewer} reviews</span>
                        </div>
                      </CardFooter>
                    </CardBody>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Container>
      </div>
    </>
  );
});

export default OfferComponent;
