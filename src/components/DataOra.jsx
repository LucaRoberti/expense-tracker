import { useState, useEffect } from "react";

function DataOra() {

  // new Date() crea un oggetto con data e ora correnti
  const [dataOra, setDataOra] = useState(new Date());

  // Timer per aggiornare ogni secondo
  useEffect(() => {
    setInterval(() => {

      // Ogni secondo, aggiorniamo dataOra con la data/ora corrente
      setDataOra(new Date());
    }, 1000);

    
  }, []); // esegui solo una volta all'inizio


  const formattaData = (data) => {
    // opzioni: oggetto che definisce come formattare la data
    const opzioni = { 
      weekday: 'long',    // Giorno della settimana per esteso
      year: 'numeric',    // Anno a 4 cifre (2025)
      month: 'long',      // Mese per esteso 
      day: 'numeric'      // Giorno del mese come numero
    };
    
    // toLocaleDateString: metodo di Date che formatta la data secondo una lingua
    return data.toLocaleDateString('it-IT', opzioni);
  };

  // Converte un oggetto Date in una stringa con l'ora
  const formattaOra = (data) => {
    // toLocaleTimeString: formatta l'ora secondo una lingua
    return data.toLocaleTimeString('it-IT', {
      hour: '2-digit',     // Ore con 2 cifre
      minute: '2-digit',  
      second: '2-digit'
    });
  };

  return (
    <>
    <div className="datetime-display">
      <div className="date">{formattaData(dataOra)}</div>
      <div className="time">{formattaOra(dataOra)}</div>
    </div>
    </>
  );
}

export default DataOra;