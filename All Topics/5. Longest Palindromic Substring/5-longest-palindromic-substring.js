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

// Minha solução inicial, que não passou em todos os testes

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
