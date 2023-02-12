import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardFooter,
  Badge,
} from "reactstrap";
import { images } from "configs/images";
import Button, { BtnType } from "components/common/buttons/Button";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocation,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { fCurrency2, fCurrency2VND } from "utils/formatNumber";
import Link from "next/link";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Stars from "components/Stars";
// eslint-disable-next-line react/display-name
const OfferComponent = memo(() => {
  const { allTours } = useSelector((state: ReducerType) => state.normal);

  const listBestSeller = allTours.filter((item) => {
    return item.discount;
  });

  return (
    <>
      <div className="team-4">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto text-center" md="8">
              <h2 className={clsx("title", classes.titleSection)}>
                THE BEST OFFERS WITH YOU
              </h2>
              <h4 className="description">
                This is the paragraph where you can write more details about
                your team. Keep you user engaged by providing meaningful
                information.
              </h4>
            </Col>
          </Row>
          <h3 className={classes.titleSwiper}>Best seller</h3>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            slidesPerGroup={4}
            loop={true}
            onSlideChange={(e) => console.log(e.realIndex)}
            loopFillGroupWithBlank={true}
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
                      <p className={clsx("card-description", classes.textDesc)}>
                        {item?.description}
                      </p>
                    </CardBody>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <h3 className={classes.titleSwiper}>Browse by property type</h3>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            slidesPerGroup={4}
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
              <Col className={classes.card}>
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
      </div>
    </>
  );
});

export default OfferComponent;
