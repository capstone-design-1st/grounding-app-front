import { useNavigate } from "react-router-dom";
import "./styles.css";
import logo from "../../assets/imgs/big-logo.png";
import { LoginForm } from "../../components/index";

const Login = () => {
  const navigate = useNavigate();
  const handleFindId = () => {
    console.log("아이디찾기");
  };

  const handleSignIn = () => {
    navigate("/signup");
  };

  const handleNewPassword = () => {
    console.log("비밀번호 재설정");
  };

  return (
    <div className="loginWrapper">
      <img src={logo} className="logo" alt="logo" />

      <LoginForm />

      <div className="linkWrapper">
        <span className="link" onClick={handleFindId}>
          아이디 찾기
        </span>
        <span className="divider">|</span>

        <span className="link" onClick={handleNewPassword}>
          비밀번호 재설정
        </span>

        <span className="divider">|</span>
        <span className="link" onClick={handleSignIn}>
          회원가입
        </span>
      </div>

      <div className="loginMessage">
        <p>로그인하면 그라운딩의 이용약관에 동의하는 것으로 간주합니다.</p>
        <p>
          그라운딩의 회원 정보 처리 방식은 <span>개인정보 처리방침</span> 및{" "}
          <span>쿠키 정책</span>
          에서 확인해보세요.
        </p>
      </div>
    </div>
  );
};

export default Login;
