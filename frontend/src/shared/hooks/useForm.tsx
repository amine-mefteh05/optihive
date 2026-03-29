"use client";
import { useActionState } from "react";
import useToast from "./useToast";
import { useRef, useState, useEffect } from "react";
export type useFormState = {
  success: boolean | null;
  timespan: number;
};
type useFormProps = {
  successMessage: string;
  errorMessage: string;
  action: (state: useFormState, formData: FormData) => Promise<useFormState>;
};

function useForm({ action, successMessage, errorMessage }: useFormProps) {
  const [state, formAction, isPending] = useActionState(action, {
    success: null,
    timespan: Date.now(),
  });
  useToast({
    successMessage,
    errorMessage,
    success: state.success,
    timespan: state.timespan,
  });
  return { formAction, isPending };
}

export default useForm;
