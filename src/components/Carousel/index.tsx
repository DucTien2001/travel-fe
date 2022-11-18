import React, {memo, useState} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselProps,
  CarouselControl,
} from "reactstrap";

import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import {Image} from "models/tour";

interface Props { 
    className?: string;
    images: any[];
}

// eslint-disable-next-line react/display-name
const CustomCarousel = memo(({className, images} : Props) => {
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
    const goToIndex = (newIndex: React.SetStateAction<number>) => {
      if (animating) return;
      setActiveIndex(newIndex);
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


    const items=[
      {
        altText: 'Slide 1',
        caption: 'Slide 1',
        key: 1,
        src: 'https://picsum.photos/id/123/1200/600'
      },
      {
        altText: 'Slide 2',
        caption: 'Slide 2',
        key: 2,
        src: 'https://picsum.photos/id/456/1200/600'
      },
      {
        altText: 'Slide 3',
        caption: 'Slide 3',
        key: 3,
        src: 'https://picsum.photos/id/678/1200/600'
      }
    ]
    const slides = items?.map((item) => {
      return (
        <CarouselItem 
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.key}
        >
          <img src={item.src} alt={item.altText} />
        </CarouselItem>
      );
    });

    // console.log(items)
  return (
    <React.Fragment>
        {/* <Carousel
            className={className}
            activeIndex={activeIndex}
            next={next}
            previous={previous}
            slide={false}
            >
                <CarouselIndicators
                    items={images}
                    activeIndex={activeIndex}
                    onClickHandler={goToIndex}
                />
                {images?.map((item, index) => 
                      <CarouselItem
                        onExiting={onExiting}
                        onExited={onExited}
                        key={index}
                      >
                        <img
                          key={index}
                          src={item.src}
                          alt={item.altText}
                          className="d-block img-raised"
                        />
                      </CarouselItem>            
                  )}
                  {slides}
                <a
                    className="carousel-control-prev"
                    data-slide="prev"
                    href="#pablo"
                    onClick={(e) => {
                      e.preventDefault();
                      previous();
                    }}
                    role="button"
                >
                <Button
                    btnType ={BtnType.Secondary}
                    name="button"
                    size="sm"
                    className={classes.btn}
                >
                     <i className="now-ui-icons arrows-1_minimal-left"></i>
                </Button>
                </a>
             <a
                className="carousel-control-next"
                data-slide="next"
                href="#pablo"
                onClick={(e) => {
                    e.preventDefault();
                next();
                }}
                role="button"
                >
                <Button
                    btnType ={BtnType.Secondary}
                    name="button"
                    size="sm"
                    className={classes.btn}
                >
                    <i className="now-ui-icons arrows-1_minimal-right"></i>
                </Button>
            </a>
        </Carousel> */}
      <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      >
      {/* <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} /> */}
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    </React.Fragment>
  );
});

export default CustomCarousel;
