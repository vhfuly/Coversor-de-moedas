

import React, {useState, useEffect} from 'react'
import './converte.css'


const Converte = (props) =>{
    const  [currencyA_value, setCurrencyA_value]= useState('');
    const  [currencyB_value, setCurrencyB_value]= useState('0');
    const  [currencyA, setCurrencyA]= useState('BRL');
    const  [currencyB, setCurrencyB]= useState('USD');
    const  [currencies, setCurrencies]= useState([
        {name:'BRL',currencySymbol:'R$'},
        {name:'USD',currencySymbol:'$'},
        {name:'CAD',currencySymbol:'$'},
        {name:'EUR',currencySymbol:'€'},
        {name:"JPY",currencySymbol:"¥"}
    ]);
    const  [currencySymbolB, setCurrencySymbolB]= useState('$');
  
    const handleSelect =(e) =>{
        if (e.target.name==='currencyA'){
            setCurrencyA(e.target.value)
        }else{
            setCurrencyB(e.target.value)
        }
        convert()
    }
 
    
    const handleSwap = (e) =>{
        const currency_A= currencyA
        const currency_B= currencyB

        e.preventDefault();
        
        setCurrencyA(currency_B)
        setCurrencyB(currency_A)
        convert()
        
       

    }
    const convert=() =>{
        let from_to = `${currencyA}_${currencyB}`
        let url = `https://free.currconv.com/api/v7/convert?q=${from_to}&compact=ultra&apiKey=bcf924aaf59d14e3a53c`
        fetch(url).then(res=>{
          return res.json()
        })
        .then(json=>{
          let price = json[from_to]
          let currencyB_value = (parseFloat(currencyA_value*price)).toFixed(2)
          setCurrencyB_value(currencyB_value)
        })
       
        let  symbol =  currencies.find(currency => currency.name === currencyB)
        setCurrencySymbolB(symbol.currencySymbol)
      
    }

    


    
        return (
            <div className="converte">
                <h1>Conversor de moedas</h1>
                <h2>{currencyA} para {currencyB}</h2>
                <h2><select name="currencyA" 
                value ={currencyA}
                onChange ={handleSelect}
                onFocus ={handleSelect}>
                    {currencies.map((currency)=>
                    <option key={currency.name} value={currency.name}>  
                    {currency.name}
                    </option>
                    )}
                    
                </select> </h2>
                
                <h1 className="swap" onClick={handleSwap}>&#8595;&#8593;</h1>
                
                <h2> <select name="currencyB" 
                value ={currencyB}
                onChange ={handleSelect}
                onFocus ={handleSelect}>
                    {currencies.map((currency)=>
                    <option key={currency.name} value={currency.name}>  
                    {currency.name}
                    </option>
                    )}
                    
                </select> </h2>
                
                
                <input type="text" placeholder="Valor"onChange={(event)=>setCurrencyA_value(event.target.value)}/>
                <input type="button" value="Converter" onClick={convert}/>
                    <h2>{currencySymbolB}  {currencyB_value}</h2>
            </div>
        )

    

   
}
export default Converte;