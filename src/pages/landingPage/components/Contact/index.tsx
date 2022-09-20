import React, { memo } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Label,
    FormGroup,
    Form,
    Input,
    InputGroupText,
    InputGroup,
    InputGroupAddon,
    Container,
    Row,
    Col,
  } from "reactstrap";
import {images} from "configs/images";
import * as yup from "yup";
import Button, {BtnType} from "components/common/buttons/Button";
import Link from "next/link";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocation, faPhone, faEnvelopeOpenText, faEarthAmerica } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/display-name
const Contact = memo(() => {
  const [first1Focus, setFirst1Focus] = React.useState(false);
  const [last1Focus, setLast1Focus] = React.useState(false);
  const [email1Focus, setEmail1Focus] = React.useState(false);

  return (
    <>
      <div
        className="contactus-1"
      >
        <Container>
          <Row>
            <Col md="5">
              <h2 className="title">Get in Touch</h2>
              <h4 className="description">
                You need more information? Check what other persons are saying
                about our product. They are very happy with their purchase.
              </h4>
              <div className="info info-horizontal">
              <img alt="anh" src={images.man.src}/>
            </div>
            </Col>
            <Col className="ml-auto mr-auto" md="5">
              <Card className="card-contact card-raised">
                <Form id="contact-form1" method="post" role="form">
                  <CardHeader className="text-center">
                    <CardTitle tag="h4">Contact Us</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col className="pr-2" md="6">
                        <label>First name</label>
                        <InputGroup
                          className={first1Focus ? "input-group-focus" : ""}
                        >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons users_circle-08"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                          <Input
                            aria-label="First Name..."
                            autoComplete="given-name"
                            placeholder="First Name..."
                            type="text"
                            onFocus={() => setFirst1Focus(true)}
                            onBlur={() => setFirst1Focus(false)}
                          ></Input>
                        </InputGroup>
                      </Col>
                      <Col className="pl-2" md="6">
                        <FormGroup>
                          <label>Last name</label>
                          <InputGroup
                            className={last1Focus ? "input-group-focus" : ""}
                          >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="now-ui-icons text_caps-small"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              aria-label="Last Name..."
                              autoComplete="family-name"
                              placeholder="Last Name..."
                              type="text"
                              onFocus={() => setLast1Focus(true)}
                              onBlur={() => setLast1Focus(false)}
                            ></Input>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <label>Email address</label>
                      <InputGroup
                        className={email1Focus ? "input-group-focus" : ""}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="now-ui-icons ui-1_email-85"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          autoComplete="email"
                          placeholder="Email Here..."
                          type="email"
                          onFocus={() => setEmail1Focus(true)}
                          onBlur={() => setEmail1Focus(false)}
                        ></Input>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <label>Your message</label>
                      <Input
                        id="message"
                        name="message"
                        rows="6"
                        type="textarea"
                      ></Input>
                    </FormGroup>
                    <Row>
                      <Col md="6">
                        <FormGroup check>
                          <Label check>
                            <Input type="checkbox"></Input>
                            <span className="form-check-sign"></span>
                            I&apos;m not a robot
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col md="6">
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
                    <li className={classes.infoContact}>      
                        <FontAwesomeIcon icon={faMapLocation}></FontAwesomeIcon>   
                        <p>4127 Raoul Wallenber 45b-c Gibraltar</p>
                    </li>
                    <li className={classes.infoContact}>
                         <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                         <a href="tel:+84 954 000 917" className={classes.contactLinkInfo}><p>84 954 000 917</p></a>
                    </li>
                    <li className={classes.infoContact}>
                        <FontAwesomeIcon icon={faEnvelopeOpenText}></FontAwesomeIcon>
                        <a href="mailto:mail@mail.com" className={classes.contactLinkInfo}><p>travelix@gmail.com</p></a>
                    </li>
                    <li className={classes.infoContact}>
                        <FontAwesomeIcon icon={faEarthAmerica}></FontAwesomeIcon>
                        <Link href="/"className={classes.contactLinkInfo}><p>www.colorlib.com</p></Link>
                    </li>
                </ul>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}) 

export default Contact;
  