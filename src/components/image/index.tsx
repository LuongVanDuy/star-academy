/** @format */

import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface ImageItemProps {
  item: {
    id: string;
    name: string;
    image: string;
  };
  cardLoading: boolean;
  onClick: any;
  onClickEdit: () => void;
  show?: boolean;
  className?: any;
}

const ImageItem: React.FC<ImageItemProps> = ({
  item,
  cardLoading,
  onClick,
  onClickEdit,
  show,
  className,
}) => {
  return (
    <>
      <StyledImageCard
        loading={cardLoading}
        key={item.id}
        cover={<img alt={item.name} src={item.image} onClick={onClick} />}
        className={className}
      >
        <Row>
          <Col span={show ? 16 : 24}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
          </Col>
          {show ? (
            <Col span={8}>
              <Button
                danger
                icon={<EditOutlined />}
                onClick={onClickEdit}
                style={{ position: "absolute", right: 0 }}
              />
            </Col>
          ) : null}
        </Row>
      </StyledImageCard>
    </>
  );
};

export default ImageItem;

const StyledImageCard = styled(Card)`
  width: 100%;
  cursor: pointer;
  padding: 9px 5px 5px 5px !important;
  .ant-card-body {
    padding: 0px !important;
  }
`;
