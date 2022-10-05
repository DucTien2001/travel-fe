import React, {memo} from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardSubtitle,
    CardText,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledDropdown,
} from "reactstrap";
import {images} from "configs/images";
import Carousel from "components/Carousel";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import CardItemGrid from "components/CardItemGrid";

// eslint-disable-next-line react/display-name
const ProductPage = memo(()=> {
    const listTour = [
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        
        },
        {
            image: images.bgUser.src,
            star: 5,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        
        },
    ]
  return (
    <>
        <div className="section related-products" data-background-color="black">
          <Container>
            <h3 className="title text-center">  
              You may also be interested in:
            </h3>
            <Row>
            {listTour.map((tour, index)=> ( 
                <CardItemGrid
                key={index}
                id = {index}
                src = {tour.image}
                title = {tour.title}
                numberStar = {tour.star}
                subTitle1 = {tour.subtitle}
                subTitle2 = {tour.subtitle2}
                />
            ))}
            </Row>
          </Container>
        </div>
    </>
  );
})

export default ProductPage;
