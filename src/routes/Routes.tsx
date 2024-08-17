import ReactGA from "react-ga4";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./RoutesProtected";

import { useGlobal } from "../contexts/UserContext";

// Pages Auth
import BenefitSettings from "../pages/BenefitSettings";
import Benefits from "../pages/Benefits";
import ProductsPrice from "../pages/Benefits/pages/ProductsPrice";
// import Collaborator from "../pages/Collaborator";
// import CollaboratorDetails from "../pages/CollaboratorDetails";
import Company from "../pages/Company";
import FinancialArea from "../pages/FinancialArea";
import HealthVoucherManagement from "../pages/HealthVoucherManagement";
import Home from "../pages/Home";
import NeedHelp from "../pages/NeedHelp";
import Partners from "../pages/Partners";
import PartnerDetails from "../pages/Partners/pages/PartnerDetails";
import Reports from "../pages/Reports";
import ResetPasswords from "../pages/ResetPasswords";
import SelectCompany from "../pages/SelectCompany";
import SelectRole from "../pages/SelectRole";
import UserManagements from "../pages/UserManagements";

// Pages No Auth
import CommonQuestions from "../pages/CommonQuestions";
import CompleteRegistration from "../pages/CompleteRegistration";
import FirstAccess from "../pages/FirstAccess";
import ForgetPassword from "../pages/ForgetPassword";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Register from "../pages/Register";
import ResetToken from "../pages/ResetToken";
import Notifications from "../pages/Notifications";
import Products from "../pages/Products";
import Pacotes from "../pages/Pacotes";
import Excursoes from "../pages/Excursoes";
import Embarque from "../pages/Excursoes/pages/Embarque";
import Quartos from "../pages/Excursoes/pages/Quartos";
import Onibus from "../pages/Excursoes/pages/Onibus";
import PassageirosList from "../pages/Excursoes/pages/Passageiros";
import Transacoes from "../pages/Transacoes";
import TipoQuarto from "../pages/TipoQuarto";
import CategoriaTransacao from "../pages/CategoriaTransacao";
import ContaBancaria from "../pages/ContaBancaria";
import FormaPagamento from "../pages/FormaPagamento";
import Clientes from "../pages/Clientes";
import Fornecedor from "../pages/Fornecedor";
import Reservas from "../pages/Reservas";
import SubCategoriaTransacao from "../pages/SubCategoriaTransacao";
import Voucher from "../pages/Reservas/pages/Voucher";
import Ticket from "../pages/Reservas/pages/Ticket";

