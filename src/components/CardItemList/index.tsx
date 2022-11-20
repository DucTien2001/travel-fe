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
import { fCurrency2 } from "utils/formatNumber";
import useAuth from "hooks/useAuth";
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
    price?: number;
    discount?: number;
    tags?: string[];
    rate?: number;
    creator: number;
    isTemporarilyStopWorking?: boolean;
    roomNumber?: string;
    bookDates?: string;
    isHotel?: boolean;
}

// eslint-disable-next-line react/display-name
const ListServices = memo(({className, linkView, linkBook, id, src, title, description, businessHours, 
    location, contact, price, discount, 
    tags, rate, creator, 
    isTemporarilyStopWorking, roomNumber, bookDates, isHotel} : Props) => {
    const {user} = useAuth();
  return (
    <>
        <Row xs={3} key={id} className={clsx(classes.rowTour, className)}>
            <Col className={classes.imgTour}>
                <Link href={`/${linkView}/[${id}]`} >
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img alt="anh" src={src}></img>
                </Link>
            <div className={discount ? classes.discountWrapper : classes.noDiscount}>
                    <span className={classes.percent}>{discount}%</span>
                    <span className={classes.discount}>DISCOUNT</span>
            </div>
            </Col>
            <Col className={classes.information}>
            <h5 className={classes.title}>{title}{roomNumber} 
            
            </h5> 
            <h5 className={classes.title}> {tags?.map((tag,index) => (
                <Badge pill color="var(--violet-color)" key={index}>{tag}</Badge>
            ))}  </h5> 
            <span>{location} - {businessHours}{bookDates}</span>  
            <div className={classes.priceContainer}>
                {price && <h3>{fCurrency2(price)} VND</h3> }
                <Stars numberOfStars={rate}/>
            </div>
                <span className={classes.contact}>{contact}</span>
            </Col>
            <Col className={classes.btnControlCardList}>
                    <Link href={`/${linkView}/[${id}]`}>
                        <Button
                            className="btn-round"
                            btnType={isHotel ? BtnType.Secondary : BtnType.Primary}
                            disabled={isTemporarilyStopWorking}
                            >
                            View more
                        </Button>
                    </Link>
                    {user ? 
                        (<Link href={`/${linkBook}/:${id}`}>
                            <Button
                            className={isHotel ? clsx("btn-round", classes.isHotel) : clsx("btn-round")}
                            btnType={BtnType.Secondary}
                            disabled={isTemporarilyStopWorking}
                            >
                                Book now
                            </Button>
                        </Link> ) : 
                        (<Link href={`/auth/login`}>
                            <Button
                            className={isHotel ? clsx("btn-round", classes.isHotel) : clsx("btn-round")}
                            btnType={BtnType.Secondary}
                            disabled={isTemporarilyStopWorking}
                            >
                                Book now
                            </Button>
                        </Link>)                      
                    }      
            </Col>
        </Row>
    </>
  );
});

export default ListServices;
