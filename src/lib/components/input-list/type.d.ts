import { GridProps } from '@mui/material/Grid';
import React, { ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';
import { TypographyProps } from '@mui/material/Typography';
import { CustomAutocompleteProps } from '../custom-auto-complete/CustomAutoComplete';
import { TextFieldProps } from '@mui/material/TextField';
import { ICustomCheckboxProps } from './components/UFCheckbox';
import { ICustomNumericInputProps } from '../custom-input/CustomNumericInput';
import { RadioProps } from '@mui/material/Radio';
import {CheckboxListProps} from "./checkbox-list/CheckboxList";
import {ICustomUploaderProps} from "../custom-uploader/CustomUploader";
import {ICustomDatePickerProps} from "../custom-date-picker/CustomDatePicker.tsx";
import {RadioGroupProps} from "@mui/material";
import {FormControlLabelProps} from "@mui/material/FormControlLabel";

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
  labelProps?: Partial<TypographyProps<'any'>> | undefined;
  helperText?: string;
  withoutHelperText?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  inputLabelMode?: TInputLabelMode;
  disabled?: boolean
  readonly?: boolean
}

interface IRadioForm extends IBaseForm {
  type?: 'radio';
  radioProps?: RadioProps;
  radioGroupProps?: Partial<RadioGroupProps>
  formControlLabelProps?: Partial<FormControlLabelProps>
  options?: IFormOption[];
  itemProps?: RadioProps;
}

interface ISelectForm extends IBaseForm {
  type?: 'select';
  props?: TextFieldProps;
  itemProps?: TextFieldProps;
  options?: IFormOption[];
}

interface IMultiSelectForm extends IBaseForm {
  type?: 'multi-select';
  props?: Partial<TextFieldProps>;
  itemProps?: Partial<TextFieldProps>;
  options?: IFormOption[];
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
  formControlLabelProps?: Partial<FormControlLabelProps>
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

interface IUploaderForm extends IBaseForm {
  type?: "uploader",
  multiple?: boolean;
  onDelete?: (index: number) => void
  props?: Partial<ICustomUploaderProps>
  itemProps?: Partial<ICustomUploaderProps>
}

interface ITextFieldForm extends IBaseForm {
  type?: 'text' | 'email' | 'password' | 'phone' | 'number';
  props?: Partial<TextFieldProps>;
  itemProps?: Partial<TextFieldProps>;
}

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
  | IUploaderForm
  | IMultiCheckboxForm;

export type TFormSchema = TSchema[]

export type TFormTheme = {
  text?: Partial<TextFieldProps>;
  email?: Partial<TextFieldProps>;
  password?:Partial<TextFieldProps>;
  phone?: Partial<TextFieldProps>;
  number?: Partial<TextFieldProps>;
  uploader?: {
    uploaderProps?: Partial<ICustomUploaderProps>;
  }
  multiCheckbox?:  {
    multiCheckboxProps?: Partial<Omit<CheckboxListProps, "multiple" | "options" | "onChange" | "value">>;
  }
  currency?: {
    currencyProps?: Partial<ICustomNumericInputProps>;
  }
  textArea?: {
    textAreaProps?: Partial<TextFieldProps>;
  }
  datePicker?: {
    datePickerProps?: Partial<ICustomDatePickerProps>;
  }
  checkbox?: {
    checkboxProps?: Partial<ICustomCheckboxProps>;
    formControlLabelProps?: Partial<FormControlLabelProps>
  }
  autoComplete?:{
    autoCompleteProps?: Partial<CustomAutocompleteProps>;
  }
  multiSelect?: {
    multiSelectProps?: Partial<TextFieldProps>;
  }
  'select'?: {
    selectProps: Partial<TextFieldProps>;
  }
  radio?: {
    radioProps?: Partial<RadioProps>;
    radioGroupProps?: Partial<RadioGroupProps>
    formControlLabelProps?: Partial<FormControlLabelProps>
  }
}

export type TInputLabelMode = 'static' | 'relative';
