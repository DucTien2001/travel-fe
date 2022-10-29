import React, {memo} from "react";
import {
  Col,
  Input,
  Media,
} from "reactstrap";
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import {User} from "models/user";
import clsx from "clsx";


interface Props { 
    user: User;
    comment: string;
    date: Date;
}

// eslint-disable-next-line react/display-name
const Comments = memo(( props: Props) => {
  const {user, comment, date} = props;
  return (
    <>  
        <Col>
            <div className={clsx("media-area",classes.containerMedia)}>
                <Media>
                    <a
                        className="pull-left"
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        <div className="avatar">
                            <Media
                                alt="..."
                                className="img-raised"
                                object
                                src={user.avatar}
                            ></Media>
                        </div>
                    </a>
                    <Media body>
                        <Media heading tag="h5" className={classes.titleName}>
                        Tina Andrew{" "}
                        <small className="text-muted">· <>{date.toDateString()}</></small>
                        </Media>
                        <p>
                            {comment}
                        </p>
                        <Media className="media-post">
                        <Media body>
                            <Input
                                placeholder="Write a nice reply or go home..."
                                type="textarea"
                                rows="4"
                                ></Input>
                                <div className="media-footer">
                                <Button
                                    className="pull-right"
                                    btnType={BtnType.Primary}
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <i className="now-ui-icons ui-1_send mr-1"></i> Reply
                                </Button>
                                </div>
                            </Media>
                            </Media>
                        </Media>
                    </Media>
            </div>
        </Col> 
    </>
  );
});

export default Comments;
