import React, {FC, ReactNode, useEffect, useState} from "react";
import TextField, { TextFieldProps} from "@mui/material/TextField";

export interface ICustomNumericInputProps extends Omit<TextFieldProps, "onChange" | "value"> {
  onChange?: (value: string | number) => void;
  value?: string | number;
  currencyIcon?: ReactNode
}

const CustomNumericInput: FC<ICustomNumericInputProps> = ({ onChange, value, ...props }) => {
  useEffect(() => {
    setCustomValue(formatAsCurrency(value));
  }, [value]);
  const [customValue, setCustomValue] = useState(formatAsCurrency(value));

  function formatAsCurrency(number?: string | number) {
    // Use toLocaleString to format the number as currency
    return number?.toLocaleString(); // Remove 'USD' and a space at the beginning
  }

  function convertCurrencyToNumber(currencyString: string) {
    // Replace Persian numerals with Arabic numerals
    const numericString = currencyString.replace(/[۰-۹]/g, (match) =>
      String.fromCharCode(match.charCodeAt(0) - 1728),
    );

    // Remove all non-numeric characters except for the decimal point
    const sanitizedNumericString = numericString.replace(/[^0-9.]/g, "");

    // Parse the numeric string to a floating-point number
    const numberValue = parseFloat(sanitizedNumericString);

    // Check if the parsed value is a valid number (not NaN)
    return isNaN(numberValue) ? "" : numberValue;
  }

  const handleChange = (e: any) => {
    const value = e.target.value;

    setCustomValue(formatAsCurrency(convertCurrencyToNumber(value)));

    if (onChange) {
      onChange(convertCurrencyToNumber(value));
    }
  };

  return (
    <>
      <TextField
        fullWidth
        className={"numeric-input"}
        value={customValue}
        onChange={handleChange}
        {...props}
      />
    </>
  );
};

export default CustomNumericInput;
