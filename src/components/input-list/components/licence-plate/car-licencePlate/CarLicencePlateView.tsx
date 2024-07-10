import React, { FC, useEffect, useState } from "react";
import { ICarLicencePlate } from "./CarLicencePlate";
import Box from "@mui/material/Box";
import Typography, { TypographyProps } from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";
import LicenceLabel from "../../../assets/images/LicenceLabel.svg";
import IranLabel from "../../../assets/images/iran-label.svg";

interface Props {
  licencePlate: ICarLicencePlate;
  typoProps?: TypographyProps;
  width?: number | string;
}

const CarLicencePlateView: FC<Props> = ({
  licencePlate,
  width = 194,
  typoProps,
}) => {
  const [boxElement, setBoxElement] = useState<HTMLElement | null>(null);

  const widthRef = boxElement?.clientWidth || 194;
  const height = (widthRef * 36) / 194;
  const fontSize = height - height * 0.1;

  useEffect(() => {
    const boxEl = document.getElementById("car-licence-plate-view");
    setBoxElement(boxEl);
  }, [width]);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      flexWrap={"nowrap"}
      width={width}
      sx={{ aspectRatio: 190 / 36}}
      minHeight={36}
      border={"2px solid"}
      borderRadius={widthRef / 200}
      style={{ direction: "ltr" }}
      id={"car-licence-plate-view"}
      overflow={"hidden"}
    >
      {/*@ts-ignore*/}
      <img height={"105%"} src={LicenceLabel?.src || LicenceLabel} alt={""} />
      <Box
        display={"flex"}
        gap={1}
        alignItems={"center"}
        justifyContent={"center"}
        flexGrow={1}
      >
        <Typography
          lineHeight={1}
          fontSize={fontSize}
          fontWeight={500}
          color={"#303030"}
          {...typoProps}
        >
          {licencePlate.firstNumber}
        </Typography>

        <Typography
          lineHeight={1}
          fontSize={fontSize - 8}
          fontWeight={500}
          mb={height * 0.1}
          color={"#303030"}
          {...typoProps}
        >
          {licencePlate.type}
        </Typography>

        <Typography
          lineHeight={1}
          fontSize={fontSize}
          fontWeight={500}
          color={"#303030"}
          {...typoProps}
        >
          {licencePlate.secondNumber}
        </Typography>
      </Box>

      <Divider
        flexItem
        orientation={"vertical"}
        sx={{ borderWidth: "1px", borderColor: "black" }}
      />

      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
        width={height}
        position={"relative"}
      >
        <img
          width={"80%"}
          // @ts-ignore
          src={IranLabel?.src || IranLabel}
          alt={"label-iran"}
          style={{ position: "absolute", top: height * 0.05 }}
        />

        <Typography
          lineHeight={1}
          fontSize={fontSize}
          fontWeight={500}
          mt={height * 0.05}
          color={"#303030"}
          {...typoProps}
        >
          {licencePlate.region}
        </Typography>
      </Stack>
    </Box>
  );
};

export default CarLicencePlateView;
