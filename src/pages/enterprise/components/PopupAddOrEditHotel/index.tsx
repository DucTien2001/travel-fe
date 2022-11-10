import React, { useMemo, memo, useCallback, useState, useEffect } from 'react';
import {Row, Form, Modal, ModalProps, ModalHeader, ModalBody, ModalFooter, Col, Table, Card, CardBody, CardHeader, Collapse } from 'reactstrap';
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
import UploadImage from "components/UploadImage";

export interface HotelForm { 
  name: string;
  description: string;
  location: string;
  contact: string;
  tags: string;
  creator: string;
  isTemporarilyStopWorking: boolean;
  imagesHotel: string[];

}

interface Props extends ModalProps{ 
    isOpen: boolean;
    onClose: () => void;
    toggle: () => void;
}

// eslint-disable-next-line react/display-name
const PopupAddOrEditHotel = memo((props: Props) => {
    const {isOpen, toggle, onClose, rest} = props; 

    const { t, i18n } = useTranslation();
    const [collapses, setCollapses] = React.useState([1]);

    const schema = useMemo(() => {
      return yup.object().shape({
          name: yup.string().required("Name is required"),
          description: yup.string().required("Description is required"),
          location: yup.string().required("Location is required"),
          contact: yup.string().required("Contact is required"),
          tags: yup.string().required("Tags is required"),
          creator: yup.string().required("Creator is required"),
          isTemporarilyStopWorking: yup.boolean().required(),
          imagesHotel: yup.mixed().test("required", "Please select images", value => {
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
      } = useForm<HotelForm>({
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
        location: "",
        contact: "",
        tags: "",
        creator: "",
        isTemporarilyStopWorking: false,
        imagesHotel: [],
      })
    }

    const changeCollapse = (collapse: number) => {
      if (collapses.includes(collapse)) {
        setCollapses(collapses.filter((prop) => prop !== collapse));
      } else {
        setCollapses([...collapses, collapse]);
      }
    };
    
    const _onSubmit = (data: HotelForm) => {
      console.log(data);
      clearForm();
      toggle();
  }

  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
            <ModalHeader toggle={toggle} className={classes.title}>Create hotel</ModalHeader>
                <Form role="form" onSubmit={handleSubmit(_onSubmit)} className={classes.form}>
                <ModalBody>
                    <Row xs={6} className={classes.row}>
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
                    <Row xs={6} className={classes.row}>
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
                    <Col>
                      <InputTextArea
                        label="Description"
                        placeholder="Enter description"
                        inputRef={register("description")}
                        errorMessage={errors.description?.message}
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
                      <Controller
                        name="imagesHotel"
                        control={control}
                        render={({field}) => (
                          <UploadImage
                          title = "Upload your hotel images"
                          file={field.value as unknown as File[]}
                          onChange={(value) =>field.onChange(value)}
                          errorMessage={errors.imagesHotel?.message}
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

export default PopupAddOrEditHotel;

