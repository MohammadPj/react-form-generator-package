import React, { ChangeEvent, FC } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import TextField from "@mui/material/TextField";
import {ITextFieldForm} from "../type";

type Props = ITextFieldForm & {
  form: UseFormReturn<any>;
  error: any;
}

export const p2e = (s: string) =>
  /^[0-9 | \u06F0-\u06F9\s][.\d | \u06F0-\u06F9\s]*(,\d+)?$/g.test(s)

export const checkIfNumber = (value: string) => {
  const charLength = value.length

  return !charLength || p2e(value)
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
    if (
      type === "number" &&
      !checkIfNumber(value)
    ) {

      e.preventDefault();
    } else {
      onChange(value);
    }
  };

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
          })}
          {...(inputLabelMode === "static" && { hiddenLabel: true })}
          {...(inputLabelMode === "relative" && { label: label })}
          value={field.value}
          variant={variant}
          type={type === "number" ? "text" : type}
          fullWidth
          id={name}
          error={!!error}
          placeholder={placeholder}
          onChange={(e) => handleKeyDown(e, field.onChange)}
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
