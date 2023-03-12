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
import { Col } from "reactstrap";
interface FormSearch {
  tour?: string;
}

// eslint-disable-next-line react/display-name
const TourSearch = memo(() => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const [focus, setFocus] = useState(false);
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
      <Grid component="form" onSubmit={handleSubmit(_onSubmit)}>
        <InputTextfield
          className={classes.inputSearch}
          placeholder="Search tour or destination"
          name="tour"
          title="Destination"
          startAdornment={<FontAwesomeIcon icon={faSearch} />}
          inputRef={register("tour")}
          onKeyPress={handleKeyPress}
          autoComplete="off"
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {focus && (
          <Grid className={classes.recentSearchBox}>
            <Grid
              className={classes.recentSearch}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px 16px",
                backgroundColor: "var(--gray-10)",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlassArrowRight}
              ></FontAwesomeIcon>
              <div>
                <p>Vinhome</p>
                <span>Recent Searchs</span>
              </div>
            </Grid>
          </Grid>
        )}
        <Grid className={classes.boxSuggest}>
          <h4>Local Destinations to Explore</h4>
          <p>Get ready to discover the best places on our radar</p>
          <Swiper
            slidesPerView={isMobile ? 1 : 4}
            spaceBetween={10}
            slidesPerGroup={isMobile ? 1 : 4}
            loop={true}
            loopFillGroupWithBlank={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={clsx("mySwiper", classes.swiper)}
          >
            <SwiperSlide>
              <Col>
                <Grid className={classes.itemSuggest}>
                  <div>
                    <img src={images.bgUser.src} alt="anh"></img>
                  </div>

                  <p>Nha Trang</p>
                </Grid>
              </Col>
            </SwiperSlide>
            <SwiperSlide>
              <Col>
                <Grid className={classes.itemSuggest}>
                  <div>
                    <img src={images.bgUser.src} alt="anh"></img>
                  </div>

                  <p>Nha Trang</p>
                </Grid>
              </Col>
            </SwiperSlide>
            <SwiperSlide>
              <Col>
                <Grid className={classes.itemSuggest}>
                  <div>
                    <img src={images.bgUser.src} alt="anh"></img>
                  </div>

                  <p>Nha Trang</p>
                </Grid>
              </Col>
            </SwiperSlide>
            <SwiperSlide>
              <Col>
                <Grid className={classes.itemSuggest}>
                  <div>
                    <img src={images.bgUser.src} alt="anh"></img>
                  </div>

                  <p>Nha Trang</p>
                </Grid>
              </Col>
            </SwiperSlide>
          </Swiper>
          {/* <Grid className={classes.itemSuggest}>
            <div>
              <img src={images.bgUser.src} alt="anh"></img>
            </div>

            <p>Nha Trang</p>
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
});

export default TourSearch;
