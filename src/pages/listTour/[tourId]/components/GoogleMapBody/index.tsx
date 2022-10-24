import React, {memo} from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";

// eslint-disable-next-line react/display-name
const ProductPage = memo(()=> {


  return (
    <>
    <div className={clsx("section", classes.root)}>
          <Container>
            <div className={classes.headerGoogleMap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images.imagesItinerary.src} alt="anh"/>
              <h1>ITINERARY
              </h1>     
            </div>
            <div className={classes.bodyGoogleMap}></div>
          </Container>
    </div>
    </>
  );
})

export default ProductPage;
