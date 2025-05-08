import { toast } from "react-toastify";

export function toastSuccess(message: string) {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "colored",
  });
}

export function toastError(message: string) {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    theme: "colored",
  });
}
