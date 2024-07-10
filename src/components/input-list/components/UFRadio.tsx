import React, { FC } from "react";
import { IUseFormInput } from "../type";
import { Controller, UseFormReturn } from "react-hook-form";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import Radio, { RadioProps } from "@mui/material/Radio";

interface Props extends IUseFormInput {
  form: UseFormReturn<any>;
  error: any;
  props: RadioProps;
}

const UFRadio: FC<Props> = ({
  form,
  name,
  rules,
  disabled,
  sx,
  defaultValue,
  options,
  error,
  helperText,
  withoutHelperText,
  props,
}) => {
  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      defaultValue={defaultValue}
      render={({ field: { onChange,  value } }) => (
        <FormControl sx={{ display: "block" }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={onChange}
            value={value}
            sx={{ gap: 5 }}
          >
            {options?.map((option) => (
              <FormControlLabel
                key={option.value}
                disabled={disabled}
                value={option.value}
                sx={sx}
                control={<Radio {...props} />}
                label={
                  <Typography
                    fontWeight={400}
                    fontSize={12}
                    {...option.labelProp}
                  >
                    {option.label}
                  </Typography>
                }
              />
            ))}
          </RadioGroup>
          {!withoutHelperText && (
            <Typography
              fontSize={12}
              fontWeight={400}
              sx={{
                display: "block",
                height: 23,
                width: "max-content",
                color: error ? "error.main" : "text.primary",
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
