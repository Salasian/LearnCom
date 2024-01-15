import { ChangeEvent, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import cloudUpload from "../../assets/cloudUpload.png";
import Button from "../Button";

const Dropzone = () => {
  const [fileImage, setFileImage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDrop = useCallback((acceptedFiles: any) => {
    setFileImage(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="bg-gray-100 border-dotted border-2 border-gray-200 p-20"
      >
        {fileImage ? (
          <>
            <img src={fileImage} alt="imageSelected" />
          </>
        ) : (
          <>
            <input {...getInputProps()} onChange={(e) => handleSubmit(e)} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <div className="grid justify-items-center gap-2">
                <img src={cloudUpload} alt="" className="w-[45px] h-[45px]" />
                <h1 className="text-2xl font-sans">Drop files here</h1>
                <p>Supoorted format: PNG, JPG</p>
                <p className="font-bold">OR</p>
                <Button
                  name={"Browse files"}
                  onClick={() => {}}
                  state={"transparent"}
                  classes="text-primary"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
