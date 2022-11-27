import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCaretDown, faSearch, faPlus, faCircleCheck, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { Row, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import { ETour } from "models/enterprise";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/enterprise/tour";
import SearchNotFound from "components/SearchNotFound";
import { ReducerType } from "redux/reducers";
import { getAllTours } from "redux/reducers/Enterprise/actionTypes";
import { fCurrency2 } from "utils/formatNumber";
import { TourBillService } from "services/enterprise/tourBill";

// eslint-disable-next-line react/display-name
const ToursRevenue = memo(() => {
  const dispatch = useDispatch();
  const { allTours } = useSelector((state: ReducerType) => state.enterprise);
  const { user } = useSelector((state: ReducerType) => state.user);
  const [openPopupCreateTour, setOpenPopupCreateTour] = useState(false);
  const [tourEdit, setTourEdit] = useState<ETour>(null);
  const [tourAction, setTourAction] = useState<ETour>();
  const [tourDelete, setTourDelete] = useState<ETour>(null);

  useEffect(() => {
    TourBillService.getRevenueOfToursByMonth({
      tourIds: [1, 2],
      month: 10,
    }).then((res) => console.log(res, "===========res=========="));
  }, []);

  const onTogglePopupCreateTour = () => {
    setOpenPopupCreateTour(!openPopupCreateTour);
    setTourEdit(null);
  };

  const handleAction = (currentTarget: any, item: ETour) => {
    setTourAction(item);
  };

  const onAction = (currentTarget: any, item: ETour) => {
    onTogglePopupCreateTour();
    setTourEdit(item);
  };

  const onShowConfirm = () => {
    if (!tourAction) return;
    setTourDelete(tourAction);
  };

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
              startIcon={<FontAwesomeIcon icon={faSearch} />}
              className={classes.inputSearch}
            />
          </div>
          <Button btnType={BtnType.Primary} onClick={onTogglePopupCreateTour}>
            <FontAwesomeIcon icon={faPlus} />
            Create
          </Button>
        </Row>
        <Table className={classes.table} responsive>
          <thead>
            <tr>
              <th scope="row">Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>State</th>
              <th className={classes.colAction}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allTours?.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{item?.id}</th>
                  <td>{item?.title}</td>
                  <td>{fCurrency2(item?.price)} VND</td>
                  <td>
                    {!item?.isTemporarilyStopWorking ? (
                      <FontAwesomeIcon icon={faCircleCheck} className={classes.iconActiveTour} />
                    ) : (
                      <FontAwesomeIcon icon={faCircleMinus} className={classes.iconStopTour} />
                    )}
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
                        <FontAwesomeIcon icon={faCaretDown} className={classes.iconAction} />
                      </DropdownToggle>
                      <DropdownMenu aria-labelledby="navbarDropdownMenuLink1" className={classes.dropdownMenu}>
                        <DropdownItem className={classes.dropdownItem} onClick={(e) => onAction(e, item)}>
                          <FontAwesomeIcon icon={faPen} />
                          Edit
                        </DropdownItem>
                        <DropdownItem className={classes.dropdownItem} onClick={onShowConfirm}>
                          <FontAwesomeIcon icon={faTrash} />
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </td>
                </tr>
              );
            })}
            {!allTours?.length && (
              <tr>
                <td scope="row" colSpan={5}>
                  <SearchNotFound />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
});

export default ToursRevenue;
function setMessSuccess(arg0: string): any {
  throw new Error("Function not implemented.");
}
