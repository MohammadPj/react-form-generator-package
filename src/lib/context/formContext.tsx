import React, { createContext, useContext, ReactNode, FC } from "react";
import {TFormTheme} from "../components/input-list/type";

export interface ICustomInputs {}

interface InputContextType {
  customInputs?: ICustomInputs[];
  theme?: TFormTheme;
}

interface IFormProvider {
  children: ReactNode;
  customInputs?: ICustomInputs[];
  theme?: TFormTheme;
}

const FormContext = createContext<InputContextType | undefined>(undefined);

export const FormProvider: FC<IFormProvider> = ({
  children,
  customInputs,
  theme,
}) => {
  return (
    <FormContext.Provider value={{ customInputs, theme }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useInputContext must be used within an InputProvider");
  }
  return context;
};
