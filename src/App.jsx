// useState: serve per creare variabili che possono cambiare nel tempo (state)
// useEffect: serve per eseguire codice quando qualcosa cambia o al primo caricamento
import { useState, useEffect } from "react";

import "./App.css";

import ListaSpese from "./components/ListaSpese";
import AggiungiSpesa from "./components/AggiungiSpesa";
import AggiungiCategoria from "./components/AggiungiCategoria";
import GraficoBarre from "./components/GraficoBarre";
import GraficoTorta from "./components/GraficoTorta";
import CambiaTema from "./components/CambiaTema";
import ConfermaEliminazione from "./components/ConfermaEliminazione";
import GestoreCategorie from "./components/GestoreCategorie";
import DataOra from "./components/DataOra";
import Calcolatrice from "./calculator/Calcolatrice";


function App() {
  // Questo array contiene tutte le spese inserite dall'utente
  const [spese, setSpese] = useState(() => {
    const salvate = localStorage.getItem("spese");
    
    // Se esistono spese salvate, le convertiamo da stringa JSON ad array JavaScript
    // Altrimenti restituiamo un array vuoto []
    return salvate ? JSON.parse(salvate) : [];
  });

  // Array di tutte le categorie create dall'utente
  const [categorie, setCategorie] = useState(() => {
    const salvate = localStorage.getItem("categorie");
    return salvate ? JSON.parse(salvate) : [];
  });

  // Stringa che può essere "light" o "dark"
  const [tema, setTema] = useState(() => {
    // Recupera il tema salvato, se non esiste usa "light" come default
    const salvato = localStorage.getItem("tema");
    return salvato || "light";
  });


  // Boolean che controlla se il modal di aggiunta/modifica spesa è visibile
  const [mostraModalSpesa, setMostraModalSpesa] = useState(false);
  
  // Boolean che controlla se il modal di aggiunta categoria è visibile
  const [mostraModalCategoria, setMostraModalCategoria] = useState(false);
  
  // Contiene l'oggetto spesa che stiamo modificando
  const [spesaInModifica, setSpesaInModifica] = useState(null);
  
  // Stringa che indica quale categoria è selezionata nel filtro
  const [categoriaSelezionata, setCategoriaSelezionata] = useState("Tutte");
  
  // Oggetto che contiene le informazioni per la conferma di eliminazione
  const [confermaEliminazione, setConfermaEliminazione] = useState(null);
  
  // Boolean che controlla se la calcolatrice è visibile
  const [mostraCalcolatrice, setMostraCalcolatrice] = useState(false);

  // Questo effect viene eseguito ogni volta che la variabile "tema" cambia
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", tema);
    localStorage.setItem("tema", tema);
    
  }, [tema]);

  // Salvataggio delle spese
  useEffect(() => {
    localStorage.setItem("spese", JSON.stringify(spese));
  }, [spese]);

  // Salvataggio delle categorie
  useEffect(() => {
    localStorage.setItem("categorie", JSON.stringify(categorie));
  }, [categorie]); 

  // Alterna il tema tra "light" e "dark"
  const cambiaTema = () => {
    // setTema può ricevere una funzione che prende il valore precedente
    setTema(pre => pre === "light" ? "dark" : "light");
  };

  // Salva una spesa (nuova o modificata)
  const salvaSpesa = (spesa) => {
    if (spesaInModifica) {
      setSpese(spese.map(s => 
        s.id === spesaInModifica.id 
          ? { ...spesa, id: spesaInModifica.id } // Sostituisci
          : s // Mantieni invariato
      ));
      setSpesaInModifica(null);
    } else {
      // Creiamo un nuovo array con tutte le spese vecchie + la nuova
      setSpese([...spese, { ...spesa, id: Date.now() }]);
    }
    setMostraModalSpesa(false);
  };

  // Elimina una singola spesa dato il suo ID
  const eliminaSpesa = (id) => {
    // Nuovo array tenendo tutte le spese tranne quella con l'id specificato
    setSpese(spese.filter(s => s.id !== id));
    setConfermaEliminazione(null);
  };

  // Elimina tutte le spese impostando l'array a vuoto
  const eliminaTutto = () => {
    setSpese([]);
    setCategorie([]);
    setConfermaEliminazione(null);
  };

  // Elimina una categoria dato il suo nome
  const eliminaCategoria = (nomeCategoria) => {
    setCategorie(categorie.filter(c => c.nome !== nomeCategoria));
    if (categoriaSelezionata === nomeCategoria) {
      setCategoriaSelezionata("Tutte");
    }
  };

  // speseFiltrate: array di spese filtrato in base alla categoria selezionata
  const speseFiltrate =
    categoriaSelezionata === "Tutte"
      ? spese // Mostra tutto
      : spese.filter(s => s.categoria === categoriaSelezionata);

