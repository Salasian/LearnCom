import registrationStudent from "../assets/registrationStudent.jpeg";
import registrationTrainer from "../assets/registrationTrainer.jpg";
import Button from "./Button";
import Input from "./Input";
import { ChangeEvent, useState } from "react";
import ComboBox from "./ComboBox";
import useServices from "../services/useServices";
import ReactDatePicker from "react-datepicker";
import {
  formatDate,
  createRandomPassword,
  inputStateStatus,
  generateRandomUsername,
} from "../utils/utils";
import { useParams } from "react-router-dom";
import SuccessPage from "./SuccessPage";
import { inputStateRegistrationForm } from "../types/typeRegistrationForm";
import { userDBState } from "../types/typeDataBase";

const inputInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  address: "",
  specialization: "",
  loading: false,
  checkedSpaces: false,
  username: "",
  password: createRandomPassword(),
} as inputStateRegistrationForm;

const RegistrationForm = () => {
  const { asyncCreateUserAction } = useServices();
  const newUsername = generateRandomUsername();
  const { role } = useParams();
  const [input, setInput] = useState(inputInitialState);
  const [inputDate, setInputDate] = useState(new Date());
  const [isRegistered, setIsRegistered] = useState(false);
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    address,
    specialization,
    checkedSpaces,
    password,
  } = input;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    identifier: string
  ) => {
    setInput({ ...input, [identifier]: e.target.value });
  };

  const submitRegistration = async () => {
    const checked: boolean = checkRegistration();
    setInput({
      ...input,
      dateOfBirth: input.dateOfBirth
        ? input.dateOfBirth
        : formatDate(new Date()),
      specialization: input.specialization
        ? input.specialization
        : "Senior DevOps Developer",
      username: newUsername,
      checkedSpaces: true,
    });
    if (role === "trainer" && checked && !isRegistered) {
      await asyncCreateUserAction({
        username: newUsername,
        role: "trainer",
        password: password,
      } as userDBState);
      setIsRegistered(true);
    } else if (role === "student" && checked) {
      await asyncCreateUserAction({
        username: newUsername,
        role: "student",
        password: password,
      } as userDBState);
      setIsRegistered(true);
    }
  };

  const checkRegistration = (): boolean => {
    if (role === "trainer") {
      if (!firstName || !lastName || !email) {
        return false;
      }
    } else if (role === "student") {
      if (!firstName || !lastName || !email || !dateOfBirth || !address) {
        return false;
      }
    }
    return true;
  };

  if (isRegistered) return <SuccessPage type={"registration"} inputs={input} />;

  return (
    <section className="container m-auto grid grid-flow-row gap-4 min-w-[640px] lg:max-w-[780px] xl:max-w-[1000px] w-full ">
      <h1 className="text-3xl font-bold">Registration</h1>
      <h1 className="text-xl capitalize">{role}</h1>
      <div className="grid grid-flow-col grid-cols-12 w-full">
        <article className="col-span-4">
          <img
            src={role === "student" ? registrationStudent : registrationTrainer}
            alt="registrationStudent.jpg"
            className="rounded-md h-full"
          />
        </article>
        <div className="col-span-1"> </div>
        <article className="col-span-7">
          <div className="flex flex-col space-y-5">
            <Input
              val={firstName}
              onChange={handleChange}
              type={"text"}
              placeholder={"Enter First Name"}
              state={inputStateStatus(firstName, checkedSpaces)}
              identifier={"firstName"}
              name="First name"
            />
            <Input
              val={lastName}
              onChange={handleChange}
              type={"text"}
              placeholder={"Enter Last Name"}
              state={inputStateStatus(lastName, checkedSpaces)}
              identifier={"lastName"}
              name="Last Name"
            />
            <Input
              val={email}
              onChange={handleChange}
              type={"text"}
              placeholder={"Enter Email"}
              state={inputStateStatus(email, checkedSpaces)}
              identifier={"email"}
              name="E-mail"
            />

            {role === "student" ? (
              <>
                <div>
                  <h1 className="font-bold ">Date of Birth</h1>
                  <ReactDatePicker
                    showIcon
                    selected={inputDate}
                    onChange={(date) => {
                      setInputDate(date ? date : new Date());
                      setInput({
                        ...input,
                        ["dateOfBirth"]: formatDate(date ? date : new Date()),
                      });
                    }}
                  />
                </div>
                <Input
                  val={address}
                  onChange={handleChange}
                  type={"text"}
                  placeholder={"Enter address"}
                  state={inputStateStatus(address, checkedSpaces)}
                  identifier={"address"}
                  name="Address"
                />
              </>
            ) : (
              <ComboBox
                val={specialization}
                handleChange={handleChange}
                identifier="specialization"
                state="default"
                list={[
                  "Senior DevOps Developer",
                  "Lead Software Engineer",
                  "Tech Lead",
                  "SCRUM Master",
                ]}
                name="Specialization"
              />
            )}
            <Button
              name={"Submit"}
              onClick={submitRegistration}
              state={"primary"}
              classes="h-10 mt-8"
            />
          </div>
        </article>
      </div>
    </section>
  );
};

export default RegistrationForm;
