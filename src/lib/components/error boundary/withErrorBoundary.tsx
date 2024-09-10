import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./ErrorComponent";
import {ComponentType, FC} from "react";

// Define the type for the props of the wrapped component
type WithErrorBoundaryProps = {
  // Add any props specific to the HOC if needed
  skeletonWidth?: string | number;
  skeletonHeight?: string | number;
};

const withErrorBoundary = <P extends object>(
  WrappedComponent: ComponentType<P>,
) => {
  const ComponentWithErrorBoundary: FC<P & WithErrorBoundaryProps> = (
    props,
  ) => {
    return (
      <ErrorBoundary
        fallback={
          <ErrorComponent
            skeletonWidth={props?.skeletonWidth || "100%"}
            skeletonHeight={props?.skeletonHeight || "100%"}
          />
        }
      >
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };

  return ComponentWithErrorBoundary;
};

export default withErrorBoundary;
