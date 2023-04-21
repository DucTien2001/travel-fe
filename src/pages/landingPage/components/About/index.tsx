import { memo, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { images } from "configs/images";
import classes from "./styles.module.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { Card, Grid } from "@mui/material";

// eslint-disable-next-line react/display-name
const About = memo(() => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <>
      <Grid className={classes.root}>
        {/* <Container>
          <Row className={classes.titleWrapper}>
            <h3 className={"title"} data-aos="fade-up">
              About us
            </h3>
          </Row>
          <div data-aos="fade-right" className={classes.divider}></div>
          <Row>
            <Col md="5">
              <div className="info info-horizontal" data-aos="fade-right">
                <div className="icon icon-info icon-circle">
                  <i className="now-ui-icons location_world"></i>
                </div>
                <div className="description">
                  <h4 className="info-title">Hundreds of Components</h4>
                  <p>
                    The moment you use Now UI Kit, you know you’ve never felt
                    anything like it. With a single use lets you do more than
                    ever before.
                  </p>
                </div>
              </div>
              <div className="info info-horizontal" data-aos="fade-right">
                <div className="icon icon-info icon-circle">
                  <i className="now-ui-icons sport_user-run"></i>
                </div>
                <div className="description">
                  <h4 className="info-title">Easy to Use</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature.
                  </p>
                </div>
              </div>
              <div className="info info-horizontal" data-aos="fade-right">
                <div className="icon icon-info icon-circle">
                  <i className="now-ui-icons ui-2_time-alarm"></i>
                </div>
                <div className="description">
                  <h4 className="info-title">Fast Prototyping</h4>
                  <p>
                    Divide details about your product or agency work into parts.
                    Write a few lines about each one. A paragraph describing a
                    feature.
                  </p>
                </div>
              </div>
            </Col>
            <Col md="7">
              <div className="tablet-container" data-aos="zoom-in">
                <img alt="intro" src={images.intro.src}></img>
              </div>
            </Col>
          </Row>
        </Container> */}
        <h3 className={classes.title}>Latest stories from Travelix</h3>
        <Grid container spacing={2} className={classes.containerBoxCard}>
          <Grid item xs={6}>
            <Card className={classes.card}>
              <p>
                {" "}
                🌍 Help me, LP! I’m planning a week-long trip to the Viet Nam
                this summer. Where do I start?
              </p>
              <span>
                {" "}
                Can’t decide which glorious Viet Nam to include on your
                week-long itinerary? We have some tips to help you plan.
              </span>
            </Card>
          </Grid>
          <Grid item xs={6} container spacing={2}>
            <Grid item xs={6} container className={classes.aboutCard}>
              <Grid item xs={8} className={classes.col8}>
                <Card className={classes.card1}></Card>
              </Grid>
              <Grid item xs={4} className={classes.col4}>
                <div className={classes.titleCard}>
                  <h3>13 things you need to know before visiting Greece</h3>
                  Weve got everything you need to know before your next trip to
                  Viet Nam.
                </div>
              </Grid>
            </Grid>
            <Grid item xs={6} container className={classes.aboutCard}>
              <Grid item xs={8} className={classes.col8}>
                <Card className={classes.card2}></Card>
              </Grid>
              <Grid item xs={4} className={classes.col4}>
                <div className={classes.titleCard}>
                  <h3>Here&apos;s how you can visit Viet Nam on a budget</h3>
                  How to save money on a trip to Greece with cheap flights,
                  ferries, trains and buses plus how to get the best deal on
                  hotels, food and drinks.
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
});

export default About;
