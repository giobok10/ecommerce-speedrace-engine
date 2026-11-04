import { useState } from 'react';
import type { AmortizationResult } from '../types/engine';
import { api } from '../services/api';

export const AmortizationCard = () => {
  const [kQueries, setKQueries] = useState<number>(50);
  const [result, setResult] = useState<AmortizationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCalculate = async () => {
    setLoading(true);
    try {
      const res = await api.getAmortization(kQueries);
      setResult(res);
    } catch {
      console.error('Error al calcular la amortización');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #52c41a', backgroundColor: '#f6ffed', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
      <h3>🧮 Calculadora de Amortización (Estrategia A vs B)</h3>
      <p style={{ fontSize: '0.9em', color: '#555' }}>
        Evalúa el punto de equilibrio donde ordenar previamente el catálogo (<i>O(N log₂ N)</i>) amortiza su costo frente a <i>K</i> consultas lineales.
      </p>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ marginRight: '8px' }}>Cantidad de Búsquedas (<i>K</i>):</label>
        <input
          type="number"
          value={kQueries}
          onChange={(e) => setKQueries(Number(e.target.value))}
          min={1}
          style={{ padding: '6px', borderRadius: '4px', width: '100px' }}
        />
        <button onClick={handleCalculate} disabled={loading} style={{ marginLeft: '8px' }}>
          {loading ? 'Calculando...' : 'Calcular Punto de Equilibrio'}
        </button>
      </div>

      {result && (
        <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #b7eb8f' }}>
          <h4>Resultados para {result.totalQueries.toLocaleString()} consultas sobre {result.totalSkus.toLocaleString()} SKUs:</h4>
          <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
            <li><strong>Estrategia A (Sin Ordenar — <i>K</i> × <i>N</i>):</strong> {result.linearTotalOperations.toLocaleString()} operaciones</li>
            <li><strong>Estrategia B (Ordenar + <i>K</i> × log₂ <i>N</i>):</strong> {result.amortizedTotalOperations.toLocaleString()} operaciones</li>
            <li>
              <strong>Estrategia Recomendada:</strong>{' '}
              <span style={{ color: result.isStrategyBBetter ? '#389e0d' : '#d4b106', fontWeight: 'bold' }}>
                {result.isStrategyBBetter ? 'Estrategia B (Ordenar + Búsqueda Binaria)' : 'Estrategia A (Búsqueda Lineal Directa)'}
              </span>
            </li>
            <li><strong>Ahorro Computacional:</strong> <mark>{result.operationsSavedRatio.toFixed(2)}% de operaciones ahorradas</mark></li>
          </ul>
        </div>
      )}
    </div>
  );
};