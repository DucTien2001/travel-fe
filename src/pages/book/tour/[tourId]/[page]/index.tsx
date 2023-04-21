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
import PopupCheckReview from "components/Popup/PopupCheckReview";
import Booking from "../components/Booking";
import Review from "../components/Review";
import { BookTourReview } from "models/tour";
import { setConfirmBookTourReviewReducer } from "redux/reducers/Normal/actionTypes";

export enum EStep {
  BOOKING,
  REVIEW,
  PAYMENT,
}

// eslint-disable-next-line react/display-name
const BookTour = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { page } = router.query;
  const { t, i18n } = useTranslation();

  const [modal, setModal] = useState(false);
  const [tour, setTour] = useState<any>();
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

  const handleChangeStep = () => {
    setActiveStep(EStep.REVIEW);
    router.push(`/book/tour/:${tour?.id}/review`);
    toggle();
  };

  const onSubmitTourToReview = (data: BookTourReview) => {
    dispatch(
      setConfirmBookTourReviewReducer({
        firstName: data?.firstName,
        lastName: data?.lastName,
        email: data?.email,
        phoneNumber: data?.phoneNumber,
        numberOfAdult: data?.numberOfAdult,
        numberOfChild: data?.numberOfChild,
        price: data?.price,
        startDate: data?.startDate,
        specialRequest: data?.specialRequest,
        priceOfAdult: data?.priceOfAdult,
        priceOfChild: data?.priceOfChild,
      })
    );
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

  const renderComponent = () => {
    switch (page) {
      case "booking":
        return <Booking onSubmit={onSubmitTourToReview} />;
      case "review":
        return <Review />;
    }
  };

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
            <Grid>{renderComponent()}</Grid>
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
