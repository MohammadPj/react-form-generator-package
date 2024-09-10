import React, { FC } from 'react';
import {IDatePickerForm} from '../type';
import { Controller, UseFormReturn } from 'react-hook-form';
import CustomDatePicker from "../../custom-date-picker/CustomDatePicker.tsx";

type Props = IDatePickerForm & {
  form: UseFormReturn<any>;
  error: any;
}

const UFDatePicker: FC<Props> = ({
  form,
  rules,
  disabled,
  defaultValue,
  name,
  label,
  error,
  readonly,
  withoutHelperText,
  variant,
  inputLabelMode = 'static',
  props,
  sx,
  itemProps,
}) => {
  return (
    //ToDo date picker issue on grid should be resolved
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={defaultValue}
      render={({ field: { onChange, name, value } }) => (
        <>
          <CustomDatePicker
            readOnly={readonly}
            textFieldProps={{
              id: name,
              variant: variant,
              ...itemProps,
              sx: { width: '100%', ...sx },
            }}
            error={error}
            disabled={disabled}
            value={value}
            onChange={onChange}
            inputLabelMode={inputLabelMode}
            withoutHelperText={withoutHelperText}
            label={label as string}
            {...props}
          />
        </>
      )}
    />
  );
};

export default UFDatePicker;
