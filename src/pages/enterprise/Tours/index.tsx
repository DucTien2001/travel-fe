import React, { memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  Row,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import Button, { BtnType } from "components/common/buttons/Button";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import { AdminGetTours, ETour } from "models/enterprise";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import { TourService } from "services/enterprise/tour";
import SearchNotFound from "components/SearchNotFound";
import { ReducerType } from "redux/reducers";

import PopupConfirmWarning from "components/Popup/PopupConfirmWarning";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EActiveNav } from "..";
import {
  Box,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
  TableCell,
} from "@mui/material";
import TableHeader from "components/Table/TableHeader";
import { DataPagination, TableHeaderLabel } from "models/general";
import InputTextfield from "components/common/inputs/InputTextfield";
import {
  HideSource,
  EditOutlined,
  DeleteOutlineOutlined,
  Done,
} from "@mui/icons-material";
import StatusChip from "components/StatusChip";

const tableHeaders: TableHeaderLabel[] = [
  { name: "id", label: "Id", sortable: false },
  { name: "name", label: "Name", sortable: false },
  { name: "status", label: "Status", sortable: false },
  { name: "languages", label: "Languages", sortable: false },
  { name: "actions", label: "Actions", sortable: false },
];
interface SearchData {
  name?: string;
}
interface Props {
  onChangeTabCreate?: (type: EActiveNav) => void;
  handleTourEdit?: (currentTarget: any, item: ETour, type: EActiveNav) => void;
}
// eslint-disable-next-line react/display-name
const Tour = memo(({ onChangeTabCreate, handleTourEdit }: Props) => {
  const dispatch = useDispatch();
  // const { allTours } = useSelector((state: ReducerType) => state.enterprise);
  const { user } = useSelector((state: ReducerType) => state.user);

  const [keyword, setKeyword] = useState<string>("");
  const [data, setData] = useState<DataPagination<ETour>>();

  const [tourAction, setTourAction] = useState<ETour>();
  const [tourDelete, setTourDelete] = useState<ETour>(null);
  const [tourStop, setTourStop] = useState<ETour>(null);
  const [openPopupConfirmStop, setOpenPopupConfirmStop] = useState(false);

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().notRequired(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { register, getValues, watch } = useForm<SearchData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const handleAction = (currentTarget: any, item: ETour) => {
    // setTourAction(item);
  };

  const onYesDelete = () => {
    // if (!tourDelete) return;
    // onClosePopupConfirmDelete();
    // dispatch(setLoading(true));
    // TourService.delete(tourDelete?.id)
    //   .then(() => {
    //     dispatch(getAllTours(user?.id));
    //     dispatch(getAllToursOfNormal());
    //   })
    //   .catch((e) => dispatch(setErrorMess(e)))
    //   .finally(() => dispatch(setLoading(false)));
  };

  const onShowConfirm = () => {
    // if (!tourAction) return;
    // setTourDelete(tourAction);
  };

  const onClosePopupConfirmDelete = () => {
    // if (!tourDelete) return;
    // setTourDelete(null);
  };

  const onToggleConfirmStop = () => {
    // setOpenPopupConfirmStop(!openPopupConfirmStop);
  };
  const onTemporarilyStopWorking = (e, item) => {
    // setTourStop(item);
    // onToggleConfirmStop();
  };

  const onYesStopWorking = () => {
    // if (!tourStop) return;
    // onToggleConfirmStop();
    // dispatch(setLoading(true));
    // TourService.temporarilyStopWorking(tourStop?.id)
    //   .then(() => {
    //     dispatch(getAllTours(user?.id));
    //     dispatch(getAllToursOfNormal());
    //   })
    //   .catch((e) => dispatch(setErrorMess(e)))
    //   .finally(() => dispatch(setLoading(false)));
  };
  const onWorkAgain = (e, item) => {
    // dispatch(setLoading(true));
    // TourService.workAgain(item.id)
    //   .then(() => {
    //     dispatch(getAllTours(user?.id));
    //     dispatch(getAllToursOfNormal());
    //   })
    //   .catch((e) => dispatch(setErrorMess(e)))
    //   .finally(() => dispatch(setLoading(false)));
  };

  const watchSearch = watch("name");

  const handleKeyPress = (e) => {
    // var code = e.keyCode || e.which;
    // if (code === 13) {
    //   if (watchSearch === "") {
    //     setListTours(allTours);
    //   } else {
    //     handleSearch();
    //   }
    // }
  };

  const handleSearch = () => {
    // dispatch(setLoading(true));
    // TourService.searchTour(user?.id, getValues("name"))
    //   .then((res) => {
    //     setListTours(res?.data);
    //   })
    //   .catch((e) => {
    //     dispatch(setErrorMess(e));
    //   })
    //   .finally(() => {
    //     dispatch(setLoading(false));
    //   });
  };

  // useEffect(() => {
  //   setListTours(allTours);
  // }, [dispatch, allTours]);

  const fetchData = (value?: {
    take?: number;
    page?: number;
    keyword?: string;
  }) => {
    const params: AdminGetTours = {
      take: value?.take || data?.meta?.take || 10,
      page: value?.page || data?.meta?.page || 1,
      keyword: keyword,
    };
    if (value?.keyword !== undefined) {
      params.keyword = value.keyword || undefined;
    }
    dispatch(setLoading(true));
    TourService.getTours(params)
      .then((res) => {
        setData({
          data: res.data,
          meta: res.meta,
        });
      })
      .catch((e) => dispatch(setErrorMess(e)))
      .finally(() => dispatch(setLoading(false)));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3>Tours</h3>
        </Row>
        <Row className={clsx(classes.rowHeaderBox, classes.boxControl)}>
          <div className={classes.boxInputSearch}>
            <InputTextfield
              placeholder="Search tours"
              startAdornment={<FontAwesomeIcon icon={faSearch} />}
              className={classes.inputSearch}
              onKeyPress={handleKeyPress}
              inputRef={register("name")}
              autoComplete="off"
            />
          </div>
          <Button
            btnType={BtnType.Primary}
            onClick={() => onChangeTabCreate(EActiveNav.Create_Tour_Active)}
          >
            <FontAwesomeIcon icon={faPlus} />
            Create
          </Button>
        </Row>
        <Table className={classes.table}>
          <TableHeader headers={tableHeaders} />
          <TableBody>
            {data?.data?.length ? (
              data.data?.map((item, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell scope="row" className={classes.tableCell}>
                      {item.id}
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th">
                      <a
                        href={`/listTour/:${item?.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className={classes.tourName}
                      >
                        {item?.title}
                      </a>
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th">
                      <StatusChip status={!item?.isTemporarilyStopWorking} />
                    </TableCell>
                    <TableCell className={classes.tableCell} component="th">
                      vi
                    </TableCell>
                    <TableCell className="text-center" component="th">
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
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className={classes.iconAction}
                          />
                        </DropdownToggle>
                        <DropdownMenu
                          aria-labelledby="navbarDropdownMenuLink1"
                          className={classes.dropdownMenu}
                        >
                          <DropdownItem
                            className={classes.dropdownItem}
                            onClick={(e) =>
                              handleTourEdit(
                                e,
                                item,
                                EActiveNav.Create_Tour_Active
                              )
                            }
                          >
                            <Box display="flex" alignItems={"center"}>
                              <EditOutlined
                                sx={{ marginRight: "0.25rem" }}
                                fontSize="small"
                              />
                              <span>Edit</span>
                            </Box>
                          </DropdownItem>
                          {!item?.isTemporarilyStopWorking ? (
                            <DropdownItem
                              className={classes.dropdownItem}
                              onClick={(e) => onWorkAgain(e, item)}
                            >
                              <Box display="flex" alignItems={"center"}>
                                <Done
                                  sx={{ marginRight: "0.25rem" }}
                                  color="success"
                                  fontSize="small"
                                />
                                <span>Active</span>
                              </Box>
                            </DropdownItem>
                          ) : (
                            <DropdownItem
                              className={classes.dropdownItem}
                              onClick={(e) => onTemporarilyStopWorking(e, item)}
                            >
                              <Box display="flex" alignItems={"center"}>
                                <HideSource
                                  sx={{ marginRight: "0.25rem" }}
                                  color="error"
                                  fontSize="small"
                                />
                                <span>Inactive</span>
                              </Box>
                            </DropdownItem>
                          )}
                          <DropdownItem
                            className={clsx(
                              classes.dropdownItem,
                              classes.itemDelete
                            )}
                            onClick={onShowConfirm}
                          >
                            <Box display="flex" alignItems={"center"}>
                              <DeleteOutlineOutlined
                                sx={{ marginRight: "0.25rem" }}
                                color="error"
                                fontSize="small"
                              />
                              <span>Delete</span>
                            </Box>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <SearchNotFound searchQuery={keyword} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
});

export default Tour;
