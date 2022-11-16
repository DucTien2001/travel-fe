import React, {memo} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Card,
  CardTitle,
  CardBody,
  Col,
} from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import Stars from "components/Stars";

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
    contact?: string;
    price: number;
    discount?: number;
    tags?: string[];
    rate?: number;
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
        <Col xs={4} className={clsx(classes.cardItem, className)} key={id}>
            <Link href={`/${linkView}/[${id}]`}>
                <Card className={clsx("card-pricing card-background", classes.cardImage)}
                style={{backgroundImage: `url(${src})`,}}
                >
                    <CardBody className={isTemporarilyStopWorking ? classes.stopCard : classes.cardBody}>
                         {isTemporarilyStopWorking ? (<div className={classes.stopWorking}>
                                <span className={classes.stop}>STOP WORKING</span>
                            </div>) : (<div className={discount ? classes.discountWrapper : classes.noDiscount}>
                                <span className={classes.percent}>{discount}%</span>
                                <span className={classes.discount}>DISCOUNT</span>
                            </div>)}
                        <h5 className={clsx("category", classes.title)}>{title}{roomNumber} - {location}</h5>
                        <Stars numberOfStars={rate}/>
                        <div className={classes.tags}>
                            <p>{tags}</p>
                        </div>
                        <p>{businessHours}{bookDates}</p>
                        <CardTitle tag="h3">{price}$</CardTitle>
                            <ul>
                                <li>{description}</li>
                            </ul>
                            <div>
                                <p>{contact} - {creator}</p>
                            </div>
                            <div className={classes.btnControlCard}>
                                <Link href={`/${linkView}/[${id}]`}>
                                <Button
                                className={clsx("btn-round", classes.btnView)}
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
                            </div>
                    </CardBody>
                </Card>
            </Link>
        </Col>
    </>
  );
});

export default ListServices;
