import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Usamos un proxy (allorigins) para evitar el error de CORS en localhost
    // La URL real es: https://api.blockchain.info/stats
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = 'https://api.blockchain.info/stats';

    fetch(proxyUrl + encodeURIComponent(targetUrl))
      .then(res => {
        if (!res.ok) throw new Error('Error en la respuesta de la API');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching stats:", err);
        setError("No se pudieron cargar los datos (Posible bloqueo CORS o API caída).");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="d-flex justify-content-center mt-5">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
    </div>
  );

  if (error) return <div className="alert alert-danger text-center mt-5">{error}</div>;

  // Si stats sigue siendo null por alguna razón, evitamos que la app explote
  if (!stats) return null; 

  return (
    <div>
      <h2 className="text-center mb-4 text-secondary">Estadísticas Populares</h2>
      
      <div className="row text-center">
        {/* Precio de Mercado */}
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-primary">Precio de Mercado (USD)</h6>
              <h3 className="fw-bold my-3">${stats.market_price_usd ? stats.market_price_usd.toLocaleString() : 0}</h3>
              <small className="text-muted">USD</small>
            </div>
          </div>
        </div>

        {/* Minutos entre Bloques */}
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-primary">Minutos entre Bloques</h6>
              <h3 className="fw-bold my-3 text-info">{stats.minutes_between_blocks}</h3>
              <small className="text-muted">Minutos</small>
            </div>
          </div>
        </div>

        {/* Transacciones */}
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-primary">Transacciones (24h)</h6>
              <h3 className="fw-bold my-3 text-info">{stats.n_tx ? stats.n_tx.toLocaleString() : 0}</h3>
              <small className="text-muted">Transacciones</small>
            </div>
          </div>
        </div>

        {/* Bloques Totales */}
        <div className="col-md-3 mb-4">
          <div className="card h-100 shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-primary">Total Bloques Minados</h6>
              <h3 className="fw-bold my-3 text-info">{stats.n_blocks_total ? stats.n_blocks_total.toLocaleString() : 0}</h3>
              <small className="text-muted">Bloques</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;