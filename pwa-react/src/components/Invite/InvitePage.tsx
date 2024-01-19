import React from "react";
import { UserInterface } from "../../interface/UserInterface";

function InvitePage({ user_id, name, email }: UserInterface) {
  return (
    <>
      <div className="flex f-col mb-30">
        <div>QR코드를 통해 연인을 등록하고</div>
        <div>너로를 시작해 보세요</div>
      </div>
      <div className="mb-30">
        <span className="ft-bd">{name}</span>님의 QR코드
      </div>
    </>
  );
}

export default InvitePage;
