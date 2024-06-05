
import { z } from 'zod'


export const colaboratorSchema = z.object({
  importFile: z.instanceof(FileList, {
    message: "Selecione o arquivo de importação"
  }),

})


export type ColaboratorRequest = z.infer<typeof colaboratorSchema>
