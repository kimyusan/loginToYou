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
  );
};

export default Invite;
