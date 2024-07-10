import React, { FC, isValidElement } from "react";

//@3rd Party
import lodash from "lodash";
import { UseFormReturn } from "react-hook-form";
//------------------------------------------------------------------------

//@Mui
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { BoxProps } from "@mui/material/Box";
import { GridProps } from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { TypographyProps } from "@mui/material/Typography";
//------------------------------------------------------------------------

//@Components
// import InputError from '~/core/components/input-list/InputError'
import { IUseFormInput, TInputLabelMode } from "./type";
import UseFormInput from "./UseFormInput";
import { TextFieldProps } from "@mui/material/TextField";

//------------------------------------------------------------------------

interface Props {
  inputList: IUseFormInput[];
  form: UseFormReturn<any, any, any>;
  gridContainerProps?: GridProps;
  gridItemProps?: GridProps;
  itemProps?: any;
  labelsProps?: Partial<TypographyProps<"label", {}>> | undefined;
  errorProps?: BoxProps;
  hideRequiredStar?: boolean;
  inputLabelMode?: TInputLabelMode;
  inputVariants?: TextFieldProps["variant"];
}

const InputListWithUseForm: FC<Props> = ({
  inputList,
  form,
  gridItemProps,
  gridContainerProps,
  labelsProps,
  itemProps,
  hideRequiredStar = false,
  inputLabelMode = "static",
  inputVariants = "outlined"
}) => {
  return (
    <Grid
      container
      columnSpacing={10}
      rowSpacing={0}
      rowGap={6}
      alignItems={"flex-start"}
      {...gridContainerProps}
    >
      {inputList?.map((inputProp) => (
        <Grid
          key={inputProp.name}
          item
          xs={4}
          position={"relative"}
          {...gridItemProps}
          {...inputProp.gridItemProp}
        >
          {inputLabelMode === "static" && inputProp.type !== "checkbox" && (
            <Box display={"flex"}>
              <Typography
                fontSize={12}
                fontWeight={400}
                flexGrow={1}
                width={0}
                component={"label"}
                display={"inline-block"}
                mb={2}
                htmlFor={inputProp.name}
                color={
                  lodash.result(form?.formState?.errors, `${inputProp.name}`)
                    ? "error"
                    : "text.primary"
                }
                noWrap
                title={
                  !isValidElement(inputProp?.label)
                    ? inputProp?.label?.toString() || ""
                    : ""
                }
                {...labelsProps}
                {...inputProp.labelProps}
              >
                <Stack direction="row">
                  {inputProp.label}
                  {inputProp.rules?.required && !hideRequiredStar && (
                    <Typography
                      fontSize={12}
                      fontWeight={600}
                      component={"span"}
                      color={"error"}
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
            error={lodash.result(form?.formState?.errors, `${inputProp.name}`)}
            itemProps={itemProps}
            {...inputProp}
            inputLabelMode={inputLabelMode}
            inputVariants={inputVariants}
          />

          {/*<InputError*/}
          {/*  cy-data={`error-${inputProp.name}`}*/}
          {/*  boxProps={{*/}
          {/*    position: 'absolute',*/}
          {/*    bottom: -20,*/}
          {/*    display: 'flex',*/}
          {/*    justifyContent: 'start',*/}
          {/*    alignItems: 'center',*/}
          {/*    ...errorProps,*/}
          {/*  }}*/}
          {/*  error={*/}
          {/*    (form?.formState?.errors?.[inputProp.name]?.message as string) ||*/}
          {/*    (lodash.result(*/}
          {/*      form?.formState?.errors,*/}
          {/*      `${inputProp.name}.message`*/}
          {/*    ) as string)*/}
          {/*  }*/}
          {/*/>*/}
        </Grid>
      ))}
    </Grid>
  );
};

export default InputListWithUseForm;
