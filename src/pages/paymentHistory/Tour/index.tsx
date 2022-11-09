import React, {memo, useMemo, useState} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faDownload } from '@fortawesome/free-solid-svg-icons';
import {Row, Col, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import SearchNotFound from "components/SearchNotFound";
import Link from "next/link";

// eslint-disable-next-line react/display-name
const Tour = memo(()=> {
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
                    <tr>
                    <th scope="row">
                        <a href="" target="_blank" className={classes.tourName}>                         
                            Nha trang                       
                        </a>
                    </th>
                    <td>
                       TV203
                    </td>
                    <td>
                        20/3/2002
                    </td>
                    <td>
                        2.000.000 VND
                    </td>
                    <td>
                        <FontAwesomeIcon icon={faCircleCheck} className={classes.iconCheck}/>
                    </td>
                    <td className={classes.colIconDownload}>
                        <div className={classes.iconDownload}>
                            <FontAwesomeIcon icon={faDownload} />        
                        </div>
                    </td>
                    </tr>
                    <tr>
                        <th scope="row" colSpan={6}>
                            <SearchNotFound mess="No tour found"/>
                        </th>
                    </tr>
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
