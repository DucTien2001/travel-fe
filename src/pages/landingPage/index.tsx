import type { NextPage } from "next";
import {
  Container,
  Row,
  Col,
} from "reactstrap";
import { useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import ListServices from "./components/Listservices";
import Feature from "./components/Feature";
import Section from "./components/Section";
import Testimonials from "./components/Testimonial";
import Contact from "./components/Contact";
import Social from "./components/Social";
import Footer from "components/Footer";
import {images} from "configs/images";
import Link from "next/link";
import Button, {BtnType}from "components/common/buttons/Button";
import TransparentNavbar from "components/Navbars/TransparentNavbar";

const LandingPage: NextPage = () => {
  const [navbarOpen1, setNavbarOpen1] = useState(false);
  const [navbarOpen2, setNavbarOpen2] = useState(false);
  const [navbarOpen3, setNavbarOpen3] = useState(false);
  return (
    <>
      <TransparentNavbar/>
      {navbarOpen1 || navbarOpen2 || navbarOpen3 ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setNavbarOpen1(false);
            setNavbarOpen2(false);
            setNavbarOpen3(false);
          }}
        />
      ) : null}
      <div className="cd-section" id="headers">
      <div className="header-2">
          <div className="page-header header-filter">
            <div
              className={clsx("page-header-image", classes.pageHeader)}
            ></div>
            <Container>
              <Row>
                <Col className="ml-auto mr-auto text-center" md="8">
                  <h1 className={clsx("title", classes.titleHome)}>Discover</h1>
                  <h1 className={classes.titleHero}>Viet Nam</h1>
                </Col>  
              </Row>
              <Row className={classes.btnContainerWrapper} >
                <Link href="/login" passHref>
                  <a>
                    <Button
                      btnType={BtnType.Linear}
                      isDot = {true}
                      className={classes.btnExplore}  
                    >
                      Explore now
                    </Button>
                  </a>
                </Link>
              </Row>
              <Row>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <ListServices/>
      <Feature/>
      <Row>
        <img alt="section" src={images.section.src}></img>
      </Row>
      <Section/>
      <Testimonials/>
      <Contact/>
      <Social/>
      <Footer/>
    </>
  );
};

export default LandingPage;
