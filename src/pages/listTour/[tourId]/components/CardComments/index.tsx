import React, {memo, useMemo, useState} from "react";
import {
  Col,
  Media,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import CustomButton, {BtnType} from "components/common/buttons/Button";
import {EUserType} from "models/user";
import clsx from "clsx";
import { faEllipsisVertical, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Comment} from "models/comment";
import moment from "moment";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { CommentService } from "services/normal/comment";
import { Tour } from "models/tour";
import InputTextLineArea from "components/common/inputs/InputTextLineArea";
import useAuth from "hooks/useAuth";

interface ReplyForm {
    reply: string;
}
interface Props { 
    comment: Comment;
    onAction: (currentTarget: any, comment: Comment) => void;
    onEdit: () => void;
    onDelete: () => void;
    tour: Tour;
    onGetTourComments: () => void;
}

// eslint-disable-next-line react/display-name
const Comments = memo(( props: Props) => {
  const {comment, onAction, tour, onEdit, onDelete, onGetTourComments} = props;
  const {user} = useAuth();
  const dispatch = useDispatch();
  const schema = useMemo(() => {
    return yup.object().shape({
        reply: yup.string().required("Reply is required"),
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
            reply: "",
        })
    }
    const _onSubmit = (data: ReplyForm) => {
        dispatch(setLoading(true))
        CommentService.replyTourComment(comment?.id, {
            replyComment: data.reply,
        })
        .then(() => {
            dispatch(setSuccessMess("Reply comment is successfully"))
            onGetTourComments();
        })
        .catch((e) => {
            dispatch(setErrorMess(e))
        })
        .finally(() => {
            dispatch(setLoading(false));
            clearForm();
        })
    }
  return (
    <>  
        <Col>
        <Form role="form" onSubmit={handleSubmit(_onSubmit)}>
            <div className={clsx("media-area",classes.containerMedia)}>
                <Media>
                    <div className="pull-left">
                        <div className={classes.avatar}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img alt="" src={comment?.tourReviewer.avatar}/>
                        </div>
                    </div>
                    <Media body>
                        <div className={classes.containerHead}>
                        <Media heading tag="h5" className={classes.titleName}>
                        {comment?.tourReviewer?.firstName}{" "}{comment?.tourReviewer?.lastName}
                        <small className="text-muted">· <>{moment(comment?.createdAt).format("DD/MM/YYYY")}</></small>
                        </Media>
                        {user?.id && <UncontrolledDropdown className={classes.containerAction}>
                        <DropdownToggle
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="navbarDropdownMenuLink1"
                        nav
                        onClick={(e) => {onAction(e, comment)}}
                        className={classes.boxAction}
                        >
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="navbarDropdownMenuLink1" className={classes.dropdownMenu}>
                        <DropdownItem className={classes.itemAction} onClick={onEdit}>
                            <FontAwesomeIcon icon={faPen}/>
                            Edit
                        </DropdownItem>
                        <DropdownItem className={clsx(classes.itemAction, classes.actionDelete)} onClick={onDelete}>
                            <FontAwesomeIcon icon={faTrash} color="var(--danger-color)"/>
                            Delete
                        </DropdownItem>
                        </DropdownMenu>
                        </UncontrolledDropdown>}
                        </div>
                        <div className={classes.commentText}>
                        <p>
                            {comment?.comment}
                        </p>
                        </div>
                        {comment?.replyComment && (<div className={classes.boxReply}>
                            <div>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img alt="" src={tour?.images[0]}/>
                            </div>
                            <div className={classes.commentText}>
                                <p>{comment?.replyComment}</p>
                            </div>
                        </div>)}
                        <Media className="media-post">
                        {comment?.tourReviewer?.role === EUserType.ENTERPRISE && (
                        <Media body>         
                            <InputTextLineArea
                                placeholder="Write a nice reply or go home..."
                                type="textarea"
                                rows="4"
                                inputRef={register("reply")}
                                errorMessage={errors?.reply?.message}
                                className={classes.inputReply}
                            ></InputTextLineArea>
                            <div className="media-footer">                              
                                <CustomButton
                                className="pull-right"
                                btnType={BtnType.Primary}
                                type="submit"
                            >
                                <i className="now-ui-icons ui-1_send mr-1"></i> Reply
                                </CustomButton>                   
                            </div>                       
                        </Media>
                        )}
                        </Media>
                    </Media>                      
                </Media>
            </div>
        </Form>
        </Col> 
    </>
  );
});

export default Comments;
