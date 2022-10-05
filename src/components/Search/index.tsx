/*eslint-disable*/
import {useState, useEffect, memo} from "react";
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavItem,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChildren, faSearch, faPeopleGroup, faSignsPost, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import clsx from "clsx";
import Link from "next/link";
import dynamic from "next/dynamic";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import SignOutButton from "components/common/buttons/SignOutButton";
import InputTextField from "components/common/inputs/InputTextField";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import { DatePicker } from "react-rainbow-components";
import ReactDatetime from "react-datetime";

const Search = memo(() => {
    const [date, setDate] = useState(new Date());

    function onChange(date: Date) {
      setDate(date);
    }
  return (
    <>
        <div className={classes.root}>
            <Row className={classes.container} xs={4}>
                <Col>
                    <InputTextField
                    className={classes.inputSearch}
                    label = "Destination"
                    labelIcon={<FontAwesomeIcon icon={faSignsPost}/>}
                    placeholder="Destination"
                    />
                </Col>
                <Col>
                    <Row xs={2} className={classes.containerInputDate}>
                        <Col>
                            <InputDatePicker
                            className={classes.inputDate}
                            label="Departure"
                            labelIcon={<FontAwesomeIcon icon={faCalendarDays}/>}
                            name="departure"
                            timeFormat={false}
                            inputProps={{
                                placeholder: "dd/mm/yyyy",
                              }}
                            />
                        </Col>
                        <Col>
                        <InputDatePicker
                        className={classes.inputDate}
                        label="Return"
                        labelIcon={<FontAwesomeIcon icon={faCalendarDays}/>}
                        inputProps={{
                          placeholder: "dd/mm/yyyy",
                        }}
                        name="return"
                        timeFormat={false}
                        >
                        </InputDatePicker>
                        {/* <InputDatePicker
                        name="return"
                        /> */}
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row xs={2}>
                        <Col>
                            <InputTextField
                            className={classes.inputSearch}
                            label="Adult"
                            labelIcon={<FontAwesomeIcon icon={faPeopleGroup}/>}
                            placeholder="1"
                            />
                        </Col>
                        <Col>
                            <InputTextField
                            className={classes.inputSearch}
                            label="Children"
                            labelIcon={<FontAwesomeIcon icon={faChildren}/>}
                            placeholder="0"
                            />
                        </Col>
                    </Row>
                </Col>
                <Col className={classes.searchItemBtn}>
                    <Button btnType={BtnType.Primary} isDot={true}>
                        <FontAwesomeIcon icon={faSearch}/>
                        Search
                    </Button>
                </Col>
            </Row>
        </div>
    </>
  );
}) 

export default Search;
