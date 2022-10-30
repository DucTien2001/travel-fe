import React, { useMemo, memo, useCallback } from 'react';
import {Row, Form, Modal, ModalProps, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import classes from "./styles.module.scss";
import 'aos/dist/aos.css';
import Button, {BtnType} from "components/common/buttons/Button";
import InputTextArea from "components/common/inputs/InputTextArea";
import InputSelect from "components/common/inputs/InputSelect";
import InputCounter from "components/common/inputs/InputCounter";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import Star from "components/Stars";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import {HistoryBookRoom} from "models/room";
import { Stars } from '@mui/icons-material';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import useIsMountedRef from 'hooks/useIsMountedRef';
import UploadImage from 'components/UploadImage';

const PHOTO_SIZE = 10 * 1000000; // bytes
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

export interface CommentForm { 
  comment: string;
  selectInvoice: HistoryBookRoom[];
  numberOfStars: number;
  image: File | string,
}

interface Props extends ModalProps{ 
    isOpen: boolean;
    onClose: () => void;
    toggle: () => void;
}

// eslint-disable-next-line react/display-name
const PopupCreateTour = memo((props: Props) => {
    const {isOpen, toggle, rest} = props; 

    const { t, i18n } = useTranslation();
    const isMountedRef = useIsMountedRef();

    const schema = useMemo(() => {
      return yup.object().shape({
          comment: yup.string().required("Content is required"),
          numberOfStars: yup.number().required(),
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [i18n.language] );
  
     const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
      control,
      setError,
      setValue,
      } = useForm<CommentForm>({
        resolver: yupResolver(schema),
        mode: "onChange",
        defaultValues: { 
          numberOfStars: 3,
        }
    });

    // const isValidSize = async (file: File) => {
    //   return new Promise((resolve) => {
    //     const reader = new FileReader()
    //     reader.readAsDataURL(file);
    //     reader.onload = function (e) {
    //       const image = new Image();
    //       image.src = e.target.result as string;
    //       image.onload = function () {
    //         const height = image.height;
    //         const width = image.width;
    //         resolve(height >= 200 && width >= 200)
    //       };
    //       image.onerror = function () {
    //         resolve(false)
    //       }
    //     }
    //     reader.onerror = function () {
    //       resolve(false)
    //     }
    //   })
    // }

    // const handleDrop = useCallback(async (acceptedFiles: any) => {
    //   let file = acceptedFiles[0];
    //   const checkSize = file.size < PHOTO_SIZE;
    //   const checkType = FILE_FORMATS.includes(file.type);
    //   const validSize = await isValidSize(file)
    //   if (!validSize) {
    //     setError('image', { message: t('setup_survey_packs_popup_image_size') })
    //     return
    //   }
    //   if (!checkSize) {
    //     setError('image', { message: t('setup_survey_packs_popup_image_file_size', { size: fData(PHOTO_SIZE) }) })
    //     return
    //   }
    //   if (!checkType) {
    //     setError('image', { message: t('setup_survey_packs_popup_image_type') })
    //     return
    //   }
    //   setValue('image', file)
    // },
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    //   [isMountedRef]
    // );

    // const {
    //   getRootProps,
    //   getInputProps
    // } = useDropzone({
    //   onDrop: handleDrop,
    //   multiple: true,
    // });

    const clearForm = () => {
      reset({
        comment: "",
      })
    }
  
    const _onSubmit = (data: CommentForm) => {
        console.log(data);
        clearForm();
    }
  return (
    <>  
        <Modal isOpen={isOpen} toggle={toggle} {...rest} className={classes.root}>
          <Form  method="post" role="form" onSubmit={handleSubmit(_onSubmit)}>
                <ModalHeader toggle={toggle} className={classes.title}>Create tour</ModalHeader>
                <ModalBody>
                    <Row xs={6} className={classes.row}>
                        <InputTextFieldBorder
                        label="Name"
                        className="mr-3"
                        placeholder="Enter name"
                        />
                        <InputTextFieldBorder
                        label="Description"
                        placeholder="Enter description"
                        />
                    </Row>
                    <Row xs={6} className={classes.row}>
                        <InputTextFieldBorder
                        label="Business hours"
                        className="mr-3"
                        placeholder="Enter business hours"
                        />
                        <InputTextFieldBorder
                        label="Location"
                        placeholder="Enter location"
                        />
                    </Row>
                    <Row xs={6} className={classes.row}>
                        <InputTextFieldBorder
                        label="Price"
                        className="mr-3"
                        placeholder="Enter price"
                        />
                        <InputTextFieldBorder
                        label="Discount"
                        placeholder="Enter discount"
                        />
                    </Row>
                    <Row xs={6} className={classes.row}>
                        <UploadImage/>
                        <InputTextFieldBorder
                        label="Creator"
                        placeholder="Enter your company"
                        />
                    </Row>
                </ModalBody>
                <ModalFooter className={classes.footer}>
                  <div className={classes.action}>
                    <Button btnType={BtnType.Secondary} type="submit" className="mr-2">
                      Post
                    </Button>{' '}
                    <Button btnType={BtnType.Primary} onClick={toggle}>
                      Cancel
                    </Button>
                  </div>
                  <p>
                    Your question will be posted on Travelix.com once it has been approved and answered
                  </p>
                </ModalFooter>
          </Form>
        </Modal>
    </>
  );
});

export default PopupCreateTour;
