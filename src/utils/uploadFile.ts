import axios from "axios"
import { useToastStandalone } from "../hooks/useToastStandalone"
import { Warning } from "../errors"

interface IProps {
  path?: string
  url?: string
  file: File
}

const getFileAsBytes = (file: File): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      if (event.target?.result instanceof ArrayBuffer) {
        resolve(event.target.result)
      } else {
        reject(new Warning("Erro ao ler o arquivo."))
      }
    }

    reader.onerror = () => {
      reject(new Warning("Erro ao ler o arquivo."))
    }

    reader.readAsArrayBuffer(file)
  })
}

export const uploadFile = async ({ url, file }: IProps) => {
  const fil = await getFileAsBytes(file)

  axios
    .put(url as string, fil, {
      headers: {
        "Content-Type": file.type
      }
    })
}
