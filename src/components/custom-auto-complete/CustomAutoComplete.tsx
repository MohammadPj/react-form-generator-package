import { FC, HTMLAttributes, ReactNode } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { styled, useTheme } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { InputAdornment, TextFieldVariants } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { TInputLabelMode } from "../input-list/type";
import CustomChip from "../custom-chip/CustomChip.tsx";
import InfoCircle from "../../assets/icons/InfoCircle.tsx";

export interface CustomAutocompleteProps
  extends Omit<AutocompleteProps<any, true, false, undefined>, "renderInput"> {
  label?: string;
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
  validation?: {
    isInvalid: boolean;
    message: string;
  };
}

const AutoCompletePaper = styled(Paper)(({ theme }) => ({
  direction: "ltr",
  backgroundColor: theme.palette.background.paper,
  ".MuiAutocomplete-option": {
    borderBottom: "1px solid",
    borderColor: theme.palette.divider,

    "&:last-child": {
      borderBottom: "none",
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
  ...rest
}) => {
  const theme = useTheme();
  const loading = isLoading;

  return (
    <Box sx={{ width }}>
      <InputLabel
        sx={{
          fontSize: 12,
          color: disabled ? "text.disabled" : "text.primary",
        }}
      >
        {inputLabelMode === "static" && !hideLabel && (
          <Typography fontWeight={400} fontSize={14} lineHeight={"24px"}>{label}</Typography>
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
        noOptionsText={
          <Typography fontWeight={400} fontSize={14} lineHeight={"24px"} sx={{ color: "text.primary" }}>
            No result
          </Typography>
        }
        loadingText={
          <Typography fontWeight={400} fontSize={14} lineHeight={"24px"} sx={{ color: "text.primary" }}>
            Loading...
          </Typography>
        }
        sx={{
          padding: 0,
          width: "100%",
          ...(disabled && { opacity: 0.7, cursor: "not-allowed" }),
        }}
        renderTags={(tagValue, getTagProps) => {
          return tagValue.map((option, index) => (
            <CustomChip
              {...getTagProps({ index })}
              key={index}
              label={option.label}
              labelProps={{ sx: {} }}
              sx={{ height: 26 }}
              size="small"
              rounded
            />
          ));
        }}
        getOptionDisabled={(option) => option.disabled}
        renderOption={(
          props: HTMLAttributes<HTMLLIElement>,
          option,
          { selected },
          ownerState,
        ) => {
          return (
            <li {...props} key={ownerState?.options.indexOf(option)}>
              {multiple && (
                <Checkbox checked={selected} sx={{ opacity: "inherit" }} />
              )}
              <Typography fontWeight={400} fontSize={12} lineHeight={"21px"}>{option?.label}</Typography>
            </li>
          );
        }}
        renderInput={(params) => {
          return (
            <TextField
              variant={variant}
              placeholder={placeholder}
              error={validation?.isInvalid}
              {...(inputLabelMode === "relative" && { label: label })}
              {...params}
              sx={{
                minWidth: 0,
                height: "100%",
                overflow: "auto",
                "& .MuiFilledInput-root": {
                  ...(inputLabelMode === "relative" && {
                    alignItems: "flex-end",
                  }),
                },
                maxHeight: inputMaxHeight ?? "unset",
              }}
              helperText={
                validation?.message
                  ? validation?.message ?? helperText ?? " "
                  : undefined
              }
              InputProps={{
                ...params.InputProps,
                ...(validation?.isInvalid && {
                  startAdornment: (
                    <InputAdornment sx={{ pl: 2 }} position="start">
                      <InfoCircle primarycolor={theme.palette.error.main} />
                    </InputAdornment>
                  ),
                }),
                endAdornment: (
                  <InputAdornment position={"end"}>
                    {loading && <CircularProgress color="inherit" size={20} />}
                    {params.InputProps.endAdornment}
                  </InputAdornment>
                ),
              }}
            />
          );
        }}
        PaperComponent={(props) => (
          <AutoCompletePaper elevation={1} {...props} />
        )}
        {...rest}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {multiple &&
          selectedOptions &&
          selectedOptions.length > 0 &&
          showSelectedCount && (
            <Typography
              fontWeight={400} fontSize={12} lineHeight={"21px"}
              sx={{ color: theme.palette.text.primary, mt: 1 }}
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
