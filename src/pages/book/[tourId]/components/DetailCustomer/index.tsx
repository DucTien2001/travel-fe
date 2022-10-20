import React, {memo} from "react";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Box from "components/BoxSmallLeft";
import CardItemList from "components/CardItemList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import {Row, Col} from "reactstrap";
import Button, {BtnType} from "components/common/buttons/Button";
// eslint-disable-next-line react/display-name
const DetailCustomer = memo(()=> {
  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
            <div className={classes.informationContainer}>
                <CardItemList className={classes.cardItem} linkView={""} linkBook={""} id={0} src={""} title={""} description={""} businessHours={""} location={""} contact={""} price={0} rate={0} creator={""}/>
                <Box title="Your information">
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
                                />
                            </Col>
                            <Col xs={6}>
                                <InputTextFieldBorder
                                label="Last Name"
                                placeholder="Enter your last name"
                                />
                            </Col>
                      </Row>
                      <InputTextFieldBorder
                      label="Email"
                      placeholder="Enter your email"
                      />
                      <InputTextFieldBorder
                      label="Phone"
                      placeholder="Enter your phone"
                      />
                      <Row className={classes.boxCheckbox}>
                        <InputCheckbox
                        content="For you"
                        className="mr-4"
                        />
                        <InputCheckbox
                        content="Book for friends"
                        />
                      </Row>
                        <Button className={classes.btnBook} btnType={BtnType.Primary} isDot={true}>Book</Button>
                  </div>
                </Box>
            </div>
      </div>
    </>
  );
})

export default DetailCustomer;
