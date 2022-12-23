import React, {memo, useEffect, useMemo, useState} from "react";
import SectionHeader from "components/Header/SectionHeader";
import {images} from "configs/images";
import clsx from "clsx";
import classes from "./styles.module.scss";
import {
  Container, 
  Row,
  Col,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { TourService } from "services/normal/tour";
import { setErrorMess, setLoading, setSuccessMess } from "redux/reducers/Status/actionTypes";
import InputTextFieldBorder from "components/common/inputs/InputTextFieldBorder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Box from "components/BoxSmallLeft";
import CustomSelect from "components/common/CustomSelect";
import {VietQR} from 'vietqr';  
import { ReducerType } from "redux/reducers";
import { fCurrency2VND } from "utils/formatNumber";
import {Divider} from "components/common/Divider";
import Button, { BtnType } from "components/common/buttons/Button";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputDatePicker from "components/common/inputs/InputDatePicker";
import UseAuth from "hooks/useAuth";
import { TourBillService } from "services/normal/tourBill";
import PopupDefault from "components/Popup/PopupDefault";

export interface BookForm {
  banks: any;
  cardName: string;
  cardNumber: string;
  issueDate: Date;
  deposit: number;
}
// eslint-disable-next-line react/display-name
const BookTour = memo(()=> {
  const dispatch = useDispatch();
  const { user } = UseAuth();
  const {confirmBookTour} = useSelector((state: ReducerType) => state.normal);
  const [listBanks, setListBanks] = useState([]);
  const router = useRouter()
  const [tour, setTour] = useState<any>();
  const [modal, setModal] = useState(false);

  const schema = useMemo(() => {
    return yup.object().shape({
        banks: yup.object().required("Bank is required"),
        cardName: yup.string().required("Card name is required"),
        cardNumber: yup.string().required("Card number is required"),
        issueDate: yup.date().required("Issue date is required"),
        deposit: yup.number().typeError("Deposit must be is number").min(confirmBookTour?.price * 20 / 100, "Please enter deposit rather than 20% tour's price")
        .max(confirmBookTour?.price,"Deposit must be less than or equal to tour's price")
        .required("Deposit is required"),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

   const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control,
    } = useForm<BookForm>({
      resolver: yupResolver(schema),
      mode: "onChange",
      defaultValues: { 
        banks: listBanks[0]?.name,
      }
  });
  
  let vietQR = new VietQR({
    clientID: 'client_id_here',
    apiKey: 'api_key_here',
    });
    useEffect(() => {
      vietQR.getBanks().then((banks)=>{
        const newBanks = banks?.data.map((item, index) => {return {
             id: item?.id,
             name: `${item?.name} (${item?.code})`,
             value: item?.name,
           }
         })     
         setListBanks(newBanks);
     }).catch((err)=>{});
    }, [])



    useEffect(() => {
      if(router){
        TourService.getTour(Number(router.query.tourId.slice(1))).
        then((res) => {
          setTour(res.data);
        })
        .catch((e) => {
          dispatch(setErrorMess(e));
        })
        .finally(() => {
          dispatch(setLoading(false))
        })
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    const _onSubmit = (data: BookForm) => {
      console.log(data);
      dispatch(setLoading(true));  
        if(user) {
          TourBillService.create({
            userId: confirmBookTour?.userId,
            userMail: confirmBookTour?.email,
            tourId: confirmBookTour?.tourId,
            amount: confirmBookTour?.amount,
            price: confirmBookTour?.price,
            discount: confirmBookTour?.discount,
            email: confirmBookTour?.email,
            phoneNumber: confirmBookTour?.phoneNumber,
            firstName: confirmBookTour?.firstName,
            lastName: confirmBookTour?.lastName,
            bankName: data?.banks?.name,
            bankAccountName: data?.cardName,
            bankNumber: data?.cardNumber,
            accountExpirationDate: data?.issueDate,
            deposit: data?.deposit,
          })
          .then(() => {
            dispatch(setSuccessMess("Book tour successfully"));
          })
          .catch((e) => {
            dispatch(setErrorMess(e));
          })
          .finally(() => {
            toggle();
            dispatch(setLoading(false));
          });
        }
    }

    const toggle = () => setModal(!modal);

    useEffect(() => {
      let tempDeposit = confirmBookTour?.price * confirmBookTour?.amount  * 20 / 100
      if(confirmBookTour?.discount) {
        tempDeposit = tempDeposit * ((100 - confirmBookTour?.discount) / 100)
      }
      setValue("deposit", Math.ceil(tempDeposit))
    }, [confirmBookTour])

  return (
    <>
      <div className={clsx("wrapper", classes.root)}>
        <SectionHeader
        className={classes.sectionHeader}
        title="PLACE ORDER"
        src={images.pricing1.src}
        />
        <Container>
          <form onSubmit={handleSubmit(_onSubmit)}>
            <Row className={classes.root}>
                <Col xs={6} className={classes.boxLeft}>
                <Box title="Payment method" className={classes.containerBox}>
                  <div className={classes.box}> 
                  <span className={classes.titleBanks}>Banks:</span>
                    <CustomSelect
                    placeholder="Please choose the bank"
                    name="banks"
                    control={control}
                    options={listBanks}
                    errorMessage={errors.banks?.message}
                    />
                      <Row className={clsx("mt-4", classes.row)}>
                            <Col xs={6} className={classes.colInfor}>
                                <InputTextFieldBorder
                                label="Card Name"
                                placeholder="Ex: NGUYEN VAN A"
                                type="text"
                                inputRef={register("cardName")}
                                errorMessage={errors.cardName?.message}
                                />
                            </Col>
                            <Col xs={6} className={classes.colInfor}>
                                <InputTextFieldBorder
                                label="Card number"
                                placeholder="Ex: 97043600000000002"
                                inputRef={register("cardNumber")}
                                errorMessage={errors.cardNumber?.message}
                                />
                            </Col>
                      </Row>
                      <InputDatePicker
                      className={classes.inputSearchDate}
                      label="Issue date"
                      placeholder="Issue date"
                      control={control}
                      name="issueDate"
                      dateFormat="DD/MM/YYYY"
                      timeFormat={false}
                      labelIcon={<FontAwesomeIcon icon={faCalendarDays} />}
                      inputRef={register("issueDate")}
                      errorMessage={errors.issueDate?.message}
                      />
                      <InputTextFieldBorder
                      label="Deposit (VND)"
                      placeholder="Enter deposit"
                      inputRef={register("deposit")}
                      errorMessage={errors.deposit?.message}
                      />
                      <div className={classes.noteTip}>
                        <div className={classes.noteEnterLanguage}>
                            <FontAwesomeIcon icon={faCircleInfo}/>
                            <span className="ml-2">Please enter deposit rather than 20% tour&apos;s price </span>
                        </div>
                      </div> 
                  </div>
                </Box>
                </Col>
                <Col xs={6} className={classes.boxRight}>
                <Box title="Order summary" className={classes.containerBox}>
                 <div className={classes.boxCostSummary}>
                  <p>Tour&apos;s price: {fCurrency2VND(tour?.price)} VND</p>
                  <p>Amount: {confirmBookTour?.amount}</p>
                  <p>Discount: {confirmBookTour?.discount} %</p>
                  <Divider/>
                  <div className={classes.boxTotalPrice}>
                      <p>Total price: <span>{fCurrency2VND(confirmBookTour?.price * confirmBookTour?.amount * ((100 - tour?.discount) / 100))} VND</span></p>
                    </div>
                    <span>(Taxes and fees are included)</span>
                  </div>
                  <Button btnType={BtnType.Linear} type="submit" className={classes.btnPlaceOrder}>PLACE ORDER</Button>
                </Box>
                </Col>
            </Row>
          </form>
        </Container>
        <PopupDefault
            isOpen={modal}
            onClose={toggle}
            toggle={toggle}
            title={"Confirm"}
            description={"You have successfully placed your order. Thank you for choosing our service"}
            />    
      </div>
    </>
  );
})

export default BookTour;
