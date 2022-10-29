import React, {memo} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faBellConcierge, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line react/display-name
const DetailTour = memo(()=> {
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
            <div className={classes.informationContainer}>
                <Box
                title="Your booking details"
                >
                  <div className={classes.boxDetailRoom}>
                    <p>Date book: <span>22-2-2022</span></p>
                    <p className={classes.note}>Ticket expiration time <span>30 days</span> is from the date of purchase</p>
                    <Link href="">
                      <p className={classes.changeChoice}>Change your choice</p>
                    </Link>
                  </div>
                </Box>
                <Box title="Cost summary">
                  <div className={classes.boxCostSummary}>
                    <p>Tour name: <span>Hotel thousand stars</span></p>
                    <div className={classes.boxPrice}>
                      <p className={classes.price}>Price: <span>$700</span></p>
                      <p>(for all guests)</p>
                    </div>
                    <span>Taxes and fees are included</span>
                  </div>
                </Box>
                <Box title="Note for you">
                  <div className={classes.boxTip}>
                      <div className={classes.tip}>
                        <FontAwesomeIcon icon={faCircleCheck}/>
                        <p>You can check in at any time starting from the check-in date</p>
                      </div>
                      <div className={classes.tip}>
                        <FontAwesomeIcon icon={faBellConcierge}/>
                        <p>24-hour front desk - Help is always there when you need it!</p>
                      </div>
                      <div className={classes.tip}>
                        <FontAwesomeIcon icon={faCircleInfo}/>
                        <p>Please check the information to be filled in before pressing the confirm button</p>
                      </div>
                  </div>
                </Box>
            </div>
      </div>
    </>
  );
})

export default DetailTour;
