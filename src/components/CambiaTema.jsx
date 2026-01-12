function CambiaTema({ tema, onToggle }) {
  return (
    <button 
      className="theme-switch" 
      onClick={onToggle} 
      aria-label="Cambia tema" 
    >
      {tema === 'light' ? "🌙" : "☀️"}
          
    </button>
  );
}

export default CambiaTema;