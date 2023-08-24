import React from "react";
import { Col, Form, Row, Typography } from "antd";
import styled from "styled-components";
import FormUploadVideo from "./upload-video";

const { Text } = Typography;

function FormVideo({
  label,
  name,
  rules,
  videoUrl,
  fileList,
  onChange,
}: Props) {
  return (
    <Wrapper>
      <Row>
        <Col xxl={3} md={6} xs={24}>
          <StyledText>{label}</StyledText>
        </Col>
        <Col xxl={21} md={18} xs={24}>
          <Form.Item name={name} rules={rules}>
            <FormUploadVideo
              videoUrl={videoUrl}
              fileList={fileList}
              onChange={onChange}
            />
          </Form.Item>
        </Col>
      </Row>
    </Wrapper>
  );
}

type Props = {
  label: string;
  name: string;
  rules: any;
  videoUrl: any;
  fileList: any;
  onChange: any;
};

export default FormVideo;

const Wrapper = styled(`div`)`
  & > .ant-row {
    & > .ant-col {
      &:nth-child(1) {
        display: flex;
        padding-top: 3px;
        padding-bottom: 10px;
        .ant-typography {
          font-weight: 500;
          padding-right: 10px;
          @media (min-width: 768px) {
            min-width: 76px;
          }
        }
        .ant-badge {
          margin-top: 3px;
          .ant-badge-count {
            border-radius: 2px;
          }
        }
      }
      .ant-form-item {
        max-width: 100%;
      }
    }
  }
`;

const StyledText = styled(Text)`
  & {
    text-align: left;
  }
`;
