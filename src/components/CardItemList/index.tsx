import React, { memo } from "react";
import Link from "next/link";
// reactstrap components
import classes from "./styles.module.scss";
import Stars from "components/Stars";
import clsx from "clsx";
import { fCurrency2, fCurrency2VND } from "utils/formatNumber";
import { Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesRight,
  faLocationDot,
  faSignsPost,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { ReceiptLong } from "@mui/icons-material";

interface Props {
  className?: string;
  linkView: string;
  linkBook: string;
  id: number;
  src?: string;
  title: string;
  description?: string;
  businessHours?: string[];
  checkInTime?: string;
  checkOutTime?: string;
  contact?: string;
  city?: string;
  district?: string;
  commune?: string;
  price?: number;
  discount?: number;
  rate?: number;
  isTemporarilyStopWorking?: boolean;
  isDelete?: boolean;
  roomNumber?: string;
  bookDates?: string;
  isHotel?: boolean;
  numberOfReviewers?: number;
}

// eslint-disable-next-line react/display-name
const ListServices = memo(
  ({
    className,
    linkView,
    linkBook,
    id,
    src,
    title,
    description,
    businessHours,
    contact,
    price,
    discount,
    checkInTime,
    checkOutTime,
    city,
    district,
    commune,
    rate,
    isTemporarilyStopWorking,
    isDelete,
    isHotel,
    numberOfReviewers,
  }: Props) => {
    const { t, i18n } = useTranslation("common");

    const getRateComment = (rate: number) => {
      switch (rate) {
        case 1:
          return t("common_rate_worst");
        case 2:
          return t("common_rate_bad");
        case 3:
          return t("common_rate_normal");
        case 4:
          return t("common_rate_good");
        case 5:
          return t("common_rate_excellent");
      }
    };

    console.log(discount, "-----");
    return (
      <Grid className={classes.linkView}>
        <Link href={`/${linkView}/:${id}`}>
          <a>
            <Grid
              key={id}
              sx={{
                display: "flex",
                minHeight: "200px",
                minWidth: "640px",
                paddingBottom: "24px",
                cursor: "pointer",
              }}
              className={clsx(
                { [classes.stopWorking]: isTemporarilyStopWorking || isDelete },
                classes.row,
                className
              )}
            >
              <Grid
                container
                sx={{
                  boxShadow: "var(--box-shadow-100)",
                  borderRadius: "10px",
                }}
              >
                <Grid className={classes.boxImg} item xs={3}>
                  <img src={src} alt="anh"></img>
                </Grid>
                <Grid
                  sx={{
                    flex: "1",
                    padding: "24px 14px 7px 14px",
                    justifyContent: "space-between",
                    backgroundColor: "var(--white-color)",
                    boxShadow: "var(--bui-shadow-100)",
                  }}
                  item
                  xs={6}
                >
                  <Grid className={classes.boxLocation}>
                    <FontAwesomeIcon icon={faSignsPost}></FontAwesomeIcon>
                    <div>
                      <p>
                        {commune}, {district}, {city}
                      </p>
                    </div>
                  </Grid>
                  <Grid className={classes.boxTitle}>
                    <p>{title}</p>
                  </Grid>
                  {rate !== 0 ? (
                    <Grid className={classes.boxRate}>
                      {isHotel ? (
                        <Grid className={classes.badge}>
                          {t("common_stay")}
                        </Grid>
                      ) : (
                        <Grid className={classes.badge}>
                          {t("common_tour")}
                        </Grid>
                      )}
                    </Grid>
                  ) : (
                    <Grid className={classes.boxRate}>
                      {isHotel ? (
                        <Grid className={classes.badge}>
                          {t("common_stay")}
                        </Grid>
                      ) : (
                        <Grid className={classes.badge}>
                          {t("common_tour")}
                        </Grid>
                      )}
                    </Grid>
                  )}

                  <Grid
                    className={classes.boxReview}
                    sx={{ paddingTop: "8px" }}
                  >
                    {rate !== 0 && (
                      <Grid className={classes.boxReview}>
                        <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
                        <span>
                          {rate} {getRateComment(rate)}{" "}
                          <span className={classes.numberOfReviews}>
                            | {numberOfReviewers} {t("common_reviews")}
                          </span>
                        </span>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={3} className={classes.containerPrice} container>
                  <Grid item xs={6} className={classes.boxSave}>
                    {discount !== 0 ? (
                      <>
                        <ReceiptLong />
                        <p>
                          {t("card_list_item_save_discount", {
                            discount: discount,
                          })}
                        </p>
                      </>
                    ) : (
                      <>
                        <ReceiptLong />
                        <p>{t("card_list_item_save")}</p>
                      </>
                    )}
                  </Grid>
                  <Grid item xs={6} className={classes.wrapperPrice}>
                    <Grid className={classes.boxPrice}>
                      {discount !== 0 && (
                        <span>
                          {fCurrency2((price * (100 - discount)) / 100)} VND
                        </span>
                      )}
                      <p>{fCurrency2(price)} VND</p>
                    </Grid>
                    <Grid className={classes.boxViewMore}>
                      <p>{t("common_view_more")}</p>
                      <FontAwesomeIcon icon={faAnglesRight}></FontAwesomeIcon>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </a>
        </Link>
      </Grid>
    );
  }
);

export default ListServices;
