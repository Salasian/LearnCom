import Box from "../components/Box";
import imageBox1 from "../assets/homebox1.jpg";
import imageBox2 from "../assets/homebox2.jpg";
import imageBox3 from "../assets/homebox3.jpg";
import Button from "../components/Button";

const Home = () => {
  return (
    <section className="grid grid-flow-row gap-10 justify-items-center">
      <h1 className="font-bold text-4xl">Hi, Marta!</h1>
      <p className="text-center text-gray-400 mb-10 max-w-[540px]">
        Welcome to Learn Platform - where every day is a day to learn. Dive into
        the vast ocean of knowledge and empower yourself with the tools for a
        successful tomorrow. Happy learning!
      </p>
      <h1 className="font-bold text-4xl">What's new?</h1>
      <p className="text-center text-gray-400 max-w-[400px]">
        Do consectur proident proident id eiusmod deserunt consequat pariatur ad
        ex velit do Lorem reprehenderit.
      </p>
      <section className="flex w-full space-x-4">
        <Box
          image={imageBox1}
          tag={"Do consectetur"}
          title={"Aliqua Irure Tempor Lorem Occaecat"}
          date={"Dec 24, 2022"}
          min={5}
        />
        <Box
          image={imageBox2}
          tag={"Do consectetur"}
          title={"Aliqua Irure Tempor Lorem Occaecat"}
          date={"Dec 24, 2022"}
          min={5}
        />
        <Box
          image={imageBox3}
          tag={"Do consectetur"}
          title={"Aliqua Irure Tempor Lorem Occaecat"}
          date={"Dec 24, 2022"}
          min={5}
        />
      </section>
      <article className="w-[200px]">
        <Button
          name={"Read more articles"}
          onClick={() => {}}
          state={"primary"}
        />
      </article>
    </section>
  );
};

export default Home;
