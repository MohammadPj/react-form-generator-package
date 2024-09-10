import React, { FC } from 'react';
import {
  CheckboxProps,
  FormControlLabel,
  Stack,
  StackProps,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { IFormOption } from '../type';

export interface ICheckboxValue {
  label: string;
  value: string | number;
}

export interface CheckboxListProps {
  options: IFormOption[];
  value?: ICheckboxValue[];
  onChange: (values: ICheckboxValue[]) => void;
  multiple?: boolean;

  stackProps?: StackProps;
  checkboxProps?: CheckboxProps;
  formControlLabelProps?: Omit<FormControlLabelProps, 'label' | 'control'>;
}
const CheckboxList: FC<CheckboxListProps> = ({
  options = [],
  value = [],
  onChange,
  multiple,

  checkboxProps,
  stackProps,
  formControlLabelProps,
}) => {
  // console.log('values', values)
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    changedValue: IFormOption,
  ) => {
    const newValues: ICheckboxValue[] = [...value];

    if (multiple) {
      if (event.target.checked) {
        newValues.push(changedValue);

        onChange(newValues);
      } else {
        const index = newValues.findIndex((v) => v.value === changedValue.value);

        newValues.splice(index, 1);

        onChange(newValues);
      }
    } else {
      if (event.target.checked) {
        onChange([changedValue]);
      } else {
        onChange([]);
      }
    }
  };

  return (
    <Stack {...stackProps}>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          control={
            <Checkbox
              {...checkboxProps}
              checked={value?.findIndex((v) => v.value === option.value) > -1}
              onChange={(e) => handleChange(e, option)}
            />
          }
          label={option.label}
          slotProps={{ typography: option?.labelProp }}
          {...formControlLabelProps}
        />
      ))}
    </Stack>
  );
};

export default CheckboxList;
