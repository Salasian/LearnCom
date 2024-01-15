interface Props {
  title: string;
  value: string;
}

const SingleInformationBox = ({ title, value }: Props) => {
  return (
    <article className="flex flex-col w-full px-4">
      <h1 className="font-bold">{title}</h1>
      <span>{value}</span>
    </article>
  );
};

export default SingleInformationBox;
