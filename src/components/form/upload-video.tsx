import React from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

type Props = {
  videoUrl: any
  fileList: any;
  onChange: any;
};

function FormUploadVideo({videoUrl, fileList, onChange }: Props) {
  return (
    <div>
      <Upload listType="picture" maxCount={1} accept="video/*" fileList={fileList} onChange={onChange} className="upload-list-inline">
        {fileList.length < 1 && (
          <Button icon={<UploadOutlined />}>Upload Video</Button>
        )}
      </Upload>
      {videoUrl && (
        <div>
          <video className="modal-upload-video" src={videoUrl} controls width="100%"  controlsList="nodownload"/>
        </div>
      )}
    </div>
  );
}

export default FormUploadVideo;