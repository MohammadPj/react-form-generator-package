import React, { FC, isValidElement } from "react";

//@3rd Party
import { UseFormReturn } from "react-hook-form";
//------------------------------------------------------------------------

//@Mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { GridProps } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TypographyProps } from "@mui/material/Typography";
//------------------------------------------------------------------------

//@Components
import { TFormSchema, TInputLabelMode } from "./type";
import UseFormInput from "./UseFormInput";
import { TextFieldProps } from "@mui/material/TextField";
import { deepMerge, result } from "../../methods/general.ts";

//------------------------------------------------------------------------

interface FormProps {
  schema: TFormSchema;
  form: UseFormReturn<any, any, any>;
  gridContainerProps?: GridProps;
  gridItemProps?: GridProps;
  itemProps?: any;
  labelsProps?: Partial<TypographyProps<"label", {}>> | undefined;
  hideRequiredStar?: boolean;
  inputLabelMode?: TInputLabelMode;
  inputVariants?: TextFieldProps["variant"];
  withoutHelperText?: boolean;
  disabled?: boolean;
}

const Form: FC<FormProps> = ({
  schema,
  form,
  gridItemProps,
  gridContainerProps,
  labelsProps,
  itemProps,
  hideRequiredStar = false,
  inputLabelMode = "static",
  inputVariants = "outlined",
  withoutHelperText,
  disabled,
}) => {
  return (
    <Grid
      container
      columnSpacing={4}
      rowSpacing={0}
      rowGap={2}
      alignItems={"flex-start"}
      {...gridContainerProps}
    >
      {schema?.map((inputProp) => (
        <Grid
          key={inputProp.name}
          item
          xs={4}
          width={"100%"}
          height={"auto"}
          position={"relative"}
          {...deepMerge(gridItemProps, inputProp.gridItemProp)}
        >
          {inputLabelMode === "static" && inputProp.type !== "checkbox" && (
            <Box display={"flex"}>
              <Typography
                flexGrow={1}
                width={0}
                component={"label"}
                display={"inline-block"}
                mb={2}
                htmlFor={inputProp.name}
                color={
                  result(form?.formState?.errors, `${inputProp.name}`)
                    ? "error"
                    : "text.16"
                }
                noWrap
                title={
                  !isValidElement(inputProp?.label)
                    ? inputProp?.label?.toString() || ""
                    : ""
                }
                {...deepMerge(labelsProps, inputProp.labelProps)}
              >
                <Stack direction="row">
                  {inputProp.label}
                  {inputProp.rules?.required && !hideRequiredStar && (
                    <Typography
                      component={"span"}
                      color={"error"}
                      fontSize={12}
                    >
                      *
                    </Typography>
                  )}
                </Stack>
              </Typography>
            </Box>
          )}

          <UseFormInput
            form={form}
            itemProps={itemProps}
            error={result(form?.formState?.errors, `${inputProp.name}`)}
            inputLabelMode={inputLabelMode}
            inputVariants={inputVariants}
            withoutHelperText={withoutHelperText}
            disabled={disabled}
            {...inputProp}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Form;
