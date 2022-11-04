import React, { memo } from 'react';
import {Modal, ModalProps, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';



interface Props extends ModalProps{ 
    title: string;
    isOpen: boolean;
    onClose: () => void;
    toggle: () => void;
    onYes: () => void;
}

// eslint-disable-next-line react/display-name
const PopupConfirmDeleteTour = memo((props: Props) => {
    const {title, isOpen, toggle, onClose, onYes} = props; 

    const handleYes = () => {
      onYes();
    }

    const handleClose = () => {
      onClose();
    }
  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} className={classes.root}>
                <ModalHeader toggle={toggle} className={classes.title}> <FontAwesomeIcon icon={faTriangleExclamation}/>DELETE</ModalHeader>
                <ModalBody>
                  <div>
                    {title}
                  </div>
                </ModalBody>
                <ModalFooter className={classes.footer}>
                    <Button btnType={BtnType.Secondary} onClick={handleClose} className="mr-2">
                      Cancel
                    </Button>
                    <Button btnType={BtnType.Primary} onClick={handleYes}>
                      Yes
                    </Button>
                </ModalFooter>
        </Modal>
    </>
  );
});

export default PopupConfirmDeleteTour;

