import React, { memo, useState, useEffect } from "react";
import { Form, Modal, ModalProps, ModalHeader, ModalBody, Table } from "reactstrap";
import classes from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { RoomBillService } from "services/enterprise/roomBill";
import moment from "moment";
import { fCurrency2VND } from "utils/formatNumber";

interface Props extends ModalProps {
  room: any;
  isOpen: boolean;
  onClose: () => void;
}

// eslint-disable-next-line react/display-name
const PopupShowBills = memo((props: Props) => {
  const dispatch = useDispatch();
  const { room, isOpen, onClose } = props;
  const [listBills, setListBills] = useState([]);

  useEffect(() => {
    if (room) {
      RoomBillService.getAllBillOfAnyRoom(room?.id).then((bills) => {
        setListBills(bills?.data);
      });
    }
  }, [room]);

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose} className={classes.modal}>
        <ModalHeader toggle={onClose} className={classes.title}>
          All bills of {room?.title}
        </ModalHeader>
        <Form role="form" className={classes.form}>
          <ModalBody>
            <Table bordered className={classes.table}>
              <thead>
                <tr>
                  <th scope="row">#</th>
                  <th>Price</th>
                  <th>Amount</th>
                  <th>Discount</th>
                  <th>Date</th>
                  <th>Total price</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone number</th>
                </tr>
              </thead>
              <tbody>
                {listBills &&
                  listBills?.map((item, index) => (
                    <tr key={index}>
                      <td scope="row">{index}</td>
                      <td>{fCurrency2VND(item?.price)} VND</td>
                      <td>{item?.amount}</td>
                      <td>{item?.discount}%</td>
                      <td>{moment(item?.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{fCurrency2VND(item?.totalPrice)} VND</td>
                      <td>{item?.detailsOfRoomBill?.firstName} {item?.detailsOfRoomBill?.lastName}</td>
                      <td>{item?.detailsOfRoomBill?.email}</td>
                      <td>{item?.detailsOfRoomBill?.phoneNumber}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </ModalBody>
        </Form>
      </Modal>
    </>
  );
});

export default PopupShowBills;
