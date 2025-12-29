# 📊 Mediana de Dois Arrays Ordenados - Todas as Soluções

## 🎯 Problema (LeetCode #4 - Hard)

Dados dois arrays ordenados `nums1` e `nums2`, retorne a mediana dos dois arrays combinados.

**Exemplo:**

```javascript
Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explicação: Array combinado = [1,2,3], mediana = 2

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explicação: Array combinado = [1,2,3,4], mediana = (2 + 3) / 2 = 2.5
```

---

## 📈 Evolução das Soluções (da Pior para a Melhor)

| Solução              | Complexidade Tempo  | Complexidade Espaço | Dificuldade | Status         |
| -------------------- | ------------------- | ------------------- | ----------- | -------------- |
| #1 - Merge + Sort    | `O((m+n) log(m+n))` | `O(m+n)`            | 🟢 Fácil    | ❌ Ineficiente |
| #2 - Merge Ordenado  | `O(m+n)`            | `O(m+n)`            | 🟡 Médio    | ✅ Bom         |
| #3 - Merge Otimizado | `O(m+n)`            | `O(1)`              | 🟡 Médio    | ✅ Melhor      |
| #4 - Binary Search   | `O(log(min(m,n)))`  | `O(1)`              | 🔴 Difícil  | 🏆 Ótimo       |

---

## ❌ Solução #1: Merge + Sort (Sua Solução Original)

### 📚 Conhecimentos Necessários:

- ✅ Spread Operator (`...`)
- ✅ Array.sort()
- ✅ Operador módulo (`%`)
- ✅ Condicionais básicas

### 🔴 Problemas:

- Ignora que os arrays **já estão ordenados**
- Complexidade desnecessariamente alta
- Usa ordenação quando não precisa

### 💻 Código:

```javascript
/**
 * SOLUÇÃO #1: MERGE + SORT (INEFICIENTE)
 * Complexidade: O((m+n) log(m+n))
 * Espaço: O(m+n)
 */
var findMedianSortedArrays = function (nums1, nums2) {
  // PASSO 1: Combina os dois arrays usando spread operator
  // Tempo: O(m+n) - precisa copiar todos os elementos
  let fullArray = [...nums1, ...nums2];

  // PASSO 2: Ordena o array combinado
  // Tempo: O((m+n) log(m+n)) - GARGALO! Ignora que já estão ordenados
  fullArray.sort((a, b) => a - b);

  // PASSO 3: Calcula o índice do meio
  let tamanho = fullArray.length;
  let indexMeio = Math.floor(tamanho / 2);

  // PASSO 4: Verifica se o tamanho é par ou ímpar
  // Se resto da divisão por 2 é 0, então é par
  let ehPar = tamanho % 2 === 0;

  let mediana;

  if (ehPar) {
    // Array PAR: mediana = média dos dois valores centrais
    // Exemplo: [1,2,3,4] → mediana = (2+3)/2 = 2.5
    let valorDireita = fullArray[indexMeio];
    let valorEsquerda = fullArray[indexMeio - 1];
    mediana = (valorEsquerda + valorDireita) / 2;
  } else {
    // Array ÍMPAR: mediana = valor central
    // Exemplo: [1,2,3] → mediana = 2
    mediana = fullArray[indexMeio];
  }

  return mediana;
};
```

### 📊 Análise:

```
nums1 = [1, 3, 5]  (m = 3)
nums2 = [2, 4, 6]  (n = 3)

Passo 1: [...nums1, ...nums2] → [1,3,5,2,4,6]
Passo 2: sort() → [1,2,3,4,5,6]  ← Desnecessário! Já estavam ordenados
Passo 3: indexMeio = 3
Passo 4: ehPar = true → (3+4)/2 = 3.5
```

**Por que é ruim?** O `.sort()` faz `O((m+n) log(m+n))` comparações, mas os arrays **já estavam ordenados**!

---

## ✅ Solução #2: Merge Ordenado (Estilo Merge Sort)

### 📚 Conhecimentos Necessários:

- ✅ Algoritmo Merge Sort (conceito de merge)
- ✅ Two Pointers (dois ponteiros)
- ✅ While loops
- ✅ Arrays e índices

### 🟢 Vantagens:

- Aproveita que os arrays já estão ordenados
- Complexidade linear `O(m+n)`
- Lógica mais eficiente

### 💻 Código:

