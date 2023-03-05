import { useState, memo } from "react";
import {
  OutlinedInput,
  FormControl,
  FormControlProps,
  InputAdornment,
  IconButton,
  OutlinedInputProps,
  SxProps,
  Theme,
  Grid,
} from "@mui/material";
import classes from "./styles.module.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ErrorMessage from "components/common/texts/ErrorMessage";
import TextTitle from "components/common/texts/TextTitle";
import {
  faEye,
  faMagnifyingGlassArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InputsProps extends OutlinedInputProps {
  title?: string;
  titleRequired?: boolean;
  placeholder?: string;
  name?: string;
  type?: string;
  defaultValue?: string;
  value?: string | number;
  showEyes?: boolean;
  root?: string;
  className?: any;
  inputRef?: any;
  autoComplete?: string;
  errorMessage?: string | null;
  optional?: boolean;
  infor?: string;
  isShowError?: boolean;
  rootProps?: FormControlProps;
  onClick?: () => void;
}
const InputTextfield = memo((props: InputsProps) => {
  const { t } = useTranslation();
  const [focus, setFocus] = useState(false);
  const [toggleEyes, setToggleEyes] = useState(false);
  const {
    title,
    placeholder,
    name,
    defaultValue,
    value,
    type,
    root,
    className,
    showEyes,
    inputRef,
    errorMessage,
    autoComplete,
    optional,
    infor,
    titleRequired,
    isShowError,
    rootProps,
    onClick,
    ...rest
  } = props;

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };
  const handleClick = () => {
    setToggleEyes(!toggleEyes);
  };

  const { ref: refInput, ...inputProps } = inputRef || { ref: null };

  return (
    <FormControl className={clsx(classes.root, root)} {...rootProps}>
      {title && (
        <label className={classes.title}>
          {title}
          {optional ? (
            <span className={classes.optional}> ({t("common_optional")})</span>
          ) : (
            ""
          )}
          {titleRequired ? (
            <span className={classes.titleRequired}> *</span>
          ) : (
            ""
          )}
        </label>
      )}
      <OutlinedInput
        type={!toggleEyes ? type : "text"}
        placeholder={placeholder}
        fullWidth
        name={name}
        defaultValue={defaultValue}
        value={value}
        variant="standard"
        classes={{
          root: clsx(classes.inputTextfield, {
            [classes.inputInvalid]: !!errorMessage || isShowError,
          }),
        }}
        className={className}
        autoComplete={autoComplete}
        onWheel={(e) =>
          e.target instanceof HTMLElement &&
          (e.target as any).type === "number" &&
          e.target.blur()
        }
        onFocus={onFocus}
        onBlur={onBlur}
        endAdornment={
          !errorMessage ? (
            showEyes && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClick}
                  className={classes.iconEye}
                  tabIndex={-1}
                >
                  {toggleEyes ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </InputAdornment>
            )
          ) : (
            <ErrorOutlineIcon className={classes.iconErrorOutline} />
          )
        }
        {...inputProps}
        inputRef={refInput}
        {...rest}
      />
      {infor && <p className={classes.textInfor}>{infor}</p>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      {focus && (
        <Grid className={classes.recentSearchBox} onClick={onClick}>
          <Grid
            sx={{
              display: "inline-flex",
              alignItems: "center",
              padding: "10px 16px",
              backgroundColor: "var(--gray-10)",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlassArrowRight}
            ></FontAwesomeIcon>
            <div>
              <p>Vinhome</p>
              <span>Recent Searchs</span>
            </div>
          </Grid>
        </Grid>
      )}
    </FormControl>
  );
});
export default InputTextfield;
