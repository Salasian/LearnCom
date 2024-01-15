import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";

const Header = () => {
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const { pathname } = useLocation();

  function getWindowSize() {
    return window.innerWidth;
  }

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
    return <Navigation type={"sidebar"} pathname={pathname} />;
  } else {
    return <Navigation type={"topbar"} pathname={pathname} />;
  }
};

export default Header;
