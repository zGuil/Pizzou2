import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom"
import { FaPlus } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import api from '../../services/api';
import { Header } from '../../components/Header';

import './index.css';
import { formatPrice } from '../../utils/format';

interface produtos {
  nome: string;
  qtd: string;
  preco: string;
  subtotal: number;
  categoria: string;
}

interface cardapio {
  id: number;
  nome: string;
  preco: string;
}

function Vendas() {

  const [produtos, setProdutos] = useState<produtos[]>([]);
  const [cardapio, setCardapio] = useState<cardapio[]>([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [qtd, setQtd] = useState('0');
  const [preco, setPreco] = useState("0");
  const [desconto, setDesconto] = useState("0");
  const [subtotal, setSubTotal] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState('');
  const history = useHistory()


  


  function addNewProduct() {
    if (!nomeProduto || !qtd || !preco) alert('Preencha os campos!');
    if (desconto > preco) alert('O desconto não pode ser maior que preço !');
    else {
      const sub = Number(preco) * Number(qtd) - Number(desconto)
      setProdutos([...produtos, { nome: nomeProduto, qtd, preco, subtotal: sub, categoria}]);
      setTotal(total + sub)
      setNomeProduto('');
      setQtd('');
      setPreco("0");
      setSubTotal(0)
      setCategoria("")
      setDesconto("")
    }
  }
  const handleCategoria = (nome: string) => {

      setCategoria(nome)
    
      api.get('/cardapio', {params: {categoria: nome}}).then(responde => {setCardapio(responde.data)})

  }


  const handleCardapio = (nome: string) => {
    console.log(nome)
    const escolhaProduto = cardapio.filter((p) => p.nome === nome)
    setPreco(escolhaProduto[0].preco)
    setNomeProduto(nome)

  }


  function deleteProduct(nomeProduct: string) {
    const newProducts = produtos.filter((p) => {
      if (p.nome === nomeProduct) setTotal(total - p.subtotal)
      return(p.nome !== nomeProduct)
    });
    

    setProdutos(newProducts);
    
  }

  function handleButton(event: FormEvent) {
    event.preventDefault();

    api
      .post('/auth', { username: 'teste', password: 'teste' })
      .then((response) => {
        setToken(response.data.access_token);
      });

    api
      .post(
        '/insert/venda',
        { produtos },
        { headers: { Authorization: `JWT ${token}` } },
      )
      .then((responde) => {
        alert('Venda efetuada com sucesso !!!');
        history.push("/")
        
      })
      .catch((error) => {
        alert(error.response.data)
        window.location.reload()
      });
  }

  return (
    <>
      <Header></Header>
      <div className="container">
        <form onSubmit={handleButton}>
          <h1>💰 Efetuar Venda 💰</h1>

          <div className="input-container">
            <div className="input-block">
                <label>Categoria</label>
                <select value={categoria} onChange={(e) => handleCategoria(e.target.value)}>
                  <option value="">Selecione uma Opção</option>
                  <option value="bebida">Bebida</option>
                  <option value="pizza">Pizza</option>
                </select>
            </div>

            <div className="input-block">
              <label>Produto</label>
              <select value={nomeProduto} onChange={(e) => handleCardapio(e.target.value)}>
                <option value="">Selecione uma Opção</option>
                {cardapio.map((p) => { return (
                  <option value={p.nome}>{p["nome"]}</option>
                )
                  
                })}
              </select>
            </div>

            <div className="input-block">
              <label>Quantidade</label>
              <input
                type="number"
                value={qtd}
                min="1"
                onChange={(e) => setQtd(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label>Preço Unitário</label>
              <input
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label>Desconto</label>
              <input
                type="number"
                value={desconto}
                onChange={(e) => setDesconto(e.target.value)}
              />
            </div>

            <div className="add-button">
              <button type="button" onClick={addNewProduct}>
                <FaPlus size={25} color="#000" /> Adicionar
              </button>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Subtotal</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {produtos.map((produto) => {
                  return (
                    <tr key={produto.nome}>
                      <td>
                        <span>{produto.nome}</span>
                      </td>

                      <td>
                        <span>{produto.qtd}</span>
                      </td>

                      <td>
                        <span>{formatPrice(Number(produto.preco))}</span>
                      </td>

                      <td>
                        <span>{formatPrice(Number(produto.subtotal))}</span>
                      </td>

                      <td>
                        <button
                          type="button"
                          style={{ border: 0, background: "#dceca4" }}
                          onClick={() => deleteProduct(produto.nome)}
                        >
                          <AiFillDelete size={26} color="#000" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="total-venda">
            <label>Total:</label>
            <span>{formatPrice(total)}</span>
          </div>

          <button className="confirm-button" type="submit">
            Finalizar Pedido
          </button>
        </form>
      </div>
    </>
  );
}

export default Vendas;
