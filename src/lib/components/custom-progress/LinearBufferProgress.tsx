import React, { FC } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {
  progress: number;
}

const LinearBufferProgress: FC<Props> = ({ progress }) => {
  const [buffer, setBuffer] = React.useState(10);

  React.useEffect(() => {
    const diff = Math.random() * 10;
    const diff2 = Math.random() * 10;
    setBuffer(progress + diff + diff2);
  }, [progress]);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
};

export default LinearBufferProgress;
