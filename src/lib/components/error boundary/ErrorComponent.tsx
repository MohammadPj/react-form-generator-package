import React, {FC} from 'react';
import Skeleton from "@mui/material/Skeleton";

interface SkeletonProps {
  skeletonWidth?: string | number;
  skeletonHeight?: string | number;
}

const ErrorComponent: FC<SkeletonProps> = ({skeletonHeight = "100%",skeletonWidth = "100%"}) => {
  return (
    <Skeleton variant="rectangular" width={skeletonWidth} height={skeletonHeight} sx={{borderRadius:1}}>

    </Skeleton>
  );
};

export default ErrorComponent;
