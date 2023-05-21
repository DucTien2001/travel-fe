import React, { memo, useMemo, useState } from "react";
import { Modal, ModalProps, ModalHeader, ModalBody } from "reactstrap";
import classes from "./styles.module.scss";
import { Grid } from "@mui/material";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { Room } from "models/room";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BedIcon from "@mui/icons-material/Bed";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { clsx } from "clsx";
import "swiper/swiper.min.css";
import { fCurrency2VND } from "utils/formatNumber";
import Button, { BtnType } from "components/common/buttons/Button";
interface Props extends ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  toggle?: () => void;
  room?: Room;
  minPrice?: number;
}

// eslint-disable-next-line react/display-name
const PopupDetailTour = memo((props: Props) => {
  const { isOpen, toggle, onClose, room, minPrice } = props;
  const { t, i18n } = useTranslation("common");
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className={classes.root}>
        <ModalHeader toggle={toggle} className={classes.title}>
          {room?.title}
        </ModalHeader>

        <ModalBody className={classes.modalBody}>
          <Grid container>
            <Grid item xs={8}>
              <Swiper
                pagination={{
                  type: "fraction",
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className={clsx("mySwiper", classes.swiper)}
                thumbs={{ swiper: thumbsSwiper }}
              >
                {room?.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div className={classes.containerImg}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="anh" className={classes.imgSlide} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
            <Grid xs={4} item sx={{ padding: "0 14px" }}>
              <Grid className={classes.boxGrid}>
                <p className={classes.titleGrid}>Room Information</p>
                <Grid className={classes.boxItem}>
                  <PeopleAltIcon />
                  <p>
                    {room?.numberOfAdult} adult, {room?.numberOfChildren}{" "}
                    children
                  </p>
                </Grid>
                <Grid className={classes.boxItem}>
                  <BedIcon />
                  <p>{room?.numberOfBed} bed</p>
                </Grid>
                <Grid className={classes.boxItem}>
                  <MeetingRoomIcon />
                  <p>{room?.numberOfRoom} room</p>
                </Grid>
              </Grid>
              <Grid className={classes.boxGrid}>
                <p className={classes.titleGrid}>
                  Room Feature(s) You May Like
                </p>
                <ul>
                  {room?.utility?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </Grid>
              <Grid className={classes.boxGridFooter}>
                <p className={classes.titleGrid}>starting from</p>
                <p className={classes.titlePrice}>
                  {fCurrency2VND(minPrice)} VND <span>/ room / night(s)</span>
                </p>
                <Button
                  btnType={BtnType.Primary}
                  className={classes.btnSeeRoom}
                >
                  See Room Option
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </ModalBody>
      </Modal>
    </>
  );
});

export default PopupDetailTour;
