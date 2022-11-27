import React, {memo, useState} from "react";
import {
  Col,
  Input,
  Media,
  Popover,
  PopoverBody,
  UncontrolledPopover,
  Button,
} from "reactstrap";
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import CustomButton, {BtnType} from "components/common/buttons/Button";
import {EUserType, User} from "models/user";
import clsx from "clsx";
import { faEllipsisVertical, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Comment} from "models/comment";
import moment from "moment";

interface Props { 
    comment: Comment;
    onAction: (currentTarget: any, comment: Comment) => void;
    onEdit: () => void;
    onDelete: () => void;
}

// eslint-disable-next-line react/display-name
const Comments = memo(( props: Props) => {
  const {comment, onAction, onEdit, onDelete} = props;

  return (
    <>  
        <Col>
            <div className={clsx("media-area",classes.containerMedia)}>
                <Media>
                    <div className="pull-left">
                        <div className="avatar">
                            <Media
                                alt="..."
                                className="img-raised"
                                object
                                src={comment?.user?.avatar}
                            ></Media>
                        </div>
                    </div>
                    <Media body>
                        <div className={classes.containerHead}>
                        <Media heading tag="h5" className={classes.titleName}>
                        Tina Andrew{" "}
                        <small className="text-muted">· <>{moment(comment?.createdAt).format("DD/MM/YYYY")}</></small>
                        </Media>
                        <Button
                            id="PopoverFocus"
                            type="button"
                            className={classes.boxAction}
                            onClick={(e) => {onAction(e, comment)}}
                        >
                           <FontAwesomeIcon icon={faEllipsisVertical}/>
                        </Button>
                        <UncontrolledPopover
                            placement="bottom"
                            target="PopoverFocus"
                            trigger="legacy"
                        >
                            <PopoverBody className={classes.itemAction} onClick={onEdit}>
                                <FontAwesomeIcon icon={faPen}/>
                                Edit
                            </PopoverBody>
                            <PopoverBody className={clsx(classes.itemAction, classes.actionDelete)} onClick={onDelete}>
                                <FontAwesomeIcon icon={faTrash} color="var(--danger-color)"/>
                                 Delete
                            </PopoverBody>
                        </UncontrolledPopover>
                        </div>
                        <p>
                            {comment?.comment}
                        </p>
                        <Media className="media-post">
                        {/* {comment?.user?.role === EUserType.ENTERPRISE && ( */}
                        <Media body>
                            <Input
                                placeholder="Write a nice reply or go home..."
                                type="textarea"
                                rows="4"
                            ></Input>
                                <div className="media-footer">
                                
                                    <CustomButton
                                    className="pull-right"
                                    btnType={BtnType.Primary}
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                    <i className="now-ui-icons ui-1_send mr-1"></i> Reply
                                    </CustomButton>                   
                                </div>
                        </Media>
                        {/* )} */}
                        </Media>
                    </Media>                      
                </Media>
            </div>
        </Col> 
    </>
  );
});

export default Comments;
