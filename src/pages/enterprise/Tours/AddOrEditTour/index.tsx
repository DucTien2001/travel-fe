import React, { useMemo, memo, useCallback, useState, useEffect } from "react";
import { Row, Form, Col, Input } from "reactstrap";
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
import { Box, Grid, Tab, Tabs } from "@mui/material";
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

export interface TourForm {
  title: string;
  priceAdult: number;
  priceChild: number;
  childrenOldRangeFrom: number;
  childrenOldRangeTo: number;
  startDate: string;
  endDate: string;
  city: string;
  district: string;
  commune: string;
  moreLocation?: string;
  contact: string;
  description: string;
  highlight: string;
  suitablePerson: OptionItem<string>[];
  languages: OptionItem;
  highlights: string;
  discount?: number;
  termsAndCondition: string;
  images?: string[] | File[];
  totalTicket: number;
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

  const [value, setValue] = useState(0);

  // const isValidInformation = useMemo(() => {
  //   return TourHelper.isValidInformation(tour);
  // }, [tour]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleBack = () => {
    onBack(EActiveNav.Tour_Active);
  };

  return (
    <>
      <div className={classes.root}>
        <Grid className={clsx(classes.rowHeaderBox, classes.title)}>
          {!itemEdit ? <h3>Create tour</h3> : <h3>Edit tour</h3>}
          <Button btnType={BtnType.Primary} onClick={handleBack}>
            <ArrowBackIcon />
            Back
          </Button>
        </Grid>
        <Box className={classes.tabsBox}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            classes={{
              root: classes.rootTabs,
              indicator: classes.indicatorTabs,
              flexContainer: classes.flexContainer,
            }}
          >
            <Tab
              {...a11yProps(0)}
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
              {...a11yProps(1)}
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
              {...a11yProps(2)}
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
        </Box>
        <Information itemEdit={itemEdit} value={value} index={0} />
        <Schedule itemEdit={itemEdit} value={value} index={1} />
      </div>
    </>
  );
});

export default AddOrEditTour;
