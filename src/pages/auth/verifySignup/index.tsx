import type { NextPage } from "next";
import { Container, Row, Col } from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Button from "components/common/buttons/Button";
import { useEffect } from "react";
import { UserService } from "services/user";

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
          <div className="header-body text-center mb-7">
            <Row className="justify-content-center">
              <Col lg="5" md="6">
                <h1 className="text-white">OK</h1>
              </Col>
            </Row>
            <Container className="mt--8 pb-5">
              <Button>Back to login</Button>
            </Container>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default VerifySignup;
