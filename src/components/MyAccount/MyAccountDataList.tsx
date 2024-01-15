import { ChangeEvent, useState } from "react";
import SingleInformationBox from "../SingleInformationBox";
import Input from "../Input";
import { studentInputState, trainerInputState } from "../../types/typeUser";
import Switch from "react-switch";
import useServices from "../../services/useServices";
import { formatDate } from "../../utils/utils";
import ReactDatePicker from "react-datepicker";

interface Props {
  inputs: studentInputState | trainerInputState;
  isEditing: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>, identifier: string) => void;
  setInputs: (inputs: studentInputState | trainerInputState) => void;
}

const MyAccountDataList = ({
  inputs,
  isEditing,
  handleChange,
  setInputs,
}: Props) => {
  const { user } = useServices();
  const [isChecked, setChecked] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const checkSwitch = () => {
    setChecked(!isChecked);
    setInputs({ ...inputs, ["status"]: isChecked });
  };
  const dateUpdate = (date: Date | null) => {
    setDateOfBirth(date ? date : new Date());
    setInputs({
      ...inputs,
      ["dateOfBirth"]: formatDate(date ? date : new Date()),
    });
  };

  return (
    <>
      {isEditing ? (
        <>
          <Input
            val={inputs.firstName}
            identifier={"firstName"}
            onChange={handleChange}
            type={"text"}
            placeholder={"First Name"}
            state={"default"}
            name="First name"
            classes="w-full"
          />
          <Input
            val={inputs.lastName}
            identifier={"lastName"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Last Name"}
            state={"default"}
            name="Last name"
          />
          {"dateOfBirth" in inputs && (
            <>
              <h1 className="font-bold">Date of Birth</h1>
              <ReactDatePicker
                showIcon
                selected={dateOfBirth}
                onChange={(date) => dateUpdate(date)}
              />
            </>
          )}
          <Input
            val={inputs.address}
            identifier={"address"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Address"}
            state={"default"}
            name="Address"
          />
          <Input
            val={inputs.email}
            identifier={"email"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Email"}
            state={"default"}
            name="Email"
          />
          <div className="flex flex-row space-x-4 ">
            <h1 className="font-bold">Active</h1>
            <Switch
              onChange={checkSwitch}
              checked={inputs.status}
              onColor="#6355D8"
              onHandleColor="#ffffff"
              uncheckedIcon={false}
              checkedIcon={false}
              height={24}
              width={48}
            />
          </div>
        </>
      ) : (
        <>
          <SingleInformationBox title={"First Name"} value={inputs.firstName} />
          <SingleInformationBox title={"Last Name"} value={inputs.lastName} />
          <SingleInformationBox title={"User Name"} value={user.username} />
          <SingleInformationBox
            title={"dateOfBirth" in inputs ? "Date of Birth" : "Specialization"}
            value={
              "dateOfBirth" in inputs
                ? inputs.dateOfBirth
                : inputs.specialization
            }
          />
          <SingleInformationBox title={"Address"} value={inputs.address} />
          <SingleInformationBox title={"Email"} value={inputs.email} />
        </>
      )}
    </>
  );
};

export default MyAccountDataList;
