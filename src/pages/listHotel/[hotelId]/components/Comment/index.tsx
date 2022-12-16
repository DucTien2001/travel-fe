import React, {memo, useEffect, useState} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Container,
  Row,
  Col,
  Input,
  Media,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import {Comment} from "models/comment";
import clsx from "clsx";
import Pagination from "components/Pagination";
import CardComment from "../CardComments";
import PopupAddComment from "components/Popup/PopupAddComment";
import { IHotel } from "models/hotel";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { CommentService } from "services/normal/comment";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ReducerType } from "redux/reducers";
import PopupAddHotelComment from "../PopupAddHotelComment";
import Warning from "components/common/warning";

interface Props { 
    comments: Comment[],
    hotel: IHotel;
    onGetHotelComments: () => void;
}

// eslint-disable-next-line react/display-name
const Comments = memo(({comments, hotel, onGetHotelComments}: Props) => {
    const dispatch = useDispatch();
    const router = useRouter()
    const hotelId = Number(router.query.hotelId.slice(1))
    const [openPopupAddComment, setOpenPopupAddComment] = useState(false);
    const [commentAction, setCommentAction] = useState<Comment>(null);
    const [isAddComment, setIsAddComment] = useState(false);
    const [commentDelete, setCommentDelete] = useState<Comment>(null);
    const [commentEdit, setCommentEdit] = useState(null);
    const {allRoomBills} = useSelector((state: ReducerType) => state.normal);

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
        CommentService.deleteCommentHotel(commentDelete?.id)
        .then(()=> {        
            onGetHotelComments();
        })
        .catch(e => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)))
    }

    useEffect(() => {
        allRoomBills?.forEach(item => {
            if (item.hotelId === hotelId && item.verifyCode === null) {     
                setIsAddComment(!isAddComment);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allRoomBills])

  return (
    <>  
    <Container className={classes.root}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h3 className="text-center">CUSTOMER'S FEEDBACKS</h3>
        <Row xs={3} className={classes.rowComment}>
            {comments?.map((cmt) => (
                    <Col xs={4} key={cmt.id} className={classes.cardComment}>
                    <CardComment             
                    comment={cmt}
                    onAction={onAction}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    hotel={hotel}
                    onGetHotelComments={onGetHotelComments}
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
                {!isAddComment && <Warning content="You don't book this hotel"/>} 
                </div>
                {/* <Pagination className={classes.pagination} postPerPage={0} totalPosts={0} paginate={function (number: number): void {
                          throw new Error("Function not implemented.");
                      } }/> */}
            </div>
        </Row>
        <PopupAddHotelComment
        isOpen={openPopupAddComment}
        commentEdit={commentEdit}
        onClose={onClosePopupAddComment}
        toggle={onClosePopupAddComment}
        onGetTourComments={onGetHotelComments}
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
