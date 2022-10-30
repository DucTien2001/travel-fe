import ErrorMessage from 'components/common/texts/ErrorMessage';
import React, {useCallback, useState, useEffect ,memo} from 'react';
import {useDropzone} from 'react-dropzone';
import { fData } from 'utils/formatNumber';
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
const PHOTO_SIZE = 3145728; // bytes

export interface Props {
  errorMessage?: string;
  photoSize?: number;
  fileFormats?: string[];
}
// eslint-disable-next-line react/display-name
const UploadImage = memo(({errorMessage, photoSize = PHOTO_SIZE, fileFormats = FILE_FORMATS}: Props) => {

  const [images, setImages] = useState<any>([]);
  const [isError, setIsError] = useState<string>('');
  const onDrop = useCallback((acceptedFiles: File[], rejectFiles:  File[]) => {
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

  // const remove = (file: File) => {
  //   const newFiles = [...files];     // make a var for the new array
  //   newFiles.splice(file, 1);        // remove the file from the array
  //   setFiles(newFiles);              // update the state
  // };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop,
    accept: fileFormats
  }); 

  return (
    <section className="container">
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? 'Drag active' : "you Drag"}
      </div>
      <aside>
        <h4>Files</h4>
        <ul>
          {images.length > 0 && <div>
            {images.map((image: string | undefined, index: React.Key | null | undefined) => <img key={index} alt="anh" src={image} className="selected-iamges"/>)}
            </div>}
        </ul>
        {isError === 'size-invalid' && <ErrorMessage translation-key="common_file_size">size: {fData(photoSize) }</ErrorMessage>}
        {isError === 'type-invalid' &&
          (
            <ErrorMessage  translation-key="common_file_type">
              {
                  fileFormats.map(format => (
                    format.replace("image/", "*.")
                  )).join(", ")
                }
            </ErrorMessage>
          )
        }
        {errorMessage && <ErrorMessage >{errorMessage}</ErrorMessage>}
      </aside>
    </section>
  );
})

export default UploadImage;