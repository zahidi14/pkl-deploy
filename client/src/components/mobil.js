import React from "react";
import {  Col } from "reactstrap";
import avanza from '../aset/avanza.png';
import xenia from '../aset/xenia.png';
import innova from '../aset/innova.png';
import innovaR from '../aset/innova-reborn.png';
import elfShort from '../aset/elf-short.jpg';
import elfLong from '../aset/elf-long.jpg';
import hiAce from '../aset/ho-ace.jpg';



export default props => {
  
  
 const getImage = _ => {
    if(props.name === 'Avanza') {
        return avanza;
    }else if(props.name === 'Xenia') {
        return xenia;
    }else if(props.name === 'Grand New Innova'){
        return innova;
    }else if(props.name === 'Grand New Innova Reborn') {
        return innovaR;
    }
    else if(props.name === 'Elf Short') {
        return elfShort;
    }
    else if(props.name === 'Elf Long') {
        return elfLong;
    }
    else if(props.name === 'Hi Ace'){
        return hiAce;
    }
   
}
  return (
    <div className="mobil-container">
      <Col
        className={props.empty ? "mobil selecmobil-mobil" : "mobil"}
        onClick={_ => {
          props.empty
            ? props.selectMobil(props.name, props.id)
            : console.log("Tried to select a full mobil");
            
        }}
      >
        <div className="img-cont">
        <img className="image" src={getImage(props.name)} alt="car"/>
        </div>
        <h2 className="text-center mobil-name">{props.name}</h2>
        
        <p className="text-center">Kapasitas penumpang: {props.chairs}</p>
        <p className="text-center">Harga : Rp. {props.harga}</p>
        <p className="text-center">Tipe : {props.tipe}</p>
        <p className="text-center">{props.empty ? "Tersedia" : "Tidak Tersedia"}</p>
       
      </Col>
    </div>
  );
};
