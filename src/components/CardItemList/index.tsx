import React, {memo} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Col,
  Row,
  Badge
} from "reactstrap";
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import Stars from "components/Stars";
import clsx from "clsx";
interface Props { 
    className?: string;
    linkView: string;
    linkBook: string;
    id: number;
    src: string;
    title: string;
    description: string;
    businessHours: string;
    location: string;
    contact: string;
    price: number;
    discount?: number;
    tags?: string;
    rate: number;
    creator: number;
    isTemporarilyStopWorking?: boolean;
    roomNumber?: string;
    bookDates?: string;
}

// eslint-disable-next-line react/display-name
const ListServices = memo(({className, linkView, linkBook, id, src, title, description, businessHours, 
    location, contact, price, discount, 
    tags, rate, creator, 
    isTemporarilyStopWorking, roomNumber, bookDates} : Props) => {
    
  return (
    <>
        <Row xs={3} key={id} className={clsx(classes.rowTour, className)}>
            <Col className={isTemporarilyStopWorking ? classes.imgStopWorking : classes.imgTour}>
                <Link href={`/${linkView}/[${id}]`} >
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="anh" src={src}></img>
                </Link>
            {isTemporarilyStopWorking ? (<div className={classes.stopWorking}>
                    <span className={classes.stop}>STOP WORKING</span>
                    </div>) : (<div className={discount ? classes.discountWrapper : classes.noDiscount}>
                    <span className={classes.percent}>{discount}%</span>
                    <span className={classes.discount}>DISCOUNT</span>
            </div>)}
            </Col>
            <Col className={classes.information}>
            <h5 className={classes.title}>{title}{roomNumber} <Badge pill color="var(--violet-color)">{tags}</Badge></h5>  
            <span>{location} - {businessHours}{bookDates}</span>  
            <div className={classes.priceContainer}>
                <h3>{price}$</h3>
                <Stars numberOfStars={rate}/>
            </div>
                <span className={classes.contact}>{contact} - {creator}</span>
            <div className={classes.description}>
                <span>{description}</span> 
            </div>
            </Col>
            <Col className={classes.btnControlCardList}>
                    <Link href={`/${linkView}/[${id}]`}>
                        <Button
                            className="btn-round"
                            btnType={BtnType.Primary}
                            disabled={isTemporarilyStopWorking}
                            >
                            View more
                        </Button>
                    </Link>
                    <Link href={`/${linkBook}/[${id}]`}>
                        <Button
                            className="btn-round"
                            btnType={BtnType.Secondary}
                            disabled={isTemporarilyStopWorking}
                            >
                            Book now
                        </Button>
                    </Link>       
            </Col>
        </Row>
    </>
  );
});

export default ListServices;
