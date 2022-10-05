import React, {useEffect, useState} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,

} from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faList, faXmark, faStar,} from '@fortawesome/free-solid-svg-icons';
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Pagination from "components/Pagination";
import Aos from 'aos'
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import Search from "components/Search";
import SectionHeader from "components/Header/SectionHeader";
import CardItemGrid from "components/CardItemGrid";
import CardItemList from "components/CardItemList";
const Profile : NextPage = () => {
    useEffect(()=>{
        Aos.init({duration:500});
    },[]);

    const listTour = [
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        
        },
        {
            image: images.bgUser.src,
            star: 5,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        
        },
        {
            image: images.bgUser.src,
            star: 5,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        
        },
        {
            image: images.bgUser.src,
            star: 5,
            title: "Nha trang",
            subtitle: "6 months access to the library",
            subtitle2: "6 months access to the library", 
        
        },
    ]

    const [viewResult, setViewResult] = useState("1");

    const [changeViewLayout, setChangeViewLayout] = useState(false);

    const onChangeViewResult = (e: any) => {
        setViewResult(e.currentTarget.textContent);
    }

    const onChangeViewLayout = () => {
        setChangeViewLayout(!changeViewLayout);
    }

  return (
    <>
        <SectionHeader
        title="MULTI-TOURS"
        src={images.imagesListTour.src}  
        className={classes.imgHeader}
        />
        <Search/>
        <Row className={classes.containerBody}>
            <Container>
                <Row className={classes.titleBody}>
                    <div>
                        <img alt="anh" src={images.iconSearch.src}></img>                
                    </div>
                    <h1>BROWSE OUR MULTI-COUNTRY TOURS</h1>
                    <div className={classes.divider}></div>
                    <p data-aos="fade-up">Choose from our portfolio of unforgettable multi-country tours of Asia and embark on the journey of a lifetime. 
                        Each private tour is tailor-made to show the very best that Asia has to offer.
                    </p>
                </Row>
                {/* ======================= RESULT DESKTOP ===================== */}
                <Row className={classes.resultDesktop}>
                    <Col xs={2} className={classes.colBtnLayout}>
                        <Button className = {clsx(!changeViewLayout ? "active" : null, classes.layoutBtn)} btnType = {BtnType.Outlined} onClick={onChangeViewLayout}>
                            <FontAwesomeIcon icon={faGrip}/>
                            GRID VIEW
                        </Button>
                    </Col>
                    <Col xs={2} className={classes.colBtnLayout}>
                        <Button className = {clsx(changeViewLayout ? "active" : null, classes.layoutBtn)} btnType = {BtnType.Outlined} onClick={onChangeViewLayout}>
                            <FontAwesomeIcon icon={faList}/>
                            LIST VIEW
                        </Button>
                    </Col>
                    <Col xs={8}> 
                        <Row xs={2}  className={classes.rowResult}>
                            <Col className={classes.resultFound}>
                                <h5>RESULTS-FOUND: <span>32</span></h5>                              
                            </Col>
                            <Col className={classes.resultContainer}>
                                <h5>VIEW: </h5>
                                <UncontrolledDropdown className={classes.dropDownResult}>
                                    <DropdownToggle
                                    caret
                                    onClick={(e) => e.preventDefault()}
                                    className={classes.viewResult}
                                    >
                                        <span>{viewResult}</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                    <DropdownItem className={classes.dropdownItem} onClick={onChangeViewResult}>
                                        <h5>9</h5>
                                    </DropdownItem>
                                    <DropdownItem className={classes.dropdownItem} onClick={onChangeViewResult}>
                                        <h5>10</h5>
                                    </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <h5>PER PAGE</h5> 
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {/* ======================= RESULT MOBILE ===================== */}
                <Row className={classes.resultMobile}> 
                <div className={classes.btnLayoutWrapper}>
                            <Button className = {clsx(changeViewLayout ? "active" : null, classes.layoutBtn)} btnType = {BtnType.Outlined} onClick={onChangeViewLayout}>
                                <FontAwesomeIcon icon={faGrip}/>
                                GRID VIEW
                            </Button>
                            <Button className = {clsx(!changeViewLayout ? "active" : null, classes.layoutBtn)} btnType = {BtnType.Outlined} onClick={onChangeViewLayout}>
                                <FontAwesomeIcon icon={faList}/>
                                LIST VIEW
                            </Button>
                        </div>
                    <Col className={classes.colResultMobile}>
                        <div className={classes.resultFindMobile}>
                            <h5>RESULTS-FOUND: <span>32</span></h5> 
                        </div>
                        <div className={classes.viewResultPageMobile}>
                            <h5>VIEW: </h5>
                                <UncontrolledDropdown className={classes.dropDownResult}>
                                    <DropdownToggle
                                    caret
                                    onClick={(e) => e.preventDefault()}
                                    className={classes.viewResult}
                                    >
                                        <span>{viewResult}</span>
                                    </DropdownToggle>
                                    <DropdownMenu>
                                    <DropdownItem className={classes.dropdownItem} onClick={onChangeViewResult}>
                                        <h5>9</h5>
                                    </DropdownItem>
                                    <DropdownItem className={classes.dropdownItem} onClick={onChangeViewResult}>
                                        <h5>10</h5>
                                    </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            <h5>PER PAGE</h5> 
                        </div>
                    </Col>
                </Row>
                <Row className={classes.rowResultBody}>
                    <Col xs={2} className={classes.btnResetWrapper}>
                        <Button btnType={BtnType.Outlined} className={classes.btnResetOption}> <FontAwesomeIcon icon={faXmark}/> reset option</Button>
                    </Col>
                    <Col xs={10} className={classes.listTours}>
                        {/* ==================== Grid view ===================== */}                            
                        {!changeViewLayout && (<Row  className={classes.rowGridView}>
                            {listTour.map((tour, index)=> ( 
                            <CardItemGrid
                            key={index}
                            id = {index}
                            src = {tour.image}
                            title = {tour.title}
                            numberStar = {tour.star}
                            subTitle1 = {tour.subtitle}
                            subTitle2 = {tour.subtitle2}
                            />
                            ))}
                        </Row>)} 
                        {/* ==================== List view ===================== */}
                        {changeViewLayout && (<div>
                        {listTour.map((tour, index)=> (                         
                            <CardItemList
                            key={index}
                            id = {index}
                            src = {tour.image}
                            title = {tour.title}
                            numberStar = {tour.star}
                            subTitle1 = {tour.subtitle}
                            subTitle2 = {tour.subtitle2}
                            />
                        ))} 
                        </div>)}
                        <Row className={classes.pigination}>
                            <Pagination/>
                        </Row>
                    </Col>
                </Row>
            </Container>    
        </Row>
        <Social/>
    </>
  );
}

export default Profile;
