import React, { FC } from "react";
import {ICheckboxForm} from "../type";
import { CheckboxProps } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { Controller, UseFormReturn } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import Typography, { TypographyProps } from "@mui/material/Typography";

export interface ICustomCheckboxProps {
  inputProps: SwitchBaseProps["inputProps"];
  slotProps: { typography?: TypographyProps };
  checkBoxProps: CheckboxProps;
}

type Props = ICheckboxForm & {
  form: UseFormReturn<any>;
  error: any;
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
                variant: "caption3",
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
              variant="caption3"
              sx={{
                height: 23,
                width: "max-content",
                color: error ? "error.4" : "text.primary",
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
