import React, {memo, useState} from "react";
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
import {Comment} from "models/tour";
import clsx from "clsx";
import Pagination from "components/Pagination";
import CardComment from "components/CardComments";
import PopupAddComment from "components/Popup/PopupAddComment";

interface Props { 
    comment: Comment[],
}

// eslint-disable-next-line react/display-name
const Comments = memo(({comment}: Props) => {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    
  return (
    <>  
    <Container className={classes.root}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h3 className="text-center">CUSTOMER'S FEEDBACKS</h3>
        <Row xs={3} className={classes.rowComment}>
            {comment?.map((cmt, index) => (
                <CardComment key={index} user={cmt.user} comment={"Hello world"} date={cmt.date}/>
            ))}      
        </Row>
        <Row className={classes.rowControl}>
            <div className={classes.btnContainer}>
                <Button btnType={BtnType.Primary} onClick={toggle}>
                    <FontAwesomeIcon icon={faPlus} className="mr-1"/>
                    Add comments
                </Button>
                <Pagination className={classes.pagination} postPerPage={0} totalPosts={0} paginate={function (number: number): void {
                          throw new Error("Function not implemented.");
                      } }/>
            </div>
        </Row>
        <PopupAddComment
        isOpen={modal}
        onClose={toggle}
        toggle={toggle}
        />
    </Container>
    </>
  );
});

export default Comments;
