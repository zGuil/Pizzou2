import React, { FormEvent, useState } from 'react'
import api from "../../services/api"
import { useHistory } from "react-router-dom"

import { Header } from "../../components/Header"

import './index.css'


function CadastroProdutos() {
    
    const history = useHistory()

    const [nome, setNome] = useState("")

    const [qtd, setQtd] = useState("0")

    const [preco, setPreco] = useState("0")

    const [descricao, setDescricao] = useState("")

    const [token, setToken] = useState("")

    function handleButton(event: FormEvent) {
        event.preventDefault()

        api.post("/auth", {username: "teste", password: "teste"}).then((response) => {
            setToken(response.data.access_token)
        })

        api.post("/insert/produto", {nome, qtd:Number(qtd), preco_atual:Number(preco), descricao}, {headers: {"Authorization": `JWT ${token}`}}).then((responde) => {
            alert("Produto Cadastrado com sucesso !!!")
            history.push("/")
        })
        .catch((error) => {
            if(error.response.status === 400) {
                alert("Esse Produto já existe no estoque!!!")
            }
            
        })
    }
    
  
    return (
        <>
        <Header></Header>
       <div className="container">
        <form className="formCreateProduct"onSubmit={handleButton}>
            <h1>📥 Cadastro de Produto 📥</h1>

            <div className="input-container">
                <div className="input-block">
                    <label>Nome</label>
                    <input type="text" required value={nome}  onChange={(e) => setNome(e.target.value) }/>
                </div>

                <div className="input-block">
                    <label>Quantidade</label>
                    <input type="number" required value={qtd} min="1" onChange={(e) => setQtd(e.target.value) }/>
                </div>

                <div className="input-block">
                    <label>Preço</label>
                    <input type="number" required value={preco} onChange={(e) => setPreco(e.target.value) }/>
                </div>

                <div className="input-block">
                    <label>Descrição</label>
                    <textarea maxLength={100} value={descricao} onChange={(e) => setDescricao(e.target.value) }/>
                </div>
            </div>

            <button className="confirm-button" type="submit">Cadastrar</button>

        </form>

       </div>
       </>
    )
  }
  
  export default CadastroProdutos;
  