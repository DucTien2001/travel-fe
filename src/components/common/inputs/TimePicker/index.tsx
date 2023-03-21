import {
  TimePicker as TimePickerMUI,
  TimePickerProps,
} from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { memo } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { FormControl, OutlinedInput } from "@mui/material";
import { useTranslation } from "react-i18next";
import ErrorMessage from "components/common/texts/ErrorMessage";

interface Props extends Partial<TimePickerProps<moment.Moment, moment.Moment>> {
  title?: string;
  titleRequired?: boolean;
  placeholder?: string;
  showEyes?: boolean;
  root?: string;
  className?: any;
  inputRef?: any;
  autoComplete?: string;
  errorMessage?: string | null;
  optional?: boolean;
  infor?: string;
  isShowError?: boolean;
  tabIndex?: number;
}

const TimePicker = memo(
  ({
    title,
    placeholder,
    root,
    showEyes,
    inputRef,
    errorMessage,
    autoComplete,
    optional,
    infor,
    titleRequired,
    isShowError,
    value,
    tabIndex,
    onChange,
    ...rest
  }: Props) => {
    const { t } = useTranslation();

    return (
      <FormControl className={clsx(classes.root, root)}>
        {title && (
          <label className={classes.title}>
            {title}
            {optional ? (
              <span className={classes.optional}>
                {" "}
                ({t("common_optional")})
              </span>
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
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <TimePickerMUI
            value={value}
            onChange={onChange}
            ampmInClock
            views={["minutes", "seconds"]}
            inputFormat="hh:mm"
            mask="__:__"
            renderInput={({ InputProps, ...params }) => (
              <OutlinedInput
                fullWidth
                classes={{
                  root: clsx(classes.inputTextfield, {
                    [classes.inputInvalid]: !!errorMessage,
                  }),
                }}
                onWheel={(e) =>
                  e.target instanceof HTMLElement &&
                  (e.target as any).type === "number" &&
                  e.target.blur()
                }
                {...params}
                inputProps={{
                  ...(params.inputProps || {}),
                  tabIndex: tabIndex,
                }}
                margin={params.margin as any}
                onKeyDown={params.onKeyDown as any}
                onKeyUp={params.onKeyUp as any}
                placeholder="hh:mm"
              />
            )}
            {...rest}
          />
        </LocalizationProvider>
        {infor && <span className={classes.textInfor}>{infor}</span>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormControl>
    );
  }
);

export default TimePicker;
