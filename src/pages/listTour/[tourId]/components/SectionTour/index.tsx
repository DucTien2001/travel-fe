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
// import { Carousel } from 'react-responsive-carousel'
import {images} from "configs/images";
import classes from "./styles.module.scss";
import Carousel from "components/Carousel";
import Button, {BtnType} from "components/common/buttons/Button";
import Link from "next/link";
import { Tour } from "models/tour";
import { fCurrency2 } from "utils/formatNumber";
import clsx from "clsx";
import useAuth from "hooks/useAuth";
import Stars from "components/Stars";
import { formatStar } from "utils/formatStar";
interface Props { 
  tour: Tour;
  listRates: number[];
}

// eslint-disable-next-line react/display-name
const SectionTour = memo(({tour, listRates} : Props)=> {
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
    const newImages = tour?.images?.map((item, index) => {return {
      altText: 'Slide',
      caption: 'Slide',
      key: index + 1,
      src: item,
    }})
    setImages(newImages);
  }, [tour])

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
                  <small>{tour?.title}</small>
                  <br></br>
                  {tour?.businessHours} - {tour?.contact}          
                </p>
              </Col>
              <Col className="ml-auto mr-auto" md="6">
                <h2 className={`title ${classes.nameTour}`}>{tour?.title} - {tour?.location}</h2>
                {<div className={classes.tags}>
                    {tour?.tags?.map((item, index) => (
                        <Badge pill className={classes.badgeTags} key={index}>{item}</Badge>
                        
                      ))}
                </div>}
                {tour?.rate && <Stars numberOfStars={Math.floor(tour?.rate)}/>}
                <h2 className={`main-price ${classes.price}`}> {fCurrency2(tour?.price)} VND</h2>
                <h2 className={`main-price ${classes.businessHours}`}>Time business: {tour?.businessHours}</h2>
                <Row className="justify-content-end">
                  {user ? <Link href={`/book/tour/:${tour?.id}`}>
                    <a>
                  <Button className="mr-3" btnType={BtnType.Primary} isDot={true}>
                    Book now 
                  </Button>
                  </a>
                  </Link>
                  : <Link href={"/auth/login"}>
                    <a>
                  <Button className="mr-3" btnType={BtnType.Primary} isDot={true}>
                    Book now 
                  </Button>
                  </a>
                  </Link> }
                </Row>
              </Col>
            </Row>
            <Row className="ml-0 mr-0">
            <div
              aria-multiselectable={true}
              className={clsx("card-collapse", classes.description)}
              id="accordion"
              role="tablist"
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
                          {tour?.description}
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
