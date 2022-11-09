import React, { useMemo, memo, useCallback, useState, useEffect } from 'react';
import {Row, Form, Modal, ModalProps, ModalHeader, ModalBody, ModalFooter, Col, Table, Card, CardBody, CardHeader, Collapse } from 'reactstrap';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import * as yup from "yup";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import ErrorMessage from 'components/common/texts/ErrorMessage';
import { fData } from 'utils/formatNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faListCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDropzone } from 'react-dropzone';
import { clsx } from 'clsx';
import InputTextField from 'components/common/inputs/InputTextField';

const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const PHOTO_SIZE = 10000000000; // bytes
const MAX_IMAGES = 9;
const MIN_IMAGES = 3;
export interface HotelForm { 
  room: { 
    title: string;
    imagesRoom: string[];
    priceDays?: {
      monday?: number;
      tuesday?: number;
      wednesday?: number;
      thursday?: number;
      friday?: number;
      saturday?: number;
      sunday?: number;
    }[],
  }[],
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

    const [imagesRoom, setImagesRoom] = useState<any>([]);
    const [isError, setIsError] = useState<string>('');
    const [isOpenToggleArr, setIsOpenToggleArr] = useState([true]);

    const schema = useMemo(() => {
      return yup.object().shape({
          room: yup.array(yup.object({
            title: yup.string().required("Name is required"),
            imagesRoom: yup.array().required("Images is required"),
            priceDays: yup
            .array(
              yup.object({            
                monday: yup.number().typeError('Price is required.').positive("Price must be than 0").required("Price monday is required"),
                tuesday: yup.number().typeError('Price is required.').positive("Price must be than 0").required("Price monday is required"),
                wednesday: yup.number().typeError('Price is required.').positive("Price must be than 0").required("Price monday is required"),
                thursday: yup.number().typeError('Price is required.').positive("Price must be than 0").required("Price monday is required"),
                friday: yup.number().typeError('Price is required.').positive("Price must be than 0").required("Price monday is required"),
                saturday: yup.number().typeError('Price is required.').positive("Price must be than 0").required("Price monday is required"),
                sunday: yup.number().typeError('Price is required.').positive("Price must be than 0").required("Price monday is required"),
              })
            )
            .required(),
          }))
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
      setError,
      } = useForm<HotelForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onDrop = useCallback((acceptedFiles: File[]) => {
      const checkMinImages = acceptedFiles.length >= MIN_IMAGES;
      if(!checkMinImages) {
        setIsError("min-invalid")
        setImagesRoom([])
        return;
      }
      const checkMaxImages = acceptedFiles.length <= MAX_IMAGES;
      if(!checkMaxImages) {
        setIsError("max-invalid")
        setImagesRoom([])
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
          setImagesRoom((prevState:any) => [...prevState, reader.result])
        }
        reader.readAsDataURL(file);
      })
    }, [])
    
    const { fields: fieldsRoom, append: appendRoom, remove: removeRoom } = useFieldArray({
        control,
        name: "room",
    });
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    }); 
    
  const handleToggleCollapse = (index) => {
    const newIsOpen = [...isOpenToggleArr];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpenToggleArr(newIsOpen);
  };

  const handleAddImages = (index) => {
    const newImages = [...imagesRoom];
    newImages[index] = !newImages[index];
    setImagesRoom(newImages);
  };

    const onAddRoom = () => {
      appendRoom({
        title:"",
        imagesRoom: [],
        priceDays: []
      })
    }

    const onRemoveRoom = (index: number) => {
      removeRoom(index);
    }

    const clearForm = () => {
      reset({
        room: [],
      })
    }

    const onDeleteImages = (file: any) => {
      const newImages = imagesRoom.filter(it => it !== file)
      setImagesRoom(newImages)
    }
    
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
      imagesRoom.map((item, index) => {
        setValue(`room.${index}.imagesRoom`, item)
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imagesRoom]);


    useEffect(() => {
      onAddRoom()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
            <ModalHeader toggle={toggle} className={classes.title}>Create room</ModalHeader>
                <Form role="form" onSubmit={handleSubmit(_onSubmit)} className={classes.form}>
                <ModalBody>         
                {fieldsRoom?.map((field,index)=> {
                    return (
                    <>
                    {/* row title */}
                    <Row className={clsx(classes.boxTitleRoomNumber, classes.row)}>
                        <Col>
                           <p>Room {index + 1} :</p>
                        </Col>  
                        {fieldsRoom?.length > 1 && (
                          <Col className={classes.boxDeleteRoom}>
                            <div onClick={() => onRemoveRoom(index)}>
                              <FontAwesomeIcon icon={faTrash}/>
                            </div>
                          </Col> 
                        )}    
                    </Row> 
                    {/*row input  */}
                    <Row className={classes.row} >        
                        <Col>
                            <InputTextFieldBorder
                            label="Title"
                            className="mr-3"
                            placeholder="Enter title"
                            inputRef={register(`room.${index}.title`)}
                            errorMessage={errors.room && errors.room[index]?.title?.message}
                            />
                        </Col>
                    </Row> 
                    {/* row images */}
                    <Row className={clsx("mb-2",classes.row)}>
                            <Col>
                              <p className={classes.titleUpload}>Upload images your room</p>
                              <div className={classes.main}>
                                  <div className={classes.listImageContainer}>
                                    {imagesRoom?.length > 0 && <Row className={classes.rowImg}>
                                      {imagesRoom?.map((image: string | undefined, index: React.Key | null | undefined) => 
                                        (<Col xs={3} key={index} className={classes.imageContainer}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img  alt="anh" src={image} className="selected-iamges"/>
                                        <div onClick={() => onDeleteImages(image)} className={classes.deleteImage}><FontAwesomeIcon icon={faCircleXmark}/></div> 
                                        </Col>) 
                                        )}
                                      </Row>
                                    }
                                  </div>
                                  <Button className={classes.dropZone} btnType={BtnType.Primary} {...getRootProps()} disabled={imagesRoom?.length >= MAX_IMAGES}>
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
                                 
                              </div>
                              {imagesRoom?.length === 0 && <ErrorMessage>{errors.room && errors.room[index]?.imagesRoom?.message}</ErrorMessage> }
                          </Col>
                    </Row>
                    {/* row price table */}
                    <Row className={classes.row}> 
                        <Col>
                          <Card className="card-plain mb-0">
                          <CardHeader id="headingOne" role="tab">
                            <a
                              data-parent="#accordion"
                              data-toggle="collapse"
                              href="#pablo"
                              onClick={() => handleToggleCollapse(index)}
                              className={classes.titlePriceTable}
                            >
                              Price table{" "}
                              <i className="now-ui-icons arrows-1_minimal-down"></i>
                            </a>
                          </CardHeader>
                          <Collapse isOpen={isOpenToggleArr[index]}>
                            <CardBody className={classes.cardBody}>
                            <Table
                            bordered
                            className={classes.table}
                            >
                                <thead>
                                    <tr>
                                        <th scope="row">
                                            Days
                                        </th>
                                        <th>
                                            Price (unit VND)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                  <tr>   
                                    <th scope="row" >
                                      Monday
                                    </th>
                                    <td className={classes.tdPriceInput}>
                                      <InputTextField   
                                      inputRef={register(`room.${index}.priceDays.${index}.monday`)}  
                                      errorMessage={errors.room && errors.room[index]?.priceDays[index]?.monday?.message}                      
                                      />
                                      &nbsp;VND
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" >
                                      Tuesday
                                    </th>
                                    <td className={classes.tdPriceInput}>
                                    <InputTextField   
                                      inputRef={register(`room.${index}.priceDays.${index}.tuesday`)}
                                      errorMessage={errors.room && errors.room[index]?.priceDays[index]?.tuesday?.message}                               
                                      />
                                      &nbsp;VND
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" >
                                      Wednesday
                                    </th>
                                    <td className={classes.tdPriceInput}>
                                    <InputTextField   
                                      inputRef={register(`room.${index}.priceDays.${index}.wednesday`)}  
                                      errorMessage={errors.room && errors.room[index]?.priceDays[index]?.wednesday?.message}                             
                                      />
                                      &nbsp;VND
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" >
                                      Thursday
                                    </th>
                                    <td className={classes.tdPriceInput}>
                                    <InputTextField   
                                      inputRef={register(`room.${index}.priceDays.${index}.thursday`)}  
                                      errorMessage={errors.room && errors.room[index]?.priceDays[index]?.thursday?.message}                             
                                      />
                                      &nbsp;VND
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" >
                                      Friday
                                    </th>
                                    <td className={classes.tdPriceInput}>
                                    <InputTextField   
                                      inputRef={register(`room.${index}.priceDays.${index}.friday`)}  
                                      errorMessage={errors.room && errors.room[index]?.priceDays[index]?.friday?.message}                             
                                      />
                                      &nbsp;VND
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" >
                                      Saturday
                                    </th>
                                    <td className={classes.tdPriceInput}>
                                    <InputTextField   
                                      inputRef={register(`room.${index}.priceDays.${index}.saturday`)}  
                                      errorMessage={errors.room && errors.room[index]?.priceDays[index]?.saturday?.message}                             
                                      />
                                      &nbsp;VND
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row" >
                                      Sunday
                                    </th>
                                    <td className={classes.tdPriceInput}>
                                    <InputTextField   
                                      inputRef={register(`room.${index}.priceDays.${index}.sunday`)}   
                                      errorMessage={errors.room && errors.room[index]?.priceDays[index]?.sunday?.message}                            
                                      />
                                      &nbsp;VND
                                    </td> 
                                  </tr>                                                     
                                </tbody>
                            </Table> 
                            </CardBody>
                          </Collapse>
                        </Card>
                      </Col>
                    </Row>
                    </>
                    )
                })}
                <Row className={classes.row}>
                    <Col className={classes.boxClickAdd} onClick={onAddRoom}>
                        <FontAwesomeIcon icon={faListCheck}/>
                        Click add to room
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

