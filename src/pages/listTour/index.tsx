import React, {useEffect, useState, useMemo} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faList, faXmark, faSearch,} from '@fortawesome/free-solid-svg-icons';
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
import Pagination from "components/Pagination";
import Aos from 'aos'
import 'aos/dist/aos.css';
import InputCheckbox from 'components/common/inputs/InputCheckbox';
import InputTextField from 'components/common/inputs/InputTextField';
import Button, {BtnType} from "components/common/buttons/Button";
import SectionHeader from "components/Header/SectionHeader";
import CardItemGrid from "components/CardItemGrid";
import CardItemList from "components/CardItemList";
import BoxSmallLeft from "components/BoxSmallLeft";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import PaginationComponent from "react-reactstrap-pagination";
interface SearchData {
    tourName?:string;
    checkOptions?:boolean;
}

const ListTours : NextPage = () => {
    useEffect(()=>{
        Aos.init({duration:500});
    },[]);

    const listTour = [
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: false,
        },        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: false,
        },        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: false,
        },        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
        },        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: false,
        },        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
        },        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },       
         {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },
        {
            image: images.bgUser.src,
            star: 4,
            title: "Nha trang",
            description: "6 months access to the library",
            businessHours: "7AM - 10PM",
            location: "Khanh Hoa",
            contact: "09324343",
            price: 70,
            discount: 2,
            tags: "Sea",
            rate: 4,
            creator: "VietNam",
            isTemporarilyStopWorking: true,
        },

    ]

    const { t, i18n } = useTranslation();

    const [changeViewLayout, setChangeViewLayout] = useState(false);

    const schema = useMemo(() => {
        return yup.object().shape({
            tourName: yup.string().notRequired(),
            checkOptions: yup.boolean().notRequired(),
          });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [i18n.language] );
      
      const {
          register,
          handleSubmit,
          reset,
          } = useForm<SearchData>({
            resolver: yupResolver(schema),
            mode: "onChange",
      });
    
    const clearForm = () => {
        reset({
            tourName: "",
            checkOptions: false,
        })
    }

    const onClearOption = () => {
        clearForm();
    }
    const onChangeViewLayout = () => {
        setChangeViewLayout(!changeViewLayout);
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(9);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = listTour.slice(indexOfFirstPost, indexOfLastPost); 

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
        <SectionHeader
        title="MULTI-TOURS"
        src={images.imagesListTour.src}  
        className={classes.imgHeader}
        />
        <Row className={classes.containerBody}>
            <Container>
                <Row className={classes.titleBody}>
                    <div>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    <Col xs={2} className={clsx("mb-3",classes.colBtnLayout)}>
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
                    <Col xs={8} className={classes.rowResult}> 
                        <h5>RESULTS-FOUND: <span>32</span></h5>                              
                    </Col>
                </Row>
                <Row className={classes.rowResultBody}>
                    <Col xs={2} className={classes.btnResetWrapper}>
                        <Button btnType={BtnType.Outlined} 
                        className={classes.btnResetOption}
                        onClick={onClearOption}> 
                            <FontAwesomeIcon icon={faXmark}/> reset option
                        </Button>
                        <BoxSmallLeft
                        title="Search tours"
                        >
                        <InputTextField
                        className={classes.inputSearch}
                        placeholder="Tour name"
                        name="Tour name"
                        startIcon={<FontAwesomeIcon icon={faSearch}/>}
                        inputRef={register("tourName")}
                        />
                        <Button btnType={BtnType.Primary} className={classes.btnSearch}>Search</Button>
                        </BoxSmallLeft>
                        <BoxSmallLeft
                        title="Options"
                        >
                            <InputCheckbox
                            content="Sea"
                            inputRef={register("checkOptions")}
                            />
                            <InputCheckbox
                            content="Shopping"
                            inputRef={register("checkOptions")}
                            />
                            <InputCheckbox
                            content="3 stars"
                            inputRef={register("checkOptions")}
                            />
                            <InputCheckbox
                            content="4 stars"
                            inputRef={register("checkOptions")}
                            />
                            <InputCheckbox
                            content="5 stars"
                            inputRef={register("checkOptions")}
                            />
                            <InputCheckbox
                            content="Discount"
                            inputRef={register("checkOptions")}
                            />
                        </BoxSmallLeft>
                    </Col>
                    <Col xs={10} className={classes.listTours}>
                        {/* ==================== Grid view ===================== */}                            
                        {!changeViewLayout && (<Row  className={classes.rowGridView}>
                            {listTour.map((tour, index)=> ( 
                            <CardItemGrid
                            linkView="listTour"
                            linkBook="book/tour"
                            key={index}
                            id = {index}
                            src = {tour.image}
                            title = {tour.title}
                            description = {tour.description}
                            businessHours = {tour.businessHours}
                            location ={tour.location}
                            contact={tour.contact}
                            price ={tour.price}
                            discount = {tour.discount}
                            tags={tour.tags}
                            rate={tour.rate}
                            creator={tour.creator}
                            isTemporarilyStopWorking={tour.isTemporarilyStopWorking}
                            />
                            ))}
                        </Row>)} 
                        {/* ==================== List view ===================== */}
                        {changeViewLayout && (<div>
                        {listTour.map((tour, index)=> (                         
                            <CardItemList
                            linkView="listTour"
                            linkBook="book/tour"
                            key={index}
                            id = {index}
                            src = {tour.image}
                            title = {tour.title}
                            description = {tour.description}
                            businessHours = {tour.businessHours}
                            location ={tour.location}
                            contact={tour.contact}
                            price ={tour.price}
                            discount = {tour.discount}
                            tags={tour.tags}
                            rate={tour.rate}
                            creator={tour.creator}
                            isTemporarilyStopWorking={tour.isTemporarilyStopWorking}
                            />
                        ))} 
                        </div>)}
                        <Row className={classes.pigination}>
                        <Pagination 
                            postPerPage={postsPerPage}
                            totalPosts={listTour.length}
                            paginate={paginate}
                            />
                        </Row>
                    </Col>
                </Row>
            </Container>    
        </Row>
        <Social/>
    </>
  );
}

export default ListTours;
