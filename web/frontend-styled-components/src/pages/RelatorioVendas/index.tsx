import React, { useState, useEffect } from "react"



import { Header } from "../../components/Header"
import { Accordion } from "../../components/Accordion"
import { formatPrice } from "../../utils/format"

import "./index.css"


const vendas = [{
    "id": 10,
    "produtos": [{
        "nome": "Pizza de Frango",
        "qtd": 2,
        "preco": 30
    }, {
        "nome": "Coca-Cola",
        "qtd": 2,
        "preco": 10
    }],
    "data": "16/11/2020",
    "total": 200
},

{
    "id": 10,
    "produtos": [{
        "nome": "Pizza de Queijo",
        "qtd": 2,
        "preco": 30
    }],
    "data": "16/11/2020",
    "total": 30
}
]


function RelatorioVendas() {
    return (
        <>
            <Header>
                <h1>📊 Relatórios de Vendas 📊</h1>
            </Header>

            <div className="container-filter">
                <form>
                    <span>De</span>
                    <input type="date"/>
                    <span>Até</span>
                    <input type="date"/>
                    <button>Filtrar</button>
                </form>
            </div>

            <div className="accordion-content">
                    {vendas.map(venda => (
                        <Accordion
                        title={venda.data}
                    >
                        <div className="container-table-relatorio">
                            <table className="table-relatorio">
                                    <thead>
                                        <tr>
                                            <th>Produto</th>
                                            <th>Quantidade</th>
                                            <th>Preço</th>
                                        </tr>
                                    </thead>
                        {venda.produtos.map((produto, index) => (
                                <tbody>
                                        <tr key={index}>
                                            <td>
                                                <span>{produto["nome"]}</span>
                                            </td>
            
                                            <td>
                                                <span>{produto["qtd"]}</span>
                                            </td>

                                            <td>
                                                <span>{formatPrice(produto["preco"])}</span>
                                            </td>
            
                                        </tr>
                                    

                                </tbody>
                            
                        ))}
                            </table>

                            <span className="content-span-relatorio">Total:{formatPrice(venda.total)}</span>
                        </div>

                    </Accordion>
                    ))}
                    

                
            </div>

        </>
    )
}

export default RelatorioVendas