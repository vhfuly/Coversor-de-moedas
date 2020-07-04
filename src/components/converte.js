import React, {Component} from 'react'
import './converte.css'

async function getCoins(){
    let response= await fetch(`https://free.currconv.com/api/v7/countries?apiKey=bcf924aaf59d14e3a53c`)
    let data = await response.json()
    return data;
}
  

export default class Converte extends Component{
    constructor (props){
        super(props);

        this.state={
            currencyA_value:'',
            currencyB_value:'Valor convertido',
            currencyA:'BRL',
            currencyB:'USD',
            currencies:[{name:'BRL',currencySymbol:'R$'},{name:'USD',currencySymbol:'$'},{name:'CAD',currencySymbol:'$'},{name:'EUR',currencySymbol:'€'},{name:"JPY",currencySymbol:"¥"}],
            currencySymbolB:'$',
          
        }
        this.convert = this.convert.bind(this);
    }
    handleSelect =(e) =>{
        
        this.setState({
            [e.target.name]: e.target.value
            
        },
        this.convert,
        );

        
    }
 
    
    handleSwap = (e) =>{
        const currencyA= this.state.currencyA
        const currencyB= this.state.currencyB

        e.preventDefault();
        
        this.setState({
            currencyA: currencyB,
            currencyB : currencyA,

        },
        this.convert,
        );
       

    }
    convert(){
        let from_to = `${this.state.currencyA}_${this.state.currencyB}`
        let url = `https://free.currconv.com/api/v7/convert?q=${from_to}&compact=ultra&apiKey=bcf924aaf59d14e3a53c`
        fetch(url).then(res=>{
          return res.json()
        })
        .then(json=>{
          let price = json[from_to]
          let currencyB_value = (parseFloat(this.state.currencyA_value*price)).toFixed(2)
          this.setState({currencyB_value})
        })
       
        let  symbol =  this.state.currencies.find(currency => currency.name === this.state.currencyB)
        
        this.setState({
            currencySymbolB:symbol.currencySymbol

        })
    }

    


    render(){
        return (
            <div className="converte">
                <h1>Conversor de moedas</h1>
                <h2>{this.state.currencyA} para {this.state.currencyB}</h2>
                <h2><select name="currencyA" 
                Value ={this.state.currencyA}
                onChange ={this.handleSelect}
                onFocus ={this.handleSelect}>
                    {this.state.currencies.map((currency)=>
                    <option key={currency.name} value={currency.name}>  
                    {currency.name}
                    </option>
                    )}
                    
                </select> 
                <p>
                <h1 className="swap" onClick={this.handleSwap}>&#8595;&#8593;</h1>
                </p>
                <select name="currencyB" 
                Value ={this.state.currencyB}
                onChange ={this.handleSelect}
                onFocus ={this.handleSelect}>
                    {this.state.currencies.map((currency)=>
                    <option key={currency.name} value={currency.name}>  
                    {currency.name}
                    </option>
                    )}
                    
                </select> </h2>
                
                
                <input type="text" placeholder="Valor"onChange={(event)=>{this.setState({currencyA_value:event.target.value})}}/>
                <input type="button" value="Converter" onClick={this.convert}/>
                    <h2>{this.state.currencySymbolB}  {this.state.currencyB_value}</h2>
            </div>
        )

    }

   
}