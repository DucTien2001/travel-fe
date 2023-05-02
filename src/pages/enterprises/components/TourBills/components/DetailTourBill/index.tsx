import { memo, useEffect, useState } from "react";
import { Row, Col, Container } from "reactstrap";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";
import Button, { BtnType } from "components/common/buttons/Button";
import { useRouter } from "next/router";
import { TourBillService } from "services/enterprise/tourBill";
import { TourBill } from "models/enterprise/tourBill";
import { setErrorMess } from "redux/reducers/Status/actionTypes";
import moment from "moment";
import { fCurrency2VND, fPercent } from "utils/formatNumber";

interface Props {
  tourBillId: number;
}

const DetailTourBill = memo(({ tourBillId }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [tourBill, setTourBill] = useState<TourBill>(null);

  useEffect(() => {
    TourBillService.findOne(tourBillId)
      .then((res) => {
        setTourBill(res?.data);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      });
  }, [tourBillId]);

  return (
    <Grid className={classes.modal}>
      <Grid className={clsx(classes.wrapper)} container spacing={1}>
        <Grid item xs={6}>
          <h3 className={classes.title}>Tour Bill</h3>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Name:
            </Col>
            <Col xs={8} className={classes.info}>
              {tourBill?.firstName} {tourBill?.lastName}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Email:
            </Col>
            <Col xs={8} className={classes.info}>
              {tourBill?.email}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Phone number:
            </Col>
            <Col xs={8} className={classes.info}>
              {tourBill?.phoneNumber}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Purchase date:
            </Col>
            <Col xs={8} className={classes.info}>
              {moment(tourBill?.createdAt).format("DD/MM/YYYY")}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Adult price:
            </Col>
            <Col xs={8} className={classes.info}>
              {fCurrency2VND(tourBill?.tourOnSaleData?.adultPrice)} VND/ticket
            </Col>
          </Row>
          {tourBill?.amountChild !== 0 && (
            <Row className="mb-1">
              <Col xs={4} className={classes.titleInfo}>
                Children price:
              </Col>
              <Col xs={8} className={classes.info}>
                {fCurrency2VND(tourBill?.tourOnSaleData?.childrenPrice)}{" "}
                VND/ticket
              </Col>
            </Row>
          )}
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Discount:
            </Col>
            <Col xs={8} className={classes.info}>
              {tourBill?.discount <= 100 ? (
                fPercent(tourBill?.discount)
              ) : (
                <span>{fCurrency2VND(tourBill?.discount)}VND</span>
              )}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Adult:
            </Col>
            <Col xs={8} className={classes.info}>
              {tourBill?.amountAdult}
            </Col>
          </Row>
          {tourBill?.amountChild !== 0 && (
            <Row className="mb-1">
              <Col xs={4} className={classes.titleInfo}>
                Children:
              </Col>
              <Col xs={8} className={classes.info}>
                {tourBill?.amountChild}
              </Col>
            </Row>
          )}
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Total bill:
            </Col>
            <Col xs={8} className={classes.info}>
              {fCurrency2VND(tourBill?.totalBill)} VND
            </Col>
          </Row>
        </Grid>
        <Grid item xs={6}>
          <h3 className={classes.title}>Tour Information</h3>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Name:
            </Col>
            <Col xs={8} className={classes.info}>
              {tourBill?.tourData?.title}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Location:
            </Col>
            <Col xs={8} className={classes.info}>
              {tourBill?.tourData?.moreLocation},{" "}
              {tourBill?.tourData?.commune?.name},{" "}
              {tourBill?.tourData?.district?.name},{" "}
              {tourBill?.tourData?.city?.name}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Start date:
            </Col>
            <Col xs={8} className={classes.info}>
              {moment(tourBill?.tourOnSaleData?.startDate).format("DD-MM-YYYY")}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col xs={4} className={classes.titleInfo}>
              Duration:
            </Col>
            <Col xs={8} className={classes.info}>
              {tourBill?.tourData?.numberOfDays} days -{" "}
              {tourBill?.tourData?.numberOfNights} nights
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className={classes.titleInfo}>
              Contact:
            </Col>
            <Col xs={8} className={classes.info}>
              {tourBill?.tourData?.contact}
            </Col>
          </Row>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default DetailTourBill;
