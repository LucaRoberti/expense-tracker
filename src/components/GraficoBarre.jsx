import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

// registrazione dei componenti
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function GraficoBarre({ spese, categorie }) {
  if (spese.length === 0) {
    return (
      <div className="chart-box">
        <h4>Grafico a barre</h4>
        <p>Nessuna spesa da visualizzare</p>
      </div>
    );
  }

  // raggruppamento delle spese per categoria 
  const raggruppate = spese.reduce((acc, s) => {
    acc[s.categoria] = (acc[s.categoria] || 0) + s.importo;
    return acc;   
  }, {});
  
  //estrazione nomi categorie
  const labels = Object.keys(raggruppate);
  
  //estrazione valori categorie
  const values = labels.map(l => raggruppate[l]);
  
  // Per ogni categoria, troviamo il suo colore
  const backgroundColors = labels.map(label => {
    const cat = categorie.find(c => c.nome === label);
    return cat.colore  
  });

  // Questo oggetto definisce come deve apparire il grafico
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        display: false 
      },
    }
  };

  return (
    <>
    <div className="chart-box">      
      {/* Componente di react-chartjs-2 che renderizza il grafico */}
      <Bar 
        data={data}         
        options={options} 
      />
    </div>
    </>
  );
}
export default GraficoBarre;