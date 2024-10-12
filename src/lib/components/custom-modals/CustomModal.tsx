import { FC } from "react";

//@Mui
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { BoxProps, ModalProps } from "@mui/material";
//---------------------------------------------------------------------------

//@Components
//---------------------------------------------------------------------------

interface Props extends ModalProps {
  onClose?: () => void;
  boxProps?: BoxProps;
  leftTitle?: React.ReactNode;
  withoutDivider?: boolean;
  withoutHeader?: boolean;
  scrollableProps?: BoxProps;
  preventClose?: boolean;
  onClickTopLeftBtn?: () => void;
  topLeftBtnTitle?: string;
  maxHeight?: string | number;
  height?: string | number;
}

const CustomModal: FC<Props> = ({
  open,
  children,
  boxProps,
  onClose,
  title,
  leftTitle,
  sx,
  withoutDivider,
  withoutHeader,
  scrollableProps,
  preventClose,
  onClickTopLeftBtn,
  topLeftBtnTitle,
  maxHeight,
  height,
  ...rest
}) => {
  return (
    <Modal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      open={open}
      sx={{
        direction: "ltr",
        backdropFilter: "blur(5px)",
        "& .MuiBackdrop-root ": {
          backgroundColor: "rgba(27, 38, 44, 0.1)",
        },
        ...sx,
      }}
      onClose={() => {
        if (onClose && !preventClose) {
          onClose();
        }
      }}
      {...rest}
    >
      <Stack
        sx={{
          width: { xs: "90%", md: "auto" },
          minWidth: 300,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: "10px",
          p: 2,
          outline: "none",
          ...boxProps,
        }}
      >
        {!withoutHeader && (
          <>
            <Box
              display={"flex"}
              gap={3}
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={2}
            >
              <Box display={"flex"} gap={3} alignItems={"center"}>
                <IconButton
                  onClick={() => (onClose ? onClose() : "")}
                  data-cy={"close-modal"}
                  sx={{width: 30, height: 30}}
                >
                  {/*<SvgClose />*/}
                  x
                </IconButton>
                <Typography fontWeight={500} fontSize={12}>
                  {title}
                </Typography>
              </Box>

              <Box>{leftTitle}</Box>
              {topLeftBtnTitle && (
                <Box
                  sx={{ color: "primary.main", cursor: "pointer" }}
                  onClick={onClickTopLeftBtn}
                >
                  {topLeftBtnTitle}
                </Box>
              )}
            </Box>

            {!withoutDivider && (
              <Divider
                sx={{
                  mb: 4,
                  borderColor: "background.1",
                }}
              />
            )}
          </>
        )}

        <Stack height={height || "100%"} maxHeight={maxHeight || "73vh"}>
          {/*<Scrollable px={{ xs: 1, md: 3 }} py={2} {...scrollableProps}>*/}
            {children}
          {/*</Scrollable>*/}
        </Stack>
      </Stack>
    </Modal>
  );
};

export default CustomModal;
