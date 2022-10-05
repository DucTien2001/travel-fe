import React, {useEffect, useState, memo} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Col,
  Row,
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
        <Row xs={4} className={classes.rowTour} key={id}>
            <Col className={classes.imgTour}>
                <Link href="/[id]tourDetail">
                    <img alt="anh" src={src}></img>
                </Link>
            </Col>
                    <Col className={classes.titleWrapper}>
                        <h5>{title}</h5>  
                        <div className={classes.offerContentLike}>
                            {[...Array(numberStar)].map((star, index) => {
                            return (
                                <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                            )
                            })}
                        </div>
                    </Col>
                    <Col>
                        <ul>
                            <li>{subTitle1}</li>
                            <li>{subTitle2}</li>
                        </ul>          
                    </Col>
                <Col className={classes.btnControlCardList}>
                <div>
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
            </Col>
        </Row>
    </>
  );
});

export default ListServices;
