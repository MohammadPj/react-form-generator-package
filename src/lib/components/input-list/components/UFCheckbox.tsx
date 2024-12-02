import React, { FC } from "react";
import { ICheckboxForm } from "../type";
import { CheckboxProps } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import { Controller, UseFormReturn } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import { SwitchBaseProps } from "@mui/material/internal/SwitchBase";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { useFormContext } from "../../../context/FormContext.tsx";
import { deepMerge } from "../../../methods/general.ts";

export interface ICustomCheckboxProps {
  inputProps: SwitchBaseProps["inputProps"];
  slotProps: { typography?: TypographyProps };
  checkBoxProps: CheckboxProps;
}

type Props = ICheckboxForm & {
  form: UseFormReturn<any>;
  error: any;
};

const UFCheckbox: FC<Props> = ({
  form,
  name,
  label,
  rules,
  error,
  helperText,
  withoutHelperText,
  props,
  disabled,
  itemProps,
  formControlLabelProps,
}) => {
  const { theme } = useFormContext()

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
            slotProps={{
              typography: {
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
                {...deepMerge(theme?.checkbox?.checkboxProps, itemProps, props)}
              />
            }
            label={label}
            {...deepMerge(
              theme?.checkbox?.formControlLabelProps,
              formControlLabelProps,
            )}
          />
          {!withoutHelperText && (
            <Typography
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
