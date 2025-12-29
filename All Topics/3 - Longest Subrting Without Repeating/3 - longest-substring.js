/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let mapa = new Map(); // Guarda { caractere: último_índice }
  let esquerda = 0;
  let maiorTamanho = 0;

  for (let direita = 0; direita < s.length; direita++) {
    const caractereAtual = s[direita];

    if (mapa.has(caractereAtual)) {
      // O PULO: Movemos a esquerda para frente da última ocorrência.
      // Math.max garante que o ponteiro nunca volte para trás.
      esquerda = Math.max(esquerda, mapa.get(caractereAtual) + 1);
    }

    // Atualizamos o índice da letra no mapa
    mapa.set(caractereAtual, direita);

    // Calculamos o tamanho atual da janela
    maiorTamanho = Math.max(maiorTamanho, direita - esquerda + 1);
  }

  return maiorTamanho;
};

lengthOfLongestSubstring("dvdf");
