import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import eyeOff from "../../../assets/icons/eye-off.png";
import eye from "../../../assets/icons/eye-on.png";
import "./styles.css";
interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  handleInputChange,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="passwordInput">
      <input
        {...props}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={handleInputChange}
      />
      <img
        src={showPassword ? eye : eyeOff}
        alt="Toggle visibility"
        onClick={togglePasswordVisibility}
      />
    </div>
  );
};

export default PasswordInput;
