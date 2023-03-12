import React, { memo, useEffect, useState, useMemo } from "react";
import SectionHeader from "components/Header/SectionHeader";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Container } from "reactstrap";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { TourService } from "services/normal/tour";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Grid, StepConnector, StepLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import QontoStepIcon from "components/QontoStepIcon";
import Booking from "./components/Booking";
import PopupCheckReview from "./components/PopupCheckReview";

export enum EStep {
  BOOKING,
  REVIEW,
  PAYMENT,
}

// eslint-disable-next-line react/display-name
const BookTour = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const [modal, setModal] = useState(false);
  const [tour, setTour] = useState<any>();
  const [showContinueInfor, setShowContinueInfor] = useState<FormData>();
  const [activeStep, setActiveStep] = useState<EStep>(EStep.BOOKING);

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

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const handleGetInfor = (data: FormData) => {
    setShowContinueInfor(data);
    toggle();
  };

  const handleChangeStep = () => {
    if (!showContinueInfor) return;
    setActiveStep(EStep.PAYMENT);
    onSubmit(showContinueInfor);
    toggle();
  };

  useEffect(() => {
    if (router) {
      TourService.getTour(Number(router.query.tourId.slice(1)))
        .then((res) => {
          setTour(res.data);
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <SectionHeader
          className={classes.sectionHeader}
          title="BOOK TOUR"
          src={images.bgbook.src}
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
                <Booking onSubmit={handleGetInfor} />
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
    </>
  );
});

export default BookTour;