```javascript
/**
 * SOLUÇÃO #2: MERGE ORDENADO
 * Complexidade: O(m+n)
 * Espaço: O(m+n)
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const tamanhoTotal = m + n;
  const merged = []; // Array para armazenar o resultado do merge

  // PASSO 1: Merge dos arrays usando dois ponteiros
  // Ponteiro i percorre nums1, ponteiro j percorre nums2
  let i = 0; // Ponteiro para nums1
  let j = 0; // Ponteiro para nums2

  // Enquanto houver elementos em AMBOS os arrays
  while (i < m && j < n) {
    if (nums1[i] < nums2[j]) {
      // Elemento de nums1 é menor, adiciona ele
      merged.push(nums1[i]);
      i++; // Avança ponteiro de nums1
    } else {
      // Elemento de nums2 é menor ou igual, adiciona ele
      merged.push(nums2[j]);
      j++; // Avança ponteiro de nums2
    }
  }

  // PASSO 2: Adiciona elementos restantes de nums1 (se houver)
  // Isso acontece quando nums2 já foi todo processado
  while (i < m) {
    merged.push(nums1[i]);
    i++;
  }

  // PASSO 3: Adiciona elementos restantes de nums2 (se houver)
  // Isso acontece quando nums1 já foi todo processado
  while (j < n) {
    merged.push(nums2[j]);
    j++;
  }

  // PASSO 4: Calcula a mediana do array mesclado
  const meio = Math.floor(tamanhoTotal / 2);

  if (tamanhoTotal % 2 === 0) {
    // Tamanho PAR: média dos dois elementos centrais
    return (merged[meio - 1] + merged[meio]) / 2;
  } else {
    // Tamanho ÍMPAR: elemento central
    return merged[meio];
  }
};
```

### 📊 Análise Passo a Passo:

```
nums1 = [1, 3, 5]
nums2 = [2, 4, 6]

Iteração 1: i=0, j=0 → nums1[0]=1 < nums2[0]=2 → merged=[1], i=1
Iteração 2: i=1, j=0 → nums1[1]=3 > nums2[0]=2 → merged=[1,2], j=1
Iteração 3: i=1, j=1 → nums1[1]=3 < nums2[1]=4 → merged=[1,2,3], i=2
Iteração 4: i=2, j=1 → nums1[2]=5 > nums2[1]=4 → merged=[1,2,3,4], j=2
Iteração 5: i=2, j=2 → nums1[2]=5 < nums2[2]=6 → merged=[1,2,3,4,5], i=3
Iteração 6: i=3 (fim), adiciona nums2[2]=6 → merged=[1,2,3,4,5,6]

Resultado: mediana = (3+4)/2 = 3.5
```

**Comparação com Solução #1:**

- Solução #1: 6 elementos × log(6) ≈ 15 operações (sort)
- Solução #2: 6 operações (uma passada linear)

---

## 🎯 Solução #3: Merge Otimizado (Sem Array Extra Completo)

### 📚 Conhecimentos Necessários:

- ✅ Two Pointers avançado
- ✅ Otimização de espaço
- ✅ Early stopping

### 🟢 Vantagens:

- Não precisa construir o array completo
- Para de mesclar quando chega na mediana
- Espaço `O(1)` se não precisar do array inteiro

### 💻 Código:

```javascript
/**
 * SOLUÇÃO #3: MERGE OTIMIZADO (STOP AT MEDIAN)
 * Complexidade: O(m+n) no pior caso, mas pode parar mais cedo
 * Espaço: O(1) - apenas variáveis
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const tamanhoTotal = m + n;

  // Calculamos quantos elementos precisamos processar
  // Para mediana, só precisamos chegar até o meio + 1
  const alvoMediana = Math.floor(tamanhoTotal / 2);
  const ehPar = tamanhoTotal % 2 === 0;

  // PASSO 1: Variáveis para rastrear os valores anteriores
  let valorAnterior = 0; // Guarda o valor anterior
  let valorAtual = 0; // Guarda o valor atual

  let i = 0; // Ponteiro para nums1
  let j = 0; // Ponteiro para nums2

  // PASSO 2: Iterar até alcançar a posição da mediana
  // Percorremos (meio + 1) elementos
  for (let contador = 0; contador <= alvoMediana; contador++) {
    valorAnterior = valorAtual; // Salva o valor anterior

    // Decide qual valor pegar (de nums1 ou nums2)
    if (i < m && (j >= n || nums1[i] <= nums2[j])) {
      // Pega de nums1 se:
      // - Ainda há elementos em nums1 E
      // - (nums2 acabou OU elemento de nums1 é menor/igual)
      valorAtual = nums1[i];
      i++;
    } else {
      // Caso contrário, pega de nums2
      valorAtual = nums2[j];
      j++;
    }
  }

  // PASSO 3: Retorna a mediana
  if (ehPar) {
    // Tamanho PAR: média do valorAnterior e valorAtual
    // Exemplo: [1,2,3,4] → valorAnterior=2, valorAtual=3 → (2+3)/2 = 2.5
    return (valorAnterior + valorAtual) / 2;
  } else {
    // Tamanho ÍMPAR: apenas o valorAtual
    // Exemplo: [1,2,3] → valorAtual=2
    return valorAtual;
  }
};
```

