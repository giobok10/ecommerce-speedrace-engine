import { useState } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { TelemetryCard } from './components/TelemetryCard';
import type { SearchResult } from './types/engine';

export function App() {
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Esperando acciones en el panel...');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ marginBottom: '8px' }}>E-Commerce SKU Audit & Speed-Race Engine</h1>
        <p style={{ color: '#666', marginTop: 0 }}>
          Simulador de rendimiento algorítmico en tiempo real sobre catálogo RAM (1,000,000 SKUs)
        </p>
      </header>

      <main>
        <ControlPanel
          onSearchResult={(result) => setSearchResult(result)}
          onStatusMessage={(msg) => setStatusMessage(msg)}
        />

        <div style={{
          padding: '10px 14px',
          backgroundColor: '#f5f5f5',
          borderRadius: '6px',
          marginBottom: '16px',
          fontSize: '0.9em',
          borderLeft: '4px solid #1890ff'
        }}>
          <strong>Estado del Servidor:</strong> {statusMessage}
        </div>

        <TelemetryCard result={searchResult} />
      </main>
    </div>
  );
}

export default App;