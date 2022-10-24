import React, {memo} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import SectionHotel from "./components/SectionHotel";
import CheckRoomEmpty from "./components/CheckRoomEmpty";
import Comment from "./components/Comment";
import GoogleMapBody from "./components/GoogleMapBody";
import RelatedHotel from "./components/RelatedHotel";
import clsx from "clsx";
import classes from "./styles.module.scss";
import {Divider} from "components/common/Divider";

const listCmt = [
  {
    user: { 
      id: 1,
      email: "khoiyahoo@gmail.com",
      passWord: "1234",
      role: "user",
      avatar: images.michael.src,
      firstName: "Khoi",
      lastName: "Dinh",
      address: "dasd",
      phoneNumber: "323424242",
      introduction: "dsadas",
      isDelete: false,
      isVerified: false,
    },
    comment: "Chuyen di that tuyet voi",
    date: new Date(),
  },
  {
    user: { 
      id: 1,
      email: "khoiyahoo@gmail.com",
      passWord: "1234",
      role: "user",
      avatar: images.michael.src,
      firstName: "Khoi",
      lastName: "Dinh",
      address: "dasd",
      phoneNumber: "323424242",
      introduction: "dsadas",
      isDelete: false,
      isVerified: false,
    },
    comment: "Chuyen di that tuyet voi",
    date: new Date(),
  },
  {
    user: { 
      id: 1,
      email: "khoiyahoo@gmail.com",
      passWord: "1234",
      role: "user",
      avatar: images.michael.src,
      firstName: "Khoi",
      lastName: "Dinh",
      address: "dasd",
      phoneNumber: "323424242",
      introduction: "dsadas",
      isDelete: false,
      isVerified: false,
    },
    comment: "Chuyen di that tuyet voi",
    date: new Date(),
  },
]
const hotel = 
  {
      id: 0,
      image: images.bgUser.src,
      star: 4,
      title: "Khach san ngan sao",
      description: "6 months access to the library",
      businessHours: "7AM - 10PM",
      location: "Khanh Hoa",
      contact: "09324343",
      price: 70,
      tags: "Sea",
      rate: 4,
      creator: "VietNam",
    
  }

interface Props {
  
}
// eslint-disable-next-line react/display-name
const ProductPage = memo((Props)=> {
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <SectionHeader
        title="VIEW HOTEL"
        src={images.bgUser.src}
        />
        <SectionHotel id={hotel.id} src={""} title={hotel.title} description={hotel.description} businessHours={hotel.businessHours} location={""} contact={""} price={0} rate={0} creator={""}/> 
        <div className={classes.container}>
          <CheckRoomEmpty/>
          <Comment comment={listCmt}/>
        </div>
        <GoogleMapBody/>
        <RelatedHotel/>
      </div>
    </>
  );
})

export default ProductPage;
