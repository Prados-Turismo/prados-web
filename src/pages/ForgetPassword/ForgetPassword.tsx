import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme, Input, Button } from "@chakra-ui/react"

// Hooks
import useUser from "../../hooks/useUser"

// Estilos
import Centralized from "../../Layouts/Centralized"
import { FieldWrap, Logo, Form } from "./styled"

// Funções de utilidade
import { emailValidation } from "../../utils/regexExpressions"
import { emailInvalid, fieldRequired } from "../../utils/messagesError"

const handleSubmitRegisterSchema = z.object({
  email: z
    .string()
    .nonempty({
      message: fieldRequired("e-mail")
    })
    .regex(emailValidation, {
      message: emailInvalid
    })
    .transform((email) => email.toLocaleLowerCase())
})

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>

const MyFiibo = () => {
  const theme = useTheme()
  const { forgetPassword } = useUser()
  const { isLoading, call } = forgetPassword()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IhandleSubmitRegister>({
    resolver: zodResolver(handleSubmitRegisterSchema)
  })

  const handleSubmitRegister = (data: IhandleSubmitRegister) => {
    call(data)
    reset()
  }

  useEffect(() => {
    document.title = `${theme.content.project} - Recuperar senha`
  }, [theme])

  return (
    <Centralized>
      <FieldWrap>
        <Logo backgroundImage={theme.images.logoLogin}>
          {theme.content.project}
        </Logo>

        <Form onSubmit={handleSubmit(handleSubmitRegister)}>
          <h3>Recuperar senha</h3>

          <div className="fieldsWrap">
            <div className="field">
              <Input
                placeholder="Digite o e-mail do contato"
                type="email"
                {...register("email")}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>
          </div>

          <span style={{ textAlign: "center" }}>
            <Button
              isLoading={isLoading}
              loadingText="enviando..."
              type="submit"
            >
              Enviar
            </Button>
          </span>
        </Form>

        <span style={{ textAlign: "center" }}>
          <Link to="/login">Fazer login</Link>
        </span>
      </FieldWrap>
    </Centralized>
  )
}

export default MyFiibo
