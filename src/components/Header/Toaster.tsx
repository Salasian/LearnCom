import { toast } from "react-toastify";

const useToaster = () => {
  const notifySuccess = (message: string) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const notifyWarning = (message: string) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  return { notifySuccess, notifyWarning };
};

export default useToaster;
