import React, { memo, useEffect, useState } from "react";
import SectionHeader from "components/Header/SectionHeader";
import { images } from "configs/images";
import SectionHotel from "./components/SectionHotel";
import CheckRoomEmpty from "./components/CheckRoomEmpty";
import Comment from "./components/Comment";
import GoogleMapBody from "./components/GoogleMapBody";
import RelatedHotel from "./components/RelatedHotel";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Divider } from "components/common/Divider";
import { useRouter } from "next/router";
import { HotelService } from "services/normal/hotel";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";

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
];


interface Props {}
// eslint-disable-next-line react/display-name
const ProductPage = memo((Props) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const [hotel, setHotel] = useState<any>();
  useEffect(() => {
    if(router){
      dispatch(setLoading(true))
      HotelService.getHotel(Number(router.query.hotelId.slice(1))).
      then((res) => {
        setHotel(res.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      })
      .finally(() => {
        dispatch(setLoading(false))
      })
    }
  }, [router]);
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <SectionHeader title="VIEW HOTEL" src={images.bgUser.src} />
        <SectionHotel hotel={hotel}
        />
        <div className={classes.container}>
          <CheckRoomEmpty hotel={hotel}/>
          {/* <Comment comment={listCmt}/> */}
        </div>
        <GoogleMapBody />
        {/* <RelatedHotel /> */}
      </div>
    </>
  );
});

export default ProductPage;
