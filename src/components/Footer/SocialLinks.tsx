import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RAW_COLOR_DICTIONARY } from "../../assets/dictionaries";
import { Link } from "react-router-dom";

const SocialLinks = () => {
  return (
    <article className="grid grid-flow-col gap-8 justify-center my-4">
      <Link to={"https://twitter.com/"}>
        <FaXTwitter
          style={{
            color: RAW_COLOR_DICTIONARY["primary"],
            fontSize: "1.5rem",
          }}
        />
      </Link>
      <Link to={"https://www.facebook.com/"}>
        <FaFacebook
          style={{
            color: RAW_COLOR_DICTIONARY["primary"],
            fontSize: "1.5rem",
          }}
        />
      </Link>
      <Link to={"https://www.youtube.com/"}>
        <FaYoutube
          style={{
            color: RAW_COLOR_DICTIONARY["primary"],
            fontSize: "1.5rem",
          }}
        />
      </Link>
    </article>
  );
};

export default SocialLinks;
