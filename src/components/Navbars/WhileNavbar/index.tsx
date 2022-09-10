/*eslint-disable*/
import React from "react";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
} from "reactstrap";
import Link from "next/link";
import classes from "./styles.module.scss";
// import EmployerButton from "components/Common/ContractorButton";

function WhiteNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="bg-white fixed-top" expand="lg">
        <Container className={classes.container}>
          <div className="navbar-translate">
            {/* <NavbarBrand to="/" tag={Link} id="navbar-brand"> */}
            <Link href="/">Necta</Link>
            {/* </NavbarBrand> */}
            {/* <UncontrolledTooltip target="navbar-brand">
              Simplifying Contracting
            </UncontrolledTooltip> */}
            <button
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              className="navbar-toggler"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse isOpen={collapseOpen} navbar>
            <Nav className="ml-auto" id="ceva" navbar>
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
                  <i className="now-ui-icons design_app"></i>
                  <p>Components</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink1" right>
                  <DropdownItem>
                    <Link href="/">
                      <a>
                        <i className="now-ui-icons design_image"></i>
                        Presentation
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
                  <i
                    aria-hidden={true}
                    className="now-ui-icons files_paper"
                  ></i>
                  <p>Sections</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink" right>
                  <DropdownItem>
                    <Link href="/">
                      <a>
                        <i className="now-ui-icons shopping_box"></i>
                        Headers
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
                  <i
                    aria-hidden={true}
                    className="now-ui-icons design_image"
                  ></i>
                  <p>Examples</p>
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink" right>
                  <DropdownItem>
                    <Link href="/about">
                      <a>
                        <i className="now-ui-icons business_bulb-63"></i>
                        About-us
                      </a>
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {/* <NavItem>
              <EmployerButton/>
              </NavItem> */}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default WhiteNavbar;
