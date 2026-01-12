import { useState, useEffect } from "react";

function AggiungiSpesa({
  categorie,
  onSave,
  onClose,
  spesaInModifica
}) {

  // Questo oggetto contiene tutti i valori dei campi del form
  const [form, setForm] = useState({
    nota: "",
    importo: "",
    data: "",
    categoria: ""
  });

  useEffect(() => {
    if (spesaInModifica) {
      setForm({
        nota: spesaInModifica.nota,
        importo: spesaInModifica.importo.toString(),        
        data: spesaInModifica.data,
        categoria: spesaInModifica.categoria
      });
    } 
  }, [spesaInModifica]);

  // Validazione e salvataggio della spesa
  const handleSubmit = () => {
    if (!form.nota.trim() || !form.importo || !form.categoria) {
      return;
    }
    onSave({
      ...form,
      nota: form.nota.trim(),
      importo: Number(form.importo)
    });
  };
  
  return (
    <>
    <div className="modal-overlay">
      <div className="modal">
        <h2>{spesaInModifica ? "Modifica spesa" : "Aggiungi spesa"}</h2>
        <textarea
          placeholder="Nota" 
          value={form.nota}
          onChange={e => setForm({ ...form, nota: e.target.value })}
          rows="3"
        />
        <input
          type="number"
          placeholder="Importo"
          value={form.importo}
          onChange={e => setForm({ ...form, importo: e.target.value })}
        />
        <input
          type="date" 
          value={form.data}
          onChange={e => setForm({ ...form, data: e.target.value })}
        />
        <select
          value={form.categoria}
          onChange={e => setForm({ ...form, categoria: e.target.value })}
        >
          <option value="">Seleziona una categoria</option>
          {categorie.map(c => (
            <option key={c.nome} value={c.nome}>
              {c.nome}
            </option>
          ))}
        </select>
        <div className="modal-actions">
          <button onClick={onClose}>Annulla</button>
          <button onClick={handleSubmit}>Salva</button>
        </div>
      </div>
    </div>
    </>
  );
}
export default AggiungiSpesa;