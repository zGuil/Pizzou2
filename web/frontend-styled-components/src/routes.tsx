import React from "react"
import { Route, BrowserRouter} from "react-router-dom"
import CadastroProdutos from "./pages/CadastroProduto"
import Estoque from "./pages/Estoque"

import Home from "./pages/Home"
import RelatorioVendas from "./pages/RelatorioVendas"
import Vendas from "./pages/Vendas"


const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Vendas} path="/vendas" />
            <Route component={Estoque} path="/estoque" />
            <Route component={CadastroProdutos} path="/cadastro-produto" />
            <Route component={RelatorioVendas} path="/relatorio-vendas" />

        </BrowserRouter>
    )
}

export default Routes