import type { NextPage } from "next";
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Navbar,
  NavbarBrand,
  Collapse,
  Media,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  ButtonDropdown,
  Button,
  // PopoverHeader,
  // PopoverBody,
  // UncontrolledPopover,
} from "reactstrap";
// import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import {images} from "configs/images";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faUser, faCalendarCheck, faArrowRightFromBracket, faEarthAsia } from '@fortawesome/free-solid-svg-icons';
import React from "react";

const NavbarComponent: NextPage = () => {
  // navbar collapses states and functions
  
  const [navbarOpen1, setNavbarOpen1] = useState(false);
  const [navbarOpen2, setNavbarOpen2] = useState(false);
  const [navbarOpen3, setNavbarOpen3] = useState(false);

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dropDownOpenItem, setDropDownOpenItem] = useState(false);

  const [openMenuLanguage, setOpenMenuLanguage] = useState(false);


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //----------------------------------------------------------------------------

  const [anchorElItem, setAnchorElItem] = React.useState<null | HTMLElement>(null);
  const openItem = Boolean(anchorElItem);
  const handleClickItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElItem(event.currentTarget);
  };
  const handleCloseItem = () => {
    setAnchorElItem(null);
  };

  const toggleDropDown = () => {
    setDropDownOpen(prevState => !prevState);
  }

  const toggleDropDownItem = () => {
    setDropDownOpenItem(prevState => !prevState);
  }
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
      <div className="cd-section" id="headers">
      <div>
          <Navbar
            className={clsx("navbar-absolute", classes.navbarContainer)}
            expand="lg"
          >
            <Container className={classes.container}>
              <div className="navbar-translate">
                <button
                  aria-expanded={navbarOpen2}
                  className="navbar-toggler"
                  data-toggle="collapse"
                  type="button"
                  onClick={() => {
                    document.documentElement.classList.toggle("nav-open");
                    setNavbarOpen1(!navbarOpen2);
                  }}
                >
                  <span className="navbar-toggler-bar bar1"></span>
                  <span className="navbar-toggler-bar bar2"></span>
                  <span className="navbar-toggler-bar bar3"></span>
                </button>
                <NavbarBrand className={classes.navBrand} href="#pablo" onClick={(e) => e.preventDefault()}>
                  travelix
                </NavbarBrand>
              </div>
              <Collapse navbar isOpen={navbarOpen2}>
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
                      Services
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#pablo" onClick={(e) => e.preventDefault()}>
                      Contact Us
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="nav navbar-right" navbar>
                  <NavItem>
                    <NavLink
                      href="https://twitter.com/CreativeTim?ref=creativetim"
                      target="_blank"
                    >   
                      <FontAwesomeIcon icon={faTwitter} fontSize="16px"/>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="https://www.facebook.com/CreativeTim?ref=creativetim"
                      target="_blank"
                    >
                      <FontAwesomeIcon icon={faFacebook} fontSize="16px"/>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/">
                      <FontAwesomeIcon icon={faInstagram} fontSize="16px"/>
                    </NavLink>
                  </NavItem>
                </Nav>
                {/* ---------------Before user login ------------------------------- */}
                <Nav className="nav navbar-right" navbar>
                  <NavItem>
                    <NavLink href="/">
                      Login
                    </NavLink>
                  </NavItem>  
                  <NavItem className={classes.navDivider}>
                    <span className={classes.divider}></span>
                  </NavItem>              
                  <NavItem>
                    <NavLink href="/">
                      Sign up
                    </NavLink>
                  </NavItem>
                </Nav>
                {/* -----------When user login ------------------------------- */}
                 {/* <Nav className="align-items-center d-none d-md-flex ml-4" navbar>
                  <UncontrolledDropdown isOpen={dropDownOpen} toggle={toggleDropDown} nav>
                    <DropdownToggle nav className={classes.dropdownToggle}> 
                          <Image alt="avatar" src={images.pricing1.src} width="30px" height="30px" className={classes.imageAvatar}/>
                          <span>Jessica</span>
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow">
                      <DropdownItem className={clsx("noti-title", classes.headerItem)} header tag="div">
                        <h6 className={classes.headerTitle}>Welcome!</h6>
                      </DropdownItem>
                      <Link href="/">
                        <DropdownItem>
                         <FontAwesomeIcon icon={faUser} fontSize="16px"/>
                          <span className="ml-2">My profile</span>
                        </DropdownItem>
                      </Link>
                      <Link href="/">
                        <DropdownItem>
                        <FontAwesomeIcon icon={faCalendarCheck} fontSize="16px"/>
                          <span className="ml-2">Activity</span>
                        </DropdownItem>
                      </Link>
                      <Link href="/">
                        <DropdownItem className={classes.itemDropDown}>
                              <FontAwesomeIcon icon={faEarthAsia} fontSize="16px" />
                              <span className="ml-2">Languages</span>
                              <div className={classes.menuLanguages}>
                                  <div>English</div>
                                  <div>VietNamese</div>
                              </div>
                        </DropdownItem>
                      </Link>
                      <DropdownItem divider />
                      <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                      <FontAwesomeIcon icon={faArrowRightFromBracket} fontSize="16px"/>
                        <span className="ml-2">Logout</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav> */}
              </Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default NavbarComponent;
