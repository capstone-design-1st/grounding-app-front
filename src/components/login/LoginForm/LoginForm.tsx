import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, PasswordInput, Button } from "../../index";
import "./styles.css";

interface FormData {
  userId: string;
  password: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [autoLoginChecked, setAutoLoginChecked] = useState(false);
  const [saveIdChecked, setSaveIdChecked] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    userId: "",
    password: "",
  });

  const isFormFilled =
    formData.userId.trim() !== "" && formData.password.trim() !== "";

  const handleLogin = async () => {
    console.log("로그인");
    console.log(formData);
    navigate("/donation");
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
          name="userId"
          type="text"
          placeholder="이메일"
          value={formData.userId}
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
        onClick={handleLogin}
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
