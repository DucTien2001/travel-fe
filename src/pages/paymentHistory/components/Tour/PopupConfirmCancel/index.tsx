import { memo, useMemo, useEffect, useState } from "react";
import {
  Modal,
  Row,
  Col,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalProps,
} from "reactstrap";
import classes from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { TourBill } from "models/tourBill";
import { fCurrency2VND } from "utils/formatNumber";
import Button, { BtnType } from "components/common/buttons/Button";
import { Tour } from "models/tour";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import { EServicePolicyType } from "models/general";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { TourBillService } from "services/normal/tourBill";
interface Props extends ModalProps {
  onClose: () => void;
  isOpen: boolean;
  tour?: Tour;
  tourBill?: TourBill;
}

const PopupConfirmCancel = memo(
  ({ onClose, isOpen, tour, tourBill }: Props) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const dateRefund = new Date();
    const [priceRefund, setPriceRefund] = useState(null);
    const [isValidRefund, setIsValidRefund] = useState(false);

    const onYes = () => {
      dispatch(setLoading(true));
      TourBillService.cancelBookTour(tourBill?.id, {
        moneyRefund: !isValidRefund ? priceRefund : 0,
      })
        .then(() => {
          dispatch(setSuccessMess("Cancel book tour successfully"));
          onClose();
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    };

    useEffect(() => {
      tour?.tourPolicies.map((item, index) => {
        if (
          dateRefund?.setDate(dateRefund?.getDate()) <
            new Date(tourBill?.createdAt)?.setDate(
              new Date(tourBill?.createdAt)?.getDate() + item?.dayRange
            ) &&
          item?.policyType === EServicePolicyType.REFUND
        ) {
          setIsValidRefund(true);
        }
      });

      tour?.tourPolicies?.map(
        (item, index) =>
          item?.policyType === EServicePolicyType.REFUND &&
          setPriceRefund((tourBill?.totalBill * (100 - item?.moneyRate)) / 100)
      );
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
          Confirm cancel tour
        </ModalHeader>
        <ModalBody>
          {isValidRefund ? (
            <Grid>
              <Grid className={classes.boxPrice}>
                <p>
                  Total bill:{" "}
                  <span>{fCurrency2VND(tourBill?.totalBill)} VND</span>
                </p>
                <p>
                  You are reimbursed:{" "}
                  <span>{fCurrency2VND(priceRefund)} VND</span>
                </p>
              </Grid>
            </Grid>
          ) : (
            <Grid sx={{ fontSize: "16px", fontWeight: "600" }}>
              <p>
                Your order is out of the refund cancellation period. You
                won&apos;t receive a cancellation according to our policy, are
                you sure you want to cancel this order?
              </p>
            </Grid>
          )}
          <Grid className={classes.boxNote}>
            <NotificationsActiveIcon />
            <p>Notification: </p>
          </Grid>
          <ul className={classes.boxContentNote}>
            <li>You will be refunded according to our cancellation policy</li>
            <li>
              If you cancel outside of our scheduled time, you will lose the
              amount you paid before
            </li>
          </ul>
        </ModalBody>
        <ModalFooter className={classes.footer}>
          <Button
            btnType={BtnType.Secondary}
            onClick={onClose}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button btnType={BtnType.Primary} onClick={onYes}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
);

export default PopupConfirmCancel;
