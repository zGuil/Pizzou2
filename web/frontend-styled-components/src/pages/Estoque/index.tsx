import React, { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import api from '../../services/api'

import { formatPrice } from "../../utils/format"

import "./index.css"



function Estoque() {

    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        api.get("/produtos").then((response) =>{
            setProdutos(response.data)
        })
    }, [])
    

  
    return (
        <>  
        <Header>
            <h1>📦 Estoque 📦</h1>
        </Header>  
            
            <div className="container-table">
                <table className="estoque-table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto, index) => (
                            <tr key={index}>
                                <td>
                                    <span>{produto["nome"]}</span>
                                </td>

                                <td>
                                    <span>{produto["qtd"]}</span>
                                </td>

                                <td>
                                    <span>{formatPrice(produto["preco_atual"])}</span>
                                </td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
       </>
    )
  }
  
  export default Estoque;