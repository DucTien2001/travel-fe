import React, {memo} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import SectionHotel from "./components/SectionHotel";
import CheckRoomEmpty from "./components/CheckRoomEmpty";
import Comment from "./Comment";
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

// eslint-disable-next-line react/display-name
const ProductPage = memo(()=> {
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <SectionHeader
        title="VIEW HOTEL"
        src={images.bgUser.src}
        />
        <SectionHotel id={0} src={""} title={""} description={""} businessHours={""} location={""} contact={""} price={0} rate={0} creator={""}/> 
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
