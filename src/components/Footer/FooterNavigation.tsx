import FooterNavigationBlock from "./FooterNavigationBlock";
import learnLogo from "../../assets/logo-learn.svg";

interface Props {
  isPhone: boolean;
}

const FooterNavigation = ({ isPhone }: Props) => {
  return (
    <>
      {!isPhone && (
        <>
          <article
            className={`${
              isPhone ? "" : "col-start-1 col-end-2"
            }} flex items-start`}
          >
            <img
              src={learnLogo}
              alt="learnlogo.svg"
              className="h-[34px] w-[45px]"
            />
            <h1 className="text-3xl font-bold">learn</h1>
          </article>
        </>
      )}
      <article className={`${isPhone ? "" : "col-start-2 col-end-3"}`}>
        <FooterNavigationBlock
          links={[
            { to: "/features", text: "Features" },
            { to: "/", text: "Pricing" },
          ]}
          title={"Product"}
        />
      </article>
      <article className={`${isPhone ? "" : "col-start-3 col-end-4"}`}>
        <FooterNavigationBlock
          links={[
            { to: "/blog", text: "Blog" },
            { to: "/", text: "User guides" },
            { to: "/", text: "Webinars" },
          ]}
          title={"Resources"}
        />
      </article>
      <article className={`${isPhone ? "" : "col-start-4 col-end-5"}`}>
        <FooterNavigationBlock
          links={[
            { to: "/about", text: "About us" },
            { to: "/", text: "Contact us" },
          ]}
          title={"Company"}
        />
      </article>
    </>
  );
};

export default FooterNavigation;
