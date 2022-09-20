import React, { memo, useState } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormGroup,
  InputProps,
} from "reactstrap";

interface Props extends InputProps {
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  inputRef?: any;
  errorMessage?: string | null;
}

// eslint-disable-next-line react/display-name
const InputTextField = memo(({className, startIcon, endIcon, inputRef, errorMessage, ...props}: Props) => {
    const [faFocus, setFaFocus] = useState(false);

    const { ref: refInput, ...inputProps } = inputRef || { ref: null };

    const renderInput = () => {
      return (
        <Input
          {...inputProps}
          type="text"
          onFocus={() => setFaFocus(true)}
          onBlur={() => setFaFocus(false)}
          className={clsx({ "form-control-danger": !!errorMessage })}
          innerRef={refInput}
          {...props}
        />
      );
    };

    return (
      <FormGroup
        className={clsx(
          classes.root,
          { "has-danger": !!errorMessage },
          className
        )}
      >
        {!!startIcon || !!endIcon ? (
          <InputGroup className={faFocus ? "input-group-focus m-0" : "m-0"}>
            {startIcon && (
              <InputGroupAddon addonType="prepend">
                <InputGroupText>{startIcon}</InputGroupText>
              </InputGroupAddon>
            )}
            {renderInput()}
            {endIcon && (
              <InputGroupAddon addonType="append">
                <InputGroupText>{endIcon}</InputGroupText>
              </InputGroupAddon>
            )}
          </InputGroup>
        ) : (
          renderInput()
        )}
        {errorMessage && (
          <span className="text-danger ml-2 mt-1 d-block">{errorMessage}</span>
        )}
      </FormGroup>
    );
  }
);

export default InputTextField;
