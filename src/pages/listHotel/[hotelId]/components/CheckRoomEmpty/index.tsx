import React, { memo, useEffect, useMemo, useState } from "react";
import { Badge, Container, Form, Row, Table } from "reactstrap";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import InputCounter from "components/common/inputs/InputCounter";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import BoxSmallLeft from "components/BoxSmallLeft";
import { RoomService } from "services/normal/room";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setRoomBillConfirmReducer } from "redux/reducers/Normal/actionTypes";
import { HOTEL_SECTION, IHotel } from "models/hotel";
import { useRouter } from "next/router";
import { fCurrency2 } from "utils/formatNumber";
import useAuth from "hooks/useAuth";
import { Grid, Collapse } from "@mui/material";
import { images } from "configs/images";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WifiIcon from "@mui/icons-material/Wifi";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import NoMealsIcon from "@mui/icons-material/NoMeals";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import BedIcon from "@mui/icons-material/Bed";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InfoIcon from "@mui/icons-material/Info";
import { sumPrice } from "utils/totalPrice";

export interface CheckRoomForm {
  departure: Date;
  return: Date;
  amountList: {
    amount: number;
  }[];
}

interface Props {
  hotel: IHotel;
}

// eslint-disable-next-line react/display-name
const CheckRoomEmpty = memo(({ hotel }: Props) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const [listRooms, setListRoom] = useState([]);
  const [open, setOpen] = useState(0);
  const schema = useMemo(() => {
    return yup.object().shape({
      departure: yup
        .date()
        .max(yup.ref("return"), "Departure date can't be after return date")
        .required("Start datetime is required"),
      return: yup
        .date()
        .min(yup.ref("departure"), "Return date can't be before departure date")
        .required("End datetime is required"),
      amountList: yup.array().of(
        yup.object().shape({
          amount: yup.number(),
        })
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<CheckRoomForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      departure: new Date(),
      return: new Date(Date.now() + 3600 * 1000 * 24),
    },
  });
  const _departure = watch("departure");
  const _return = watch("return");

  const getPriceOfDay = (date: Date, room: any) => {
    let price = 0;
    const currentDay = date.getDay();
    switch (currentDay) {
      case 0:
        price = room.sundayPrice;
        break;
      case 1:
        price = room.mondayPrice;
        break;
      case 2:
        price = room.tuesdayPrice;
        break;
      case 3:
        price = room.wednesdayPrice;
        break;
      case 4:
        price = room.thursdayPrice;
        break;
      case 5:
        price = room.fridayPrice;
        break;
      case 6:
        price = room.saturdayPrice;
    }
    return price;
  };

  const getRoomsAvailable = () => {
    const startDate = new Date(_departure);
    const endDate = new Date(_return);
    RoomService.getAllRoomsAvailable({
      hotelId: hotel?.id,
      startDate: startDate,
      endDate: endDate,
    }).then((res) => {
      const _listRooms = [];
      res.data.map((room) => {
        const prices = [];
        let i = new Date(startDate);
        for (i; i.getTime() < endDate.getTime(); i.setDate(i.getDate() + 1)) {
          let flag = false;
          room.specialDatePrice.map((item) => {
            const itemDate = new Date(item?.date);
            if (
              i.getDate() === itemDate.getDate() &&
              i.getMonth() === itemDate.getMonth() &&
              i.getFullYear() === itemDate.getFullYear()
            ) {
              prices.push({
                date: new Date(i),
                price: item?.price,
              });
              flag = true;
            }
          });
          if (!flag) {
            prices.push({
              date: new Date(i),
              price: getPriceOfDay(i, room),
            });
          }
        }
        _listRooms.push({ ...room, priceDetail: [...prices] });
      });
      setValue(
        "amountList",
        _listRooms.map(() => ({
          amount: 0,
        }))
      );
      setListRoom(_listRooms);
    });
  };

  useEffect(() => {
    if (_departure && _return && hotel?.id) {
      getRoomsAvailable();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_return, hotel]);

  const _newListPriceDay = listRooms.map((item) => {
    return [
      item.mondayPrice,
      item.tuesdayPrice,
      item.wednesdayPrice,
      item.thursdayPrice,
      item.fridayPrice,
      item.saturdayPrice,
      item.sundayPrice,
    ];
  });

  const listMinPrice = [];
  for (var i = 0; i < _newListPriceDay.length; i++) {
    let minPrice = _newListPriceDay[i].reduce(function (accumulator, element) {
      return accumulator < element ? accumulator : element;
    });
    listMinPrice.push(minPrice);
  }

  const isValid = () => {
    let isOK = false;
    for (var i = 0; i < listRooms.length; i++) {
      if (watch(`amountList.${i}.amount`) !== 0) {
        isOK = true;
      }
    }
    return isOK;
  };

  let totalPrice = 0;
  let totalRoom = 0;
  for (var i = 0; i < listRooms.length; i++) {
    const _watchAmount = watch(`amountList.${i}.amount`);
    let result = listRooms[i].priceDetail.reduce(function (total, element) {
      if (listRooms[i].discount) {
        return (total + element.price) * ((100 - listRooms[i].discount) / 100);
      } else {
        return total + element.price;
      }
    }, 0);
    totalPrice += result * _watchAmount;
    totalRoom += _watchAmount;
  }

  const _onSubmit = (data) => {
    const roomBillConfirm = [];
    data?.amountList?.map((item, index) => {
      if (item?.amount > 0) {
        roomBillConfirm.push({
          ...listRooms[index],
          amount: item.amount,
        });
      }
    });
    dispatch(
      setRoomBillConfirmReducer({
        hotel: hotel,
        rooms: roomBillConfirm,
        startDate: new Date(data?.departure),
        endDate: new Date(data?.return),
      })
    );
    if (!user) {
      router.push(`/auth/login`);
    } else {
      router.push(`/book/hotel/:${hotel?.id}`);
    }
  };

  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const watchStartDate = watch("departure");

  const disableEndDt = (current) => {
    return current.isAfter(watchStartDate);
  };

  return (
    <Grid
      sx={{ backgroundColor: "#f6f2f2", padding: "32px 0 8px 0" }}
      id={HOTEL_SECTION.section_check_room}
      component="form"
      onSubmit={handleSubmit(_onSubmit)}
    >
      <Container className={classes.root}>
        <Grid
          sx={{
            padding: "16px",
            backgroundColor: "var(--white-color)",
            borderRadius: "10px",
            boxShadow: "var(--box-shadow-100)",
          }}
        >
          <h5 className={classes.titleCheckEmpty}>
            Available Room Types in Muong Thanh Grand Da Nang Hotel
          </h5>
          <Grid>
            <Row xs={4} className={classes.inputDateContainer}>
              <InputDatePicker
                className={classes.inputSearchDate}
                label="Departure date"
                placeholder="Departure"
                control={control}
                name="departure"
                dateFormat="DD/MM/YYYY"
                minDate={moment().toDate()}
                maxDate={watch("return")}
                timeFormat={false}
                labelIcon={<FontAwesomeIcon icon={faCalendarDays} />}
                inputRef={register("departure")}
                errorMessage={errors.departure?.message}
                isValidDate={disablePastDt}
              />
              <InputDatePicker
                className={classes.inputSearchDate}
                label="Return date"
                placeholder="Return"
                control={control}
                name="return"
                dateFormat="DD/MM/YYYY"
                minDate={watch("departure") || moment().toDate()}
                timeFormat={false}
                labelIcon={<FontAwesomeIcon icon={faCalendarDays} />}
                inputRef={register("return")}
                errorMessage={errors.return?.message}
                isValidDate={disableEndDt}
              />
            </Row>
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.rootRooms}>
        {listRooms?.map((room, index) => (
          <Grid
            sx={{ padding: "16px" }}
            container
            key={index}
            className={classes.containerCheckRoom}
          >
            <Grid className={classes.leftPanel} item xs={3}>
              <Grid className={classes.boxLeftItem}>
                <Grid sx={{ position: "relative", cursor: "pointer" }}>
                  <img src={images.bgUser.src} alt="anh"></img>
                  <Grid className={classes.numberImg}>1/4</Grid>
                  <Grid container className={classes.moreImg} spacing={0.5}>
                    <Grid item xs={4}>
                      <img src={images.bgbook.src} alt="anh"></img>
                    </Grid>
                    <Grid item xs={4}>
                      <img src={images.authen.src} alt="anh"></img>
                    </Grid>
                    <Grid item xs={4}>
                      <img src={images.bg19.src} alt="anh"></img>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid sx={{ padding: "14px" }}>
                  <Grid sx={{ paddingBottom: "10px" }}>
                    <Badge className={classes.tag}>Air Condition</Badge>
                  </Grid>
                  <Button
                    btnType={BtnType.Outlined}
                    className={classes.btnSeeRoom}
                  >
                    See Room Detail
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              xs={9}
              sx={{ paddingLeft: "10px" }}
              className={classes.rootRightPanel}
            >
              <Grid className={classes.rightPanel}>
                <Grid className={classes.rightPanelHeader}>
                  <Grid>
                    <p>{room?.title}</p>
                  </Grid>
                  <Grid>
                    <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>
                    <span>2 Guests</span>
                  </Grid>
                </Grid>
                <Grid className={classes.boxServices} container>
                  <Grid item xs={4}>
                    <Grid
                      sx={{ padding: "0 0 10px 0" }}
                      className={classes.itemService}
                    >
                      <RestaurantIcon />
                      <span>Free Breakfast</span>
                    </Grid>
                    <Grid
                      sx={{ padding: "0 0 10px 0" }}
                      className={classes.itemService}
                    >
                      <WifiIcon />
                      <span>Free Wifi</span>
                    </Grid>
                    <Grid
                      sx={{ padding: "0 0 10px 0" }}
                      className={classes.itemService}
                    >
                      <SmokeFreeIcon />
                      <span>Non-Smoking</span>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid
                      sx={{ padding: "0 0 10px 0" }}
                      className={classes.itemInforRoom}
                    >
                      <BedIcon />
                      <span>Number of bed: {room?.numberOfBed}</span>
                    </Grid>
                    <Grid
                      sx={{ padding: "0 0 10px 0" }}
                      className={classes.itemInforRoom}
                    >
                      <CheckBoxIcon />
                      <span>Number of room left: {room?.numberOfRoom}</span>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} className={classes.boxPrice}>
                    {room?.discount !== 0 && (
                      <Grid
                        sx={{ padding: "0 0 10px 0" }}
                        className={classes.itemPriceRoom}
                      >
                        <span className={classes.discount}>
                          {fCurrency2(
                            Math.ceil(
                              listMinPrice[index] *
                                ((100 - room?.discount) / 100)
                            )
                          )}{" "}
                          VND
                        </span>
                      </Grid>
                    )}
                    <Grid
                      sx={{ padding: "0 0 10px 0" }}
                      className={classes.itemPriceRoom}
                    >
                      <span>From &nbsp;</span>{" "}
                      <p> {fCurrency2(listMinPrice[index])} VND</p>
                    </Grid>
                    <Grid
                      sx={{ padding: "0 0 10px 0" }}
                      className={classes.itemPriceRoom}
                    >
                      <span>/ room/ night(s)</span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.boxDetailPrice}>
                  <Grid
                    onClick={() => setOpen(open === index ? -1 : index)}
                    className={classes.boxControl}
                  >
                    <p>Price Detail</p>
                    {open === index ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </Grid>
                  <Collapse in={open === index} timeout="auto" unmountOnExit>
                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between" }}
                      container
                    >
                      {room?.priceDetail?.map((priceInfo, index) => (
                        <Grid
                          className={classes.itemPrice}
                          xs={6}
                          item
                          key={index}
                        >
                          <p>
                            {moment(priceInfo?.date).format("DD/MM/YYYY")} {":"}{" "}
                            <span>{fCurrency2(priceInfo?.price)} VND</span> /
                            room / night(s)
                          </p>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Grid>
                <Grid className={classes.footerPrice}>
                  <Grid className={classes.boxTip}>
                    <InfoIcon />
                    <p>Please select the number of rooms you want</p>
                  </Grid>
                  <Grid className={classes.boxNumberOfRoom}>
                    <Grid sx={{ flex: "2", paddingRight: "10px" }}>
                      <p>Number of room(s)</p>
                    </Grid>
                    <Grid sx={{ flex: "1" }}>
                      <Controller
                        name={`amountList.${index}.amount`}
                        control={control}
                        render={({ field }) => (
                          <InputCounter
                            className={classes.inputCounter}
                            max={room?.numberOfRoom}
                            min={0}
                            onChange={field.onChange}
                            value={field.value}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid className={classes.footerRoom}>
          <Grid className={classes.boxTotalPrice}>
            <p>Total Price</p>
            <p className={classes.price}>
              <span>{fCurrency2(Math.ceil(totalPrice))} VND</span> / {totalRoom}{" "}
              room / night(s)
            </p>
          </Grid>
          <Grid className={classes.btnControl}>
            <Button
              btnType={BtnType.Secondary}
              type="submit"
              disabled={!isValid()}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
});

export default CheckRoomEmpty;
