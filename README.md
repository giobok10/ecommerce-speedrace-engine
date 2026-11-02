# E-Commerce SKU Audit & Speed-Race Engine

Un motor de auditoría y simulador de algoritmos de alta velocidad diseñado para evaluar el rendimiento de búsqueda sobre un catálogo en memoria de **1,000,000 de SKUs**.

## 🚀 Arquitectura del Proyecto

* **Backend:** REST API desarrollada en **.NET 8 (C# 12)** usando **Inyección de Dependencias (Singleton)** y el principio de *Deep Modules* (John Ousterhout).
* **Frontend:** Dashboard interactivo en **React 19 + TypeScript** construido con **Vite** y gestor de paquetes **pnpm** *(En desarrollo)*.
* **Control de Versiones:** Git & GitHub.

## 📊 Capacidades del Motor Backend

1. **Gestión en RAM:** Reserva contigua de $1,000,000$ de enteros con monotonía estricta.
2. **Búsqueda Lineal $O(N)$ vs Búsqueda Binaria $O(\log N)$:** Telemetría en tiempo real midiendo milisegundos, ticks de CPU y recuento exacto de comparaciones.
3. **Modo Sabotaje (Fisher-Yates Shuffle):** Algoritmo de desordenamiento aleatorio en $O(N)$ para demostrar la ruptura de la precondición de monotonía y generación de falsos negativos en Búsqueda Binaria.
4. **Análisis de Amortización:** Evaluación matemática del punto de equilibrio ($k = 21$ consultas) donde la estrategia de ordenar previamente amortiza su costo computacional.

## 🛠️ Ejecución Local

### Backend (.NET 8)
```bash
cd backend
dotnet run --project SpeedRaceEngine.Api