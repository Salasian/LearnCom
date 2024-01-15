import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="grid justify-items-center">
      <h1 className="font-bold text-4xl text-center mb-10">
        {" "}
        404 Page Not Found
      </h1>
      <Button
        name={"Back to home"}
        onClick={() => navigate("/")}
        state={"primary"}
        classes="w-[200px]"
      />
    </div>
  );
};

export default Error;
