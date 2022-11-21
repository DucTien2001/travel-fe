import React, {memo, useState} from "react";
// reactstrap components
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselControl,
} from "reactstrap";

import 'aos/dist/aos.css';

interface Props { 
    className?: string;
    images: any[];
}

// eslint-disable-next-line react/display-name
const CustomCarousel = memo(({className, images} : Props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
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

    const slides = images?.map((item) => {
      return (
        <CarouselItem 
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.key}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.src} alt={item.altText} />
        </CarouselItem>
      );
    });
  return (
    <React.Fragment>
      <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      >
      <CarouselIndicators items={images} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
    </React.Fragment>
  );
});

export default CustomCarousel;
