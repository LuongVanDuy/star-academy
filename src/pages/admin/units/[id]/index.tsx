import React, { useState, type ReactElement, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { Form, List, Modal, Spin, UploadFile, message } from "antd";
import { NextPageWithLayout } from "../../../_app";
import AddButton from "@/components/button/add";
import ImageItem from "@/components/image";
import { fetchUnitDetail } from "@/store/actions/unit";
import { UploadFileStatus, UploadProps } from "antd/es/upload/interface";
import AddLessionForm from "@/components/form/actions/lession-form";
import { fetchLessonList, createNewLesson, updateLessonInfo } from "@/store/actions/lesson";
import { Lesson } from "@/types/lesson";
import AuthenticationWrapperAdmin from "@/layouts/wrapper/AuthenticationWrapperAdmin";

const Units: NextPageWithLayout = (props: any) => {
  const {
    fetchUnit,
    unitDetail,
    createLesson,
    createLoading,
    fetchLessons,
    updateLesson,
    updateLoading,
    loading,
    lessonList,
  } = props;
  const router = useRouter();
  const [form_edit] = Form.useForm();
  const [form_add] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [formField, setFormField] = useState<Lesson | undefined>();
  const [tempFileList, setTempFileList] = useState<UploadFile[]>([]);
  const [fileListImg, setFileListImg] = useState<UploadFile[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const unit_id =
    typeof router.query.id === "string" ? (router.query.id as string) : "";

  useEffect(() => {
    if (unit_id) {
      fetchUnit(unit_id);
      fetchLessons(unit_id);
    }
  }, [unit_id]);

  const onSuccess = () => {
    messageApi.success({
      content: "Cập nhật thành công",
    });
    fetchLessons(unit_id);
    handleCancel();
  };

  const onFailure = () => {
    messageApi.error({
      content: "Cập nhật không thành công",
    });
  };

  useEffect(() => {
    if (formField && Object.keys(formField).length > 0) {
      form_edit.setFieldsValue({
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
        form_edit?.setFieldValue("image", file);
        setTempFileList([file]);
      }
      if (formField.video) {
        const file = {
          uid: "video-0",
          name: formField.name,
          status: "done" as UploadFileStatus,
          url: formField.video,
        };
        form_edit?.setFieldValue("video", file);
        setVideoUrl(file.url);
        setFileListImg([file]);
      }
    }
  }, [formField]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setTempFileList(newFileList);
    if (newFileList.length === 0) {
      form_add.setFieldsValue({ image: undefined });
      form_add.validateFields(["image"]);
      form_edit.setFieldsValue({ image: undefined });
      form_edit.validateFields(["image"]);
    }
  };

  const onChangeImg: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileListImg(newFileList);

    if (newFileList.length === 0) {
      form_add.setFieldsValue({ video: undefined });
      form_add.validateFields(["video"]);
      form_edit.setFieldsValue({ video: undefined });
      form_edit.validateFields(["video"]);
      setVideoUrl(null);
    }

    if (newFileList.length > 0 && newFileList[0].originFileObj) {
      const videoObjectUrl = URL.createObjectURL(newFileList[0].originFileObj);
      setVideoUrl(videoObjectUrl);

      return () => {
        URL.revokeObjectURL(videoObjectUrl);
      };
    }
    return undefined;
  };

  const handleAdd = () => {
    setIsModalOpenAdd(true);
    setTempFileList([]);
    setFileListImg([]);
  };

  const onFinishAdd = async (values: any) => {
    createLesson(
      {
        ...values,
        unit_id: unit_id,
      },
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

  const onFinishEdit = async (values: any) => {
    updateLesson(
      {
        ...values,
        unit_id: unit_id,
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
    setTempFileList([]);
    setFileListImg([]);
    setFormField(undefined);
    setVideoUrl(null);
    form_add.resetFields();
  };

  return (
    <>
      {contextHolder}
      <AddButton
        title={unitDetail ? `${unitDetail.name}'s Lessons` : ""}
        onChange={handleAdd}
      />
      <List
        style={{ marginTop: "20px" }}
        loading={loading}
        dataSource={lessonList}
        grid={{ xs: 3, sm: 4, md: 5, lg: 6, xl: 7, xxl: 8 }}
        renderItem={(item: any) => (
          <ImageItem
            cardLoading={loading}
            item={item}
            onClick={() => hendleEdit(item)}
            onClickEdit={() => hendleEdit(item)}
            show={true}
          />
        )}
      />
      <Modal
        title="Add new lesson"
        open={isModalOpenAdd}
        onCancel={handleCancel}
        okButtonProps={{ form: "add_unit", htmlType: "submit" }}
      >
        {createLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin/>
            <p>Đang tải video...</p>
            <p>Vui lòng không đóng tab hoặc trình duyệt</p>
          </div>
        ) : (
          <AddLessionForm
            form={form_add}
            formName={"add_unit"}
            fileList={tempFileList}
            onChange={onChange}
            onFinish={onFinishAdd}
            fileListImg={fileListImg}
            videoUrl={videoUrl}
            onChangeImg={onChangeImg}
            loading={true}
          />
        )}
      </Modal>
      <Modal
        title={`${formField?.name} Edditing`}
        open={isModalOpenEdit}
        onCancel={handleCancel}
        okButtonProps={{ form: "edit_unit", htmlType: "submit" }}
      >
        {updateLoading ? (
          <div style={{ textAlign: "center" }}>
            <Spin/>
            <p>Đang tải video...</p>
            <p>Vui lòng không đóng tab hoặc trình duyệt</p>
          </div>
        ) : (
          <AddLessionForm
            form={form_edit}
            formName={"edit_unit"}
            fileList={tempFileList}
            onChange={onChange}
            onFinish={onFinishEdit}
            fileListImg={fileListImg}
            videoUrl={videoUrl}
            onChangeImg={onChangeImg}
            loading={true}
          />
        )}
      </Modal>
    </>
  );
};

Units.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticationWrapperAdmin>{page}</AuthenticationWrapperAdmin>;
};

const mapStateToProps = (state: any) => ({
  lessonList: state.lesson.list,
  createLoading: state.lesson.createLoading,
  updateLoading: state.lesson.updateLoading,
  loading: state.lesson.loading,
  //
  unitDetail: state.unit.detail,
});

const mapDispatch = {
  createLesson: createNewLesson,
  fetchLessons: fetchLessonList,
  updateLesson: updateLessonInfo,
  //
  fetchUnit: fetchUnitDetail,
};

export default connect(mapStateToProps, mapDispatch)(Units);
