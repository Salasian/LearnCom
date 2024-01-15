import { ChangeEvent } from "react";
import Button from "../Button";
import Input from "../Input";

interface Props {
  suscribeEmail: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>, identifier: string) => void;
  submitEmail: () => void;
}

const FooterEmailSubscription = ({
  suscribeEmail,
  handleChange,
  submitEmail,
}: Props) => {
  return (
    <article className="w-80">
      <h1 className="text-xl font-bold mb-2 text-primary font-heading basis">
        Suscribe to our newsletter
      </h1>
      <span className="text-sm">
        For product announcements and exclusive insights
      </span>
      <div className="rounded-md flex mt-4">
        <div className="basis-3/5">
          <Input
            val={suscribeEmail}
            identifier={"suscribeEmail"}
            onChange={handleChange}
            type={"text"}
            placeholder={"Input your email"}
            state={"default"}
            icon="mail"
            classes="rounded-r-none"
          />
        </div>
        <div className="basis-2/5 h-full">
          <Button
            name={"Suscribe"}
            onClick={submitEmail}
            state={"primary"}
            classes="rounded-l-none py-2 px-4 border border-primary"
          />
        </div>
      </div>
    </article>
  );
};

export default FooterEmailSubscription;
