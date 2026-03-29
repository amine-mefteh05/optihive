"use client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRef } from "react";
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
  const timespanRef = useRef(timespan);
  useEffect(() => {
    if (success === null) return;
    if (timespanRef.current === timespan) return;
    timespanRef.current = timespan;
    if (success === true) toast.success(successMessage);
    if (success === false) toast.error(errorMessage);
  }, [timespan]);
}
export default useToast;
