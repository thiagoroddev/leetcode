function lengthOfLongestSubstring2(s: string): number {
  // Mapa para guardar { caractere: último_índice_encontrado }
  const mapa = new Map<string, number>();
  let esquerda: number = 0;
  let maiorTamanho: number = 0;

  for (let direita: number = 0; direita < s.length; direita++) {
    const caractereAtual: string = s[direita];

    if (mapa.has(caractereAtual)) {
      /**
       * O PULO DO GATO:
       * Movemos a 'esquerda' para a posição seguinte à última ocorrência do caractere.
       * O Math.max evita que a 'esquerda' volte para trás caso encontre um caractere
       * que já saiu da janela atual.
       */
      const ultimoIndice: number = mapa.get(caractereAtual)!;
      esquerda = Math.max(esquerda, ultimoIndice + 1);
    }

    // Atualiza/Insere a posição do caractere no mapa
    mapa.set(caractereAtual, direita);

    // Calcula o tamanho da janela atual (direita - esquerda + 1)
    maiorTamanho = Math.max(maiorTamanho, direita - esquerda + 1);
  }

  return maiorTamanho;
}

// Exemplo de uso:
const resultado = lengthOfLongestSubstring2("dvdf");
console.log(resultado); // Saída: 3 (vdf)
