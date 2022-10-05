/*eslint-disable*/
import React, {memo} from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  NavItem,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import {Item} from "routes/routers";
import classes from "./styles.module.scss";
import clsx from "clsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { images } from "configs/images";

interface Props { 
    routes: Item[];
}

const Sidebar = memo((props : Props) => {

  const {routes: routesList } = props
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  const [verticalTabs, setVerticalTabs] = React.useState("1");

  const links = (
    <>
      {routesList.map((route, key) => {
        return (
          <NavItem className={classes.navItem}>
             <NavLink
                className={clsx(verticalTabs === `${route.id}` ? `${classes.active}` :  classes.navLink)}
                href={route.path}
                onClick={(e) => {
                e.preventDefault();
                setVerticalTabs(route.id);
                }}
              >
                <FontAwesomeIcon icon={route.icon}/>
                <div>
                  <span>{route.name}</span>
                </div>
              </NavLink>
          </NavItem>
        )
      })}
    </>
  )
  return (
    <Nav
    className="nav-pills-info flex-column"
    pills
    role="tablist"
    >
    {links}
    </Nav>
  );
})


export default Sidebar;
