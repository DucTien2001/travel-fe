import React from "react";
import Link from "next/link";
// reactstrap components
import {
  Container,
  Row,
  Col,
  TabPane,
  TabContent,
  NavLink,
  NavItem,
  Nav,
} from "reactstrap";
import { Item } from "routes/routers";

import { NextPage } from "next";
import { images } from "configs/images";
import classes from "./styles.module.scss";
import clsx from "clsx";
import SectionHeader from "components/Header/SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowsRotate,
  faArrowRightFromBracket,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
import UserProfile from "./UserProfile";
import ChangePassword from "./ChangePassword";
import { Divider } from "@mui/material";
import UseAuth from "hooks/useAuth";
interface Props {
  routes: Item[];
}

const Profile: NextPage = () => {
  const { logout } = UseAuth();
  const [verticalTabs, setVerticalTabs] = React.useState("1");

  return (
    <>
      <SectionHeader title="MY PROFILE" src={images.bgUser.src} />
      <Container className={classes.root}>
        <Row>
          <Col md="4">
            <Nav className="nav-pills-info flex-column" pills role="tablist">
              <NavItem className={classes.navItem}>
                <NavLink
                  className={clsx(
                    verticalTabs === "1" ? `${classes.active}` : classes.navLink
                  )}
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setVerticalTabs("1");
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                  <div>
                    <span>Profile</span>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={clsx(
                    verticalTabs === "2" ? `${classes.active}` : classes.navLink
                  )}
                  href="#pablo"
                  onClick={(e) => {
                    e.preventDefault();
                    setVerticalTabs("2");
                  }}
                >
                  <FontAwesomeIcon icon={faArrowsRotate} />
                  <div>
                    <span>Change password</span>
                  </div>
                </NavLink>
              </NavItem>
              <Divider />
              <NavItem className={classes.navLogout} onClick={logout}>
                <Link href="/auth/login">
                  <a>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                    <span>Logout</span>
                  </a>
                </Link>
              </NavItem>
            </Nav>
          </Col>
          <Col md="8">
            <TabContent
              activeTab={"verticalTabs" + verticalTabs}
              className={classes.tabContent}
            >
              <TabPane tabId="verticalTabs1">
                <UserProfile />
              </TabPane>
              <TabPane tabId="verticalTabs2">
                <ChangePassword />
              </TabPane>
              {/* <TabPane tabId="verticalTabs3">
                      <Link href="/login">
                        <a>Login</a>
                      </Link>
                    </TabPane> */}
            </TabContent>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
