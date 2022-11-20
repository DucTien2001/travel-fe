import React, { memo, useEffect, useMemo, useState } from "react";
import { Container, Form, Row, Table } from "reactstrap";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import InputCounter from "components/common/inputs/InputCounter";
import { images } from "configs/images";
import Carousel from "components/Carousel";
import classes from "./styles.module.scss";
import Button, { BtnType } from "components/common/buttons/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import * as yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import Link from "next/link";
import BoxSmallLeft from "components/BoxSmallLeft";
import { RoomService } from "services/normal/room";
import moment from "moment";
import { format } from 'date-fns';
export interface CheckRoomForm {
  departure: Date;
  return: Date;
  amountList: {
    amount: number
  }[];
}

interface Props {
  hotelId: number;
}

// eslint-disable-next-line react/display-name
const CheckRoomEmpty = memo(({ hotelId }: Props) => {
  const [listRooms, setListRoom] = useState([]);

  const schema = useMemo(() => {
    return yup.object().shape({
      departure: yup.date().required("Departure date is required"),
      return: yup.date().min(yup.ref("departure"), "Return day is must be rather than departure day")
      .required("Return date is required"),
      amountList: yup.array().of(
        yup.object().shape({
          amount: yup.number()
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
      return: new Date(Date.now() + ( 3600 * 1000 * 24)),
      
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "amountList",
    keyName: "fieldID",
  });

  useEffect(() => {
    if (hotelId) {
      RoomService.getAllRoomsOfHotel(hotelId).then((res) => {
        setListRoom(res.data);
      });
    }
  }, [hotelId]);

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
  const _onSubmit = (data) => {
    console.log(data, "===================")
    const startDate = new Date(data?.departure);
    const endDate = new Date(data?.return);
    RoomService.getAllRoomsAvailable({
      hotelId: hotelId,
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
            if (i.getTime() === item?.date.getTime()) {
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
      reset({
        amountList: _listRooms.map(()=>({
          amount: 0
        }))
      })
      console.log(_listRooms, "==========_listRooms=======");
      setListRoom(_listRooms);
    });
  };

  return (
    <>
      <Container className={classes.root}>
        <h4 className={classes.titleCheckEmpty}>List room empty</h4>
        <Form role="form" onSubmit={handleSubmit(_onSubmit)} className={classes.form}>
          <Row xs={4} className={classes.inputDateContainer}>
            <InputDatePicker
              className={classes.inputSearchDate}
              label="Departure date"
              placeholder="Departure"
              control={control}
              name="departure"
              timeFormat={false}
              labelIcon={<FontAwesomeIcon icon={faCalendarDays} />}
              inputRef={register("departure")}
              errorMessage={errors.departure?.message}
            />
            <InputDatePicker
              className={classes.inputSearchDate}
              label="Return date"
              placeholder="Return"
              control={control}
              name="return"
              timeFormat={false}
              labelIcon={<FontAwesomeIcon icon={faCalendarDays} />}
              inputRef={register("return")}
              errorMessage={errors.return?.message}
            />
            <div className={classes.btnContainer}>
              <Button btnType={BtnType.Primary} type="submit">
                <FontAwesomeIcon icon={faArrowsRotate} />
                Change search
              </Button>
            </div>
          </Row>
        </Form>
        {/* =============== Desktop =============== */}
        <div className={classes.boxTableRoom}>
        <Table bordered className={classes.table}>
          <thead>
            <tr>
              <th scope="row" className={classes.roomNumberTitle}>
                Room Type
              </th>
              <th className={clsx(classes.colImgMobile, classes.title)}>Images</th>
              <th className={classes.title}>Number of rooms left</th>
              <th className={classes.title}>Price</th>
              <th className={classes.title}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {listRooms?.map((room, index) => (
              <tr key={room?.id}>
                <th scope="row" className={classes.col}>
                  {room?.title}
                </th>
                <td className={classes.colImg}>
                  {/* <Carousel images={[images.bgUser, images.bg19]} className={classes.imgCarousel}/> */}
                </td>
                <td className={classes.col}>{room?.numberOfRoom}</td>
                <td className={classes.col}>
                  {room?.priceDetail?.map((priceInfo, index) => (
                    <p key={index}>
                      {moment(priceInfo?.date).format("DD/MM/YYYY")}{":"} {priceInfo?.price}
                    </p>
                  ))}
                </td>
                <td className={clsx(classes.colAmount, classes.col)}>
                  <Controller
                  name={`amountList.${index}.amount`}
                  control={control}
                  render={({ field }) => (
                      <InputCounter
                        className={classes.inputCounter}
                        max={room?.numberOfRoom}
                        min={1}
                        onChange={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Table bordered className={clsx(classes.table, classes.tableConfirm)} xs={3}>
          <thead>
            <tr>
              <th className={classes.colConfirm}>
                Confirm
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td className={clsx(classes.colConfirm, classes.col)}>
                  <Link href="/book/hotel/:1">
                    <Button btnType={BtnType.Secondary}>Book</Button>
                  </Link>
                </td>
            </tr>
          </tbody>
        </Table>
        </div>
        {/*=============== Mobile ============  */}
        <BoxSmallLeft className={classes.tableMobile} title="Choose the right one for you">
          <div>
            <Row className={clsx("mb-3", classes.row)}>
              <div className={classes.boxInformation}>
                <p className="mr-2">Room number: </p>
                <p>1</p>
              </div>
              <div className={classes.boxInformation}>
                <p className="mr-2">Price: </p>
                <p className={classes.priceMobile}>$200</p>
              </div>
            </Row>
            <div>
              <Carousel images={[images.phuQuoc, images.bg19]} className={classes.imgCarouselMobile} />
            </div>
            <Row className={clsx("mt-4", classes.row)}>
              <div className={classes.boxInformation}>
                <p className="mr-2">Amount</p>
                {/* <Controller
                  name="amount"
                  control={control}
                  render={({ field }) => (
                    <InputCounter
                      className={classes.inputCounter}
                      max={5}
                      min={1}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )}
                /> */}
              </div>
            </Row>
          </div>
        </BoxSmallLeft>
      </Container>
    </>
  );
});

export default CheckRoomEmpty;
