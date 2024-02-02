import { Logo, MiddleMsg, SnsLogin, LoginBtn } from "../styles/Login/Login";
import KakaoLoginBtn from "../styles/Login/kakao_login.png";
import GoogleLoginBtn from "../styles/Login/Google_login.png";
import NaverLoginBtn from "../styles/Login/Naver_login.png";
import LoginForm from "../components/Login/LoginForm";
import AppLogo from "../styles/common/AppLogo.png";

const Login = () => {
  const kakao_url =
    "https://kauth.kakao.com/oauth/authorize?client_id=5a8a53240d6799ecf38d7454ab5579b3&" +
    "redirect_uri=https%3A%2F%2Flogintoyou.kro.kr%3A8443%2Fmiddle%2Flogin&response_type=code";

  const google_url =
    "https://accounts.google.com/o/oauth2/auth?" +
    "client_id=760132367951-6ffft4jm5bcmocsmpis4p23nbus7vdgk.apps.googleusercontent.com&" +
    "redirect_uri=https://logintoyou.kro.kr/middle/login&" +
    "response_type=token&" +
    "scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

  const naver_url =
    "https://nid.naver.com/oauth2.0/authorize?response_type=code&" +
    "client_id=H3hbCg2IUznqo9J6IdEO&" +
    "state=STATE_STRING&" +
    "redirect_uri=https://logintoyou.kro.kr/middle/login";

  const SNS = (url: string) => {
    window.location.href = url;
  };

  return (
    <div>
      <Logo>
        <img src={AppLogo} alt="앱 로고"></img>
        <LoginForm></LoginForm>
      </Logo>
      <MiddleMsg>
        <div>⚡ 빠르게 가입해보세요! ↓</div>
      </MiddleMsg>
      <SnsLogin>
        <LoginBtn onClick={() => SNS(kakao_url)} $img={KakaoLoginBtn}></LoginBtn>
        <LoginBtn onClick={() => SNS(google_url)} $img={GoogleLoginBtn}></LoginBtn>
        <LoginBtn onClick={() => SNS(naver_url)} $img={NaverLoginBtn}></LoginBtn>
      </SnsLogin>
    </div>
  );
};

export default Login;
