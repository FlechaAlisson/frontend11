import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'
import logo from '../../assets/logo.svg'
import './styles.css'

export default function NewIncident(){
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const history = useHistory()

    async function handleNewIncident(e) {
        e.preventDefault()

        
        const data={
            title,
            description,
            value,
        };

        try {
           await api.post('incidents', data, {
               headers:{
                   Authorization: localStorage.getItem('ongID'),
               }
           })

           history.push('/profile')
        } catch (error) {
            alert('Erro!')
        }
    }

    return(
        <div className="newIncident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para que possamos encontrar um herói para te ajudar.</p>
                    <Link className = "back-link" to="/profile"> 
                        <FiArrowLeft size = {16} color="#E02041"  />
                        Voltar para home
                    </Link>

                </section>
                <form onSubmit = {handleNewIncident}>
                    <input  
                        placeholder = "Título do caso"
                        value={title}
                        onChange={e =>setTitle(e.target.value)}
                        />

                    <textarea   
                        placeholder = "Descrição"
                        value={description}
                        onChange={e =>setDescription(e.target.value)}
                        />
                    <input      
                        placeholder = "Valor"
                        value={value}
                        onChange={e =>setValue(e.target.value)}
                        />
                    
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}