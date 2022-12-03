import React, {memo, useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Container,
  Row,
  Col,
  Badge,
} from "reactstrap";
import {images} from "configs/images";
// import Carousel from "components/Carousel";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import Carousel from "components/Carousel";
import { ICreateHotel } from "models/hotel";
import { fCurrency2VND } from "utils/formatNumber";
import useAuth from "hooks/useAuth";
import Link from "next/link";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellConcierge, faCircleCheck, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Stars from "components/Stars";

interface Props {
  hotel: ICreateHotel;
}


// eslint-disable-next-line react/display-name
const SectionTour = memo(({hotel} : Props)=> {
  const {user} = useAuth();
  const [images, setImages] = useState([]);
  const [collapses, setCollapses] = React.useState([1]);
  const changeCollapse = (collapse: number) => {
    if (collapses.includes(collapse)) {
      setCollapses(collapses.filter((prop) => prop !== collapse));
    } else {
      setCollapses([...collapses, collapse]);
    }
  };

  React.useEffect(() => {
    document.body.classList.add("product-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("product-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);

  useEffect(() => {
    const newImages = hotel?.images?.map((item, index) => {return {
      altText: 'Slide',
      caption: 'Slide',
      key: index + 1,
      src: item,
    }})
    setImages(newImages);
  }, [hotel])

  return (
    <>
        <div className="section">
          <Container>
            <Row>
              <Col md="5">
              {images && (<Carousel
                  images={images}
                />)}
                <p className={`blockquote blockquote-info ${classes.blockquote}`}>
                  <small>{hotel?.name}&nbsp;&nbsp;{hotel?.checkInTime} - {hotel?.checkOutTime}</small>
                  <br></br>
                  {hotel?.contact}    
                </p>
              </Col>
              <Col className="ml-auto mr-auto" md="6">
                <h2 className={`title ${classes.nameTour}`}>{hotel?.name} - {hotel?.location}</h2>
                {hotel?.rate && <Stars numberOfStars={Math.floor(hotel?.rate)}/>}
                {<div className={classes.tags}>
                    {hotel?.tags?.map((item, index) => (
                        <Badge pill className={classes.badgeTags} key={index}>{item}</Badge>
                        
                      ))}
                </div>}
                <h2 className={`main-price ${classes.businessHours}`}>Time business: {hotel?.checkInTime} - {hotel?.checkOutTime}</h2>
                <h2 className={`main-price ${classes.businessHours}`}>Contact: {hotel?.contact}</h2>
                <div className={classes.boxTip}>
                <div className={classes.tip}>
                   <FontAwesomeIcon icon={faCircleCheck}/>
                  <p>You can go experience it anytime while the ticket price is still available</p>
                </div>
                <div className={classes.tip}>
                  <FontAwesomeIcon icon={faBellConcierge}/>
                  <p>24-hour front desk - Help is always there when you need it!</p>
                </div>
                <div className={classes.tip}>
                  <FontAwesomeIcon icon={faCircleInfo}/>
                  <p>Please check the information to be filled in before pressing the confirm button</p>
                </div>
            </div>
              </Col>             
            </Row>
            <Row>
            <div
                aria-multiselectable={true}
                id="accordion"
                role="tablist"
                className={clsx("card-collapse", classes.description)}
                >
                  <Card className="card-plain">
                    <CardHeader id="headingOne" role="tab">
                      <a
                        aria-expanded={collapses.includes(1)}
                        data-parent="#accordion"
                        data-toggle="collapse"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          changeCollapse(1);
                        }}
                      >
                        Description{" "}
                        <i className="now-ui-icons arrows-1_minimal-down"></i>
                      </a>
                    </CardHeader>
                    <Collapse isOpen={collapses.includes(1)}>
                      <CardBody>
                        <p>
                          {/* eslint-disable-next-line react/no-unescaped-entities */}
                          {hotel?.description}
                        </p>
                      </CardBody>
                    </Collapse>
                  </Card>
                </div>
            </Row>
          </Container>
                      
        </div>
    </>
  );
})

export default SectionTour;
