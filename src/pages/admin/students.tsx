import React, { useState, type ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  Button,
  Col,
  Form,
  Modal,
  Row,
  Space,
  Table,
  message,
  theme,
} from "antd";
import { NextPageWithLayout } from "../_app";
import { ColumnType } from "antd/es/table";
import UserForm from "@/components/form/actions/user-form";
import AddButton from "@/components/button/add";
import {
  updateUserInfo,
  fetchUserList,
  createNewUser,
  deleteUserInfo,
} from "@/store/actions/user";
import { User, UserType } from "@/types/user";
import { fetchUnitList } from "@/store/actions/unit";
import AuthenticationWrapperAdmin from "@/layouts/wrapper/AuthenticationWrapperAdmin";

const Students: NextPageWithLayout = (props: any) => {
  const {
    fetchUnits,
    unitList,
    createStudent,
    updateStudent,
    deleteStudent,
    fetchStudents,
    studentList,
    studentTotal,
    loading,
  } = props;
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [formField, setFormField] = useState<User | undefined>();
  const [options, setOptions] = useState({ page: 1, itemPerPage: 10 });
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const highLightText = (text: string) => (
    <span style={{ color: colorPrimary }}>{text}</span>
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchStudents(UserType.STUDENT);
    fetchUnits();
  };

  useEffect(() => {
    if (formField && Object.keys(formField).length > 0) {
      form.setFieldsValue({
        email: formField.email,
        name: formField.name,
        phone: formField.phone,
        address: formField.address,
        unit_id: formField.unit_id,
      });
    }
  }, [formField]);

  const onSuccess = () => {
    messageApi.success({
      content: "Success",
    });
    fetchData();
    handleCancel();
    form.resetFields();
  };

  const onFailure = () => {
    messageApi.error({
      content: "Error",
    });
    handleCancel();
  };

  const onFinishAdd = (values: any) => {
    const payload = {
      ...values,
      type: UserType.STUDENT,
    };
    createStudent(
      payload,
      () => {
        onSuccess();
      },
      () => {
        onFailure();
      }
    );
  };

  const hendleEdit = (record: any) => {
    setFormField(record);
    setIsModalOpenEdit(true);
  };

  const onFinishEdit = (values: any) => {
    const payload = {
      ...values,
      id: formField?.id,
    };
    updateStudent(
      payload,
      () => {
        onSuccess();
      },
      () => {
        onFailure();
      }
    );
  };

  const hendleDelete = (record: any) => {
    setFormField(record);
    setIsModalOpenDelete(true);
  };

  const onFinishDelete = () => {
    deleteStudent(
      formField?.id,
      () => {
        onSuccess();
      },
      () => {
        onFailure();
      }
    );
    fetchData();
  };

  const handleCancel = () => {
    setIsModalOpenAdd(false);
    setIsModalOpenEdit(false);
    setIsModalOpenDelete(false);
    setFormField(undefined)
  };

  const columns: ColumnType<User>[] = [
    {
      render: (record) => (
        <React.Fragment>
          <div className="hide-lg">
            {[
              { label: "Email", value: record.email },
              { label: "Name", value: record.name },
              { label: "Phone", value: record.phone },
              { label: "Addess", value: record.address },
            ].map((item, index) => (
              <Row key={index}>
                <Col span={6}>{item.label}</Col>
                <Col
                  span={18}
                  style={{ display: "flex", justifyContent: "right" }}
                >
                  {item.value}
                </Col>
              </Row>
            ))}
            <Row>
              <Col span={6}>Action</Col>
              <Col
                span={18}
                style={{ display: "flex", justifyContent: "right" }}
              >
                <Space wrap>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => hendleEdit(record)}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    danger
                    onClick={() => hendleDelete(record)}
                  >
                    Xóa
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        </React.Fragment>
      ),
      responsive: ["xs", "sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => highLightText(text),
      responsive: ["md"],
    },
    {
      title: "User name",
      dataIndex: "name",
      responsive: ["md"],
    },
    {
      title: "Phone",
      dataIndex: "phone",
      responsive: ["md"],
    },
    {
      title: "Addess",
      dataIndex: "address",
      width: 120,
      responsive: ["md"],
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (record: User) => {
        return (
          <Space wrap>
            <Button
              size={"small"}
              type="primary"
              onClick={() => hendleEdit(record)}
            >
              Chỉnh sửa
            </Button>
            <Button
              size={"small"}
              type="primary"
              danger
              onClick={() => hendleDelete(record)}
            >
              Xóa
            </Button>
          </Space>
        );
      },
      responsive: ["md"],
    },
  ];

  const onPaginationChanged = (page: number, pageSize: number) => {
    setOptions({
      page,
      itemPerPage: pageSize,
    });
  };

  return (
    <>
      {contextHolder}
      <AddButton title="Student Management" onChange={() => setIsModalOpenAdd(true)} />
      <Table
        loading={loading}
        columns={columns}
        dataSource={studentList}
        rowKey={(data) => `key-${data.id}`}
        size="middle"
        pagination={{
          defaultCurrent: options.page,
          hideOnSinglePage: true,
          responsive: true,
          pageSize: options.itemPerPage,
          total: studentTotal,
          onChange: onPaginationChanged.bind(this),
        }}
      />
      <Modal
        title="Add new student"
        open={isModalOpenAdd}
        onCancel={handleCancel}
        okButtonProps={{ form: "add_user", htmlType: "submit" }}
      >
        <UserForm
          formName={"add_user"}
          show={true}
          onFinish={onFinishAdd}
          unitList={unitList}
        />
      </Modal>
      <Modal
        title={`${formField?.name} editing`}
        open={isModalOpenEdit}
        onCancel={handleCancel}
        okButtonProps={{ form: "edit_user", htmlType: "submit" }}
      >
        <UserForm
          form={form}
          formName={"edit_user"}
          onFinish={onFinishEdit}
          unitList={unitList}
        />
      </Modal>
      <Modal
        title={`Delete ${formField?.name}`}
        open={isModalOpenDelete}
        onCancel={handleCancel}
        onOk={onFinishDelete}
        okButtonProps={{ form: "delete_user", htmlType: "submit" }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `Bạn có chắc chắn xóa học sinh <strong>${formField?.name}</strong> không ?`,
          }}
        ></div>
      </Modal>
    </>
  );
};

Students.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticationWrapperAdmin>{page}</AuthenticationWrapperAdmin>;
};

const mapStateToProps = (state: any) => ({
  studentList: state.user.list,
  studentTotal: state.user.total,
  loading: state.user.loading,
  //
  unitList: state.unit.list,
});

const mapDispatch = {
  createStudent: createNewUser,
  fetchStudents: fetchUserList,
  updateStudent: updateUserInfo,
  deleteStudent: deleteUserInfo,
  //
  fetchUnits: fetchUnitList,
};

export default connect(mapStateToProps, mapDispatch)(Students);
