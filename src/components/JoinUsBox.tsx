import joinusTrainer from "../assets/joinusTrainer.png";
import joinusStudent from "../assets/joinusStudent.jpeg";
import Button from "./Button";
import useServices from "../services/useServices";

interface Props {
  isTrainer: boolean;
}

const JoinUsBox = ({ isTrainer }: Props) => {
  const { navigate } = useServices();

  return (
    <section className="grid grid-flow-col grid-cols-2 items-center px-8 mt-4 max-w-[1100px]">
      <article className="py-16 px-8 bg-slate-50 h-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold montserrat text-left tracking my-2">
            Register as {isTrainer ? "Trainer" : "Student"}
          </h1>
          <p className="text-left">
            Do consectetur proident proident id eiusmod deserunt consequat
            pariatur ad ex velit do Lorem reprehenderit.
          </p>
          <div className="w-20 mt-4">
            <Button
              name={"Join Us"}
              onClick={() => {
                if (isTrainer) navigate("/registration/trainer");
                else navigate("/registration/student");
              }}
              state={"primary"}
              classes="h-9"
            />
          </div>
        </div>
      </article>
      <article className="w-full h-full">
        <img
          src={isTrainer ? joinusTrainer : joinusStudent}
          alt="joinus"
          className="w-full h-full"
        />
      </article>
    </section>
  );
};

export default JoinUsBox;
