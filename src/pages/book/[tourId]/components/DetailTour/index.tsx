import React, {memo} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";

// eslint-disable-next-line react/display-name
const DetailTour = memo(()=> {
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
            <div className={classes.informationContainer}>
                <Box
                title="Your booking details"
                >
                  <div className={classes.boxDetailTour}>
                    <p>Date book: <span>22-2-2022</span></p>
                    <p className={classes.note}>Ticket expiration time <span>30 days</span> is from the date of purchase</p>
                  </div>
                </Box>
                <Box title="Cost summary">
                  <div className={classes.boxCostSummary}>
                    <p>Tour name: <span>Nha trang</span></p>
                    <div className={classes.boxPrice}>
                      <p className={classes.price}>Price: <span>$700</span></p>
                      <p>(for all guests)</p>
                    </div>
                    <span>Taxes and fees are included</span>
                  </div>
                </Box>
            </div>
      </div>
    </>
  );
})

export default DetailTour;
