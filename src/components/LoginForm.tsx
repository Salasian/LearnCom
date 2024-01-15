import { Link } from "react-router-dom";
import Button from "./Button";
import Input from "./Input";
import { ChangeEvent, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import loader from "../assets/loader.gif";
import useServices from "../services/useServices";

const initialState = {
  username: "",
  password: "",
  captcha: false,
  loading: false,
  checkedSpaces: false,
};

const LoginForm = () => {
  const [input, setInput] = useState(initialState);
  const {
    asyncLoginUserAction,
    asyncStudentInitializerAction,
    asyncTrainerInitializerAction,
    asyncTrainingInitializerAction,
    navigate,
    user,
  } = useServices();
  const { username, password, captcha, loading, checkedSpaces } = input;

  const checkSingedIn = async () => {
    if (user.id && user.role) {
      if (user.role === "student") await asyncStudentInitializerAction();
      else await asyncTrainerInitializerAction();
      await asyncTrainingInitializerAction();
      navigate("/");
    }
  };

  const submitSignIn = async () => {
    await asyncLoginUserAction(username, password);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    identifier: string
  ) => {
    setInput({ ...input, [identifier]: e.target.value });
  };

  const onChange = () => {
    setInput({ ...input, captcha: true });
  };

  useEffect(() => {
    if (user.role === "failed") {
      if (!password && !username) {
        setInput({ ...input, checkedSpaces: true });
      } else {
        setInput({ ...input, checkedSpaces: true, password: "", username: "" });
      }
    } else {
      checkSingedIn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  if (loading) {
    return (
      <section className="container m-auto grid grid-flow-row mt-20 justify-center">
        <img src={loader} alt="my-gif" />
      </section>
    );
  }

  return (
    <section className="container m-auto grid grid-flow-row my-[8.5rem] justify-center">
      <h1 className="text-3xl font-bold text-center ">Sign In</h1>
      <h1 className="text-xl  text-center">Welcome back</h1>
      <article>
        <Input
          val={username}
          onChange={handleChange}
          type={"text"}
          placeholder={"Enter username"}
          name="Username"
          state={
            checkedSpaces === false
              ? "default"
              : username
              ? "success"
              : "danger"
          }
          icon="user"
          identifier="username"
        />
        <Input
          val={password}
          onChange={handleChange}
          type={"password"}
          placeholder={"Enter Password"}
          classes=""
          name="Password"
          state={
            checkedSpaces === false
              ? "default"
              : password
              ? "success"
              : "danger"
          }
          icon="passLock"
          identifier={"password"}
        />
        {user.role === "failed" && !password && !username && (
          <h1 className="text-danger text-center">Invalid Credentials</h1>
        )}
        <Button
          name={"Sign In"}
          onClick={submitSignIn}
          state={"primary"}
          isDisabled={!captcha}
          classes="mt-8"
        />
        <h1 className="text-center m-4">OR</h1>
        <h1 className="text-center">
          Don't have an account?{" "}
          <span className="text-primary font-bold">
            <Link to={"/join-us"}>Sign up</Link>
          </span>
        </h1>
        <div className="mt-4">
          <ReCAPTCHA
            sitekey="6LeewR8pAAAAAH0TqObjp_oqmSVRIE4uZR59o-oX"
            onChange={onChange}
          />
        </div>
      </article>
    </section>
  );
};

export default LoginForm;
