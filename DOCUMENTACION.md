# 📚 Documentación Técnica Integral: E-Commerce SKU Audit & Speed-Race Engine

## 1. Arquitectura y Diseño de Software

El sistema está diseñado bajo los principios de **Módulos Profundos** (*A Philosophy of Software Design*, de John Ousterhout), desacoplando estrictamente el núcleo de procesamiento algorítmico, la capa de servicios de negocio (API REST) y la interfaz de usuario interactiva (SPA).

### Diagrama de Arquitectura

```text
┌──────────────────────────────┐          HTTP REST JSON          ┌──────────────────────────────┐
│  Frontend (React 19 + Vite)  │ ◄──────────────────────────────► │  Backend (.NET 8 Web API)    │
│                              │                                  │                              │
│  - ControlPanel              │                                  │  - SearchEngineController    │
│  - TelemetryCard             │                                  │  - SearchEngineService (RAM) │
│  - AmortizationCard          │                                  │    • Linear / Binary Search  │
│                              │                                  │    • Fisher-Yates Shuffle    │
└──────────────────────────────┘                                  └──────────────────────────────┘
```

---

## 2. Especificación de Componentes y Capas

### A. Capa de Datos y Modelos en Memoria (Backend)

- **Arreglo Contiguo (`int[]`):** Almacena N = 1,000,000 identificadores numéricos en bloques de memoria contiguos, garantizando accesos directos de orden O(1) bajo el Modelo de Cómputo RAM.

- **DTOs Inmutables (`records` en C# 12):**

  - `SearchResult`: Empaqueta telemetría detallada que incluye el SKU buscado, estado booleano de hallazgo, índice devuelto, marcas de tiempo de CPU (`Stopwatch` en ticks y milisegundos) y conteo exacto de comparaciones.

  - `AmortizationResult`: Modela los cálculos analíticos comparativos entre el costo lineal acumulado y el costo amortizado de preordenamiento.

### B. Algoritmos Core Implementados

1. **Búsqueda Lineal O(n):** Recorrido secuencial exhaustivo de complejidad temporal lineal en el peor caso (N iteraciones).

2. **Búsqueda Binaria O(log n):** Algoritmo *Divide y Vencerás* que requiere una precondición estricta de monotonía (orden ascendente), reduciendo el espacio de búsqueda a la mitad en cada iteración (máximo 20 comparaciones para 1,000,000 de elementos).

3. **Fisher-Yates Shuffle O(n):** Algoritmo de permutación aleatoria insesgada que desordena el arreglo iterando desde el último índice hasta el primero e intercambiando valores con posiciones aleatorias en el rango [0, i].

---

## 3. Demostración Matemática de Amortización (Break-Even Point)

Para un catálogo de tamaño N, sea k el número proyectado de consultas de búsqueda a realizar:

- **Estrategia A (Sin Ordenar):** Mantiene el catálogo desordenado y ejecuta búsquedas lineales sucesivas.

  **Costo Total A = k × n**

- **Estrategia B (Ordenar Previamente + Búsqueda Binaria):** Paga un costo inicial de ordenamiento O(n log₂ n) una sola vez y responde con búsquedas binarias O(log₂ n).

  **Costo Total B = n × log₂(n) + k × log₂(n)**

### Cálculo del punto de equilibrio

Igualando ambas estrategias para hallar el punto de equilibrio crítico (k):

**k × n ≈ n × log₂(n) + k × log₂(n)**

Despejando k:

**k ≈ (n × log₂(n)) / (n - log₂(n))**

Sustituyendo N = 1,000,000 y log₂(1,000,000) ≈ 20:

**k = (1,000,000 × 20) / (1,000,000 - 20)**

**k ≈ 20.0004**

Por lo tanto:

**k = 21 consultas**

*Conclusión Técnica:* A partir de 21 consultas, la inversión computacional de ordenar el catálogo queda amortizada, volviendo la Estrategia B marcadamente superior.

---

## 4. Guía de Endpoints de la API REST (.NET 8)

| Método | Endpoint | Parámetros / Query | Descripción Funcional |
|:---|:---|:---|:---|
| **POST** | `/api/searchengine/initialize` | `?size=1000000` (Opcional) | Inicializa y puebla el arreglo contiguo en memoria RAM con N elementos ordenados. |
| **GET** | `/api/searchengine/search/linear/{targetSku}` | `{targetSku}` (Ruta) | Ejecuta la Búsqueda Lineal y retorna telemetría de rendimiento y comparaciones. |
| **GET** | `/api/searchengine/search/binary/{targetSku}` | `{targetSku}` (Ruta) | Ejecuta la Búsqueda Binaria sobre el arreglo actual. |
| **POST** | `/api/searchengine/shuffle` | Ninguno | Aplica el algoritmo Fisher-Yates para corromper el ordenamiento (Modo Sabotaje). |
| **GET** | `/api/searchengine/amortization/{kQueries}` | `{kQueries}` (Ruta) | Calcula analíticamente el punto de equilibrio y porcentaje de ahorro para K consultas. |

---

## 5. Estrategia de Contenerización (Docker)

El sistema emplea **Multi-Stage Dockerfiles** para separar los entornos de compilación de los entornos de ejecución en producción:

- **Backend:** Utiliza el SDK de .NET 8 para compilar los binarios y empaqueta el resultado en una imagen ligera basada en ASP.NET 8 Runtime.

- **Frontend:** Utiliza Node.js con `pnpm` para la transpilación de TypeScript y empaqueta los archivos estáticos resultantes (`dist/`) en un servidor web **Nginx Alpine**, optimizando el rendimiento de entrega y reduciendo la huella de memoria en los contenedores.

---
