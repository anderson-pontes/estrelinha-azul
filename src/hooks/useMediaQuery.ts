// src/hooks/useMediaQuery.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * Hook customizado para verificar se a tela corresponde a uma media query.
 * @param query - A string da media query (ex: '(min-width: 768px)').
 * @returns `true` se a tela corresponder à query, `false` caso contrário.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Garante que o código só rode no navegador (client-side)
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Função para atualizar o estado quando a correspondência mudar
      const listener = () => {
        setMatches(media.matches);
      };

      // Define o valor inicial
      listener();

      // Adiciona um listener para mudanças no tamanho da tela
      media.addEventListener('change', listener);

      // Função de limpeza para remover o listener quando o componente for desmontado
      return () => media.removeEventListener('change', listener);
    }
  }, [query]);

  return matches;
}