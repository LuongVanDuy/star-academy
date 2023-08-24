import { Form } from "antd";
import FormImage from "../image";
import FormInput from "../input";

const UnitForm = ({
  form,
  formName,
  fileList,
  onChange,
  onFinish,
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
        label="Unit Name"
        rules={[
          {
            required: true,
            message: "Unit name field is required",
          },
        ]}
        placeholder="Enter the unit name"
      />
      <FormImage 
        name="image"
        label="Unit Name"
        rules={[
          {
            required: true,
            message: "Cover image field is required",
          },
        ]}
          aspect={1 / 1}
          fileList={fileList}
          onChange={onChange}
        />
    </Form>
  );
};

export default UnitForm;
