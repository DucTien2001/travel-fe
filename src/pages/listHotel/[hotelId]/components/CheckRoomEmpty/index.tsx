import React, { memo, useEffect, useMemo, useState } from "react";
import { Badge, Container } from "reactstrap";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import InputCounter from "components/common/inputs/InputCounter";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { RoomService } from "services/normal/room";
import { useDispatch } from "react-redux";
import { HOTEL_SECTION } from "models/hotel";
import { useRouter } from "next/router";
import { fCurrency2 } from "utils/formatNumber";
import useAuth from "hooks/useAuth";
import { Grid, Collapse } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import WifiIcon from "@mui/icons-material/Wifi";
import SmokeFreeIcon from "@mui/icons-material/SmokeFree";
import BedIcon from "@mui/icons-material/Bed";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import InfoIcon from "@mui/icons-material/Info";
import { Stay } from "models/stay";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import moment, { Moment } from "moment";
import InputTextfield from "components/common/inputs/InputTextfield";
import { useTranslation } from "react-i18next";
import { DataPagination, ESortOption, sortOption } from "models/general";
import InputSelect from "components/common/inputs/InputSelect";
import { NormalGetRoom, Room } from "models/room";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { setRoomBillConfirmReducer } from "redux/reducers/Normal/actionTypes";
import PopupDetailRoom from "../PopupDetailRoom";
export interface CheckRoomForm {
  departure: Date;
  return: Date;
  amountList: {
    amount: number;
  }[];
  amount: number;
}
interface Props {
  stay: Stay;
}

