import React, {createContext, FC, ReactNode, useContext} from "react";
import {TFormTheme} from "../components/input-list/type";

export interface ICustomInputs {}

interface InputContextType {
  customInputs?: ICustomInputs[];
  theme?: TFormTheme;
}

export interface IFormProvider {
  children: ReactNode;
  customInputs?: ICustomInputs[];
  theme?: TFormTheme;
}

const FormContext = createContext<InputContextType | undefined>(undefined);

const FormProvider: FC<IFormProvider> = ({
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

export const useFormContext = () => useContext(FormContext) || {};

export default FormProvider