import { useState } from "react";
import { TrainingsInputsForm } from "../../types/typeTrainings";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../Input";
import { formatDate } from "../../utils/utils";

interface Props {
  inputs: TrainingsInputsForm;
  setInputs: (newInputs: TrainingsInputsForm) => void;
}

const TrainigsDatePicker = ({ inputs, setInputs }: Props) => {
  const { from, to } = inputs;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start) {
      setInputs({
        ...inputs,
        from: start,
      });
    }
    if (end) {
      setInputs({
        ...inputs,
        to: end,
      });
    }
  };
  return (
    <section className="w-[350px]">
      <div className="flex space-x-4 mb-4 pointer-events-none ">
        <Input
          val={formatDate(from)}
          identifier={"from"}
          onChange={() => {}}
          type={"text"}
          placeholder={""}
          state={"primary"}
          name="From"
          icon={"calendar"}
          classes="bg-white"
        />
        <Input
          val={formatDate(to)}
          identifier={"to"}
          onChange={() => {}}
          type={"text"}
          placeholder={""}
          state={"primary"}
          name="To"
          icon={"calendar"}
          classes="bg-white"
        />
      </div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </section>
  );
};

export default TrainigsDatePicker;
