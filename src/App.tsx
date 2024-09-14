import {useForm} from "react-hook-form";
import "./index.css"
import {TFormSchema} from "./lib/components/input-list/type";
import {Form} from "./lib";

function App() {

  const form = useForm()
  const schema: TFormSchema = [
    {
      name: "test",
      label: "test",
      type: "number",
    }
  ]

  return (
    <>
      <Form schema={schema} form={form} />
    </>
  )
}

export default App
