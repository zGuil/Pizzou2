import React, { FormEvent, useState } from 'react'
import { FaPlus } from "react-icons/fa"
import api from "../../services/api"

import { Header } from "../../components/Header"

import './index.css'
import { formatPrice } from '../../utils/format'



function Vendas() {
  
    const [produto, setProduto] = useState("")

    const [qtd, setQtd] = useState("0")

    const [preco, setPreco] = useState("0")

    const [token, setToken] = useState("")

    function handleButton(event: FormEvent) {
        event.preventDefault()

        api.post("/auth", {username: "teste", password: "teste"}).then((response) => {
            setToken(response.data.access_token)
        })

        api.post("/insert/produto", {produto, qtd:Number(qtd), preco_atual:Number(preco)}, {headers: {"Authorization": `JWT ${token}`}}).then((responde) => {
            alert("Produto Cadastrado com sucesso !!!")
        })
        .catch(() => {
            alert("Esse Produto não pode ser cadastrado !!!")
        })
    }
    
  
    return (
        <>
        <Header></Header>
       <div className="container">
        <form onSubmit={handleButton}>
            <h1>💰 Efetuar Venda 💰</h1>

            <div className="input-container">
                <div className="input-block">
                    <label>Produto</label>
                    <input type="text" required value={produto}  onChange={(e) => setProduto(e.target.value) }/>
                </div>

                <div className="input-block">
                    <label>Quantidade</label>
                    <input type="number" required value={qtd} onChange={(e) => setQtd(e.target.value) }/>
                </div>

                <div className="input-block">
                    <label>Preço</label>
                    <input type="number" required value={preco} onChange={(e) => setPreco(e.target.value) }/>
                </div>

                <div className="add-button">
                   <button><FaPlus size={25} color="#000"/> Adicionar</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span>Pizza de Frango</span>
                            </td>

                            <td>
                                <span>2</span>
                            </td>

                            <td>
                                <span>{formatPrice(30)}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <span>Pizza de Mussarela</span>
                            </td>

                            <td>
                                <span>2</span>
                            </td>

                            <td>
                                <span>{formatPrice(36)}</span>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <span>Coca-Cola</span>
                            </td>

                            <td>
                                <span>2</span>
                            </td>

                            <td>
                                <span>{formatPrice(20)}</span>
                            </td>
                        </tr>
                
                        
                    </tbody>
                </table>

            </div>

            <button className="confirm-button" type="submit">Finalizar Pedido</button>

        </form>

        

       </div>
       </>
    )
  }
  
  export default Vendas;
  