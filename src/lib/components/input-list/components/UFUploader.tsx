import React, { FC } from "react";
import { IUploaderForm } from "../type";
import { Controller, UseFormReturn } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import CustomUploader from "../../custom-uploader/CustomUploader";
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
  const handleChange = (addedFiles: FileList) => {

    const files: File[] = form.getValues(name)?.files || []
    const previews: string[] = form.getValues(name)?.preview || []

    for (let i = 0; i < addedFiles.length; i++) {
      const file = addedFiles[i];

      if(!files || files?.findIndex(f => f.name === file.name) < 0) {
        files?.push(file)
        previews.push(URL.createObjectURL(file))
      }
    }

    form.setValue(name, {
      files: Array.from(files),
      preview: previews,
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
            {(multiple || !value?.files?.length) && (
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
