import clsx from "clsx";
import React, { memo } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  FieldValues,
  Merge,
} from "react-hook-form";
import { FormGroup } from "reactstrap";
import classes from "./styles.module.scss";
import ReactDatetime from "react-datetime";


interface Props {
  label?: string;
  labelIcon?: React.ReactNode;
  className?: string;
  placeholder?: string;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrors<any>>;
  name?: string;
  control?: any;
  dateFormat?: string;
  _onChange?: ()=>void;
  [key: string]: any;
}

// eslint-disable-next-line react/display-name
const CustomDatePicker = memo(
  ({ label, labelIcon, className, placeholder, errorMessage, name, handleChange, _onChange, control, dateFormat, ...rest }: Props) => {
    return (
      <FormGroup
        className={clsx(
          classes.root,
          { "has-danger": !!errorMessage },
          className
        )}
      >
        {control ? (
          <>
            <Controller
              name={name}
              control={control}
              render={({ field }) => {
                return (
                <>
                  <label className={classes.label}>{labelIcon} {label}</label>
                  <ReactDatetime
                    {...field}
                    className={classes.datePickerInput}
                    onChange={(date)=>{
                      _onChange && _onChange()
                      return field?.onChange(date)
                    }}
                    dateFormat={dateFormat || "dd/mm/yyyy"}
                    inputProps={{
                        className: "form-control",
                        placeholder: `${placeholder}`,
                      }}
                    {...rest}
                  />
                </>
                );
              }}
            />
          </>
        ) : (
          <>
            <label className={classes.label}>{labelIcon} {label}</label>
            <ReactDatetime
              className={classes.datePickerInput}
              inputProps={{
                className: "form-control",
                placeholder: `${placeholder}`,
              }}
              dateFormat="YYYY-MM"
              onChange={(date)=>{
                _onChange && _onChange()
              }}
              {...rest}
            />
          </>
        )}
        {errorMessage && (
          <span className="text-danger ml-2 mt-1 d-block"><>{errorMessage}</></span>
        )}
      </FormGroup>
    );
  }
);

export default CustomDatePicker;
