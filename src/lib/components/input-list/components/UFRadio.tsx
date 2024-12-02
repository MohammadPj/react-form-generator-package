import React, {FC} from "react";
import { IRadioForm } from "../type";
import { Controller, UseFormReturn } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useFormContext } from "../../../context/FormContext.tsx";
import { deepMerge } from "../../../methods/general.ts";

type TRadioProps = IRadioForm & {
  form: UseFormReturn<any>;
  error: any;
};

const UFRadio: FC<TRadioProps> = ({
  form,
  name,
  rules,
  disabled,
  defaultValue,
  options,
  error,
  helperText,
  withoutHelperText,
  label,
  labelProps,
  inputLabelMode,
  formControlLabelProps,
  radioProps,
  itemProps,
  radioGroupProps
}) => {
  const { theme } = useFormContext()

  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <FormControl sx={{ display: "block" }}>
          {inputLabelMode === "relative" && (
            <Typography {...labelProps}>{label}</Typography>
          )}
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={onChange}
            value={value}
            sx={{ gap: 5 }}
            {...deepMerge(
              theme?.radio?.radioGroupProps,
              radioGroupProps,
            )}
          >
            {options?.map((option) => (
              <FormControlLabel
                key={option.value}
                disabled={disabled}
                value={option.value}
                control={
                  <Radio
                    {...deepMerge(theme?.radio?.radioProps, itemProps, radioProps)}
                    checked={value === option.value}
                  />
                }
                label={
                  <Typography
                    fontWeight={400}
                    fontSize={12}
                    {...option.labelProp}
                  >
                    {option.label}
                  </Typography>
                }
                {...deepMerge(
                  theme?.radio?.formControlLabelProps,
                  formControlLabelProps,
                )}
              />
            ))}
          </RadioGroup>
          {!withoutHelperText && (
            <Typography
              sx={{
                display: "block",
                height: 23,
                width: "max-content",
                color: error ? "error.4" : "text.primary",
              }}
            >
              {error?.message ?? helperText ?? " "}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};

export default UFRadio;
