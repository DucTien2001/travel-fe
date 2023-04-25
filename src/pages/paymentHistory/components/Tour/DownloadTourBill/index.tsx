import { memo } from "react";
import { Modal, Row, Col, Button } from "reactstrap";
import classes from "./styles.module.scss";
import moment from "moment";
import clsx from "clsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/reducers/Status/actionTypes";

interface DownloadTourBillProps {
  onClose: () => void;
  isOpen: boolean;
  tourBill: any;
}

const DownloadTourBill = memo(({ onClose, isOpen, tourBill }: DownloadTourBillProps) => {
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
    <Modal isOpen={isOpen} toggle={onClose} centered scrollable className={classes.modal}>
      <div id="pdf-component" className={clsx(classes.pdfWrapper)}>
        <h3 className={classes.title}>Tour Bill</h3>
        <Row className="mb-1">
          <Col xs={4}>Name:</Col>
          <Col xs={8}>
            {tourBill?.firstName} {tourBill?.lastName}
          </Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Email:</Col>
          <Col xs={8}>{tourBill?.email}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Phone number:</Col>
          <Col xs={8}>{tourBill?.phoneNumber}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Purchase date:</Col>
          <Col xs={8}>{moment(tourBill?.createdAt).format("DD/MM/YYYY")}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Price:</Col>
          <Col xs={8}>{tourBill?.price} VND/ticket</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Discount:</Col>
          <Col xs={8}>{tourBill?.discount}%</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Amount:</Col>
          <Col xs={8}>{tourBill?.amount}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4} className={classes.subTitle}>Total bill:</Col>
          <Col xs={8} className={classes.subTitle}>{tourBill?.totalBill} VND</Col>
        </Row>
        <hr />
        <h3 className={classes.title}>Tour Information</h3>
        <Row className="mb-1">
          <Col xs={4}>Name:</Col>
          <Col xs={8}>{tourBill?.tourInfo?.title}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Location:</Col>
          <Col xs={8}>{tourBill?.tourInfo?.location}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Business hours:</Col>
          <Col xs={8}>{tourBill?.tourInfo?.businessHours}</Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>Contact:</Col>
          <Col xs={8}>{tourBill?.tourInfo?.contact}</Col>
        </Row>
      </div>
      <div className={classes.downloadBtnWrapper}>
        <Button onClick={handleDownload} color="primary">
          Download
        </Button>
      </div>
    </Modal>
  );
});

export default DownloadTourBill;
