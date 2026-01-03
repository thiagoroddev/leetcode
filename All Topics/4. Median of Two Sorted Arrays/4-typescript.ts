function findMedianSortedArrays2(nums1: number[], nums2: number[]): number {
  // OTIMIZAÇÃO: Sempre fazer busca binária no array MENOR
  // Isso garante O(log(min(m,n))) ao invés de O(log(max(m,n)))
  let a: number[] = nums1;
  let b: number[] = nums2;

  if (a.length > b.length) {
    [a, b] = [b, a]; // Swap para garantir que 'a' seja o menor array
  }

  const m: number = a.length;
  const n: number = b.length;

  // PASSO 1: Configurar busca binária no array menor
  let low: number = 0;
  let high: number = m;

  // PASSO 2: Binary Search para encontrar a partição correta
  while (low <= high) {
    // Quantos elementos de 'a' vão para a esquerda
    const partition1: number = Math.floor((low + high) / 2);
    // Quantos elementos de 'b' vão para a esquerda (metade total - elementos de a)
    const partition2: number = Math.floor((m + n + 1) / 2) - partition1;

    // PASSO 3: Encontrar os valores nas bordas das partições
    // Se partition1 = 0, não há elementos à esquerda -> -Infinity
    const maxLeft1: number = partition1 === 0 ? -Infinity : a[partition1 - 1];
    // Se partition1 = m, não há elementos à direita -> Infinity
    const minRight1: number = partition1 === m ? Infinity : a[partition1];

    const maxLeft2: number = partition2 === 0 ? -Infinity : b[partition2 - 1];
    const minRight2: number = partition2 === n ? Infinity : b[partition2];

    // PASSO 4: Verificar se a partição divide os dois arrays corretamente
    // Cruzamento: maior da esquerda de um deve ser <= menor da direita do outro
    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // Se o total de elementos for PAR
      if ((m + n) % 2 === 0) {
        return (
          (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2
        );
      }
      // Se o total de elementos for ÍMPAR
      else {
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      // Reduzir elementos de 'a' na partição esquerda
      high = partition1 - 1;
    } else {
      // Aumentar elementos de 'a' na partição esquerda
      low = partition1 + 1;
    }
  }

  throw new Error("Os arrays fornecidos não estão ordenados ou são inválidos.");
}

// Exemplo de uso:
const mediana = findMedianSortedArrays2([1, 3], [2]);
console.log(mediana); // Saída: 2
