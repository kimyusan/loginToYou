import { Logo, MiddleMsg, SnsLogin, LoginBtn } from '../styles/Login/Login';
import KakaoLoginBtn from '../styles/Login/kakao_login.png';
import GoogleLoginBtn from '../styles/Login/Google_login.png';
import NaverLoginBtn from '../styles/Login/Naver_login.png'
import LoginForm from '../components/Login/LoginForm';

const Login = () => {
  const kakao_url = "https://kauth.kakao.com/oauth/authorize?client_id=5a8a53240d6799ecf38d7454ab5579b3&" +
    "redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code"

  const google_url = "https://accounts.google.com/o/oauth2/auth?" +
    "client_id=760132367951-6ffft4jm5bcmocsmpis4p23nbus7vdgk.apps.googleusercontent.com&" +
    "redirect_uri=http://localhost:3000&" +
    "response_type=token&" +
    "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

  return (
    <div>
      <Logo>
        <div>SPY x COUPLE</div>
        <LoginForm></LoginForm>
      </Logo>
      <MiddleMsg><div>⚡ 빠르게 가입해보세요! ↓</div></MiddleMsg>
      <SnsLogin>
        <LoginBtn onClick={() => { window.open(kakao_url) }} $img={KakaoLoginBtn}></LoginBtn>
        <LoginBtn onClick={() => { window.open(google_url) }} $img={GoogleLoginBtn}></LoginBtn>
        <LoginBtn onClick={() => { window.open(google_url) }} $img={NaverLoginBtn}></LoginBtn>
      </SnsLogin>
    </div>
  )
}

export default Login;