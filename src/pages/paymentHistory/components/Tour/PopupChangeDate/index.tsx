import { memo, useMemo, useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import classes from "./styles.module.scss";
import moment from "moment";
import clsx from "clsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { TourBill } from "models/tourBill";
import { fCurrency2VND } from "utils/formatNumber";
import Button, { BtnType } from "components/common/buttons/Button";
import QRCode from "react-qr-code";
import { Tour, TourPrice } from "models/tour";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Grid } from "@mui/material";
import { setSelectChangeDateReducer } from "redux/reducers/Normal/actionTypes";
import { useRouter } from "next/router";
import ReportIcon from "@mui/icons-material/Report";
import { EServicePolicyType } from "models/general";
interface Props {
  onClose: () => void;
  isOpen: boolean;
  tour: Tour;
  tourBill?: TourBill;
}

const PopupSelectDate = memo(({ onClose, isOpen, tour, tourBill }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const dayValid = useMemo(() => {
    return tour?.tourOnSales?.map((item) => {
      return item.startDate;
    });
  }, [tour]);

  const yesterday = moment().subtract(1, "day");
  const dateReschedule = new Date();
  const [isValidReschedule, setIsValidReschedule] = useState(false);

  const onSelectDate = (item: TourPrice) => {
    dispatch(
      setSelectChangeDateReducer({
        id: item?.id,
        tourId: item?.tourId,
        discount: item?.discount,
        quantity: item?.quantity,
        quantityOrdered: item?.quantityOrdered,
        startDate: item?.startDate,
        childrenAgeMin: item?.childrenAgeMin,
        childrenAgeMax: item?.childrenAgeMax,
        childrenPrice: item?.childrenPrice,
        adultPrice: item?.adultPrice,
        currency: item?.currency,
      })
    );
    router.push(`/paymentHistory/tour/${tourBill?.id}`);
  };

  useEffect(() => {
    {
      tour?.tourPolicies.map((item, index) => {
        if (
          dateReschedule?.setDate(dateReschedule?.getDate()) <
            new Date(tourBill?.createdAt)?.setDate(
              new Date(tourBill?.createdAt)?.getDate() + item?.dayRange
            ) &&
          item?.policyType === EServicePolicyType.RESCHEDULE
        ) {
          setIsValidReschedule(true);
        }
      });
    }
  }, [tour, tourBill]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={onClose}
      centered
      scrollable
      className={classes.modal}
    >
      <ModalHeader isOpen={isOpen} toggle={onClose} className={classes.title}>
        Select date
      </ModalHeader>
      {isValidReschedule ? (
        <ModalBody>
          <Grid className={classes.boxDate}>
            <p>Date available: </p>
            <Grid container>
              {tour?.tourOnSales?.map((item, index) =>
                moment(item?.startDate) < yesterday ||
                item?.startDate ===
                  tourBill?.tourOnSaleData?.startDate ? null : (
                  <Grid
                    className={classes.boxItemDate}
                    item
                    key={index}
                    onClick={() => onSelectDate(item)}
                  >
                    <span>{moment(item?.startDate).format("DD-MM")}</span>
                  </Grid>
                )
              )}
            </Grid>
          </Grid>
          <Grid className={classes.boxNote}>
            <NotificationsActiveIcon />
            <p>Notification: </p>
          </Grid>
          <ul className={classes.boxContentNote}>
            <li>
              You will not be able to re-select the date you previously booked{" "}
            </li>
            <li>
              You will not receive a discount on the number of tickets booked{" "}
            </li>
            <li>
              You may incur additional costs for rescheduling according to our
              policy
            </li>
          </ul>
        </ModalBody>
      ) : (
        <ModalBody>
          <Grid className={classes.noDate}>
            <ReportIcon />
            <span>
              There is no suitable date, maybe the time you can reschedule has
              expired, please check the invoice again!
            </span>
          </Grid>
        </ModalBody>
      )}
    </Modal>
  );
});

export default PopupSelectDate;
