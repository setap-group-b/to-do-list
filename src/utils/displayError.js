import toast from "react-hot-toast";

export const displayErrorMessage = (err) => {
  if (typeof err === "string") {
    return toast.error(err);
  }
  const defaultMsg = "Something went wrong, please try again!";
  if (Array.isArray(err?.data?.message)) {
    err?.data?.message?.forEach((msg) => toast.error(msg || defaultMsg));
  } else toast.error(err?.message || err?.data?.message || defaultMsg);
};