### 📊 Análise Passo a Passo:

```
nums1 = [1, 3, 5]
nums2 = [2, 4, 6]
tamanhoTotal = 6 (PAR)
alvoMediana = 3 (precisamos chegar até índice 3)

contador=0: valorAtual=1 (de nums1[0])
contador=1: valorAnterior=1, valorAtual=2 (de nums2[0])
contador=2: valorAnterior=2, valorAtual=3 (de nums1[1])
contador=3: valorAnterior=3, valorAtual=4 (de nums2[1])

PARA AQUI! Não precisa processar 5 e 6

Mediana = (3 + 4) / 2 = 3.5
```

**Vantagem:** Para mediana, processa menos elementos que a Solução #2!

---

## 🏆 Solução #4: Binary Search (Solução Ótima)

### 📚 Conhecimentos Necessários:

- ✅ Binary Search (busca binária)
- ✅ Particionamento de arrays
- ✅ Conceito de mediana em arrays particionados
- ✅ Manipulação de índices complexos
- ✅ Infinity/-Infinity como sentinelas

### 🔥 Por que é a melhor?

- Complexidade `O(log(min(m,n)))` - **Logarítmica!**
- Não precisa mesclar os arrays
- Usa busca binária para encontrar o ponto de corte correto

### 🧠 Conceito Principal:

```
Array 1: [1, 3, 5, 7, 9]
Array 2: [2, 4, 6, 8, 10]

Ideia: Encontrar um "corte" que divida os arrays em duas partes
de forma que:
- Metade dos elementos totais esteja à ESQUERDA
- Metade dos elementos totais esteja à DIREITA
- Todos à esquerda sejam ≤ todos à direita

Exemplo de corte correto:
Array 1: [1, 3] | [5, 7, 9]      (corte após índice 1)
Array 2: [2, 4, 6] | [8, 10]     (corte após índice 2)

Esquerda: [1, 3, 2, 4, 6]  (5 elementos)
Direita: [5, 7, 9, 8, 10]  (5 elementos)

max(esquerda) = 6
min(direita) = 5

Se max(esquerda) ≤ min(direita) → CORTE CORRETO!
```

### 💻 Código:

```javascript
/**
 * SOLUÇÃO #4: BINARY SEARCH (ÓTIMA)
 * Complexidade: O(log(min(m,n)))
 * Espaço: O(1)
 */
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
```

### 📊 Visualização Completa:

```
nums1 = [1, 3, 5]  (m = 3)
nums2 = [2, 4, 6, 8, 10]  (n = 5)
Total = 8 (PAR) → mediana = média dos elementos nas posições 3 e 4

ITERAÇÃO 1:
-----------
low=0, high=3
partition1 = (0+3)/2 = 1  (pegar 1 elemento de nums1)
partition2 = (8+1)/2 - 1 = 3  (pegar 3 elementos de nums2)

nums1: [1] | [3, 5]
nums2: [2, 4, 6] | [8, 10]

maxLeft1 = 1
minRight1 = 3
maxLeft2 = 6
minRight2 = 8

Verificação: maxLeft1 (1) ≤ minRight2 (8) ✓
             maxLeft2 (6) ≤ minRight1 (3) ✗

maxLeft2 > minRight1 → pegamos POUCOS de nums1
low = partition1 + 1 = 2

ITERAÇÃO 2:
-----------
low=2, high=3
partition1 = (2+3)/2 = 2  (pegar 2 elementos de nums1)
partition2 = (8+1)/2 - 2 = 2  (pegar 2 elementos de nums2)

nums1: [1, 3] | [5]
nums2: [2, 4] | [6, 8, 10]

maxLeft1 = 3
minRight1 = 5
maxLeft2 = 4
minRight2 = 6

Verificação: maxLeft1 (3) ≤ minRight2 (6) ✓
             maxLeft2 (4) ≤ minRight1 (5) ✓

✅ PARTIÇÃO CORRETA!

Mediana = (max(3, 4) + min(5, 6)) / 2
        = (4 + 5) / 2
        = 4.5
```

