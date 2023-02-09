import React, { useMemo, memo, useEffect } from "react";
import {
  Form,
  Modal,
  ModalProps,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputCounter from "components/common/inputs/InputCounter";
import Star from "components/Stars";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { CommentService } from "services/normal/comment";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";
import { Comment } from "models/comment";
import { getAllTours } from "redux/reducers/Normal/actionTypes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import clsx from "clsx";
interface Props {
  isOpen: boolean;
  toggle: () => void;
  images: any;
}
// eslint-disable-next-line react/display-name
const PopupModalImages = memo((props: Props) => {
  const { isOpen, toggle, images } = props;

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className={classes.root}>
        <ModalBody className={classes.modalBody}>
          <Swiper
            pagination={{
              type: "fraction",
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={clsx("mySwiper", classes.swiper)}
          >
            {images?.map((img, index) => (
              <SwiperSlide key={index}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt="anh" className={classes.imgSlide} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ModalBody>
      </Modal>
    </>
  );
});

export default PopupModalImages;
