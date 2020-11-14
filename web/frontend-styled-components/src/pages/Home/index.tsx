import React from 'react'
import { FcMoneyTransfer } from "react-icons/fc";
import { HiFolderAdd } from "react-icons/hi";
import { RiFileSearchFill } from "react-icons/ri";
import { BsBarChartFill } from "react-icons/bs";
import { Link } from "react-router-dom"

import Logo from "../../assets/logo.png"

import './index.css'


function Home() {

    return (
        <>
        <header className="logo-main">
            <img src={Logo} alt="logo"/>
        </header>

        <div className="field-group">
            <div className="field">
                <Link to="/vendas">
                    <FcMoneyTransfer size={250} color="#a0ba49"/>
                    <span>Efetuar Vendas</span>
                </Link>
            </div>

            <div className="field">
            <Link to="/cadastro-produto">
                <HiFolderAdd size={250} color="#a0ba49"/>
                <span>Cadastrar Produto</span>
            </Link>   
            </div>

            <div className="field">
            <Link to="/relatorio-vendas">
                <BsBarChartFill size={250} color="#a0ba49"/>
                <span>Relatórios de Vendas</span>
            </Link>   
            </div>

            <div className="field">
                <Link to="/estoque">
                    <RiFileSearchFill size={250} color="#a0ba49"/>
                    <span>Verificar Estoque</span>
                </Link>
                
            </div>

        </div>
        
        </>
    )
  }
  
  export default Home;
  