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

export interface TourForm { 
  name: string;
  description: string;
  businessHours: string;
  location: string;
  contact: string;
  price: number;
  discount?: number;
  tags: string;
  creator: string;
  isTemporarilyStopWorking: boolean;
  images?: string[];
}

interface Props extends ModalProps{ 
    isOpen: boolean;
    onClose: () => void;
    toggle: () => void;
}

// eslint-disable-next-line react/display-name
const PopupCreateTour = memo((props: Props) => {
    const {isOpen, toggle, onClose, rest} = props; 
    const { t, i18n } = useTranslation();
    const schema = useMemo(() => {
      return yup.object().shape({
          name: yup.string().required("Name is required"),
          description: yup.string().required("Description is required"),
          businessHours: yup.string().required("Hours is required"),
          location: yup.string().required("Location is required"),
          contact: yup.string().required("Contact is required"),
          price: yup.number().required("Price is required"),
          discount: yup.number().notRequired(),
          tags: yup.string().required("Tags is required"),
          creator: yup.string().required("Creator is required"),
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
        contact: "",
        price: null,
        discount: null,
        tags: "",
        creator: "",
        isTemporarilyStopWorking: false,
        images: [],
      })
    }

    const _onSubmit = (data: TourForm) => {
      console.log(data);
      clearForm();
      toggle();
  }


  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
            <ModalHeader toggle={toggle} className={classes.title}>Create tour</ModalHeader>
                <Form role="form" onSubmit={handleSubmit(_onSubmit)} className={classes.form}>
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
                        label="Contact"
                        placeholder="Enter contact"
                        inputRef={register("contact")}
                        errorMessage={errors.contact?.message}
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
                    <Row xs={6}  className={classes.row}>
                      <Col>
                        <InputTextFieldBorder
                        label="Tags"
                        className="mr-3"
                        placeholder="Enter tour's tags"
                        inputRef={register("tags")}
                        errorMessage={errors.tags?.message}
                        />
                      </Col> 
                      <Col>
                        <InputTextFieldBorder
                        label="Creator"
                        placeholder="Enter your company"
                        inputRef={register("creator")}
                        errorMessage={errors.creator?.message}
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

