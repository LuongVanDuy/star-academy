import React from "react";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";

type Props = {
  aspect: any;
  fileList: any;
  onChange: any;
};

function FormUploadImage({aspect, fileList = [], onChange }: Props) {
  
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <ImgCrop aspect={aspect} rotationSlider modalClassName="modal-crop-image">
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
      >
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default FormUploadImage;

