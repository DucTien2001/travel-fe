import { memo, useEffect, useMemo, useState } from "react";
import "aos/dist/aos.css";
import { Grid } from "@mui/material";
import InputTextfield from "components/common/inputs/InputTextfield";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMagnifyingGlassArrowRight,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import classes from "./styles.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Stars from "components/Stars";
import Aos from "aos";
import "aos/dist/aos.css";
import { useMediaQuery, useTheme } from "@mui/material";
import { clsx } from "clsx";
import { Col } from "reactstrap";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Button, { BtnType } from "components/common/buttons/Button";
import { useTranslation } from "react-i18next";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import InputCounter from "components/common/inputs/InputCounter";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { useRouter } from "next/router";
import moment, { Moment } from "moment";
// eslint-disable-next-line react/display-name
const HotelSearch = memo(() => {
  const { t, i18n } = useTranslation("common");
  const [focus, setFocus] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [dateStart, setDateStart] = useState<Moment>(null);
  const [dateEnd, setDateEnd] = useState<Moment>(null);
  const [numberOfAdult, setNumberOfAdult] = useState(1);
  const [numberOfChild, setNumberOfChild] = useState(0);
  const [numberOfRoom, setNumberOfRoom] = useState(1);
  const router = useRouter();

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSubmitSearch = () => {
    router.push({
      pathname: "/listHotel",
      search: `?keyword=${keyword || ""}&dateStart=${
        dateStart?.format("YYYY-MM-DD") || ""
      }&dateEnd=${dateEnd?.format("YYYY-MM-DD") || ""}&numberOfAdult=${
        numberOfAdult || ""
      }&numberOfChild=${numberOfChild || ""}&numberOfRoom=${
        numberOfRoom || ""
      }`,
    });
  };

  return (
    <>
      <Grid>
        <Grid className={classes.boxItemLocation}>
          <p className={classes.titleInput}>
            {t("landing_page_section_search_stay_input_stay")}
          </p>
          <InputTextfield
            className={classes.inputSearchLocation}
            placeholder={t(
              "landing_page_section_search_stay_input_stay_placeholder"
            )}
            name="location"
            startAdornment={<FontAwesomeIcon icon={faLocationDot} />}
            autoComplete="off"
            value={keyword || ""}
            onChange={onSearch}
          />
        </Grid>
        <Grid container className={classes.boxDate}>
          <Grid container xs={12}>
            <Grid xs={3} item className={classes.boxItem}>
              <p className={classes.titleInput}>
                {t("landing_page_section_search_stay_input_start_time")}
              </p>
              <InputDatePicker
                className={classes.inputSearchDate}
                placeholder={t(
                  "landing_page_section_search_stay_input_start_time_placeholder"
                )}
                name="startDate"
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                isValidDate={disablePastDt}
                closeOnSelect
                value={dateStart ? dateStart : ""}
                initialValue={dateStart ? dateStart : ""}
                _onChange={(e) => {
                  setDateStart(moment(e?._d));
                }}
              />
            </Grid>
            <Grid xs={3} item className={classes.boxItem}>
              <p className={classes.titleInput}>
                {t("landing_page_section_search_stay_input_end_time")}
              </p>
              <InputDatePicker
                className={classes.inputSearchDate}
                placeholder={t(
                  "landing_page_section_search_stay_input_end_time_placeholder"
                )}
                name="endDate"
                dateFormat="DD/MM/YYYY"
                timeFormat={false}
                isValidDate={disablePastDt}
                closeOnSelect
                value={dateEnd ? dateEnd : ""}
                initialValue={dateEnd ? dateEnd : ""}
                _onChange={(e) => {
                  setDateEnd(moment(e?._d));
                }}
              />
            </Grid>
            <Grid
              className={clsx(classes.boxItem, classes.boxGuest)}
              item
              xs={6}
            >
              <p className={classes.titleInput}>
                {t("landing_page_section_search_stay_input_guest_title")}
              </p>
              <InputTextfield
                className={classes.inputSearchLocation}
                placeholder="Guest and Room"
                name="people"
                startAdornment={<FamilyRestroomIcon />}
                onFocus={onFocus}
                value={`${numberOfAdult} ${t(
                  "landing_page_section_search_stay_input_adult_placeholder"
                )}, ${numberOfChild} ${t(
                  "landing_page_section_search_stay_input_child_placeholder"
                )}, ${numberOfRoom} ${t(
                  "landing_page_section_search_stay_input_room_placeholder"
                )},
                `}
              />
              {focus && (
                <Grid className={classes.containerChooseGuest}>
                  <Grid container sx={{ width: "100%" }}>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "14px",
                      }}
                      xs={12}
                    >
                      <Grid className={classes.boxTitleCounter}>
                        <PeopleAltIcon />
                        <p>
                          {t(
                            "landing_page_section_search_stay_input_adult_placeholder"
                          )}
                        </p>
                      </Grid>
                      <Grid>
                        <InputCounter
                          className={classes.inputCounter}
                          max={9999}
                          min={1}
                          onChange={(e) => setNumberOfAdult(e)}
                          value={numberOfAdult}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "14px",
                      }}
                      xs={12}
                    >
                      <Grid className={classes.boxTitleCounter}>
                        <ChildFriendlyIcon />
                        <p>
                          {t(
                            "landing_page_section_search_stay_input_child_placeholder"
                          )}
                        </p>
                      </Grid>
                      <Grid>
                        <InputCounter
                          className={classes.inputCounter}
                          max={9999}
                          min={1}
                          onChange={(e) => setNumberOfChild(e)}
                          value={numberOfChild}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "14px",
                      }}
                      xs={12}
                    >
                      <Grid className={classes.boxTitleCounter}>
                        <MeetingRoomIcon />
                        <p>
                          {t(
                            "landing_page_section_search_stay_input_room_placeholder"
                          )}
                        </p>
                      </Grid>
                      <Grid>
                        <InputCounter
                          className={classes.inputCounter}
                          max={9999}
                          min={1}
                          onChange={(e) => setNumberOfRoom(e)}
                          value={numberOfRoom}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: "14px",
                      }}
                      xs={12}
                    >
                      <Button
                        btnType={BtnType.Secondary}
                        onClick={() => setFocus(!focus)}
                      >
                        {t("common_cancel")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.boxBtnSearch}>
          <Button
            btnType={BtnType.Secondary}
            onClick={onSubmitSearch}
            className={classes.btnSearch}
          >
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            {t("common_search")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
});

export default HotelSearch;
