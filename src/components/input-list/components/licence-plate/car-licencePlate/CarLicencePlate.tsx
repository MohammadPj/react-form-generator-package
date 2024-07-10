import React, { FC, useEffect, useRef } from "react";
import Box, { BoxProps } from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import { Select, SelectChangeEvent } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import OTPInput from "../../../../otp-input/OTPInput";
import LicenceLabel from "../../../../../assets/images/LicenceLabel.svg";

export interface ICarLicencePlate {
  firstNumber?: string;
  secondNumber?: string;
  type?: string;
  region?: string;
}

interface Props {
  readonly?: boolean;
  disabled?: boolean;
  onChange?: (tag: ICarLicencePlate) => void;
  onFinish?: (tag: ICarLicencePlate) => void;
  tag?: ICarLicencePlate;
  boxProp?: BoxProps;
  width?: number | string;
  height?: number;
  maxWidth?: number | any;
  isError?: boolean;
}

const CarLicencePlate: FC<Props> = ({
  readonly = false,
  disabled = false,
  onChange,
  onFinish,
  tag,
  boxProp,
  height = 50,
  width,
  maxWidth,
  isError,
}) => {
  const theme = useTheme();
  const selectRef = useRef<HTMLInputElement>();
  const boxRef = useRef<any>(null);

  const form = useForm<ICarLicencePlate>({
    defaultValues: { type: "" },
    values: tag,
  });

  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent<any>) => {
    form.setValue("type", event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const checkCondition = () => {
    return (
      form.watch("type") &&
      form.watch("firstNumber")?.length === 2 &&
      form.watch("secondNumber")?.length === 3 &&
      form.watch("region")?.length === 2
    );
  };

  const licenceTypes = [
    { label: "الف", value: "الف" },
    { label: "ب", value: "ب" },
    { label: "پ", value: "پ" },
    { label: "ت", value: "ت" },
    { label: "ث", value: "ث" },
    { label: "ج", value: "ج" },
    { label: "ح", value: "ح" },
    { label: "د", value: "د" },
    { label: "ر", value: "ر" },
    { label: "ز", value: "ز" },
    { label: "ژ", value: "ژ" },
    { label: "س", value: "س" },
    { label: "ش", value: "ش" },
    { label: "ص", value: "ص" },
    { label: "ض", value: "ض" },
    { label: "ط", value: "ط" },
    { label: "ظ", value: "ظ" },
    { label: "ع", value: "ع" },
    { label: "ف", value: "ف" },
    { label: "ق", value: "ق" },
    { label: "ک", value: "ک" },
    { label: "گ", value: "گ" },
    { label: "ل", value: "ل" },
    { label: "م", value: "م" },
    { label: "ن", value: "ن" },
    { label: "و", value: "و" },
    { label: "ه", value: "ه" },
    { label: "ی", value: "ی" },
    { label: "D", value: "D" },
    { label: "S", value: "S" },
    { label: "معلولین", value: "معلولین" },
  ];

  useEffect(() => {
    if (onChange && checkCondition()) {
      onChange(form.getValues());
    }
  }, [form.watch("type")]);

  const handleChangeFirstNumber = (value: string) => {
    form?.setValue("firstNumber", value);
    if (onChange && checkCondition()) {
      onChange(form.getValues());
    }
  };

  const handleChangeSecondNumber = (value: string) => {
    form?.setValue("secondNumber", value);
    if (onChange && checkCondition()) {
      onChange(form.getValues());
    }
  };

  const handleChangeRegion = (value: string) => {
    form?.setValue("region", value);
    if (onChange && checkCondition()) {
      onChange(form.getValues());
    }
  };

  const handleFocusPrvsInput = (target: HTMLElement) => {
    const input = target?.parentElement?.parentElement?.previousElementSibling
      ?.previousElementSibling?.lastElementChild
      ?.children[0] as HTMLInputElement;
    input.focus();
  };

  const handleFocusNextInput = (target: HTMLElement) => {
    const targetIndex = Array.prototype.indexOf.call(
      target.closest("#otp-box-input")?.parentElement?.children,
      target?.parentElement?.parentElement,
    );
    let input;
    if (targetIndex === 4) {
      input = target?.closest("#CarTag")?.parentElement?.nextElementSibling
        ?.children[0]?.children[0]?.children[1]?.children[0]
        ?.children[0] as HTMLInputElement;
    } else {
      input = target?.parentElement?.parentElement?.nextElementSibling
        ?.nextElementSibling?.children[0]?.children[0] as HTMLInputElement;
    }

    input.focus();
  };

  const handleFocusFromSecondNumberToType = (target: HTMLElement) => {
    setOpen(true);
    handleFocusPrvsInput(target);
  };

  const handleFocusFromSecondNumberToRegion = (
    _value: string,
    target: HTMLInputElement,
  ) => {
    handleFocusNextInput(target);
  };

  const handleFinishFirstNumber = (_value: string, target: HTMLInputElement) => {
    setOpen(true);

    handleFocusNextInput(target);
  };

  return (
    <Box
      id="CarTag"
      width={width || "100%"}
      maxWidth={maxWidth}
      height={height}
      display={"flex"}
      borderRadius={height / 10 + "px"}
      border={"0.5px solid #727CF4"}
      bgcolor={"#F9F9F9"}
      position={"relative"}
      pr={height / 1.5 + "px"}
      pl={'8px'}
      sx={{ boxShadow: "inset -4px 4px 4px rgba(94, 129, 233, 0.2)" }}
      overflow={"hidden"}
      ref={boxRef}
      {...boxProp}
    >
      <Box display={"flex"} gap={"2%"} flexDirection={"row-reverse"}>
        <OTPInput
          value={form.watch("firstNumber") || ""}
          valueLength={2}
          onChange={handleChangeFirstNumber}
          onFinish={handleFinishFirstNumber}
          containerProp={{ py: height / 10 + "px", gap: "10%" }}
          readonly={readonly}
          disabled={disabled}
          isError={isError}
        />

        <FormControl sx={{ minWidth: "25%", py: height / 10 + "px" }}>
          <Select
            ref={selectRef}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={form.watch("type")}
            onChange={handleChange}
            readOnly={readonly}
            disabled={disabled}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 250,
                  // width: 50,
                },
              },
            }}
            sx={{
              minWidth: 50,
              "& fieldset": {
                borderColor: isError ? "red !important" : `black !important`,
              },
              height: "100%",
              "& .MuiSelect-select": {
                height: "100%",
                display: "flex",
                alignItems: "center",
                py: "0px !important",
                px: `10% !important`,
              },
              "& svg": {
                minWidth: 7,
                width: "10%",
                right: "10%",
                top: "50%",
                height: "auto"
              },
            }}
          >
            {licenceTypes.map((type, index: number) => (
              <MenuItem key={index} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <OTPInput
          value={form.watch("secondNumber") || ""}
          valueLength={3}
          onChange={handleChangeSecondNumber}
          onFinish={handleFocusFromSecondNumberToRegion}
          containerProp={{ py: height / 10 + "px", gap: "5%" }}
          onBack={handleFocusFromSecondNumberToType}
          readonly={readonly}
          disabled={disabled}
          isError={isError}
        />

        <Divider
          orientation={"vertical"}
          sx={{
            borderColor: theme.palette.primary.main,
            height: "100%",
          }}
        />

        <OTPInput
          value={form.watch("region") || ""}
          valueLength={2}
          onChange={handleChangeRegion}
          onFinish={() => (onFinish ? onFinish(form.getValues()) : {})}
          containerProp={{ py: height / 10 + "px", gap: "10%" }}
          onBack={handleFocusPrvsInput}
          readonly={readonly}
          disabled={disabled}
          isError={isError}
        />
      </Box>

      <Box
        display={"flex"}
        position={"absolute"}
        right={0}
        height={"100%"}
        flexDirection={"row-reverse"}
      >
        <img height={"105%"} src={LicenceLabel} alt={""} />
      </Box>
    </Box>
  );
};

export default CarLicencePlate;
