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
  const listHotel = [
    {
        image: images.bgUser.src,
        star: 4,
        title: "Nha trang",
        description: "6 months access to the library",
        businessHours: "7AM - 10PM",
        location: "Khanh Hoa",
        contact: "09324343",
        price: 70,
        tags: "Sea",
        rate: 4,
        creator: "VietNam",
    },
    {
        image: images.bgUser.src,
        star: 4,
        title: "Nha trang",
        description: "6 months access to the library",
        businessHours: "7AM - 10PM",
        location: "Khanh Hoa",
        contact: "09324343",
        price: 70,
        tags: "Sea",
        rate: 4,
        creator: "VietNam",
        isTemporarilyStopWorking: false,
    },        {
        image: images.bgUser.src,
        star: 4,
        title: "Nha trang",
        description: "6 months access to the library",
        businessHours: "7AM - 10PM",
        location: "Khanh Hoa",
        contact: "09324343",
        price: 70,
        discount: 2,
        tags: "Sea",
        rate: 4,
        creator: "VietNam",
        isTemporarilyStopWorking: false,
    },        {
        image: images.bgUser.src,
        star: 4,
        title: "Nha trang",
        description: "6 months access to the library",
        businessHours: "7AM - 10PM",
        location: "Khanh Hoa",
        contact: "09324343",
        price: 70,
        discount: 2,
        tags: "Sea",
        rate: 4,
        creator: "VietNam",
        isTemporarilyStopWorking: false,
    },        {
        image: images.bgUser.src,
        star: 4,
        title: "Nha trang",
        description: "6 months access to the library",
        businessHours: "7AM - 10PM",
        location: "Khanh Hoa",
        contact: "09324343",
        price: 70,
        discount: 2,
        tags: "Sea",
        rate: 4,
        creator: "VietNam",
    },        {
        image: images.bgUser.src,
        star: 4,
        title: "Nha trang",
        description: "6 months access to the library",
        businessHours: "7AM - 10PM",
        location: "Khanh Hoa",
        contact: "09324343",
        price: 70,
        discount: 2,
        tags: "Sea",
        rate: 4,
        creator: "VietNam",
        isTemporarilyStopWorking: false,
    },        {
        image: images.bgUser.src,
        star: 4,
        title: "Nha trang",
        description: "6 months access to the library",
        businessHours: "7AM - 10PM",
        location: "Khanh Hoa",
        contact: "09324343",
        price: 70,
        discount: 2,
        tags: "Sea",
        rate: 4,
        creator: "VietNam",
    },        {
        image: images.bgUser.src,
        star: 4,
        title: "Nha trang",
        description: "6 months access to the library",
        businessHours: "7AM - 10PM",
        location: "Khanh Hoa",
        contact: "09324343",
        price: 70,
        discount: 2,
        tags: "Sea",
        rate: 4,
        creator: "VietNam",
        isTemporarilyStopWorking: true,
    },        {
        image: images.bgUser.src,
        star: 4,
        title: "Nha trang",
        description: "6 months access to the library",
        businessHours: "7AM - 10PM",
        location: "Khanh Hoa",
        contact: "09324343",
        price: 70,
        discount: 2,
        tags: "Sea",
        rate: 4,
        creator: "VietNam",
        isTemporarilyStopWorking: true,
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
            {listHotel.map((tour, index)=> ( 
                <CardItemGrid
                link="listTour"
                key={index}
                id = {index}
                src = {tour.image}
                title = {tour.title}
                description = {tour.description}
                businessHours = {tour.businessHours}
                location ={tour.location}
                contact={tour.contact}
                price ={tour.price}
                discount = {tour.discount}
               tags={tour.tags}
                rate={tour.rate}
                creator={tour.creator}
                isTemporarilyStopWorking={tour.isTemporarilyStopWorking}
                />
            ))}
            </Row>
          </Container>
        </div>
    </>
  );
})

export default ProductPage;
