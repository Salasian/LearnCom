import Select from "react-select";
import { optionsProps } from "../../types/typeDropdown";
import { trainingInputState } from "../../types/typeAddTraining";
import { getTrainerByDropdownProp } from "../../utils/asyncUtils";
import { formatTrainersInputArrayToShowTrainerArray } from "../../utils/utils";
import { showTrainer } from "../../types/typeUser";

interface DropdownSelectProps {
  options: Array<optionsProps>;
  inputs: trainingInputState;
  setInputs: (inputs: trainingInputState) => void;
}

const DropdownSelect = ({
  options,
  setInputs,
  inputs,
}: DropdownSelectProps) => {
  async function reassembleTrainers(
    options: optionsProps[]
  ): Promise<showTrainer[]> {
    try {
      const trainerPromises = options.map((option) =>
        getTrainerByDropdownProp(option)
      );
      const trainers = await Promise.all(trainerPromises);
      const formattedTrainers =
        formatTrainersInputArrayToShowTrainerArray(trainers);
      return formattedTrainers;
    } catch (error) {
      console.error("Error fetching trainers:", error);
      throw error;
    }
  }

  return (
    <Select
      isMulti
      name="colors"
      options={options}
      className="basic-multi-select !-z-0"
      classNamePrefix="select"
      onChange={async (e) => {
        setInputs({ ...inputs, trainers: await reassembleTrainers([...e]) });
      }}
      placeholder="Add a trainer"
    />
  );
};

export default DropdownSelect;
