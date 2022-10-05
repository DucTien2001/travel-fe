import React, {memo} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Card,
  CardTitle,
  CardBody,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faStar,} from '@fortawesome/free-solid-svg-icons';
import clsx from "clsx";
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";

interface Props { 
    id: number;
    src: string;
    title: string;
    numberStar: number;
    subTitle1: string;
    subTitle2: string;
}

// eslint-disable-next-line react/display-name
const ListServices = memo(({id, src, title, numberStar, subTitle1, subTitle2} : Props) => {
    
  return (
    <>
        <Col xs={4} className={classes.cardItem} key={id}>
            <Link href={`/listTour/[${id}]`}>
                <Card className={clsx("card-pricing card-background", classes.cardImage)}
                style={{backgroundImage: `url(${src})`,}}
                >
                    <CardBody>
                        <h5 className="category">{title}</h5>
                        <div className={classes.offerContentLike}>
                            {[...Array(numberStar)].map((_star, index) => {
                            return (
                                <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                            )
                            })}
                        </div>
                        <CardTitle tag="h3">$67</CardTitle>
                            <ul>
                                <li>{subTitle1}</li>
                                <li>{subTitle2}</li>
                            </ul>
                            <div className={classes.btnControlCard}>
                                <Button
                                className="btn-round"
                                btnType={BtnType.Primary}
                                >
                                   View more
                                </Button>
                                <Link href="/[id]book">
                                    <Button
                                    className="btn-round"
                                    btnType={BtnType.Secondary}
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
