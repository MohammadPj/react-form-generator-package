import InputListWithUseForm from "./components/input-list/InputListWithUseForm.tsx";
import {useForm} from "react-hook-form";
import {IUseFormInput} from "./components/input-list/type";
import "./index.css"

function App() {

  const form = useForm()
  const inputList: IUseFormInput[] = [
    {
      name: "test",
      label: "test",
      type: "text",
      options: [
        {label: "test1", value: "test1"},
        {label: "test2", value: "test2"},
      ]
    }
  ]

  return (
    <>
      <InputListWithUseForm inputList={inputList} form={form} />
    </>
  )
}

export default App
