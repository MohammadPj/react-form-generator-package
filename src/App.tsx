import { useForm } from "react-hook-form";
import "./index.css";
import { TFormSchema } from "./lib/components/input-list/type";
import { Form } from "./lib";
import CustomUploader from "./lib/components/custom-uploader/CustomUploader.tsx";
import { useState } from "react";

function App() {
  const [image, setImage] = useState<string>();
  const form = useForm();

  const schema: TFormSchema = [
    {
      name: "test",
      label: "test",
    },
  ];

  const handlePreview = (preview: string[]) => {
    setImage(preview[0])
  };

  const handleDelete = () => {

  }

  return (
    <>
      <Form schema={schema} form={form} />


      <CustomUploader
        title={"upload document"}
        onChangePreview={handlePreview}
        onDeleteDocument={handleDelete}
        link={image}
        width={"100%"}
      />

    </>
  );
}

export default App;
