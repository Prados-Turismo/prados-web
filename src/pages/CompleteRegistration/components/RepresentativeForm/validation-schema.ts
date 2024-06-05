import { z } from "zod";
import {
  cpfInvalid,
  emailInvalid,
  fieldRequired,
  maxContent,
  minContent,
} from "../../../../utils/messagesError";
import { cpfValidation } from "../../../../utils";
import { emailValidation } from "../../../../utils/regexExpressions";

export const RepresentativeFormSchema = z.object({
  name: z
    .string()
    .nonempty({
      message: fieldRequired("nome"),
    })
    .min(5, {
      message: `O nome ${minContent(5)}`,
    })
    .max(250, {
      message: `O nome ${maxContent(250)}`,
    })
    .regex(/^[a-zA-ZÀ-ú0-9\s]+$/, {
      message: `O nome deve conter apenas caracteres alfanuméricos`,
    }),
  cpf: z
    .string()
    .nonempty({
      message: fieldRequired("CPF"),
    })
    .refine((cpf: string) => cpfValidation(cpf), {
      message: cpfInvalid,
    }),
  email: z
    .string()
    .nonempty({
      message: fieldRequired("e-mail"),
    })
    .regex(emailValidation, {
      message: emailInvalid,
    })
    .transform((email) => email.toLocaleLowerCase()),
});
