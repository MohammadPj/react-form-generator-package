import { FC } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import {IAutoCompleteForm, IFormOption} from '../type';
import CustomAutoComplete from "../../custom-auto-complete/CustomAutoComplete";
import {deepMerge} from "../../../methods/general.ts";
import {useFormContext} from "../../../context/FormContext.tsx";

type Props = IAutoCompleteForm & {
  form: UseFormReturn<any>;
  error: any;
}

const UFAutoComplete: FC<Props> = ({
  form,
  label,
  error,
  placeholder,
  rules,
  disabled,
  name,
  options,
  defaultValue,
  readonly,
  props,
  helperText,
  isLoading = false,
  inputLabelMode,
  variant,
  itemProps,
  onReachEnd
}) => {

  const {theme} = useFormContext()

  // Convert defaultValue if it's an array of strings
  const convertDefaultValue = (defaultValue: any,options?:IFormOption[]) => {
    // Check if options are undefined or null, return an empty array or default value
    if (!options || !Array.isArray(options)) {
      return [];  // or some other default value
    }

    // Convert value to corresponding object with label and value
    if (Array.isArray(defaultValue)) {
      return defaultValue.map(val => {
        const matchedOption = options.find(option => option.value === val);
        return matchedOption ? matchedOption : null;
      }).filter(Boolean);
    } else {
      const matchedOption = options.find(option => option.value === defaultValue);
      return matchedOption ? matchedOption : null;
    }

  };
  
  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={convertDefaultValue(defaultValue,options)}
      render={({ field }) => (
        <CustomAutoComplete
          {...field}
          label={label}
          hideLabel={true}
          placeholder={typeof label === "string" ? label : placeholder}
          inputLabelMode={inputLabelMode}
          helperText={error?.message ?? helperText}
          options={options || []}
          selectedOptions={field.value}
          value={convertDefaultValue(field?.value,options) as any}
          sx={{ width: '100%' }}
          inputMaxHeight={'120px'}
          limitTags={2}
          validation={{ isInvalid: !!error, message: error?.message }}
          disabled={disabled}
          id={name}
          readOnly={readonly}
          variant={variant}
          isLoading={isLoading}
          isOptionEqualToValue={(option: any, value: any) => {
            return option?.value === value?.value;
          }}
          onReachEnd={onReachEnd}
          onChange={(_: any, newValue: any) => {

            const isMultiple = Array.isArray(newValue);

            if (isMultiple) {
              // Handle multiple selection
              const valuesArray = newValue.map(item => item.value);
              field.onChange(valuesArray);
            } else {
              // Handle single selection
              field.onChange(newValue ? newValue.value : "");
            }
          }}
          {...deepMerge(theme?.autoComplete?.autoCompleteProps, itemProps, props)}
        />
      )}
    />
  );
};

export default UFAutoComplete;
