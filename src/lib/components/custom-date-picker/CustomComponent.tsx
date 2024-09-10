import React, { FC } from "react";
import { InputAdornment, TextField, TextFieldVariants } from "@mui/material";

import { BaseTextFieldProps } from "@mui/material/TextField/TextField";
import { TInputLabelMode } from "../input-list/type";
import SvgCalendar from "../../assets/icons/Calendar.tsx";

interface Props extends BaseTextFieldProps {
  openCalendar: any;
  value?: any;
  handleValueChange?: () => void;
  disabled?: boolean;
  error?: any;
  readonly?: boolean;
  variant?: TextFieldVariants;
  inputLabelMode: TInputLabelMode;
  withoutHelperText: boolean;
}

const CustomComponent: FC<Props> = ({
  openCalendar,
  value,
  handleValueChange,
  disabled,
  error,
  readonly,
  variant,
  lang,
  placeholder,
  inputLabelMode,
  label,
  withoutHelperText,
  ...rest
}) => {
  const { sx, helperText, ...props } = rest;

  return (
    <TextField
      placeholder={placeholder ?? lang === "fa" ? "انتخاب کنید" : "Pick a date"}
      error={Boolean(error)}
      {...(inputLabelMode === "static" && { hiddenLabel: true })}
      {...(inputLabelMode === "relative" && { label: label })}
      fullWidth
      variant={variant}
      sx={{
        borderRadius: "8px",
        pointerEvents: readonly ? "none" : "unset",
        "& .MuiOutlinedInput-input ,& .MuiOutlinedInput-root": {
          borderRadius: "8px",
        },

        "& .MuiFormHelperText-root": {
          position: "absolute",
          top: 55,
          left: 0,
        },
        ...sx,
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{
              stroke: (theme) =>
                readonly
                  ? `${theme.palette.text.disabled} !important`
                  : "text.primary",
            }}
          >
            <SvgCalendar primarycolor={"inherit"} />
          </InputAdornment>
        ),
      }}
      disabled={disabled}
      value={value}
      onFocus={openCalendar}
      onClick={openCalendar}
      onChange={handleValueChange}
      helperText={
        withoutHelperText ? undefined : error?.message ?? helperText ?? " "
      }
      {...props}
    />
  );
};

export default CustomComponent;
