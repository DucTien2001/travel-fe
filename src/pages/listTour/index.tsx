import React, {useEffect, useState, useMemo} from "react";
import Link  from "next/link";
// reactstrap components
import {
  Container,
  Row,
  Col,
  PaginationLink,
  PaginationItem,
  Pagination,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip, faList, faXmark, faSearch, faChevronLeft, faChevronRight,} from '@fortawesome/free-solid-svg-icons';
import { NextPage } from "next";
import { images } from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import Social from "components/Social";
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
import PaginationComponent from "react-reactstrap-pagination";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { useRouter } from 'next/router'
import { CommentService } from "services/normal/comment";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
interface SearchData {
    tourName?:string;
    checkOptions?:boolean;
}

const ListTours : NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { query, pathname } = router;

    const {allTours} = useSelector((state: ReducerType) => state.normal);
    const [changeViewLayout, setChangeViewLayout] = useState(false);  
    const [listComment, setListComment] = useState([]);

    const schema = useMemo(() => {
        return yup.object().shape({
            tourName: yup.string().notRequired(),
            checkOptions: yup.boolean().notRequired(),
          });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [] );
      
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
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');

    const handlePagination = (pageIndex) => {
        if(pathname !== "/") return;
        let p = pageIndex >= 1 ? pageIndex : 1;
        router.replace(`?page=${p}&limit=${limit}`)
    }

    const handlePerPage = (limitNumber) => {
        if(pathname !== "/") return;
        router.replace(`?page=${1}&limit=${limitNumber}`)
    }

    
    const handleSearch = (e) => {
        e.preventDefault();
        if(pathname !== "/") return;
        router.replace(`?search=${search}`)
        setSearch("");
    }


    useEffect(() => {
        if(query.page) {
            let p = Number(query.page) >= 1 ? query.page : 1;
            setPage(Number(p))
        }
        console.log(query)
        if(query.limit) {
            let l = Number(query.limit) >= 1 ? query.page : 9;
            setLimit(Number(l))
        }
    }, [query.page, query.limit])

    useEffect(()=>{
        Aos.init({duration:500});
    },[]);


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
                        {/* <UncontrolledDropdown className={classes.perPageContainer}>
                            <DropdownToggle
                            caret
                            color="default"
                            data-toggle="dropdown"
                            href="#pablo"
                            id="navbarDropdownMenuLink1"
                            nav
                            onClick={(e) => e.preventDefault()}
                            >
                            <p>Services</p>
                            </DropdownToggle>
                            <DropdownMenu aria-labelledby="navbarDropdownMenuLink1">
                            <DropdownItem className={classes.dropdownItem}>
                                9
                            </DropdownItem>
                            <DropdownItem className={classes.dropdownItem}>
                                12
                            </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown> */}
                        <select className={classes.selectPerPage} value={limit}
                            onChange={e => handlePerPage(e.target.value)}
                            >
                            <option value="9" className={classes.option}>9</option>
                            <option value="12" className={classes.option}>12</option>
                        </select>
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
                        value={search}
                        onChange={e => setSearch(e.target.value)}
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
                            {allTours?.map((tour, index)=> ( 
                                <CardItemGrid
                                linkView="listTour"
                                linkBook="book/tour"
                                key={index}
                                id = {tour.id}
                                src = {tour.images[0]}
                                title = {tour.title}
                                description = {tour.description}
                                businessHours = {tour.businessHours}
                                location ={tour.location}
                                contact={tour.contact}
                                price ={tour.price}
                                discount = {tour.discount}
                                tags={tour.tags}
                                // rate={tour.rate}
                                creator={tour.creator}
                                isTemporarilyStopWorking={tour.isTemporarilyStopWorking}
                                className={tour.isTemporarilyStopWorking ? classes.stopWorking : ""}
                                />
                            ))}
                        </Row>)} 
                        {/* ==================== List view ===================== */}
                        {changeViewLayout && (<div>
                        {allTours?.map((tour, index)=> (                         
                            <CardItemList
                            linkView="listTour"
                            linkBook="book/tour"
                            key={index}
                            id = {index}
                            src = {tour.images[0]}
                            title = {tour.title}
                            description = {tour.description}
                            businessHours = {tour.businessHours}
                            location ={tour.location}
                            contact={tour.contact}
                            price ={tour.price}
                            discount = {tour.discount}
                            tags={tour.tags}
                            // rate={tour.rate}
                            creator={tour.creator}
                            isTemporarilyStopWorking={tour.isTemporarilyStopWorking}
                            className={tour.isTemporarilyStopWorking ? classes.stopWorking : ""}
                            />
                        ))} 
                        </div>)}
                        <Row className={classes.pigination}>
                        <Pagination>
                            <PaginationItem onClick={() => handlePagination(page - 1)}>
                                <PaginationLink                          
                                >
                                    <span aria-hidden={true}>
                                    <FontAwesomeIcon icon={faChevronLeft}/>
                                    </span>
                                </PaginationLink>
                            </PaginationItem>
                                <PaginationItem >
                                    <PaginationLink
                                    href="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                    >
                                    {page}
                                </PaginationLink>
                                </PaginationItem>
                            <PaginationItem  onClick={() => handlePagination(page + 1)}>
                                <PaginationLink                        
                                >
                                    <span aria-hidden={true}>
                                        <FontAwesomeIcon icon={faChevronRight}/>
                                    </span>
                                </PaginationLink>
                            </PaginationItem>
                        </Pagination>    
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
