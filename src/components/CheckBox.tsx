import { useState } from "react";
import { IoIosCheckbox, IoIosSquareOutline } from "react-icons/io";
import { RAW_COLOR_DICTIONARY } from "../assets/dictionaries";

interface Props {
  color: "default" | "primary" | "danger" | "success" | "disabled";
  checked: boolean;
  onClick: (id: string) => void;
  id: string;
}

const CheckBox = ({ color, checked, onClick, id }: Props) => {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <button
      onClick={() => {
        onClick(id);
        setIsChecked(!isChecked);
      }}
    >
      {isChecked ? (
        <IoIosCheckbox style={{ color: RAW_COLOR_DICTIONARY[color] }} />
      ) : (
        <IoIosSquareOutline />
      )}
    </button>
  );
};

export default CheckBox;
