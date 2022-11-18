import React, {memo, useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Container,
  Row,
  Col,
  Carousel,
  UncontrolledCarousel,
  CarouselItem,
  CarouselIndicators,
  CarouselProps,
  CarouselControl,
  Badge,
} from "reactstrap";
// import { Carousel } from 'react-responsive-carousel'
import {images} from "configs/images";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import Link from "next/link";
import { Tour } from "models/tour";
import { fCurrency2 } from "utils/formatNumber";
import clsx from "clsx";
interface Props { 
  tour: Tour;
}

const items = [
  {
    src: "https://res.cloudinary.com/dpvvffyul/image/upload/v1668655644/my-uploads/spyh7ujucwnkpgkhnifu.webp",
    altText: "",
    caption: "",
  },
  {
    src: "https://res.cloudinary.com/dpvvffyul/image/upload/v1668655643/my-uploads/bd4ylh4xlauzx1eosqgk.webp",
    altText: "",
    caption: "",
  },
  {
    src: "https://res.cloudinary.com/dpvvffyul/image/upload/v1668655644/my-uploads/spyh7ujucwnkpgkhnifu.webp",
    altText: "",
    caption: "",
  },
  {
    src: images.phuQuoc.src,
    altText: "",
    caption: "",
  },
];

// eslint-disable-next-line react/display-name
const SectionTour = memo(({tour} : Props)=> {
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    // if (animating) return;
    // const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    // setActiveIndex(nextIndex);
  };
  const previous = () => {
    // if (animating) return;
    // const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    // setActiveIndex(nextIndex);
  };
  // const slides = 
  
  console.log(items);

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
                {/* <Carousel
                  images={newImages}
                /> */}
                {images && (<Carousel
                  activeIndex={activeIndex}
                  next={next}
                  previous={previous}
                  >
                  {/* <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex}/> */}
                  { images?.map((item) => {
                    return (
                      <CarouselItem 
                        onExiting={() => setAnimating(true)}
                        onExited={() => setAnimating(false)}
                        key={item.src}
                      >
                        <img src={item.src} alt={item.altText} />
                      </CarouselItem>
                    );
                  })
                  }
                  <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                  <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>)}
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
                <h2 className={`main-price ${classes.price}`}> {fCurrency2(tour?.price)} VND</h2>
                <h2 className={`main-price ${classes.businessHours}`}>Time business: {tour?.businessHours}</h2>
                <Row className="justify-content-end">
                  <Link href={`/book/[${tour?.id}]`}>
                  <Button className="mr-3" btnType={BtnType.Primary} isDot={true}>
                    Book now 
                  </Button>
                  </Link>
                </Row>
              </Col>
            </Row>
            <Row>
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
