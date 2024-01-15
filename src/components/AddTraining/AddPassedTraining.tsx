import { ChangeEvent, useEffect, useState } from "react";
import Input from "../Input";
import ComboBox from "../ComboBox";
import ReactDatePicker from "react-datepicker";
import {
  formatDate,
  formatTrainersDBToDropdownSyntax,
  inputStateStatus,
} from "../../utils/utils";
import DropdownSelect from "./DropdownSelect";
import Button from "../Button";
import { trainingInputState } from "../../types/typeAddTraining";
import "react-toastify/dist/ReactToastify.css";
import useToaster from "../Header/Toaster";
import useServices from "../../services/useServices";
import { showStudent, showTrainer } from "../../types/typeUser";
import { getAllTrainers } from "../../utils/asyncUtils";
import { trainerDBState, trainingDBState } from "../../types/typeDataBase";

const initialState: trainingInputState = {
  name: "",
  startDate: "",
  duration: 0,
  type: "",
  description: "",
  trainers: [] as showTrainer[],
  participant: "",
  student: {} as showStudent,
};

const AddPassedTraining = () => {
  const {
    asyncTrainingCreateAction,
    asyncTrainingInitializerAction,
    navigate,
    student,
  } = useServices();
  const [inputs, setInputs] = useState(initialState);
  const [isChecked, setIsChecked] = useState(false);
  const [inputDate, setInputDate] = useState(new Date());
  const { name, description, duration, type } = inputs;
  const [allTrainers, setAllTrainers] = useState([] as trainerDBState[]);
  const { notifySuccess } = useToaster();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    identifier: string
  ) => {
    setInputs({ ...inputs, [identifier]: e.target.value });
  };

  useEffect(() => {
    const loadAllTrainers = async () => {
      const allTrainers = await getAllTrainers();
      if (allTrainers) {
        setAllTrainers(allTrainers);
      }
    };
    loadAllTrainers();
  }, []);

  function spacesValidated(): boolean {
    setIsChecked(true);
    if (
      !name ||
      !description ||
      !duration ||
      duration < 1 ||
      allTrainers.length === 0
    ) {
      return false;
    }
    return true;
  }

  async function submitTraining() {
    if (spacesValidated()) {
      const newTraining = {
        description: inputs.description,
        duration: parseInt(inputs.duration.toString()),
        name: inputs.name,
        participant: student.firstName,
        startDate: inputs.startDate ? inputs.startDate : formatDate(new Date()),
        student: student,
        trainers: inputs.trainers,
        type: inputs.type ? inputs.type : "Remote",
      } as trainingDBState;

      await asyncTrainingCreateAction(newTraining);
      await asyncTrainingInitializerAction();
      notifySuccess("Training added");
      setTimeout(() => {
        navigate("/training");
      }, 500);
    }
  }

  return (
    <section>
      <h1 className="text-4xl font-bold text-center">Add passed training</h1>
      <h1 className="font-bold text-2xl mt-4">Training</h1>
      <section className="grid grid-flow-col grid-cols-6 gap-10">
        <article className="col-span-2">
          <Input
            val={name}
            identifier={"name"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Enter Item Name"}
            state={inputStateStatus(name, isChecked)}
            name="Name"
          />
          <h1 className="font-bold ">Training start date</h1>
          <ReactDatePicker
            showIcon
            selected={inputDate}
            onChange={(date) => {
              setInputDate(date ? date : new Date());
              setInputs({
                ...inputs,
                startDate: formatDate(date ? date : new Date()),
              });
            }}
          />
          <Input
            val={duration}
            identifier={"duration"}
            onChange={handleChange}
            type={"number"}
            placeholder={"Enter Duration"}
            state={duration < 1 && isChecked ? "danger" : "default"}
            name="Duration"
          />
          <ComboBox
            val={type}
            list={["Remote", "Bootcamp", "Course", "1:1"]}
            handleChange={handleChange}
            identifier={"type"}
            state={"default"}
            name="Type"
          />
          <div className="mt-10">
            <Input
              val={description}
              identifier={"description"}
              onChange={handleChange}
              type={"textarea"}
              placeholder={"Enter Description"}
              state={inputStateStatus(description, isChecked)}
              name="Description"
            />
          </div>
        </article>
        <article className="col-span-2">
          <h1
            className={`font-bold ${
              isChecked && inputs.trainers.length === 0 ? "text-danger " : ""
            }`}
          >
            Add trainers
          </h1>
          <DropdownSelect
            options={formatTrainersDBToDropdownSyntax(allTrainers)}
            inputs={inputs}
            setInputs={setInputs}
          />{" "}
        </article>
      </section>
      <section className="flex w-[150px] mt-10 ml-10">
        <Button
          name={"Cancel"}
          onClick={() => navigate("/training")}
          state={"transparent"}
        />
        <Button name={"Add"} onClick={submitTraining} state={"primary"} />
      </section>
    </section>
  );
};

export default AddPassedTraining;
