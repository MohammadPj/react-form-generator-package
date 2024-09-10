import loadable from '@loadable/component';
import withErrorBoundary from "./error boundary/withErrorBoundary.tsx";
import LoadingComponent from "./error boundary/LoadingComponent.tsx";

export {default as Form} from "./input-list/Form.tsx"

export const UFAutoComplete = withErrorBoundary(
  loadable(() => import('./input-list/components/UFAutoComplete'), {
    fallback: <LoadingComponent />,
  }),
);

export const UFCheckbox = withErrorBoundary(
  loadable(() => import('./input-list/components/UFCheckbox'), {
    fallback: <LoadingComponent />,
  }),
);

export const UFRadio = withErrorBoundary(
  loadable(() => import('./input-list/components/UFRadio'), {
    fallback: <LoadingComponent />,
  }),
);

export const UFCurrency = withErrorBoundary(
  loadable(() => import('./input-list/components/UFCurrency'), {
    fallback: <LoadingComponent />,
  }),
);

export const UFDatePicker = withErrorBoundary(
  loadable(() => import('./input-list/components/UFDatePicker'), {
    fallback: <LoadingComponent />,
  }),
);

export const UFMultiSelect = withErrorBoundary(
  loadable(() => import('./input-list/components/UFMultiSelect'), {
    fallback: <LoadingComponent />,
  }),
);

export const UFSelect = withErrorBoundary(
  loadable(() => import('./input-list/components/UFSelect'), {
    fallback: <LoadingComponent />,
  }),
);

export const UFTextArea = withErrorBoundary(
  loadable(() => import('./input-list/components/UFTextArea'), {
    fallback: <LoadingComponent />,
  }),
);

export const UFTextField = withErrorBoundary(
  loadable(() => import('./input-list/components/UFTextField'), {
    fallback: <LoadingComponent />,
  }),
);

export const UFMultiCheckbox = withErrorBoundary(
  loadable(() => import('./input-list/components/UFMultiCheckbox'), {
    fallback: <LoadingComponent />,
  }),
);

export const CheckboxList = withErrorBoundary(
  loadable(() => import('./input-list/checkbox-list/CheckboxList'), {
    fallback: <LoadingComponent />,
  }),
);