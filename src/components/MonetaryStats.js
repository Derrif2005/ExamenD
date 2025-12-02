import React, { useEffect, useState } from 'react';

const MonetaryStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Usamos un proxy para evitar el error de CORS
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const targetUrl = 'https://api.blockchain.info/stats';

    fetch(proxyUrl + encodeURIComponent(targetUrl))
      .then(res => {
        if (!res.ok) throw new Error('Error en la respuesta de la API');
        return res.json();
      })
      .then(result => {
        setData(result);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching monetary stats:", err);
        setError("No se pudieron cargar los datos (Verifica la conexión o el proxy).");
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

  // Conversiones y variables calculadas
  const BTC_SATOSHIS = 100000000;
  const bitcoinsMinados = data.n_blocks_mined * 6.25; // 6.25 BTC por bloque
  const totalFeesBTC = data.total_fees_btc / BTC_SATOSHIS;
  const totalBTCSent = data.estimated_btc_sent / BTC_SATOSHIS;
  const hashRateGHS = data.hash_rate / 1000000000; // Convertir H/s a GH/s

  // Función para formatear valores en la tabla
  const formatValue = (value, unit = '') => 
    (typeof value === 'number' ? value.toLocaleString() : value) + unit;

  return (
    <div className="card shadow p-4 border-0">
      <h3 className="text-center mb-4 text-primary">Estadísticas Monetarias</h3>
      <p className="text-center text-muted">Resumen de estadísticas de Bitcoin para el periodo de 24 horas anterior.</p>

      <div className="row mt-4">
        {/* === COLUMNA IZQUIERDA: Bloques y Transacciones === */}
        <div className="col-md-6">
          <h5 className="text-uppercase text-secondary border-bottom pb-2">Block Summary</h5>
          <table className="table table-sm table-striped">
            <tbody>
              <tr><td>Bloques Minados</td><td className="text-end">{data.n_blocks_mined}</td></tr>
              <tr><td>Tiempo entre Bloques</td><td className="text-end">{data.minutes_between_blocks} minutos</td></tr>
              <tr><td>Bitcoins Minados</td><td className="text-end fw-bold">{bitcoinsMinados.toFixed(2)} BTC</td></tr>
            </tbody>
          </table>

          <h5 className="text-uppercase text-secondary border-bottom pb-2 mt-4">Transaction Summary</h5>
          <table className="table table-sm table-striped">
            <tbody>
              <tr><td>Comisiones Totales de Transacción (BTC)</td><td className="text-end">{totalFeesBTC.toFixed(4)} BTC</td></tr>
              <tr><td>Número de Transacciones</td><td className="text-end">{formatValue(data.n_tx)}</td></tr>
              <tr><td>Volumen de Salida Total (BTC)</td><td className="text-end">{totalBTCSent.toFixed(2)} BTC</td></tr>
            </tbody>
          </table>
        </div>

        {/* === COLUMNA DERECHA: Mercado y Minería === */}
        <div className="col-md-6">
          <h5 className="text-uppercase text-secondary border-bottom pb-2">Resumen del Mercado</h5>
          <table className="table table-sm table-striped">
            <tbody>
              <tr><td>Precio de Mercado</td><td className="text-end fw-bold text-success">${formatValue(data.market_price_usd)}</td></tr>
              <tr><td>Volumen de Intercambio (USD)</td><td className="text-end">${formatValue(data.trade_volume_usd)}</td></tr>
            </tbody>
          </table>

          <h5 className="text-uppercase text-secondary border-bottom pb-2 mt-4">Costo de la Minería</h5>
          <table className="table table-sm table-striped">
            <tbody>
              <tr><td>Beneficios Totales de los Mineros (USD)</td><td className="text-end">${formatValue(data.miners_revenue_usd)}</td></tr>
              <tr><td>Dificultad</td><td className="text-end">{formatValue(data.difficulty)}</td></tr>
            </tbody>
          </table>

          <h5 className="text-uppercase text-secondary border-bottom pb-2 mt-4">Tasa de Hash y Consumo Energético</h5>
          <table className="table table-sm table-striped">
            <tbody>
              <tr><td>Tasa de Hash</td><td className="text-end fw-bold text-info">{hashRateGHS.toLocaleString('en-US', { maximumFractionDigits: 2 })} GH/s</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MonetaryStats;