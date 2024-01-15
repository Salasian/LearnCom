import { MdOutlineLock } from "react-icons/md";
import Input from "../components/Input";
import { ChangeEvent, useState } from "react";
import Button from "../components/Button";
import useServices from "../services/useServices";
import { inputStateStatus } from "../utils/utils";
import { getUserById } from "../utils/asyncUtils";
import SuccessPage from "../components/SuccessPage";
import { ApiUserResponse } from "../types/typeAsyncUtils";

interface ChangePasswordInputs {
  current: string;
  newPass: string;
  confirm: string;
}

const initalState: ChangePasswordInputs = {
  current: "",
  newPass: "",
  confirm: "",
};

const ChangePassword = () => {
  const [inputs, setInputs] = useState(initalState);
  const [checkedSpaces, setCheckedSpaces] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const { user, asyncUpdateUserAction, navigate } = useServices();
  function handleChange(e: ChangeEvent<HTMLInputElement>, identifier: string) {
    setInputs({ ...inputs, [identifier]: e.target.value });
  }
  const { current, newPass, confirm } = inputs;

  const isSpacesValid = async () => {
    if (!current || !newPass || !confirm || newPass !== confirm) return false;
    return true;
  };

  async function submitPassword() {
    setCheckedSpaces(true);
    if (await isSpacesValid()) {
      const userFetched: ApiUserResponse | undefined = await getUserById(
        user.id
      );
      if (userFetched) {
        const { password } = userFetched;
        if (password === current) {
          const { username, role } = user;
          asyncUpdateUserAction({ username, role, password: newPass });
          setIsPasswordChanged(true);
        } else {
          setInputs({ ...inputs, current: "" });
        }
      }
    }
  }

  if (isPasswordChanged) {
    return <SuccessPage type={"password"} />;
  }

  return (
    <section>
      <h1 className="text-4xl font-bold mb-16">Security</h1>
      <section className="grid grid-flow-col grid-cols-3">
        <div className="col-span-1 flex space-x-4">
          <MdOutlineLock style={{ fontSize: "30px" }} />
          <h1 className="font-bold text-2xl">Change Password</h1>
        </div>
        <div className="col-span-2 border ml-20 max-w-[45rem] rounded-sm p-6 grid grid-flow-row gap-2">
          <Input
            val={current}
            identifier={"current"}
            onChange={handleChange}
            type={"password"}
            placeholder={"Current Password"}
            state={inputStateStatus(current, checkedSpaces)}
            name="Current Password"
            icon="pass"
          />
          <Input
            val={newPass}
            identifier={"newPass"}
            onChange={handleChange}
            type={"password"}
            placeholder={"New Password"}
            state={inputStateStatus(newPass, checkedSpaces)}
            name="New Password"
            icon="pass"
          />
          <Input
            val={confirm}
            identifier={"confirm"}
            onChange={handleChange}
            type={"password"}
            placeholder={"Confirm Password"}
            state={inputStateStatus(confirm, checkedSpaces)}
            name="Confirm Password"
            icon="pass"
          />
          <div className="flex justify-end mt-2 space-x-4">
            <article>
              <Button
                name={"Cancel"}
                onClick={() => navigate("/my-account")}
                state={"transparent"}
                classes="text-gray-500 p-2"
              />
            </article>
            <article>
              <Button
                name={"Change password"}
                onClick={() => submitPassword()}
                state={"primary"}
                classes="p-2"
              />
            </article>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ChangePassword;
