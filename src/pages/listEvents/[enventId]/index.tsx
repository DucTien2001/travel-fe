import React, { useEffect, useState, useMemo, memo, useRef } from "react";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faList,
  faXmark,
  faSearch,
  faChevronLeft,
  faChevronRight,
  faArrowsRotate,
  faSignInAlt,
  faSignHanging,
  faSignsPost,
} from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Aos from "aos";
import "aos/dist/aos.css";
import InputRecentSearch from "components/common/inputs/InputRecentSearch";
import Button, { BtnType } from "components/common/buttons/Button";
import SectionHeader from "components/Header/SectionHeader";
import CardItemGrid from "components/CardItemGrid";
import CardItemList from "components/CardItemList";
import BoxSmallLeft from "components/BoxSmallLeft";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { TourService } from "services/normal/tour";
import SearchNotFound from "components/SearchNotFound";

import ReactPaginate from "react-paginate";
import CustomSelect from "components/common/CustomSelect";
import InputSelect from "components/common/inputs/InputSelect";
import { sortType } from "models/general";
import { Grid } from "@mui/material";
import InputTextfield from "components/common/inputs/InputTextfield";

interface CodeForm {
  code: string;
}

const EventPage = memo(() => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [copyCode, setCopyCode] = useState("ENJOY NHA TRANG");

  //   const watchCode = watch("code");
  //   setValue("code", "ENJOY NHA TRANG");

  //   console.log("watchCode", watchCode);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(copyCode);
    dispatch(setSuccessMess("Copy to clipboard"));
  };
  return (
    <>
      <SectionHeader
        src={images.pannerCoupon.src}
        className={classes.imgHeader}
      />
      <Row className={classes.containerBody}>
        <Container>
          <Grid className={classes.titleBody}>
            <h1>🎉 Big new year promo for outbound hotels</h1>
            <p>
              🔥 Travel to anywhere in the world during this festive year end
              super easily with diverse hotel recommendations and exciting deals
              up to 400K from Travelix!
            </p>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            <Grid className={classes.boxTicket}>
              <Grid className={classes.titleTicket}>
                <FontAwesomeIcon icon={faSignsPost}></FontAwesomeIcon>
                <p>Coupon Nha Trang 300K</p>
              </Grid>
              <Grid sx={{ paddingBottom: "10px" }}>
                <InputTextfield
                  className={classes.inputCode}
                  value={copyCode}
                  disabled
                  onChange={(e) => setCopyCode("ENJOY NHA TRANG")}
                  endAdornment={
                    <p
                      className={classes.textCopyInput}
                      onClick={handleCopyCode}
                    >
                      Copy
                    </p>
                  }
                />
              </Grid>
              <Grid className={classes.description}>
                <p>
                  Discount 4% up to 300,000 VND for hotel booking in Thailand
                  from 3,000,000 VND.
                </p>
              </Grid>
              <Grid className={classes.footTicket}>
                <p>Read Terms and Conditions</p>
              </Grid>
            </Grid>
            <Grid className={classes.textRemind}>
              <p>Coupons are limited and refilled every day</p>
            </Grid>
            <Grid sx={{ width: "100%" }}>
              <Button btnType={BtnType.Primary} className={classes.btnFind}>
                FIND SERVICE NOW
              </Button>
            </Grid>
            <Grid className={classes.boxTip}>
              <p>
                Book hotel for your holiday in VietNam with best ease on
                Travelix!
              </p>
              <ul>
                <li>
                  Easily find popular to travelers and well located hotels
                </li>
                <li>
                  The price you see is the price you pay, all costs are
                  displayed in VND.
                </li>
                <li>
                  More flexible with reasonably priced Pay upon Checkin options.
                </li>
              </ul>
            </Grid>
          </Grid>
        </Container>
      </Row>
    </>
  );
});

export default EventPage;
