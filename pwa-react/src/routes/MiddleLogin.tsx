import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/AuthStore';

const MiddleLogin = () => {
  const navigate = useNavigate();
  const { PATH, login } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');

    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = hashParams.get('access_token');

    if (code) {
      // 카카오 또는 네이버 로그인 처리
      const provider = state ? 'naver' : 'kakao';
      const apiUrl = provider === 'naver' ?`${PATH}/user/login/naver` :
        provider === 'kakao' ? `${PATH}/user/login/kakao` : null;

      if (apiUrl) {
        console.log(`${provider} 로그인 : `, code);
        const formData = new FormData();
        formData.append("code", code);

        // 네이버의 경우 state 값을 함께 전송
        if (provider === 'naver' && state) {
          formData.append("state", state);
        }
        
        axios.post(apiUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        })
          .then(response => {
            console.log("로그인 성공");
            console.log(response.data);
          })
          .catch(error => {
            console.error("로그인 실패");
            console.error(error);
          });
      }
    } else if (accessToken) {
      // 구글 로그인 처리
      const googleApiUrl = `${PATH}/user/login/google`;

      console.log('구글 로그인 : ', accessToken)
      axios.post(googleApiUrl, { "access_Token": accessToken }, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })
        .then(response => {
          console.log("Google 로그인 성공");
          console.log(response.data);
        })
        .catch(error => {
          console.error("Google 로그인 실패");
          console.error(error);
        });
    }

    axios.get(`${PATH}/user/info`)
      .then((res) => {
        console.log("아이디 있음", res.data)
        login()
        navigate("/main")
      })
      .catch((error) => {
        console.log("아이디 없음")
        navigate("/signup",)
      })
  }, [])

  return (
    <div></div>
  )
}

export default MiddleLogin;