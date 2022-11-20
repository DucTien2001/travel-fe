import React, { memo } from "react";
import Link from "next/link";
// reactstrap components
import { Card, CardTitle, CardBody, Col, Badge } from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import Stars from "components/Stars";
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
        <Col xs={4} className={clsx(classes.cardItem, className)} key={id}>
            <Link href={`/${linkView}/[${id}]`}>
                <Card className={clsx("card-pricing card-background", classes.cardImage)}
                style={{backgroundImage: `url(${src})`,}}
                >
                    <CardBody className={classes.cardBody}>
                            <div className={discount ? classes.discountWrapper : classes.noDiscount}>
                                <span className={classes.percent}>{discount}%</span>
                                <span className={classes.discount}>DISCOUNT</span>
                            </div>
                        <h5 className={clsx("category", classes.title)}>{title}{roomNumber} - {location}</h5>
                        <Stars numberOfStars={rate}/>
                        {!!tags?.length && <div className={classes.tags}>
                            {tags?.map((item, index) => (
                                <Badge pill color="var(--violet-color)" key={index}>{item}</Badge>
                            ))}
                        </div>}
                        <p>{businessHours}{bookDates}</p>
                        {price && <CardTitle tag="h3">{fCurrency2(price)} VND</CardTitle> }
                            <div>
                                <p>{contact}</p>
                            </div>
                            <div className={classes.btnControlCard}>
                                <Link href={`/${linkView}/:${id}`}>
                                <Button
                                className={clsx("btn-round", classes.btnView)}
                                btnType={isHotel ? BtnType.Secondary : BtnType.Primary}
                                disabled={isTemporarilyStopWorking}
                                >
                                   View more
                                </Button>
                                </Link>
                                {user ? 
                                ( <Link href={`/${linkBook}/:${id}`}>
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
                            </div>
                    </CardBody>
                </Card>
            </Link>
        </Col>
      </>
    );
  }
);

export default ListServices;
