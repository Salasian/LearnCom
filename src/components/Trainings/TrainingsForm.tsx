import { ChangeEvent } from "react";
import { TrainingsInputsForm } from "../../types/typeTrainings";
import Button from "../Button";
import Input from "../Input";
import { filterTrainings } from "../../utils/filterTrainings";
import useServices from "../../services/useServices";

interface Props {
  inputs: TrainingsInputsForm;
  handleChange: (e: ChangeEvent<HTMLInputElement>, identifier: string) => void;
  role: string;
  setInputs: (newInputs: TrainingsInputsForm) => void;
}

const TrainingsForm = ({ inputs, handleChange, role, setInputs }: Props) => {
  const { trainings } = useServices();
  const { trainer, type } = inputs;

  return (
    <section className="mt-10">
      <h1 className="font-bold text-4xl mb-8">Search Trainings</h1>
      <div className="flex space-x-10 w-full">
        <article className="basis-1/2">
          <Input
            val={trainer}
            identifier={"trainer"}
            onChange={handleChange}
            type={"text"}
            placeholder={"First name"}
            state={"default"}
            name={role === "student" ? "Trainer name" : "Student name"}
          />
        </article>
        <article className="basis-1/2">
          {role === "student" && (
            <Input
              val={type}
              identifier={"type"}
              onChange={handleChange}
              type={"text"}
              placeholder={"Type"}
              state={"default"}
              name="Type"
            />
          )}
        </article>
      </div>
      <article className="w-20 mt-8">
        <Button
          name={"Search"}
          onClick={() => {
            const { trainer, type, from, to } = inputs;
            setInputs({
              ...inputs,
              passedTrainings: filterTrainings(
                trainer,
                type,
                from,
                to,
                trainings,
                role
              ),
            });
          }}
          state={"primary"}
        />
      </article>
    </section>
  );
};

export default TrainingsForm;
