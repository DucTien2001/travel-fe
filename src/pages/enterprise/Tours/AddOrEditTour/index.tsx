import React, { useMemo, memo, useCallback, useState, useEffect } from "react";
import { Row, Form, Col, Input, Container } from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputTags from "components/common/inputs/InputTags";
import InputSelect from "components/common/inputs/InputSelect";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UploadImage from "components/UploadImage";
import UploadFile from "components/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { TourService } from "services/enterprise/tour";
import useAuth from "hooks/useAuth";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { ETour } from "models/enterprise";
import axios from "axios";
import { ImageService } from "services/image";
import { getAllTours } from "redux/reducers/Enterprise/actionTypes";
import { getAllTours as getAllToursNormal } from "redux/reducers/Normal/actionTypes";
import { tagsOption, VALIDATION } from "configs/constants";
import { languagesType, OptionItem } from "models/general";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCamera,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import CustomSelect from "components/common/CustomSelect";
import clsx from "clsx";
import ErrorMessage from "components/common/texts/ErrorMessage";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Grid,
  Step,
  StepConnector,
  StepLabel,
  Stepper,
  Tab,
  Tabs,
} from "@mui/material";
import { EActiveNav } from "pages/enterprise";
import InputTextfield from "components/common/inputs/InputTextfield";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import InputCreatableSelect from "components/common/inputs/InputCreatableSelect";
import Information from "./components/Information";
import { TabPanel } from "@material-ui/lab";
import { CheckCircle } from "@mui/icons-material";
import { TourHelper } from "helpers/tour";
import { ReducerType } from "redux/reducers";
import Schedule from "./components/Schedule";
import RangePrice from "./components/RangePrice";
import { useTranslation } from "next-i18next";
import QontoStepIcon from "components/QontoStepIcon";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image"],
    ["clean"],
    [{ color: [] }, { background: [] }],
  ],
};

export enum EStep {
  INFORMATION,
  SCHEDULE,
  PRICE,
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Props {
  itemEdit?: ETour;
  onBack?: (type: EActiveNav) => void;
}

// eslint-disable-next-line react/display-name
const AddOrEditTour = memo((props: Props) => {
  const { itemEdit, onBack } = props;
  // const { tour } = useSelector((state: ReducerType) => state.enterprise);
  const { t, i18n } = useTranslation();

  const [activeStep, setActiveStep] = useState<EStep>(EStep.INFORMATION);
  // const [activeTab, setActiveTab] = useState(ETab.INFORMATION);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveStep(newValue);
  };

  const steps = useMemo(() => {
    return [
      {
        id: EStep.INFORMATION,
        name: "Information",
      },
      {
        id: EStep.SCHEDULE,
        name: "Schedule",
      },
      {
        id: EStep.PRICE,
        name: "Range Price & Day",
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.language]);

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

  const handleBack = () => {
    onBack(EActiveNav.Tour_Active);
  };

  return (
    <>
      <div className={classes.root}>
        <Container className={clsx(classes.rowHeaderBox, classes.title)}>
          {!itemEdit ? <h3>Create tour</h3> : <h3>Edit tour</h3>}
          <Button onClick={handleBack} btnType={BtnType.Primary}>
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
              {...a11yProps(EStep.INFORMATION)}
              label={
                <Box display="flex" alignItems="center">
                  {/* {isValidInformation && (
                    <CheckCircle className={classes.tabItemIcon} />
                  )} */}
                  <span className={classes.tabItemTitle}>Information</span>
                </Box>
              }
            />
            <Tab
              {...a11yProps(EStep.SCHEDULE)}
              label={
                <Box display="flex" alignItems="center">
                  {/* {isValidTargetTab && (
                    <CheckCircle className={classes.tabItemIcon} />
                  )} */}
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
              {...a11yProps(EStep.PRICE)}
              label={
                <Box display="flex" alignItems="center">
                  {/* {project?.agreeQuota && (
                    <CheckCircle className={classes.tabItemIcon} />
                  )} */}
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
            handleNextStep={handleBack}
          />
        </Container>
        {/* <Container>
          <Grid sx={{ borderTop: "2px solid var(--gray-60)" }}>
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
            {activeStep === EStep.INFORMATION && (
              <Information
                itemEdit={itemEdit}
                // value={activeTab}
                // index={ETab.INFORMATION}
                handleNextStep={() => onNextStep(EStep.SCHEDULE)}
              />
            )}
            {activeStep === EStep.SCHEDULE && (
              <Schedule
                itemEdit={itemEdit}
                handleNextStep={() => onNextStep(EStep.PRICE)}
              />
            )}
            {activeStep === EStep.PRICE && (
              <RangePrice itemEdit={itemEdit} handleNextStep={handleBack} />
            )}
          </Grid>
        </Container> */}
      </div>
    </>
  );
});

export default AddOrEditTour;
