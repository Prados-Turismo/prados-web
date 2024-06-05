import { Box, useTheme } from "@chakra-ui/react";
import {
  ModalBox,
  RegisterBox,
  Header,
  Logo,
  Body,
  ProgressBar,
  LoginButton,
} from "./styled";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import YourAuthentication from "./steps/YourAuthentication";
import { IFormRegister } from "../../models/register.model";
import WeNeedYourData from "./steps/WeNeedYourData";
import OpenYourBusinessAccount from "./steps/OpenYourBusinessAccount";
import { useGlobal } from "../../contexts/UserContext";
import OpenAccountAlert from "./steps/OpenAccountAlert";

const formDefault: IFormRegister = {
  id: "",
  email: "",
  name: "",
  bornDate: "",
  phone: "",
  cnpj: "",
  policyPrivate: false,
  useTerm: false,
  cpf: "",
  hubSlug: "",
  type: "affiliated",
};

interface IRegister {
  demonstration: boolean;
}

const Register = ({ demonstration }: IRegister) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isFiibo = theme?.content?.project === "Fiibo";
  const { signOut } = useGlobal();
  const [step, setStep] = useState(1);
  const [progressValue, setProgressValue] = useState(25);
  const [form, setForm] = useState<IFormRegister>(formDefault);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight < 800);

  const handleNextStep = () => {
    setStep(step + 1);

    if (step < 4) {
      setProgressValue((e) => e + 25);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);

    if (step <= 4) {
      setProgressValue((e) => e - 25);
    }
  };

  useEffect(() => {
    signOut({ hasLoginRedirect: false });

    const redirectToYourAuthentication =
      location?.search.includes("?alterar-senha-email") &&
      location?.search?.split("=")[1];

    if (redirectToYourAuthentication) {
      setStep(3);
      setProgressValue(75);
      setForm({
        ...form,
        email: location?.search?.split("=")[1],
      });
    } else {
      if (demonstration) {
        navigate("/abrasuacontademo");
      } else {
        navigate("/abrasuaconta");
      }
    }

    document.title = `${theme.content.project} - Abra sua conta`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      const result = window.innerHeight < 800;
      setScreenHeight(result);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <RegisterBox backgroundImage={theme.images.bgRegister}>
      <ModalBox className={screenHeight ? "screenHeight" : ""}>
        <Box>
          <Header className={screenHeight ? "screenHeight" : ""}>
            <Logo backgroundImage={theme.images.logoLogin}>
              {theme.content.project}
            </Logo>

            <a href={isFiibo ? "https://fiibo.com.br/" : "/login"}>
              Voltar para o início
            </a>
          </Header>
        </Box>

        <Body overflow="hidden">
          {/* Abra sua conta empresarial gratuita */}
          {step === 1 && (
            <OpenYourBusinessAccount
              form={form}
              setForm={setForm}
              handleNextStep={handleNextStep}
            />
          )}

          {/* Precisamos dos seus dados */}
          {step === 2 && (
            <WeNeedYourData
              form={form}
              setForm={setForm}
              handleNextStep={handleNextStep}
              demonstration={demonstration}
              handlePreviousStep={handlePreviousStep}
            />
          )}

          {/* Precisamos da sua autenticação */}
          {step === 3 && form.email.length > 0 && (
            <YourAuthentication
              email={form?.email}
              handleNextStep={handleNextStep}
            />
          )}

          {/* Sua conta empresarial gratuita foi aberta */}
          {step === 4 && <OpenAccountAlert />}

          {[1].includes(step) && (
            <LoginButton>
              Já possui uma conta? <Link to="/login">Faça o login.</Link>
            </LoginButton>
          )}
        </Body>
        <ProgressBar
          value={progressValue}
          size="sm"
          className={screenHeight ? "screenHeight" : ""}
        />
      </ModalBox>
    </RegisterBox>
  );
};

export default Register;
