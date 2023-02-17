import React, { useMemo, memo, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";
import { images } from "configs/images";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button, { BtnType } from "components/common/buttons/Button";
import Link from "next/link";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocation,
  faPhone,
  faEnvelopeOpenText,
  faEarthAmerica,
} from "@fortawesome/free-solid-svg-icons";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import Aos from "aos";
import "aos/dist/aos.css";
import clsx from "clsx";
export interface EmailForm {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

// eslint-disable-next-line react/display-name
const Contact = memo(() => {
  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);
  const schema = useMemo(() => {
    return yup.object().shape({
      firstName: yup.string().required("Fist name is required"),
      lastName: yup.string().required("Last name is required"),
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      message: yup.string().required("Message is required"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const clearForm = () => {
    reset({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
  };

  const _onSubmit = (data: EmailForm) => {
    console.log(data);
    clearForm();
  };

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Row>
            <Col md="5">
              <h2 className={clsx("title", classes.title)} data-aos="fade-up">
                Get in Touch
              </h2>
              <h4 className="description" data-aos="fade-up">
                You need more information? Check what other persons are saying
                about our product. They are very happy with their purchase.
              </h4>
              <div className="info info-horizontal" data-aos="fade-up">
                <img alt="anh" src={images.man.src} />
              </div>
            </Col>
            <Col className="ml-auto mr-auto" md="5">
              <Card className="card-contact card-raised" data-aos="zoom-in">
                <Form
                  id="contact-form1"
                  method="post"
                  role="form"
                  onSubmit={handleSubmit(_onSubmit)}
                >
                  <CardHeader className="text-center">
                    <CardTitle tag="h4">Contact Us</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="pr-2" md="6">
                        <InputTextFieldBorder
                          label="First name"
                          startIcon={
                            <i className="now-ui-icons users_circle-08"></i>
                          }
                          placeholder="First Name..."
                          aria-label="First Name..."
                          autoComplete="family-name"
                          type="text"
                          inputRef={register("firstName")}
                          errorMessage={errors.firstName?.message}
                        />
                      </Col>
                      <Col className="pl-2" md="6">
                        <InputTextFieldBorder
                          label="Last name"
                          startIcon={
                            <i className="now-ui-icons text_caps-small"></i>
                          }
                          placeholder="Last Name..."
                          aria-label="Last Name..."
                          autoComplete="family-name"
                          type="text"
                          inputRef={register("lastName")}
                          errorMessage={errors.lastName?.message}
                        />
                      </Col>
                    </Row>
                    <FormGroup>
                      <InputTextFieldBorder
                        label="Email address"
                        startIcon={
                          <i className="now-ui-icons ui-1_email-85"></i>
                        }
                        placeholder="Email Here..."
                        aria-label="Email Here..."
                        autoComplete="family-name"
                        type="text"
                        inputRef={register("email")}
                        errorMessage={errors.email?.message}
                      />
                    </FormGroup>
                    <FormGroup>
                      <InputTextArea
                        label="Your message"
                        placeholder="Message Here..."
                        autoComplete="family-name"
                        inputRef={register("message")}
                        errorMessage={errors.message?.message}
                      />
                    </FormGroup>
                    <Row>
                      <Col md="12">
                        <Button
                          className="btn-round pull-right"
                          btnType={BtnType.Primary}
                          type="submit"
                        >
                          Send Message
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Form>
              </Card>
              <Row>
                <ul className={classes.infoBodyListContact}>
                  <li className={classes.infoContact} data-aos="fade-left">
                    <FontAwesomeIcon icon={faMapLocation}></FontAwesomeIcon>
                    <p>4127 Raoul Wallenber 45b-c Gibraltar</p>
                  </li>
                  <li className={classes.infoContact} data-aos="fade-left">
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    <a
                      href="tel:+84 954 000 917"
                      className={classes.contactLinkInfo}
                    >
                      <p>84 954 000 917</p>
                    </a>
                  </li>
                  <li className={classes.infoContact} data-aos="fade-left">
                    <FontAwesomeIcon
                      icon={faEnvelopeOpenText}
                    ></FontAwesomeIcon>
                    <a
                      href="mailto:mail@mail.com"
                      className={classes.contactLinkInfo}
                    >
                      <p>travelix@gmail.com</p>
                    </a>
                  </li>
                  <li className={classes.infoContact} data-aos="fade-left">
                    <FontAwesomeIcon icon={faEarthAmerica}></FontAwesomeIcon>
                    <Link href="/" className={classes.contactLinkInfo}>
                      <p>www.colorlib.com</p>
                    </Link>
                  </li>
                </ul>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
});

export default Contact;
