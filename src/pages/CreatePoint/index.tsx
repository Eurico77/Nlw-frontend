import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import {Map,TileLayer,Marker} from 'react-leaflet';
import axios from  'axios';

import api from '../../services/api';
import "./styles.css";
import logo from "../../assets/logo.svg";

const CreatePoint = () => {


  interface Item {
    id: number;
    title: string;
    image_url: string;
  }

  interface IBGREresponse {
    sigla:string;
  }

  
  const [items,setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [selectedUf,setSelectedU]= useState('0');

  useEffect(() => {
    api.get('items').then(res =>{
      //console.log(res)

      setItems(res.data);

    });

  },[]);
  
  useEffect(() => {
    axios.get<IBGREresponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/distritos')
    .then(res =>{
      const ufInitials = res.data.map(uf => uf.sigla)
      console.log(res)

      setUfs(ufInitials);

    })
  },[]);

  
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input 
            type="text" 
            name="name" 
            id="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
              type="text" 
              name="email"
               id="email " />
            </div>
            <div className="field">
              <label htmlFor="name">Whatsapp</label>
              <input 
              type="text" 
              name="whatsapp" 
              id="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>

          

          </legend>
          <Map center={[-4.9782126, -39.0493634]} zoom={15}>
              <TileLayer 
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={[-4.9782126, -39.0493634]}/>
            </Map>
          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">UF</label>
              <select name="uf" id="uf">
              <option value="0">Selecione uma UF</option>
               
                {ufs.map(uf =>(
                   <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>

            </div>
            <div className="field">
              <label htmlFor="uf">CIdade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>

          </div>
        </fieldset>

        <fieldset>
          <legend>

            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            
            {items.map(item => ( 
            <li key={item.id}>
                <img src={item.image_url} alt={item.title}/>
                <span>{item.title}</span>
            </li>))}
           
            
          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
