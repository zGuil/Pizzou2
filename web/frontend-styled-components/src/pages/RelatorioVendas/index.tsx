import React, { useState, useEffect, FormEvent } from "react"

import { Header } from "../../components/Header"
import { Accordion } from "../../components/Accordion"
import { formatPrice } from "../../utils/format"

import api from "../../services/api";

import "./index.css"


// const vendas = [{
//     "id": 10,
//     "produtos": [{
//         "nome": "Pizza de Frango",
//         "qtd": 2,
//         "preco": 30
//     }, {
//         "nome": "Coca-Cola",
//         "qtd": 2,
//         "preco": 10
//     }],
//     "data": "16/11/2020",
//     "total": 200
// },

// {
//     "id": 10,
//     "produtos": [{
//         "nome": "Pizza de Queijo",
//         "qtd": 2,
//         "preco": 30
//     }],
//     "data": "16/11/2020",
//     "total": 30
// }
// ]

interface Venda {
    id: number,
    total: number,
    data: string,
    produtos: Array<{
        nome: string,
        qtd: number,
        preco: number,
    }>
}

function RelatorioVendas() {
    const [deDate, setDeDate] = useState('');
    const [ateDate, setAteDate] = useState('');
    const [vendas, setVendas] = useState<Venda[]>([]);
    
    function handleInviteDate(e: FormEvent) {
        e.preventDefault();
        api.get('/relatorio/vendas', { params: {de_date: deDate, ate_date: ateDate}}).then(response => {
            setVendas(response.data)
        })
    }

    return (
        <>
            <Header>
                <h1>📊 Relatório de Vendas 📊</h1>
            </Header>

            <div className="container-filter">
                <form onSubmit={handleInviteDate}>
                    <span>De</span>
                    <input type="date" onChange={(e) => setDeDate(e.target.value)}/>
                    <span>Até</span>
                    <input type="date" onChange={(e) => setAteDate(e.target.value)}/>
                    <button type="submit">Filtrar</button>
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
                                            <th>Preço Unitário</th>
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