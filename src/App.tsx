import { useForm } from "react-hook-form";
import "./index.css";
import {TFormTheme, TSchema} from "./lib/components/input-list/type";
import { Form } from "./lib";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import {FormProvider} from "./lib/context/formContext.tsx";

function App() {
  const form = useForm();
  const options = Array.from({ length: 50 }, (x: any, i) => i).map((item) => ({
    label: `label-${item}`,
    value: item,
  }));

  const schema: TSchema[] = [
    {
      name: "date",
      label: "date",
      type: "auto-complete",
      options: options,
      onReachEnd: () => {
        console.log("reached end");
      },
      rules: {
        required: "asdasd",
      },
    },
  ];

  const handleSubmit = () => {
    console.log("form values", form.getValues());
  };

  const theme: TFormTheme = {
    radio: {}
  }

  return (
    <FormProvider theme={theme} customInputs={[]} >
    <Stack component={"form"} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form schema={schema} form={form} gridItemProps={{ xs: 12 }} />

      <Button type={"submit"}>submit</Button>
    </Stack>
    </FormProvider>
  );
}

export default App;
