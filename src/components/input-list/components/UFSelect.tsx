import React, { FC } from "react";
import FormControl from "@mui/material/FormControl";
import { TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Controller, UseFormReturn } from "react-hook-form";
import { IUseFormInput } from "../type";
import {TextFieldProps} from "@mui/material/TextField";


interface Props extends IUseFormInput {
  form: UseFormReturn<any>;
  error: any;
  itemProps?: TextFieldProps;
}

const UFSelect: FC<Props> = ({
  form,
  error,
  sx,
  rules,
  disabled,
  name,
  options,
  defaultValue = "",
  readonly,
  props,
  itemProps,
  helperText,
  variant = "outlined",
  withoutHelperText,
  inputLabelMode,
  label,
}) => {
  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <>
          <FormControl fullWidth variant={variant}>
            <TextField
              select
              {...field}
              error={!!error}
              value={field.value}
              id={name}
              fullWidth
              {...inputLabelMode==="static"&&{hiddenLabel:true}}
              {...inputLabelMode==="relative"&&{label:label}}
              disabled={disabled}
              defaultValue={defaultValue}
              variant={variant}
              helperText={
                withoutHelperText ? undefined : error?.message ?? helperText ?? " "
              }
              InputProps={{readOnly: readonly
              }}
              sx={{
                ".MuiInputBase-root":{
                paddingRight:(theme)=>theme.spacing(2),
                },
                ...sx,
              }}
              {...itemProps}
              {...props}
            >
              {options?.map((option) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  id={option.value as string}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </>
      )}
    />
  );
};

export default UFSelect;
