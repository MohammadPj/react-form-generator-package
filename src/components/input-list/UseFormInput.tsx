import { FC } from 'react';

//@3rd Party
import { UseFormReturn } from 'react-hook-form';
import {
  IAutoCompleteForm,
  ICheckboxForm,
  ICurrencyForm,
  IDatePickerForm,
  IMultiCheckboxForm,
  IMultiSelectForm,
  IRadioForm,
  ISelectForm,
  ITextAreaForm,
  ITextFieldForm,
  TSchema,
} from './type';
//----------------------------------------------------------------------------------------------

// @Components
import { UFTextField } from '../index';
import { UFSelect } from '../index';
import { UFCheckbox } from '../index';
import { UFDatePicker } from '../index';
import { UFTextArea } from '../index';
import { UFCurrency } from '../index';
import { UFMultiSelect } from '../index';
import { UFAutoComplete } from '../index';
import { UFRadio } from '../index';
import { UFMultiCheckbox } from '../index';
import { TextFieldProps } from '@mui/material/TextField';

//---------------------------------------------------------------------------------------------------------

type IUseFormInputProps = TSchema & {
  form: UseFormReturn<any>;
  error?: any;
  inputVariants?: TextFieldProps['variant'];
};

const UseFormInput: FC<IUseFormInputProps> = ({
  form,
  error,
  inputVariants,
  type,
  ...inputFormProps
}) => {
  switch (type) {

    case 'radio':
      return (
        <UFRadio
          {...(inputFormProps as IRadioForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );

    case 'select':
      return (
        <UFSelect
          {...(inputFormProps as ISelectForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );

    case 'multi-select':
      return (
        <UFMultiSelect
          {...(inputFormProps as IMultiSelectForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );

    case 'auto-complete':
      return (
        <UFAutoComplete
          {...(inputFormProps as IAutoCompleteForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );

    case 'checkbox':
      return (
        <UFCheckbox
          {...(inputFormProps as ICheckboxForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );

    case 'date-picker':
      return (
        <UFDatePicker
          {...(inputFormProps as IDatePickerForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );

    case 'text-area':
      return (
        <UFTextArea
          {...(inputFormProps as ITextAreaForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );

    case 'currency':
      return (
        <UFCurrency
          {...(inputFormProps as ICurrencyForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );

    case 'multi-checkbox':
      return (
        <UFMultiCheckbox
          {...(inputFormProps as IMultiCheckboxForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );

    default:
      return (
        <UFTextField
          {...(inputFormProps as ITextFieldForm)}
          form={form}
          error={error}
          variant={inputFormProps.variant ?? inputVariants}
        />
      );
  }
};

export default UseFormInput;
