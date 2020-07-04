import React from 'react';


import Converter from './components/converte'

function App() {
  return (
    <div className="App">
      <Converter currencyA ='USD' currencyB='BRL'></Converter>
    </div>
  );
}

export default App;
