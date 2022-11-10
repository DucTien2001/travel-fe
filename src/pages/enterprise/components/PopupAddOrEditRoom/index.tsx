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
import UploadImage from "components/UploadImage";

const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const PHOTO_SIZE = 10000000000; // bytes
const MAX_IMAGES = 9;
const MIN_IMAGES = 3;
export interface RoomForm { 
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
    const [isOpenToggleArr, setIsOpenToggleArr] = useState([true]);

    const schema = useMemo(() => {
      return yup.object().shape({
          room: yup.array(yup.object({
            title: yup.string().required("Name is required"),
            imagesRoom: yup.mixed().test("required", "Please select images", value => {
              return value && value.length;
            }),
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
      control,
      } = useForm<RoomForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    
    const { fields: fieldsRoom, append: appendRoom, remove: removeRoom } = useFieldArray({
        control,
        name: "room",
    });
    
  const handleToggleCollapse = (index) => {
    const newIsOpen = [...isOpenToggleArr];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpenToggleArr(newIsOpen);
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

    const _onSubmit = (data: RoomForm) => {
      console.log(data);
      clearForm();
      toggle();
  }

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
                    <Controller
                        name={`room.${index}.imagesRoom`}
                        control={control}
                        render={({field}) => (
                          <UploadImage
                          title = "Upload your hotel images"
                          file={field.value as unknown as File[]}
                          onChange={(value) =>field.onChange(value)}
                          errorMessage={errors.room && errors.room[index]?.imagesRoom?.message}
                          />
                        )}
                      /> 
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
                                      errorMessage={errors.room && errors.room[index]?.priceDays?.[index]?.monday?.message}                      
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
                                      errorMessage={errors.room && errors.room[index]?.priceDays?.[index].tuesday?.message}                               
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
                                      errorMessage={errors.room && errors.room[index]?.priceDays?.[index].wednesday?.message}                               
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
                                      errorMessage={errors.room && errors.room[index]?.priceDays?.[index].thursday?.message}                              
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
                                      errorMessage={errors.room && errors.room[index]?.priceDays?.[index].friday?.message}                           
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
                                      errorMessage={errors.room && errors.room[index]?.priceDays?.[index].saturday?.message}                            
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
                                      errorMessage={errors.room && errors.room[index]?.priceDays?.[index].sunday?.message}                           
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

