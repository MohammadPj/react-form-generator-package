import { FC, useState } from "react";

//@3rd Party
import { Controller, UseFormReturn } from "react-hook-form";
import { IUseFormInput } from "../type";
//----------------------------------------------------------------------------------

//@Mui
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField, {TextFieldProps} from "@mui/material/TextField";

//----------------------------------------------------------------------------------

interface Props extends IUseFormInput {
  form: UseFormReturn<any>;
  error: any;
  itemProps?: TextFieldProps;
}

const UFMultiSelect: FC<Props> = ({
  form,
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
  itemProps,
  helperText,
  variant = "outlined",
  withoutHelperText,
  inputLabelMode,
  label,
}) => {
  const [optionValues, setOptionValues] = useState<any[]>([]);
  const selectedItems = (value: string) =>
    options?.find((option) => option?.value === value)?.label;
  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <>
          <FormControl fullWidth>
            {placeholder && (
                <InputLabel id='simple-select-label' sx={{
                    '&.MuiInputLabel-root[data-shrink=true]': {opacity: '0%'},
                    '&.MuiInputLabel-root[data-shrink=false]': {opacity: '100%'}
                }}>
                    {placeholder}
                </InputLabel>
            )}
            <TextField
              select
              labelid="simple-select-label"
              multiple
              {...(inputLabelMode === "static" && { hiddenLabel: true })}
              {...(inputLabelMode === "relative" && { label: label })}
              {...field}
              fullWidth
              value={optionValues}
              id={name}
              disabled={disabled}
              defaultValue={defaultValue}
              variant={variant}
              error={!!error}
              SelectProps={{
                multiple: true,
                value: optionValues,
                renderValue: (selected:any)=>(
                  <Stack
                    gap={1}
                    height={"100%"}
                    alignItems={"center"}
                    direction="row"
                    flexWrap="wrap"
                    sx={{
                      ...(optionValues.includes(selected) && {
                        backgroundColor: "background.main",
                      }),
                    }}
                  >
                    <Typography fontSize={12} fontWeight={400}>
                      {selected
                        .map((value: string) => selectedItems(value))
                        .join(",")}
                    </Typography>
                  </Stack>
                )
              }}
              inputProps={{ readOnly: readonly }}
              helperText={
                withoutHelperText ? undefined : error?.message ?? helperText ?? " "
              }
              sx={{
                ".MuiInputBase-root": {
                  paddingRight: '8px',
                },
                ...sx,
                pointerEvents: readonly ? "none" : "",
                backgroundColor: readonly ? "background.paper" : "unset",
                "& .MuiOutlinedInput-input.MuiSelect-select": {
                  backgroundColor: readonly ? "background.paper" : "unset",
                  color: readonly ? "text.disabled" : "unset",
                },
              }}
              {...props}
              {...itemProps}
            >
              {options?.map(({ label, value }) => {
                return (
                  <MenuItem
                    key={value}
                    value={value}
                    id={label}
                    sx={{ transition: "all 0.2s" }}
                    onClick={() => {
                      !optionValues.includes(value)
                        ? setOptionValues([value, ...optionValues])
                        : setOptionValues(
                            optionValues.filter(
                              (optionValue) => optionValue !== value,
                            ),
                          );
                    }}
                  >
                    <ListItemText
                      primary={label}
                      color={"red"}
                      sx={{ flex: "none", mx: "4px" }}
                      disableTypography
                    />
                  </MenuItem>
                );
              })}
            </TextField>
          </FormControl>
        </>
      )}
    />
  );
};

export default UFMultiSelect;
