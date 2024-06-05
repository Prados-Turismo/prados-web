
import { z } from 'zod'


export const importPjsSchema = z.object({
  importFile: z.instanceof(FileList, {
    message: "Selecione o arquivo de importação"
  }).optional(),

})


export type ImportPjsRequest = z.infer<typeof importPjsSchema>
