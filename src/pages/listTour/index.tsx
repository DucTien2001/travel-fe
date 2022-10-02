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
import { faGrip, faList, faPlaneDeparture, faPeopleGroup, faCalendarDays, faMagnifyingGlass,
faSort, faXmark, faStar,
} from '@fortawesome/free-solid-svg-icons';
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import InputTextField from "components/common/inputs/InputTextField";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import Aos from 'aos'
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import Search from "components/Search";
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

    const onChangeView = (e: any) => {
        setViewResult(e.currentTarget.textContent);
    }

  return (
    <>
        <div className="cd-section" id="headers">
            <div className="header-2">
                <div className={clsx("page-header header-filter", classes.pageHeader)}>
                    <div
                    className={clsx("page-header-image", classes.pageHeaderImg)}
                    >
                    </div>
                    <Container>
                        <Row>
                            <Col className="ml-auto mr-auto text-center" md="8">
                                <h1 className={clsx("title", classes.titleHome)}>MULTI-TOURS</h1>
                            </Col>  
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
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
                <Row>
                    <Col xs={2}>
                        <Button className = {classes.layoutBtn} btnType = {BtnType.Outlined} active>
                            <FontAwesomeIcon icon={faGrip}/>
                            GRID VIEW
                        </Button>
                    </Col>
                    <Col xs={2}>
                        <Button className = {classes.layoutBtn} btnType = {BtnType.Outlined}>
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
                                    <DropdownItem className={classes.dropdownItem} onClick={onChangeView}>
                                        <h5>9</h5>
                                    </DropdownItem>
                                    <DropdownItem className={classes.dropdownItem} onClick={onChangeView}>
                                        <h5>10</h5>
                                    </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <h5>PER PAGE</h5> 
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className={classes.rowResultBody}>
                    <Col xs={2}>
                        <Button btnType={BtnType.Outlined} className={classes.btnResetOption}> <FontAwesomeIcon icon={faXmark}/> reset option</Button>
                    </Col>
                    <Col xs={10} className={classes.listTours}>
                        {/* ==================== Grid view ===================== */}                            
                        <Row  className={classes.rowGridView}>
                            {listTour.map((tour, index)=> ( 
                            <Col xs={4} key={index}>
                                <Link href="/[id]tourDetail">
                                    <Card className={clsx("card-pricing card-background", classes.cardImage)
                                    }
                                    style={{backgroundImage: `url(${tour.image})`,}}
                                    >
                                        <CardBody>
                                            <h5 className="category">{tour.title}</h5>
                                            <div className={classes.offerContentLike}>
                                            {[...Array(tour.star)].map((star, index) => {
                                                return (
                                                <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                                                )
                                            })}
                                            </div>
                                            <CardTitle tag="h3">$67</CardTitle>
                                            <ul>
                                                <li>{tour.subtitle}</li>
                                                <li>{tour.subtitle2}</li>
                                            </ul>
                                            <div className={classes.btnControlCard}>
                                                <Button
                                                className="btn-round"
                                                btnType={BtnType.Primary}
                                                >
                                                View more
                                                </Button>
                                                <Link href="/[id]book">
                                                    <Button
                                                    className="btn-round"
                                                    btnType={BtnType.Secondary}
                                                    >
                                                    Book now
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Link>
                            </Col>
                            // <Col>
                            //     <Link href="/[id]tourDetail">
                            //         <Card className={clsx("card-pricing card-background", classes.cardImage)
                            //         }
                            //         style={{backgroundImage: `url(${tour.image})`,}}
                            //         >
                            //             <CardBody>
                            //                 <h5 className="category">{tour.title}</h5>
                            //                 <div className={classes.offerContentLike}>
                            //                 {[...Array(tour.star)].map((star, index) => {
                            //                     return (
                            //                     <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                            //                     )
                            //                 })}
                            //                 </div>
                            //                 <CardTitle tag="h3">$67</CardTitle>
                            //                 <ul>
                            //                     <li>{tour.subtitle}</li>
                            //                     <li>{tour.subtitle2}</li>
                            //                 </ul>
                            //                 <div className={classes.btnControlCard}>
                            //                     <Button
                            //                     className="btn-round"
                            //                     btnType={BtnType.Primary}
                            //                     >
                            //                     View more
                            //                     </Button>
                            //                 <Link href="/[id]book">
                            //                     <Button
                            //                     className="btn-round"
                            //                     btnType={BtnType.Secondary}
                            //                     >
                            //                     Book now
                            //                     </Button>
                            //                 </Link>
                            //                 </div>
                            //             </CardBody>
                            //         </Card>
                            //     </Link>
                            // </Col>
                            // <Col>
                            //      <Link href="/[id]tourDetail">
                            //         <Card className={clsx("card-pricing card-background", classes.cardImage)
                            //         }
                            //         style={{backgroundImage: `url(${tour.image})`,}}
                            //         >
                            //             <CardBody>
                            //                 <h5 className="category">{tour.title}</h5>
                            //                 <div className={classes.offerContentLike}>
                            //                 {[...Array(tour.star)].map((star, index) => {
                            //                     return (
                            //                     <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                            //                     )
                            //                 })}
                            //                 </div>
                            //                 <CardTitle tag="h3">$67</CardTitle>
                            //                 <ul>
                            //                     <li>{tour.subtitle}</li>
                            //                     <li>{tour.subtitle2}</li>
                            //                 </ul>
                            //                 <div className={classes.btnControlCard}>
                            //                     <Button
                            //                     className="btn-round"
                            //                     btnType={BtnType.Primary}
                            //                     >
                            //                     View more
                            //                     </Button>
                            //                 <Link href="/[id]book">
                            //                     <Button
                            //                     className="btn-round"
                            //                     btnType={BtnType.Secondary}
                            //                     >
                            //                     Book now
                            //                     </Button>
                            //                 </Link>
                            //                 </div>
                            //             </CardBody>
                            //         </Card>
                            //     </Link>
                            // </Col>
                            ))}
                        </Row>
                        {/* ==================== List view ===================== */}
                        {listTour.map((tour, index)=> (                         
                        <Row xs={4} className={classes.rowTour} key={index}>
                            <Col className={classes.imgTour}>
                            <Link href="/[id]tourDetail">
                                <img alt="anh" src={tour.image}></img>
                            </Link>
                            </Col>
                            <Col className={classes.titleWrapper}>
                                 <h5>{tour.title}</h5>  
                                 <div className={classes.offerContentLike}>
                                    {[...Array(tour.star)].map((star, index) => {
                                        return (
                                        <FontAwesomeIcon icon={faStar} key={index}></FontAwesomeIcon>
                                        )
                                    })}
                                </div>
                            </Col>
                            <Col>
                                 <ul>
                                    <li>{tour.subtitle}</li>
                                    <li>{tour.subtitle2}</li>
                                </ul>          
                            </Col>
                            <Col className={classes.btnControlCardList}>
                                <div >
                                    <Button
                                     className="btn-round"
                                    btnType={BtnType.Primary}
                                    >
                                    View more
                                    </Button>
                                    <Link href="/[id]book">
                                        <Button
                                         className="btn-round"
                                        btnType={BtnType.Secondary}
                                        >
                                        Book now
                                        </Button>
                                    </Link>
                                </div>          
                            </Col>
                        </Row>))} 
                    </Col>
                </Row>
            </Container>
        </Row>
    </>
  );
}

export default Profile;
