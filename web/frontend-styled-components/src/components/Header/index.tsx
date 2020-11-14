import React, { FunctionComponent, ReactNode } from "react"
import { Link } from "react-router-dom"
import { FiArrowLeft } from 'react-icons/fi'

import logo from "../../assets/logo.png"

import './index.css'



export const Header: FunctionComponent<any> = ({children}) => {
    return (
        <header>
                <Link to="/" >
                    <FiArrowLeft />
                    Voltar
                </Link>
                {children}
        </header>
    )
}


