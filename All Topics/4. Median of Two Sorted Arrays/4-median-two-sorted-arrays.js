/*
Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
*/

// Minha solução 29/12/2025
var findMedianSortedArrays = function (nums1, nums2) {
  let fullArray = [...nums1, ...nums2].sort((a, b) => a - b);

  let isEven = fullArray.length % 2;
  let indexOne = Math.floor(fullArray.length / 2);
  let media = 0;

  if (isEven == 0) {
    let valueOne = fullArray[indexOne];
    let valueTwo = fullArray[indexOne - 1];
    media = (valueOne + valueTwo) / 2;
  } else {
    media = fullArray[indexOne];
  }

  return media;
};

// Solução TOP
var findMedianSortedArrays = function (nums1, nums2) {
  // OTIMIZAÇÃO: Sempre fazer busca binária no array MENOR
  // Isso garante O(log(min(m,n))) ao invés de O(log(max(m,n)))
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]; // Swap
  }

  const m = nums1.length; // Tamanho do array menor
  const n = nums2.length; // Tamanho do array maior

  // PASSO 1: Configurar busca binária no array menor
  let low = 0; // Mínimo de elementos que podemos pegar de nums1
  let high = m; // Máximo de elementos que podemos pegar de nums1

  // PASSO 2: Binary Search para encontrar a partição correta
  while (low <= high) {
    // partition1: quantos elementos de nums1 vão para a esquerda
    const partition1 = Math.floor((low + high) / 2);

    // partition2: quantos elementos de nums2 vão para a esquerda
    // Fórmula: metade total - elementos já pegos de nums1
    const partition2 = Math.floor((m + n + 1) / 2) - partition1;

    // PASSO 3: Encontrar os valores nas bordas das partições

    // Maior valor à ESQUERDA de nums1
    // Se partition1 = 0, não há elementos à esquerda → -Infinity
    const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];

    // Menor valor à DIREITA de nums1
    // Se partition1 = m, não há elementos à direita → Infinity
    const minRight1 = partition1 === m ? Infinity : nums1[partition1];

    // Maior valor à ESQUERDA de nums2
    const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];

    // Menor valor à DIREITA de nums2
    const minRight2 = partition2 === n ? Infinity : nums2[partition2];

    // PASSO 4: Verificar se encontramos a partição correta
    // Condição: maior da esquerda ≤ menor da direita (em ambos os arrays)
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // 🎯 PARTIÇÃO CORRETA ENCONTRADA!

      if ((m + n) % 2 === 0) {
        // Tamanho PAR: mediana = média dos dois valores centrais
        // Valores centrais = maior da esquerda e menor da direita
        return (
          (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
        );
      } else {
        // Tamanho ÍMPAR: mediana = maior valor da esquerda
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      // Pegamos MUITOS elementos de nums1
      // Precisamos mover a partição para a ESQUERDA
      high = partition1 - 1;
    } else {
      // Pegamos POUCOS elementos de nums1
      // Precisamos mover a partição para a DIREITA
      low = partition1 + 1;
    }
  }

  // Nunca deve chegar aqui se os arrays estiverem válidos
  throw new Error("Arrays de entrada inválidos");
};
