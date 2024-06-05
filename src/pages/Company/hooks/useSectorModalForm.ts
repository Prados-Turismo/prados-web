import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export interface FormValues {
  id: string;
  title: string;
  action: "edit" | "create";
}

export default function useSectorModalForm() {
  return useForm<FormValues>({
    resolver: yupResolver(
      yup.object({
        title: yup.string().min(2),
      }),
    ),
    defaultValues: {
      id: "",
      title: "",
      action: "edit",
    },
  });
}
