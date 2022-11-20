import React, {memo, useEffect, useMemo, useState} from "react";
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
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { VALIDATION } from "configs/constants";
import {Form} from "reactstrap";
import { Tour } from "models/tour";
import UseAuth from "hooks/useAuth";
import { UserService } from "services/user";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import { useDispatch } from "react-redux";
import InputCounter from "components/common/inputs/InputCounter";
import { TourBillService } from "services/normal/tourBill";

interface Props {
  tour: Tour;
}

export interface BookForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  amount: number;
  recipient? : {
    firstNameRecipient: string;
    lastNameRecipient: string;
    phoneNumberRecipient: string;
    emailRecipient: string;
  }[];
}
// eslint-disable-next-line react/display-name
const DetailCustomer = memo(({tour}: Props)=> {
  const { user } = UseAuth();
  const dispatch = useDispatch();
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
        amount: yup.number().required("Amount is required"),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    } = useForm<BookForm>({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: { 
        amount: 1,
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

  

  const _onSubmit = (data: BookForm) => {
      dispatch(setLoading(true));
      const totalPrice = data?.amount * tour?.price;
      if(isShowRecipient) {
        if(user) {
          TourBillService.create({
            userId: user?.id,
            userMail: data?.email,
            tourId: tour?.id,
            amount: data.amount,
            price: totalPrice,
            discount: tour?.discount,
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
          TourBillService.create({
            userId: user?.id,
            userMail: data?.email,
            tourId: tour?.id,
            amount: data.amount,
            price: totalPrice,
            discount: tour?.discount,
            email: data?.email,
            phoneNumber: data?.phoneNumber,
            firstName: data?.firstName,
            lastName: data?.lastName,
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
            <CardItemList
              linkView="listTour"
              linkBook="book/tour"
              id = {tour?.id}
              src = {tour?.images[0]}
              title = {tour?.title}
              description = {tour?.description}
              businessHours = {tour?.businessHours}
              location ={tour?.location}
              contact={tour?.contact}
              price ={tour?.price}
              discount = {tour?.discount}
              tags={tour?.tags}
              // rate={tour.rate}
              creator={tour?.creator}
              isTemporarilyStopWorking={tour?.isTemporarilyStopWorking}
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
                      <Row>
                      <Col xs={3}>
                      <Controller
                        name="amount"
                        control={control}
                        render={({field}) => 
                        <>
                            <InputCounter
                            label="Amount"
                            max = {9999}
                            min = {1}
                            onChange = {field.onChange}
                            value = {field.value}
                            />                                       
                        </>
                        }
                        /> 
                        </Col>
                      </Row>
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
                                placeholder="Enter full name recipient"
                                inputRef={register(`recipient.${index}.firstNameRecipient`)}
                                errorMessage={errors.recipient?.[index]?.firstNameRecipient?.message}
                                />
                            </Col>
                            <Col xs={6}>
                                <InputTextFieldBorder
                                label="Last name recipient"
                                placeholder="Enter email recipient"
                                inputRef={register(`recipient.${index}.lastNameRecipient`)}
                                errorMessage={errors.recipient?.[index]?.lastNameRecipient?.message}
                                />
                            </Col>
                          </Row>
                          <Row key={index}>
                            <Col xs={6}>
                                <InputTextFieldBorder
                                label="Email recipient"
                                placeholder="Enter full name recipient"
                                inputRef={register(`recipient.${index}.emailRecipient`)}
                                errorMessage={errors.recipient?.[index]?.emailRecipient?.message}
                                />
                            </Col>
                            <Col xs={6}>
                                <InputTextFieldBorder
                                label="Phone recipient"
                                placeholder="Enter email recipient"
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
