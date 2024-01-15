import Button from "../Button";
import { useNavigate } from "react-router-dom";

const MyAccountMyTrainings = () => {
  const navigate = useNavigate();
  return (
    <section className="m-auto w-3/6 mt-10 flex flex-col text-center items-center space-y-20">
      <h1 className="text-4xl font-bold">My Trainings</h1>
      <p>
        The training Section is interactive allowing you to engage with trainers
        and fellow learners participate in quizzes, and track your progress. All
        our courses are flexible and adaptable to your schedule and learning
        speed.
      </p>
      <div className="w-40">
        <Button
          name={"View trainings"}
          onClick={() => navigate("/training")}
          state={"primary"}
        />
      </div>
    </section>
  );
};

export default MyAccountMyTrainings;
