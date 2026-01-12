import { useState } from "react";

function AggiungiCategoria({ onSave, onClose }) {
  const [nome, setNome] = useState("");
  const [colore, setColore] = useState("#6366f1");

  // Valida i dati e salva la categoria
  const handleSave = () => {
    if (!nome.trim()) {
      return;
    }
    onSave({ 
      nome: nome.trim(),
      colore
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal small">
        <h3>Nuova categoria</h3>
        <input
          placeholder="Nome categoria"
          value={nome}

          // e.target: elemento input che ha generato l'evento
          // e.target.value: nuovo valore dell'input
          onChange={e => setNome(e.target.value)}
        />
        <label className="color-label">
          Colore
          <input
            type="color"
            value={colore}
            onChange={e => setColore(e.target.value)}
          />
        </label>
        <div className="modal-actions">
          <button onClick={onClose}>Annulla</button>
          <button onClick={handleSave}>Salva</button>
        </div>
      </div>
    </div>
  );
}
export default AggiungiCategoria;