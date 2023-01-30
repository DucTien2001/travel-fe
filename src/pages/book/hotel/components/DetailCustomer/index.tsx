import React, { memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";
import CardItemList from "components/CardItemList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import { Row, Col } from "reactstrap";
import Button, { BtnType } from "components/common/buttons/Button";
import PopupDefault from "components/Popup/PopupConfirmSucess";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { VALIDATION } from "configs/constants";
import { Form } from "reactstrap";
import { UserService } from "services/user";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { RoomBillService } from "services/normal/roomBill";
import { IRoomBillConfirm } from "models/roomBill";
import useFormattedDate from "hooks/useFormatDate";
import { sumPrice } from "utils/totalPrice";
import { setConfirmBookRoomReducer } from "redux/reducers/Normal/actionTypes";
import { useRouter } from "next/router";

export interface HotelForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface Props {
  roomBillConfirm: IRoomBillConfirm;
}
// eslint-disable-next-line react/display-name
const DetailCustomer = memo(({ roomBillConfirm }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const dayBook = useFormattedDate(new Date());
  const { user } = useSelector((state: ReducerType) => state.user);
  // const { room } = useSelector((state: ReducerType) => state.normal);

  const [modal, setModal] = useState(false);
  const totalPrice = [];

  roomBillConfirm?.rooms.forEach(room => {
    room?.priceDetail.map((price) => {
      const _price = price?.price * room?.amount * (100 - room?.discount) / 100;
      totalPrice.push(_price);     
    })
  })

  const schema = useMemo(() => {
    return yup.object().shape({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email("Please enter a valid email address").required("Email is required"),
      phoneNumber: yup.string().required("Phone is required").matches(VALIDATION.phone, {
        message: "Please enter a valid phone number.",
        excludeEmptyString: true,
      }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<HotelForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {},
  });

  const _onSubmit = (data: HotelForm) => { 
    const roomBillDetails = []
    const bookedDates = []
    let totalBill = 0
    roomBillConfirm?.rooms?.forEach ((room, index)=>{
      room.priceDetail.forEach ((priceInfo)=>{
        const totalPrice = room.amount * priceInfo.price * (100 - room.discount) / 100
        totalBill+=totalPrice
        roomBillDetails.push({
          roomId: room.id,
          title: room.title,
          amount: room.amount,
          discount: room.discount,
          price: priceInfo.price,
          bookedDate: priceInfo.date,
          totalPrice: totalPrice,
        })
        if(index === 0){
          bookedDates.push(priceInfo.date)
        }
      })
    })
    const roomBill = {
      userId: user?.id,
      hotelId: roomBillConfirm?.hotel?.id,
      userMail: user?.username,
      rooms: roomBillDetails,
      bookedDates: bookedDates,
      startDate: roomBillConfirm?.startDate,
      endDate: roomBillConfirm?.endDate,
      totalBill: totalBill,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      firstName: data?.firstName,
      lastName: data?.lastName,
    }
      // dispatch(setLoading(true));
      // RoomBillService?.create(roomBill)
      // .then(() => {
      //   dispatch(setSuccessMess("Book room successfully"))
      // })
      // .catch((e) => {
      //   dispatch(setErrorMess(e));
      // })
      // .finally(() => {
      //   dispatch(setLoading(false));
      //   toggle();
      // })
    dispatch(setConfirmBookRoomReducer({
      userId: user?.id,
      hotelId: roomBillConfirm?.hotel?.id,
      userMail: user?.username,
      rooms: roomBillDetails,
      bookedDates: bookedDates,
      startDate: roomBillConfirm?.startDate,
      endDate: roomBillConfirm?.endDate,
      totalBill: totalBill,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      firstName: data?.firstName,
      lastName: data?.lastName,
    }))
    router.push("/book/hotel/payment")
  };

  const toggle = () => setModal(!modal);

  useEffect(() => {
    if (user) {
      UserService.getUserProfile(user?.id)
        .then((res) => {
          reset({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            phoneNumber: res.phoneNumber,
          });
        })
        .catch((err) => dispatch(setErrorMess(err)))
        .finally(() => dispatch(setLoading(false)));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);

  

  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <Form onSubmit={handleSubmit(_onSubmit)}>
          <div className={classes.informationContainer}>
            <CardItemList
              className={classes.cardItem}
              linkView="listTour"
              linkBook="book/tour"
              id={roomBillConfirm?.hotel?.id}
              src={roomBillConfirm?.hotel?.images[0]}
              title={roomBillConfirm?.hotel?.name}
              description={roomBillConfirm?.hotel?.description}
              checkInTime={roomBillConfirm?.hotel?.checkInTime}
              checkOutTime={roomBillConfirm?.hotel?.checkOutTime}
              location={roomBillConfirm?.hotel?.location}
              contact={roomBillConfirm?.hotel?.contact}
              tags={roomBillConfirm?.hotel?.tags}
              // rate={tour.rate}
              isHotel={true}
              creator={roomBillConfirm?.hotel?.creator}
            />
            <Box title="Your information" className={classes.containerBox}>
              <div className={classes.box}>
                <div className={classes.noteTip}>
                  <div className={classes.noteEnterLanguage}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    <span>Please fill in the information in Vietnamese or English</span>
                  </div>
                  <div className={classes.noteGreen}>
                    <p>
                      Nearly done! Just fill in the <span>*</span> required information
                    </p>
                  </div>
                </div>
                <Row className={clsx("mt-4", classes.row)}>
                  <Col xs={6} className={classes.colInfor}>
                    <InputTextFieldBorder
                      label="First name"
                      placeholder="Enter your fist name"
                      type="text"
                      inputRef={register("firstName")}
                      errorMessage={errors.firstName?.message}
                    />
                  </Col>
                  <Col xs={6} className={classes.colInfor}>
                    <InputTextFieldBorder
                      label="Last Name"
                      placeholder="Enter your last name"
                      inputRef={register("lastName")}
                      errorMessage={errors.lastName?.message}
                    />
                  </Col>
                </Row>
                <InputTextFieldBorder
                  label="Email"
                  placeholder="Enter your email"
                  inputRef={register("email")}
                  errorMessage={errors.email?.message}
                />
                <InputTextFieldBorder
                  label="Phone"
                  placeholder="Enter your phone"
                  inputRef={register("phoneNumber")}
                  errorMessage={errors.phoneNumber?.message}
                />
                <Button type="submit" className={classes.btnBook} btnType={BtnType.Primary} isDot={true}>
                  Confirm book
                </Button>
              </div>
            </Box>
          </div>
          <PopupDefault
            isOpen={modal}
            onClose={toggle}
            toggle={toggle}
            title={"Confirm"}
            description={
              "Thank you for booking their services. We will send you invoice and ticket information via email. Please check email for details."
            }
          />
        </Form>
      </div>
    </>
  );
});

export default DetailCustomer;
