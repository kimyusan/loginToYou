import React, { useEffect } from "react";
import axios from "axios";
import useAuthStore from "../stores/AuthStore";
import useUserStore from "../stores/UserStore";
import { useShallow } from "zustand/react/shallow";
import { useLocation } from "react-router-dom";

function TokenCheker() {
  const location = useLocation();
  const { email } = useUserStore(
    useShallow((state) => ({
      email: state.email,
    }))
  );

  const {
    PATH,
    token,
    refToken,
    tokenExpireTime,
    setToken,
    setTokenExpireTime,
  } = useAuthStore(
    useShallow((state) => ({
      PATH: state.PATH,
      token: state.token,
      refToken: state.refToken,
      tokenExpireTime: state.tokenExpireTime,
      setToken: state.setToken,
      setTokenExpireTime: state.setTokenExpireTime,
    }))
  );

  const refresh = async () => {
    console.log("토큰을 재발행합니다.");
    const res = await axios.post(
      `${PATH}/reissue/token`,
      {},
      {
        params: {
          email: email,
        },
        headers: {
          refreshToken: refToken,
        },
      }
    );

    const now = new Date().getTime();
    setToken(res.headers.authorization, res.headers.refreshtoken);
    setTokenExpireTime(now);
    console.log("토큰 변경 완료");
  };

  const updateToken = () => {
    if (
      email == null ||
      token == null ||
      refToken == null ||
      tokenExpireTime == null
    )
      return;
    const now = new Date().getTime();
    console.log(tokenExpireTime, now);
    console.log(
      "남은 시간: ",
      Math.round((tokenExpireTime - now) / 1000 / 60),
      "분"
    );

    console.log(
      tokenExpireTime - now < 1000 * 60 * 5 ? "토큰 재발행 필요" : "토큰 유효"
    );
    if (tokenExpireTime - now < 1000 * 60 * 5) {
      refresh();
      if (location.pathname == "/main") {
        window.location.reload();
      }
    }
  };

  useEffect(() => {
    updateToken();
    console.log(location.pathname);
  }, []);

  return <div></div>;
}

export default TokenCheker;

// import React, { useEffect } from 'react';
// import axios from 'axios';
// import useAuthStore from '../stores/AuthStore';
// import useUserStore from '../stores/UserStore';
// import { useShallow } from 'zustand/react/shallow';

// function TokenChecker() {
//   const { email } = useUserStore(
//     useShallow((state) => ({
//       email: state.email,
//     }))
//   );

//   const {
//     PATH,
//     token,
//     refToken,
//     tokenExpireTime,
//     setToken,
//     setTokenExpireTime,
//   } = useAuthStore(
//     useShallow((state) => ({
//       PATH: state.PATH,
//       token: state.token,
//       refToken: state.refToken,
//       tokenExpireTime: state.tokenExpireTime,
//       setToken: state.setToken,
//       setTokenExpireTime: state.setTokenExpireTime,
//     }))
//   );

//   const refresh = async () => {
//     try {
//       console.log('Attempting to refresh the token...');
//       const response = await axios.post(`${PATH}/reissue/token`, null, {
//         params: {
//           email: email,
//         },
//         headers: {
//           refreshToken: refToken,
//         },
//       });

//       const now = new Date().getTime();
//       setToken(response.headers.authorization, response.headers.refreshtoken);
//       setTokenExpireTime(now + 1000 * 60 ); // Assuming new token lasts for 1 hour, for example
//       console.log('Token has been successfully refreshed.');
//     } catch (error) {
//       console.error('Token refresh failed:', error);
//       // Handle failed refresh here (e.g., by logging out the user or showing a message)
//     }
//   };

//   useEffect(() => {
//     if (!email || !refToken) {
//       // If we don't have email or refreshToken, we cannot refresh the token
//       return;
//     }
//     const checkTokenValidity = () => {
//       const now = new Date().getTime();
//       // Check if the token is about to expire (or already expired)
//       if (!tokenExpireTime) return
//       if (tokenExpireTime <= now) {
//         refresh();
//       }
//     };

//     // Check immediately in case the token is already expired
//     checkTokenValidity();

//     // Set an interval to check the token validity periodically
//     const intervalId = setInterval(checkTokenValidity, 30000); // Every 30 seconds

//     // Clear interval on cleanup
//     return () => clearInterval(intervalId);
//   // The effect should depend on the minimal set of values it uses
//   }, [email, refToken, tokenExpireTime, refresh]);

//   // Rendering nothing as this is just a token management component
//   return null;
// }

// export default TokenChecker;
