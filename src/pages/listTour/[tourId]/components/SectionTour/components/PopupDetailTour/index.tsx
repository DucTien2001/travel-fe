import React, { memo, useState } from "react";
import {
  Modal,
  ModalProps,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
} from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import { DETAIL_SECTION, Tour } from "models/tour";
import { Link } from "react-scroll";
import { Grid, Tabs, useMediaQuery, useTheme } from "@mui/material";
import styled from "styled-components";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
const NavLink = styled(Link)`
  color: blue;
  &.active {
    border-bottom: 5px solid var(--primary-color);
  }
`;

interface Props extends ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  toggle?: () => void;
  tour?: Tour;
}

// eslint-disable-next-line react/display-name
const PopupConfirmDeleteTour = memo((props: Props) => {
  const { isOpen, toggle, onClose, tour } = props;

  const [changeTab, setChangeTab] = useState(false);
  const closeMenu = () => setChangeTab(false);

  console.log(tour);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className={classes.root}>
        <ModalHeader toggle={toggle} className={classes.title}>
          {tour?.title}
        </ModalHeader>
        <ModalBody className={classes.modalBody}>
          <Container className={classes.containerNav}>
            <Tabs variant="scrollable" value={0} className={classes.rootTabs}>
              <div className={classes.listNav}>
                <div className={classes.navItem}>
                  <NavLink
                    to={`${DETAIL_SECTION.section_overview}`}
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                    activeClass="active"
                    onClick={closeMenu}
                  >
                    Overview
                  </NavLink>
                </div>
                <div className={classes.navItem}>
                  <NavLink
                    to={`${DETAIL_SECTION.section_term_condition}`}
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                    activeClass="active"
                    onClick={closeMenu}
                  >
                    Terms and Condition
                  </NavLink>
                </div>
                <div className={classes.navItem}>
                  <NavLink
                    to={`${DETAIL_SECTION.section_reschedule_refund}`}
                    spy={true}
                    smooth={true}
                    offset={-90}
                    duration={500}
                    activeClass="active"
                    onClick={closeMenu}
                  >
                    Reschedule & Refund
                  </NavLink>
                </div>
              </div>
            </Tabs>
          </Container>
          <Container>
            <Grid
              id={DETAIL_SECTION.section_overview}
              className={classes.rootOverview}
            >
              <Grid className={classes.boxTitle}>
                <AirplaneTicketIcon />
                <p>Tour Details</p>
              </Grid>
              <Grid className={classes.boxDuration}>
                <p className={classes.titleDetail}>- Tour Duration: </p>
                <p>
                  {tour?.numberOfDays} days - {tour?.numberOfNights} nights
                </p>
              </Grid>
              <Grid className={classes.boxDuration}>
                <p className={classes.titleDetail}>- Tour Description: </p>
                <p dangerouslySetInnerHTML={{ __html: tour?.description }}></p>
              </Grid>
            </Grid>
            <Grid
              id={DETAIL_SECTION.section_term_condition}
              className={classes.rootOverview}
            >
              <Grid className={classes.boxTitle}>
                <LibraryBooksIcon />
                <p>Terms and Condition</p>
              </Grid>
              <Grid className={classes.boxDuration}>
                <p className={classes.titleDetail}>- General Infomation: </p>
                <p
                  dangerouslySetInnerHTML={{ __html: tour?.termsAndCondition }}
                ></p>
              </Grid>
            </Grid>
            <Grid
              id={DETAIL_SECTION.section_reschedule_refund}
              className={classes.rootOverview}
            >
              <Grid className={classes.boxTitle}>
                <CreditScoreIcon />
                <p>Reschedule & Refund</p>
              </Grid>
              <Grid className={classes.boxDuration}>
                <p className={classes.titleDetail}>- Reschedule Policy: </p>
                <p
                  dangerouslySetInnerHTML={{ __html: tour?.termsAndCondition }}
                ></p>
              </Grid>
            </Grid>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
});

export default PopupConfirmDeleteTour;
