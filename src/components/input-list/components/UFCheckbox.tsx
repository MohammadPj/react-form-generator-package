import React, { FC } from "react";
import { IUseFormInput } from "../type";
import { CheckboxProps } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { Controller, UseFormReturn } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import Typography, { TypographyProps } from "@mui/material/Typography";

interface Props extends IUseFormInput {
  form: UseFormReturn<any>;
  error: any;
  props: {
    inputProps: SwitchBaseProps["inputProps"];
    slotProps: { typography?: TypographyProps };
    checkBoxProps: CheckboxProps;
  };
}

const UFCheckbox: FC<Props> = ({
  form,
  name,
  label,
  rules,
  disabled,
  sx,
  error,
  helperText,
  withoutHelperText,
  props,
}) => {
  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      render={({ field: { onChange, name, value = false } }) => (
        <FormControl
          sx={{ display: "flex", ...(disabled && { filter: "contrast(0.3)" }) }}
        >
          <FormControlLabel
            sx={{ ...sx }}
            slotProps={{
              typography: {
                fontSize: 12,
                fontWeight: 400,
                ...props?.slotProps?.typography,
              },
            }}
            control={
              <Checkbox
                color="primary"
                checked={value}
                onChange={onChange}
                disabled={disabled}
                name={name}
                inputProps={props?.inputProps}
                {...props?.checkBoxProps}
              />
            }
            label={label}
          />
          {!withoutHelperText && (
            <Typography
              fontSize={12}
              fontWeight={400}
              sx={{
                height: 23,
                width: "max-content",
                color: error ? "error.main" : "text.primary",
              }}
            >
              {error?.message ?? helperText ?? " "}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};

export default UFCheckbox;
