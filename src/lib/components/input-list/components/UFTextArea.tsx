import React, { FC } from 'react';
import { ITextAreaForm } from '../type';
import { Controller, UseFormReturn } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import {useFormContext} from "../../../context/FormContext.tsx";
import {deepMerge} from "../../../methods/general.ts";

type Props = ITextAreaForm & {
  form: UseFormReturn<any>;
  error: any;
};

const UFTextArea: FC<Props> = ({
  form,
  name,
  type,
  defaultValue,
  rules,
  readonly,
  disabled,
  placeholder,
  error,
  props,
  helperText,
  variant = 'outlined',
  withoutHelperText,
  inputLabelMode,
  label,
}) => {
  const {theme} = useFormContext() || {}

  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={defaultValue || ''}
      render={({ field: { name, value } }) => (
        <TextField
          {...form?.register(name, {
            ...rules,
          })}
          type={type}
          value={value}
          {...(inputLabelMode === 'static' && { hiddenLabel: true })}
          {...(inputLabelMode === 'relative' && { label: label })}
          fullWidth
          multiline
          rows={3}
          id={name}
          error={!!error}
          placeholder={placeholder}
          helperText={
            withoutHelperText ? undefined : error?.message ?? helperText ?? ' '
          }
          aria-readonly={readonly}
          disabled={disabled}
          variant={variant}
          inputProps={{ readOnly: readonly }}
          {...deepMerge(theme?.textArea?.textAreaProps, props)}
        />
      )}
    />
  );
};

export default UFTextArea;
