<<<<<<< HEAD
import React, { useState } from "react";
import InviteMain from "../components/Invite/InviteMain";
import InviteWaiting from "../components/Invite/InviteWaiting";
import { User } from "../interface/UserInterface";

// 테스트용 더미데이터
const test = {
  user_id: 1,
  user_name: "김싸피",
  user_code: "JS12KJ5F",
};

const Invite = () => {
  const [isInvited, setIsInvited] = useState(false);
  const [invitedPerson, setInvitedPerson] = useState<User>();

  return (
    <div>
      {isInvited ? (
        <InviteWaiting
          invitedPerson={invitedPerson}
          setIsInvited={setIsInvited}
          setInvitedPerson={setInvitedPerson}
        />
      ) : (
        <InviteMain
          user_id={test.user_id}
          user_name={test.user_name}
          user_code={test.user_code}
          setIsInvited={setIsInvited}
          setInvitedPerson={setInvitedPerson}
        />
      )}
    </div>
=======
import React, { useEffect, useState } from "react";
import { UserInterface } from "../interface/UserInterface";
import { Wrapper } from "../styles/Invite/Compos";
import { QRCodeCanvas } from "qrcode.react";
import InvitePage from "../components/Invite/InvitePage";
import ShareButton from "../components/Invite/ShareButton";
import useUserStore from "../stores/UserStore";

const Invite = () => {
  const user = useUserStore();

  return (
    <Wrapper>
      <InvitePage userId={user.userId} name={user.name} email={user.email} />
      <QRCodeCanvas
        value={`http://localhost:3000/invite/${user.userId}/${user.name}/`}
        className="mb-30"
      />
      <ShareButton />
    </Wrapper>
>>>>>>> 6bc7bc998d25daf24d2dbf789dba0b2efb4d6fff
  );
};

export default Invite;
