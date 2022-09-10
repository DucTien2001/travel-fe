import type { NextPage } from "next";
import {
  Button,
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Collapse,
} from "reactstrap";
import { useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import dynamic from "next/dynamic";

const WhiteNavbar = dynamic(
  () => import("components/Navbars/WhileNavbar"),
  { ssr: false }
);

const LandingPage: NextPage = () => {
  const items = [
    {
      src: "url(" + require("assets/img/bg20.jpg") + ")",
      content: (
        <Row>
          <Col md="5">
            <div className="iframe-container">
              <iframe
                title="myIframe"
                // allowFullScreen=""
                frameBorder="0"
                height="250"
                src="https://www.youtube.com/embed/rmfmdKOLzVI?rel=0&amp;controls=0&amp;showinfo=0"
              ></iframe>
            </div>
          </Col>
          <Col className="ml-auto mr-auto text-right" md="6">
            <h1 className="title">On the run tour.</h1>
            <h4 className="description">
              On the Run Tour: Beyoncé and Jay Z is a 2014 concert special which
              documents the September 12 and 13, 2014, shows of American singers
              {"'"}
              Beyoncé and Jay-Z joint co-headlining venture On the Run Tour.
            </h4>
          </Col>
        </Row>
      ),
      altText: "",
      caption: "",
    },
    {
      src: "url(" + require("assets/img/bg15.jpg") + ")",
      content: (
        <Row>
          <Col className="ml-auto mr-auto text-center" md="8">
            <h1 className="title">Island of legends.</h1>
            <h4 className="description">
              The islands of Malta and Gozo are brilliant for a family holiday,
              packed with fun places to visit whatever your children’s ages. The
              islands’ small size means everywhere is within easy reach.
            </h4>
            <br></br>
            <h5>Connect with us on:</h5>
            <div className="buttons">
              <Button
                className="btn-icon btn-neutral btn-round mt-2 mr-1"
                color="danger"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round mt-2 mr-1"
                color="danger"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round mt-2 mr-1"
                color="danger"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fab fa-google-plus"></i>
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round mt-2"
                color="danger"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fab fa-instagram"></i>
              </Button>
            </div>
          </Col>
        </Row>
      ),
      altText: "",
      caption: "",
    },
    {
      src: "url(" + require("assets/img/bg17.jpg") + ")",
      content: (
        <Row>
          <Col className="text-left" md="6">
            <h1 className="title">Arctic Sea ice.</h1>
            <h4 className="description">
              According to the National Oceanic and Atmospheric Administration,
              Ted Scambos, NSIDC lead scientist, puts the potentially record low
              maximum sea ice extent this year down to low ice extent in the
              Pacific and a late drop in ice extent in the Barents Sea.
            </h4>
            <br></br>
            <div className="buttons">
              <Button
                className="btn-neutral mr-1"
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="lg"
              >
                <i className="now-ui-icons files_single-copy-04"></i> Read
                More..
              </Button>
              <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="lg"
              >
                <i className="now-ui-icons arrows-1_share-66"></i> Subscribe
              </Button>
            </div>
          </Col>
        </Row>
      ),
      altText: "",
      caption: "",
    },
  ];
  // navbar collapses states and functions
  const [navbarOpen1, setNavbarOpen1] = useState(false);
  const [navbarOpen2, setNavbarOpen2] = useState(false);
  const [navbarOpen3, setNavbarOpen3] = useState(false);
  // header 3 carousel states and functions
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const onExiting = () => {
    setAnimating(true);
  };
  const onExited = () => {
    setAnimating(false);
  };
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };
  const goToIndex = (newIndex: any) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };
  return (
    <>
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
      <div className="section-space"></div>
      <div className="cd-section" id="headers">
        <div className="header-1">
          <Navbar
            className="navbar-transparent bg-info navbar-absolute"
            expand="lg"
          >
            <Container>
              <div className="navbar-translate">
                <button
                  aria-expanded={navbarOpen1}
                  className="navbar-toggler"
                  data-toggle="collapse"
                  type="button"
                  onClick={() => {
                    document.documentElement.classList.toggle("nav-open");
                    setNavbarOpen1(!navbarOpen1);
                  }}
                >
                  <span className="navbar-toggler-bar bar1"></span>
                  <span className="navbar-toggler-bar bar2"></span>
                  <span className="navbar-toggler-bar bar3"></span>
                </button>
                <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                  Creative Tim
                </NavbarBrand>
              </div>
              <Collapse navbar isOpen={navbarOpen1}>
                <Nav className="mx-auto" navbar>
                  <NavItem className="active">
                    <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      Contact Us
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="nav" navbar>
                  <NavItem>
                    <NavLink
                      href="https://twitter.com/CreativeTim?ref=creativetim"
                      target="_blank"
                    >
                      <i className="fab fa-twitter"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.facebook.com/CreativeTim?ref=creativetim"
                      target="_blank"
                    >
                      <i className="fab fa-facebook-square"></i>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
                      target="_blank"
                    >
                      <i className="fab fa-instagram"></i>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
          <div className="page-header header-filter">
            <div
              className={clsx("page-header-image", classes.pageHeader)}
              // style={{
              //   backgroundImage: "url(" + require("assets/img/bg16.jpg") + ")",
              // }}
            ></div>
            <Container>
              <Row>
                <Col className="ml-auto text-right" md="7">
                  <h1 className="title">History of surfing</h1>
                  <h4 className="description">
                    The riding of waves has likely existed since humans began
                    swimming in the ocean. In this sense, bodysurfing is the
                    oldest type of wave-catching. Standing up on what is now
                    called a surfboard is a relatively recent innovation
                    developed by the Polynesians.
                  </h4>
                  <br></br>
                  <div className="buttons">
                    <Button
                      className="btn-icon btn-neutral"
                      color="link"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-neutral"
                      color="link"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-neutral"
                      color="link"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-get-pocket"></i>
                    </Button>
                    <Button
                      className="mr-3"
                      color="info"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      Read More
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
