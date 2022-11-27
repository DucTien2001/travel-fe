import React, {memo, useEffect, useState} from "react";
// reactstrap components
import {
    Col,
  Container,
  Row,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import {Comment} from "models/comment";
import Pagination from "components/Pagination";
import CardComment from "../CardComments";
import PopupAddTourComment from "../PopupAddTourComment";
import { ReducerType } from "redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Warning from "components/common/warning";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { CommentService } from "services/normal/comment";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { getAllTourBills } from "redux/reducers/Normal/actionTypes";
import { Tour } from "models/tour";

interface Props { 
    comments: Comment[],
    tour: Tour;
    onGetTourComments: () => void;
}

// eslint-disable-next-line react/display-name
const Comments = memo(({comments, tour, onGetTourComments}: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const tourId = Number(router.query.tourId.slice(1))
    const {allTourBills} = useSelector((state: ReducerType) => state.normal);

    const [openPopupAddComment, setOpenPopupAddComment] = useState(false);
    const [isAddComment, setIsAddComment] = useState(false);
    const [commentAction, setCommentAction] = useState<Comment>(null);
    const [commentDelete, setCommentDelete] = useState<Comment>(null);
    const [commentEdit, setCommentEdit] = useState(null);

    const onOpenPopupAddComment = () => setOpenPopupAddComment(true);

    const onAction = (e, comment: Comment) => {
        setCommentAction(comment);
    }

    const onEdit = () => {
        if(!commentAction) return;
        setCommentEdit(commentAction);
        onOpenPopupAddComment();
    }
    const onDelete = () => {
        if(!commentAction) return;
        setCommentDelete(commentAction);
    }

    const onClosePopupConfirmDelete = () => {
        if(!commentDelete) return
        setCommentDelete(null);
    }

    const onClosePopupAddComment = () => {
        setOpenPopupAddComment(false);
        setCommentEdit(null);
    }

    const onYesDelete = () => {
        if (!commentDelete) return
        onClosePopupConfirmDelete();
        dispatch(setLoading(true));
        CommentService.deleteCommentTour(commentDelete?.id)
        .then(()=> {        
            onGetTourComments();
        })
        .catch(e => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)))
    }

    useEffect(() => {
        allTourBills.forEach(item => {
            if (item.tourId === tourId && item.verifyCode === null) {     
                setIsAddComment(!isAddComment);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTourBills])
  return (
    <>  
    <Container className={classes.root}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h3 className="text-center">CUSTOMER'S FEEDBACKS</h3>
        <Row className={classes.rowComment}>  
            {comments?.map((cmt) => (
                <Col xs={4} key={cmt.id} className={classes.cardComment}>
                <CardComment             
                comment={cmt}
                onAction={onAction}
                onEdit={onEdit}
                onDelete={onDelete}
                tour={tour}
                onGetTourComments={onGetTourComments}
                />
                </Col> 
            ))} 
            {!comments?.length && (
                <p className={classes.noComment}>There are no comments yet !</p>
            )}             
        </Row>
        <Row className={classes.rowControl}>
            <div className={classes.btnContainer}>
                <div>
                <Button btnType={BtnType.Primary} onClick={onOpenPopupAddComment} disabled={!isAddComment}>
                    <FontAwesomeIcon icon={faPlus} className="mr-1"/>
                    Add comments
                </Button>
                {!isAddComment && <Warning content="You don't book this tour"/>} 
                </div>
                <Pagination className={classes.pagination} postPerPage={0} totalPosts={0} paginate={function (number: number): void {
                          throw new Error("Function not implemented.");
                }}/>
            </div>
        </Row>
        <PopupAddTourComment
        isOpen={openPopupAddComment}
        commentEdit={commentEdit}
        onClose={onClosePopupAddComment}
        toggle={onClosePopupAddComment}
        onGetTourComments={onGetTourComments}
        />
        <PopupConfirmDelete
        title="Are you sure delete this comment?"
        isOpen={!!commentDelete}
        onClose={onClosePopupConfirmDelete}
        toggle={onClosePopupConfirmDelete}
        onYes={onYesDelete}
        />
    </Container>
    </>
  );
});

export default Comments;
