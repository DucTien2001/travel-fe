import React, { useMemo, memo, useEffect } from 'react';
import {Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputCounter from "components/common/inputs/InputCounter";
import Star from "components/Stars";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from 'react-redux';
import { setErrorMess, setLoading, setSuccessMess } from 'redux/reducers/Status/actionTypes';
import { CommentService } from 'services/normal/comment';
import { useRouter } from 'next/router';
import useAuth from 'hooks/useAuth';
import {Comment} from "models/comment";
import { getAllHotels } from 'redux/reducers/Normal/actionTypes';

export interface CommentForm { 
  comment: string;
  numberOfStars: number;
}

interface Props { 
    isOpen: boolean;
    commentEdit: Comment;
    onClose: () => void;
    toggle: () => void;
    onGetTourComments: () => void;
}

// eslint-disable-next-line react/display-name
const PopupAddComment = memo((props: Props) => {
    const {isOpen, commentEdit, toggle, onGetTourComments} = props; 
    const {user} = useAuth();
    const router = useRouter();
    const hotelId = Number(router.query.hotelId.slice(1))
    const dispatch = useDispatch();

    const schema = useMemo(() => {
      return yup.object().shape({
          comment: yup.string().required("Content is required"),
          numberOfStars: yup.number().required(),
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
  
     const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      control,
      } = useForm<CommentForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: { 
          numberOfStars: 3,
        }
    });
  
    const clearForm = () => {
      reset({
        comment: "",
        numberOfStars: 3,
      })
    }
  
    const _onSubmit = (data: CommentForm) => {
      dispatch(setLoading(true));
      if(user) {
        if(commentEdit) {
          console.log(commentEdit);
          CommentService.updateCommentHotel(commentEdit?.id, {
            comment: data.comment,
            rate: data.numberOfStars,
          })
          .then(() => {
            dispatch(setSuccessMess("Update comment is successfully!"))
            onGetTourComments();
            dispatch(getAllHotels());
          })
          .catch((e) => {
            dispatch(setErrorMess(e));
          })
          .finally(() => {
            dispatch(setLoading(false));
            toggle();
          })
        }
        else { 
          CommentService.createCommentHotel({
            comment: data.comment,
            rate: data.numberOfStars,
            hotelId: hotelId,
            userId: user.id,
          })
          .then(() => {
            dispatch(setSuccessMess("Comment is successfully!"))
            onGetTourComments();
          })
          .catch((e) => {
            dispatch(setErrorMess(e));
          })
          .finally(() => {
            dispatch(setLoading(false));
            clearForm();
            toggle();
          })
        }
      }
    }

    useEffect(() => {
      if(commentEdit) {
        reset({
          comment: commentEdit.comment,
          numberOfStars: commentEdit.rate,
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
                <ModalHeader toggle={toggle} className={classes.title}>What do you think about this hotel?</ModalHeader>
                <ModalBody>
                  <Controller
                  name="numberOfStars" 
                  control={control}
                  render={({field}) => 
                    <div className={classes.starContainer}>
                      <div  className={classes.inputCounter}>
                        <InputCounter
                        label="Star rating:"
                        max={5}
                        min={1}
                        onChange={field.onChange}
                        value = {field.value}
                        />
                      </div>
                      <Star className={classes.starWrapper} numberOfStars={field.value}/>    
                    </div>
                  }
                  />
                  <InputTextArea
                  className={classes.labelText}
                  label ="Enter your comment here:"
                  placeholder="Ex: This hotel is wonderful"
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