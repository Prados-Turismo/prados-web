import React, { useState } from "react"
import { Field, FiltersContainer, Input } from "./styled"
import { BiCalendar } from "react-icons/bi"
import { dateFormat, dateToIsoFormatAmerican } from "../../../../utils"
import { useToastStandalone } from "../../../../hooks/useToastStandalone"

interface Props {
  setFilterState: React.Dispatch<React.SetStateAction<any>>
}

const DateRangeFilter: React.FC<Props> = ({ setFilterState }) => {
  const [startDate, setStartDate] = useState(
    dateToIsoFormatAmerican(dateFormat(new Date()))
  )
  const [endDate, setEndDate] = useState(
    dateToIsoFormatAmerican(dateFormat(new Date()))
  )

  return (
    <FiltersContainer>
      <Field>
        <Input
          type="date"
          lang="pt-BR"
          placeholder="Data inicial"
          onChange={({
            target: { value }
          }: React.ChangeEvent<HTMLInputElement>) => {
            if (new Date(value) > new Date(endDate)) {
              useToastStandalone({
                description: "Data inicial não pode ser maior que a data final",
                title: "Erro ao mudar data inicial",
                status: "error"
              })
            } else {
              setStartDate(value)
              setFilterState((state: any) => ({
                ...state,
                startDate: value
              }))
            }
          }}
        />
        <BiCalendar size={16} className="SVG" />
      </Field>
      <span className="untilSpan">até</span>
      <Field>
        <Input
          type="date"
          lang="pt-BR"
          placeholder="Data final"
          onChange={({
            target: { value }
          }: React.ChangeEvent<HTMLInputElement>) => {
            if (new Date(value) < new Date(startDate)) {
              useToastStandalone({
                description: "Data final não pode ser menor que a data inicial",
                title: "Erro ao mudar data final",
                status: "error"
              })
            } else {
              setEndDate(value)
              setFilterState((state: any) => ({
                ...state,
                endDate: value
              }))
            }
          }}
        />
        <BiCalendar size={16} className="SVG" />
      </Field>
    </FiltersContainer>
  )
}

export default DateRangeFilter
