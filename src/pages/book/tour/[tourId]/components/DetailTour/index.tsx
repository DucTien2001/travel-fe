import React, {memo} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faBellConcierge, faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import { Tour } from "models/tour";
import { fCurrency2 } from "utils/formatNumber";
import useFormattedDate from "hooks/useFormatDate";
// eslint-disable-next-line react/display-name
interface Props {
  tour: Tour;
  amount: number;
}
// eslint-disable-next-line react/display-name
const DetailTour = memo(({tour, amount}: Props)=> {
  const dayBook = useFormattedDate(new Date());
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
            <div className={classes.informationContainer}>
                <Box
                title="Your booking details"
                >
                  <div className={classes.boxDetailTour}>
                    <p>Date book: <span>{dayBook}</span></p>
                    <p className={classes.note}>Ticket expiration time <span>30 days</span> is from the date of purchase</p>
                    <Link href="/listTour">
                      <a>
                      <p className={classes.changeChoice}>Change your choice</p>
                      </a>
                    </Link>
                  </div>
                </Box>
                <Box title="Cost summary">
                  <div className={classes.boxCostSummary}>
                    <p>Tour name: <span>{tour?.title}</span></p>
                    <div className={classes.boxPrice}>
                      <p className={classes.price}>Price: <span>{amount ? fCurrency2(tour?.price * amount * ((100 - tour?.discount) / 100)) : fCurrency2(tour?.price)} VND</span></p>
                      <p>(for all guests)</p>
                    </div>
                    <span>Taxes and fees are included</span>
                  </div>
                </Box>
                <Box title="Note for you">
                  <div className={classes.boxTip}>
                      <div className={classes.tip}>
                        <FontAwesomeIcon icon={faCircleCheck}/>
                        <p>You can go experience it anytime while the ticket price is still available</p>
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
