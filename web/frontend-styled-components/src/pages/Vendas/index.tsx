import React, { FormEvent, useState } from 'react';
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
}

function Vendas() {
  const [produtos, setProdutos] = useState<produtos[]>([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [qtd, setQtd] = useState('0');
  const [preco, setPreco] = useState('0');
  const [token, setToken] = useState('');
  const history = useHistory()

  function addNewProduct() {
    if (!nomeProduto || !qtd || !preco) alert('Preencha os campos!');
    else {
      setProdutos([...produtos, { nome: nomeProduto, qtd, preco }]);
      setNomeProduto('');
      setQtd('');
      setPreco('');
    }
  }

  function deleteProduct(nomeProduct: string) {
    const newProducts = produtos.filter((p) => p.nome !== nomeProduct);

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
      .catch(() => {
        alert('Essa venda não pode ser efetuada !!!');
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
              <label>Produto</label>
              <input
                type="text"
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label>Quantidade</label>
              <input
                type="number"
                value={qtd}
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
                        <button
                          type="button"
                          style={{ border: 0 }}
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

          <button className="confirm-button" type="submit">
            Finalizar Pedido
          </button>
        </form>
      </div>
    </>
  );
}

export default Vendas;