// eslint-disable-next-line react/display-name
const CheckRoomEmpty = memo(({ stay }: Props) => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const router = useRouter();
  const { t, i18n } = useTranslation("common");

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

  const [focus, setFocus] = useState(false);
  const [open, setOpen] = useState(0);
  const [dateStart, setDateStart] = useState<Moment>(moment(new Date()));
  const [dateEnd, setDateEnd] = useState<Moment>(
    moment(new Date(Date.now() + 3600 * 1000 * 24))
  );
  const [numberOfAdult, setNumberOfAdult] = useState(null);
  const [numberOfChild, setNumberOfChild] = useState(null);
  const [numberOfRoom, setNumberOfRoom] = useState(null);
  const [roomFilter, setRoomFilter] = useState<number>(
    ESortOption.LOWEST_PRICE
  );
  const [data, setData] = useState<DataPagination<Room>>();
  const [itemRoom, setItemRoom] = useState<Room>(null);
  const [openPopupDetailRoom, setOpenPopupDetailRoom] = useState(false);

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
      amountList: [{ amount: 0 }],
    },
  });
  const yesterday = moment().subtract(1, "day");
  const disablePastDt = (current) => {
    return current.isAfter(yesterday);
  };

  const onFocus = () => {
    setFocus(!focus);
  };

  const onTogglePopupDetailRoom = (e, item) => {
    setItemRoom(item);
  };

  const onClosePopupDetailRoom = () => {
    if (!itemRoom) return;
    setItemRoom(null);
  };

  const fetchData = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
    startDate?: Date;
    endDate?: Date;
  }) => {
    const params: NormalGetRoom = {
      stayId: stay?.id || Number(router.query.hotelId.slice(1)),
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      startDate: dateStart?.toDate() || value?.startDate,
      endDate: dateEnd?.toDate() || value?.endDate,
      sort: roomFilter || null,
      numberOfAdult: numberOfAdult || null,
      numberOfChildren: numberOfChild || null,
      numberOfRoom: numberOfRoom || null,
    };
    dispatch(setLoading(true));
    RoomService.findAll(params)
      .then((res) => {
        setData({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const onClearFilter = () => {
    setDateStart(moment(new Date()));
    setDateEnd(moment(new Date(Date.now() + 3600 * 1000 * 24)));
    setRoomFilter(null);
    setNumberOfAdult(0);
    setNumberOfChild(0);
    setNumberOfRoom(0);
  };

  const _newListPriceDay = data?.data?.map((item) => {
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

  let totalPrice = 0;
  let totalRoom = 0;

  for (var i = 0; i < data?.data?.length; i++) {
    const _watchAmount = watch(`amountList.${i}.amount`);
    let result = data?.data[i]?.prices.reduce(function (total, element) {
      if (data?.data[i].discount) {
        return (total + element.price) * ((100 - data?.data[i].discount) / 100);
      } else {
        return total + element.price;
      }
    }, 0);
    totalPrice += result * _watchAmount;
    totalRoom += _watchAmount;
  }

  const listMinPrice = [];
  for (var i = 0; i < _newListPriceDay?.length; i++) {
    let minPrice = _newListPriceDay[i]?.reduce(function (accumulator, element) {
      return accumulator < element ? accumulator : element;
    });
    listMinPrice?.push(minPrice);
  }

  const _onSubmit = (dataCheckForm: CheckRoomForm) => {
    const roomBillConfirm = [];
    dataCheckForm?.amountList?.map((item, index) => {
      if (item?.amount > 0) {
        roomBillConfirm.push({
          ...data?.data[index],
          amount: item.amount,
        });
      }
    });
    dispatch(
      setRoomBillConfirmReducer({
        stay: stay,
        rooms: roomBillConfirm,
        startDate: new Date(dataCheckForm?.departure),
        endDate: new Date(dataCheckForm?.return),
      })
    );
    if (!user) {
      router.push(`/auth/login`);
    } else {
      router.push(`/book/hotel/:${stay?.id}/booking`);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dateStart,
    dateEnd,
    roomFilter,
    numberOfAdult,
    numberOfChild,
    numberOfRoom,
  ]);

  useEffect(() => {
    setValue(
      "amountList",
      data?.data.map(() => ({
        amount: 0,
      }))
    );
  }, [data?.data]);

  return (
    <Grid
      sx={{ backgroundColor: "#f6f2f2", padding: "32px 0 8px 0" }}
      id={HOTEL_SECTION.section_check_room}
      component={"form"}
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
            {t("stay_detail_section_stay_check_room_empty_title")} {stay?.name}
          </h5>
          <Grid>
            <Grid
              xs={12}
              container
              className={classes.inputDateContainer}
              spacing={2}
            >
              <Grid item xs={2}>
                <InputDatePicker
                  className={classes.inputSearchDate}
                  label={t(
                    "stay_detail_section_stay_check_room_empty_departure"
                  )}
                  placeholder="Departure"
                  name="departure"
                  dateFormat="DD/MM/YYYY"
                  timeFormat={false}
                  isValidDate={disablePastDt}
                  closeOnSelect
                  value={dateStart ? dateStart : ""}
                  initialValue={dateStart ? dateStart : ""}
                  _onChange={(e) => {
                    setDateStart(moment(e?._d));
                  }}
                  inputRef={register("departure")}
                  errorMessage={errors.departure?.message}
                  minDate={moment().toDate()}
                  maxDate={watch("return")}
                  control={control}
                />
              </Grid>
              <Grid item xs={2}>
                <InputDatePicker
                  className={classes.inputSearchDate}
                  label={t("stay_detail_section_stay_check_room_empty_return")}
                  placeholder="Return"
                  name="return"
                  dateFormat="DD/MM/YYYY"
                  timeFormat={false}
                  closeOnSelect
                  value={dateEnd ? dateEnd : ""}
                  initialValue={dateEnd ? dateEnd : ""}
                  _onChange={(e) => {
                    setDateEnd(moment(e?._d));
                  }}
                  inputRef={register("return")}
                  errorMessage={errors.return?.message}
                  minDate={watch("departure") || moment().toDate()}
                  control={control}
                />
              </Grid>
              <Grid
                className={clsx(classes.boxItem, classes.boxGuest)}
                item
                xs={5}
              >
                <InputTextfield
                  title={t(
                    "landing_page_section_search_stay_input_guest_title"
                  )}
                  className={classes.inputSearchLocation}
                  placeholder="Guest and Room"
                  name="people"
                  autoComplete="off"
                  startAdornment={<FamilyRestroomIcon />}
                  onFocus={onFocus}
                  value={`${numberOfAdult ? numberOfAdult : 1} ${t(
                    "landing_page_section_search_stay_input_adult_placeholder"
                  )}, ${numberOfChild ? numberOfChild : 0} ${t(
                    "landing_page_section_search_stay_input_child_placeholder"
                  )}, ${numberOfRoom ? numberOfRoom : 1} ${t(
                    "landing_page_section_search_stay_input_room_placeholder"
                  )}`}
                />
                {focus && (
                  <div className={classes.containerChooseGuest}>
                    <Grid container sx={{ width: "100%" }}>
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "14px",
                        }}
                        xs={12}
                      >
                        <Grid className={classes.boxTitleCounter}>
                          <PeopleAltIcon />
                          <p>
                            {t(
                              "landing_page_section_search_stay_input_adult_placeholder"
                            )}
                          </p>
                        </Grid>
                        <Grid>
                          <InputCounter
                            className={classes.inputCounter}
                            max={9999}
                            min={0}
                            onChange={(e) => setNumberOfAdult(e)}
                            value={numberOfAdult}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "14px",
                        }}
                        xs={12}
                      >
                        <Grid className={classes.boxTitleCounter}>
                          <ChildFriendlyIcon />
                          <p>
                            {t(
                              "landing_page_section_search_stay_input_child_placeholder"
                            )}
                          </p>
                        </Grid>
                        <Grid>
                          <InputCounter
                            className={classes.inputCounter}
                            max={9999}
                            min={0}
                            onChange={(e) => setNumberOfChild(e)}
                            value={numberOfChild}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "14px",
                        }}
                        xs={12}
                      >
                        <Grid className={classes.boxTitleCounter}>
                          <MeetingRoomIcon />
                          <p>
                            {t(
                              "landing_page_section_search_stay_input_room_placeholder"
                            )}
                          </p>
                        </Grid>
                        <Grid>
                          <InputCounter
                            className={classes.inputCounter}
                            max={9999}
                            min={0}
                            onChange={(e) => setNumberOfRoom(e)}
                            value={numberOfRoom}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginBottom: "14px",
                        }}
                        xs={12}
                      >
                        <Button
                          btnType={BtnType.Secondary}
                          onClick={() => setFocus(!focus)}
                        >
                          {t("common_cancel")}
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Grid>
              <Grid xs={3} item>
                <InputSelect
                  title={t("stay_detail_section_stay_check_room_empty_sort")}
                  className={classes.inputSelect}
                  bindLabel="translation"
                  selectProps={{
                    options: sortOption,
                    placeholder: t("list_tours_sort_by_placeholder"),
                  }}
                  onChange={(e) => setRoomFilter(e?.value)}
                />
              </Grid>
            </Grid>
            <Grid className={classes.boxResetFilter}>
              <Button
                btnType={BtnType.Primary}
                className={classes.btnResetOption}
                onClick={onClearFilter}
              >
                <FontAwesomeIcon icon={faArrowsRotate} />{" "}
                {t("list_tours_reset_filter")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container className={classes.rootRooms}>
        {data?.data?.map((room, index) => (
          <Grid
            sx={{ padding: "16px" }}
            container
            key={index}
            className={classes.containerCheckRoom}
          >
            <Grid
              className={classes.leftPanel}
              item
              xs={3}
              onClick={(e) => onTogglePopupDetailRoom(e, room)}
            >
              <Grid className={classes.boxLeftItem}>
                <Grid sx={{ position: "relative", cursor: "pointer" }}>
                  <img src={room?.images[0]} alt="anh"></img>
                  <Grid className={classes.numberImg}>1/4</Grid>
                  <Grid container className={classes.moreImg} spacing={0.5}>
                    <Grid item xs={4}>
                      <img src={room?.images[1]} alt="anh"></img>
                    </Grid>
                    <Grid item xs={4}>
                      <img src={room?.images[2]} alt="anh"></img>
                    </Grid>
                    <Grid item xs={4}>
                      <img src={room?.images[1]} alt="anh"></img>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid sx={{ padding: "14px" }}>
                  <Grid sx={{ paddingBottom: "10px" }}>
                    {room?.utility?.map((item) => (
                      <Badge className={classes.tag} key={index}>
                        {item}
                      </Badge>
                    ))}
                  </Grid>
                  <Button
                    btnType={BtnType.Outlined}
                    className={classes.btnSeeRoom}
                    onClick={(e) => onTogglePopupDetailRoom(e, room)}
                  >
                    {t("stay_detail_section_stay_check_room_empty_see_detail")}
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
                    <span>
                      {room?.numberOfAdult}{" "}
                      {t("stay_detail_section_stay_check_room_empty_adult")},{" "}
                      {room?.numberOfChildren}{" "}
                      {t("stay_detail_section_stay_check_room_empty_child")}
                    </span>
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
                      <span>
                        {" "}
                        {t(
                          "stay_detail_section_stay_check_room_empty_number_of_bed"
                        )}
                        : {room?.numberOfBed}
                      </span>
                    </Grid>
                    <Grid
                      sx={{ padding: "0 0 10px 0" }}
                      className={classes.itemInforRoom}
                    >
                      <CheckBoxIcon />
                      <span>
                        {t(
                          "stay_detail_section_stay_check_room_empty_number_of_room_left"
                        )}
                        : {room?.numberOfRoom}
                      </span>
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
                      <span>
                        {t("stay_detail_section_stay_from_review")} &nbsp;
                      </span>{" "}
                      <p> {fCurrency2(listMinPrice[index])} VND</p>
                    </Grid>
                    <Grid
                      sx={{ padding: "0 0 10px 0" }}
                      className={classes.itemPriceRoom}
                    >
                      <span>
                        {t(
                          "stay_detail_section_stay_check_room_empty_room_night"
                        )}
                      </span>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.boxDetailPrice}>
                  <Grid
                    onClick={() => setOpen(open === index ? -1 : index)}
                    className={classes.boxControl}
                  >
                    <p>
                      {t(
                        "stay_detail_section_stay_check_room_empty_price_detail"
                      )}
                    </p>
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
                      {room?.prices?.map((priceInfo, index) => (
                        <Grid
                          className={classes.itemPrice}
                          xs={6}
                          item
                          key={index}
                        >
                          <p>
                            {moment(priceInfo?.date).format("DD/MM/YYYY")} {":"}{" "}
                            <span>{fCurrency2(priceInfo?.price)} VND</span>{" "}
                            {t(
                              "stay_detail_section_stay_check_room_empty_room_night"
                            )}
                          </p>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                </Grid>
                <Grid className={classes.footerPrice}>
                  <Grid className={classes.boxTip}>
                    <InfoIcon />
                    <p>
                      {t(
                        "stay_detail_section_stay_check_room_empty_tip_select"
                      )}
                    </p>
                  </Grid>
                  <Grid className={classes.boxNumberOfRoom}>
                    <Grid sx={{ flex: "2", paddingRight: "10px" }}>
                      <p>
                        {t(
                          "stay_detail_section_stay_check_room_empty_number_of_room"
                        )}
                      </p>
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
            <PopupDetailRoom
              isOpen={!!itemRoom}
              toggle={onClosePopupDetailRoom}
              room={itemRoom}
              minPrice={listMinPrice[index]}
            />
          </Grid>
        ))}
        <Grid className={classes.footerRoom}>
          <Grid className={classes.boxTotalPrice}>
            <p>{t("stay_detail_section_stay_check_room_empty_total_price")}</p>
            <p className={classes.price}>
              <span>{fCurrency2(Math.ceil(totalPrice))} VND</span> / {totalRoom}{" "}
              {t("stay_detail_section_stay_check_room_empty_room_night")}
            </p>
          </Grid>
          <Grid className={classes.btnControl}>
            <Button
              btnType={BtnType.Secondary}
              type="submit"
              disabled={totalPrice === 0}
            >
              {t("stay_detail_section_stay_check_room_empty_book_now")}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Grid>
  );
});

export default CheckRoomEmpty;
