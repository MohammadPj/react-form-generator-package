import React, { ChangeEvent, FC, useState } from "react";

// Mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { StackProps, useTheme } from "@mui/material";

// icons and images
import SvgDocumentDownload from "../../assets/icons/DocumentDownload.tsx";
import SvgTrash from "../../assets/icons/Trash.tsx";
import SvgFolderAdd from "../../assets/icons/FolderAdd.tsx";

// components and utils
import DeleteModal from "../custom-modals/DeleteModal.tsx";
import LinearBufferProgress from "../custom-progress/LinearBufferProgress.tsx";

interface Props {
  link?: string;
  title: string;
  onChange?: (files: FileList) => void;
  onChangePreview?: (preview: string[]) => void;
  isLoading?: boolean;
  progress?: number;
  onDeleteDocument?: () => void;
  accept?: string;
  defaultIcon?: string;

  typoProps?: TypographyProps;
  color?: string;
  stackProps?: StackProps;
  width?: number | string;
  height?: number | string;
  imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

const CustomUploader: FC<Props> = ({
  link,
  title,
  typoProps,
  color,
  onChange,
  isLoading,
  progress,
  onDeleteDocument,
  accept,
  defaultIcon,
  stackProps,
  onChangePreview,

  height,
  width,
  imageProps,
}) => {
  const theme = useTheme();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  //Handlers
  const handleClickDeleteIcon = async () => {
    setIsOpenDeleteModal(true);
  };

  const handleDownload = async (link: string, nameOfDownload: string) => {
    const response = await fetch(link);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
  };

  const handleDownloadImage = async () => {
    await handleDownload(link!, `${title}`);
  };

  const handleDelete = () => {
    if (onDeleteDocument) {
      onDeleteDocument();
    }
    setIsOpenDeleteModal(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files || [];

    const objectUrlFiles = [];

    for (let i = 0; i < files?.length; i++) {
      objectUrlFiles.push(URL.createObjectURL(files[i]));
    }

    if (onChangePreview) {
      onChangePreview(objectUrlFiles);
    }

    if (onChange && files instanceof FileList) {
      onChange(files);
    }
  };

  return (
    <Stack
      flexGrow={{ xs: 1, sm: "unset" }}
      width={width || 100}
      height={height || 100}
      border={"1px dashed"}
      borderRadius={2}
      borderColor={color || "primary.main"}
      {...stackProps}
    >
      {!link && !isLoading && (
        <input
          type={"file"}
          accept={accept || "image/jpeg, image/png, image/jpg"}
          id={link + title}
          style={{ display: "none" }}
          onChange={handleChange}
        />
      )}

      <Stack
        component={"label"}
        htmlFor={link + title}
        width={"100%"}
        height={"100%"}
        sx={{
          position: "relative",
          "&:hover #icons-box": {
            display: link ? "flex" : "none",
          },
          "&:hover #doc-card": {
            filter: link ? "blur(3px)" : "",
            cursor: link ? "default" : "",
          },
        }}
      >
        <Box
          zIndex={10}
          display={"none"}
          id={"icons-box"}
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          sx={{ transform: "translate(-50%, -50%)" }}
          gap={2}
        >
          {handleDownloadImage && (
            <SvgDocumentDownload
              secondarycolor={color || theme.palette.primary["main"]}
              style={{ cursor: "pointer" }}
              onClick={() => handleDownloadImage()}
            />
          )}

          {onDeleteDocument && (
            <SvgTrash
              primarycolor={"red"}
              style={{ cursor: "pointer" }}
              onClick={() => handleClickDeleteIcon()}
            />
          )}
        </Box>

        <Stack
          position={"relative"}
          id={"doc-card"}
          height={"100%"}
          sx={{
            cursor: "pointer",
            "&:hover": {
              filter: link ? "blur(2px)" : "",
            },
          }}
        >
          {/*<img src={Border} alt={'border'} />*/}

          <Stack
            justifyContent={"center"}
            alignItems={"center"}
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            sx={{ transform: "translate(-50%, -50%)" }}
            width={"100%"}
            height={"100%"}
          >
            {isLoading && progress ? (
              <Box
                width={"80%"}
                display={"flex"}
                alignItems={"center"}
                height={"100%"}
                gap={2}
              >
                <LinearBufferProgress progress={progress} />

                <Typography textAlign={"center"} fontWeight={500} width={50}>
                  {progress} %
                </Typography>
              </Box>
            ) : (
              <>
                {link ? (
                  <img
                    src={defaultIcon || link}
                    alt={"document"}
                    width={"100%"}
                    height={"100%"}
                    style={{ objectFit: "contain" }}
                    {...imageProps}
                  />
                ) : (
                  <SvgFolderAdd
                    width={32}
                    height={32}
                    primarycolor={color || theme.palette.primary.main}
                  />
                )}

                {!link && (
                  <Typography
                    color={color || "primary"}
                    fontWeight={"bold"}
                    width={"max-content"}
                    {...typoProps}
                  >
                    {title}
                  </Typography>
                )}
              </>
            )}
          </Stack>
        </Stack>
      </Stack>

      <DeleteModal
        open={isOpenDeleteModal}
        onCancel={() => setIsOpenDeleteModal(false)}
        onDelete={handleDelete}
      >
        <Typography fontWeight={500}>
          آیا از حذف این فایل اطمینان دارید ؟
        </Typography>
      </DeleteModal>
    </Stack>
  );
};

export default CustomUploader;
