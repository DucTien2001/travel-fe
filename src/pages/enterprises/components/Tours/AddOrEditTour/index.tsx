import React, { memo, useState } from "react";
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

interface Props {
  itemEdit?: ETour;
}

// eslint-disable-next-line react/display-name
const AddOrEditTour = memo((props: Props) => {
  const { itemEdit } = props;
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState<EStep>(EStep.INFORMATION);

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

  return (
    <>
      <div className={classes.root}>
        <Container className={clsx(classes.rowHeaderBox, classes.title)}>
          {!itemEdit ? <h3>Create tour</h3> : <h3>Edit tour</h3>}
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
            itemEdit={itemEdit}
            value={activeStep}
            index={EStep.INFORMATION}
            handleNextStep={() => onNextStep(EStep.SCHEDULE)}
          />
          <Schedule
            itemEdit={itemEdit}
            value={activeStep}
            index={EStep.SCHEDULE}
            handleNextStep={() => onNextStep(EStep.PRICE)}
          />
          <RangePrice
            itemEdit={itemEdit}
            value={activeStep}
            index={EStep.PRICE}
          />
        </Container>
      </div>
    </>
  );
});

export default AddOrEditTour;
