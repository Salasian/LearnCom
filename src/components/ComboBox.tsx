import { useEffect, useState, ChangeEvent } from "react";

interface ComboBoxProps {
  val: string;
  list: Array<string>;
  handleChange: (e: ChangeEvent<HTMLSelectElement>, identifier: string) => void;
  name?: string;
  classes?: string;
  identifier: string;
  state: "default" | "danger" | "success" | "disabled";
}

function ComboBox({
  val,
  handleChange,
  identifier,
  state,
  name,
  list,
  classes,
}: ComboBoxProps) {
  const [color, setColor] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    handleChange(e, identifier);
  };

  useEffect(() => {
    if (state === "default" || state === "disabled") setColor("gray");
    else setColor(state);
  }, [state]);

  return (
    <article>
      <h1 className={`font-bold text-${state === "default" ? "black" : color}`}>
        {name}
      </h1>
      <select
        name="example"
        value={val}
        className={`p-2 w-full border border-gray focus:border-2 focus:outline-0 focus:border-gray text-gray bg-gray-100 rounded-md ${
          val ? "shadow-md" : ""
        } ${classes}`}
        onChange={(e) => handleInputChange(e)}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
    </article>
  );
}
export default ComboBox;
