import {
  BACKGROUND_DICTIONARY,
  PRESSED_DICTIONARY,
  HOVER_DICTIONARY,
} from "../assets/dictionaries";

interface ButtonProps {
  name: string;
  onClick: (value?: unknown) => void;
  state: "primary" | "success" | "danger" | "transparent";
  isDisabled?: boolean;
  classes?: string;
}

const Button = ({ name, state, onClick, classes, isDisabled }: ButtonProps) => {
  if (isDisabled) {
    return (
      <button
        disabled
        onClick={onClick}
        className={`${
          BACKGROUND_DICTIONARY[`${state}Low`]
        } text-center w-full rounded-md p-1 text-white ${classes}`}
      >
        {name}
      </button>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={`${
          BACKGROUND_DICTIONARY[`${state}`]
        } text-center w-full rounded-md p-1 ${
          state === "transparent" ? "text-black" : "text-white"
        } ${PRESSED_DICTIONARY[state]}
        ${HOVER_DICTIONARY[state]} ${classes}`}
      >
        {name}
      </button>
    );
  }
};

export default Button;
