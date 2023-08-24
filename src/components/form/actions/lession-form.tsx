import { Form} from "antd";
import FormInput from "../input";
import FormImage from "../image";
import FormVideo from "../video";

const AddLessionForm = ({
  form,
  formName,
  fileList,
  onChange,
  onFinish,
  fileListImg,
  onChangeImg,
  videoUrl,
}: any) => {
  return (
    <Form
      colon={false}
      form={form}
      autoComplete="off"
      onFinish={onFinish}
      name={formName}
    >
      <FormInput
        name="name"
        label="Lesson Name"
        rules={[
          {
            required: true,
            message: "Lesson name field is required",
          },
        ]}
        placeholder="Enter the lesson name"
      />
      <FormImage
        name="image"
        label="Cover Image"
        rules={[
          {
            required: true,
            message: "Cover image field is required",
          },
        ]}
        aspect={3 / 5}
        fileList={fileList}
        onChange={onChange}
      />
      <FormVideo
        name="video"
        label="Lesson Video"
        rules={[
          {
            required: true,
            message: "Lesson video field is required",
          },
        ]}
        videoUrl={videoUrl}
        fileList={fileListImg}
        onChange={onChangeImg}
      />
    </Form>
  );
};

export default AddLessionForm;
