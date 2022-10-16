import React, { useMemo, memo } from 'react';
import {Form, Modal, ModalProps, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextArea from "components/common/inputs/InputTextArea";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

export interface CommentForm { 
  comment: string;
}

interface Props extends ModalProps{ 
    isOpen: boolean;
    onClose: () => void;
    toggle: () => void;
}

// eslint-disable-next-line react/display-name
const PopupAddComment = memo((props: Props) => {
    const {isOpen, toggle, rest} = props; 

    const { t, i18n } = useTranslation();

    const schema = useMemo(() => {
      return yup.object().shape({
          comment: yup.string().required("Content is required"),
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [i18n.language] );
  
     const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      } = useForm<CommentForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
  
    const clearForm = () => {
      reset({
        comment: "",
      })
    }
  
    const _onSubmit = (data: CommentForm) => {
        console.log(data);
        clearForm();
    }
  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
          <Form  method="post" role="form" onSubmit={handleSubmit(_onSubmit)}>
                <ModalHeader toggle={toggle} className={classes.title}>What do you want to ask us?</ModalHeader>
                <ModalBody>
                  <InputTextArea
                  label ="Enter your question here:"
                  placeholder="Ex: How many rooms do you have?"
                  autoComplete="family-name"
                  inputRef={register("comment")}
                  errorMessage={errors.comment?.message}
                  />
                </ModalBody>
                <ModalFooter className={classes.footer}>
                  <div className={classes.action}>
                    <Button btnType={BtnType.Secondary} type="submit" className="mr-2">
                      Post
                    </Button>{' '}
                    <Button btnType={BtnType.Primary} onClick={toggle}>
                      Cancel
                    </Button>
                  </div>
                  <p>
                    Your question will be posted on Travelix.com once it has been approved and answered
                  </p>
                </ModalFooter>
          </Form>
        </Modal>
    </>
  );
});

export default PopupAddComment;
