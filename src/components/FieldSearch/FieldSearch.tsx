import { useEffect, useRef } from "react"
import { MdSearch, MdClose } from "react-icons/md"

import { FieldWrap, Magnifier, Form, Clear } from "./styled"

import { IFieldSearch } from "./types"

const FieldSearch = ({
  placeholder,
  handleSearch,
  reset,
  dinamic
}: IFieldSearch) => {
  const searchForm = useRef<HTMLFormElement | null>(null)
  const text = useRef<HTMLInputElement | null>(null)

  const submit = () => {
    if (text.current) {
      handleSearch(text.current.value)
    }
  }

  useEffect(() => {
    if (reset && searchForm.current) {
      searchForm.current.reset()
    }
  }, [reset])

  return (
    <FieldWrap>
      <Magnifier onClick={submit}>
        <MdSearch fontSize={25} />
      </Magnifier>

      <Form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        ref={searchForm}
      >
        <input
          placeholder={placeholder}
          ref={text}
          type="text"
          onChange={(e) => {
            if (!e.target.value) {
              if (searchForm.current) {
                searchForm.current.reset()
              }
              handleSearch("")
            }
            if (dinamic) {
              handleSearch(e.target.value)
            }
          }}
        />
      </Form>

      <Clear
        onClick={() => {
          if (searchForm.current) {
            searchForm.current.reset()
          }
          handleSearch("")
        }}
      >
        <MdClose fontSize={25} />
      </Clear>
    </FieldWrap>
  )
}

export default FieldSearch
