import { FC, ReactNode } from 'react';
import {
  AutocompleteRenderInputParams,
  InputAdornment,
  TextFieldVariants,
  useTheme,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import { TInputLabelMode } from '../../input-list/type';
import InfoCircle from "../../../assets/icons/InfoCircle";

interface Props {
  params: AutocompleteRenderInputParams;
  variant?: TextFieldVariants;
  placeholder?: string;
  validation?: {
    isInvalid: boolean;
    message: string;
  };
  inputLabelMode?: TInputLabelMode;
  label?: string | ReactNode;
  helperText?: string;
  isLoading?: boolean;
  textFieldProps?: TextFieldProps
  inputMaxHeight?: string;
}

const AutoCompleteInput: FC<Props> = ({
  params,
  variant,
  validation,
  placeholder,
  label,
  helperText,
  isLoading,
  inputLabelMode,
  textFieldProps,
  inputMaxHeight
}) => {
  const theme = useTheme();

  return (
    <TextField
      variant={variant}
      placeholder={placeholder}
      error={validation?.isInvalid}
      {...(inputLabelMode === 'relative' && { label: label })}
      {...params}
      helperText={
        validation?.message
          ? validation?.message ?? helperText ?? ' '
          : undefined
      }
      InputProps={{
        ...params.InputProps,
        ...(validation?.isInvalid && {
          startAdornment: (
            <InputAdornment sx={{ pl: 2 }} position='start'>
              <InfoCircle primarycolor={theme.palette.error.main} />
            </InputAdornment>
          ),
        }),
        endAdornment: (
          <InputAdornment position={'end'}>
            {isLoading && <CircularProgress color='inherit' size={20} />}
            {params.InputProps.endAdornment}
          </InputAdornment>
        ),
      }}
      {...textFieldProps}
      sx={{
        minWidth: 0,
        height: '100%',
        overflow: 'auto',
        '& .MuiFilledInput-root': {
          ...(inputLabelMode === 'relative' && {
            alignItems: 'flex-end',
          }),
        },
        maxHeight: inputMaxHeight ?? 'unset',
        ...textFieldProps?.sx,
      }}
    />
  );
};

export default AutoCompleteInput;