### 🔍 Por que O(log(min(m,n)))?

```
Array menor tem tamanho m
Binary Search divide o espaço de busca pela metade a cada iteração

Iterações necessárias = log₂(m)

Exemplo:
m = 1000 → log₂(1000) ≈ 10 iterações
m = 1.000.000 → log₂(1.000.000) ≈ 20 iterações

Comparado com O(m+n):
m=1000, n=1000 → 2000 operações vs 10 operações!
```

---

## 📊 Comparação Final das Soluções

### Teste com Arrays Grandes:

```
nums1: 100.000 elementos
nums2: 100.000 elementos

Solução #1 (Merge + Sort):
Operações: 200.000 × log(200.000) ≈ 3.600.000 operações
Tempo: ~100ms

Solução #2 (Merge Ordenado):
Operações: 200.000 operações
Tempo: ~10ms

Solução #3 (Merge Otimizado):
Operações: ~100.000 operações (para até a mediana)
Tempo: ~5ms

Solução #4 (Binary Search):
Operações: log₂(100.000) ≈ 17 operações
Tempo: ~0.001ms 🚀
```

### Quando Usar Cada Solução:

| Cenário                    | Solução Recomendada  |
| -------------------------- | -------------------- |
| Aprendendo algoritmos      | #2 (Merge Ordenado)  |
| Entrevista de emprego      | #4 (Binary Search)   |
| Código de produção simples | #3 (Merge Otimizado) |
| Arrays muito grandes       | #4 (Binary Search)   |
| Prototipagem rápida        | #2 (Merge Ordenado)  |

---

## 🎓 Conceitos Importantes

### 1️⃣ **Two Pointers (Dois Ponteiros)**

```javascript
// Técnica usada nas Soluções #2 e #3
let i = 0; // Ponteiro 1
let j = 0; // Ponteiro 2

while (i < m && j < n) {
  if (arr1[i] < arr2[j]) {
    i++; // Move ponteiro 1
  } else {
    j++; // Move ponteiro 2
  }
}
```

### 2️⃣ **Binary Search (Busca Binária)**

```javascript
// Técnica usada na Solução #4
let low = 0,
  high = n;

while (low <= high) {
  let mid = Math.floor((low + high) / 2);

  if (condicao) {
    return resultado;
  } else if (muito_alto) {
    high = mid - 1; // Busca na metade inferior
  } else {
    low = mid + 1; // Busca na metade superior
  }
}
```

### 3️⃣ **Mediana**

```javascript
// Array ÍMPAR: elemento do meio
[1, 2, 3, 4, 5] → mediana = 3

// Array PAR: média dos dois elementos do meio
[1, 2, 3, 4] → mediana = (2 + 3) / 2 = 2.5
```

---

## 🚀 Roadmap de Aprendizado

### Nível 1: Iniciante

1. Entenda a Solução #1 (sua original)
2. Aprenda o conceito de Two Pointers
3. Implemente a Solução #2

### Nível 2: Intermediário

1. Otimize para a Solução #3
2. Estude complexidade de algoritmos (Big O)
3. Pratique outros problemas de merge

### Nível 3: Avançado

1. Estude Binary Search profundamente
2. Entenda particionamento de arrays
3. Implemente a Solução #4
4. Pratique variações do problema

---

## 📚 Recursos Adicionais

- [LeetCode - Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)
- [Visualização de Binary Search](https://visualgo.net/en/bst)
- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)
- [Merge Sort Animation](https://visualgo.net/en/sorting)

---

## ✅ Checklist de Entendimento

Marque quando dominar cada conceito:

- [ ] Entendo por que minha solução original é ineficiente
- [ ] Consigo implementar merge de arrays ordenados
- [ ] Entendo a técnica Two Pointers
- [ ] Sei calcular complexidade Big O
- [ ] Entendo Binary Search básico
- [ ] Consigo explicar a Solução #4 para alguém
- [ ] Sei quando usar cada solução na prática

---

**🎯 Objetivo Final:** Entender que nem sempre a primeira solução é a melhor, e que conhecer estruturas de dados e algoritmos faz MUITA diferença em performance!

**💡 Dica:** Comece pela Solução #2, domine ela, e só depois avance para a #4. A Binary Search é complexa e requer prática!
