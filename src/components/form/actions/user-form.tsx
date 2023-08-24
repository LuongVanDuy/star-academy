import React from "react";
import { Form} from "antd";
import FormInput from "../input";
import FormPassword from "../password";
import FormCheckbox from "../checkbox";

const UserForm = ({ unitList, form, formName, show, onFinish }: any) => {
  return (
    <Form
      colon={false}
      form={form}
      autoComplete="off"
      onFinish={onFinish}
      name={formName}
    >
      <FormInput
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: "Email field is required",
          },
          {
            type: "email",
            message: "Enter the correct email format",
          },
        ]}
      />
      {show && (
        <FormPassword
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Password field is required",
            },
          ]}
        />
      )}
        <FormInput
        name="name"
        label="User Name"
        rules={[
          {
            required: true,
            message: "User name field is required",
          },
        ]}
      />
      <FormInput
        name="phone"
        label="Phone"
        rules={[
          {
            required: true,
            message: "Phone field is required",
          },
        ]}
      />
      <FormInput
        name="address" label="Address" rules={[]}
      />
      <FormCheckbox 
        name="unit_id"
        label="Units active"
        unitList={unitList}
        rules={[
          {
            required: true,
            message: "Please select at least one unit",
          },
        ]}
      />
    </Form>
  );
};

export default UserForm;
