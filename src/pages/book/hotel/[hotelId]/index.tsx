import React, { useEffect, useMemo, useState } from "react";
// reactstrap components
import { Container, Row, Col } from "reactstrap";
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import SectionHeader from "components/Header/SectionHeader";
import { ReducerType } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { HotelService } from "services/normal/hotel";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import PopupCheckReview from "components/Popup/PopupCheckReview";
import { Grid, Step, StepConnector, StepLabel, Stepper } from "@mui/material";
import QontoStepIcon from "components/QontoStepIcon";
import { useTranslation } from "next-i18next";
import Booking from "./Booking";
import Review from "./review";
import { IUserInformationBookRoom } from "redux/reducers/Normal";
import { PAYMENT_HOTEL_SECTION } from "models/payment";
export enum EStep {
  BOOKING,
  REVIEW,
  PAYMENT,
}
const BookingComponent: NextPage = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const hotelId = Number(router.query.hotelId.slice(1));

  const [modal, setModal] = useState(false);
  const [activeStep, setActiveStep] = useState<EStep>(EStep.BOOKING);
  const [showContinueInfor, setShowContinueInfor] =
    useState<IUserInformationBookRoom>();

  const steps = useMemo(() => {
    return [
      {
        id: EStep.BOOKING,
        name: "Booking",
      },
      {
        id: EStep.REVIEW,
        name: "Review",
      },
      {
        id: EStep.PAYMENT,
        name: "Pay",
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

  const toggle = () => setModal(!modal);

  const scrollToElement = () => {
    const el = document.getElementById(PAYMENT_HOTEL_SECTION.HOME_PAY);
    if (!el) return;
    const headerHeight = document.getElementById("header")?.offsetHeight || 0;
    window.scrollTo({
      behavior: "smooth",
      top: el.offsetTop - headerHeight - 10,
    });
  };

  const handleGetInfor = (data: IUserInformationBookRoom) => {
    setShowContinueInfor(data);
    toggle();
  };

  const handleChangeStep = () => {
    if (!showContinueInfor) return;
    setActiveStep(EStep.REVIEW);
    // onSubmit(showContinueInfor);
    scrollToElement();
    toggle();
  };

  return (
    <div
      className={clsx("wrapper", classes.root)}
      id={PAYMENT_HOTEL_SECTION.HOME_PAY}
    >
      <SectionHeader
        className={classes.sectionHeader}
        title="BOOK ROOM"
        src={images.pricing2.src}
      />
      <Grid className={classes.rootContent}>
        <Container>
          <Grid className={classes.boxStepPayment}>
            <Stepper
              alternativeLabel
              activeStep={activeStep}
              classes={{ root: classes.rootStepper }}
              connector={
                <StepConnector
                  classes={{
                    root: classes.rootConnector,
                    active: classes.activeConnector,
                  }}
                />
              }
            >
              {steps.map((item, index) => {
                return (
                  <Step key={index}>
                    <StepLabel
                      StepIconComponent={QontoStepIcon}
                      classes={{
                        root: classes.rootStepLabel,
                        completed: classes.rootStepLabelCompleted,
                        active: classes.rootStepLabelActive,
                        label: classes.rootStepLabel,
                      }}
                    >
                      {item.name}{" "}
                    </StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Grid>
          <Grid>
            {activeStep === EStep.BOOKING && (
              <Booking onSubmit={handleGetInfor} handleChangeStep={toggle} />
            )}
          </Grid>
          <Grid>
            {activeStep === EStep.REVIEW && (
              <Review userInformation={showContinueInfor} />
            )}
          </Grid>
        </Container>
      </Grid>
      <PopupCheckReview
        isOpen={modal}
        onClose={toggle}
        toggle={toggle}
        onClick={handleChangeStep}
      />
    </div>
  );
};

export default BookingComponent;
