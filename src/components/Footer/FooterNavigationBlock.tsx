import { Link } from "react-router-dom";

interface LinkObject {
  to: string;
  text: string;
}

interface Props {
  links: Array<LinkObject>;
  title: string;
}

const FooterNavigationBlock = ({ links, title }: Props) => {
  return (
    <div className="grid grid-flow-row gap-2 text-center">
      <h1 className="text-xl font-bold mb-2">{title}</h1>
      {links.map((link, index) => {
        return (
          <Link to={link.to} key={index}>
            {link.text}
          </Link>
        );
      })}
    </div>
  );
};

export default FooterNavigationBlock;
