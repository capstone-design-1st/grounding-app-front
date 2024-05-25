import React from "react";
import "./styles.css";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  color?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  setIsChecked,
}) => {
  const onChange = () => {
    setIsChecked(!checked);
  };

  return (
    <div className="checkboxContainer">
      <input
        id={id}
        className="customCheckbox"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="checkboxLabel">
        <div>{label}</div>
      </label>
    </div>
  );
};

export default Checkbox;
