import { useState } from "react";
import optionsLogo from "../../assets/options.png";
import avatar from "../../assets/avatar.png";
import iconX from "../../assets/x.png";
import learnLogo from "../../assets/logo-learn.svg";
import Button from "../Button";
import { Link } from "react-router-dom";
import BreadCrumbs from "./Breadcrumbs";
import MiniProfile from "./MiniProfile";
import useServices from "../../services/useServices";

const Navigation = (props: NavigationProps) => {
  const { user, navigate } = useServices();
  const [sideBar, setSideBar] = useState(false);
  const { type, pathname } = props;

  if (type === "sidebar") {
    return (
      <>
        <header className="h-[64px] w-full grid grid-flow-col grid-cols-6 justify-items-center ">
          <article className="col-start-1 col-end-2 flex items-center">
            <button onClick={() => setSideBar(!sideBar)}>
              <img
                src={optionsLogo}
                alt="optionsLogo"
                className="h-[35px] w-[35px]"
              />
            </button>
          </article>
          <article className="col-start-2 col-end-6 flex items-center">
            <img
              src={learnLogo}
              alt="learnlogo.svg"
              className="h-[34px] w-[45px]"
            />

            <h1 className="text-3xl font-bold">learn</h1>
          </article>
        </header>
        <div
          className={`absolute top-0 w-[590px] bg-white h-screen z-10${
            sideBar ? "" : "left-[590px] hidden"
          }`}
        >
          <section
            className={`grid grid-flow-row p-8 border-l-4 border-primary-200   `}
          >
            <article className="grid grid-flow-col grid-cols-5 mb-8">
              <article className="col-start-1">
                <img
                  src={avatar}
                  alt="avatar"
                  className="rounded-full h-[51px] w-[51px]"
                />
              </article>
              <div className="flex flex-col col-start-2 col-end-5">
                <h1 className="font-bold">name</h1>
                <p>email</p>
              </div>
              <article className="col-start-5 h-5 w-5">
                <button onClick={() => setSideBar(!sideBar)}>
                  <img src={iconX} alt="X icon" />
                </button>
              </article>
            </article>
            <button
              className={`text-${
                pathname === "/blog"
                  ? "primary font-bold border-primary"
                  : "black"
              }  text-2xl text-left py-4 px-4 border-l-4`}
              onClick={() => {
                navigate("/blog");
              }}
            >
              Blog
            </button>
            <button
              className={`text-${
                pathname === "/pricing"
                  ? "primary font-bold border-primary"
                  : "black"
              }  text-2xl text-left py-4 px-4 border-l-4`}
              onClick={() => {
                navigate("/pricing");
              }}
            >
              Pricing
            </button>
            <button
              className={`text-${
                pathname === "/aboutus"
                  ? "primary font-bold border-primary"
                  : "black"
              }  text-2xl text-left py-4 px-4 border-l-4`}
              onClick={() => {
                navigate("/aboutus");
              }}
            >
              About Us
            </button>
            <button
              className={`text-${
                pathname === "/my-account"
                  ? "primary font-bold border-primary"
                  : "black"
              }  text-2xl text-left py-4 px-4 border-l-4`}
              onClick={() => {
                navigate("/my-account");
              }}
            >
              My Account
            </button>
          </section>
        </div>
      </>
    );
  }
  if (type === "topbar") {
    return (
      <>
        <header className="fixed top-0 w-full bg-slate-50 z-10">
          <section className=" h-[64px] w-full border-b-2  border-gray-100 grid grid-flow-row grid-cols-6 justify-items-center z-10">
            <article className="col-start-1 col-end-4 flex items-center w-full ml-8">
              <img
                src={learnLogo}
                alt="learnlogo.svg"
                className="h-[34px] w-[45px]"
              />
              <h1 className="text-3xl font-bold">learn</h1>
              <ul className="flex h-full space-x-4 items-center pl-10">
                <Link to={"/blog"}>Blog</Link>
                <Link to={"/about"}>About Us</Link>
                <Link to={"/pricing"}>Pricing</Link>
              </ul>
            </article>
            <article className="col-start-5 col-end-7 flex items-center w-full justify-end mr-8">
              {user.username ? (
                <MiniProfile />
              ) : (
                <ul className="grid grid-flow-col h-full items-center">
                  <Button
                    name={"Sign In"}
                    onClick={() => navigate("/login")}
                    state={"transparent"}
                  />
                  <Button
                    name={"Join Us"}
                    onClick={() => navigate("/join-us")}
                    state="primary"
                    classes="px-4 ml-2"
                  />
                </ul>
              )}
            </article>
          </section>
          <section className="bg-white">
            <BreadCrumbs />
          </section>
        </header>
        <div className="h-[108px]"></div>
      </>
    );
  }
};

export default Navigation;

interface NavigationProps {
  type: string;
  pathname: string;
}
