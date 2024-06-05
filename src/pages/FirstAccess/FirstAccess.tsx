import { FormEvent, useEffect } from "react"
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
import {
  emailInvalid,
  fieldRequired,
  minContent
} from "../../utils/messagesError"

const handleSubmitRegisterSchema = z.object({
  username: z
    .string()
    .nonempty({
      message: fieldRequired("e-mail")
    })
    .regex(emailValidation, {
      message: emailInvalid
    })
    .transform((email) => email.toLocaleLowerCase()),
  codigo: z
    .string()
    .nonempty({
      message: fieldRequired("código")
    })
    .min(6, {
      message: `O código ${minContent(6)}`
    })
})

type IhandleSubmitRegister = z.infer<typeof handleSubmitRegisterSchema>

const MyFiibo = () => {
  const theme = useTheme()
  const { validateCode } = useUser()
  const { isLoading, call } = validateCode()

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
    document.title = `${theme.content.project} - Primeiro Acesso`
  }, [theme])

  return (
    <Centralized>
      <FieldWrap>
        <Logo backgroundImage={theme.images.logoLogin}>
          {theme.content.project}
        </Logo>

        <Form onSubmit={handleSubmit(handleSubmitRegister)}>
          <h3>Validar código</h3>

          <div className="field">
            <Input
              placeholder="Digite o e-mail"
              type="email"
              {...register("username")}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

          <div className="fieldsWrap">
            <div className="field">
              <Input
                placeholder="Digite o código de validação"
                type="text"
                onInput={(event: FormEvent<HTMLInputElement>) => {
                  event.currentTarget.value = event.currentTarget.value
                    .replace(/[^0-9A-Za-z]/g, "")
                    .replace(/(.{6}).+?$/, "$1")
                }}
                {...register("codigo")}
              />
              {errors.codigo && (
                <p className="error">{errors.codigo.message}</p>
              )}
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
