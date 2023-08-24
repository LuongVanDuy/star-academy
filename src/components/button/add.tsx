import React from "react";
import { Form, Button, Row, Col } from "antd";

const AddButton = ({ title, onChange }: any) => {
  return (
    <Row gutter={20} justify="space-between" style={{height: "20px"}}>
      <Col>
        <h2 style={{ margin: 0 }}>{title}</h2>
      </Col>
      <Col>
        <Form.Item>
          <Button type="primary" onClick={onChange}>
            Add new
          </Button>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AddButton;
