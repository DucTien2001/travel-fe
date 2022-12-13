import { memo, useEffect } from "react";
import { Modal, Row, Col, Button } from "reactstrap";
import classes from "./styles.module.scss";
import moment from "moment";
import clsx from "clsx";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDispatch } from "react-redux";
import { setLoading } from "redux/reducers/Status/actionTypes";

interface DownloadRoomBillProps {
  onClose: () => void;
  isOpen: boolean;
  roomBill: any;
}

const DownloadRoomBill = memo(({ onClose, isOpen, roomBill }: DownloadRoomBillProps) => {
  const dispatch = useDispatch();

  useEffect(()=>{
    console.log(roomBill)
  },[roomBill])

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

        doc.save(`room-bill.pdf`);
        onClose();
        dispatch(setLoading(false));
      });
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={onClose} centered scrollable className={classes.modal}>
      <div id="pdf-component" className={clsx(classes.pdfWrapper)}>
        <h3 className={classes.title}>Room Bill</h3>
        <Row className="mb-1">
          <Col xs={4}>Name:</Col>
          <Col xs={8}>
            {roomBill?.firstName} {roomBill?.lastName}
          </Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Email:</Col>
          <Col xs={8}>{roomBill?.email}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Phone number:</Col>
          <Col xs={8}>{roomBill?.phoneNumber}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Start date:</Col>
          <Col xs={8}>{moment(roomBill?.startDate).format("DD/MM/YYYY")}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>End date:</Col>
          <Col xs={8}>{moment(roomBill?.endDate).format("DD/MM/YYYY")}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Detail:</Col>
          <Col xs={8}>
            {roomBill?.roomBillDetail?.map((item)=>(
              <>
              <Row>
                <Col xs={4} className={classes.subTitle}>Name:</Col>
                <Col xs={8} className={classes.subTitle}>{item?.title}</Col>
              </Row>
              <Row>
                <Col xs={4}>Amount:</Col>
                <Col xs={8}>{item?.amount}</Col>
              </Row>
              <Row>
                <Col xs={4}>Price:</Col>
                <Col xs={8}>{item?.price}</Col>
              </Row>
              <Row>
                <Col xs={4}>Discount:</Col>
                <Col xs={8}>{item?.discount}%</Col>
              </Row>
              <Row className="mb-1">
                <Col xs={4}>Total price:</Col>
                <Col xs={8}>{item?.totalPrice}</Col>
              </Row>
              </>
            ))}
          </Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4} className={classes.subTitle}>Total bill:</Col>
          <Col xs={8} className={classes.subTitle}>{roomBill?.totalBill} VND</Col>
        </Row>
        <hr />
        <h3 className={classes.title}>Hotel Information</h3>
        <Row className="mb-1">
          <Col xs={4}>Name:</Col>
          <Col xs={8}>{roomBill?.hotelInfo?.name}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Location:</Col>
          <Col xs={8}>{roomBill?.hotelInfo?.location}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Check in time:</Col>
          <Col xs={8}>{roomBill?.hotelInfo?.checkInTime}</Col>
        </Row>
        <Row className="mb-1">
          <Col xs={4}>Check out time:</Col>
          <Col xs={8}>{roomBill?.hotelInfo?.checkOutTime}</Col>
        </Row>
        <Row className="mb-3">
          <Col xs={4}>Contact:</Col>
          <Col xs={8}>{roomBill?.hotelInfo?.contact}</Col>
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

export default DownloadRoomBill;
