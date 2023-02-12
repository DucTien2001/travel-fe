import React, { memo } from "react";
import Link from "next/link";
// reactstrap components
import { Col, Row, Badge } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import Stars from "components/Stars";
import clsx from "clsx";
import { fCurrency2VND } from "utils/formatNumber";
import useAuth from "hooks/useAuth";
interface Props {
  className?: string;
  linkView: string;
  linkBook: string;
  id: number;
  src?: string;
  title: string;
  description: string;
  businessHours?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  location: string;
  contact?: string;
  price?: number;
  discount?: number;
  tags?: string[];
  rate?: number;
  creator: number;
  isTemporarilyStopWorking?: boolean;
  isDelete?: boolean;
  roomNumber?: string;
  bookDates?: string;
  isHotel?: boolean;
}

// eslint-disable-next-line react/display-name
const ListServices = memo(
  ({
    className,
    linkView,
    linkBook,
    id,
    src,
    title,
    description,
    businessHours,
    location,
    contact,
    price,
    discount,
    checkInTime,
    checkOutTime,
    tags,
    rate,
    creator,
    isTemporarilyStopWorking,
    isDelete,
    roomNumber,
    bookDates,
    isHotel,
  }: Props) => {
    const { user } = useAuth();
    return (
      <>
        <Row
          xs={3}
          key={id}
          className={clsx(
            { [classes.stopWorking]: isTemporarilyStopWorking || isDelete },
            classes.rowTour,
            className
          )}
        >
          <Col className={classes.imgTour}>
            <Link href={`/${linkView}/:${id}`}>
              <a>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="anh" src={src}></img>
              </a>
            </Link>
            <div
              className={
                discount ? classes.discountWrapper : classes.noDiscount
              }
            >
              <span className={classes.percent}>{discount}%</span>
              <span className={classes.discount}>DISCOUNT</span>
            </div>
          </Col>
          <Col className={classes.information}>
            <h5 className={classes.title}>{title}</h5>
            <h5 className={classes.title}>
              {" "}
              {tags?.map((tag, index) => (
                <Badge pill color="var(--violet-color)" key={index}>
                  {tag}
                </Badge>
              ))}{" "}
            </h5>
            <span className={classes.location}>
              {location} {businessHours && <span> - {businessHours}</span>}
              {bookDates}
            </span>
            {checkInTime && (
              <>
                <br></br>
                <span className={classes.checkTime}>
                  Check in time: {checkInTime}
                </span>
              </>
            )}

            {checkOutTime && (
              <>
                <br></br>
                <span className={classes.checkTime}>
                  Check out time: {checkOutTime}
                </span>
              </>
            )}
            <div className={classes.priceContainer}>
              {price && <h3>{fCurrency2VND(price)} VND</h3>}
            </div>
            {rate !== 0 && <Stars numberOfStars={Math.floor(rate)} />}
            <span className={classes.contact}>{contact}</span>
          </Col>
          <Col className={classes.btnControlCardList}>
            <Link href={`/${linkView}/[${id}]`}>
              <a>
                <Button
                  className="btn-round"
                  btnType={isHotel ? BtnType.Secondary : BtnType.Primary}
                  disabled={isTemporarilyStopWorking}
                >
                  View more
                </Button>
              </a>
            </Link>
            {user ? (
              <Link href={`/${linkBook}/:${id}`}>
                <a>
                  <Button
                    className={
                      isHotel
                        ? clsx("btn-round", classes.isHotel)
                        : clsx("btn-round")
                    }
                    btnType={BtnType.Secondary}
                    disabled={isTemporarilyStopWorking}
                  >
                    Book now
                  </Button>
                </a>
              </Link>
            ) : (
              <Link href={`/auth/login`}>
                <a>
                  <Button
                    className={
                      isHotel
                        ? clsx("btn-round", classes.isHotel)
                        : clsx("btn-round")
                    }
                    btnType={BtnType.Secondary}
                    disabled={isTemporarilyStopWorking}
                  >
                    Book now
                  </Button>
                </a>
              </Link>
            )}
          </Col>
        </Row>
      </>
    );
  }
);

export default ListServices;
