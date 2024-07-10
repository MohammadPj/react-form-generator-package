import {FC, ReactNode} from 'react';
import {ChipProps} from "@mui/material";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Typography, {TypographyProps} from "@mui/material/Typography";

declare module '@mui/material/Chip' {
  interface ChipOwnProps {
    rounded?: boolean
  }

  interface ChipPropsSizeOverrides {
    large: true
  }
}

export interface CustomChipProps extends ChipProps {
  label: ReactNode;
  endIcon?: ReactNode;
  startIcon?: ReactNode;
  labelProps?: TypographyProps
  rounded?: boolean
}

const CustomChip: FC<CustomChipProps> = ({label, endIcon, startIcon, labelProps, rounded, ...restProps}) => {
  const isLarge = restProps.size === 'large'
  const {sx, ...props } = restProps

  return (
    <Chip
      sx={{...(rounded && {borderRadius: '9999px'}),...sx}}
      color={props.color}
      label={
        <Box display={"flex"} gap={2} alignItems={'center'}>
          <Box display={'flex'} id="custom-chip__start-icon">{startIcon}</Box>

          <Typography
            id="custom-chip__label"
            lineHeight={props.size === 'small' ? '24px' : 'normal'}
            fontSize={isLarge ? 14 : 12}
            fontWeight={isLarge ? 500 : 400}
            color={"#ffffff"}
            {...labelProps}>
            {label}
          </Typography>

          <Box display={'flex'} id="custom-chip__start-icon">{endIcon}</Box>
        </Box>
      }
      {...props}
    />
  );
};

export default CustomChip;
