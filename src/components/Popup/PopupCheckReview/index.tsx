import React, { memo } from "react";
import {
  Modal,
  ModalProps,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import classes from "./styles.module.scss";
import { clsx } from "clsx";
import { images } from "configs/images";
import { Grid } from "@mui/material";
import Button, { BtnType } from "components/common/buttons/Button";

interface Props extends ModalProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  toggle?: () => void;
  onClick?: () => void;
}

// eslint-disable-next-line react/display-name
const PopupDefault = memo((props: Props) => {
  const { className, isOpen, toggle, onClick } = props;

  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggle}
        className={clsx(className, classes.root)}
      >
        <ModalHeader toggle={toggle} className={classes.title}>
          Are your booking details correct?
        </ModalHeader>
        <ModalBody>
          <Grid className={classes.content}>
            <img src={images.imgChecking.src} alt="anh"></img>
            <p>
              {" "}
              You will not be able to change your booking details once you
              proceed to payment.
            </p>
          </Grid>
        </ModalBody>
        <ModalFooter className={classes.footer}>
          <Button btnType={BtnType.Outlined} onClick={toggle}>
            Check Again
          </Button>
          <Button btnType={BtnType.Primary} onClick={onClick} className="ml-2">
            Continue
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
});

export default PopupDefault;
