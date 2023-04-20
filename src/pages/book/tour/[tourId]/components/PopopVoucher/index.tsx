import React, { memo, useMemo, useState } from "react";
import {
  Modal,
  ModalProps,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import classes from "./styles.module.scss";
import { GetVoucherValue, Voucher } from "models/voucher";
import { Grid } from "@mui/material";
import { EDiscountType } from "models/general";
import { fPercent, fShortenNumber } from "utils/formatNumber";
import moment from "moment";
import InputCheckbox from "components/common/inputs/InputCheckbox";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button, { BtnType } from "components/common/buttons/Button";
import clsx from "clsx";

interface Props {
  isOpen?: boolean;
  toggle?: () => void;
  voucher: Voucher[];
  onGetVoucher?: (data: GetVoucherValue) => void;
}

interface VoucherForm {
  voucherValue: number;
  discountType: number;
}

// eslint-disable-next-line react/display-name
const PopupVoucher = memo((props: Props) => {
  const { isOpen, toggle, voucher, onGetVoucher } = props;

  const schema = useMemo(() => {
    return yup.object().shape({
      voucherValue: yup.number().required(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { control, setValue, handleSubmit } = useForm<VoucherForm>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const _onSubmit = (data: VoucherForm) => {
    onGetVoucher(data);
    toggle();
  };

  const handleValidVoucher = (startTime) => {
    var bookDate = new Date();
    let isValid = false;
    if (bookDate < new Date(startTime)) {
      isValid = true;
    } else {
      isValid = false;
    }
    return isValid;
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Grid component={"form"} onSubmit={handleSubmit(_onSubmit)}>
          <ModalHeader toggle={toggle} className={classes.titleHeader}>
            <p>Shop discount code</p>
          </ModalHeader>
          <ModalBody className={classes.body}>
            <span>
              Save more when applying Shop discount code. Contact the Shop if
              there is a problem with the discount code created by the Shop
              itself.
            </span>
            <Grid className={classes.boxVoucher}>
              {voucher?.length &&
                voucher?.map((item, index) => (
                  <>
                    {item?.discountType === EDiscountType.PERCENT ? (
                      <Grid
                        className={clsx(classes.boxVoucherItem, {
                          [classes.boxVoucherItemInValid]: handleValidVoucher(
                            item?.startTime
                          ),
                        })}
                      >
                        Deal {fPercent(item?.discountValue)} <br />
                        Period: {moment(item?.startTime).format(
                          "DD/MM/YYYY"
                        )} - {moment(item?.endTime).format("DD/MM/YYYY")}
                        <Controller
                          name="voucherValue"
                          control={control}
                          render={({ field }) => (
                            <>
                              <Grid sx={{ paddingRight: "14px" }}>
                                <InputCheckbox
                                  checked={field.value === item?.discountValue}
                                  onChange={() => {
                                    setValue(
                                      "voucherValue",
                                      item?.discountValue
                                    );
                                    setValue(
                                      "discountType",
                                      item?.discountType
                                    );
                                  }}
                                />
                              </Grid>
                            </>
                          )}
                        />
                      </Grid>
                    ) : (
                      <Grid
                        className={clsx(classes.boxVoucherItem, {
                          [classes.boxVoucherItemInValid]: handleValidVoucher(
                            item?.startTime
                          ),
                        })}
                      >
                        Deal {fShortenNumber(item?.discountValue)} VND <br />
                        Period: {moment(item?.startTime).format(
                          "DD/MM/YYYY"
                        )} - {moment(item?.endTime).format("DD/MM/YYYY")}
                        <Controller
                          name="voucherValue"
                          control={control}
                          render={({ field }) => (
                            <>
                              <Grid sx={{ paddingRight: "14px" }}>
                                <InputCheckbox
                                  checked={field.value === item?.discountValue}
                                  onChange={() => {
                                    setValue(
                                      "voucherValue",
                                      item?.discountValue
                                    );
                                    setValue(
                                      "discountType",
                                      item?.discountType
                                    );
                                  }}
                                />
                              </Grid>
                            </>
                          )}
                        />
                      </Grid>
                    )}
                  </>
                ))}
            </Grid>
          </ModalBody>
          <ModalFooter className={classes.footer}>
            <Button
              btnType={BtnType.Primary}
              type="submit"
              className={classes.btnDone}
            >
              Done
            </Button>
          </ModalFooter>
        </Grid>
      </Modal>
    </>
  );
});

export default PopupVoucher;
