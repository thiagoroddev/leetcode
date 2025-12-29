function twoSum2(nums: number[], target: number): number[] {
  // Definimos o Map com chaves e valores do tipo 'number'
  // Chave: o valor do número / Valor: o índice dele no array
  const map = new Map<number, number>();

  for (let i: number = 0; i < nums.length; i++) {
    const complement: number = target - nums[i];

    // Verificamos se o complemento (o que falta para atingir o target) já existe no mapa
    if (map.has(complement)) {
      // Utilizamos o '!' (non-null assertion) pois o .has() garante que o valor existe
      return [map.get(complement)!, i];
    }

    // Armazenamos o número atual e seu respectivo índice
    map.set(nums[i], i);
  }

  // Caso não encontre nenhuma combinação (exigência do TS para o retorno)
  return [];
}

// Exemplo de teste:
console.log(twoSum([2, 7, 11, 15], 9)); // Saída: [0, 1]
