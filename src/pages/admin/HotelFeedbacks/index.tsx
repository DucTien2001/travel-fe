import React, { memo, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Row, Table } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { ReducerType } from "redux/reducers";
import moment from "moment";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomSelect from "components/common/CustomSelect";
import { setErrorMess, setLoading } from "redux/reducers/Status/actionTypes";
import SearchNotFound from "components/SearchNotFound";
import Button, {BtnType} from "components/common/buttons/Button";
import PopupConfirmDelete from "components/Popup/PopupConfirmDelete";
import Link from "next/link";
import { useRouter } from "next/router";
import { CommentService } from "services/admin/comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import PopupDeclineDeleteComment from "./PopupDeclineDeleteComment";

interface IHotelSelection {
  hotels?: any;
}

// eslint-disable-next-line react/display-name
const TourComments = memo(() => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { allHotels } = useSelector((state: ReducerType) => state.enterprise);
  const [hotels, setHotels] = useState([]);
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);

  const [hotelIds, setHotelIds] = useState([]);
  const [commentDelete, setCommentDelete] = useState(null);
  const [openPopupDeclineDeleteComment, setOpenPopupDeclineDeleteComment] = useState(false);
  const [commentEdit, setCommentEdit] = useState(null);
  const [commentAction, setCommentAction] = useState(null);

  const schema = useMemo(() => {
    return yup.object().shape({
      hotels: yup.object().required("This field is required"),
    });
  }, []);

  const {
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<IHotelSelection>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      hotels: hotels[0],
    },
  });

    const watchHotelValue = watch("hotels");

    const sortDate = (a, b) => {
      if (moment(a?.createdAt).toDate() > moment(b?.createdAt).toDate()) {
        return 1;
      } else if (
        moment(a?.createdAt).toDate() < moment(b?.createdAt).toDate()
      ) {
        return -1;
      } else {
        return 0;
      }
    }

    const onOpenPopupConfirmDelete = (e, itemAction) => {
      setCommentDelete(itemAction);
    }

    const onClosePopupConfirmDelete = () => {
      if(!commentDelete) return
      setCommentDelete(null);
  }


  const onGetHotelComments = () => {
    CommentService.getHotelCommentsNeedDelete()
    .then((res) => {
      setComments(res.data.sort(sortDate));
      setAllComments(res.data.sort(sortDate));
    })
    .catch((e) => {
      dispatch(setErrorMess(e));
    })
    .finally(() => {
      dispatch(setLoading(false));
    })
  }

  const onYesDelete = () => {
    if (!commentDelete) return
    onClosePopupConfirmDelete();
    dispatch(setLoading(true));
    CommentService.deleteCommentHotel(commentDelete?.id)
    .then(()=> {        
        onGetHotelComments();
    })
    .catch(e => dispatch(setErrorMess(e)))
    .finally(() => dispatch(setLoading(false)))
  }

  const onClosePopupDeleteDeclineComment = () => {
    setOpenPopupDeclineDeleteComment(false);
    setCommentEdit(null);
  }
  
  const onOpenPopupDeclineDeleteComment = (e, cmt) => {
    setOpenPopupDeclineDeleteComment(true);
    setCommentEdit(cmt);
    setCommentAction(cmt);
  }
  useEffect(() => {
    dispatch(setLoading(true));
    onGetHotelComments()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dispatch])

  useEffect(() => {
    const newHotels = [{id: 0, name: "All", value: "All"}];
    allHotels?.map((item, index) => {newHotels.push({
      id: item?.id,
      name: item?.name,
      value: item?.name,
    })
    })
    const tempHotelIds = newHotels.map((hotel) => hotel?.id);
    setHotelIds(tempHotelIds);
    setHotels(newHotels);
    setValue("hotels", hotels[0]);
  }, [allHotels])

  useEffect(() => {
    if(watchHotelValue) {
      if(watchHotelValue.id === 0){
        setComments(allComments);
      }
      else { 
        const filterHotel = allComments.filter(item => item.hotelId  === watchHotelValue.id)
        setComments(filterHotel);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchHotelValue])

  return (
    <>
      <div className={classes.root}>
        <Row className={clsx(classes.rowHeaderBox, classes.title)}>
          <h3>comment of hotels</h3>
        </Row>
        <Row className={classes.rowSelectTour}>
            <p>Hotel:</p>
            <CustomSelect
              className={classes.input}
              placeholder="Please choose hotel"
              name="hotels"
              control={control}
              options={hotels}
              errorMessage={errors.hotels?.message}
            />
        </Row>
        <Table className={classes.table} responsive>
          <thead>
            <tr>
              <th scope="row">#</th>
              <th>Hotel name</th>
              <th>User name</th>
              <th>Created</th>
              <th>Content</th>
              <th>Reason for delete</th>
              <th>Decline</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {comments?.map((cmt, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td><Link href={`/listHotel/:${cmt?.hotelId}`}><a className={classes.linkDetail}>{cmt?.hotelInfo.name}</a></Link></td>
                <td>{cmt?.hotelReviewer?.firstName}{" "}{cmt?.hotelReviewer?.lastName}</td>
                <td>{moment(cmt?.createdAt).format("DD/MM/YYYY")}</td>
                <td>{cmt?.comment}</td>
                <td>{cmt?.reasonForDelete}</td>
                <td className={clsx("text-right", classes.colActionBtn)}>
                  <Button className="btn-icon" color="info" size="sm" type="button" onClick={(e) => onOpenPopupDeclineDeleteComment(e, cmt)}>
                    <FontAwesomeIcon icon={faArrowRotateRight}/>
                  </Button>
                </td>
                <td className={clsx("text-right", classes.colActionBtn)}>
                  <Button
                  className="btn-icon"
                  color="danger"
                  size="sm"
                  type="button"
                  onClick={(e) => onOpenPopupConfirmDelete(e, cmt)}
                  >
                  <i className="now-ui-icons ui-1_simple-remove"></i>
                  </Button>
                  </td>
              </tr>
            ))}
            {!comments?.length && (
              <tr>
                <td scope="row" colSpan={7}> 
                  <SearchNotFound mess="No comment"/>
                </td>                 
              </tr>
            )}
          </tbody>
        </Table>
        <PopupConfirmDelete
        title="Are you sure delete this comment?"
        isOpen={!!commentDelete}
        onClose={onClosePopupConfirmDelete}
        toggle={onClosePopupConfirmDelete}
        onYes={onYesDelete}
        />
        <PopupDeclineDeleteComment
        isOpen={openPopupDeclineDeleteComment}
        commentEdit={commentEdit}
        commentId={commentAction?.id}
        onClose={onClosePopupDeleteDeclineComment}
        toggle={onClosePopupDeleteDeclineComment}
        />
      </div>
    </>
  );
});

export default TourComments;
