"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";

type ToastProps = {
  successMessage: string;
  errorMessage: string;
  success: boolean | null;
  timespan: number;
};
function useToast({
  successMessage,
  errorMessage,
  success,
  timespan,
}: Readonly<ToastProps>) {
  useEffect(() => {
    if (success === true) toast.success(successMessage);
    if (success === false) toast.error(errorMessage);
  }, [timespan]);
}
export default useToast;
