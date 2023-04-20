import React, { memo, useMemo, useRef, useState } from "react";
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
import _ from "lodash";

interface Props extends ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  toggle?: () => void;
  tour?: Tour;
}

// eslint-disable-next-line react/display-name
const PopupDetailTour = memo((props: Props) => {
  const { isOpen, toggle, onClose, tour } = props;

  const policyType = useMemo(() => {
    return _.toArray(_.groupBy(tour?.tourPolicies, "policyType"));
  }, [tour]);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className={classes.root}>
        <ModalHeader toggle={toggle} className={classes.title}>
          {tour?.title}
        </ModalHeader>

        <ModalBody className={classes.modalBody}>
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
                {policyType[0]?.length ? (
                  <ul>
                    {policyType[0]?.map((item, index) => (
                      <li key={index}>
                        Request a refund at the latest{" "}
                        <span className={classes.titleDetail}>
                          {item?.dayRange} day(s)
                        </span>{" "}
                        before your selected visit date to get up to{" "}
                        <span className={classes.titleDetail}>
                          {item?.moneyRate}%{" "}
                        </span>{" "}
                        refund.
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>This booking cannot be rescheduled.</p>
                )}

                <p className={classes.titleDetail}>- Refund Policy: </p>
                {policyType[1]?.length ? (
                  <ul>
                    {policyType[1]?.map((item, index) => (
                      <li key={index}>
                        Request a refund at the latest{" "}
                        <span className={classes.titleDetail}>
                          {item?.dayRange} day(s)
                        </span>{" "}
                        before your selected visit date to get up to{" "}
                        <span className={classes.titleDetail}>
                          {item?.moneyRate}%{" "}
                        </span>{" "}
                        refund.
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>This booking cannot be rescheduled.</p>
                )}
              </Grid>
            </Grid>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
});

export default PopupDetailTour;
