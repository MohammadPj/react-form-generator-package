import React, { ChangeEvent, FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { IUseFormInput } from "../type";

interface Props extends IUseFormInput {
  form: UseFormReturn<any>;
  error: any;
  itemProps?: TextFieldProps;
}

const UFTextField: FC<Props> = ({
  form,
  name,
  type,
  defaultValue,
  label,
  sx,
  rules,
  readonly,
  disabled,
  placeholder,
  error,
  itemProps,
  props,
  helperText,
  variant = "outlined",
  withoutHelperText,
  inputLabelMode,
}) => {
  const handleKeyDown = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    onChange: any,
  ) => {
    const value = e?.target?.value;
    const checkFirstLetter = value === "";
    if (
      type === "number" &&
      !checkFirstLetter &&
      !/^-?\d*\.?\d*$/.test(value)
    ) {
      e.preventDefault();
    } else {
      onChange(value);
    }
  };
  //This can be used when you want to show white space error
  // const trapSpacesForRequiredFields = (value: any) => {
  //   if (rules?.required) {
  //     return !!value.trim()
  //   } else return
  // }
  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={defaultValue || ""}
      render={({ field }) => (
        <TextField
          {...form?.register(name, {
            ...rules,
            //This can be used when you want to show white space error
            // pattern: {
            //   ...rules?.pattern,
            //   message: 'مقدار ورودی نمی تواند فضای خالی باشد',
            //   value: /^\S*$/,
            // },
            // validate: value => trapSpacesForRequiredFields(value),
          })}
          {...(inputLabelMode === "static" && { hiddenLabel: true })}
          {...(inputLabelMode === "relative" && { label: label })}
          value={field.value}
          variant={variant}
          onChange={(e) => handleKeyDown(e, field.onChange)}
          type={type === "number" ? "text" : type}
          fullWidth
          id={name}
          error={!!error}
          placeholder={placeholder}
          sx={{
            ...sx,
          }}
          helperText={
            withoutHelperText ? undefined : error?.message ?? helperText ?? " "
          }
          aria-readonly={readonly}
          disabled={disabled}
          inputProps={{ readOnly: readonly }}
          {...itemProps}
          {...props}
        />
      )}
    />
  );
};

export default UFTextField;
