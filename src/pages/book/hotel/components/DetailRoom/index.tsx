import React, {memo} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faBellConcierge, faCircleInfo, faPhone} from '@fortawesome/free-solid-svg-icons';
import useFormattedDate from "hooks/useFormatDate";
import { IRoomBillConfirm } from "models/roomBill";
import moment from "moment";
import { fCurrency2VND } from "utils/formatNumber";
import { sumPrice } from "utils/totalPrice";

interface Props {
  roomBillConfirm: IRoomBillConfirm;
}
// eslint-disable-next-line react/display-name
const DetailTour = memo(({roomBillConfirm}:Props)=> {
  const dayBook = useFormattedDate(new Date());

  const totalPrice = [];

  roomBillConfirm?.rooms.forEach(room => {
    room?.priceDetail.map((price) => {
      const _price = price?.price * room?.amount * (100 - room?.discount) / 100;
      totalPrice.push(_price);
    })
  })
  
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
            <div className={classes.informationContainer}>
                <Box
                title="Your booking details"
                >
                  <div className={classes.boxDetailRoom}>
                    <p>Date book: <span>{dayBook}</span></p>
                    <p>Check in time: <span>{moment(roomBillConfirm?.startDate).format("DD/MM/YYYY")}</span></p>
                    <p>Check out time: <span>{moment(roomBillConfirm?.endDate).format("DD/MM/YYYY")}</span></p>
                    <Link href="/listHotel">
                      <a>
                        <p className={classes.changeChoice}>Change your choice</p>
                      </a>
                    </Link>
                  </div>
                </Box>
                <Box title="Cost summary">
                  <div className={classes.boxCostSummary}>
                    <p>Tour name: <span>{roomBillConfirm?.hotel?.name}</span></p>
                    {roomBillConfirm?.rooms.map((room, index) => (
                      <div className={classes.boxRoom} key={index}>
                          <p>Room name: <span>{room?.title}</span></p>
                          <p>Price: {room?.priceDetail.map((price, index) => (
                            <>
                              <span key={index}>{fCurrency2VND(price?.price * room?.amount * (100 - room?.discount) / 100)} VND</span>
                              <br></br>
                            </>
                          ))}</p>
                          <p>Amount: <span>{room?.amount}</span></p>
                          <p>Discount: {room?.discount && <span>{room?.discount}%</span>}</p>
                      </div>
                    ))}
                    <div className={classes.boxTotalPrice}>
                      <p>Total price: <span>{fCurrency2VND(sumPrice(totalPrice))} VND</span></p>
                    </div>
                    <span>(Taxes and fees are included)</span>
                  </div>
                </Box>
                <Box title="Note for you">
                  <div className={classes.boxTip}>
                      <div className={classes.tip}>
                        <FontAwesomeIcon icon={faPhone}/>
                        <p>Please call <span>{roomBillConfirm?.hotel?.contact}</span> the hotel owner&apos;s number for all inquiries </p>
                      </div>
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
