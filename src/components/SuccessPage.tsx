import { useParams } from "react-router-dom";
import useServices from "../services/useServices";
import { inputStateRegistrationForm } from "../types/typeRegistrationForm";
import Button from "./Button";
import { studentDBState, trainerDBState } from "../types/typeDataBase";
import { FaCheckCircle } from "react-icons/fa";
import { RAW_COLOR_DICTIONARY } from "../assets/dictionaries";
import { useEffect } from "react";

interface SuccessPage {
  type: "password" | "registration";
  inputs?: inputStateRegistrationForm;
}

const SuccessPage = ({ type, inputs }: SuccessPage) => {
  const { navigate } = useServices();
  let chargedInfo = false;
  const {
    asyncTrainerCreateAction,
    asyncStudentCreateAction,
    asyncStudentInitializerAction,
    asyncTrainerInitializerAction,
    user,
    logout,
  } = useServices();
  const { role } = useParams();

  const initializeUser = async () => {
    if (inputs) {
      const {
        firstName,
        lastName,
        email,
        dateOfBirth,
        address,
        specialization,
      } = inputs;
      if (role === "trainer") {
        await asyncTrainerCreateAction({
          address,
          email,
          firstName,
          lastName,
          specialization,
          status: false,
          user: user.id,
          students: [],
        } as trainerDBState);
      } else if (role === "student") {
        await asyncStudentCreateAction({
          address,
          dateOfBirth,
          email,
          firstName,
          lastName,
          status: false,
          user: user.id,
          trainers: [],
        } as studentDBState);
      }
    }
  };

  const submitRegistration = async () => {
    setTimeout(async () => {
      await loadUser();
      navigate("/my-account");
    }, 1000);
  };

  const loadUser = async () => {
    if (user.id && user.role) {
      if (user.role === "student") await asyncStudentInitializerAction();
      else await asyncTrainerInitializerAction();
    }
  };

  useEffect(() => {
    if (!chargedInfo) {
      chargedInfo = true;
      initializeUser();
    }
  }, []);

  return (
    <section className="container m-auto grid grid-flow-row justify-items-center text-center">
      <h1 className="text-center text-4xl font-bold capitalize mb-5">{type}</h1>
      <FaCheckCircle
        style={{
          width: "50px",
          height: "50px",
          color: RAW_COLOR_DICTIONARY["success"],
          marginBottom: "2rem",
        }}
      />
      {inputs ? (
        <>
          <p>
            Congratulations you have successfully registered with Learn
            Platform! Here is your credentials that you can change in your
            account
          </p>

          <h1 className="font-bold mt-5">Username</h1>
          <p>{inputs.username}</p>
          <h1 className="font-bold mt-5">Password</h1>
          <p>{inputs.password}</p>
        </>
      ) : (
        <p>Please proceed sign in with new password</p>
      )}
      <article className="w-[150px]">
        <Button
          name={type === "registration" ? "My account" : "Sign In"}
          onClick={async () => {
            if (type === "registration") {
              await submitRegistration();
            } else {
              await logout();
              navigate("/login");
            }
          }}
          state={"success"}
          classes="mt-5"
        />
      </article>
    </section>
  );
};

export default SuccessPage;
