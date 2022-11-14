import React, { useMemo, memo, useCallback, useState, useEffect } from 'react';
import {Row, Form, Modal, ModalProps, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import UploadImage  from 'components/UploadImage';
import { useDispatch } from 'react-redux';
import { TourService } from 'services/enterprise/tour';
import useAuth from 'hooks/useAuth';
import { setErrorMess, setLoading, setSuccessMess } from 'redux/reducers/Status/actionTypes';
import { ETour } from 'models/enterprise';
import axios from 'axios';

export interface TourForm{ 
  name: string;
  description: string;
  businessHours: string;
  location: string;
  price: number;
  discount?: number;
  tags: string;
  isTemporarilyStopWorking: boolean;
  images?: string[] | File[];
}

interface Props extends ModalProps{ 
    isOpen: boolean;
    onClose: () => void;
    toggle: () => void;
    itemEdit?: ETour;
}

// eslint-disable-next-line react/display-name
const PopupCreateTour = memo((props: Props) => {
    const dispatch = useDispatch();
    const {user} = useAuth();
    const {isOpen, toggle, onClose, itemEdit, rest} = props; 
    const { t, i18n } = useTranslation();
    const [listImages, setListImages] = useState([])

    const schema = useMemo(() => {
      return yup.object().shape({
          name: yup.string().required("Name is required"),
          description: yup.string().required("Description is required"),
          businessHours: yup.string().required("Hours is required"),
          location: yup.string().required("Location is required"),
          price: yup.number().typeError('Price must be a number').required("Price is required"),
          discount: yup.number().typeError('Discount must be a number').notRequired(),
          tags: yup.string().required("Tags is required"),
          isTemporarilyStopWorking: yup.boolean().required(),
          images: yup.mixed().test("required", "Please select images", value => {
            return value && value.length;
          }),
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [i18n.language]);
  
     const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      control,
      } = useForm<TourForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: { 
          isTemporarilyStopWorking: false,
        }
    });

    const clearForm = () => {
      reset({
        name: "",
        description: "",
        businessHours: "",
        location: "",
        price: null,
        discount: null,
        tags: "",
        isTemporarilyStopWorking: false,
        images: [],
      })
    }

  //   const _onSubmit = (data: TourForm) => {
  //       dispatch(setLoading(true));
  //       if(itemEdit) {
  //         TourService.updateTour(itemEdit.id, {
  //           title: data.name,
  //           description: data.description,
  //           businessHours: data.businessHours,
  //           location: data.location,
  //           price: data.price,
  //           discount: data.discount,
  //           tags: data.tags,
  //           images: data.images,
  //         })
  //         .then(() => {
  //           dispatch(setSuccessMess("Create tour successfully"))
  //         })
  //         .catch(e => {
  //           dispatch(setErrorMess(e))
  //         })
  //         .finally(() => {
  //           dispatch(setLoading(false));
  //         });
  //       }
  //       else { 
  //         TourService.createTour({
  //           title: data.name,
  //           description: data.description,
  //           businessHours: data.businessHours,
  //           location: data.location,
  //           price: data.price,
  //           discount: data.discount,
  //           tags: data.tags,
  //           images: data.images,
  //           creator: user.id,
  //         })
  //           .then(() => {
  //             dispatch(setSuccessMess("Create tour successfully"))
  //           })
  //           .catch(e => {
  //             dispatch(setErrorMess(e))
  //           })
  //           .finally(() => {
  //             dispatch(setLoading(false));
  //           });
  //       }

  // }
    const _onSubmit = async (data: TourForm) => {
      console.log("===========",data);
      const uploader = data.images.map((file) => {
        const formData:any = new FormData();
        formData.append("file", file);
        formData.append('tags', 'codeinfuse, medium, gist');
        formData.append('upload_preset', 'my-uploads');
        formData.append('api_key', '859398113752799');
        formData.append('timestamp', (Date.now() / 1000) / 0);
        return axios.post('https://api.cloudinary.com/v1_1/dpvvffyul/image/upload', formData,{
          headers: {"X-Requested-With": "XMLHttpRequest"},
        })
        .then((res) => {
          const data = res.data;
          const imageUrl = data.secure_url;
          let specialArrayInObject = listImages;
          specialArrayInObject.push(imageUrl);
          const newObj = [...listImages, specialArrayInObject];
          setListImages(newObj);
          console.log("########", listImages);
        });
      })
      if(user){
        dispatch(setLoading(true));
        TourService.createTour({
            title: data.name,
            description: data.description,
            businessHours: data.businessHours,
            location: data.location,
            price: data.price,
            discount: data.discount,
            tags: data.tags,
            images: listImages,
            creator: user?.id,
          })
            .then(() => {
              dispatch(setSuccessMess("Create tour successfully"))
            })
            .catch(e => {
              dispatch(setErrorMess(e))
            })
            .finally(() => {
              dispatch(setLoading(false));
            });
      }
      onClose();
    }
  // useEffect(() => {
  //   if (itemEdit) {
  //     reset({
  //       name: itemEdit.title,
  //       description: itemEdit.description,
  //       businessHours: itemEdit.businessHours,
  //       location: itemEdit.location,
  //       price: itemEdit.price,
  //       discount: itemEdit.discount || null,
  //       tags: itemEdit.tags,
  //       images: itemEdit.images,
  //     })
  //   }
  // }, [reset, itemEdit])
  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
          <Form role="form" onSubmit={handleSubmit(_onSubmit)} className={classes.form}>
            <ModalHeader toggle={toggle} className={classes.title}>Create tour</ModalHeader>
                <ModalBody>
                    <Row xs={6} sm={12} className={classes.row}>
                      <Col>
                        <InputTextFieldBorder
                        label="Name"
                        className="mr-3"
                        placeholder="Enter name"
                        inputRef={register("name")}
                        errorMessage={errors.name?.message}
                        />
                      </Col>
                      <Col>
                        <InputTextFieldBorder
                        label="Location"
                        placeholder="Enter location"
                        inputRef={register("location")}
                        errorMessage={errors.location?.message}
                        />
                      </Col>
                    </Row>
                    <Row xs={6} sm={12} className={classes.row}>
                      <Col>
                        <InputTextFieldBorder
                        label="Business hours"
                        className="mr-3"
                        placeholder="Enter business hours"
                        inputRef={register("businessHours")}
                        errorMessage={errors.businessHours?.message}
                        />
                      </Col>
                      <Col>
                        <InputTextFieldBorder
                        label="Tags"
                        className="mr-3"
                        placeholder="Enter tour's tags"
                        inputRef={register("tags")}
                        errorMessage={errors.tags?.message}
                        />
                      </Col> 
                    </Row>
                    <Row xs={6} sm={12} className={classes.row}>
                      <Col>
                        <InputTextFieldBorder
                        label="Price"
                        className="mr-3"
                        placeholder="Enter price"
                        inputRef={register("price")}
                        errorMessage={errors.price?.message}
                        />
                      </Col>
                      <Col>
                        <InputTextFieldBorder
                        label="Discount"
                        placeholder="Enter discount"
                        inputRef={register("discount")}
                        errorMessage={errors.discount?.message}
                        />
                      </Col>  
                    </Row>
                    <Row className={classes.row}>
                      <Col>
                      <InputTextArea
                        label="Description"
                        placeholder="Enter description"
                        inputRef={register("description")}
                        errorMessage={errors.description?.message}
                      />
                      </Col>
                    </Row>
                    <Controller
                        name="images"
                        control={control}
                        render={({field}) => (
                          <UploadImage
                          title = "Upload your tour images"
                          file={field.value as unknown as File[]}
                          onChange={(value) =>field.onChange(value)}
                          errorMessage={errors.images?.message}
                          />
                        )}
                        /> 
                    <Row className={classes.row}>
                      <Col>
                        <InputCheckbox
                        content="Temporarily stop working"
                        inputRef={register("isTemporarilyStopWorking")}
                        />
                      </Col>
                    </Row>        
                </ModalBody>                
                <ModalFooter className={classes.footer}>
                    <Button btnType={BtnType.Primary} type="submit">
                      Save
                    </Button>
                </ModalFooter>  
                </Form>
        </Modal>
    </>
  );
});

export default PopupCreateTour;

