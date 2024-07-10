import React, { FC, ReactNode } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { IUseFormInput } from "../type";
import { useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import CustomNumericInput from "../../custom-input/CustomNumericInput.tsx";

interface Props extends IUseFormInput {
  form: UseFormReturn<any>;
  error: any;
  itemProps?: any;
  currencyIcon?: ReactNode | string;
}

const UfCurrency: FC<Props> = ({
  form,
  name,
  defaultValue,
  sx,
  rules,
  readonly,
  disabled,
  placeholder,
  error,
  itemProps,
  props,
  helperText,
  withoutHelperText,
  variant,
  // currencyIcon = <SvgDollarCircle primarycolor={"inherit"} />,
  currencyIcon = <Typography>تومان</Typography>,
  inputLabelMode,
  label,
}) => {
  const { direction } = useTheme();

  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={defaultValue}
      render={({ field: { onChange, name, value, onBlur } }) => (
        <CustomNumericInput
          value={value}
          onChange={(value: string | number) => {
            onChange({
              target: { value: value },
            });
          }}
          InputProps={{
            // [direction === "rtl" ? "startAdornment" : "endAdornment"]:
            //   currencyIcon,
            sx:{gap:2},
            endAdornment: props?.currencyIcon ?? currencyIcon,
          }}
          onBlur={onBlur}
          fullWidth
          id={name}
          error={!!error}
          placeholder={placeholder}
          disabled={disabled}
          variant={variant}
          {...(inputLabelMode === "static" && { hiddenLabel: true })}
          {...(inputLabelMode === "relative" && { label: label })}
          sx={{
            ...sx,
            ".MuiInputBase-root": {
              px: (theme) => theme.spacing(2),
            },

            ...(direction === "rtl"
              ? {
                  ".MuiFilledInput-input": {
                    py: "16px !important",
                    textAlign: "right !important",
                    pr: "3px !important",
                  },
                }
              : {
                  ".MuiFilledInput-input": {
                    pl: "3px !important",
                  },
                }),
            backgroundColor: readonly ? "background.paper" : "unset",
            borderRadius: "8px",
            pointerEvents: readonly ? "none" : "",
            "& .MuiOutlinedInput-input": {
              backgroundColor: readonly ? "background.paper" : "unset",
              color: readonly ? "text.secondary" : "unset",
            },
          }}
          helperText={
            withoutHelperText ? undefined : error?.message ?? helperText ?? " "
          }
          aria-readonly={readonly}
          inputProps={{ readOnly: readonly }}
          {...itemProps}
          {...props}
        />
      )}
    />
  );
};

export default UfCurrency;
