import Form from "./components/input-list/Form.tsx";
import {useForm} from "react-hook-form";
import {TFormSchema} from "./components/input-list/type";
import "./index.css"

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
