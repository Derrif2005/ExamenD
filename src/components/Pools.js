import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Pools = () => {
  const [chartData, setChartData] = useState(null);
  const [poolList, setPoolList] = useState([]);

  useEffect(() => {
    // Endpoint 3: pools
    fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://api.blockchain.info/pools?timespan=5days'))
      .then(res => res.json())
      .then(data => {
        // Convertir objeto JSON { "PoolA": 10, "PoolB": 5 } a arrays para ChartJS
        const labels = Object.keys(data);
        const values = Object.values(data);
        
        // Crear lista ordenada para la tabla de abajo
        const list = labels.map((label, index) => ({ name: label, count: values[index] }));
        list.sort((a, b) => b.count - a.count); // Ordenar de mayor a menor
        setPoolList(list);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: '# de Bloques',
              data: values,
              backgroundColor: [
                '#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e',
                '#1abc9c', '#e67e22', '#7f8c8d', '#c0392b', '#27ae60', '#d35400'
              ],
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(err => console.error(err));
  }, []);

  if (!chartData) return <div className="text-center mt-5">Cargando Gráficos...</div>;

  return (
    <div className="container">
      <h3 className="text-secondary mb-3">Información de Extracción</h3>
      <p className="text-muted">Distribución de la tasa de hash entre los pools de minería.</p>
      
      <div className="row">
        {/* Gráfico de Pastel */}
        <div className="col-md-7">
          <div className="card p-3 shadow-sm" style={{ maxHeight: '500px', display: 'flex', justifyContent: 'center' }}>
            <Pie data={chartData} options={{ maintainAspectRatio: false }} height={400} />
          </div>
        </div>

        {/* Lista de Pools */}
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-header bg-white font-weight-bold">
              Bloques Conocidos
            </div>
            <ul className="list-group list-group-flush" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <li className="list-group-item d-flex justify-content-between align-items-center font-weight-bold">
                <span>Resuelto por</span>
                <span>Conteo</span>
              </li>
              {poolList.map((pool, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  <span className="text-primary">{pool.name}</span>
                  <span className="badge bg-light text-dark rounded-pill border">{pool.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pools;