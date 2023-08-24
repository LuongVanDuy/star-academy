import React, { type ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import { useRouter } from "next/router";
import { Button, Card, List, Row } from "antd";
import AuthenticationWrapper from "@/layouts/wrapper/AuthenticationWrapper";
import { fetchUnitListActive } from "@/store/actions/unit";
import { connect } from "react-redux";
import ImageItem from "@/components/image";
import { Unit } from "@/types/unit";
import { useAuth } from "../layouts/context/AuthContext";
import { UserType } from "@/types/user";

const Index: NextPageWithLayout = (props: any) => {
  const { fetchUnits, unitList, loading } = props;
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth && auth.unit_id) {
      fetchUnits(auth.unit_id);
    }
    if (auth && auth.type === UserType.SYSTEM) {
      setShowPopup(true);
    }
  }, []);

  const onClick = (item: any) => {
    router.push(`/${item.id}`);
  };

  return (
    <>
      {showPopup ? (
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Card style={{ marginTop: "20px" }}>
            <h3>Đây là màn hình dành cho học sinh</h3>
            <Button type="primary" onClick={() => router.push("/admin")}>
              Di chuyển đến màn dành hình quản trị
            </Button>
          </Card>
        </Row>
      ) : (
        <>
          <h2>Units</h2>
          <List
            loading={loading}
            dataSource={unitList}
            grid={{ xs: 2, sm: 3, md: 4, lg: 4, xl: 5, xxl: 6 }}
            renderItem={(item: Unit) => (
              <ImageItem
                cardLoading={loading}
                item={item}
                onClick={() => onClick(item)}
                onClickEdit={() => false}
              />
            )}
          />
        </>
      )}
    </>
  );
};

Index.getLayout = function getLayout(page: ReactElement) {
  return <AuthenticationWrapper>{page}</AuthenticationWrapper>;
};

const mapStateToProps = (state: any) => ({
  unitList: state.unit.listAvtive,
  loading: state.unit.loading,
});

const mapDispatch = {
  fetchUnits: fetchUnitListActive,
};

export default connect(mapStateToProps, mapDispatch)(Index);
