import type { NextPage } from "next";
import { Container, Row, Col, Modal, ModalBody, ModalHeader } from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import { useEffect } from "react";
import { UserService } from "services/user";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const VerifySignup: NextPage = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get("code");
    const userId = urlParams.get("userId");
    if (code && userId) {
      UserService.verifySignup({
        code: code,
        userId: Number(userId),
      });
    }
  }, []);

  return (
    <div className="main-content">
      <div className={clsx("header page-header-image", classes.headerWrapper)}>
       <Container className={classes.container}>
        <Modal isOpen={true} className={classes.root}>
            <ModalHeader className={classes.title}>
                <FontAwesomeIcon icon={faCircleCheck}/>
                Verify successfully
            </ModalHeader>
            <ModalBody>
                You have successfully signed in. Please click button to back login page.
                <Link href="/auth/login" >
                  <a>
                  <Button btnType={BtnType.Linear} className={classes.linkBackTo}>Back to login</Button>
                  </a>
                </Link>
            </ModalBody>
        </Modal>
        </Container>
      </div>
    </div>
  );
};
export default VerifySignup;
