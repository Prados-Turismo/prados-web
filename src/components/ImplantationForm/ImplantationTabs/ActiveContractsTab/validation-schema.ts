
import { z } from 'zod'

const phoneValidation = /^\([0-9]{2}\) ?[0-9]? ?[0-9]{4}-[0-9]{4}$/i

export const activeContractsSchema = z.object({
  contractData: z
    .array(
      z.object({
        login: z.string({
          required_error: "Campo Login é obrigatório"
        }).min(4, "Deve conter pelo menos 4 caracteres"),
        pass: z.string({
          required_error: "Campo Senha é obrigatório"
        }).min(4, "Deve conter pelo menos 4 caracteres"),
        contato: z.string().optional(),
        telefoneContato: z
          .string()
          .refine((phone) => (phone ? phoneValidation.test(phone) : true), {
            message: "Campo Telefone Contato é inválido"
          }),
        emailContato: z.string().email("Formato inválido").or(z.string().length(0)),
        contractDocument: z.instanceof(FileList, {
          message: "Selecione o documento do contrato vigente"
        }),
        tablePriceDocument: z.instanceof(FileList).optional()
      }),
    )
    .min(1, 'Adicione pelo menos um formulário de contrato'),
})


export type ActiveContractsRequest = z.infer<typeof activeContractsSchema>
