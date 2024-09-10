import { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
import { TextFieldProps } from '@mui/material/TextField';
import { TextFieldVariants } from '@mui/material';
import CustomChip from '../custom-chip/CustomChip';
import { IFormOption, TInputLabelMode } from '../input-list/type';
import { ListBox } from './components/ListBox';
import AutoCompleteInput from './components/AutoCompleteInput';

export interface CustomAutocompleteProps
  extends Omit<
    AutocompleteProps<any, boolean, boolean, undefined>,
    'renderInput'
  > {
  label?: string | ReactNode;
  width?: number | string;
  renderInput?: (params: TextFieldProps) => ReactNode;
  isLoading?: boolean;
  variant?: TextFieldVariants;
  showSelectedCount?: boolean;
  selectedOptions?: any[];
  helperText?: string;
  inputMaxHeight?: string;
  placeholder?: string;
  inputLabelMode?: TInputLabelMode;
  hideLabel?: boolean;
  textFieldProps?: TextFieldProps;
  validation?: {
    isInvalid: boolean;
    message: string;
  };
  onReachEnd?: () => void;
  // value: IAutocompleteValue | IAutocompleteValue[]
}

const AutoCompletePaper = styled(Paper)(({ theme }) => ({
  direction: 'ltr',
  backgroundColor: theme.palette.background.paper,
  '.MuiAutocomplete-option': {
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,

    '&:last-child': {
      borderBottom: 'none',
    },
  },
}));

const CustomAutoComplete: FC<CustomAutocompleteProps> = ({
  label,
  helperText,
  options,
  multiple,
  disabled,
  validation,
  selectedOptions,
  showSelectedCount,
  isLoading,
  inputMaxHeight,
  width,
  placeholder,
  variant,
  hideLabel = false,
  inputLabelMode,
  textFieldProps,
  onReachEnd,
  ...rest
}) => {

  const loading = isLoading;

  return (
    <Box sx={{ width }}>
      <InputLabel
        sx={{
          fontSize: 12,
          color: disabled ? 'text.1' : 'text.primary',
        }}
      >
        {inputLabelMode === 'static' && !hideLabel && (
          <Typography>{label}</Typography>
        )}
      </InputLabel>

      <Autocomplete
        loading={loading}
        limitTags={2}
        multiple={multiple}
        disabled={disabled}
        options={options || []}
        disableCloseOnSelect={multiple}
        disablePortal={Boolean(rest.limitTags)}
        value={rest.value}
        // defaultValue={rest?.defaultValue}
        id='virtualize-demo'
        disableListWrap
        isOptionEqualToValue={(option, value) => {
          return option?.value === value?.value;
        }}
        renderOption={(props, option: IFormOption, state) =>
          ({
            props,
            option,
            index: state.index,
            multiple,
            selected: state.selected,
          }) as any
        }
        ListboxProps={{ onReachEnd } as any}
        ListboxComponent={ListBox}
        renderGroup={(params) => params as any}
        noOptionsText={
          <Typography  sx={{ color: 'text.primary' }}>
            نتیجه ای یافت نشد
          </Typography>
        }
        loadingText={
          <Typography sx={{ color: 'text.primary' }}>
            در حال بارگزاری...
          </Typography>
        }
        sx={{
          padding: 0,
          width: '100%',
          ...(disabled && { opacity: 0.7, cursor: 'not-allowed' }),
        }}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => {
            // Ensure that the option is an object with both label and value properties
            if (typeof option === 'object' && option.label && option.value) {
              return (
                <CustomChip
                  {...getTagProps({ index })}
                  key={index}
                  label={option.label}
                  labelProps={{ sx: {} }}
                  sx={{ height: 26 }}
                  size='small'
                  rounded
                />
              );
            } else {
              return null; // Handle invalid cases gracefully
            }
          });

        }}
        getOptionDisabled={(option: IFormOption) => !!option?.disabled}
        renderInput={(params) => (
          <AutoCompleteInput
            params={params}
            helperText={helperText}
            variant={variant}
            placeholder={placeholder}
            label={label}
            isLoading={loading}
            inputLabelMode={inputLabelMode}
            inputMaxHeight={inputMaxHeight}
            textFieldProps={textFieldProps}
            validation={validation}
          />
        )}
        PaperComponent={(props) => (
          <AutoCompletePaper elevation={1} {...props} />
        )}
        {...rest}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {multiple &&
          selectedOptions &&
          selectedOptions.length > 0 &&
          showSelectedCount && (
            <Typography
              sx={{  mt: 1 }}
            >
              {selectedOptions?.length} item
              {selectedOptions?.length > 1 && "'s"} selected
            </Typography>
          )}
      </Box>
    </Box>
  );
};

export default CustomAutoComplete;

