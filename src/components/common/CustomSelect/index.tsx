import { memo } from "react";
import { Controller, FieldError, FieldErrors, Merge } from "react-hook-form";
import Select, { GroupBase, StylesConfig } from "react-select";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FormGroup } from "reactstrap";
import { StateManagerProps } from "react-select/dist/declarations/src/stateManager";

const customStyles = (
  _?: boolean
): StylesConfig<any, boolean, GroupBase<unknown>> => ({
  indicatorSeparator: () => ({
    display: "none",
  }),
  container: (provided) => ({
    ...provided,
    margin: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    background: state.isSelected ? "#e8f1fb" : "#ffffff",
    color: "#2c2c2c",
    "&:hover": {
      background: "#e8f1fb",
    },
  }),
  control: (provided, state) => ({
    ...provided,
    border: state.menuIsOpen ? "1px solid #f96332" : "1px solid #e3e3e3",
    borderRadius: "30px",
    boxShadow: "none",
    backgroundColor: state.isDisabled ? "#e3e3e3" : "unset",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      borderColor: "#f96332",
      transition: "all 0.3s ease-in-out",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: "18px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#888888",
    opacity: 0.8,
    fontSize: "0.8571em",
    fontWeight: "400",
    margin: 0,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? "#888888" : "#2c2c2c",
    fontSize: "0.8571em",
    fontWeight: 400,
    margin: 0,
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
});

interface Props extends StateManagerProps {
  className?: string;
  errorMessage?: string | FieldError | Merge<FieldError, FieldErrors<any>>;
  name?: string;
  control?: any;
  bindKey?: any;
  bindLabel?: any;
}

const CustomSelect = memo(
  ({
    className,
    errorMessage,
    name,
    control,
    bindKey,
    bindLabel,
    ...rest
  }: Props) => {
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
              render={({ field }) => (
                <Select
                  {...field}
                  styles={customStyles(!!errorMessage)}
                  // menuPortalTarget={document  && document.querySelector("body")}
                  getOptionValue={(option) => option[bindKey || "id"]}
                  getOptionLabel={(option) => option[bindLabel || "name"]}
                  noOptionsMessage={() => "..."}
                  {...rest}
                />
              )}
            />
          </>
        ) : (
          <>
            <Select
              styles={customStyles(!!errorMessage)}
              // menuPortalTarget={document  && document.querySelector("body")}
              getOptionValue={(option) => option[bindKey || "id"]}
              getOptionLabel={(option) => option[bindLabel || "name"]}
              noOptionsMessage={() => "..."}
              {...rest}
            />
          </>
        )}
        {errorMessage && (
          <span className="text-danger ml-2 mt-1 d-block">{(errorMessage as any)}</span>
        )}
      </FormGroup>
    );
  }
);

export default CustomSelect;
