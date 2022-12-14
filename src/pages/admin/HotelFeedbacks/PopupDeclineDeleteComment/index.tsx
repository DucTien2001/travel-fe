import React, { useMemo, memo, useEffect } from 'react';
import {Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextArea from "components/common/inputs/InputTextArea";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { setErrorMess, setLoading, setSuccessMess } from 'redux/reducers/Status/actionTypes';
import { CommentService } from 'services/admin/comment';

export interface ReplyForm { 
  declineForDelete: string;
}

interface Props { 
    isOpen: boolean;
    commentId: number;
    commentEdit?: any;
    onClose: () => void;
    toggle: () => void;
    onGetHotelComments?: () => void;
}

// eslint-disable-next-line react/display-name
const PopupRequestDeleteComment = memo((props: Props) => {
    const {isOpen, commentId, commentEdit, toggle, onGetHotelComments} = props; 
    const dispatch = useDispatch();

    const schema = useMemo(() => {
      return yup.object().shape({
        declineForDelete: yup.string().required("Decline delete is required"),
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  
     const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      control,
      } = useForm<ReplyForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });
  
    const clearForm = () => {
      reset({
        declineForDelete: "",
      })
    }
  
    const _onSubmit = (data: ReplyForm) => {
      dispatch(setLoading(true));
        CommentService.declineDeleteCommentHotel(commentId, {
            reasonForDecline: data.declineForDelete,
          })
          .then(res => {
            dispatch(setSuccessMess("Decline delete comment successfully"))
          }) 
          .catch(e => {
            dispatch(setErrorMess(e));
          })
          .finally(() => {
            dispatch(setLoading(false));
            toggle();
            clearForm();
          })
    }

    useEffect(() => {
      if(commentEdit) {
        reset({
          declineForDelete: commentEdit.declineForDelete,
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[commentEdit])

    useEffect(() => {
      if (isOpen && !commentEdit) {
        clearForm()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [isOpen, commentEdit])

  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} className={classes.root}>
          <Form  method="post" role="form" onSubmit={handleSubmit(_onSubmit)}>
                <ModalHeader toggle={toggle} className={classes.title}>Decline to delete comment</ModalHeader>
                <ModalBody>
                  <InputTextArea
                  className={classes.labelText}
                  label ="Enter your reason for delete this comment:"
                  placeholder="Content"
                  autoComplete="family-name"
                  inputRef={register("declineForDelete")}
                  errorMessage={errors.declineForDelete?.message}
                  />
                </ModalBody>
                <ModalFooter className={classes.footer}>
                  <div className={classes.action}>
                    <Button btnType={BtnType.Secondary} type="submit" className="mr-2">
                      Submit
                    </Button>{' '}
                    <Button btnType={BtnType.Primary} onClick={toggle}>
                      Cancel
                    </Button>
                  </div>
                </ModalFooter>
          </Form>
        </Modal>
    </>
  );
});

export default PopupRequestDeleteComment;