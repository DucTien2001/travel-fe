import React, {memo} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import DetailTour from "./components/DetailTour";
import DetailCustomer from "./components/DetailCustomer";
import {
  Container, 
  Row,
  Col,
} from "reactstrap";

// eslint-disable-next-line react/display-name
const ProductPage = memo(()=> {
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <SectionHeader
        title="BOOK TOUR"
        src={images.pricing1.src}
        />
        <Container>
            <Row className={classes.root}>
                <Col xs={4}>
                  <DetailTour/>
                </Col>
                <Col xs={8}>
                  <DetailCustomer/>
                </Col>
            </Row>
        </Container>    
      </div>
    </>
  );
})

export default ProductPage;
