import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

// Registriamo i componenti necessari
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function GraficoTorta({ spese, categorie }) {
  // CONTROLLO ARRAY VUOTO
  // Stesso concetto del grafico a barre
  if (spese.length === 0) {
    return (
      <div className="chart-box card">
        <h4>Grafico a torta</h4>
        <p>Nessuna spesa da visualizzare</p>
      </div>
    );
  }

  // raggruppamento delle spese per categoria
  const raggruppate = spese.reduce((acc, s) => {
    acc[s.categoria] = (acc[s.categoria] || 0) + s.importo;
    return acc;
  }, {});

  //nomi categorie
  const labels = Object.keys(raggruppate);

  //valori categorie
  const values = labels.map(l => raggruppate[l]);
  
  // Per ogni categoria, troviamo il suo colore
  const backgroundColor = labels.map(label => {
    const cat = categorie.find(c => c.nome === label);
    return cat.colore  
  });

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor,
        borderWidth: 0
      }
    ]
  };

  const options = {

    responsive: true,
    maintainAspectRatio: true,
    cutout: "55%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 16
        }
      },
      
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return ` € ${value}`;
          }
        }
      }
    }
  };

  return (
    <>
    <div className="chart-box card">
      <div style={{ 
        display: 'flex',           
        justifyContent: 'center', 
        alignItems: 'center',      
        flex: 1                    
      }}>
        <div style={{ 
          width: '100%',      
          maxWidth: '220px'   
        }}>
          {/* Renderizza il grafico a ciambella */}
          <Doughnut 
            data={data}
            options={options}   
          />
        </div>
      </div>
    </div>
    </>
  );
}
export default GraficoTorta;