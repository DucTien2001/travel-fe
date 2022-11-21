/*eslint-disable*/
import { memo} from "react";
import {
  Row,
  Col,
} from "reactstrap";
import clsx from "clsx";
import Link from "next/link";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
const WhiteNavbar = memo(() => {

return (
    <>
        <Row className={classes.root}>
            <Col>
                <Row >
                   <Col className={clsx("mr-auto ml-auto text-center", classes.titleSocial)}>
                    <h2>LET’S GET SOCIAL</h2>
                   </Col>
                </Row>
                <Row>
                    <Col md={8} className={clsx("mr-auto ml-auto text-center", classes.subTitleSocial)} >
                         <h4>For inspiring experiences, real-time updates, the latest trends or casual conversation, explore our social networks for all things travel.</h4>
                    </Col>
                </Row>
                <Row className={classes.linkTitleSocialWrapper}>
                    <Col xs={4} className={classes.listSocial} >
                    <ul>
                        <li className={classes.itemSocial}>
                            <Link href="/" className={classes.linkSocial}>
                                <a>
                                <FontAwesomeIcon icon={faFacebook} fontSize="20px"/>
                                </a>
                            </Link>
                        </li>
                        <li className={classes.itemSocial}>
                            <Link href="/" className={classes.linkSocial}>
                                <a>
                                <FontAwesomeIcon icon={faTwitter} fontSize="20px"/>
                                </a>
                            </Link>
                        </li>
                        <li className={classes.itemSocial}>
                            <Link href="/" className={classes.linkSocial}>
                                <a>
                                <FontAwesomeIcon icon={faInstagram} fontSize="20px"/>
                                </a>
                            </Link>
                        </li>
                        <li className={classes.itemSocial}>
                            <Link href="/" className={classes.linkSocial}>
                                <a>
                                <FontAwesomeIcon icon={faYoutube} fontSize="20px"/>
                                </a>
                            </Link>
                        </li>
                    </ul>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
  );
}) 

export default WhiteNavbar;
