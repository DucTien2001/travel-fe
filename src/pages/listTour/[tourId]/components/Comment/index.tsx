import React, {memo, useEffect, useState} from "react";
// reactstrap components
import {
  Container,
  Row,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import {Comment} from "models/comment";
import Pagination from "components/Pagination";
import CardComment from "components/CardComments";
import PopupAddTourComment from "../PopupAddTourComment";
import { ReducerType } from "redux/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Warning from "components/common/warning";

interface Props { 
    comments: Comment[],
}

// eslint-disable-next-line react/display-name
const Comments = memo(({comments}: Props) => {
    const router = useRouter();

    const tourId = Number(router.query.tourId.slice(1))
    const {allTourBills} = useSelector((state: ReducerType) => state.normal);

    const [modal, setModal] = useState(false);
    const [isAddComment, setIsAddComment] = useState(false);

    const [commentEdit, setCommentEdit] = useState(null);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        allTourBills.forEach(item => {
            if (item.tourId === tourId && item.verifyCode === null) {     
                setIsAddComment(!isAddComment);
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTourBills])


    
    const onEdit = (e, comment: Comment) => {
        setCommentEdit(comment);
        toggle();
    }

  return (
    <>  
    <Container className={classes.root}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h3 className="text-center">CUSTOMER'S FEEDBACKS</h3>
        <Row xs={3} className={classes.rowComment}>
            {comments?.map((cmt, index) => (
                <CardComment 
                key={index} 
                comment={cmt}
                onEdit={onEdit}
                />
            ))}      
        </Row>
        <Row className={classes.rowControl}>
            <div className={classes.btnContainer}>
                <div>
                <Button btnType={BtnType.Primary} onClick={toggle} disabled={!isAddComment}>
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
        isOpen={modal}
        commentEdit={commentEdit}
        onClose={toggle}
        toggle={toggle}
        />
    </Container>
    </>
  );
});

export default Comments;
