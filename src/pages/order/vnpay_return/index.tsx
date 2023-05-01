import React, { useEffect } from "react";
import Link from "next/link";
// reactstrap components
import {
  Container,
  Row,
  TabPane,
  TabContent,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

import { NextPage } from "next";
import { images } from "configs/images";
import classes from "./styles.module.scss";
import SectionHeader from "components/Header/SectionHeader";

import Button, { BtnType } from "components/common/buttons/Button";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import DangerousIcon from "@mui/icons-material/Dangerous";
import clsx from "clsx";
import { TourBillService } from "services/normal/tourBill";
import { EPaymentStatus } from "models/general";
import { useDispatch } from "react-redux";
import { setErrorMess } from "redux/reducers/Status/actionTypes";

export enum EActiveNav {
  Tour_Active = 1,
  Hotel_Active = 2,
}

const VNPay: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const getStatusPayment = (status) => {
    if (status === "00") {
      return EPaymentStatus.PAID;
    } else {
      return EPaymentStatus.FAILED;
    }
  };

  useEffect(() => {
    TourBillService.updateTourBill(Number(router?.query.vnp_TxnRef), {
      status: getStatusPayment(router?.query?.vnp_TransactionStatus),
    })
      .then(() => {
        setTimeout(() => {
          router.push("/paymentHistory/tour");
        }, 15000);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      });
  }, [router]);

  return (
    <div className="main-content">
      <div className={clsx("header page-header-image", classes.headerWrapper)}>
        <Container className={classes.container}>
          <Modal isOpen={true} className={classes.root}>
            {router?.query?.vnp_TransactionStatus === "00" ? (
              <ModalHeader className={classes.title}>
                <FontAwesomeIcon icon={faCircleCheck} />
                Notification
              </ModalHeader>
            ) : (
              <ModalHeader className={classes.dangerTitle}>
                <DangerousIcon />
                Notification
              </ModalHeader>
            )}
            <ModalBody>
              {router?.query?.vnp_TransactionStatus === "00" ? (
                <span>
                  You have successfully paid. Please fill in more contact
                  information so that we can contact you if there is a need to
                  contact at the order payment page, you will be redirected to
                  the payment courtesy page in a few seconds{" "}
                </span>
              ) : (
                <span>
                  Your payment failed, you will be redirected to the payment
                  courtesy page in a few seconds
                </span>
              )}
              <Link href="/paymentHistory">
                <a>
                  <Button
                    btnType={BtnType.Primary}
                    className={classes.linkBackTo}
                    onClick={() => {
                      router.push("/paymentHistory/tour");
                    }}
                  >
                    Go to payment history
                  </Button>
                </a>
              </Link>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default VNPay;
