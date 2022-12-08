import React, { memo, useEffect, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCaretDown, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Row, Table, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import PopupAddOrEditUser from "../components/PopupAddOrEditUser";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { UserService } from "services/admin/user";
import { useDispatch } from "react-redux";
import { setErrorMess } from "redux/reducers/Status/actionTypes";

// eslint-disable-next-line react/display-name
const User = memo(() => {
  const dispatch = useDispatch();
  const [allUsers, setAllUsers] = useState([]);
  const [openPopupCreateUser, setOpenPopupCreateUser] = useState(false);
  const [openPopupConfirmDelete, setOpenPopupConfirmDelete] = useState(false);

  useEffect(() => {
    UserService.getAllUserProfiles()
      .then((res) => {
        setAllUsers(res);
      })
      .catch((e) => {
        dispatch(setErrorMess(e));
      });
  }, [dispatch]);

  const onTogglePopupCreateUser = () => {
    setOpenPopupCreateUser(!openPopupCreateUser);
  };
  const onTogglePopupConfirmDelete = () => setOpenPopupConfirmDelete(!openPopupConfirmDelete);

  const onYesDelete = () => {};

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3>Users</h3>
        </Row>
        {/* <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
          <div className={classes.boxInputSearch}>
            <InputTextFieldBorder
              placeholder="Search user"
              startIcon={<FontAwesomeIcon icon={faSearch} />}
              className={classes.inputSearch}
            />
          </div>
          <Button btnType={BtnType.Primary} onClick={onTogglePopupCreateUser}>
            <FontAwesomeIcon icon={faPlus} />
            Create
          </Button>
        </Row> */}
        <Table bordered className={classes.table} responsive>
          <thead>
            <tr>
              <th scope="row">#</th>
              {/* <th>
                            Avatar
                        </th> */}
              <th>First name</th>
              <th>Last name</th>
              <th>Role</th>
              <th>Phone Number</th>
              <th>Email</th>
              {/* <th className={classes.colAction}>
                           Actions
                        </th> */}
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user, index) => (
              <tr key={user?.id}>
                <th scope="row">{index}</th>
                <td>{user?.firstName}</td>
                <td>{user?.lastName}</td>
                <td>{user?.role === 1 ? "Admin" : user?.role === 2 ? "Enterprise" : "Normal"}</td>
                <td>{user?.phoneNumber}</td>
                <td>{user?.email}</td>
                {/* <td className="text-center">
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
                    </td> */}
              </tr>
            ))}
          </tbody>
        </Table>
        <PopupAddOrEditUser isOpen={openPopupCreateUser} onClose={onTogglePopupCreateUser} toggle={onTogglePopupCreateUser} />
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
});

export default User;
