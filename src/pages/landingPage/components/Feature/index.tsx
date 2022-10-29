import { memo } from "react";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import {images} from "configs/images";
import classes from "./styles.module.scss";
// eslint-disable-next-line react/display-name
const Feature = memo(() => {
  return (
    <>
         <div className="features-5">
          <Container>
            <Row className={classes.titleWrapper}>
                <h2 className="title">About us</h2>
            </Row>
            <Row>
              <Col md="5">
                <div className="info info-horizontal">
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
                <div className="info info-horizontal">
                  <div className="icon icon-info icon-circle">
                    <i className="now-ui-icons sport_user-run"></i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Easy to Use</h4>
                    <p>
                      Divide details about your product or agency work into
                      parts. Write a few lines about each one. A paragraph
                      describing a feature.
                    </p>
                  </div>
                </div>
                <div className="info info-horizontal">
                  <div className="icon icon-info icon-circle">
                    <i className="now-ui-icons ui-2_time-alarm"></i>
                  </div>
                  <div className="description">
                    <h4 className="info-title">Fast Prototyping</h4>
                    <p>
                      Divide details about your product or agency work into
                      parts. Write a few lines about each one. A paragraph
                      describing a feature.
                    </p>
                  </div>
                </div>
              </Col>
              <Col md="7">
                <div className="tablet-container">
                  <img
                    alt="intro"
                    src={images.intro.src}
                  ></img>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
    </>
  );
})

export default Feature;
