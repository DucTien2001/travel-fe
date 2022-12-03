import React, {memo, useEffect, useMemo, useState} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";
import CardItemList from "components/CardItemList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
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
  onAmount: (amount: number) => void;
}

export interface BookForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  amount: number;
}
// eslint-disable-next-line react/display-name
const DetailCustomer = memo(({tour, onAmount}: Props)=> {
  const { user } = UseAuth();
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);

  const schema = useMemo(() => {
    return yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        email: yup.string().email("Please enter a valid email address").required("Email is required"),
        phoneNumber: yup.string()
        .required("Phone is required")
        .matches(VALIDATION.phone, { message: 'Please enter a valid phone number.', excludeEmptyString: true }),
        amount: yup.number().required("Amount is required"),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
    } = useForm<BookForm>({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: { 
        amount: 1,
      }
  });


  const _amount = watch("amount");

  useEffect(() => {
    onAmount(_amount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_amount])

  const _onSubmit = (data: BookForm) => {
      dispatch(setLoading(true));  
        if(user) {
          TourBillService.create({
            userId: user?.id,
            userMail: data?.email,
            tourId: tour?.id,
            amount: data.amount,
            price: tour?.price,
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
              className={classes.cardItem}
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
