import React, { useMemo, memo } from 'react';
import {Form, Modal, ModalProps, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputSelect from "components/common/inputs/InputSelect";
import InputCounter from "components/common/inputs/InputCounter";
import Star from "components/Stars";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {HistoryBookRoom} from "models/room";
import { Stars } from '@mui/icons-material';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck} from '@fortawesome/free-solid-svg-icons';


interface Props extends ModalProps{ 
    isOpen: boolean;
    onClose: () => void;
    toggle: () => void;
    iconTitle?: React.ReactNode;
    title: string;
    description?: string;
}

// eslint-disable-next-line react/display-name
const PopupAddComment = memo((props: Props) => {
  const {isOpen, toggle, title, iconTitle, description, rest} = props;
  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
            <ModalHeader toggle={toggle} className={classes.title}>
                <FontAwesomeIcon icon={faCircleCheck}/>
                {title}
            </ModalHeader>
            <ModalBody>
               {description &&  <p>{description}</p>}
            </ModalBody>
        </Modal>
    </>
  );
});

export default PopupAddComment;
