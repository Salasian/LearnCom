import { Link } from "react-router-dom";
import ComboBox from "../ComboBox";
import { ChangeEvent, useEffect, useState } from "react";
import SocialLinks from "./SocialLinks";
import FooterEmailSubscription from "./FooterEmailSubscription";
import FooterNavigation from "./FooterNavigation";

const Footer = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  const inputInitialState = {
    suscribeEmail: "",
    language: "",
  };

  const [inputs, setInput] = useState(inputInitialState);
  const { suscribeEmail, language } = inputs;

  function getWindowSize() {
    return window.innerWidth;
  }

  function submitEmail() {}

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    identifier: string
  ) => {
    setInput({ ...inputs, [identifier]: e.target.value });
  };

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (windowSize <= 600) {
    return (
      <footer className="w-full bg-slate-50 px-10 pt-5 mt-10 pb-4">
        <section className="grid grid-flow-row justify-items-center pb-8 gap-4">
          <FooterNavigation isPhone={true} />
          <ComboBox
            val={language}
            handleChange={handleChange}
            identifier="language"
            state="default"
            list={["English", "Spanish", "German", "French"]}
            classes="w-[130px]"
          />
          <SocialLinks />
          <article className="w-full grid grid-flow-row gap-2 justify-items-center text-center">
            <FooterEmailSubscription
              suscribeEmail={suscribeEmail}
              handleChange={handleChange}
              submitEmail={submitEmail}
            />
          </article>
        </section>
        <div className="text-center">
          &copy; 2023 Learn, Inc. · <Link to={"/"}>Privacy</Link> ·
          <Link to={"/"}>Terms</Link>
        </div>
      </footer>
    );
  } else {
    return (
      <footer className="w-full bg-slate-50 px-10 pt-5 mt-10 pb-4">
        <section className="grid grid-flow-row grid-cols-6 justify-items-center border-b-2 border-gray-200 py-8">
          <FooterNavigation isPhone={false} />
          <article className="col-start-5 col-end-7 grid grid-flow-row gap-2">
            <FooterEmailSubscription
              suscribeEmail={suscribeEmail}
              handleChange={handleChange}
              submitEmail={submitEmail}
            />
          </article>
        </section>
        <section className=" w-full p-4 grid grid-flow-col grid-cols-8 items-center">
          <div className="col-start-1 col-end-3">
            <ComboBox
              val={language}
              handleChange={handleChange}
              identifier="language"
              state="default"
              list={["English", "Spanish", "German", "French"]}
            />
          </div>
          <div className="col-start-3 col-end-7 text-center">
            &copy; 2023 Learn, Inc. · <Link to={"/"}>Privacy</Link> ·{" "}
            <Link to={"/"}>Terms</Link>
          </div>
          <div className="col-start-7 col-end-9">
            <SocialLinks />
          </div>
        </section>
      </footer>
    );
  }
};

export default Footer;
