import React, {memo, useMemo} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Collapse,
  Container,
  Row,
  Col,
  Table,
} from "reactstrap";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import InputCounter from "components/common/inputs/InputCounter";
import {images} from "configs/images";
import Carousel from "components/Carousel";
import classes from "./styles.module.scss";
import Button, {BtnType} from "components/common/buttons/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faArrowsRotate} from '@fortawesome/free-solid-svg-icons';
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import Link from "next/link";
import BoxSmallLeft from "components/BoxSmallLeft";

export interface CheckRoomForm { 
    departure: Date;
    return: Date;
    amount: number;
}
  
interface Props { 
 
}

// eslint-disable-next-line react/display-name
const CheckRoomEmpty = memo((Props)=> {

    const { t, i18n } = useTranslation();

    const schema = useMemo(() => {
        return yup.object().shape({
            departure: yup.date().required("Departure date is required"),
            return: yup.date().required("Return date is required"),
            amount: yup.number().required("Amount is required"),
          });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [i18n.language] );
    
       const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        } = useForm<CheckRoomForm>({
          resolver: yupResolver(schema),
          mode: "onChange",
          defaultValues: {
            amount: 0,
          }
      });


  return (
    <>
        <Container className={classes.root}>
            <h4 className={classes.titleCheckEmpty}>List room empty</h4>
            <Row xs={4} className={classes.inputDateContainer}>
                <InputDatePicker
                className={classes.inputSearchDate}
                label="Departure date"
                placeholder="Departure"
                name="Departure date"
                timeFormat={false}
                labelIcon={<FontAwesomeIcon icon={faCalendarDays}/>}
                inputRef={register("departure")}
                errorMessage={errors.departure?.message}
                /> 
                <InputDatePicker
                className={classes.inputSearchDate}
                label="Return date"
                placeholder="Return"
                name="Return date"
                timeFormat={false}
                labelIcon={<FontAwesomeIcon icon={faCalendarDays}/>}
                inputRef={register("return")}
                errorMessage={errors.return?.message}
                />
                <div className={classes.btnContainer}>
                    <Button
                    btnType={BtnType.Primary}
                    >
                    <FontAwesomeIcon icon={faArrowsRotate}/>
                    Change search
                    </Button>
                </div>
            </Row>   
            {/* =============== Desktop =============== */}
            <Table
              responsive
              bordered
              className={classes.table}
            >
                <thead>
                    <tr>
                        <th scope="row" className={classes.roomNumberTitle}>
                            Room Number
                        </th>
                        <th className={clsx(classes.colImgMobile,classes.title)}>
                            Images
                        </th>
                        <th className={classes.title}>
                            Price
                        </th>
                        <th className={classes.title}>
                            Amount
                        </th>
                        <th className={classes.title}>
                           Confirm
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row" className={classes.col}>
                        1
                    </th>
                    <td className={classes.colImg}>
                        <Carousel images={[images.bgUser, images.bg19]} className={classes.imgCarousel}/>
                    </td>
                    <td className={classes.col}>
                        Otto
                    </td>
                    <td className={clsx(classes.colAmount, classes.col)}>
                    <Controller
                    name="amount" 
                    control={control}
                    render={({field}) => 
                        <InputCounter
                        className={classes.inputCounter}
                        max={5}
                        min={1}
                        onChange={field.onChange}
                        value = {field.value}
                        />
                    }
                    />
                    </td>
                    <td className={clsx(classes.colConfirm, classes.col)}>
                            <Link href="/book/hotel/[roomId]"
                             >
                                <Button btnType={BtnType.Secondary}>
                                    I will book
                                </Button>                 
                            </Link>
                    </td>
                    </tr>
                </tbody>
            </Table>  
              {/*=============== Mobile ============  */}
            <BoxSmallLeft className={classes.tableMobile} title="Choose the right one for you">
                <div>
                    <Row className={clsx("mb-3", classes.row)}>
                        <div className={classes.boxInformation}>
                            <p className="mr-2">Room number: </p>
                            <p>1</p>
                        </div>    
                        <div className={classes.boxInformation}>
                            <p className="mr-2">Price: </p>
                            <p className={classes.priceMobile}>$200</p>
                        </div>
                    </Row>
                        <div>
                        <Carousel images={[images.phuQuoc, images.bg19]} className={classes.imgCarouselMobile}/>
                        </div>
                    <Row className={clsx("mt-4",classes.row)}>
                    <div className={classes.boxInformation}>
                        <p className="mr-2">Amount</p>
                        <Controller
                        name="amount" 
                        control={control}
                        render={({field}) => 
                            <InputCounter
                            className={classes.inputCounter}
                            max={5}
                            min={1}
                            onChange={field.onChange}
                            value = {field.value}
                            />
                        }
                        />
                    </div>
                    </Row>
                </div>
            </BoxSmallLeft>
        </Container>
    </>
  );
})

export default CheckRoomEmpty;
