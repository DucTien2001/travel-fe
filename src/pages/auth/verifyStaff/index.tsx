import type { NextPage } from "next";
import { Container, Row, Col, Modal, ModalBody, ModalHeader } from "reactstrap";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import { useEffect, useMemo, useState } from "react";
import { UserService } from "services/user";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { StaffService } from "services/enterprise/staff";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";

const VerifyStaff: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuth();

  // const [offerId, setOfferId] = useState(null);

  useEffect(() => {
    if (router?.query?.offerId && user) {
      const offerId = router?.query?.offerId;
      StaffService.acceptOffer(Number(offerId))
        .then(() => {
          dispatch(setSuccessMess("Accept successfully"));
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [router, user]);

  return (
    <div className="main-content">
      <div className={clsx("header page-header-image", classes.headerWrapper)}>
        <Container className={classes.container}>
          <Modal isOpen={true} className={classes.root}>
            <ModalHeader className={classes.title}>
              <FontAwesomeIcon icon={faCircleCheck} />
              ACCEPT OFFER STAFF
            </ModalHeader>
            <ModalBody>
              You want to become staff for our
              <Grid sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  btnType={BtnType.Primary}
                  className={classes.linkBackTo}
                  onClick={() => {
                    router.push("/enterprises/tours");
                  }}
                >
                  Back to management
                </Button>
              </Grid>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </div>
  );
};
export default VerifyStaff;
