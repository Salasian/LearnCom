import JoinUsBox from "../components/JoinUsBox";
const JoinUs = () => {
  return (
    <section className="grid justify-center">
      <JoinUsBox isTrainer={true} />
      <JoinUsBox isTrainer={false} />
    </section>
  );
};

export default JoinUs;
