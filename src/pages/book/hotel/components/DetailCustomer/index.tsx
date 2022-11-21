import React, {memo, useEffect, useMemo, useState} from "react";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";
import CardItemList from "components/CardItemList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Switch from "components/common/Switch";
import {Row, Col} from "reactstrap";
import Button, {BtnType} from "components/common/buttons/Button";
import PopupDefault from "components/Popup/PopupConfirmSucess";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentForm } from "components/Popup/PopupAddComment";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { VALIDATION } from "configs/constants";
import {Form} from "reactstrap";
import { IHotel } from "models/hotel";
import { UserService } from "services/user";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { RoomBillService } from "services/normal/roomBill";
import { IRoomBillConfirm } from "models/roomBill";
import useFormattedDate from "hooks/useFormatDate";


export interface HotelForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  recipient? : {
    firstNameRecipient: string;
    lastNameRecipient: string;
    phoneNumberRecipient: string;
    emailRecipient: string;
  }[];
}

interface Props {
  roomBillConfirm: IRoomBillConfirm;
}
// eslint-disable-next-line react/display-name
const DetailCustomer = memo(({roomBillConfirm}:Props)=> {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const dayBook = useFormattedDate(new Date());
  const {user} = useSelector((state: ReducerType) => state.user);

  const [deactivate, setDeactivate] = useState(false);
  const [modal, setModal] = useState(false);
  
  const handleDeactivate = () => {
    setDeactivate(!deactivate);
  };
  
  const schema = useMemo(() => {
    return yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Please enter a valid email address").required("Email is required"),
        phoneNumber: yup.string()
        .required("Phone is required")
        .matches(VALIDATION.phone, { message: 'Please enter a valid phone number.', excludeEmptyString: true }),
        recipient: yup.array(yup.object({ 
          firstNameRecipient: yup.string().required("Full name recipient is required"),
          lastNameRecipient: yup.string().required("Full name recipient is required"),
          phoneNumberRecipient: yup.string()
          .required("Phone is required")
          .matches(VALIDATION.phone, { message: 'Please enter a valid phone number.', excludeEmptyString: true }),
          emailRecipient: yup.string().email("Please enter a valid email address").required("Email recipient is required"),
        })).notRequired(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language] );

   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    } = useForm<HotelForm>({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: { 
      }
  });

  const { fields: fieldsRecipient, append: appendRecipient, remove: removeRecipient, move: moveRecipient } = useFieldArray({
    control,
    name: "recipient"
  });
  const isShowRecipient = useMemo(() => !!fieldsRecipient?.length, [fieldsRecipient])

  const onToggleRecipient = () => {
    if (deactivate) {
      removeRecipient()
    } else {
      appendRecipient({
        firstNameRecipient: "",
        lastNameRecipient: "",
        phoneNumberRecipient: "",
        emailRecipient: "",
    })
    }
    setDeactivate(!deactivate);
  }

  const clearForm = () => {
    reset({
      recipient: [],
    })
    setDeactivate(!deactivate);
  }

  function sumArray(mang){
    let sum = 0;
    for (let i = 0; i < mang.length; i++){
        sum += mang[i];
    } 
    return sum;
  }

  const _onSubmit = (data: HotelForm) => {
    dispatch(setLoading(true));
    const arrPrice = [];
    roomBillConfirm?.rooms?.forEach(item => {
      item.priceDetail.forEach(price =>{
        const _price = item.amount *  price?.price * ((100 - item?.discount) / 100);
        arrPrice.push(_price);
        console.log(_price);
      })
    })
    ;   
    if(isShowRecipient) {
      if(user) {
        RoomBillService.create({
          userId: user?.id, 
          rooms: roomBillConfirm?.rooms?.map(it => ({ 
            roomId: it.id,
            amount: it.amount,
            discount: it.discount,
          })),
          specialDates: dayBook,
          bookedDates: dayBook, 
          email: data.recipient[0].emailRecipient,
          phoneNumber: data.recipient[0].phoneNumberRecipient,
          firstName: data.recipient[0].firstNameRecipient,
          lastName: data.recipient[0].lastNameRecipient,
        })
        .then(() => {
          dispatch(setSuccessMess("Book tour successfully"));
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          clearForm();
          toggle();
          dispatch(setLoading(false));
        });
      }
    }
    else { 
      if(user) {
        RoomBillService.create({
          userId: user?.id, 
          rooms: roomBillConfirm?.rooms?.map(it => ({ 
            roomId: it.id,
            amount: it.amount,
            discount: it.discount,
          })),
          specialDates: dayBook,
          bookedDates: dayBook, 
          email: data.email,
          phoneNumber: data.phoneNumber,
          firstName: data.firstName,
          lastName: data.lastName,
        })
        .then(() => {
          dispatch(setSuccessMess("Book tour successfully"));
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          toggle();
          dispatch(setLoading(false));
        });
      }
    }
}
 

  const toggle = () => setModal(!modal);
  
  useEffect(() => {
    if(user) {
        UserService.getUserProfile(user?.id)
        .then((res) => {
            reset({
                firstName: res.firstName,
                lastName: res.lastName,
                email: res.email,
                phoneNumber: res.phoneNumber,                 
            })
        })
        .catch((err) => dispatch(setErrorMess(err)))
        .finally(() => dispatch(setLoading(false)));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch])
  
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <Form onSubmit={handleSubmit(_onSubmit)}>
            <div className={classes.informationContainer}>
                <CardItemList className={classes.cardItem} 
                linkView="listTour"
                linkBook="book/tour"
                id = {roomBillConfirm?.hotel?.id}
                src = {roomBillConfirm?.hotel?.images[0]}
                title = {roomBillConfirm?.hotel?.name}
                description = {roomBillConfirm?.hotel?.description}
                checkInTime = {roomBillConfirm?.hotel?.checkInTime}
                checkOutTime = {roomBillConfirm?.hotel?.checkOutTime}
                location ={roomBillConfirm?.hotel?.location}
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
                            <FontAwesomeIcon icon={faCircleInfo}/>
                            <span>Please fill in the information in Vietnamese or English</span>
                        </div>
                        <div className={classes.noteGreen}><p>Nearly done! Just fill in the <span>*</span> required information</p></div>
                      </div>  
                      <Row className="mt-4">
                            <Col xs={6}>
                                <InputTextFieldBorder
                                label="First name"
                                placeholder="Enter your fist name"
                                type="text"
                                inputRef={register("firstName")}
                                errorMessage={errors.firstName?.message}
                                />
                            </Col>
                            <Col xs={6}>
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
                      <Row className={classes.containerToggle}>
                        <div className={classes.boxToggle}>
                          <p>Book for friends</p>
                          <Switch value={deactivate} onChange={onToggleRecipient}/>
                        </div>
                        {!!fieldsRecipient.length && (
                          <>{fieldsRecipient.map((field, index) => (
                            <>
                            <Row key={index}>
                            <div className={classes.noteTipRecipient}>
                                <FontAwesomeIcon icon={faCircleInfo}/>
                                <span>The recipient will receive the ticket information via email after completing the booking. Please fill in the information</span>
                            </div>
                            <Col xs={6}>
                                <InputTextFieldBorder
                                label="First name recipient"
                                placeholder="Enter first name recipient"
                                inputRef={register(`recipient.${index}.firstNameRecipient`)}
                                errorMessage={errors.recipient?.[index]?.firstNameRecipient?.message}
                                />
                            </Col>
                            <Col xs={6}>
                                <InputTextFieldBorder
                                label="Last name recipient"
                                placeholder="Enter last name recipient"
                                inputRef={register(`recipient.${index}.lastNameRecipient`)}
                                errorMessage={errors.recipient?.[index]?.lastNameRecipient?.message}
                                />
                            </Col>
                          </Row>
                          <Row key={index}>
                          <Col xs={6}>
                              <InputTextFieldBorder
                              label="Email recipient"
                              placeholder="Enter email recipient"
                              inputRef={register(`recipient.${index}.emailRecipient`)}
                              errorMessage={errors.recipient?.[index]?.emailRecipient?.message}
                              />
                          </Col>
                          <Col xs={6}>
                              <InputTextFieldBorder
                              label="Phone recipient"
                              placeholder="Enter phone recipient"
                              inputRef={register(`recipient.${index}.phoneNumberRecipient`)}
                              errorMessage={errors.recipient?.[index]?.phoneNumberRecipient?.message}
                              />
                          </Col>
                        </Row>   
                        </>                       
                          ))}</>
                        )}  
                      </Row>
                        <Button type="submit" className={classes.btnBook} btnType={BtnType.Primary} isDot={true} >Confirm book</Button>
                  </div>
                </Box>
            </div>
            <PopupDefault
            isOpen={modal}
            onClose={toggle}
            toggle={toggle}
            title={"Confirm"}
            description={"Thank you for booking their services. We will send you invoice and ticket information via email. Please check email for details."}
            />
            </Form>
      </div>
    </>
  );
})

export default DetailCustomer;
