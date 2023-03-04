import { memo, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { images } from "configs/images";
import classes from "./styles.module.scss";
import Aos from "aos";
import "aos/dist/aos.css";

// eslint-disable-next-line react/display-name
const About = memo(() => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  return (
    <>
      <div className="features-5">
        <Container>
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
        </Container>
      </div>
    </>
  );
});

export default About;
