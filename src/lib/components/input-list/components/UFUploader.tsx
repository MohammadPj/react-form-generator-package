import React, { FC } from "react";
import { IUploaderForm } from "../type";
import { Controller, UseFormReturn } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import CustomUploader from "../../custom-uploader/CustomUploader.tsx";
import Box from "@mui/material/Box";

type UFUploaderProps = IUploaderForm & {
  form: UseFormReturn<any>;
  error: any;
};

const UFUploader: FC<UFUploaderProps> = ({
  form,
  error,
  itemProps,
  props,
  rules,
  disabled,
  multiple,
  name,
  withoutHelperText,
  helperText,
  onDelete,
}) => {
  const handleChange = (files: FileList, preview: string[]) => {
    form.setValue(name, {
      files: Array.from(files),
      preview,
    });
  };

  const handleDelete = (index: number) => {
    console.log('index', index)

    const files = form.getValues(name)?.files as []
    const preview = form.getValues(name)?.preview as []

    const newFiles = files?.filter((_, i) => i !== index);
    const newPreview = preview?.filter((_, i) => i !== index);

    form.setValue(name, {files: newFiles, preview: newPreview})
  };

  return (
    <Controller
      control={form?.control}
      name={name}
      rules={{ ...rules }}
      render={({ field: { name, value, onBlur } }) => (
        <FormControl
          sx={{ display: "flex", ...(disabled && { filter: "contrast(0.3)" }) }}
        >
          <Box display={"flex"} gap={2}>
            {(multiple || !value) && (
              <CustomUploader
                multiple={multiple}
                {...props}
                {...itemProps}
                inputProps={{ name, disabled, onBlur }}
                onChange={handleChange}
              />
            )}

            {value?.preview?.map((preview: string, i: number) => (
              <CustomUploader
                multiple={multiple}
                {...props}
                {...itemProps}
                link={preview}
                inputProps={{ name, disabled, onBlur }}
                onChange={handleChange}
                onDeleteDocument={
                  onDelete ? () => onDelete(i) : () => handleDelete(i)
                }
              />
            ))}
          </Box>

          {!withoutHelperText && (
            <Typography
              sx={{
                height: 23,
                width: "max-content",
                color: error ? "error.4" : "text.primary",
              }}
            >
              {error?.message ?? helperText ?? " "}
            </Typography>
          )}
        </FormControl>
      )}
    />
  );
};

export default UFUploader;
