import React from "react";
import { useParams } from "react-router-dom";

type Props = {};

const UserInfo = (props: Props) => {
  const { user_id } = useParams();
  return <div>UserInfo</div>;
};

export default UserInfo;
