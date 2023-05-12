import { memo, useEffect, useState } from "react";
import {
  Modal,
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
import { EServicePolicyType } from "models/general";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { TourBillService } from "services/normal/tourBill";
import { useTranslation } from "react-i18next";
interface Props extends ModalProps {
  onClose: () => void;
  isOpen: boolean;
  tour?: Tour;
  tourBill?: TourBill;
}

const PopupConfirmCancel = memo(
  ({ onClose, isOpen, tour, tourBill }: Props) => {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation("common");

    const dateRefund = new Date();
    const [priceRefund, setPriceRefund] = useState(null);
    const [isValidRefund, setIsValidRefund] = useState(false);

    const onYes = () => {
      dispatch(setLoading(true));
      TourBillService.cancelBookTour(tourBill?.id, {
        moneyRefund: !isValidRefund ? priceRefund : 0,
      })
        .then(() => {
          dispatch(setSuccessMess(t("common_cancel_success")));
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
          {t("popup_confirm_cancel_payment_history_title")}
        </ModalHeader>
        <ModalBody>
          {isValidRefund ? (
            <Grid>
              <Grid className={classes.boxPrice}>
                <p>
                  {t("popup_confirm_cancel_payment_history_total_bill")}:{" "}
                  <span>{fCurrency2VND(tourBill?.totalBill)} VND</span>
                </p>
                <p>
                  {t("popup_confirm_cancel_payment_history_reimbursed")}:{" "}
                  <span>{fCurrency2VND(priceRefund)} VND</span>
                </p>
              </Grid>
            </Grid>
          ) : (
            <Grid sx={{ fontSize: "16px", fontWeight: "600" }}>
              <p>{t("popup_confirm_cancel_payment_history_remind")}</p>
            </Grid>
          )}
          <Grid className={classes.boxNote}>
            <NotificationsActiveIcon />
            <p>{t("popup_confirm_cancel_payment_history_not")}: </p>
          </Grid>
          <ul className={classes.boxContentNote}>
            <li>{t("popup_confirm_cancel_payment_history_not_1")}</li>
            <li>{t("popup_confirm_cancel_payment_history_not_2")}</li>
          </ul>
        </ModalBody>
        <ModalFooter className={classes.footer}>
          <Button
            btnType={BtnType.Secondary}
            onClick={onClose}
            className="mr-2"
          >
            {t("common_cancel")}
          </Button>
          <Button btnType={BtnType.Primary} onClick={onYes}>
            {t("common_yes")}
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
);

export default PopupConfirmCancel;
