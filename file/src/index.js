import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

const rootStockGroup = document.getElementById('#basename')
document.body.setAttribute('class', "bg-gray-300 select-none")
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    rootStockGroup
)