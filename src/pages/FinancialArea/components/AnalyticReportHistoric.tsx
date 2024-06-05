import { useEffect, useRef, useState } from "react"
import Loading from "../../../components/Loading"

import {
  TableChild,
  THead,
  TBody,
  TR,
  TD,
  TableLoading
} from "../../../components/Table"

import { numberFormat } from "../../../utils"

import { IAnalyticReportHistoricResponse } from "../../../models/financial.model"

const AnalyticReportHistoric = ({ id }: { id: number }) => {
  const historic = useRef<IAnalyticReportHistoricResponse[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)

    setTimeout(() => {
      historic.current = [
        {
          id: 1,
          balance: "09/2022",
          provider: "HapMais Saúde S/A",
          product: "Pacote de medicamentos básico",
          value: 300,
          type: "Saúde"
        },
        {
          id: 2,
          balance: "10/2022",
          provider: "HapMais Saúde S/A",
          product: "Pacote de medicamentos básico",
          value: 300,
          type: "Saúde"
        },
        {
          id: 3,
          balance: "11/2022",
          provider: "HapMais Saúde S/A",
          product: "Pacote de medicamentos básico",
          value: 300,
          type: "Saúde"
        }
      ]

      setIsLoading(false)
    }, 1000)
  }, [id])

  return (
    <>
      {isLoading && (
        <TableLoading>
          <Loading />
        </TableLoading>
      )}

      {!isLoading && (
        <TableChild>
          <THead>
            <TD>Competência</TD>
            <TD>Fornecedor</TD>
            <TD>Produto</TD>
            <TD>Valor (R$)</TD>
            <TD>Classe</TD>
          </THead>

          <TBody>
            {historic.current.map((item) => (
              <TR key={item.id}>
                <TD>{item.balance}</TD>
                <TD>{item.provider}</TD>
                <TD>{item.product}</TD>
                <TD>{numberFormat(item.value)}</TD>
                <TD>{item.type}</TD>
              </TR>
            ))}
          </TBody>
        </TableChild>
      )}
    </>
  )
}

export default AnalyticReportHistoric
