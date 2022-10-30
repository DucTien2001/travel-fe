import React, { useMemo, memo, useCallback } from 'react';
import {Row, Form, Modal, ModalProps, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {HistoryBookRoom} from "models/room";
import UploadImage from 'components/UploadImage';
import { FileUpload } from 'models/attachment';

export interface CreateTourForm { 
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
  images?: File[];
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
          images: yup.mixed().test('required', "Please select images", value => {
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
      } = useForm<CreateTourForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
        // defaultValues: { 
        //   isTemporarilyStopWorking: false,
        // }
    });

    const clearForm = () => {
      reset({
        name: "",
        description: "",
        businessHours: "",
        location: "",
        contact: "",
        price: 0,
        discount: 0,
        tags: "",
        creator: "",
        isTemporarilyStopWorking: false,
        images: [],
      })
    }
  
    const _onSubmit = () => {
        console.log("hello");
        clearForm();
        toggle();
    }

    // const handle = () => {
    //   console.log("heelo")
    // }
  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
          <Form role="form" onSubmit={handleSubmit(_onSubmit)}>
                <ModalHeader toggle={toggle} className={classes.title}>Create tour</ModalHeader>
                <ModalBody>
                    <Row xs={6} className={classes.row}>
                        <InputTextFieldBorder
                        label="Name"
                        className="mr-3"
                        placeholder="Enter name"
                        inputRef={register("name")}
                        errorMessage={errors.name?.message}
                        />
                        <InputTextFieldBorder
                        label="Description"
                        placeholder="Enter description"
                        inputRef={register("description")}
                        errorMessage={errors.description?.message}
                        />
                    </Row>
                    <Row xs={6} className={classes.row}>
                        <InputTextFieldBorder
                        label="Business hours"
                        className="mr-3"
                        placeholder="Enter business hours"
                        inputRef={register("businessHours")}
                        errorMessage={errors.businessHours?.message}
                        />
                        <InputTextFieldBorder
                        label="Location"
                        placeholder="Enter location"
                        inputRef={register("location")}
                        errorMessage={errors.location?.message}
                        />
                    </Row>
                    <Row xs={6} className={classes.row}>
                        <InputTextFieldBorder
                        label="Price"
                        className="mr-3"
                        placeholder="Enter price"
                        inputRef={register("price")}
                        errorMessage={errors.price?.message}
                        />
                        <InputTextFieldBorder
                        label="Discount"
                        placeholder="Enter discount"
                        inputRef={register("discount")}
                        errorMessage={errors.discount?.message}
                        />
                    </Row>
                    <Row xs={6} className={classes.row}>
                        <InputTextFieldBorder
                        label="Tags"
                        className="mr-3"
                        placeholder="Enter tour's tags"
                        inputRef={register("tags")}
                        errorMessage={errors.tags?.message}
                        />
                        <InputTextFieldBorder
                        label="Creator"
                        placeholder="Enter your company"
                        inputRef={register("creator")}
                        errorMessage={errors.creator?.message}
                        />
                    </Row>

                        <InputTextFieldBorder
                        label="Contact"
                        placeholder="Enter contact"
                        inputRef={register("contact")}
                        errorMessage={errors.contact?.message}
                        />
                      {/* <Controller
                          name="images"
                          control={control}
                          render={({ field }) => <UploadImage
                            title="Upload images your tour"
                            errorMessage={errors.images?.message}
                          />}
                      /> */}
                      <UploadImage
                            title="Upload images your tour"
                            errorMessage={errors.images?.message}
                          />
                    <InputCheckbox
                    content="Temporarily stop working"
                    inputRef={register("isTemporarilyStopWorking")}
                    />
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
