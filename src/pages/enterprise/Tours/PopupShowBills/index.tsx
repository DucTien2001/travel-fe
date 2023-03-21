import React, { memo, useState, useEffect } from "react";
import {
  Form,
  Modal,
  ModalProps,
  ModalHeader,
  ModalBody,
  Table,
} from "reactstrap";
import classes from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { TourBillService } from "services/enterprise/tourBill";
import moment from "moment";
import { fCurrency2VND } from "utils/formatNumber";
import SearchNotFound from "components/SearchNotFound";
import { setLoading } from "redux/reducers/Status/actionTypes";

interface Props extends ModalProps {
  tour: any;
  isOpen: boolean;
  onClose: () => void;
}

// eslint-disable-next-line react/display-name
const PopupShowBills = memo((props: Props) => {
  const dispatch = useDispatch();
  const { tour, isOpen, onClose } = props;
  const [listBills, setListBills] = useState([]);

  // useEffect(() => {
  //   if (tour) {
  //     dispatch(setLoading(true));
  //     TourBillService.getAllBillOfAnyTour(tour?.id).then((bills) => {
  //       setListBills(bills?.data);
  //     }).catch((e) =>{})
  //     .finally(() => {
  //       dispatch(setLoading(false));
  //     });
  //   }
  // }, [tour]);

  console.log(listBills);

  return (
    <>
      <Modal isOpen={isOpen} toggle={onClose} className={classes.modal}>
        <ModalHeader toggle={onClose} className={classes.title}>
          All bills of {tour?.title}
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
                  <th>Deposit</th>
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
                      <td>{fCurrency2VND(item?.totalBill)} VND</td>
                      <td>
                        {item?.firstName} {item?.lastName}
                      </td>
                      <td>{item?.email}</td>
                      <td>{fCurrency2VND(item?.deposit)} VND</td>
                      <td>{item?.phoneNumber}</td>
                    </tr>
                  ))}
                {!listBills?.length && (
                  <tr>
                    <th scope="row" colSpan={9}>
                      <SearchNotFound mess="No bill found" />
                    </th>
                  </tr>
                )}
              </tbody>
            </Table>
          </ModalBody>
        </Form>
      </Modal>
    </>
  );
});

export default PopupShowBills;
