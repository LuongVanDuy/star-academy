import React, { type ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "../../../_app";
import { useRouter } from "next/router";
import { Col, List, Row } from "antd";
import AuthenticationWrapper from "@/layouts/wrapper/AuthenticationWrapper";
import { fetchUnitDetail } from "@/store/actions/unit";
import { connect } from "react-redux";
import { fetchLessonDetail, fetchLessonList } from "@/store/actions/lesson";
import ImageItem from "@/components/image";

const Index: NextPageWithLayout = (props: any) => {
  const {
    fetchUnit,
    unitDetail,
    loading,
    lessonList,
    fetchLessons,
    fetchLesson,
    lessonDetail,
  } = props;
  const router = useRouter();

  const unit_id =
    typeof router.query.id === "string" ? (router.query.id as string) : "";

  const lesson_id =
    typeof router.query.lesson_id === "string"
      ? (router.query.lesson_id as string)
      : "";

  useEffect(() => {
    const videoElement = document.querySelector("video");

    if (videoElement) {
      videoElement.addEventListener("contextmenu", (event) => {
        event.preventDefault();
      });
      window.addEventListener("keydown", (event) => {
        if (event.ctrlKey && (event.key === "s" || event.key === "S")) {
          event.preventDefault();
          console.log("Ctrl + S Prevented");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (unit_id) {
      fetchUnit(unit_id);
      fetchLessons(unit_id);
      fetchLesson(lesson_id);
    }
  }, [unit_id]);

  const onClick = async (item: any) => {
    const currentPath = router.asPath;
    const pathParts = currentPath.split("/");
  
    const lessonIndex = pathParts.findIndex((part) => part === "lesson");
  
    if (lessonIndex !== -1) {
      pathParts[lessonIndex + 1] = item.id;
  
      const newUrl = pathParts.join("/");
      await router.push(newUrl);
      await fetchLesson(item.id);
    }
  };

  return (
    <>
      <h2>{unitDetail ? `${unitDetail.name}'s Lessons` : ""}</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={16}>
          <video
            src={lessonDetail.video}
            className="video-lesson-detail"
            controls
            controlsList="nodownload"
          />
          <h4>{lessonDetail.name}</h4>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <List
            loading={loading}
            dataSource={lessonList}
            grid={{ xs: 2, sm: 3, md: 2, lg: 2, xl: 2, xxl: 2 }}
            renderItem={(item: any) => (
              <ImageItem
                cardLoading={loading}
                item={item}
                onClick={
                  item.id !== lesson_id ? () => onClick(item) : undefined
                }
                onClickEdit={() => console.log()}
              />
            )}
          />
        </Col>
      </Row>
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticationWrapper>{page}</AuthenticationWrapper>;
};

const mapStateToProps = (state: any) => ({
  unitDetail: state.unit.detail,
  //
  lessonDetail: state.lesson.detail,
  lessonList: state.lesson.list,
});

const mapDispatch = {
  fetchUnit: fetchUnitDetail,
  //
  fetchLesson: fetchLessonDetail,
  fetchLessons: fetchLessonList,
};

export default connect(mapStateToProps, mapDispatch)(Index);
