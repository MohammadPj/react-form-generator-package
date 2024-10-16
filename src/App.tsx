import { useForm } from "react-hook-form";
import "./index.css";
import { TFormSchema } from "./lib/components/input-list/type";
import { Form } from "./lib";
import {Button} from "@mui/material";
import Stack from "@mui/material/Stack";

function App() {
  const form = useForm();

  const schema: TFormSchema = [
    {
      name: "test",
      label: "salam",
      type: "uploader",
      multiple: true
    },
  ];

  const handleSubmit = () => {
    console.log('form values', form.getValues())
  }

  return (
    <Stack component={'form'} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form schema={schema} form={form} />

      <Button type={'submit'}>
        submit
      </Button>
    </Stack>
  );
}

export default App;
