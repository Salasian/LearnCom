interface Props {
  image: string;
  tag: string;
  title: string;
  date: string;
  min: number;
}

const Box = ({ image, date, min, tag, title }: Props) => {
  return (
    <article className="w-1/3 h-[446px] rounded-md bg-slate-50 flex flex-col border">
      <div className="h-[256px] flex-grow">
        <img
          src={image}
          alt="imagebox1"
          className="w-full h-full object-cover rounded-t-md overflow-hidden"
        />
      </div>
      <div className=" p-6">
        <h1 className="text-primary montserrat">{tag}</h1>
        <h1 className="font-bold text-2xl">{title}</h1>
        <section className="flex flex-row mt-4 justify-between items-end">
          <span className="text-gray-400">{date}</span>
          <article className="bg-gray-200 rounded-xl px-2 py-1 ">
            {min} mins read
          </article>
        </section>
      </div>
    </article>
  );
};

export default Box;
