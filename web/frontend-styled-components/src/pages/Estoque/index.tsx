import React, { useState, useEffect, FormEvent } from 'react'
import { AiFillDelete, AiFillInfoCircle } from 'react-icons/ai'
import { RiEditFill } from 'react-icons/ri'
import { useHistory } from 'react-router-dom'
import { Header } from '../../components/Header'
import Modal from '../../components/Modal'
import api from '../../services/api'

import { formatPrice } from "../../utils/format"
import ReactTooltip from 'react-tooltip';

import "./index.css"

interface produtos {
    id: number;
    nome: string;
    qtd: string;
    descricao: string;
    preco_atual: any;
  }


function Estoque() {

    const [produtos, setProdutos] = useState<produtos[]>([]);
    const [nome, setNome] = useState("")
    const [id, setId] = useState(0)
    const [preco_atual, setPrecoAtual] = useState("")
    const [qtd, setQtd] = useState("")
    const [descricao, setDescricao] = useState("")
    const [visible, setVisible] = useState(false);

    const handleVisible = (id: number) => {
        setVisible(!visible);
        const product = produtos.filter((p) => p.id === id)
        setNome(product[0].nome)
        setPrecoAtual(product[0].preco_atual)
        setQtd(product[0].qtd)
        setId(product[0].id)
        setDescricao(product[0].descricao)
        window.scrollTo(0, 0);
      };

    useEffect(() => {
        api.get("/produtos").then((response) =>{
            setProdutos(response.data)
        })
    }, [])



    function deleteProduct(idProduct: number) {
        
        api.delete(`/delete/produto/${idProduct}`).then((response) =>{
            window.location.reload()
        })
        
    }

    function handleButton(event: FormEvent) {
        event.preventDefault()


        api.put("/update/produto", {nome, qtd: Number(qtd), preco_atual: Number(preco_atual), id, descricao}).then((responde) => {
            window.location.reload()
            
        })
    }
  
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
                            <th>Descrição</th>
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
                                    <span>{produto.descricao}</span>                                    
                                </td>

                                <td>
                                    <span>{produto["qtd"]}</span>
                                </td>

                                <td>
                                    <span>{formatPrice(produto.preco_atual)}</span>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        style={{ border: 0}}
                                        onClick={() => handleVisible(produto.id)}
                                    >
                                    <RiEditFill size={26} color="#000" />
                                    </button>

                                    {visible ? (
                                        <Modal onClose={() => setVisible(false)}>
                                                <form className="formEditProduct" onSubmit={handleButton}>
                                                    <h1>📥 Editar Produto 📥</h1>

                                                    <div className="input-container">
                                                        <div className="input-block">
                                                            <label>Nome</label>
                                                            <input type="text" required value={nome} onChange={(e) => setNome(e.target.value) }/>
                                                        </div>

                                                        <div className="input-block">
                                                            <label>Descrição</label>
                                                            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value) }/>
                                                        </div>

                                                        <div className="input-block">
                                                            <label>Quantidade</label>
                                                            <input type="number" required value={qtd} onChange={(e) => setQtd(e.target.value) }/>
                                                        </div>

                                                        <div className="input-block">
                                                            <label>Preço </label>
                                                            <input type="number" required value={preco_atual} onChange={(e) => setPrecoAtual(e.target.value) }/>
                                                        </div>
                                                    </div>

                                                    <button className="confirm-button" type="submit">Atualizar</button>

                                                </form>
                                        </Modal>
                                    ) : null}
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        style={{ border: 0}}
                                        onClick={() => deleteProduct(produto.id)}
                                    >
                                    <AiFillDelete size={26} color="#000" />
                                    </button>
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