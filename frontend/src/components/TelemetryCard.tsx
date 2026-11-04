import type { SearchResult } from '../types/engine';

interface TelemetryCardProps {
  result: SearchResult | null;
}

export const TelemetryCard = ({ result }: TelemetryCardProps) => {
  if (!result) {
    return (
      <div style={{ border: '1px dashed #aaa', padding: '16px', borderRadius: '8px', textAlign: 'center', color: '#666' }}>
        <p>Ejecuta una búsqueda desde el panel de control para ver la telemetría en tiempo real.</p>
      </div>
    );
  }

  const isBinary = result.algorithmUsed === 'BinarySearch';
  const isFalseNegative = isBinary && !result.found;

  return (
    <div style={{
      border: isFalseNegative ? '2px solid #ff4d4f' : '1px solid #1890ff',
      backgroundColor: isFalseNegative ? '#fff2f0' : '#e6f7ff',
      padding: '16px',
      borderRadius: '8px',
      marginTop: '16px'
    }}>
      <h3>Telemetría de CPU: {result.algorithmUsed}</h3>

      {isFalseNegative && (
        <div style={{ backgroundColor: '#ff4d4f', color: 'white', padding: '8px', borderRadius: '4px', marginBottom: '12px' }}>
          <strong>¡FALSO NEGATIVO DETECTADO!</strong>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.9em' }}>
            El catálogo fue desordenado (Modo Sabotaje). La Búsqueda Binaria descartó mitades incorrectas y devolvió <code>Index: -1</code> a pesar de que el producto existe en RAM.
          </p>
        </div>
      )}

      <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
        <li><strong>SKU Solicitado:</strong> {result.targetSku.toLocaleString()}</li>
        <li><strong>Estado de Hallazgo:</strong> {result.found ? 'Encontrado' : 'No Encontrado'}</li>
        <li><strong>Índice en Array RAM:</strong> {result.index !== -1 ? `Posición [${result.index.toLocaleString()}]` : 'Sin coincidencia (-1)'}</li>
        <li><strong>Tiempo Transcurrido:</strong> <mark>{result.elapsedMilliseconds.toFixed(4)} ms</mark> ({result.elapsedTicks.toLocaleString()} Ticks de CPU)</li>
        <li><strong>Comparaciones en Memoria:</strong> <code>{result.comparisonsCount.toLocaleString()}</code> iteraciones</li>
      </ul>
    </div>
  );
};