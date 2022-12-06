import React, {memo, useState} from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCaretDown ,faSearch, faPlus
, faCircleCheck, faCircleMinus, faHourglass,} from '@fortawesome/free-solid-svg-icons';
import {Row, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import PopupAddOrEditTour from "./PopupAddOrEditTour";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import PopupConfirmStop from "components/Popup/PopupDefault";
import {ETour} from "models/enterprise";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/enterprise/tour";
import SearchNotFound from "components/SearchNotFound";
import { ReducerType } from "redux/reducers";
import { getAllTours } from "redux/reducers/Enterprise/actionTypes";
import { fCurrency2VND } from "utils/formatNumber";
import PopupConfirmWarning from "components/Popup/PopupConfirmWarning";
import { getAllTours as getAllToursOfNormal} from "redux/reducers/Normal/actionTypes";

// eslint-disable-next-line react/display-name
const Tour = memo(()=> {
    const dispatch = useDispatch()
    const {allTours} = useSelector((state: ReducerType) => state.enterprise);
    const {user} = useSelector((state: ReducerType) => state.user);
    const [openPopupCreateTour, setOpenPopupCreateTour] = useState(false);
    const [tourEdit, setTourEdit] = useState<ETour>(null);
    const [tourAction, setTourAction] = useState<ETour>();
    const [tourDelete, setTourDelete] = useState<ETour>(null);
    const [tourStop, setTourStop] = useState<ETour>(null);
    const [openPopupConfirmStop, setOpenPopupConfirmStop] = useState(false);

    const onTogglePopupCreateTour = () => {
        setOpenPopupCreateTour(!openPopupCreateTour)
        setTourEdit(null)
    };

    const handleAction = (
        currentTarget: any,
        item: ETour
      ) => {
        setTourAction(item)
      };

    const onYesDelete = () => {
        if (!tourDelete) return
        onClosePopupConfirmDelete();
        dispatch(setLoading(true));
        TourService.delete(tourDelete?.id)
        .then(()=> {        
            dispatch(getAllTours(user?.id)) 
            dispatch(getAllToursOfNormal())
        })
        .catch(e => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)))
    }

    const onAction = (currentTarget: any, item: ETour) => {
        onTogglePopupCreateTour();
        setTourEdit(item);
      }

    const onShowConfirm = () => {
        if (!tourAction) return
        setTourDelete(tourAction)
    }

    const onClosePopupConfirmDelete = () => {
        if(!tourDelete) return
        setTourDelete(null);
    }

    const onToggleConfirmStop = () => {
        setOpenPopupConfirmStop(!openPopupConfirmStop);
    }
    const onTemporarilyStopWorking = (e, item) => {
        setTourStop(item);
        onToggleConfirmStop();
    }

    const onYesStopWorking = () => {
        if (!tourStop) return
        onToggleConfirmStop();
        dispatch(setLoading(true));
        TourService.temporarilyStopWorking(tourStop?.id)
        .then(()=> {        
            dispatch(getAllTours(user?.id)) 
            dispatch(getAllToursOfNormal())
        })
        .catch(e => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)))
    }
    const onWorkAgain = (e, item) => {
        dispatch(setLoading(true));
        TourService.workAgain(item.id)
        .then(()=> {        
            dispatch(getAllTours(user?.id)) 
            dispatch(getAllToursOfNormal())
        })
        .catch(e => dispatch(setErrorMess(e)))
        .finally(() => dispatch(setLoading(false)))
    }

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
                        <th className={classes.colActionStop}>
                            Action stop
                        </th>
                        <th className={classes.colAction}>
                           Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                {allTours?.map((item, index) => {
                    return (
                    <tr key={index}>
                    <th scope="row">
                        {item?.id}
                    </th>
                    <td>
                        {item?.title}
                    </td>
                    <td>
                        {fCurrency2VND(item?.price)} VND
                    </td>
                    <td>
                    {!item?.isTemporarilyStopWorking ?
                      <FontAwesomeIcon icon={faCircleCheck} className={classes.iconActiveTour}/>
                    : <FontAwesomeIcon icon={faCircleMinus} className={classes.iconStopTour}/>
                    }
                    </td>
                    <td className={classes.colActionStop}>
                    { !item?.isTemporarilyStopWorking ?
                    <Button
                    className="btn-icon"
                    btnType={BtnType.Secondary}
                    size="sm"
                    type="button"
                    onClick={(e) => onTemporarilyStopWorking(e, item)}
                    >
                    <FontAwesomeIcon icon={faHourglass}/>
                    </Button> :
                    <Button
                    className="btn-icon"
                    color="info"
                    size="sm"
                    type="button"
                    onClick={(e) => onWorkAgain(e, item)}
                    >
                    <FontAwesomeIcon icon={faHourglass}/>
                    </Button>}
                    </td>
                    <td className="text-center">
                    <UncontrolledDropdown>
                        <DropdownToggle
                        color="default"
                        data-toggle="dropdown"
                        href="#pablo"
                        id="navbarDropdownMenuLink1"
                        nav
                        onClick={(event) => {
                            handleAction(event, item);
                        }}
                        >
                        <FontAwesomeIcon icon={faCaretDown} className={classes.iconAction}/>
                        </DropdownToggle>
                        <DropdownMenu aria-labelledby="navbarDropdownMenuLink1" className={classes.dropdownMenu}>
                        <DropdownItem className={classes.dropdownItem} onClick={(e) => onAction(e, item)}>
                            <FontAwesomeIcon icon={faPen}/>
                            Edit
                        </DropdownItem>
                        <DropdownItem className={classes.dropdownItem} onClick={onShowConfirm}>
                            <FontAwesomeIcon icon={faTrash}/>
                            Delete
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    </td>
                    </tr>
                )})}
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
            isOpen={!!tourDelete}
            onClose={onClosePopupConfirmDelete}
            toggle={onClosePopupConfirmDelete}
            onYes={onYesDelete}
            />
            <PopupConfirmWarning
            title="Are you sure stop working ?"
            isOpen={openPopupConfirmStop}
            onClose={onToggleConfirmStop}
            toggle={onToggleConfirmStop}
            onYes={onYesStopWorking}
            />
       </div>
    </>
  );
})

export default Tour;
function setMessSuccess(arg0: string): any {
    throw new Error("Function not implemented.");
}

