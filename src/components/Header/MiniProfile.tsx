import { useState } from "react";
import martaImage from "../../assets/profileImage.jpg";
import { FaRegUserCircle, FaRegMoon } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import useServices from "../../services/useServices";

const MiniProfile = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);
  const { user, logout, trainer, student } = useServices();

  return (
    <>
      {isShowing ? (
        <article
          className="grid grid-flow-row absolute top-4 bg-white py-4 shadow-md rounded-md border-t-[1px]"
          onClick={() => setIsShowing(false)}
        >
          <section className="flex pb-2 w-full px-4 border-b-2">
            <img
              src={martaImage}
              alt=""
              className="rounded-full w-14 bg-primary-150"
            />
            <article className="px-2">
              <h1 className="font-bold">{user.username}</h1>
              <h1 className="text-gray-400">
                {user.role === "student" ? student.email : trainer.email}
              </h1>
            </article>
          </section>
          <section className="pb-20 border-b-2">
            <Link to="/my-account" onClick={() => setIsShowing(false)}>
              <article className="flex items-center p-4">
                <FaRegUserCircle
                  style={{ width: "25px", height: "25px", marginRight: "15px" }}
                />
                <h1>My Account</h1>
              </article>
            </Link>
            <article className="flex items-center p-4">
              <FaRegMoon
                style={{ width: "25px", height: "25px", marginRight: "15px" }}
              />
              <h1 className="mr-14">Night mode</h1>
              <Switch
                onChange={() => setIsNightMode(!isNightMode)}
                checked={isNightMode}
                onColor="#6355D8"
                onHandleColor="#ffffff"
                uncheckedIcon={false}
                checkedIcon={false}
                height={24}
                width={48}
                key={"switch"}
              />
            </article>
          </section>

          <article className="p-4">
            <Link
              to="/login"
              className="flex items-center"
              onClick={() => {
                logout();
              }}
            >
              <FiLogIn
                style={{ width: "25px", height: "25px", marginRight: "15px" }}
              />
              <h1>Sign out</h1>
            </Link>
          </article>
        </article>
      ) : (
        <article className="flex items-center space-x-4">
          <h1 className="font-bold">{user.username}</h1>
          <button onClick={() => setIsShowing(true)}>
            <img
              src={martaImage}
              alt=""
              className="rounded-full w-14 bg-primary-150"
            />
          </button>
        </article>
      )}
    </>
  );
};

export default MiniProfile;
