import React, { memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faCaretDown,
  faSearch,
  faPlus,
  faCircleCheck,
  faCircleMinus,
  faHourglass,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Collapse } from "reactstrap";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import PopupAddOrEditHotel from "./PopupAddOrEditHotel";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import PopupAddOrEditRoom from "../components/PopupAddOrEditRoom";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { RoomService } from "services/enterprise/room";
import { HotelService } from "services/enterprise/hotel";
import { getAllHotels } from "redux/reducers/Enterprise/actionTypes";
import PopupConfirmWarning from "components/Popup/PopupConfirmWarning";
import { IHotel } from "models/enterprise";

// eslint-disable-next-line react/display-name
const Hotel = memo(() => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReducerType) => state.user);
  const { allHotels } = useSelector((state: ReducerType) => state.enterprise);

  const [subTable, setSubTable] = useState([]);
  const [hotelAction, setHotelAction] = useState<IHotel>();
  const [hotelEdit, setHotelEdit] = useState<IHotel>(null);
  const [hotelStop, setHotelStop] = useState<any>(null);
  const [hotelDelete, setHotelDelete] = useState<IHotel>(null);
  const [openPopupCreateHotel, setOpenPopupCreateHotel] = useState(false);
  const [openPopupConfirmStop, setOpenPopupConfirmStop] = useState(false);

  const [modalCreateRoom, setModalCreateRoom] = useState({
    isOpen: false,
    hotelId: null,
  });
  const [isOpenToggleArr, setIsOpenToggleArr] = useState([]);

  const onTogglePopupCreateHotel = () => {
    setOpenPopupCreateHotel(!openPopupCreateHotel);
    setHotelEdit(null);
  };

  useEffect(() => {
    const tempSubTable = [];
    allHotels.map((item) => {
      tempSubTable.push({
        allRooms: [],
        isCallGet: false,
      });
    });
    setSubTable(tempSubTable);
  }, [allHotels, dispatch]);

  const onOpenModalCreateRoom = (hotelId) => {
    setModalCreateRoom({
      isOpen: true,
      hotelId: hotelId,
    });
  };

  const onCloseModalCreateRoom = () => {
    setModalCreateRoom({
      isOpen: false,
      hotelId: null,
    });
  };

  const handleAction = (currentTarget: any, item: IHotel) => {
    setHotelAction(item);
  };
  const onAction = (currentTarget: any, item: IHotel) => {
    onTogglePopupCreateHotel();
    setHotelEdit(item);
  };

  const onShowConfirm = () => {
    if (!hotelAction) return;
    setHotelDelete(hotelAction);
  };

  const onClosePopupConfirmDelete = () => {
    if (!hotelDelete) return;
    setHotelDelete(null);
  };

  const onYesDelete = () => {
    if (!hotelDelete) return;
    onClosePopupConfirmDelete();
    dispatch(setLoading(true));
    HotelService.deleteHotel(hotelDelete?.id)
      .then(() => {
        dispatch(getAllHotels(user?.id));
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  const handleToggleSubTable = (hotel, index) => {
    if (subTable[index]?.isCallGet) {
      const newIsOpen = [...isOpenToggleArr];
      newIsOpen[index] = !newIsOpen[index];
      setIsOpenToggleArr(newIsOpen);
    } else {
      dispatch(setLoading(true));
      RoomService.getAllRooms(hotel.id)
        .then((res) => {
          const _tempSubTable = [];
          subTable.map((item, indexSub) => {
            if (index === indexSub) {
              _tempSubTable.push({
                allRooms: res.data,
                isCallGet: true,
              });
            } else {
              _tempSubTable.push(item);
            }
          });
          setSubTable(_tempSubTable);
          const newIsOpen = [...isOpenToggleArr];
          newIsOpen[index] = !newIsOpen[index];
          setIsOpenToggleArr(newIsOpen);
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  };

  const onToggleConfirmStop = () => {
    setOpenPopupConfirmStop(!openPopupConfirmStop);
  };

  const onTemporarilyStopWorking = (e, item) => {
    setHotelStop(item);
    onToggleConfirmStop();
  };

  const onYesStopWorking = () => {
    if (!hotelStop) return;
    onToggleConfirmStop();
    dispatch(setLoading(true));
    HotelService.temporarilyStopWorking(hotelStop?.id)
      .then(() => {
        dispatch(getAllHotels(user?.id));
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3>Hotels</h3>
        </Row>
        <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
          <div className={classes.boxInputSearch}>
            <InputTextFieldBorder
              placeholder="Search hotels"
              startIcon={<FontAwesomeIcon icon={faSearch} />}
              className={classes.inputSearch}
            />
          </div>
          <Button btnType={BtnType.Primary} onClick={onTogglePopupCreateHotel}>
            <FontAwesomeIcon icon={faPlus} />
            Create
          </Button>
        </Row>
        <Table className={classes.table} responsive>
          <thead>
            <tr>
              <th scope="row">#</th>
              <th>Name</th>
              <th>Check in time</th>
              <th>Check out time</th>
              <th>State</th>
              <th className={classes.colRoom}>Room</th>
              <th className={classes.colActionStop}>Action stop</th>
              <th className={classes.colAction}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allHotels &&
              allHotels?.map((item, index) => {
                return (
                  <>
                    <tr key={item?.id}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>{item.checkInTime}</td>
                      <td>{item.checkOutTime}</td>
                      <td>
                        {!item?.isTemporarilyStopWorking ? (
                          <FontAwesomeIcon icon={faCircleCheck} className={classes.iconActiveTour} />
                        ) : (
                          <FontAwesomeIcon icon={faCircleMinus} className={classes.iconStopTour} />
                        )}
                      </td>
                      <td onClick={() => handleToggleSubTable(item, index)} className={clsx("text-center", classes.showRoomBtn)}>
                        Show room {"  "}
                        <FontAwesomeIcon icon={faCaretDown} className={classes.iconAction} />
                      </td>
                      <td className={classes.colActionStop}>
                        <Button
                          className="btn-icon"
                          btnType={BtnType.Secondary}
                          size="sm"
                          type="button"
                          onClick={(e) => onTemporarilyStopWorking(e, item)}
                        >
                          <FontAwesomeIcon icon={faHourglass} />
                        </Button>
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
                            <DropdownItem className={classes.dropdownItem} onClick={() => onOpenModalCreateRoom(item?.id)}>
                              <FontAwesomeIcon icon={faPlus} />
                              Add room
                            </DropdownItem>
                            <DropdownItem className={classes.dropdownItem} onClick={onShowConfirm}>
                              <FontAwesomeIcon icon={faTrash} />
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                    {/* {listRooms?.map((room) => ( */}
                    <tr>
                      <td colSpan={10} className={classes.subTable}>
                        <Collapse isOpen={isOpenToggleArr[index]}>
                          <Table>
                            <thead className={classes.headerSubTable}>
                              <tr>
                                <th>#</th>
                                <th>Room title</th>
                                <th>Number of bed</th>
                                <th>Number of room</th>
                                <th>State</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody className={classes.bodySubTable}>
                              {subTable[index]?.allRooms?.map((itemSubtable, indexSub) => (
                                <tr>
                                  <td>{indexSub}</td>
                                  <td>{itemSubtable?.title}</td>
                                  <td>{itemSubtable?.numberOfBed}</td>
                                  <td>{itemSubtable?.numberOfRoom}</td>
                                  <td>
                                    {!item?.isTemporarilyStopWorking ? (
                                      <FontAwesomeIcon icon={faCircleCheck} className={classes.iconActiveTour} />
                                    ) : (
                                      <FontAwesomeIcon icon={faCircleMinus} className={classes.iconStopTour} />
                                    )}
                                  </td>
                                  <td>
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        color="default"
                                        data-toggle="dropdown"
                                        href="#pablo"
                                        id="navbarDropdownMenuLink1"
                                        nav
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <FontAwesomeIcon icon={faCaretDown} className={classes.iconAction} />
                                      </DropdownToggle>
                                      <DropdownMenu aria-labelledby="navbarDropdownMenuLink1" className={classes.dropdownMenu}>
                                        <DropdownItem className={classes.dropdownItem}>
                                          <FontAwesomeIcon icon={faPen} />
                                          Edit
                                        </DropdownItem>
                                        <DropdownItem className={classes.dropdownItem}>
                                          <FontAwesomeIcon icon={faTrash} />
                                          Delete
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </Table>
                        </Collapse>
                      </td>
                    </tr>
                    {/* ))}  */}
                  </>
                );
              })}
          </tbody>
        </Table>
        <PopupAddOrEditHotel
          isOpen={openPopupCreateHotel}
          onClose={onTogglePopupCreateHotel}
          toggle={onTogglePopupCreateHotel}
          itemEdit={hotelEdit}
        />
        <PopupConfirmDelete
          title="Are you sure delete this hotel ?"
          isOpen={!!hotelDelete}
          onClose={onClosePopupConfirmDelete}
          toggle={onClosePopupConfirmDelete}
          onYes={onYesDelete}
        />
        <PopupAddOrEditRoom hotelId={modalCreateRoom.hotelId} isOpen={modalCreateRoom.isOpen} onClose={onCloseModalCreateRoom} />
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
});

export default Hotel;