const totale = spese.reduce((somma, s) => somma + s.importo, 0)

  return (
    <>
    <div className="app-container">
      <header className="top-bar">
        <div className="top-bar-left">
          <div className="summary-with-time">
            <DataOra />           
            <h2>
              Totale uscite: €
              {totale.toFixed(2)}
            </h2>
          </div>
        </div>
        <div className="header-actions">
          <button 
            className="calculator-btn" 
            onClick={() => setMostraCalcolatrice(!mostraCalcolatrice)} //inverte il valore
          >
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="none">
            <rect x="3" y="2" width="26" height="28" rx="4" fill="#2f3542"/>
            <rect x="6" y="5" width="20" height="6" rx="2" fill="#111827"/>
            <g fill="#ced6e0">
              <rect x="6" y="14" width="5" height="4" rx="1"/>
              <rect x="13.5" y="14" width="5" height="4" rx="1"/>
              <rect x="21" y="14" width="5" height="4" rx="1"/>
              <rect x="6" y="20" width="5" height="4" rx="1"/>
              <rect x="13.5" y="20" width="5" height="4" rx="1"/>
              <rect x="21" y="20" width="5" height="4" rx="1"/>
            </g>
            <rect x="21" y="25" width="5" height="3" rx="1" fill="#10b981"/>
          </svg>
          </button>
          <button 
            className="add-expense-header-btn" 
            onClick={() => setMostraModalSpesa(true)}
          >
            + Aggiungi spesa
          </button>
          <button 
            className="delete-all-btn" 
            onClick={() => setConfermaEliminazione({ tipo: 'tutto' })}
            title="Elimina tutte le spese"
          >
            🗑️ Elimina tutto
          </button>
          
          <CambiaTema tema={tema} onToggle={cambiaTema} />
        </div>
      </header>
      <main className="content">
        <div className="left-column">
          <ListaSpese
            spese={speseFiltrate} // Array di spese da mostrare
            categorie={categorie} // Array di categorie per la select
            categoriaSelezionata={categoriaSelezionata} // Categoria attualmente filtrata
            onChangeCategoria={setCategoriaSelezionata} // Funzione per cambiare filtro
            onModifica={(s) => { // Callback quando si clicca su modifica
              setSpesaInModifica(s); // Impostiamo quale spesa stiamo modificando
              setMostraModalSpesa(true); // Apriamo il modal di modifica
            }}
            onElimina={(id) => // Callback quando si clicca su elimina
              setConfermaEliminazione({ tipo: 'singola', id }) // Apriamo conferma con id
            }
          />
          <GestoreCategorie
            categorie={categorie} // Array di categorie da mostrare
            onAggiungiCategoria={() => setMostraModalCategoria(true)} 
            onEliminaCategoria={eliminaCategoria} // Funzione per eliminare
          />
        </div>
        <div className="right-column">
          <GraficoBarre
            spese={speseFiltrate} // Spese da visualizzare
            categorie={categorie} // Categorie per ottenere i colori
          />
          <GraficoTorta
            spese={speseFiltrate}
            categorie={categorie}
          />
        </div>
      </main>
      {mostraModalSpesa && (
        <AggiungiSpesa
          categorie={categorie} // Categorie per la select
          onSave={salvaSpesa} 
          onClose={() => {
            setMostraModalSpesa(false);
            setSpesaInModifica(null); 
          }}
          spesaInModifica={spesaInModifica} // Spesa da modificare (o null)
        />
      )}

      {mostraModalCategoria && (
        <AggiungiCategoria
          onSave={(cat) =>
            setCategorie([...categorie, cat]) // Aggiungiamo all'array esistente
          }
          onClose={() => setMostraModalCategoria(false)}
        />
      )}

      {mostraCalcolatrice && (
        <Calcolatrice onClose={() => setMostraCalcolatrice(false)} />
      )}
      {confermaEliminazione && (
        <ConfermaEliminazione
          messaggio={
            confermaEliminazione.tipo === 'tutto'
              ? "Sei sicuro di voler eliminare tutte le spese? Questa azione non può essere annullata."
              : "Sei sicuro di voler eliminare questa spesa?"
          }
          onConferma={() => {
            if (confermaEliminazione.tipo === 'tutto') {
              eliminaTutto();
            } else {
              eliminaSpesa(confermaEliminazione.id);
            }
          }}
          onAnnulla={() => setConfermaEliminazione(null)}
        />
      )}
    </div>
    </>
  );
}
export default App;