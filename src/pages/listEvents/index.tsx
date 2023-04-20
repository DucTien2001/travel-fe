import React, { useEffect, useState, useMemo } from "react";
// reactstrap components
import { Container, Row } from "reactstrap";

import { NextPage } from "next";
import { images } from "configs/images";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";

import Button, { BtnType } from "components/common/buttons/Button";
import SectionHeader from "components/Header/SectionHeader";

import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/normal/tour";
import { DataPagination, sortType } from "models/general";
import { Grid } from "@mui/material";
import Link from "next/link";
import useDebounce from "hooks/useDebounce";
import { FindAll, IEvent } from "models/event";
import { useDispatch } from "react-redux";
import { EventService } from "services/normal/event";

const ListEvents: NextPage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<DataPagination<IEvent>>();
  const [keyword, setKeyword] = useState<string>("");

  const fetchData = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
  }) => {
    const params: FindAll = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: keyword,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    EventService.getAllEvents(params)
      .then((res) => {
        setData({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    _onSearch(e.target.value);
  };

  const _onSearch = useDebounce(
    (keyword: string) => fetchData({ keyword, page: 1 }),
    500
  );

  const handleChangePage = (_: React.ChangeEvent<unknown>, newPage: number) => {
    fetchData({
      page: newPage + 1,
    });
  };

  console.log(data?.data);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
                {data?.data?.map((event, index) => (
                  <Link href={`/listEvents/:${event?.id}`} key={index}>
                    <Grid xs={4} item className={classes.boxItemEvent}>
                      <Grid className={classes.itemEvent}>
                        <Grid className={classes.boxImg}>
                          <img src={event.banner} alt="anh" />
                        </Grid>
                        <Grid sx={{ padding: "10px 14px 18px 14px" }}>
                          <Grid className={classes.boxTitle}>
                            <h5>{event?.name}</h5>
                          </Grid>
                          <Grid className={classes.boxSubTitle}>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: event?.description,
                              }}
                            ></p>
                          </Grid>
                          <Grid className={classes.boxSeeMore}>
                            <Grid>See More</Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Link>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Row>
    </>
  );
};

export default ListEvents;
