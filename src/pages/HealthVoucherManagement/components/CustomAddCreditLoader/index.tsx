import Loading from "../../../../components/Loading"
import { useMessageScheduler } from "../../../../hooks/useMessageScheduler"

export function CustomAddCreditLoader() {
  const { message } = useMessageScheduler(
    [
      "Estamos validando os dados...",
      "Estamos gerando a nota...",
      "Estamos gerando o seu boleto...",
      "Estamos concluindo o processo, aguarde..."
    ],
    5000
  )
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignSelf: "center",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem"
      }}
    >
      <Loading />
      <span>{message}</span>
    </div>
  )
}
