import { z } from "zod";

export const brokerSchema = z.object({
  nomeContato: z.string().or(z.string().length(0)).or(z.undefined()),
  telefone: z.string().or(z.string().length(0)).or(z.undefined()),
  razaoSocial: z.string().or(z.string().length(0)).or(z.undefined()),
  emailOperacional: z.string().email("Formato inválido").or(z.string().length(0)).or(z.undefined()),
  cnpj: z.string().or(z.string().length(0)).or(z.undefined())
})


export type BrokerRequest = z.infer<typeof brokerSchema>
