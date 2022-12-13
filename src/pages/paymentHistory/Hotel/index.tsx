import React, { memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleMinus, faDownload } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import SearchNotFound from "components/SearchNotFound";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import { RoomBillService } from "services/normal/roomBill";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import moment from "moment";
import { fCurrency2VND } from "utils/formatNumber";
import DownloadRoomBill from "./DownloadRoomBill";
import { RoomService } from "services/normal/room";

// eslint-disable-next-line react/display-name
const Hotel = memo(() => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [listHistory, setListHistory] = useState([]);
  const [modalDownloadRoomBill, setModalDownloadRoomBill] = useState({
    isOpenModal: false,
    roomBill: null,
  });

  useEffect(() => {
    if (user) {
      dispatch(setLoading(true));
      RoomBillService.getAllRoomBills(user?.id)
        .then((res) => {
          setListHistory(res.data);
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [user, dispatch]);

  const onDownloadBill = (bill) => {
    let requestGetRooms = []
    let _roomBillDetail = []
    bill?.roomBillDetail?.map(roomItem=>{
      requestGetRooms.push(RoomService.getRoom(roomItem?.roomId))
    })
    Promise.all(requestGetRooms).then((res)=>{
      res.map((item, index)=>{
        _roomBillDetail.push({
          ...bill?.roomBillDetail[index],
          title: item?.data?.title,
          description: item?.data?.description,
          numberOfBed: item?.data?.numberOfBed,
        })
      })
      setModalDownloadRoomBill({
        isOpenModal: true,
        roomBill: {
          ...bill,
          roomBillDetail: _roomBillDetail
        },
      });
    })
  };

  const onCloseModalDownloadRoomBill = () => {
    setModalDownloadRoomBill({
      isOpenModal: false,
      roomBill: null,
    });
  };

  return (
    <>
      <div className={classes.root}>
        <Table bordered className={classes.table}>
          <thead>
            <tr>
              <th scope="row">Hotel name</th>
              <th>Invoice</th>
              <th>Date</th>
              <th>Total bill</th>
              <th>Status</th>
              <th>Download invoice</th>
            </tr>
          </thead>
          <tbody>
            {listHistory &&
              listHistory?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a href={`/listHotel/:${item?.hotelId}`} target="_blank" className={classes.hotelName}>
                      {item?.hotelInfo?.name}
                    </a>
                  </th>
                  <td>TV{item?.id}</td>
                  <td>{moment(item?.bookedDates).format("DD/MM/YYYY")}</td>
                  <td>{fCurrency2VND(item?.totalBill)} VND</td>
                  <td>
                    {item.verifyCode === null ? (
                      <FontAwesomeIcon icon={faCircleCheck} className={classes.iconCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faCircleMinus} className={classes.iconMinus} />
                    )}
                  </td>
                  <td className={classes.colIconDownload}>
                    <div className={classes.iconDownload} onClick={() => onDownloadBill(item)}>
                      <FontAwesomeIcon icon={faDownload} />
                    </div>
                  </td>
                </tr>
              ))}
            {!listHistory?.length && (
              <tr>
                <th scope="row" colSpan={6}>
                  <SearchNotFound mess="No hotel bill found" />
                </th>
              </tr>
            )}
          </tbody>
        </Table>
        {/* ===== Mobile ======== */}
        <div className={classes.containerMobile}>
          {listHistory &&
            listHistory?.map((item, index) => (
              <Row key={index} className={clsx(classes.row, classes.boxInvoiceMobile)}>
                <Col className={classes.colInformation}>
                  <div className={classes.boxInformation}>
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a href={`/listHotel/:${item?.hotelId}`} target="_blank" className={classes.hotelName}>
                      {item?.hotelInfo?.title}
                    </a>
                    <p>TV{item?.id}</p>
                    <p>
                      <span> {fCurrency2VND(item?.totalBill)} VND</span>
                    </p>
                  </div>
                </Col>
                <Col className={classes.boxDownload}>
                  <div>
                    {item.verifyCode === null ? (
                      <FontAwesomeIcon icon={faCircleCheck} className={classes.iconCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faCircleMinus} className={classes.iconMinus} />
                    )}
                  </div>
                  <div className={classes.iconDownload}>
                    <FontAwesomeIcon icon={faDownload} />
                  </div>
                </Col>
              </Row>
            ))}
          {!listHistory?.length && (
            <Row className={classes.row}>
              <SearchNotFound mess="No hotel bill found" />
            </Row>
          )}
        </div>

        <DownloadRoomBill
          onClose={onCloseModalDownloadRoomBill}
          isOpen={modalDownloadRoomBill.isOpenModal}
          roomBill={modalDownloadRoomBill.roomBill}
        />
      </div>
    </>
  );
});

export default Hotel;
