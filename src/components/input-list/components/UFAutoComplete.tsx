import { FC, SyntheticEvent } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { IUseFormInput } from "../type";
import { TextFieldProps } from "@mui/material/TextField";
import CustomAutoComplete from "../../custom-auto-complete/CustomAutoComplete.tsx";

interface Props extends IUseFormInput {
  form: UseFormReturn<any>;
  error: any;
  itemProps?: TextFieldProps;
}

const UFAutoComplete: FC<Props> = ({
  form,
  label,
  error,
  placeholder,
  sx,
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
}) => {
  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <CustomAutoComplete
          {...field?.onBlur}
          label={label}
          hideLabel={true}
          placeholder={label ?? placeholder}
          inputLabelMode={inputLabelMode}
          helperText={error?.message ?? helperText}
          options={options || []}
          selectedOptions={field.value}
          sx={{ width: "100%", ...sx }}
          inputMaxHeight={"120px"}
          limitTags={2}
          validation={{ isInvalid: !!error, message: error?.message }}
          showSelectedCount
          disabled={disabled}
          id={name}
          readOnly={readonly}
          multiple
          variant={variant}
          isLoading={isLoading}
          disableCloseOnSelect
          isOptionEqualToValue={(option: any, value: any) => {
            return option.value === value.value;
          }}
          // renderOption={(
          //   props: HTMLAttributes<HTMLLIElement>,
          //   option: any,
          //   { selected }
          // ) => (
          //   <li style={{ direction: "rtl" }} {...props}>
          //     <Checkbox sx={{ mr: 2 }} checked={selected} />
          //     {option.label}
          //   </li>
          // )}
          onChange={(_e: SyntheticEvent<Element, Event>, newValue: any) => {
            field.onChange(newValue);
          }}
          {...props}
          {...itemProps}
        />
      )}
    />
  );
};

export default UFAutoComplete;
