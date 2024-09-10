import { GridProps } from '@mui/material/Grid';
import { SxProps } from '@mui/material';
import React, { ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { TypographyProps } from '@mui/material/Typography';
import { CustomAutocompleteProps } from '../custom-auto-complete/CustomAutoComplete';
import { TextFieldProps } from '@mui/material/TextField';
import { ICustomCheckboxProps } from './components/UFCheckbox';
import { ICustomDatePickerProps } from '../custom-date-picker/CustomDatePicker';
import { ICustomNumericInputProps } from '../custom-input/CustomNumericInput';
import { RadioProps } from '@mui/material/Radio';
import {CheckboxListProps} from "./checkbox-list/CheckboxList";

export interface IFormOption {
  value: string | number;
  label: string;
  labelProp?: any;
  disabled?: boolean;
}

interface IBaseForm {
  name: string;
  label: React.ReactNode;
  rules?: RegisterOptions;
  defaultValue?: any;
  placeholder?: string;
  gridItemProp?: GridProps;
  sx?: SxProps<any>;
  disabled?: boolean;
  readonly?: boolean;
  labelProps?: Partial<TypographyProps<'any', {}>> | undefined;
  helperText?: string;
  withoutHelperText?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  inputLabelMode?: TInputLabelMode;
}

interface IRadioForm extends IBaseForm {
  type?: 'radio';
  props?: RadioProps;
  options?: IFormOption[];
  itemProps?: RadioProps;
}

interface ISelectForm extends IBaseForm {
  type?: 'select';
  props?: TextFieldProps;
  itemProps?: TextFieldProps;
  options?: IFormOption[];
  // need menuProps
}

interface IMultiSelectForm extends IBaseForm {
  type?: 'multi-select';
  props?: TextFieldProps;
  itemProps?: TextFieldProps;
  options?: IFormOption[];
  // need menuProps
  // need stackProps
}

interface IAutoCompleteForm extends IBaseForm {
  type?: 'auto-complete';
  isLoading?: boolean;
  props?: Partial<CustomAutocompleteProps>;
  itemProps?: Partial<CustomAutocompleteProps>;
  options?: IFormOption[];
  onReachEnd?: () => void;
}

interface ICheckboxForm extends IBaseForm {
  type?: 'checkbox';
  props?: Partial<ICustomCheckboxProps>;
  itemProps?: Partial<ICustomCheckboxProps>;
}

interface IDatePickerForm extends IBaseForm {
  type?: 'date-picker';
  props?: Partial<ICustomDatePickerProps>;
  itemProps?: Partial<ICustomDatePickerProps>;
}

interface ITextAreaForm extends IBaseForm {
  type?: 'text-area';
  props?: Partial<TextFieldProps>;
  itemProps?: Partial<TextFieldProps>;
}

interface ICurrencyForm extends IBaseForm {
  type?: 'currency';
  props?: Partial<ICustomNumericInputProps>;
  itemProps?: Partial<ICustomNumericInputProps>;
  currencyIcon?: ReactNode;
}

interface IMultiCheckboxForm extends IBaseForm {
  options: IFormOption[];
  type?: 'multi-checkbox';
  multiple?: boolean;
  props?: Partial<Omit<CheckboxListProps, "multiple" | "options" | "onChange" | "value">>;
  itemProps?: Partial<Omit<CheckboxListProps, "multiple" | "options" | "onChange" | "value">>;
}

interface ITextFieldForm extends IBaseForm {
  type?: 'text' | 'email' | 'password' | 'phone' | 'number';
  props?: Partial<TextFieldProps>;
  itemProps?: Partial<TextFieldProps>;
}

export type typeTFormType =
  | 'car-licencePlate'
  | 'motorcycle-licencePlate'
  | 'text'
  | 'select'
  | 'multi-select'
  | 'auto-complete'
  | 'email'
  | 'password'
  | 'checkbox'
  | 'date-picker'
  | 'text-area'
  | 'phone'
  | 'number'
  | 'radio'
  | 'currency'
  | 'multi-checkbox';

export type TSchema =
  | ITextFieldForm
  | ICurrencyForm
  | ITextAreaForm
  | IDatePickerForm
  | ICheckboxForm
  | IAutoCompleteForm
  | IMultiSelectForm
  | ISelectForm
  | IRadioForm
  | IMotorLicencePlateForm
  | ICarLicencePlateForm
  | IMultiCheckboxForm;

export type TFormSchema = TSchema[]

// export interface IUseFormInput {
//   name: string;
//   label: React.ReactNode;
//   type?:
//     | 'car-licencePlate'
//     | 'motorcycle-licencePlate'
//     | 'text'
//     | 'select'
//     | 'multi-select'
//     | 'auto-complete'
//     | 'email'
//     | 'password'
//     | 'checkbox'
//     | 'date-picker'
//     | 'text-area'
//     | 'phone'
//     | 'number'
//     | 'radio'
//     | 'currency';
//   options?: IFormOption[];
//   rules?: RegisterOptions;
//   defaultValue?: any;
//   placeholder?: string;
//   gridItemProp?: GridProps;
//   sx?: SxProps;
//   disabled?: boolean;
//   readonly?: boolean;
//   props?: any;
//   labelProps?: Partial<TypographyProps<'any', {}>> | undefined;
//   helperText?: string;
//   withoutHelperText?: boolean;
//   isLoading?: boolean;
//   variant?: 'outlined' | 'filled' | 'standard';
//   inputLabelMode?: TInputLabelMode;
// }

export interface IWeekDays {
  id: number;
  dayName: string;
  dayNameEn: string;
  isActive: boolean;
}
export type TInputLabelMode = 'static' | 'relative';
