import React, { useState, type ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  Form,
  List,
  Modal,
  UploadFile,
  message,
} from "antd";
import { NextPageWithLayout } from "../../_app";
import AddButton from "@/components/button/add";
import ImageItem from "@/components/image";
import UnitForm from "@/components/form/actions/unit-form";
import { fetchUnitList, createNewUnit, updateUnitInfo } from "@/store/actions/unit";
import { Unit } from "@/types/unit";
import { UploadFileStatus, UploadProps } from "antd/es/upload/interface";
import AuthenticationWrapperAdmin from "@/layouts/wrapper/AuthenticationWrapperAdmin";

const Units: NextPageWithLayout = (props: any) => {
  const { createUnit, fetchUnits, updateUnit, loading, unitList } = props;
  const router = useRouter();
  const [form] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [formField, setFormField] = useState<Unit | undefined>();
  const [tempFileList, setTempFileList] = useState<UploadFile[]>([]);
  
  const onSuccess = () => {
    messageApi.success({
      content: "Success",
    });
    fetchData();
    handleCancel();
  };

  const onFailure = () => {
    messageApi.error({
      content: "Error",
    });
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchUnits();
  };

  useEffect(() => {
    if (unitList && Object.keys(unitList).length > 0) {
      setDataSource(unitList);
    }
  }, [unitList]);
  
  useEffect(() => {
    if (formField && Object.keys(formField).length > 0) {
      form.setFieldsValue({
        name: formField.name,
        image: formField.image,
      });
      if (formField.image) {
        const file = {
          uid: "image-0", 
          name: "Image 0",
          status: "done" as UploadFileStatus,
          url: formField.image, 
        };
        form?.setFieldValue("image", file);
        setTempFileList([file]);
      }
    }
  }, [formField]);

  const handleAdd = () => {
    setIsModalOpenAdd(true);
    setTempFileList([])
  };
  
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (newFileList.length === 0) {
      form.setFieldsValue({ image: undefined });
      form.validateFields(["image"]);
      formAdd.setFieldsValue({ image: undefined });
      formAdd.validateFields(["image"]);
    }
    setTempFileList(newFileList);
  };

  const onFinishAdd = async (values: any) => {
    createUnit(
      values,
      () => {
        onSuccess();
      },
      () => {
        onFailure();
      }
    );
  };
  
  const handleEdit = (record: any) => {
    setFormField(record)
    setIsModalOpenEdit(true)
  };
  
  const onFinishEdit = async (values: any) => {
    updateUnit(
      {
        ...values,
        id: formField?.id,
      },
      () => {
        onSuccess();
      },
      () => {
        onFailure();
      }
    );
  };

  const handleCancel = () => {
    setIsModalOpenAdd(false);
    setIsModalOpenEdit(false);
    setFormField(undefined);
  };
  
  const onClickDetail = (item: any) => {
    router.push(`/admin/units/${item.id}`);
  };
  
  return (
    <>
      {contextHolder}
      <AddButton title="Units Management" onChange={handleAdd} />
      <List
        style={{ marginTop: "20px" }}
        loading={loading}
        dataSource={dataSource}
        grid={{ xs: 2, sm: 3, md: 4, lg: 4, xl: 5, xxl: 6 }}
        renderItem={(item) => (
          <ImageItem cardLoading={loading} item={item} onClick={() => onClickDetail(item)} onClickEdit={() => handleEdit(item)} show={true}/>
        )}
      />
      <Modal
        title="Add new unit"
        open={isModalOpenAdd}
        onCancel={handleCancel}
        okButtonProps={{ form: "add_unit", htmlType: "submit" }}
      >
        <UnitForm
          form={formAdd}
          formName={"add_unit"}
          fileList={tempFileList}
          onChange={onChange}
          onFinish={onFinishAdd}
        />
      </Modal>
      <Modal
        title={`${formField?.name} editing`}
        open={isModalOpenEdit}
        onCancel={handleCancel}
        okButtonProps={{ form: "edit_unit", htmlType: "submit" }}
      >
        <UnitForm
          form={form}
          formName={"edit_unit"}
          fileList={tempFileList}
          onChange={onChange}
          onFinish={onFinishEdit}
        />
      </Modal>
    </>
  );
};

Units.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticationWrapperAdmin>{page}</AuthenticationWrapperAdmin>;
};

const mapStateToProps = (state: any) => ({
  unitList: state.unit.list,
  loading: state.unit.loading,
});

const mapDispatch = {
  createUnit: createNewUnit,
  fetchUnits: fetchUnitList,
  updateUnit: updateUnitInfo,
};

export default connect(mapStateToProps, mapDispatch)(Units);
