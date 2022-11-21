import React, {memo, useEffect, useMemo, useState} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faDownload } from '@fortawesome/free-solid-svg-icons';
import {Row, Col, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import SearchNotFound from "components/SearchNotFound";
import Link from "next/link";
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import {TourBillService} from "services/normal/tourBill";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import moment from "moment";
import { fCurrency2 } from "utils/formatNumber";
import {saveAs} from 'file-saver';
import {useRouter} from "next/router";

// eslint-disable-next-line react/display-name
const Tour = memo(()=> {
    const dispatch = useDispatch();
    const {user} = useAuth();
    const router = useRouter();
    const [listHistory, setListHistory] = useState([]);
    useEffect(() => {
        if(user) {
            dispatch(setLoading(true));
            TourBillService.getAllTourBill(user?.id)
            .then((res) => {
                setListHistory(res.data);
            })
            .catch((e) => {
                dispatch(setErrorMess(e));
            })
            .finally(() => {
                dispatch(setLoading(false));
            })
        }      
    }, [user, dispatch])
    
    const onDownloadBill = (bill) => {
        const myFile = new File([bill as BlobPart], `invoice-${moment().format('MM-DD-YYYY-hh-mm-ss')}.pdf`, {
            type: "application/pdf",
            });
        saveAs(myFile, `invoice-${moment().format('MM-DD-YYYY-hh-mm-ss')}.pdf`);
    }
   return (
    <>
       <div className={classes.root}>
       <Table
              bordered
              className={classes.table}
            >
                <thead>
                    <tr>
                        <th scope="row" >
                            Tour name
                        </th>
                        <th>
                            Invoice
                        </th>
                        <th>
                            Date
                        </th>
                        <th>
                            Amount
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                          Download invoice
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {listHistory && listHistory?.map((item, index) => (
                    <tr key={index}>
                    <th scope="row">
                        {/* eslint-disable-next-line react/jsx-no-target-blank */}
                        <a href={`/listTour/:${item?.tourId}`} target="_blank" className={classes.tourName}>                         
                            {item?.tourId}            
                        </a>
                    </th>
                    <td>
                        TV{item?.id}
                    </td>
                    <td>
                        {moment(item?.createAt).format("DD/MM/YYYY")}
                    </td>
                    <td>
                       {fCurrency2(item?.totalBill)}
                    </td>
                    <td>
                        <FontAwesomeIcon icon={faCircleCheck} className={classes.iconCheck}/>
                    </td>
                    <td className={classes.colIconDownload}>
                        <div className={classes.iconDownload} onClick={() => {onDownloadBill(item)}}>
                            <FontAwesomeIcon icon={faDownload} />        
                        </div>
                    </td>
                    </tr>
                    ))}
                {!listHistory?.length && (
                    <tr>
                        <th scope="row" colSpan={6}>
                            <SearchNotFound mess="No tour found"/>
                        </th>
                    </tr>
                )}
                </tbody>
        </Table> 
        {/* ===== Mobile ======== */}
        <div className={classes.containerMobile}>
        <Row className={clsx(classes.row,classes.boxInvoiceMobile)}>
            <Col className={classes.colInformation}>
                <div className={classes.boxInformation}>
                    <p className={classes.tourNameMobile}>Nha trang</p>
                    <p>TV202</p> 
                    <p><span>2.000.000 VND</span></p>                  
                </div>
            </Col>
            <Col className={classes.boxDownload}>
                     <div className={classes.iconDownload}>
                            <FontAwesomeIcon icon={faDownload} />        
                    </div>
            </Col>
        </Row>
        <Row className={classes.row}>
            <SearchNotFound mess="No tour found"/>
        </Row>
        </div>
       </div>
    </>
  );
})

export default Tour;
