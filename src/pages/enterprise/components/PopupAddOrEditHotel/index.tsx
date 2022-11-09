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
import ErrorMessage from 'components/common/texts/ErrorMessage';
import { fData } from 'utils/formatNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faBed } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import { clsx } from 'clsx';

const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const PHOTO_SIZE = 10000000000; // bytes
const MAX_IMAGES = 9;
const MIN_IMAGES = 3;
export interface HotelForm { 
  name: string;
  description: string;
  location: string;
  contact: string;
  tags: string;
  creator: string;
  isTemporarilyStopWorking: boolean;
  roomNumber: string;
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

    const [imagesHotel, setImagesHotel] = useState<any>([]);
    const [isError, setIsError] = useState<string>('');
    const [collapses, setCollapses] = React.useState([1]);

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
          imagesHotel: yup.array().required("Images is required"),
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [i18n.language]);



     const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      watch,
      setValue,
      control,
      clearErrors,
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

    const onDrop = useCallback((acceptedFiles: File[]) => {
      const checkMinImages = acceptedFiles.length >= MIN_IMAGES;
      if(!checkMinImages) {
        setIsError("min-invalid")
        setImagesHotel([])
        return;
      }
      const checkMaxImages = acceptedFiles.length <= MAX_IMAGES;
      if(!checkMaxImages) {
        setIsError("max-invalid")
        setImagesHotel([])
        return;
      }
      acceptedFiles.forEach((file: File) => { 
        const reader = new FileReader();
        const checkSize = file.size < PHOTO_SIZE;
        const checkType = FILE_FORMATS.includes(file.type);
        if (!checkSize) {
          setIsError('size-invalid');
          return
        }        
        if (!checkType) {
          setIsError('type-invalid');
          return
        }
        setIsError('');
        reader.onload = () => {
          setImagesHotel((prevState:any) => [...prevState, reader.result])
        }
        reader.readAsDataURL(file);
      })
    }, [])
  
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    }); 
    
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

    useEffect(() => {      
      // const checkMaxImages = images.length <= MAX_IMAGES;
      // if(!checkMaxImages) {
      //   setIsError("max-invalid")
      //   return;
      // }
      setValue("imagesHotel", imagesHotel)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagesHotel]);


  const onDelete = (file: any) => {
    const newImages = imagesHotel.filter(it => it !== file)
    setImagesHotel(newImages)
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
                      <Row className={classes.row}>
                        <Col>
                        <InputCheckbox
                        content="Temporarily stop working"
                        inputRef={register("isTemporarilyStopWorking")}
                        />
                        </Col>
                      </Row>
                    <Row className={clsx("mb-2",classes.row)}>
                        <Col>
                          <p className={classes.titleUpload}>Upload images your hotel</p>
                          <div className={classes.main}>
                              <div className={classes.listImageContainer}>
                                {imagesHotel?.length > 0 && <Row className={classes.rowImg}>
                                  {imagesHotel?.map((image: string | undefined, index: React.Key | null | undefined) => 
                                    (<Col xs={3} key={index} className={classes.imageContainer}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img  alt="anh" src={image} className="selected-iamges"/>
                                    <div onClick={() => onDelete(image)} className={classes.deleteImage}><FontAwesomeIcon icon={faCircleXmark}/></div> 
                                    </Col>) 
                                    )}
                                  </Row>
                                }
                              </div>
                              <Button className={classes.dropZone} btnType={BtnType.Primary} {...getRootProps()} disabled={imagesHotel?.length >= MAX_IMAGES}>
                              <input {...getInputProps()} className={classes.input} name="images"/>
                              {isDragActive ? 'Drag active' : "Choose your images"}
                              </Button>
                              {isError === 'size-invalid' && <ErrorMessage translation-key="common_file_size">size: {fData(PHOTO_SIZE) }</ErrorMessage>}
                              {isError === 'max-invalid' && <ErrorMessage>You can upload only {MAX_IMAGES} images</ErrorMessage>}
                              {isError === 'min-invalid' && <ErrorMessage>You must upload minimum {MIN_IMAGES} images</ErrorMessage>}                  
                              {isError === 'type-invalid' &&
                                (
                                  <ErrorMessage  translation-key="common_file_type">
                                    Please choose following format: {" "}
                                    {
                                        FILE_FORMATS.map(format => (
                                          format.replace("image/", "*.")
                                        )).join(", ")
                                    }
                                  </ErrorMessage>
                                )
                              }
                              {!imagesHotel?.length && <ErrorMessage>{errors.imagesHotel?.message}</ErrorMessage> }
                          </div>
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

