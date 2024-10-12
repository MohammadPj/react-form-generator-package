import React, { FC } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import SvgTrash from "../../assets/icons/Trash.tsx";
import CustomModal from "./CustomModal.tsx";

interface Props {
  children: React.ReactNode;
  onDelete?: () => void;
  onCancel?: () => void;
  open: boolean;
}

const DeleteModal: FC<Props> = ({ onDelete, onCancel, children, open }) => {
  return (
    <CustomModal
      open={open}
      onClose={onCancel}
      withoutDivider
      boxProps={{
        width: 675,
        boxShadow: "0px 1px 1px rgba(3, 7, 18, 0.02),\n" +
        "  0px 5px 4px rgba(3, 7, 18, 0.03),\n" +
        "  0px 12px 9px rgba(3, 7, 18, 0.05),\n" +
        "  0px 20px 15px rgba(3, 7, 18, 0.06),\n" +
        "  0px 32px 24px rgba(3, 7, 18, 0.08);\n",
      }}
    >
      <Stack alignItems="center" gap={6} mb={4} mt={4}>
        <SvgTrash width={100} height={100} primarycolor={'red'} />

        {children}

        <Box display={"flex"} gap={5} width={300}>
          <Button variant={"outlined"} fullWidth onClick={onDelete}>
            بله
          </Button>
          <Button variant={"contained"} fullWidth onClick={onCancel}>
            خیر
          </Button>
        </Box>
      </Stack>
    </CustomModal>
  );
};

export default DeleteModal;
