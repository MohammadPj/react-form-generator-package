import React, { CSSProperties, FC, useMemo, useState } from "react";

//@3rd Party
//---------------------------------------------------------------------------

//@Mui
import Box, { BoxProps } from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { ClickAwayListener } from "@mui/material";
//---------------------------------------------------------------------------

interface Props {
  value?: string;
  valueLength: number;
  onChange: (value: string) => void;
  size?: number | "auto";
  gap?: number;
  inputStyle?: CSSProperties;
  activeInputStyle?: CSSProperties;
  onFinish?: (value: string, target: HTMLInputElement) => void;
  containerProp?: BoxProps;
  onBack?: (target: HTMLElement) => void;
  readonly?: boolean;
  disabled?: boolean;
  isError?: boolean;
}

const OTPInput: FC<Props> = ({
  valueLength,
  value,
  onChange,
  size = "auto",
  gap = 2,
  inputStyle,
  activeInputStyle,
  onFinish = () => {},
  onBack,
  containerProp,
  readonly = false,
  disabled = false,
  isError,
}) => {
  const theme = useTheme();
  const RE_DIGIT = new RegExp(/^\d+$/);

  const [activeInput, setActiveInput] = useState<number>();

  const valueItems = useMemo(() => {
    const valueArray = value ? value.split("") : [];
    const items: Array<string> = [];

    for (let i = 0; i < valueLength; i++) {
      const char = valueArray[i];

      if (RE_DIGIT.test(char)) {
        items.push(char);
      } else {
        items.push("");
      }
    }

    return items;
  }, [value, valueLength]);

  const focusToNextInput = (target: HTMLElement, newValue: string) => {
    const nextElementSibling = target?.parentElement?.nextElementSibling
      ?.children[0] as HTMLInputElement;

    if (nextElementSibling) {
      nextElementSibling.focus();
    } else {
      if (newValue) {
        onFinish(newValue || "", target as HTMLInputElement);
      }
    }
  };

  const focusToPrevInput = (target: HTMLElement) => {
    const previousElementSibling = target?.parentElement?.previousElementSibling
      ?.children[0] as HTMLInputElement | null;

    if (previousElementSibling) {
      previousElementSibling.focus();
    } else {
      if (onBack) {
        onBack(target);
      }
    }
  };

  const inputOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const target = e.target;

    let targetValue = target.value;
    const isTargetValueDigit = RE_DIGIT.test(targetValue);

    if (!isTargetValueDigit && targetValue !== "") {
      return;
    }

    const nextInputEl = target?.parentElement?.nextElementSibling
      ?.children[0] as HTMLInputElement | null;

    // only delete digit if next input element has no value
    if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== "") {
      return;
    }

    targetValue = isTargetValueDigit ? targetValue : " ";

    const targetValueLength = targetValue.length;

    if (targetValueLength === 1) {
      const newValue =
        value?.substring(0, idx) + targetValue + value?.substring(idx + 1);

      onChange(newValue);

      if (!isTargetValueDigit) {
        return;
      }

      focusToNextInput(target, newValue);
    } else if (targetValueLength === valueLength) {
      onChange(targetValue);

      target.blur();
    }
  };

  const inputOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;

    if (key === "ArrowRight" || key === "ArrowDown") {
      e.preventDefault();
      return focusToNextInput(target, "");
    }

    if (key === "ArrowLeft" || key === "ArrowUp") {
      e.preventDefault();
      return focusToPrevInput(target);
    }

    const targetValue = target.value;

    // keep the selection range position
    // if the same digit was typed
    target.setSelectionRange(0, targetValue.length);

    if (e.key !== "Backspace" || target.value !== "") {
      return;
    }

    focusToPrevInput(target);
  };

  const inputOnFocus = (e: React.FocusEvent<HTMLInputElement>, idx: number) => {
    const { target } = e;
    setActiveInput(idx);

    // keep focusing back until previous input
    // element has value
    const prevInputEl = target?.parentElement?.previousElementSibling
      ?.children[0] as HTMLInputElement | null;

    if (prevInputEl && prevInputEl.value === "") {
      return prevInputEl.focus();
    }

    target.setSelectionRange(0, target.value.length);
  };

  return (
    <Box
      id="otp-box-input"
      display={"flex"}
      flexDirection={"row-reverse"}
      gap={gap}
      borderColor={isError ? "red" : theme.palette.background.default}
      {...containerProp}
    >
      {valueItems.map((digit, idx: number) => (
        <ClickAwayListener
          key={idx}
          // sx={{ border: "1px solid" }}
          onClickAway={(e) => {
            if (idx === activeInput) {
              // @ts-ignore
              if (e?.target?.tagName !== "INPUT") {
                setActiveInput(undefined);
              }
            }
          }}
        >
          <Box
            key={idx}
            position={"relative"}
            width={size === "auto" ? "100%" : size}
            height={size === "auto" ? "100%" : size}
            display={"flex"}
            borderColor={"inherit"}
            sx={{
              "& input:focus-visible": {
                outline: "none"
              }
            }}
          >
            <input
              disabled={disabled}
              readOnly={readonly}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              maxLength={valueLength}
              style={
                activeInput === idx
                  ? {
                      width: "100%",
                      height: "100%",
                      borderColor: "inherit",
                      borderRadius: 6,
                      fontFamily: "iran-sans",
                      border: "1px solid",
                      textAlign: "center",
                      fontWeight: 500,
                      backgroundColor: theme.palette.background["paper"],
                      ...inputStyle,
                      ...activeInputStyle,
                    }
                  : {
                      width: "100%",
                      height: "100%",
                      border: "1px solid",
                      textAlign: "center",
                      borderColor: "inherit",
                      borderRadius: 6,
                      fontFamily: "iran-sans",
                      fontWeight: 500,
                      backgroundColor: theme.palette.background["paper"],
                      ...inputStyle,
                    }
              }
              value={digit}
              onChange={(e) => inputOnChange(e, idx)}
              onKeyDown={inputOnKeyDown}
              onFocus={(e) => inputOnFocus(e, idx)}
            />

            <Divider
              sx={{
                width: "40%",
                position: "absolute",
                bottom: "20%",
                left: "50%",
                transform: "translate(-50%, 50%)",
                // borderColor: (theme) => theme.palette.primary.back,
              }}
            />
          </Box>
        </ClickAwayListener>
      ))}
    </Box>
  );
};

export default OTPInput;
