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


interface Props { 
    title?: string;
    errorMessage?: string;
    // file?: string[] | File[];
    onChange?: (file: string[] | File[]) => void;
}

// eslint-disable-next-line react/display-name
const PopupAddOrEditHotel = memo((props: Props) => {
    const {title, errorMessage, onChange} = props; 

    const { t, i18n } = useTranslation();

    const [imagesHotel, setImagesHotel] = useState<any>([]);
    const [isError, setIsError] = useState<string>('');



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

    useEffect(() => {      
        onChange && onChange(imagesHotel)
    }, [imagesHotel]);


  const onDelete = (file: any) => {
    const newImages = imagesHotel.filter(it => it !== file)
    setImagesHotel(newImages)
  }

  return (
    <>  

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
                        {/* {!imagesHotel?.length && <ErrorMessage>{errors.imagesHotel?.message}</ErrorMessage> } */}
                    </div>
                </Col>
            </Row>
    </>
  );
});

export default PopupAddOrEditHotel;

