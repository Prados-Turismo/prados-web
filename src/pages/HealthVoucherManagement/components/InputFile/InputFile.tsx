import React, { useState } from "react"
import { InputFileWrapper } from "./styled"
import { useDropzone } from "react-dropzone"

interface Props {
  handleFileInsert?: (file: File) => void
  getFile?: React.Dispatch<React.SetStateAction<File[]>>
  onClean?: () => void
}

const InputFile: React.FC<Props> = ({ handleFileInsert, getFile, onClean }) => {
  const [fileList, setFilelist] = useState<File[]>([])
  const inputRef = React.useRef<HTMLInputElement>(null)

  const onDrop = (accptedFiles: File[]) => {
    if (accptedFiles) {
      setFilelist(Array.from(accptedFiles))

      if (getFile) getFile(Array.from(accptedFiles))
      if (accptedFiles.length && handleFileInsert) {
        Array.from(accptedFiles).map((file) => handleFileInsert(file))
      }
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop
  })

  const removeFile = () => {
    if (onClean) onClean()
    setFilelist([])
    if (inputRef.current) {
      inputRef.current.files = null
      inputRef.current.value = ""
    }
  }

  return (
    <InputFileWrapper
      onClick={({ currentTarget }) => {
        if (currentTarget) {
          if (inputRef.current) {
            inputRef.current.click()
            inputRef.current.files = null
            inputRef.current.value = ""
          }
        }
      }}
      {...getRootProps()}
    >
      {!fileList.length ? (
        <p>
          <span>Procure</span> ou arraste e solte um arquivo aqui.
        </p>
      ) : (
        <ul>
          {Array.from(fileList).map((file) => (
            <li key={file.name + Math.floor(99999)}>
              <span>{file.name}</span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  removeFile()
                }}
              >
                x
              </button>
            </li>
          ))}
        </ul>
      )}
      <label htmlFor="file-upload" />
      <input
        type="file"
        id="file-upload"
        accept="text/csv"
        hidden
        ref={inputRef}
        {...getInputProps()}
        // onChange={({ target: { files } }) => {
        //   if (files) {
        //     setFilelist(Array.from(files))

        //     if (getFile) getFile(Array.from(files))
        //     if (files.length && handleFileInsert) {
        //       Array.from(files).map((file) => handleFileInsert(file))
        //     }
        //   }
        // }}
      />
    </InputFileWrapper>
  )
}

export default InputFile
