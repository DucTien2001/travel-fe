import React, { memo } from "react";

import classes from "./styles.module.scss";
import { FormGroup, Input, InputProps, Label } from "reactstrap";

interface Props extends InputProps {
  className?: string;
  content?: React.ReactNode;
  inputRef?: any;
  errorMessage?: string | null;
}

// eslint-disable-next-line react/display-name
const CustomCheckbox = memo(
  ({ className, content, inputRef, errorMessage, ...rest }: Props) => {
    const { ref: refInput, ...inputProps } = inputRef || { ref: null };

    return (
      <FormGroup check className={className}>
        <Label check className={classes.black}>
          <Input
            {...inputProps}
            type="checkbox"
            innerRef={refInput}
            {...rest}
          />
          <span className="form-check-sign" />
          {content}
        </Label>
        <span className="text-danger text-left ml-1 mt-1 d-block">
          {errorMessage}
        </span>
      </FormGroup>
    );
  }
);

export default CustomCheckbox;
