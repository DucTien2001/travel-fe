import React, { useMemo, memo, useEffect, useState } from "react";
import {
  Form,
  Modal,
  ModalProps,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Input,
} from "reactstrap";
import classes from "./styles.module.scss";
import "aos/dist/aos.css";
import Button, { BtnType } from "components/common/buttons/Button";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputCounter from "components/common/inputs/InputCounter";
import Star from "components/Stars";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  setErrorMess,
  setLoading,
  setSuccessMess,
} from "redux/reducers/Status/actionTypes";
import { CommentService } from "services/normal/comment";
import { useRouter } from "next/router";
import useAuth from "hooks/useAuth";
import { Comment } from "models/comment";
import { getAllTours } from "redux/reducers/Normal/actionTypes";
import InputTextfield from "components/common/inputs/InputTextfield";
import { Grid, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { EServiceType } from "models/general";
import { TourBill } from "models/tourBill";

export interface CommentForm {
  content: string;
  numberOfStars: number;
  images?: File[];
}

interface Props {
  isOpen: boolean;
  commentEdit?: Comment;
  tourBill?: TourBill;
  onClose?: () => void;
  toggle?: () => void;
  onSubmit?: (data: any) => void;
}

// eslint-disable-next-line react/display-name
const PopupAddComment = memo((props: Props) => {
  const { isOpen, commentEdit, toggle, tourBill, onSubmit } = props;
  // const tourId = Number(router.query.tourId.slice(1));
  const dispatch = useDispatch();

  const [oldImages, setOldImages] = useState<any>([]);
  const [imagesDeleted, setImagesDeleted] = useState([]);
  const [imagesUpload, setImagesUpload] = useState([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);

  const schema = useMemo(() => {
    return yup.object().shape({
      content: yup.string().required("Content is required"),
      numberOfStars: yup.number().required(),
      images: yup.array(yup.mixed()),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CommentForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      numberOfStars: 3,
    },
  });

  const clearForm = () => {
    reset({
      content: "",
      numberOfStars: 3,
    });
  };

  const handleFile = async (e) => {
    e.stopPropagation();
    let files = e.target.files;
    for (let file of files) {
      setImagesUpload((prevState: any) => [...prevState, file]);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagesPreview((prevState: any) => [...prevState, reader.result]);
      };
    }
  };

  const handleDeleteImage = (image, index) => {
    if (oldImages.includes(image)) {
      setImagesDeleted((prevState: any) => [...prevState, image]);
    }
    setOldImages((prevState: any) =>
      prevState?.filter((item) => item !== image)
    );
    setImagesPreview((prevState: any) =>
      prevState?.filter((item) => item !== image)
    );
    setImagesUpload((prevState: any) =>
      prevState?.filter((_, i) => i !== index)
    );
  };

  const _onSubmit = (data: CommentForm) => {
    const dataForm = new FormData();
    dataForm.append("content", data?.content);
    dataForm.append("rate", `${data?.numberOfStars}`);
    dataForm.append("serviceId", `${tourBill?.tourData?.id}`);
    dataForm.append("serviceType", `${EServiceType?.TOUR}`);
    dataForm.append("billId", `${tourBill?.id}`);
    imagesUpload.forEach((item, index) => {
      dataForm.append(`imageFiles${index}`, item);
    });
    if (commentEdit) {
      const formDataEdit = new FormData();
      formDataEdit.append("content", data?.content);
      formDataEdit.append("rate", `${data?.numberOfStars}`);
      formDataEdit.append("serviceId", `${tourBill?.tourData?.id}`);
      formDataEdit.append("serviceType", `${EServiceType?.TOUR}`);
      formDataEdit.append("billId", `${tourBill?.id}`);
      imagesUpload.forEach((item, index) => {
        if (typeof item === "object") {
          formDataEdit.append(`imageFiles${index}`, item);
        }
      });
      oldImages?.forEach((item, index) => {
        if (typeof item === "string") {
          formDataEdit.append(`images[]`, item);
        }
      });
      imagesDeleted?.forEach((item, index) => {
        if (typeof item === "string") {
          formDataEdit.append(`imagesDeleted[]`, item);
        }
      });
      onSubmit(formDataEdit);
      // console.log(imagesDeleted);
    } else {
      onSubmit(dataForm);
    }
  };

  useEffect(() => {
    if (commentEdit) {
      reset({
        content: commentEdit?.content,
        numberOfStars: commentEdit?.rate,
      });
      setOldImages(commentEdit?.images);
      setImagesPreview(commentEdit?.images);
      setImagesUpload(commentEdit?.images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentEdit, reset]);

  useEffect(() => {
    if (isOpen && !commentEdit) {
      clearForm();
      setOldImages([]);
      setImagesPreview([]);
      setImagesUpload([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, commentEdit]);

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className={classes.root}>
        <Form method="post" role="form" onSubmit={handleSubmit(_onSubmit)}>
          <ModalHeader toggle={toggle} className={classes.title}>
            What do you think about this tour?
          </ModalHeader>
          <ModalBody>
            <Controller
              name="numberOfStars"
              control={control}
              render={({ field }) => (
                <div className={classes.starContainer}>
                  <div className={classes.inputCounter}>
                    <InputCounter
                      label="Star rating:"
                      max={5}
                      min={1}
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </div>
                  <Star
                    className={classes.starWrapper}
                    numberOfStars={field.value}
                  />
                </div>
              )}
            />
            <InputTextfield
              title="Content"
              multiline
              rows={3}
              inputRef={register("content")}
              errorMessage={errors?.content?.message}
            />
            <Grid item xs={12}>
              <p className={classes.titleInput}>Upload images</p>
              <div className={classes.containerUploadImg}>
                <label htmlFor="file" className={classes.boxUpload}>
                  <div>
                    <AddPhotoAlternateOutlinedIcon
                      className={classes.imgAddPhoto}
                    />
                    <p className={classes.selectImgTitle}>Upload images</p>
                  </div>
                </label>
                <Input
                  inputRef={register("images")}
                  onChange={handleFile}
                  hidden
                  type="file"
                  id="file"
                  multiple
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <p className={classes.titleInput}>Images preview</p>
              <Grid container spacing={2}>
                {imagesPreview?.map((item, index) => {
                  return (
                    <Grid key={item} xs={4} className={classes.imgPreview} item>
                      <img src={item} alt="preview" />
                      <IconButton
                        onClick={() => handleDeleteImage(item, index)}
                        title="Delete"
                        className={classes.iconDelete}
                      >
                        <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                      </IconButton>
                    </Grid>
                  );
                })}
                {!imagesPreview?.length && (
                  <Col className={classes.noImg}>
                    <h4>No photos uploaded yet</h4>
                  </Col>
                )}
              </Grid>
            </Grid>
          </ModalBody>
          <ModalFooter className={classes.footer}>
            <div className={classes.action}>
              <Button
                btnType={BtnType.Secondary}
                onClick={toggle}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button btnType={BtnType.Primary} type="submit">
                Post
              </Button>{" "}
            </div>
            <p>
              Your question will be posted on Travelix.com once it has been
              approved and answered
            </p>
          </ModalFooter>
        </Form>
      </Modal>
    </>
  );
});

export default PopupAddComment;
