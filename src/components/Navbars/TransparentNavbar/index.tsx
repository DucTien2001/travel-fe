/*eslint-disable*/
import { useState, useEffect, memo } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBook,
  faLocationDot,
  faPlane,
  faHotel,
  faAddressCard,
  faCalendarCheck,
  faLandmarkDome,
  faBarsProgress,
  faEarthAsia,
  faE,
  faV,
  faSquarePlus,
  faBagShopping,
  faKey,
  faSignsPost,
  faTags,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import Link from "next/link";
import dynamic from "next/dynamic";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import SignOutButton from "components/common/buttons/SignOutButton";
import UseAuth from "hooks/useAuth";
import { EUserType } from "models/user";
import { images } from "configs/images";
import { langSupports } from "models/general";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttractionsIcon from "@mui/icons-material/Attractions";
import SellIcon from "@mui/icons-material/Sell";
import PublicIcon from "@mui/icons-material/Public";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const WhiteNavbar = memo(() => {
  const { isLoggedIn, logout, user } = UseAuth();
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [navbarColor, setNavbarColor] = useState(" navbar-transparent");
  const handleCollapseNavbar = () => {
    if (window.innerWidth <= 991) {
      document.documentElement.classList.toggle("nav-open");
      setCollapseOpen(!collapseOpen);
    }
  };

  const changeLanguage = async (lang: string) => {
    // setAnchorElLang(null);
    // if (lang === i18n.language) return;
    // if (isLoggedIn) {
    //   dispatch(setLoading(true));
    //   await UserService.changeLanguage(lang).finally(() =>
    //     dispatch(setLoading(false))
    //   );
    // }
    // i18n.changeLanguage(lang, () => {
    //   window.location.reload();
    // });
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
      <Navbar
        className={
          user?.role === EUserType.USER || !user
            ? clsx("fixed-top", navbarColor, classes.navbarWrapper)
            : clsx("fixed-top", classes.navbarWrapperViolet)
        }
        expand="lg"
      >
        <Container className={classes.container}>
          <div className={clsx("navbar-translate", classes.navLogoName)}>
            <Link href="/" passHref>
              <a>TRAVELIX</a>
            </Link>
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
          <Collapse
            isOpen={collapseOpen}
            navbar
            className={classes.collapseMobile}
          >
            <Nav
              className={clsx("ml-auto", classes.navWrapperMenu)}
              id="ceva"
              navbar
            >
              <NavItem className={classes.navItem}>
                <Link href="/listTour" passHref>
                  <a>
                    <AttractionsIcon
                      sx={{ fontSize: "20px !important", marginRight: "8px" }}
                    />
                    <p>TOURS</p>
                  </a>
                </Link>
              </NavItem>
              <NavItem className={classes.navItem}>
                <Link href="/listHotel" passHref>
                  <a>
                    <ApartmentIcon
                      sx={{ fontSize: "20px !important", marginRight: "8px" }}
                    />
                    <p>STAYS</p>
                  </a>
                </Link>
              </NavItem>
              <NavItem className={classes.navItem}>
                <Link href="/listEvents" passHref>
                  <a>
                    <SellIcon
                      sx={{ fontSize: "20px !important", marginRight: "8px" }}
                    />
                    <p>COUPONS & DEALS</p>
                  </a>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="navbarDropdownMenuLink"
                  nav
                  onClick={(e) => e.preventDefault()}
                  className={classes.dropdownMenu}
                >
                  <PublicIcon
                    sx={{ fontSize: "20px !important", marginRight: "8px" }}
                  />
                  <p>Languages</p>
                  <ArrowDropDownIcon />
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                  {langSupports.map((it) => (
                    <DropdownItem
                      className={classes.dropdownItem}
                      key={it.key}
                      onClick={() => changeLanguage(it.key)}
                    >
                      <img src={it.img} alt="anh" />
                      {it.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </UncontrolledDropdown>
              {isLoggedIn ? (
                <>
                  <UncontrolledDropdown nav>
                    <DropdownToggle
                      color="default"
                      data-toggle="dropdown"
                      href="#pablo"
                      id="navbarDropdownMenuLink"
                      nav
                      onClick={(e) => e.preventDefault()}
                      className={classes.dropdownMenu}
                    >
                      <AccountBoxIcon
                        sx={{ fontSize: "20px !important", marginRight: "8px" }}
                      />
                      <p>Profile</p>
                      <ArrowDropDownIcon />
                    </DropdownToggle>
                    <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                      <DropdownItem className="noti-title" header tag="div">
                        <h6 className={classes.headerTitle}>Welcome!</h6>
                      </DropdownItem>
                      <DropdownItem className={classes.dropdownItem}>
                        <Link href="/profile" passHref>
                          <a>
                            <FontAwesomeIcon
                              icon={faAddressCard}
                              className={classes.iconNav}
                            />
                            My profile
                          </a>
                        </Link>
                      </DropdownItem>
                      <DropdownItem className={classes.dropdownItem}>
                        <Link href="/paymentHistory" passHref>
                          <a>
                            <FontAwesomeIcon
                              icon={faCalendarCheck}
                              className={classes.iconNav}
                            />
                            Payment history
                          </a>
                        </Link>
                      </DropdownItem>
                      {(user?.role === EUserType.ENTERPRISE ||
                        user?.role === EUserType.STAFF) && (
                        <DropdownItem className={classes.dropdownItem}>
                          <Link href="/enterprises/tours" passHref>
                            <a>
                              <FontAwesomeIcon
                                icon={faBarsProgress}
                                className={classes.iconNav}
                              />
                              Management
                            </a>
                          </Link>
                        </DropdownItem>
                      )}
                      {user?.role === EUserType.ADMIN ||
                        (user?.role === EUserType.SUPER_ADMIN && (
                          <DropdownItem className={classes.dropdownItem}>
                            <Link href="/admin/users" passHref>
                              <a>
                                <FontAwesomeIcon
                                  icon={faBarsProgress}
                                  className={classes.iconNav}
                                />
                                Management
                              </a>
                            </Link>
                          </DropdownItem>
                        ))}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem onClick={logout}>
                    <Link href="/auth/login" passHref>
                      <a>
                        <Button btnType={BtnType.Secondary}>Log out</Button>
                      </a>
                    </Link>
                  </NavItem>
                </>
              ) : (
                <>
                  <NavItem className={classes.navMobile}>
                    <Link href="/auth/login" passHref>
                      <a>
                        <Button btnType={BtnType.Secondary}>Log in</Button>
                      </a>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <Link href="/auth/signup" passHref>
                      <a>
                        <Button btnType={BtnType.Secondary}>Register</Button>
                      </a>
                    </Link>
                  </NavItem>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
});

export default WhiteNavbar;
