import { ChangeEvent, useState } from "react";
import { studentInputState, trainerInputState } from "../../types/typeUser";
import MyAccountTable from "./MyAccountTable";
import MyAccountDataList from "./MyAccountDataList";
import MyAccountActionButtons from "./MyAccountActionButtons";
import MyAccountMyTrainings from "./MyAccountMyTrainings";
import MyAccountVisibility from "./MyAccountVisibility";
import MyAccountAddTrainer from "./MyAccountAddTrainer";
import useServices from "../../services/useServices";

const MyAccountList = () => {
  const { user, trainer, student } = useServices();
  const { role } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const refiller = role === "trainer" ? trainer : student;
  const [inputs, setInputs] = useState<studentInputState | trainerInputState>({
    ...refiller,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    identifier: string
  ) => {
    setInputs({ ...inputs, [identifier]: e.target.value });
  };

  if (isAdding) {
    return <MyAccountAddTrainer setIsAdding={setIsAdding} />;
  }

  return (
    <section>
      <h1 className="text-4xl text-center font-bold pt-6 mb-20">My Acount</h1>
      <section className="grid grid-flow-col grid-cols-12">
        <section className="grid grid-flow-row col-span-6 gap-4">
          <h1 className="text-3xl font-bold">My profile</h1>
          <h1 className="mt-4 font-bold">Profile photo</h1>
          <MyAccountVisibility inputs={inputs} isEditing={isEditing} />
          <MyAccountDataList
            inputs={inputs}
            isEditing={isEditing}
            handleChange={handleChange}
            setInputs={setInputs}
          />
        </section>
        <div className="col-span-1"></div>
        <MyAccountTable
          role={role}
          inputs={inputs}
          isEditing={isEditing}
          handleChange={handleChange}
          setIsAdding={setIsAdding}
        />
        <div className="col-span-1"></div>
      </section>
      <MyAccountActionButtons
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setInputs={setInputs}
        inputs={inputs}
      />
      <MyAccountMyTrainings />
    </section>
  );
};

export default MyAccountList;