export const AppRoutes = () => {
  const location = useLocation();
  const { user, role, roles, permissions, companyStatus, isBroker, company } =
    useGlobal();

  const isNotApproved =
    (companyStatus &&
      companyStatus?.status !== "approved" &&
      company &&
      !isBroker) ||
    false;

  ReactGA.initialize("G-HMJ7F7DKB5");
  ReactGA.send({
    hitType: "pageview",
    page: location.pathname + location.search,
    title: location.pathname,
  });

  const homeElement = <Home />;
  return (
    <Routes>
      {/* Rotas para todos os perfis autenticados */}
      <Route element={<ProtectedRoute isAuth={!!user} />}>
        <Route path="/" element={homeElement} />
        <Route path="/index.htm" element={homeElement} />
        <Route path="/index.html" element={homeElement} />
        <Route path="/produtos2" element={<Products />} />
        <Route path="/pacotes" element={<Pacotes />} />
        <Route path="/excursoes" element={<Excursoes />} />
        <Route path="/excursoes/:id/embarque" element={<Embarque />} />
        <Route path="/excursoes/:id/quartos" element={<Quartos />} />
        <Route path="/excursoes/:id/onibus" element={<Onibus />} />
        <Route path="/excursoes/:id/passageiros" element={<PassageirosList />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/tipo-quarto" element={<TipoQuarto />} />
        <Route path="/categoria-transacao" element={<CategoriaTransacao />} />
        <Route path="/conta-bancaria" element={<ContaBancaria />} />
        <Route path="/forma-pagamento" element={<FormaPagamento />} />
        <Route path="/cliente" element={<Clientes />} />
        <Route path="/fornecedor" element={<Fornecedor />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/reservas/:id/voucher" element={<Voucher />} />
        <Route path="/reservas/:id/ticket" element={<Ticket />} />
        <Route path="/subcategoria-transacao" element={<SubCategoriaTransacao />} />

        <Route path="/politica-privacidade" element={<PrivacyPolicy />} />

        <Route element={<ProtectedRoute isAuth={permissions?.collaborator} />}>
          {/* <Route path="/pacotes" element={<Collaborator />} />
          <Route path="/pacotes/:id" element={<CollaboratorDetails />} /> */}
        </Route>

        <Route element={<ProtectedRoute isAuth={permissions?.product} />}>
          <Route path="/produtos" element={<Benefits />} />
          <Route path="/solicitar-cotacao" element={<ProductsPrice />} />
        </Route>

        <Route
          element={<ProtectedRoute isAuth={permissions?.productSettings} />}
        >
          <Route
            path="/parametrizacao-de-produtos"
            element={<BenefitSettings />}
          />
        </Route>

        <Route element={<ProtectedRoute isAuth={permissions?.financialArea} />}>
          <Route path="/area-financeira" element={<FinancialArea />} />
        </Route>

        <Route element={<ProtectedRoute isAuth={permissions?.reports} />}>
          <Route path="/movimentacoes" element={<Reports />} />
        </Route>

        <Route element={<ProtectedRoute isAuth={permissions?.partner} />}>
          <Route path="/prestadores-de-servico" element={<Partners />} />
          <Route
            path="/prestadores-de-servico/:id"
            element={<PartnerDetails />}
          />
        </Route>

        <Route element={<ProtectedRoute isAuth={permissions?.companyData} />}>
          <Route path="/dados-empresa" element={<Company />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAuth={permissions?.healthVoucherManagement} />
          }
        >
          <Route
            path="/gestao-promocao-saude"
            element={<HealthVoucherManagement />}
          />
        </Route>

        <Route
          element={<ProtectedRoute isAuth={permissions?.userManagement} />}
        >
          <Route path="/gestao-de-usuarios" element={<UserManagements />} />
        </Route>

        <Route element={<ProtectedRoute isAuth={roles?.length > 1} />}>
          <Route path="/selecione-perfil" element={<SelectRole />} />
        </Route>

        <Route element={<ProtectedRoute isAuth={!!role} />}>
          <Route path="/selecione-empresa" element={<SelectCompany />} />
        </Route>

        <Route element={<ProtectedRoute isAuth={isNotApproved} />}>
          <Route
            path="/completar-cadastro"
            element={<CompleteRegistration />}
          />
        </Route>

        <Route element={<ProtectedRoute isAuth={permissions?.notifications} />}>
          <Route path="/notificacoes" element={<Notifications />} />
        </Route>
        <Route path="/canal-de-atendimento" element={<NeedHelp />} />

        <Route path="/senha" element={<ResetPasswords />} />

        <Route path="*" element={<PageNotFound />} />
      </Route>

      {/* Rotas públicas */}
      <Route path="/central-de-ajuda" element={<CommonQuestions />} />
      <Route path="/login" element={<Login />} />
      <Route path="/alterar-senha" element={<ResetToken />} />
      <Route
        path="/abrasuaconta"
        element={<Register demonstration={false} />}
      />
      <Route
        path="/abrasuacontademo"
        element={<Register demonstration={true} />}
      />
      <Route path="/cadastre-se" element={<Navigate to="/abrasuaconta" />} />
      <Route path="/lead" element={<Register demonstration={true} />} />
      <Route path="/recuperar-senha" element={<ForgetPassword />} />
      <Route path="/primeiro-acesso" element={<FirstAccess />} />
    </Routes>
  );
};
