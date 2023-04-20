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
import { IEvent } from "models/event";
import moment from "moment";
import { EDiscountType } from "models/general";
import { fCurrency2VND } from "utils/formatNumber";

interface Props extends ModalProps {
  isOpen: boolean;
  toggle?: () => void;
  event?: IEvent;
}

// eslint-disable-next-line react/display-name
const PopupTermAndCondition = memo((props: Props) => {
  const { isOpen, toggle, event } = props;

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className={classes.root}>
        <ModalHeader toggle={toggle} className={classes.title}>
          Terms and Conditions
        </ModalHeader>

        <ModalBody className={classes.modalBody}>
          <ul>
            <li>
              1. Booking period:{" "}
              <span>{moment(event?.startTime).format("DD/MM/YYYY")}</span> -{" "}
              <span>{moment(event?.endTime).format("DD/MM/YYYY")}</span>
            </li>
            {event?.discountType === EDiscountType.PERCENT ? (
              <li>
                2.{" "}
                <span>
                  Discount {event?.discountValue} up to{" "}
                  {fCurrency2VND(event?.maxDiscount)}VND{" "}
                </span>{" "}
                when booking tour or hotel{" "}
              </li>
            ) : (
              <li>
                2. Discount <span>{fCurrency2VND(event?.discountValue)}</span>{" "}
                VND when booking tour or hotel
              </li>
            )}
            <li>
              3. You must place a minimum of <span>{event?.minOrder}</span>{" "}
              orders to be able to apply this coupon
            </li>
            <li>
              4. The number of coupon is limited. The program may end earlier
              then expected without prior notice.
            </li>
            <li>
              5. The number of e-vouchers is limited. The program may end sooner
              than expected without prior notice.
            </li>
            <li>
              6. Travelix will not be liable to offer a replacement coupon that
              are discontinued, cancelled, or used improperly whether due to
              fraud or technical issues.
            </li>
            <li>
              7. Travelix reserves the right to change the terms and conditions
              without prior notice.
            </li>
          </ul>
        </ModalBody>
      </Modal>
    </>
  );
});

export default PopupTermAndCondition;
