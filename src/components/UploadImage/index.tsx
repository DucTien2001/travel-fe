import ErrorMessage from 'components/common/texts/ErrorMessage';
import React, {useCallback, useState, useEffect ,memo} from 'react';
import {useDropzone} from 'react-dropzone';
import { fData } from 'utils/formatNumber';
import classes from "./styles.module.scss";
import {Row, Col} from "reactstrap";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button, {BtnType} from "components/common/buttons/Button";
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const PHOTO_SIZE = 10000000000; // bytes
const MAX_IMAGES = 5;

export interface Props {
  className?: string;
  title?: string;
  errorMessage?: string;
  photoSize?: number;
  fileFormats?: string[];
  maxImages?: number; 
  onChange?: (value?: File | File[]) => void;
}
// eslint-disable-next-line react/display-name
const UploadImage = memo(({className, title, errorMessage, photoSize = PHOTO_SIZE, fileFormats = FILE_FORMATS, maxImages = MAX_IMAGES, onChange}: Props) => {

  const [images, setImages] = useState<any>([]);
  const [isError, setIsError] = useState<string>('');
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const checkMaxImages = acceptedFiles.length <= maxImages;
    if(!checkMaxImages) {
      setIsError("max-invalid")
      setImages([]);
      return;
    }
    acceptedFiles.forEach((file: File) => { 
      const reader = new FileReader();
      const checkSize = file.size < photoSize;
      const checkType = fileFormats.includes(file.type);
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
        setImages((prevState:any) => [...prevState, reader.result])
      }
      reader.readAsDataURL(file);
    })
  }, [])

  const removeImage = (file:any) => () => {
    const newImages = [...images]
    newImages.splice(newImages.indexOf(file), 1)
    setImages(newImages)
  }
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
  }); 

  return (
    <div className={className}>
    <p className={classes.title}>{title}</p>
    <div className={classes.main}>
        <div className={classes.listImageContainer}>
          {images.length > 0 && <Row className={classes.row} xs={5}>
            {images.map((image: string | undefined, index: React.Key | null | undefined) => 
              (<Col  key={index} className={classes.imageContainer}>  
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img  alt="anh" src={image} className="selected-iamges"/>
              <div onClick={removeImage(index)} className={classes.deleteImage}><FontAwesomeIcon icon={faCircleXmark}/></div>
              </Col>) 
              )}
            </Row>
          }
        </div>
        <Button className={classes.dropZone} btnType={BtnType.Primary} {...getRootProps()} disabled={images.length >= maxImages}>
        <input {...getInputProps()} className={classes.input}/>
        {isDragActive ? 'Drag active' : "Choose your images"}
        </Button>
        {isError === 'size-invalid' && <ErrorMessage translation-key="common_file_size">size: {fData(photoSize) }</ErrorMessage>}
        {isError === 'max-invalid' && <ErrorMessage>You can upload only {maxImages} images</ErrorMessage>}
        {isError === 'type-invalid' &&
          (
            <ErrorMessage  translation-key="common_file_type">
              Please choose following format: {" "}
              {
                  fileFormats.map(format => (
                    format.replace("image/", "*.")
                  )).join(", ")
              }
            </ErrorMessage>
          )
        }
        {errorMessage && <ErrorMessage >{errorMessage}</ErrorMessage>}
    </div>
    </div>
  );
})

export default UploadImage;