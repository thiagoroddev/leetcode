/*
5. Longest Palindromic Substring
Attempted
Medium
Topics
premium lock icon
Companies
Hint
Given a string s, return the longest palindromic substring in s.

 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"
 

Constraints:

1 <= s.length <= 1000
s consist of only digits and English letters.
*/

// Minha solução inicial, que não passou em todos os testes ###################################################################################################################

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const vistos = new Map(); // Guarda { caractere: [índices] }
  let maiorPalindromo = ""; // Guarda o maior palíndromo encontrado

  // Função auxiliar para verificar se uma substring é palíndroma
  function ehPalindromo(s, left, right) {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  }

  // Percorre a string para encontrar palíndromos
  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    if (!vistos.has(char)) {
      vistos.set(char, [i]);
      continue;
    }

    const indices = vistos.get(char); // Lista de índices onde o caractere apareceu

    // Verifica cada ocorrência anterior do caractere atual
    for (let j = 0; j < indices.length; j++) {
      const inicio = indices[j];
      const fim = i;
      const tamanho = fim - inicio + 1;

      if (tamanho <= maiorPalindromo.length) continue; // Pula se não puder ser maior

      // Verifica se a substring é palíndroma
      if (ehPalindromo(s, inicio, fim)) {
        maiorPalindromo = s.slice(inicio, fim + 1);
        break;
      }
    }

    indices.push(i); // Adiciona o índice atual à lista
  }

  return maiorPalindromo;
};

// Solução de expand around center
function longestPalindrome(s) {
  if (!s || s.length === 0) return ""; // Edge cases

  let start = 0; // Início do maior palíndromo
  let maxLen = 0; // Tamanho do maior palíndromo

  function expandAroundCenter(left, right) {
    // Função que expande em torno de um centro
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--; // Expande para esquerda
      right++; // Expande para direita
    }
    return right - left - 1; // Retorna o tamanho do palíndromo encontrado
  }

  for (let i = 0; i < s.length; i++) {
    // Para cada posição, tenta expandir como centro
    const len1 = expandAroundCenter(i, i);
    const len2 = expandAroundCenter(i, i + 1); // Palíndromo par
    const len = Math.max(len1, len2); // Pega o maior dos dois
    if (len > maxLen) {
      maxLen = len; // Atualiza o tamanho do maior palíndromo
      start = i - Math.floor((len - 1) / 2); // Calcula o índice de início do palíndromo
    }
  }
  return s.substring(start, start + maxLen); // Retorna a substring do maior palíndromo
}
