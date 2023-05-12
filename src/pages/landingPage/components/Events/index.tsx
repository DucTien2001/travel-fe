import { memo, useEffect, useMemo, useState } from "react";
import "aos/dist/aos.css";
import { Grid } from "@mui/material";
import InputTextfield from "components/common/inputs/InputTextfield";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassArrowRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./styles.module.scss";
import { images } from "configs/images";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Stars from "components/Stars";
import Aos from "aos";
import "aos/dist/aos.css";
import { useMediaQuery, useTheme } from "@mui/material";
import { clsx } from "clsx";
import { Col, Container } from "reactstrap";
import Link from "next/link";
import Button, { BtnType } from "components/common/buttons/Button";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/display-name
const TourSearch = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { t, i18n } = useTranslation("common");

  return (
    <>
      <Grid className={classes.root} container spacing={2}>
        <Grid item xs={6}>
          <h3 className={classes.titleEvent}>
            {t("landing_page_section_event_title")}
          </h3>
          <p className={classes.subTitleEvent}>
            {t("landing_page_section_event_sub_title")}
          </p>
          <Link href="/listEvents">
            <Button btnType={BtnType.Primary}> {t("common_view_more")}</Button>
          </Link>
        </Grid>
        <Grid item xs={6}>
          <Swiper
            slidesPerView={isMobile ? 1 : 3}
            spaceBetween={30}
            slidesPerGroup={isMobile ? 1 : 3}
            initialSlide={0}
            loop={true}
            // onSlideChange={(e) => console.log(e.realIndex)}
            // loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={clsx("mySwiper", classes.swiper)}
          >
            <SwiperSlide>
              <Grid>
                <img src={images.deal1.src} alt="anh"></img>
              </Grid>
            </SwiperSlide>
          </Swiper>
        </Grid>
      </Grid>
    </>
  );
});

export default TourSearch;
