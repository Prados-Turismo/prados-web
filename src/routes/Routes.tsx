import ReactGA from "react-ga4";
import { Route, Routes, useLocation } from "react-router-dom";

import { ProtectedRoute } from "./RoutesProtected";

import { useGlobal } from "../contexts/UserContext";

// Pages Auth
import Home from "../pages/Home";

// Pages No Auth
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import ResetToken from "../pages/ResetToken";
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
import LocalEmbarque from "../pages/LocalEmbarque";
import Usuarios from "../pages/Usuarios";
import RankingCliente from "../pages/RankingCliente";
import RelatorioClientes from "../pages/RelatorioClientes";
import Vendas from "../pages/Vendas";
import Auditoria from "../pages/Auditoria";
import OpcionaisEmbarque from "../pages/Excursoes/pages/OpcionaisEmbarque";
import Configuracao from "../pages/Configuracao";
import RelatorioCategorias from "../pages/RelatorioCategorias";
import RelatorioExcursao from "../pages/RelatorioExcursao";
import RelatorioPacote from "../pages/RelatorioPacotes";

export const AppRoutes = () => {
  const location = useLocation();
  const { user } =
    useGlobal();

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
        <Route path="/destinos" element={<Pacotes />} />
        <Route path="/excursoes" element={<Excursoes />} />
        <Route path="/excursoes/:id/embarque" element={<Embarque />} />
        <Route path="/excursoes/:id/quartos" element={<Quartos />} />
        <Route path="/excursoes/:id/onibus" element={<Onibus />} />
        <Route path="/excursoes/:id/passageiros" element={<PassageirosList />} />
        <Route path="/excursoes/:idExcursao/opcional-embarque/:id" element={<OpcionaisEmbarque />} />
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
        <Route path="/local-embarque" element={<LocalEmbarque />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/ranking-clientes" element={<RankingCliente />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/relatorios/clientes" element={<RelatorioClientes />} />
        <Route path="/relatorios/auditoria" element={<Auditoria />} />
        <Route path="/relatorios/categorias" element={<RelatorioCategorias />} />
        <Route path="/relatorios/excursoes" element={<RelatorioExcursao />} />
        <Route path="/relatorios/destinos" element={<RelatorioPacote />} />
        <Route path="/configuracoes" element={<Configuracao />} />


        <Route path="*" element={<PageNotFound />} />
      </Route>

      {/* Rotas públicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/alterar-senha" element={<ResetToken />} />
    </Routes>
  );
};
