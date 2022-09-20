/*eslint-disable*/
import {useState, useEffect, memo} from "react";
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavItem,
  Navbar,
  Nav,
  Container,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faLocationDot, faPlane, faHotel, 
  faAddressCard,
  faCalendarCheck, 
  faLandmarkDome,
  faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import clsx from "clsx";
import Link from "next/link";
import dynamic from "next/dynamic";
import classes from "./styles.module.scss";
import SignOutButton from "components/common/buttons/SignOutButton";
const WhiteNavbar = memo(() => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [navbarColor, setNavbarColor] = useState(" navbar-transparent");

  const handleCollapseNavbar = () => {
    if (window.innerWidth <= 991) {
      document.documentElement.classList.toggle("nav-open");
      setCollapseOpen(!collapseOpen);
    }
  };

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 10 ||
        document.body.scrollTop > 10
      ) {
        setNavbarColor("");
      } else {
        setNavbarColor(" navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return () => {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []);
  return (
    <>
      <Navbar className={clsx("fixed-top", navbarColor, classes.navbarWrapper)} expand="lg">
        <Container className={classes.container}>
          <div className={clsx("navbar-translate", classes.navLogoName)}>
            <Link href="/">TRAVELIX</Link>
            <button
              onClick={handleCollapseNavbar}
              aria-expanded={collapseOpen}
              className="navbar-toggler"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse isOpen={collapseOpen} navbar className={classes.collapseMobile}>
            <Nav className={clsx("ml-auto", classes.navWrapperMenu)} id="ceva" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink1"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                 <FontAwesomeIcon icon={faLocationDot} className={classes.iconNav}/>
                  <p>Services</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink1">
                  <DropdownItem className={classes.dropdownItem}>
                    <Link href="/">
                      <a>
                        <FontAwesomeIcon icon={faPlane} className={classes.iconNav}/>
                        Tour
                      </a>
                    </Link>
                  </DropdownItem>
                  <DropdownItem className={classes.dropdownItem}>
                    <Link href="/">
                      <a>
                        <FontAwesomeIcon icon={faHotel} className={classes.iconNav}/>
                        Hotel
                      </a>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <FontAwesomeIcon icon={faBook} className={classes.iconNav}/>
                  <p>About us</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                  <DropdownItem className={classes.dropdownItem}>
                    <Link href="/">
                      <a>
                        <FontAwesomeIcon icon={faLandmarkDome} className={classes.iconNav}/>
                        Story
                      </a>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <FontAwesomeIcon icon={faUser} className={classes.iconNav}/>
                  <p>Profile</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                  <DropdownItem className="noti-title" header tag="div">
                        <h6 className={classes.headerTitle}>Welcome!</h6>
                      </DropdownItem>
                  <DropdownItem className={classes.dropdownItem}>
                    <Link href="/about">
                      <a>
                        <FontAwesomeIcon icon={faAddressCard} className={classes.iconNav}/>
                        My profile
                      </a>
                    </Link>
                  </DropdownItem>
                  <DropdownItem className={classes.dropdownItem}>
                    <Link href="/about">
                      <a>
                        <FontAwesomeIcon icon={faCalendarCheck} className={classes.iconNav}/>
                        Activity
                      </a>
                    </Link>
                  </DropdownItem>
                  <DropdownItem className={classes.dropdownItem}>
                    <Link href="/about">
                      <a>
                        <FontAwesomeIcon icon={faEarthAsia} className={classes.iconNav}/>
                        Languages
                      </a>
                    </Link> 
                    <div className={classes.menuLanguages}>
                        <div>English</div>
                        <div>VietNamese</div>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
              <SignOutButton/>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}) 

export default WhiteNavbar;
