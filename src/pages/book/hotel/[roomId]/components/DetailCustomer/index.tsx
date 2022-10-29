import React, {memo, useMemo, useState} from "react";
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


export interface BookForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  recipient? : {
    fullNameRecipient: string;
    emailRecipient: string;
  }[];
}
// eslint-disable-next-line react/display-name
const DetailCustomer = memo(()=> {
  const { t, i18n } = useTranslation();

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
          fullNameRecipient: yup.string().required("Full name recipient is required"),
          emailRecipient: yup.string().email("Please enter a valid email address").required("Email recipient is required"),
        })).required(),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language] );

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
      }
  });

  const { fields: fieldsRecipient, append: appendRecipient, remove: removeRecipient, move: moveRecipient } = useFieldArray({
    control,
    name: "recipient"
  });

  const onToggleRecipient = () => {
    if (deactivate) {
      removeRecipient()
    } else {
      appendRecipient({
        fullNameRecipient: "",
        emailRecipient: "",
    })
    }
    setDeactivate(!deactivate);
  }

  const clearForm = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      recipient: [],
    })
    setDeactivate(!deactivate);
  }

  const _onSubmit = (data: BookForm) => {
      console.log(data);
      clearForm();
      toggle();
  }
 

  const toggle = () => setModal(!modal);
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <Form onSubmit={handleSubmit(_onSubmit)}>
            <div className={classes.informationContainer}>
                <CardItemList className={classes.cardItem} linkView={""} linkBook={""} id={0} src={""} title={""} description={""} businessHours={""} location={""} contact={""} price={0} rate={0} creator={""}/>
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
                            <Row key={index}>
                            <div className={classes.noteTipRecipient}>
                                <FontAwesomeIcon icon={faCircleInfo}/>
                                <span>The recipient will receive the ticket information via email after completing the booking. Please fill in the information</span>
                            </div>
                            <Col xs={6}>
                                <InputTextFieldBorder
                                label="Full name recipient"
                                placeholder="Enter full name recipient"
                                inputRef={register(`recipient.${index}.fullNameRecipient`)}
                                errorMessage={errors.recipient?.[index]?.fullNameRecipient?.message}
                                />
                            </Col>
                            <Col xs={6}>
                                <InputTextFieldBorder
                                label="Email recipient"
                                placeholder="Enter email recipient"
                                inputRef={register(`recipient.${index}.emailRecipient`)}
                                errorMessage={errors.recipient?.[index]?.emailRecipient?.message}
                                />
                            </Col>
                          </Row>
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
