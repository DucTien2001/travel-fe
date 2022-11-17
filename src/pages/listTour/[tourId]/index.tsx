import React, {memo, useEffect} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import SectionTour from "./components/SectionTour";
import Comment from "./components/Comment";
import GoogleMapBody from "./components/GoogleMapBody";
import RelatedTour from "./components/RelatedTour";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { getTour, setTourReducer } from "redux/reducers/Normal/actionTypes";
import { useRouter } from "next/router";
import { TourService } from "services/normal/tour";

const listCmt = [
  {
    user: { 
      id: 1,
      email: "khoiyahoo@gmail.com",
      passWord: "1234",
      role: 1,
      avatar: images.michael.src,
      firstName: "Khoi",
      lastName: "Dinh",
      address: "An thoi",
      phoneNumber: "032323233",
      introduction: "dsadsadsa",
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
      role: 1,
      avatar: images.michael.src,
      firstName: "Khoi",
      lastName: "Dinh",
      address: "An thoi",
      phoneNumber: "032323233",
      introduction: "dsadsadsa",
      isDelete: false,
      isVerified: false,
    },
    comment: "Chuyen di that tuyet voi",
    date: new Date(),
  },  {
    user: { 
      id: 1,
      email: "khoiyahoo@gmail.com",
      passWord: "1234",
      role: 1,
      avatar: images.michael.src,
      firstName: "Khoi",
      lastName: "Dinh",
      address: "An thoi",
      phoneNumber: "032323233",
      introduction: "dsadsadsa",
      isDelete: false,
      isVerified: false,
    },
    comment: "Chuyen di that tuyet voi",
    date: new Date(),
  },
]


// eslint-disable-next-line react/display-name
const ProductPage = memo(()=> {
  const dispatch = useDispatch();
  const {tour} = useSelector((state: ReducerType) => state.normal);
  const router = useRouter()
  useEffect(() => {
    if(router){

      TourService.getTour(Number(router.query.tourId.slice(1))).then(res=>console.log(res, "============"))
    }
    // console.log("========const router = useRouter()====")
    // console.log(, "========const router = useRouter()====")
  }, [router]);
  console.log(tour);
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        {/* <SectionHeader
        title="VIEW TOUR"
        src={images.bgUser.src}
        />
        <SectionTour tour={tour}/>
        <div className={classes.containerComment}>
          <Comment comment={listCmt}/>
        </div>
        <GoogleMapBody/>
        <RelatedTour/> */}
      </div>
    </>
  );
})

export default ProductPage;
