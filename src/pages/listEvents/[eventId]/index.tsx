import React, { useEffect, useState, memo } from "react";
import { Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignsPost } from "@fortawesome/free-solid-svg-icons";
import { images } from "configs/images";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import SectionHeader from "components/Header/SectionHeader";
import { useDispatch } from "react-redux";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { Grid } from "@mui/material";
import InputTextfield from "components/common/inputs/InputTextfield";
import { EventService } from "services/normal/event";
import { useRouter } from "next/router";
import { IEvent } from "models/event";
import PopupTermAndCondition from "./components/PopupTermAndCondition";

const EventPage = memo(() => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [event, setEvent] = useState<IEvent>();
  const [copyCode, setCopyCode] = useState("ENJOY NHA TRANG");
  const [openPopupTermAndCondition, setOpenPopupTermAndCondition] =
    useState(false);

  const onOpenPopupTermAndCondition = () => {
    setOpenPopupTermAndCondition(!openPopupTermAndCondition);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(copyCode);
    dispatch(setSuccessMess("Copy to clipboard"));
  };

  useEffect(() => {
    if (router) {
      EventService.getEvent(Number(router.query.eventId.slice(1)))
        .then((res) => {
          setEvent(res.data);
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
      <SectionHeader
        src={images.pannerCoupon.src}
        className={classes.imgHeader}
      />
      <Row className={classes.containerBody}>
        <Container>
          <Grid className={classes.titleBody}>
            <h1>🎉 Big new year promo for outbound hotels</h1>
            <p>
              🔥 Travel to anywhere in the world during this festive year end
              super easily with diverse hotel recommendations and exciting deals
              up to 400K from Travelix!
            </p>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "24px",
            }}
          >
            <Grid className={classes.boxTicket}>
              <Grid className={classes.titleTicket}>
                <FontAwesomeIcon icon={faSignsPost}></FontAwesomeIcon>
                <p>{event?.name}</p>
              </Grid>
              <Grid sx={{ paddingBottom: "10px" }}>
                <InputTextfield
                  className={classes.inputCode}
                  value={copyCode}
                  disabled
                  onChange={(e) => setCopyCode("ENJOY NHA TRANG")}
                  endAdornment={
                    <p
                      className={classes.textCopyInput}
                      onClick={handleCopyCode}
                    >
                      Copy
                    </p>
                  }
                />
              </Grid>
              <Grid className={classes.description}>
                <p
                  dangerouslySetInnerHTML={{
                    __html: event?.description,
                  }}
                ></p>
              </Grid>
              <Grid
                className={classes.footTicket}
                onClick={onOpenPopupTermAndCondition}
              >
                <p>Read Terms and Conditions</p>
              </Grid>
            </Grid>
            <Grid className={classes.textRemind}>
              <p>Coupons are limited and refilled every day</p>
            </Grid>
            <Grid sx={{ width: "100%" }}>
              <Button btnType={BtnType.Primary} className={classes.btnFind}>
                FIND SERVICE NOW
              </Button>
            </Grid>
            <Grid className={classes.boxTip}>
              <p>
                Book hotel for your holiday in VietNam with best ease on
                Travelix!
              </p>
              <ul>
                <li>
                  Easily find popular to travelers and well located hotels
                </li>
                <li>
                  The price you see is the price you pay, all costs are
                  displayed in VND.
                </li>
                <li>
                  More flexible with reasonably priced Pay upon Checkin options.
                </li>
              </ul>
            </Grid>
          </Grid>
        </Container>
        <PopupTermAndCondition
          isOpen={openPopupTermAndCondition}
          toggle={onOpenPopupTermAndCondition}
          event={event}
        />
      </Row>
    </>
  );
});

export default EventPage;
