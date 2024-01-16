import React from "react";
import { Card } from "../../styles/common/card";

type Props = {};

const NoticeCard = (props: Props) => {
  return (
    <Card>
      <div>
        <h4 style={{ margin: 0 }}>공지사항</h4>
        <hr />
      </div>
    </Card>
  );
};

export default NoticeCard;
