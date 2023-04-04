import React, { useEffect, useState, useMemo } from "react";
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
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/normal/tour";
import SearchNotFound from "components/SearchNotFound";
import FilterPanel from "../../components/FilterPanel";
import ReactPaginate from "react-paginate";
import CustomSelect from "components/common/CustomSelect";
import InputSelect from "components/common/inputs/InputSelect";
import { sortType } from "models/general";
import { Grid } from "@mui/material";
import Link from "next/link";

const ListEvents: NextPage = () => {
  return (
    <>
      <SectionHeader
        src={images.pannerCoupon.src}
        className={classes.imgHeader}
      />
      <Row className={classes.containerBody}>
        <Container>
          <Grid className={classes.titleBody}>
            <h1>All Ongoing Promotions</h1>
            <p>
              Looking for flight tickets and hotels for your next holiday or
              business trip? You know you can save a lot more by using these
              promotions:
            </p>
          </Grid>
          <Grid className={classes.rowResultBody} container spacing={2}>
            <Grid xs={2} className={classes.btnResetWrapper} item>
              <Button
                btnType={BtnType.Primary}
                className={classes.btnResetOption}
              >
                See All Promos
              </Button>
            </Grid>
            <Grid xs={10} item className={classes.wrapperListItem}>
              <Grid
                container
                columnSpacing={2}
                sx={{ paddingBottom: "16px" }}
                columns={{ xs: 4, sm: 4, md: 12 }}
              >
                <Grid xs={4} item>
                  <Grid className={classes.itemEvent}>
                    <Grid className={classes.boxImg}>
                      <img src={images.deal1.src} alt="anh" />
                    </Grid>
                    <Grid sx={{ padding: "10px 14px 18px 14px" }}>
                      <Grid className={classes.boxTitle}>
                        <h5>Spring Travel Deals!</h5>
                      </Grid>
                      <Grid className={classes.boxSubTitle}>
                        <p>
                          Spring travel fair with hot deals for flight tickets,
                          bus & shuttle, airport transfer, and car rental.
                        </p>
                      </Grid>
                      <Grid className={classes.boxSeeMore}>
                        <Link href={`/listEvents/:${1}`}>
                          <Grid>See More</Grid>
                        </Link>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={4} item>
                  <Grid className={classes.itemEvent}>
                    <Grid className={classes.boxImg}>
                      <img src={images.deal1.src} alt="anh" />
                    </Grid>
                    <Grid sx={{ padding: "10px 14px 18px 14px" }}>
                      <Grid className={classes.boxTitle}>
                        <h5>Spring Travel Deals!</h5>
                      </Grid>
                      <Grid className={classes.boxSubTitle}>
                        <p>
                          Spring travel fair with hot deals for flight tickets,
                          bus & shuttle, airport transfer, and car rental.
                        </p>
                      </Grid>
                      <Grid className={classes.boxSeeMore}>
                        <Grid>See More</Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={4} item>
                  <Grid className={classes.itemEvent}>
                    <Grid className={classes.boxImg}>
                      <img src={images.deal1.src} alt="anh" />
                    </Grid>
                    <Grid sx={{ padding: "10px 14px 18px 14px" }}>
                      <Grid className={classes.boxTitle}>
                        <h5>Spring Travel Deals!</h5>
                      </Grid>
                      <Grid className={classes.boxSubTitle}>
                        <p>
                          Spring travel fair with hot deals for flight tickets,
                          bus & shuttle, airport transfer, and car rental.
                        </p>
                      </Grid>
                      <Grid className={classes.boxSeeMore}>
                        <Grid>See More</Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Row>
    </>
  );
};

export default ListEvents;
