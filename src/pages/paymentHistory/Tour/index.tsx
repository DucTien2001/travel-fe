import React, { memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faDownload, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Table, Button } from "reactstrap";
import SearchNotFound from "components/SearchNotFound";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { TourBillService } from "services/normal/tourBill";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import moment from "moment";
import { fCurrency2VND } from "utils/formatNumber";
import DownloadTourBill from "./DownloadTourBill";

// eslint-disable-next-line react/display-name
const Tour = memo(() => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [listHistory, setListHistory] = useState([]);
  const [modalDownloadTourBill, setModalDownloadTourBill] = useState({
    isOpenModal: false,
    tourBill: null,
  });

  useEffect(() => {
    if (user) {
      dispatch(setLoading(true));
      TourBillService.getAllTourBills(user?.id)
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
    setModalDownloadTourBill({
      isOpenModal: true,
      tourBill: bill,
    });
  };

  const onCloseModalDownloadTourBill = () => {
    setModalDownloadTourBill({
      isOpenModal: false,
      tourBill: null,
    });
  };

  return (
    <>
      <div className={classes.root}>
        <Table bordered className={classes.table}>
          <thead>
            <tr>
              <th scope="row">Tour name</th>
              <th>Invoice</th>
              <th>Date</th>
              <th>Total bill</th>
              <th>Status</th>
              <th>Cancel order</th>
              <th>Download invoice</th>
            </tr>
          </thead>
          <tbody>
            {listHistory &&
              listHistory?.map((item, index) => (
                <tr key={index}>
                  <th scope="row">
                    {/* eslint-disable-next-line react/jsx-no-target-blank */}
                    <a href={`/listTour/:${item?.id}`} target="_blank" className={classes.tourName}>
                      {item?.tourInfo?.title}
                    </a>
                  </th>
                  <td>TV{item?.id}</td>
                  <td>{moment(item?.createdAt).format("DD/MM/YYYY")}</td>
                  <td>{fCurrency2VND(item?.totalBill)} VND</td>
                  <td>
                    {item.verifyCode === null ? (
                      <FontAwesomeIcon icon={faCircleCheck} className={classes.iconCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faCircleMinus} className={classes.iconMinus} />
                    )}
                  </td>
                  <th>
                    <Button
                    className="btn-icon"
                    color="danger"
                    size="sm"
                    type="button"
                    >
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                    </Button>
                  </th>
                  <td className={classes.colIconDownload}>
                    <div
                      className={classes.iconDownload}
                      onClick={() => {
                        onDownloadBill(item);
                      }}
                    >
                      <FontAwesomeIcon icon={faDownload} />
                    </div>
                  </td>
                </tr>
              ))}
            {!listHistory?.length && (
              <tr>
                <th scope="row" colSpan={6}>
                  <SearchNotFound mess="No tour bill found" />
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
                    <a href={`/listTour/:${item?.tourId}`} target="_blank" className={classes.tourName}>
                      {item?.tourInfo?.title}
                    </a>
                    <p>TV{item?.id}</p>
                    <p>
                      <span>{fCurrency2VND(item?.totalBill)} VND</span>
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
              <SearchNotFound mess="No tour bill found" />
            </Row>
          )}
        </div>
      </div>
      <DownloadTourBill
        onClose={onCloseModalDownloadTourBill}
        isOpen={modalDownloadTourBill.isOpenModal}
        tourBill={modalDownloadTourBill.tourBill}
      />
    </>
  );
});

export default Tour;
