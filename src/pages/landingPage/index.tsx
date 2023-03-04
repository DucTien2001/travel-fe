import type { NextPage } from "next";
import { Container, Row, Col } from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import ListServices from "./components/Listservices";
import About from "./components/About";
import Search from "./components/Search";
import Offer from "./components/Offer";
import Testimonials from "./components/Testimonial";
import Contact from "./components/Contact";
import Social from "../../components/Social";
import Footer from "components/Footer";
import { images } from "configs/images";
import Link from "next/link";
import Button, { BtnType } from "components/common/buttons/Button";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Events from "./components/Events";

const LandingPage: NextPage = () => {
  useEffect(() => {
    Aos.init({ duration: 900 });
  }, []);
  return (
    <>
      <div className="cd-section" id="headers">
        <div className="header-2">
          <div
            className={clsx("page-header header-filter", classes.pageHeadBox)}
          >
            <div
              className={clsx("page-header-image", classes.pageHeader)}
            ></div>
            <Container>
              <Row>
                <Col
                  className="ml-auto mr-auto text-center"
                  md="8"
                  data-aos="fade-up"
                >
                  <h1 className={clsx("title", classes.titleHome)}>Discover</h1>
                  <h1 className={classes.titleHero}>Viet Nam</h1>
                </Col>
              </Row>
              <Row></Row>
            </Container>
          </div>
        </div>
      </div>
      <Search />
      <Events />
      <Offer />
      <About />
      <Testimonials />
      <Contact />
      <Social />
    </>
  );
};

export default LandingPage;
