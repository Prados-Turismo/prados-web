import { z } from "zod";
import { cnpjValidation, cpfValidation } from "../../../utils";
import {
  cnpjInvalid,
  cpfInvalid,
  emailInvalid,
  fieldRequired,
  maxContent,
  minContent,
} from "../../../utils/messagesError";
import { emailValidation } from "../../../utils/regexExpressions";
import { cellphoneValidation } from "../../../utils/fieldMask";

const object = {
  cnpj: z
    .string()
    .nonempty({
      message: fieldRequired("CNPJ"),
    })
    .refine((cnpj: string) => cnpjValidation(cnpj), {
      message: cnpjInvalid,
    }),
  cpf: z
    .string()
    .nonempty({
      message: fieldRequired("CPF"),
    })
    .refine((cpf: string) => cpfValidation(cpf), {
      message: cpfInvalid,
    }),
  name: z
    .string()
    .nonempty({
      message: fieldRequired("nome do responsável"),
    })
    .min(7, {
      message: `O nome do responsável ${minContent(7)}`,
    })
    .max(120, {
      message: `O nome do responsável ${maxContent(120)}`,
    }),
  phone: z
    .string()
    .nonempty({
      message: fieldRequired("telefone"),
    })
    .refine(
      (value) => {
        if (value.trim() === "") {
          return true;
        }

        return cellphoneValidation(value);
      },
      {
        message: "Informe um número com formato válido (00) 90000-0000.",
      },
    ),
  email: z
    .string()
    .nonempty({
      message: fieldRequired("e-mail"),
    })
    .regex(emailValidation, {
      message: emailInvalid,
    })
    .transform((email) => email.toLocaleLowerCase()),
  preference: z.string().nonempty({
    message: fieldRequired("preferência"),
  }),
};

export const handleSubmitRegisterSchema = z.object(object);

export const handleSubmitEditSchema = z.object({
  name: object.name,
  phone: object.phone,
  email: object.email,
  preference: object.preference,
});
