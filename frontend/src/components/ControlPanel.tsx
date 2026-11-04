import { useState } from 'react';
import type { SearchResult } from '../types/engine';
import { api } from '../services/api';

interface ControlPanelProps {
  onSearchResult: (result: SearchResult) => void;
  onStatusMessage: (message: string) => void;
}

export const ControlPanel = ({ onSearchResult, onStatusMessage }: ControlPanelProps) => {
  const [targetSku, setTargetSku] = useState<number>(999999);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInitialize = async () => {
    setLoading(true);
    try {
      const res = await api.initializeCatalog(1000000);
      onStatusMessage(res.message);
    } catch {
      onStatusMessage('Error al conectar con la API de .NET');
    } finally {
      setLoading(false);
    }
  };

  const handleLinearSearch = async () => {
    setLoading(true);
    try {
      const result = await api.searchLinear(targetSku);
      onSearchResult(result);
      onStatusMessage(`Búsqueda Lineal completada en ${result.elapsedMilliseconds.toFixed(4)} ms`);
    } catch {
      onStatusMessage('Error al ejecutar Búsqueda Lineal');
    } finally {
      setLoading(false);
    }
  };

  const handleBinarySearch = async () => {
    setLoading(true);
    try {
      const result = await api.searchBinary(targetSku);
      onSearchResult(result);
      onStatusMessage(`Búsqueda Binaria completada en ${result.elapsedMilliseconds.toFixed(4)} ms`);
    } catch {
      onStatusMessage('Error al ejecutar Búsqueda Binaria');
    } finally {
      setLoading(false);
    }
  };

  const handleShuffle = async () => {
    setLoading(true);
    try {
      const res = await api.shuffleCatalog();
      onStatusMessage(res.message);
    } catch {
      onStatusMessage('Error al ejecutar Sabotaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
      <h2>Panel de Control del Motor</h2>

      <div style={{ marginBottom: '12px' }}>
        <label style={{ marginRight: '8px' }}>SKU a Buscar (1 - 1,000,000):</label>
        <input
          type="number"
          value={targetSku}
          onChange={(e) => setTargetSku(Number(e.target.value))}
          disabled={loading}
          style={{ padding: '6px', borderRadius: '4px', width: '120px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button onClick={handleInitialize} disabled={loading}>
          Inicializar (1M RAM)
        </button>

        <button onClick={handleLinearSearch} disabled={loading}>
          Búsqueda Lineal O(N)
        </button>

        <button onClick={handleBinarySearch} disabled={loading}>
          Búsqueda Binaria O(log N)
        </button>

        <button onClick={handleShuffle} disabled={loading} style={{ backgroundColor: '#ff4d4f', color: 'white' }}>
          Sabotaje (Shuffle)
        </button>
      </div>

      {loading && <p style={{ color: '#1890ff' }}>⏳ Procesando en servidor .NET 8...</p>}
    </div>
  );
};