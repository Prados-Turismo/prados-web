import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { Sector } from "../types"
export interface FormValues {
  id: string
  title: string
  sectorId: Sector["id"]
  action: "edit" | "create"
  sectors: Map<string, Sector>
}

export default function usePositionModalForm() {
  return useForm<FormValues>({
    resolver: yupResolver(
      yup.object({
        title: yup.string().min(2),
        sectorId: yup.string().when("action", {
          is: (value: string) => value === "create",
          then: (schema) => schema.required()
        })
      })
    ),
    defaultValues: {
      id: "",
      title: "",
      sectorId: "",
      action: "edit",
      sectors: new Map([])
    }
  })
}
