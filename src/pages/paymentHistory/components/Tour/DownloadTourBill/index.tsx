import { memo } from "react";
import { Modal, Row, Col, ModalFooter } from "reactstrap";
import classes from "./styles.module.scss";
import moment from "moment";
import clsx from "clsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/reducers/Status/actionTypes";
import { TourBill } from "models/tourBill";
import { fCurrency2VND } from "utils/formatNumber";
import Button, { BtnType } from "components/common/buttons/Button";
import QRCode from "react-qr-code";
interface DownloadTourBillProps {
  onClose: () => void;
  isOpen: boolean;
  tourBill: TourBill;
}

const DownloadTourBill = memo(
  ({ onClose, isOpen, tourBill }: DownloadTourBillProps) => {
    const dispatch = useDispatch();

    const handleDownload = () => {
      const pdfElement = document.getElementById("pdf-component");
      if (pdfElement) {
        dispatch(setLoading(true));
        const w = pdfElement?.offsetWidth;
        const h = pdfElement?.offsetHeight;
        const doc = new jsPDF("p", "pt", "a4");
        html2canvas(pdfElement, {
          scale: 4,
        }).then(async (canvas) => {
          const imgData = canvas.toDataURL("image/png");
          doc.addImage(imgData as any, "PNG", 0, 30, w, h);

          doc.save(`tour-bill.pdf`);
          onClose();
          dispatch(setLoading(false));
        });
      }
    };

    return (
      <Modal
        isOpen={isOpen}
        toggle={onClose}
        centered
        scrollable
        className={classes.modal}
      >
        <div id="pdf-component" className={clsx(classes.pdfWrapper)}>
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
          {tourBill?.amountChild && (
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
              {tourBill?.discount}%
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
          {tourBill?.amountChild && (
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
          <hr />
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
          <Row className="mb-3">
            <Col xs={4} className={classes.titleInfo}>
              Your bill QR Code:
            </Col>
            <Col xs={8} className={classes.info}>
              <div
                style={{
                  height: "auto",
                  maxWidth: 100,
                  width: "100%",
                }}
              >
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={`${tourBill?.id}`}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </Col>
          </Row>
        </div>
        <ModalFooter className={classes.downloadBtnWrapper}>
          <Button onClick={handleDownload} btnType={BtnType.Primary}>
            Download
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
);

export default DownloadTourBill;
