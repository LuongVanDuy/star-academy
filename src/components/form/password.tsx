import { Badge, Col, Form, Input, Row, Typography, theme } from "antd";
import styled from "styled-components";

const { Text } = Typography;

function FormPassword({ label, hideRequired, placeholder, name, rules }: Props) {

  const {
    token: { colorHighlight },
  } = theme.useToken();

  return (
    <Wrapper>
      <Row>
        <Col
          xxl={3}
          md={6}
          xs={24}
        >
          <StyledText>{label}</StyledText>
        </Col>
        <Col
          xxl={21}
          md={18}
          xs={24}
        >
          <Form.Item
            colon={false}
            name={name}
            rules={rules}
          >
            <Input.Password
              placeholder={placeholder}
              allowClear
            />
          </Form.Item>
        </Col>
      </Row>
    </Wrapper>
  );
}

type Props = {
  label: string;
  hideRequired?: boolean;
  placeholder?: string | undefined;
  name: string;
  rules: any;
};

export default FormPassword;

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
