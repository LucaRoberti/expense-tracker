import ElementoSpesa from "./ElementoSpesa";

function ListaSpese({
  spese,
  categorie = [], //se non viene passato, usa array vuoto
  categoriaSelezionata,
  onChangeCategoria,
  onModifica,
  onElimina
}) {
  return (
    <>
    <div className="expense-list">
      <div className="expense-list-header">
        <h3>Uscite</h3>
        <div className="filter-row">
          <select
            value={categoriaSelezionata}
            onChange={e => onChangeCategoria(e.target.value)}
          >
            <option value="Tutte">Tutte</option>
            {categorie.map(c => (
              <option 
                value={c.nome}
              >
                {/* Testo visibile all'utente */}
                {c.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
        <div>
          {spese.length === 0 && <p>Nessuna spesa inserita</p>}

          {/* Per ogni spesa nell'array, creiamo un componente ElementoSpesa */}
          {spese.map(spesa => {

            // Troviamo la categoria corrispondente alla spesa
            const cat = categorie.find(c => c.nome === spesa.categoria);
            return (
              <ElementoSpesa
                spesa={spesa}
                coloreCategoria={cat.colore}
                onModifica={onModifica}
                onElimina={onElimina}
              />
            );
          })}
        </div>
      </div>
      </>
    );
  }
  export default ListaSpese;