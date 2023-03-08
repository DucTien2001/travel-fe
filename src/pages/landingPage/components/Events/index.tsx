import { memo, useEffect, useMemo, useState } from "react";
import "aos/dist/aos.css";
import { Grid } from "@mui/material";
import InputTextfield from "components/common/inputs/InputTextfieldttt";
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
interface FormSearch {
  tour?: string;
}

// eslint-disable-next-line react/display-name
const TourSearch = memo(() => {
  const schema = useMemo(() => {
    return yup.object().shape({
      tour: yup.string().required("Content search is required"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    getValues,
    watch,
  } = useForm<FormSearch>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [recentSearch, setRecentSearch] = useState([]);

  const addRecentSearch = (contentSearch) => {
    setRecentSearch((prev) => {
      const newRecentSearch = [...prev, contentSearch];
      return newRecentSearch;
    });
  };

  const watchSearch = watch("tour");

  const handleKeyPress = (e) => {
    var code = e.keyCode || e.which;
    if (code === 13) {
      //   const data = window.localStorage.setItem("")
      if (getValues("tour") !== "" || getValues("tour") !== " ") {
        addRecentSearch(getValues("tour"));
      }
    }
  };

  const [focus, setFocus] = useState(false);

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const _onSubmit = () => {
    // console.log(getValues("tour"));
  };

  return (
    <>
      <Container className={classes.root}>
        <h3 className={classes.title}>POPULAR DEALS</h3>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          className={classes.boxEvents}
        >
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img src={images.deal1.src} alt="anh"></img>
          </Grid>
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img src={images.deal1.src} alt="anh"></img>
          </Grid>
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img src={images.deal1.src} alt="anh"></img>
          </Grid>
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img src={images.deal1.src} alt="anh"></img>
          </Grid>
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img src={images.deal1.src} alt="anh"></img>
          </Grid>
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <img src={images.deal1.src} alt="anh"></img>
          </Grid>
        </Grid>
      </Container>
    </>
  );
});

export default TourSearch;
