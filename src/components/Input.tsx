import { ChangeEvent, useState } from "react";
import { FiMail, FiLock, FiUser, FiEyeOff, FiEye } from "react-icons/fi";
import {
  TEXT_DICTIONARY,
  BACKGROUND_DICTIONARY,
  BORDER_DICTIONARY,
  RAW_COLOR_DICTIONARY,
} from "../assets/dictionaries";
import { CiCalendar } from "react-icons/ci";

interface InputProps<T> {
  val: T;
  identifier: string;
  onChange: (e: ChangeEvent<HTMLInputElement>, identifier: string) => void;
  type: "text" | "number" | "textarea" | "password"; // Restrict type to 'text' or 'number'
  placeholder: string;
  name?: string;
  classes?: string;
  state: "default" | "primary" | "danger" | "success" | "disabled";
  icon?: "user" | "pass" | "passLock" | "mail" | "calendar";
}

function Input<T extends string | number | readonly string[] | undefined>({
  val,
  onChange,
  type,
  placeholder,
  name,
  classes,
  state,
  icon,
  identifier,
}: InputProps<T>) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e, identifier);
  };

  const [show, setShow] = useState(false);

  return (
    <>
      <div
        className={`inline ${
          state === "disabled" ? "opacity-40 bg-opacity-5" : ""
        }`}
      >
        <h1
          className={`font-bold ${
            state === "primary" || state === "default"
              ? "text-black"
              : TEXT_DICTIONARY[state]
          }`}
        >
          {name}
        </h1>
        <div className="w-full">
          <div className="grid grid-flow-col">
            {icon && icon !== "pass" && (
              <article className="absolute pl-2 pt-2.5">
                {icon === "mail" && (
                  <FiMail
                    style={{
                      color: RAW_COLOR_DICTIONARY[state],
                      fontSize: "1.5rem",
                    }}
                  />
                )}
                {icon === "passLock" && (
                  <FiLock
                    style={{
                      color: RAW_COLOR_DICTIONARY[state],
                      fontSize: "1.5rem",
                    }}
                  />
                )}
                {icon === "user" && (
                  <FiUser
                    style={{
                      color: RAW_COLOR_DICTIONARY[state],
                      fontSize: "1.5rem",
                    }}
                  />
                )}
                {icon === "calendar" && (
                  <CiCalendar
                    style={{
                      color: RAW_COLOR_DICTIONARY[state],
                      fontSize: "1.5rem",
                    }}
                  />
                )}
              </article>
            )}
            {(icon === "pass" || icon === "passLock") && (
              <div className="justify-self-end absolute pr-2 pt-2.5">
                <button onClick={() => setShow(!show)}>
                  {show ? (
                    <FiEye
                      style={{
                        color: RAW_COLOR_DICTIONARY[state],
                        fontSize: "1.5rem",
                      }}
                    />
                  ) : (
                    <FiEyeOff
                      style={{
                        color: RAW_COLOR_DICTIONARY[state],
                        fontSize: "1.5rem",
                      }}
                    />
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <input
          type={show ? "text" : type}
          placeholder={placeholder}
          disabled={state === "disabled"}
          value={val}
          onChange={(e) => handleInputChange(e)}
          className={` p-2 w-full ${
            icon && icon !== "pass" ? "pl-9" : ""
          } border ${
            BORDER_DICTIONARY[state]
          } focus:border-2 focus:outline-0 focus:${BORDER_DICTIONARY[state]} ${
            TEXT_DICTIONARY[state]
          } ${BACKGROUND_DICTIONARY[state]}-100 rounded-md ${
            state === "default" ? "bg-gray-50" : ""
          }${val ? "shadow-md" : ""} ${classes}`}
        />
      </div>
    </>
  );
}

export default Input;
