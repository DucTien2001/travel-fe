import React, {memo, useEffect, useMemo, useState} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCaretDown ,faSearch, faPlus
, faCircleCheck} from '@fortawesome/free-solid-svg-icons';
import {Row, Col, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import Button, {BtnType} from "components/common/buttons/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommentForm } from "components/Popup/PopupAddComment";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Link  from "next/link";
import PopupAddOrEditTour from "./PopupAddOrEditTour";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import {ETour} from "models/enterprise";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/enterprise/tour";
import useAuth from "hooks/useAuth";
import SearchNotFound from "components/SearchNotFound";
import { ReducerType } from "redux/reducers";

// eslint-disable-next-line react/display-name
const Tour = memo(()=> {
    const dispatch = useDispatch()
    const {allTours} = useSelector((state: ReducerType) => state.enterprise);
    // console.log(allTours)
    const { id } = useParams<{ id: string }>();
    const [openPopupCreateTour, setOpenPopupCreateTour] = useState(false);
    const [openPopupConfirmDelete, setOpenPopupConfirmDelete] = useState(false);
    const [listTour, setListTour] = useState<ETour[]>(null);
    const [tourEdit, setTourEdit] = useState<ETour>(null);
    const [tourAction, setTourAction] = useState<ETour>(null);
    const onTogglePopupCreateTour = () => setOpenPopupCreateTour(!openPopupCreateTour);
    const onTogglePopupConfirmDelete = () => setOpenPopupConfirmDelete(!openPopupConfirmDelete);

    const onYesDelete = () => {

    }
    // const onAddOrEditTour = (data: TourForm) => {
    //     dispatch(setLoading(true));
    //     EnterpriseService.createTour({
    //       title: data.name,
    //       description: data.description,
    //       businessHours: data.businessHours,
    //       location: data.location,
    //       price: data.price,
    //       discount: data.discount,
    //       tags: data.tags,
    //       images: data.images,
    //       creator: user.id,
    //     })
    //       .then(() => {
    //         dispatch(setSuccessMess("Create tour successfully"))
    //       })
    //       .catch(e => {
    //         dispatch(setErrorMess(e))
    //       })
    //       .finally(() => {
    //         dispatch(setLoading(false));
    //       });
    // }

    const onAction = (currentTarget: any, item: ETour) => {
        onTogglePopupCreateTour();
        setTourEdit(item);
        // setTourEdit(tourAction)
      }

    // useEffect(() => {
    //     if(user) {
    //         dispatch(setLoading(true));
    //         TourService.getTours(user?.id)
    //         .then((res) => {
    //             setListTour(res.data);
    //         })
    //         .catch((e) => dispatch(setErrorMess(e)))
    //         .finally(() => dispatch(setLoading(false))); 
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[dispatch])

   return (
    <>
       <div className={classes.root}>
            <Row className={clsx(classes.rowHeaderBox, classes.title)}>
                 <h3>Tours</h3>
            </Row>
            <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
                <div className={classes.boxInputSearch}>
                    <InputTextFieldBorder
                    placeholder="Search tours"
                    startIcon={<FontAwesomeIcon icon={faSearch}/>}
                    className={classes.inputSearch}
                    />
                </div>
                    <Button btnType={BtnType.Primary} onClick={onTogglePopupCreateTour}><FontAwesomeIcon icon={faPlus}/>Create</Button>
            </Row>
            <Table
              className={classes.table}
              responsive
            >
                <thead>
                    <tr>
                        <th scope="row" >
                            Id
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            State
                        </th>
                        <th className={classes.colAction}>
                           Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                {allTours?.map((item, index) => (
                    <tr key={index}>
                    <th scope="row">
                        {item?.id}
                    </th>
                    <td>
                        {item?.title}
                    </td>
                    <td>
                        {item?.price}
                    </td>
                    <td>
                        {item?.isTemporarilyStopWorking}
                    </td>
                    <td className="text-center">
                    <UncontrolledDropdown>
                        <DropdownToggle
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="navbarDropdownMenuLink1"
                        nav
                        onClick={(e) => e.preventDefault()}
                        >
                        <FontAwesomeIcon icon={faCaretDown} className={classes.iconAction}/>
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="navbarDropdownMenuLink1" className={classes.dropdownMenu}>
                        <DropdownItem className={classes.dropdownItem}>
                            <FontAwesomeIcon icon={faPen}/>
                            Edit
                        </DropdownItem>
                        <DropdownItem className={classes.dropdownItem} onClick={onTogglePopupConfirmDelete}>
                            <FontAwesomeIcon icon={faTrash}/>
                            Delete
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </td>
                    </tr>
                ))}
                {!allTours?.length && 
                    <tr>
                        <td scope="row" colSpan={5}> 
                        <SearchNotFound/>
                        </td>                 
                    </tr>
                }
                </tbody>
            </Table> 
            <PopupAddOrEditTour
            isOpen={openPopupCreateTour}
            onClose={onTogglePopupCreateTour}
            toggle={onTogglePopupCreateTour}
            itemEdit={tourEdit}
            />
            <PopupConfirmDelete
            title="Are you sure delete this tour ?"
            isOpen={openPopupConfirmDelete}
            onClose={onTogglePopupConfirmDelete}
            toggle={onTogglePopupConfirmDelete}
            onYes={onYesDelete}
            />
       </div>
    </>
  );
})

export default Tour;
