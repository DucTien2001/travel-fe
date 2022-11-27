import type { NextPage } from "next";
import { Container, Modal, ModalBody, ModalHeader } from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import { useEffect } from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { RoomBillService } from "services/normal/roomBill";

const VerifyBookRoom: NextPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    const billId = urlParams.get("billId");
    if (code && billId) {
      RoomBillService.verifyBookRoom({
        code: code,
        billId: Number(billId),
      });
    }
  }, []);

  return (
    <div className="main-content">
      <div className={clsx("header page-header-image", classes.headerWrapper)}>
       <Container className={classes.container}>
        <Modal isOpen={true} className={classes.root}>
            <ModalHeader className={classes.title}>
                <FontAwesomeIcon icon={faCircleCheck}/>
                Verify successfully
            </ModalHeader>
            <ModalBody>
                You have book successfully. Please click button to go payment.
                <Link href="/paymentHistory" >
                  <a>
                  <Button btnType={BtnType.Linear} className={classes.linkBackTo}>Go to payment history</Button>
                  </a>
                </Link>
            </ModalBody>
        </Modal>
        </Container>
      </div>
    </div>
  );
};
export default VerifyBookRoom;
