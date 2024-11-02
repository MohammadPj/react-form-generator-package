import React, { FC, useEffect, useState } from "react";
import DatePicker, { CalendarProps, DateObject } from "react-multi-date-picker";
import CustomComponent from "./CustomComponent";
import { BaseTextFieldProps } from "@mui/material/TextField/TextField";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TInputLabelMode } from "../input-list/type";
// import "./color.css";

export interface ICustomDatePickerProps extends CalendarProps {
  error: any;
  textFieldProps?: BaseTextFieldProps;
  inputLabelMode: TInputLabelMode;
  label: string;
  withoutHelperText?: boolean;
}

const CustomDatePicker: FC<ICustomDatePickerProps> = ({
  onChange,
  value,
  disabled,
  error,
  readOnly,
  textFieldProps,
  label,
  inputLabelMode,
  withoutHelperText,
  ...rest
}) => {
  const handleChange = (selectedDates: DateObject | null): void => {
    if (onChange && selectedDates) {
      const convertDate = new Date(selectedDates.toDate());

      onChange(convertDate as any);
    }
  };
  // let lang: string = document.documentElement.lang;
  let lang: string = 'fa';
  // const { palette } = useTheme();
  const [portalTarget, setPortalTaget] = useState<HTMLDivElement | undefined>();

  // useEffect(() => {
  //   setColors(palette);
  //   lang = document.documentElement.lang;
  // }, [palette.mode, document.documentElement.lang]);

  useEffect(() => {
    const portalDiv = document.createElement("div");
    portalDiv.id = "myPortalDiv";
    portalDiv.style.zIndex = "1500";
    portalDiv.style.position = "relative";
    document.body.appendChild(portalDiv);
    setPortalTaget(portalDiv);
    return () => {
      document.body.removeChild(portalDiv);
    };
  }, []);

  const defaultWeekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  return (
    <DatePicker
      className={"custom-calender"}
      value={value ? new Date(value as any) : null}
      portal
      portalTarget={portalTarget}
      hideOnScroll
      onChange={handleChange}
      {...(lang === "fa" && {
        weekDays: defaultWeekDays,
        calendar: persian,
        locale: persian_fa,
      })}
      calendarPosition="bottom-left"
      editable={false}
      disabled={disabled}
      containerStyle={{ width: "100%" }}
      {...rest}
      render={
        <CustomComponent
          lang={lang}
          error={error}
          disabled={disabled}
          readonly={readOnly}
          label={label}
          inputLabelMode={inputLabelMode}
          openCalendar={undefined}
          value={value}
          handleValueChange={undefined}
          withoutHelperText={withoutHelperText}
          {...textFieldProps}
        />
      }
    />
  );
};

export default CustomDatePicker;
//
// const setColors = (colors: PaletteOptions) => {
//   const {
//     primary: primaryThemeColor,
//     background: bgThemeColor,
//     text: textThemeColor,
//   } = colors;
//
//   const params = [
//     { className: "--rmdp-primary-theme", value: primaryThemeColor?.main },
//     { className: "--rmdp-secondary-theme", value: primaryThemeColor?.[2] },
//     { className: "--rmdp-shadow-theme", value: primaryThemeColor?.[1] },
//     { className: "--rmdp-today-theme", value: primaryThemeColor?.[5] },
//     { className: "--rmdp-hover-theme", value: primaryThemeColor?.[4] },
//     { className: "--rmdp-deselect-theme", value: primaryThemeColor?.[9] },
//     { className: "--rmdp-background-theme", value: bgThemeColor?.paper },
//     { className: "--rmdp-text-theme", value: textThemeColor?.primary },
//   ];
//   params?.forEach((param: any) =>
//     document.documentElement.style.setProperty(
//       param?.className!,
//       param?.value!,
//     ),
//   );
// };
