import { useForm } from "react-hook-form";
import "./index.css";
import { TFormSchema } from "./lib/components/input-list/type";
import { Form } from "./lib";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

function App() {
  const form = useForm();
  const options = Array.from({ length: 50 }, (x: any, i) => i).map((item) => ({
    label: `label-${item}`,
    value: item,
  }));

  const schema: TFormSchema = [
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

  return (
    <Stack component={"form"} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form schema={schema} form={form} gridItemProps={{ xs: 12 }} />

      <Button type={"submit"}>submit</Button>
    </Stack>
  );
}

export default App;
