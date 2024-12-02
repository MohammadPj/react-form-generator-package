import React, { FC } from "react";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { Controller, UseFormReturn } from "react-hook-form";
import { IMultiCheckboxForm } from "../type";
import CheckboxList from "../checkbox-list/CheckboxList";
import { useFormContext } from "../../../context/FormContext.tsx";
import { deepMerge } from "../../../methods/general.ts";

type UFMultiCheckboxProps = IMultiCheckboxForm & {
  form: UseFormReturn<any>;
  error: any;
};

const UFMultiCheckbox: FC<UFMultiCheckboxProps> = ({
  form,
  error,
  rules,
  disabled,
  withoutHelperText,
  helperText,
  name,
  options,
  multiple,
  props,
  itemProps,
}) => {
  const { theme } = useFormContext()

  const multiCheckboxMergedProps = deepMerge(
    theme?.multiCheckbox?.multiCheckboxProps,
    itemProps,
    props,
  );

  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      render={({ field }) => (
        <FormControl
          sx={{ display: "flex", ...(disabled && { filter: "contrast(0.3)" }) }}
        >
          <CheckboxList
            multiple={multiple}
            options={options}
            {...field}
            {...multiCheckboxMergedProps}
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

export default UFMultiCheckbox;
