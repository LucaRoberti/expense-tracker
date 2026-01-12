function ConfermaEliminazione({ messaggio, onConferma, onAnnulla }) {
  return (
    <div className="modal-overlay">
      <div className="modal small">
        <h3>Conferma eliminazione</h3>
        <p>{messaggio}</p>

        <div className="modal-actions">
          <button onClick={onAnnulla}>Annulla</button>
          <button onClick={onConferma} className="delete-btn">Elimina</button>
        </div>
      </div>
    </div>
  );
}

export default ConfermaEliminazione;