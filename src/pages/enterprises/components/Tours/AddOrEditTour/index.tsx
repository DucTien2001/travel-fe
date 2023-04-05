import React, { memo, useEffect, useState } from "react";
import { Container } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import { ETour } from "models/enterprise";
import clsx from "clsx";
import { Box, Tab, Tabs } from "@mui/material";
import Information from "./components/Information";
import Schedule from "./components/Schedule";
import RangePrice from "./components/RangePrice";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import QueryString from "query-string";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/enterprise/tour";

export enum EStep {
  INFORMATION,
  SCHEDULE,
  PRICE,
}

function controlProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
interface IQueryString {
  lang?: string;
}
interface Props {
  tourId?: number;
}

// eslint-disable-next-line react/display-name
const AddOrEditTour = memo((props: Props) => {
  const { tourId } = props;
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const router = useRouter();
  let lang;
  if (typeof window !== "undefined") {
    ({ lang } = QueryString.parse(window.location.search));
  }

  const [activeStep, setActiveStep] = useState<EStep>(EStep.INFORMATION);
  const [itemEdit, setItemEdit] = useState<ETour>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveStep(newValue);
  };

  const onNextStep = (type: EStep) => {
    switch (type) {
      case EStep.INFORMATION:
        setActiveStep(EStep.INFORMATION);
        break;
      case EStep.SCHEDULE:
        setActiveStep(EStep.SCHEDULE);
        break;
      case EStep.PRICE:
        setActiveStep(EStep.PRICE);
        break;
    }
  };

  const onBack = () => {
    router.push("/enterprises/tours");
  };

  useEffect(() => {
    if (tourId && !isNaN(Number(tourId))) {
      const fetchData = async () => {
        dispatch(setLoading(true));
        TourService.getOneTour(Number(tourId), lang)
          .then((res) => {
            setItemEdit(res?.data);
          })
          .catch((err) => setErrorMess(err))
          .finally(() => dispatch(setLoading(false)));
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tourId, dispatch]);

  return (
    <>
      <div className={classes.root}>
        <Container className={clsx(classes.rowHeaderBox, classes.title)}>
          {!tourId ? <h3>Create tour</h3> : <h3>Edit tour</h3>}
          <Button onClick={onBack} btnType={BtnType.Primary}>
            Back
          </Button>
        </Container>
        <Container className={classes.tabsBox}>
          <Tabs
            value={activeStep}
            onChange={handleChange}
            variant="scrollable"
            classes={{
              root: classes.rootTabs,
              indicator: classes.indicatorTabs,
              flexContainer: classes.flexContainer,
            }}
          >
            <Tab
              {...controlProps(EStep.INFORMATION)}
              label={
                <Box display="flex" alignItems="center">
                  <span className={classes.tabItemTitle}>Information</span>
                </Box>
              }
            />
            <Tab
              {...controlProps(EStep.SCHEDULE)}
              label={
                <Box display="flex" alignItems="center">
                  <span
                    className={classes.tabItemTitle}
                    // translation-key="target_tab"
                  >
                    Schedule
                  </span>
                </Box>
              }
            />
            <Tab
              {...controlProps(EStep.PRICE)}
              label={
                <Box display="flex" alignItems="center">
                  <span className={classes.tabItemTitle}>
                    Range Price & Date
                  </span>
                </Box>
              }
            />
          </Tabs>
        </Container>
        <Container className={classes.tabContent}>
          <Information
            value={activeStep}
            index={EStep.INFORMATION}
            itemEdit={itemEdit}
            lang={lang}
            handleNextStep={() => onNextStep(EStep.SCHEDULE)}
          />
          <Schedule
            value={activeStep}
            index={EStep.SCHEDULE}
            itemEdit={itemEdit}
            lang={lang}
            handleNextStep={() => onNextStep(EStep.PRICE)}
          />
          <RangePrice
            value={activeStep}
            index={EStep.PRICE}
            itemEdit={itemEdit}
          />
        </Container>
      </div>
    </>
  );
});

export default AddOrEditTour;
