import React, { type ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import { List } from "antd";
import AuthenticationWrapper from "@/layouts/wrapper/AuthenticationWrapper";
import { fetchUnitDetail } from "@/store/actions/unit";
import { connect } from "react-redux";
import ImageItem from "@/components/image";
import { fetchLessonList } from "@/store/actions/lesson";

const Index: NextPageWithLayout = (props: any) => {
  const { fetchUnit, unitDetail, loading, lessonList, fetchLessons } = props;
  const router = useRouter();

  const unit_id =
    typeof router.query.id === "string" ? (router.query.id as string) : "";

  useEffect(() => {
    if (unit_id) {
      fetchUnit(unit_id);
      fetchLessons(unit_id);
    }
  }, [unit_id]);

  const onClick = (item: any) => {
    router.push(`${unit_id}/lesson/${item.id}`);
  };

  return (
    <>
      <h2>{unitDetail ? `${unitDetail.name}'s Lessons` : ""}</h2>
      <List
        style={{ marginTop: "20px" }}
        loading={loading}
        dataSource={lessonList}
        grid={{ xs: 3, sm: 4, md: 5, lg: 6, xl: 7, xxl: 8 }}
        renderItem={(item: any) => (
          <ImageItem
            cardLoading={loading}
            item={item}
            onClick={() => onClick(item)}
            onClickEdit={() => console.log(1)}
          />
        )}
      />
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticationWrapper>{page}</AuthenticationWrapper>;
};

const mapStateToProps = (state: any) => ({
  unitDetail: state.unit.detail,
  //
  lessonList: state.lesson.list,
});

const mapDispatch = {
  fetchUnit: fetchUnitDetail,
  //
  fetchLessons: fetchLessonList,
};

export default connect(mapStateToProps, mapDispatch)(Index);
