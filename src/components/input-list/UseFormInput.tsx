import React, { FC } from "react";

//@3rd Party
import { Controller } from "react-hook-form";
import { UseFormReturn } from "react-hook-form";
import { IUseFormInput } from "./type";
//----------------------------------------------------------------------------------------------

// @Components
import UFTextField from "./components/UFTextField";
import UFSelect from "./components/UFSelect";
import UFCheckbox from "./components/UFCheckbox";
import UFDatePicker from "./components/UFDatePicker";
import UFTextArea from "./components/UFTextArea";
import UfCurrency from "./components/UFCurrency";
import UFMultiSelect from "./components/UFMultiSelect";
import UFAutoComplete from "./components/UFAutoComplete";
import { TextFieldProps } from "@mui/material/TextField";
import UFRadio from "./components/UFRadio";
import CarLicencePlate from "./components/licence-plate/car-licencePlate/CarLicencePlate.tsx";
import MotorcycleLicencePlate from "./components/licence-plate/motorcycle-licencePlate/MotorcycleLicencePlate.tsx";
//---------------------------------------------------------------------------------------------------------

export interface IUseFormInputProps extends IUseFormInput {
  form: UseFormReturn<any>;
  error: any;
  itemProps?: any;
  inputVariants?: TextFieldProps["variant"];
}

const UseFormInput: FC<IUseFormInputProps> = ({
  name,
  label,
  type,
  options,
  form,
  error,
  placeholder,
  defaultValue,
  sx,
  rules,
  readonly,
  disabled,
  props,
  itemProps,
  helperText,
  isLoading,
  withoutHelperText,
  variant,
  inputLabelMode,
  inputVariants,
}) => {
  switch (type) {
    case "car-licencePlate":
      return (
        <Controller
          control={form?.control}
          name={name}
          rules={{ ...rules }}
          render={({ field: { onChange,  value } }) => (
            <CarLicencePlate
              disabled={disabled}
              onChange={onChange}
              tag={value}
              {...props}
            />
          )}
        />
      );

    case "motorcycle-licencePlate":
      return (
        <Controller
          control={form?.control}
          name={name}
          rules={{ ...rules }}
          render={({ field: { onChange,  value } }) => (
            <MotorcycleLicencePlate
              disabled={disabled}
              onChange={onChange}
              defaultValue={value}
              {...props}
            />
          )}
        />
      );

    case "radio":
      return (
        <UFRadio
          form={form}
          error={error}
          name={name}
          label={label}
          placeholder={placeholder}
          sx={sx}
          rules={rules}
          disabled={disabled}
          readonly={readonly}
          defaultValue={defaultValue}
          options={options}
          props={props}
          helperText={helperText}
          variant={variant ?? inputVariants}
          withoutHelperText={withoutHelperText}
          inputLabelMode={inputLabelMode}
        />
      );

    case "select":
      return (
        <UFSelect
          form={form}
          error={error}
          name={name}
          label={label}
          placeholder={placeholder}
          sx={sx}
          rules={rules}
          disabled={disabled}
          readonly={readonly}
          defaultValue={defaultValue}
          options={options}
          itemProps={itemProps}
          props={props}
          helperText={helperText}
          variant={variant ?? inputVariants}
          withoutHelperText={withoutHelperText}
          inputLabelMode={inputLabelMode}
        />
      );

    case "multi-select":
      return (
        <UFMultiSelect
          form={form}
          error={error}
          name={name}
          label={label}
          placeholder={placeholder}
          sx={sx}
          rules={rules}
          disabled={disabled}
          readonly={readonly}
          defaultValue={defaultValue}
          options={options}
          props={props}
          itemProps={itemProps}
          helperText={helperText}
          variant={variant ?? inputVariants}
          withoutHelperText={withoutHelperText}
          inputLabelMode={inputLabelMode}
        />
      );

    case "auto-complete":
      return (
        <UFAutoComplete
          form={form}
          error={error}
          name={name}
          label={label}
          placeholder={placeholder}
          sx={sx}
          rules={rules}
          disabled={disabled}
          readonly={readonly}
          defaultValue={defaultValue}
          options={options}
          props={props}
          itemProps={itemProps}
          isLoading={isLoading}
          helperText={helperText}
          variant={variant ?? inputVariants}
          withoutHelperText={withoutHelperText}
          inputLabelMode={inputLabelMode}
        />
      );

    case "checkbox":
      return (
        <UFCheckbox
          form={form}
          name={name}
          label={label}
          rules={rules}
          disabled={disabled}
          sx={sx}
          props={props}
          error={error}
          helperText={helperText}
          withoutHelperText={withoutHelperText}
          inputLabelMode={inputLabelMode}
        />
      );

    case "date-picker":
      return (
        <UFDatePicker
          form={form}
          error={error}
          name={name}
          label={label}
          rules={rules}
          disabled={disabled}
          readonly={readonly}
          defaultValue={defaultValue}
          props={props}
          sx={sx}
          itemProps={itemProps}
          helperText={helperText}
          variant={variant ?? inputVariants}
          withoutHelperText={withoutHelperText}
          inputLabelMode={inputLabelMode}
        />
      );

    case "text-area":
      return (
        <UFTextArea
          form={form}
          error={error}
          name={name}
          label={label}
          type={type}
          sx={sx}
          rules={rules}
          disabled={disabled}
          defaultValue={defaultValue}
          readonly={readonly}
          placeholder={placeholder}
          props={props}
          variant={variant ?? inputVariants}
          helperText={helperText}
          withoutHelperText={withoutHelperText}
          inputLabelMode={inputLabelMode}
        />
      );

    case "currency":
      return (
        <UfCurrency
          form={form}
          error={error}
          name={name}
          label={label}
          type={type}
          sx={sx}
          rules={rules}
          disabled={disabled}
          defaultValue={defaultValue}
          readonly={readonly}
          placeholder={placeholder}
          itemProps={itemProps}
          props={props}
          withoutHelperText={withoutHelperText}
          variant={variant ?? inputVariants}
          inputLabelMode={inputLabelMode}
        />
      );

    default:
      return (
        <UFTextField
          form={form}
          error={error}
          name={name}
          label={label}
          type={type}
          sx={sx}
          rules={rules}
          disabled={disabled}
          defaultValue={defaultValue}
          readonly={readonly}
          placeholder={placeholder}
          itemProps={itemProps}
          props={props}
          helperText={helperText}
          withoutHelperText={withoutHelperText}
          variant={variant ?? inputVariants}
          inputLabelMode={inputLabelMode}
        />
      );
  }
};

export default UseFormInput;
