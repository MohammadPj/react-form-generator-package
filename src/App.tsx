import {useForm} from "react-hook-form";
import "./index.css"
import {IFormOption, TFormSchema} from "./lib/components/input-list/type";
import {Form} from "./lib";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";

function App() {

  const handleSubmit = (values: any) => {
    console.log('values', values)
  }

  const options: IFormOption[] = [
    {
      label: "a",
      value: "a"
    },
    {
      label: "b",
      value: "b"
    },
  ]

  const form = useForm()
  const schema: TFormSchema = [
    {
      name: "test",
      label: "test",
      type: "auto-complete",
      options
    }
  ]

  return (
    <Box component={'form'} onSubmit={form.handleSubmit(handleSubmit)}>
      <Form schema={schema} form={form} />

      <Button type={'submit'}>submit</Button>
    </Box>
  )
}

export default App
