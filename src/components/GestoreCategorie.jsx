import { useState } from "react";

import ConfermaEliminazione from "./ConfermaEliminazione";

function GestoreCategorie({ categorie, onAggiungiCategoria, onEliminaCategoria }) {

  // Contiene il nome della categoria che l'utente sta per eliminare
  const [categoriaInEliminazione, setCategoriaInEliminazione] = useState(null);


  return (
    <>
      <div className="category-manager">
        <div className="category-header">
          <h3>Categorie</h3>
          <button className="add-category-btn" onClick={onAggiungiCategoria}>
            + Aggiungi
          </button>
        </div>
        <div className="category-list">
          {categorie.length === 0 ? (
            <p className="empty-message">Nessuna categoria creata</p>
          ) : (
            // Map per creare un elemento per ogni categoria
            categorie.map((cat) => (
              <div className="category-item">
                <div className="category-info">
                  <div
                    className="category-color-box"
                    style={{ backgroundColor: cat.colore }}
                  />
                  <span className="category-name">{cat.nome}</span>
                </div>
                <button
                  className="delete-category-btn"
                  onClick={() => setCategoriaInEliminazione(cat.nome)}
                  title="Elimina categoria"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {categoriaInEliminazione && (
        <ConfermaEliminazione
          messaggio={`Sei sicuro di voler eliminare la categoria "${categoriaInEliminazione}"?`}
          onConferma={() => {
            onEliminaCategoria(categoriaInEliminazione);
            
            // Chiudiamo il modal
            setCategoriaInEliminazione(null);
          }}
          onAnnulla={() => setCategoriaInEliminazione(null)}
        />
      )}
    </>
  );
}

export default GestoreCategorie;