import { useEffect, useState } from "react";
import { showTrainer } from "../../types/typeUser";
import Button from "../Button";
import CheckBox from "../CheckBox";
import { getAllTrainersFormatShow } from "../../utils/asyncUtils";
import useServices from "../../services/useServices";

interface Props {
  setIsAdding: (isAdding: boolean) => void;
}

const MyAccountAddTrainer = ({ setIsAdding }: Props) => {
  const {
    student,
    asyncStudentUpdateAction,
    asyncStudentInitializerAction,
    assignStudentToTrainer,
  } = useServices();
  const [allTrainers, setAllTrainers] = useState([] as showTrainer[]);
  const [myTrainers, setMyTrainers] = useState(student.trainers);
  let selectedTrainers: showTrainer[] | undefined = myTrainers;

  const assignStudentToSelectedTrainers = () => {
    selectedTrainers?.forEach(async (trainer) => {
      await assignStudentToTrainer(trainer._id);
    });
  };

  const manageCheckBoxTrainer = (id: string) => {
    if (selectedTrainers) {
      if (selectedTrainers.find((trainer) => trainer._id === id)) {
        selectedTrainers = selectedTrainers.filter(
          (trainer) => trainer._id !== id
        );
      } else {
        const trainerToAdd: showTrainer | undefined = allTrainers.find(
          (trainer) => trainer._id === id
        );

        if (trainerToAdd)
          selectedTrainers = [...selectedTrainers, trainerToAdd];
      }
    }
  };

  useEffect(() => {
    const setAllTrainersFromAPI = async () =>
      setAllTrainers(await getAllTrainersFormatShow());
    setAllTrainersFromAPI();
  }, []);

  const isInSelectedTrainers = (id: string): boolean => {
    if (selectedTrainers)
      return !!selectedTrainers.find((trainer) => trainer._id === id);
    console.log("undefined selectedTrainers");
    return false;
  };

  return (
    <section>
      <h1 className="text-4xl text-center font-bold pt-6 mb-8">Add trainer</h1>
      <h1 className="mb-10">
        Please select trainers for adding them inton your trainers list.
        <br />* - There is no possibility to remove the trainer.
      </h1>
      <section className="grid grid-flow-col grid-cols-12">
        <div className="col-span-4 flex flex-col">
          <h1 className="font-bold text-2xl mb-4">All Trainers</h1>
          <section>
            <article className="w-full flex">
              <h1 className="bg-gray-100 text-center p-3 w-2/12"></h1>
              <h1 className="bg-gray-100 text-center p-3 w-3/12">NAME</h1>
              <h1 className="bg-gray-100 text-center p-3 w-7/12">
                SPECIALIZATION
              </h1>
            </article>
            {allTrainers.map((item: showTrainer, index) => {
              if (isInSelectedTrainers(item._id)) return;
              return (
                <article className="flex bg-slate-50" key={index}>
                  <div className="w-2/12 text-center p-3">
                    <CheckBox
                      color="primary"
                      checked={false}
                      onClick={manageCheckBoxTrainer}
                      id={item._id}
                    />
                  </div>
                  <div className="flex-1 font-bold px-4 w-3/12 p-3">
                    {item.firstName} {item.lastName}
                  </div>
                  <div className="flex-1 w-7/12 p-3">{item.specialization}</div>
                </article>
              );
            })}
          </section>
        </div>
        <div className="col-span-2"></div>
        <div className="col-span-4">
          <h1 className="font-bold text-2xl mb-4">My Trainers</h1>
          <section>
            <article className="w-full flex">
              <h1 className="bg-gray-100 text-center p-3 w-2/12"></h1>
              <h1 className="bg-gray-100 text-center p-3 w-3/12">NAME</h1>
              <h1 className="bg-gray-100 text-center p-3 w-7/12">
                SPECIALIZATION
              </h1>
            </article>
            {myTrainers &&
              myTrainers.map((item: showTrainer, index) => {
                return (
                  <article className="flex bg-slate-50" key={index}>
                    <div className="flex-1 font-bold px-4 w-3/12 p-3">
                      {item.firstName} {item.lastName}
                    </div>
                    <div className="flex-1 w-7/12 p-3">
                      {item.specialization}
                    </div>
                  </article>
                );
              })}
          </section>
        </div>
        <div className="col-span-2"></div>
      </section>
      <div className="flex w-50">
        <article className="mt-8 w-20">
          <Button
            name={"Exit"}
            onClick={() => {
              setIsAdding(false);
            }}
            state={"transparent"}
          />
        </article>
        <article className="mt-8 w-20">
          <Button
            name={"Add"}
            onClick={async () => {
              setMyTrainers(selectedTrainers);
              await asyncStudentUpdateAction({
                ...student,
                trainers: selectedTrainers,
              });
              await asyncStudentInitializerAction();
              assignStudentToSelectedTrainers();
            }}
            state={"primary"}
          />
        </article>
      </div>
    </section>
  );
};

export default MyAccountAddTrainer;
