import type { SearchResult, AmortizationResult } from '../types/engine';

const API_BASE_URL = 'http://localhost:5121/api/searchengine';

export const api = {
  initializeCatalog: async (size: number = 1000000): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/initialize?size=${size}`, {
      method: 'POST',
    });
    return response.json();
  },

  searchLinear: async (targetSku: number): Promise<SearchResult> => {
    const response = await fetch(`${API_BASE_URL}/search/linear/${targetSku}`);
    return response.json();
  },

  searchBinary: async (targetSku: number): Promise<SearchResult> => {
    const response = await fetch(`${API_BASE_URL}/search/binary/${targetSku}`);
    return response.json();
  },

  shuffleCatalog: async (): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/shuffle`, {
      method: 'POST',
    });
    return response.json();
  },

  getAmortization: async (kQueries: number): Promise<AmortizationResult> => {
    const response = await fetch(`${API_BASE_URL}/amortization/${kQueries}`);
    return response.json();
  },
};