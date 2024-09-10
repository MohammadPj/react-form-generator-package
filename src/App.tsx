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
      type: "multi-checkbox",
      options: [
        {label: "a", value: "a"},
        {label: "b", value: "b"},
      ]
    }
  ]

  return (
    <>
      <Form schema={schema} form={form} />
    </>
  )
}

export default App
