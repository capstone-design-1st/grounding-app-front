import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, PasswordInput, Button } from "../../index";
import "./styles.css";
import { useMutation } from "react-query";
import { login } from "../../../apis/Login";

interface FormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation(login, {
    onSuccess: (data) => {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", data.payload.access_token);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      alert("로그인에 실패했습니다.");
    },
  });

  const [autoLoginChecked, setAutoLoginChecked] = useState(false);
  const [saveIdChecked, setSaveIdChecked] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const isFormFilled =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  const submitLogin = () => {
    if (isFormFilled) {
      mutate({ email: formData.email, password: formData.password });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <div className="loginBox">
        <input
          name="email"
          type="text"
          placeholder="이메일"
          value={formData.email}
          onChange={handleInputChange}
          className="login-input"
        />
        <PasswordInput
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleInputChange}
          handleInputChange={handleInputChange}
          className="login-input"
        />
      </div>

      <div className="checkboxWrapper">
        <Checkbox
          id={"autoLogin"}
          label="자동 로그인"
          checked={autoLoginChecked}
          setIsChecked={setAutoLoginChecked}
        />
        <Checkbox
          id={"saveId"}
          label="아이디 저장"
          checked={saveIdChecked}
          setIsChecked={setSaveIdChecked}
        />
      </div>

      <Button
        width="100%"
        onClick={submitLogin}
        text="로그인"
        padding="16px"
        fontSize="18px"
        color="white"
        background={isFormFilled ? "var(--main)" : "var(--grey3)"}
      />
    </div>
  );
};

export default LoginForm;
