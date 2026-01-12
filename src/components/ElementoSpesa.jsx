function ElementoSpesa({
  spesa,
  onModifica,
  onElimina,
  coloreCategoria
}) {
  return (
    <>
    <div className="expense-item">
      <div className="expense-left">
        <div
          className="category-dot"
          style={{ backgroundColor: coloreCategoria}}
        />
        <div>
          <strong>{spesa.nota}</strong>
          <div className="expense-meta">
            {spesa.categoria} — {spesa.data}
          </div>
        </div>
      </div>
      <div className="expense-right">
        <div className="expense-amount">
          € {spesa.importo.toFixed(2)}
        </div>
        <div className="actions">
          <button onClick={() => onModifica(spesa)}>✏️</button>
          <button onClick={() => onElimina(spesa.id)}>🗑️</button>
            
        </div>
      </div>
    </div>
    </>
  );
}

export default ElementoSpesa;