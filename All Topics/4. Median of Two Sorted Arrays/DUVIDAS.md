# 🎓 Entendendo Complexidade de Algoritmos: Por Que Ordenar é Mais Custoso?

## 🤔 A Dúvida do Iniciante

> "Como iniciante, não consigo perceber: como vou saber que **reordenar um array** é mais custoso que **comparar cada dígito de um array com outro** para construir um novo array ordenado?"

Esta é uma dúvida **extremamente comum** e muito importante! Vamos desvendar esse mistério.

---

## 💡 A Intuição Enganosa

### O que parece à primeira vista:

```javascript
// ❓ Opção 1: Parece "simples" - só uma linha!
const resultado = [...nums1, ...nums2].sort((a, b) => a - b);

// ❓ Opção 2: Parece "trabalhoso" - tanto código!
let i = 0,
  j = 0;
const merged = [];
while (i < nums1.length && j < nums2.length) {
  if (nums1[i] < nums2[j]) {
    merged.push(nums1[i]);
    i++;
  } else {
    merged.push(nums2[j]);
    j++;
  }
}
// ... ainda tem mais código!
```

### 🎯 Por que essa intuição está errada?

**O que você ESCREVE ≠ O que o COMPUTADOR FAZ**

Quando você escreve **1 linha** com `.sort()`, o JavaScript executa **centenas ou milhares de operações** por baixo dos panos!

---

## 🔍 O Que Acontece Por Baixo dos Panos?

### Quando você chama `.sort()`:

```javascript
[1, 3, 5, 2, 4, 6].sort((a, b) => a - b);

// O JavaScript faz algo assim (simplificado):
function sort(array) {
  // Algoritmo QuickSort (ou TimSort no V8)

  // PASSO 1: Escolhe um pivô
  let pivot = array[Math.floor(array.length / 2)];

  // PASSO 2: Compara CADA elemento com o pivô
  for (let i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      // Move para a esquerda
    } else {
      // Move para a direita
    }
  }

  // PASSO 3: Ordena recursivamente cada metade
  // (Repete TUDO de novo!)
  sort(leftHalf);
  sort(rightHalf);

  // Isso resulta em MUITAS operações!
}
```

**Resultado:** O `.sort()` precisa **comparar elementos múltiplas vezes** e fazer **muitas trocas de posição**.

---

## 📊 Vamos Contar as Operações Reais

### Exemplo Prático: `nums1 = [1, 3, 5]` e `nums2 = [2, 4, 6]`

---

### **🔴 OPÇÃO 1: Concatenar + Sort**

```javascript
// PASSO 1: Concatenar
const array = [...nums1, ...nums2];
// Resultado: [1, 3, 5, 2, 4, 6]
// Operações: 6 (copiar cada elemento)

// PASSO 2: Ordenar
array.sort((a, b) => a - b);

// O que o JavaScript REALMENTE faz:
```

#### Iteração por Iteração do Sort:

```
Array inicial: [1, 3, 5, 2, 4, 6]

Pivô: 5 (elemento do meio)

Comparações:
1. 1 < 5? SIM → esquerda
2. 3 < 5? SIM → esquerda
3. 5 < 5? NÃO → meio
4. 2 < 5? SIM → esquerda
5. 4 < 5? SIM → esquerda
6. 6 < 5? NÃO → direita

Resultado parcial: [1, 3, 2, 4] [5] [6]

Agora ordena [1, 3, 2, 4]:
Pivô: 3

7. 1 < 3? SIM → esquerda
8. 3 < 3? NÃO → meio
9. 2 < 3? SIM → esquerda
10. 4 < 3? NÃO → direita

Resultado: [1, 2] [3] [4]

Ainda precisa ordenar [1, 2]:
11. 1 < 2? SIM → já está ordenado

TOTAL DE COMPARAÇÕES: ~15 operações
TOTAL DE TROCAS/MOVIMENTAÇÕES: ~8 operações
```

**Total Aproximado:** 23 operações para ordenar 6 elementos!

---

### **🟢 OPÇÃO 2: Merge Ordenado**

```javascript
nums1 = [1, 3, 5]; // ✅ JÁ está ordenado
nums2 = [2, 4, 6]; // ✅ JÁ está ordenado

let i = 0,
  j = 0;
const merged = [];
```

#### Iteração por Iteração do Merge:

```
Iteração 1:
  i=0, j=0
  nums1[0]=1 vs nums2[0]=2
  1 < 2? SIM → merged.push(1)
  i++ → i=1
  merged = [1]
  Comparações: 1

Iteração 2:
  i=1, j=0
  nums1[1]=3 vs nums2[0]=2
  3 < 2? NÃO → merged.push(2)
  j++ → j=1
  merged = [1, 2]
  Comparações: 1

Iteração 3:
  i=1, j=1
  nums1[1]=3 vs nums2[1]=4
  3 < 4? SIM → merged.push(3)
  i++ → i=2
  merged = [1, 2, 3]
  Comparações: 1

Iteração 4:
  i=2, j=1
  nums1[2]=5 vs nums2[1]=4
  5 < 4? NÃO → merged.push(4)
  j++ → j=2
  merged = [1, 2, 3, 4]
  Comparações: 1

Iteração 5:
  i=2, j=2
  nums1[2]=5 vs nums2[2]=6
  5 < 6? SIM → merged.push(5)
  i++ → i=3
  merged = [1, 2, 3, 4, 5]
  Comparações: 1

Iteração 6:
  i=3 (acabou nums1)
  Adiciona resto de nums2: merged.push(6)
  merged = [1, 2, 3, 4, 5, 6]
  Comparações: 0

TOTAL DE COMPARAÇÕES: 5 operações
TOTAL DE ADIÇÕES: 6 operações
```

**Total:** 11 operações!

---

### 📊 Comparação Final:

| Operação          | Sort | Merge | Vencedor                  |
| ----------------- | ---- | ----- | ------------------------- |
| **Comparações**   | ~15  | 5     | 🟢 Merge (3x mais rápido) |
| **Movimentações** | ~8   | 6     | 🟢 Merge                  |
| **Total**         | ~23  | ~11   | 🟢 Merge (2x mais rápido) |

---

## 🎯 O Segredo do Merge: Aproveitando Informação

### Por que o Merge é mais eficiente?

```javascript
// Quando você tem arrays ORDENADOS:
nums1 = [1, 3, 5]; // Você JÁ SABE: 1 < 3 < 5
nums2 = [2, 4, 6]; // Você JÁ SABE: 2 < 4 < 6

// O Merge aproveita essa informação!

// Pergunta 1: "1 ou 2 é menor?"
// Resposta: 1 (1 comparação)
//
// Pergunta 2: "3 ou 2 é menor?"
// Resposta: 2 (1 comparação)
//
// Como você já sabe que 1 < 3,
// NÃO PRECISA comparar 1 com 2 de novo!
//
// Como você já sabe que 2 < 4,
// NÃO PRECISA comparar 2 com 6!

// Você NUNCA compara 1 com 6, por exemplo!
```

### Quando você usa `.sort()`:

```javascript
array = [1, 3, 5, 2, 4, 6]; // ❌ Perdeu TODA a informação!

// O Sort não sabe que:
// - [1, 3, 5] estava ordenado
// - [2, 4, 6] estava ordenado
//
// Então ele precisa comparar TUDO de novo!
// Ele VAI comparar 1 com 6!
// Ele VAI comparar 3 com 2!
// Ele VAI fazer comparações desnecessárias!
```

---

## 📈 Visualização com Arrays Maiores

### Exemplo: 1000 elementos em cada array

#### **Sort:**

```
Array concatenado: 2000 elementos

Fórmula: n × log₂(n)
Cálculo: 2000 × log₂(2000)
       = 2000 × 10.97
       ≈ 22.000 comparações

Tempo estimado: ~50ms
```

#### **Merge:**

```
Array 1: 1000 elementos (ordenados)
Array 2: 1000 elementos (ordenados)

Fórmula: n + m
Cálculo: 1000 + 1000
       = 2000 comparações

Tempo estimado: ~5ms
```

### 🎯 Diferença:

- **22.000 operações** vs **2.000 operações**
- **Sort é 11x mais lento!**

---

### Exemplo: 100.000 elementos em cada array

#### **Sort:**

```
Array: 200.000 elementos
Operações: 200.000 × log₂(200.000)
         = 200.000 × 17.6
         ≈ 3.520.000 comparações

Tempo estimado: ~5 segundos
```

#### **Merge:**

```
Operações: 100.000 + 100.000
         = 200.000 comparações

Tempo estimado: ~0.5 segundos
```

### 🎯 Diferença:

- **3.520.000 operações** vs **200.000 operações**
- **Sort é 17x mais lento!**

---

## 🎓 Como Desenvolver Intuição de Performance

### 1️⃣ **Conte Operações em Exemplos Pequenos**

```javascript
// Array de 4 elementos
nums = [3, 1, 4, 2];

// Bubble Sort (exemplo didático):
//
// Passada 1:
//   3 vs 1 → troca → [1, 3, 4, 2]
//   3 vs 4 → ok
//   4 vs 2 → troca → [1, 3, 2, 4]
//   Total: 3 comparações
//
// Passada 2:
//   1 vs 3 → ok
//   3 vs 2 → troca → [1, 2, 3, 4]
//   Total: 2 comparações
//
// Passada 3:
//   1 vs 2 → ok
//   Total: 1 comparação
//
// TOTAL: 6 comparações para 4 elementos

// Agora imagine com 1000 elementos:
// Aproximadamente: 1000 × 999 / 2 = 499.500 comparações! 😱
```

### 2️⃣ **Identifique Loops Aninhados**

```javascript
// ❌ LENTO: O(n²)
for (let i = 0; i < n; i++) {
  // n vezes
  for (let j = 0; j < n; j++) {
    // n vezes
    console.log(i, j); // Total: n × n
  }
}
// Com n=1000 → 1.000.000 operações!

// ✅ RÁPIDO: O(n)
for (let i = 0; i < n; i++) {
  // n vezes
  console.log(i); // Total: n
}
// Com n=1000 → 1.000 operações!
```

### 3️⃣ **Pergunte: "Estou Jogando Informação Fora?"**

```javascript
// ❌ RUIM: Ignora que já está ordenado
const ordenado1 = [1, 3, 5];
const ordenado2 = [2, 4, 6];
const resultado = [...ordenado1, ...ordenado2].sort();
// Reordena TUDO do zero!

// ✅ BOM: Aproveita a ordem existente
const resultado = merge(ordenado1, ordenado2);
// Só compara cada elemento UMA vez!
```

### 4️⃣ **Aprenda as Complexidades Comuns**

| Notação      | Nome        | Exemplo                | Velocidade      |
| ------------ | ----------- | ---------------------- | --------------- |
| `O(1)`       | Constante   | `array[0]`             | 🚀 Instantâneo  |
| `O(log n)`   | Logarítmica | Binary Search          | ⚡ Muito Rápido |
| `O(n)`       | Linear      | Loop simples           | ✅ Rápido       |
| `O(n log n)` | Log-Linear  | Merge Sort, Quick Sort | 🟡 Médio        |
| `O(n²)`      | Quadrática  | Loop duplo             | 🐌 Lento        |
| `O(2ⁿ)`      | Exponencial | Fibonacci recursivo    | 🐢 Muito Lento  |

---

## 🧠 Regras Práticas para Iniciantes

### ✅ Regra 1: Uma Linha ≠ Uma Operação

```javascript
// Isso parece "1 operação":
array.sort();

// Mas faz milhares de operações:
// - Comparações múltiplas
// - Trocas de posição
// - Chamadas recursivas
```

### ✅ Regra 2: Use Informação Disponível

```javascript
// Se algo JÁ está ordenado/processado:
// ✅ Aproveite isso!
// ❌ NÃO refaça do zero!

// Exemplo:
const sorted1 = [1, 3, 5];
const sorted2 = [2, 4, 6];

// ❌ Ruim: Ignora informação
[...sorted1, ...sorted2].sort();

// ✅ Bom: Usa informação
merge(sorted1, sorted2);
```

### ✅ Regra 3: Loop Dentro de Loop = Alarme! 🚨

```javascript
// ⚠️ ALERTA: Provavelmente lento!
for (...) {
    for (...) {
        // Isso roda n² vezes!
    }
}

// ✅ Melhor: Busque alternativas lineares
for (...) {
    // Isso roda n vezes
}
```

### ✅ Regra 4: Desconfie de "Magic Methods"

```javascript
// Métodos convenientes podem ser custosos:
.sort()      // O(n log n)
.reverse()   // O(n)
.filter()    // O(n)
.map()       // O(n)
.reduce()    // O(n)

// Pergunte sempre: "Quantas vezes isso percorre o array?"
```

---

## 📊 Tabela de Comparação de Complexidades

### Arrays de Tamanho N:

| N           | O(1) | O(log n) | O(n)    | O(n log n) | O(n²)          |
| ----------- | ---- | -------- | ------- | ---------- | -------------- |
| **10**      | 1    | 3        | 10      | 30         | 100            |
| **100**     | 1    | 7        | 100     | 700        | 10.000         |
| **1.000**   | 1    | 10       | 1.000   | 10.000     | 1.000.000      |
| **10.000**  | 1    | 13       | 10.000  | 130.000    | 100.000.000    |
| **100.000** | 1    | 17       | 100.000 | 1.700.000  | 10.000.000.000 |

### 🎯 Interpretação:

```
Com N = 100.000:

O(1):       1 operação          → 0.000001 segundos
O(log n):   17 operações        → 0.000017 segundos
O(n):       100.000 operações   → 0.1 segundos
O(n log n): 1.700.000 ops       → 1.7 segundos
O(n²):      10 bilhões ops      → 2.8 horas! 😱
```

---

## 🎯 Casos Práticos: Quando Usar O Quê?

### Cenário 1: Arrays Ordenados

```javascript
const nums1 = [1, 3, 5, 7, 9]; // Ordenado
const nums2 = [2, 4, 6, 8, 10]; // Ordenado

// ❌ RUIM: O((m+n) log(m+n))
const result = [...nums1, ...nums2].sort();

// ✅ BOM: O(m+n)
const result = merge(nums1, nums2);
```

**Por quê?** Você já tem a informação da ordem!

---

### Cenário 2: Arrays Desordenados

```javascript
const nums1 = [5, 1, 9, 3]; // Desordenado
const nums2 = [8, 2, 10, 4]; // Desordenado

// ✅ NECESSÁRIO: O((m+n) log(m+n))
const result = [...nums1, ...nums2].sort();

// ❌ ERRADO: Merge não funciona com arrays desordenados!
const result = merge(nums1, nums2); // Resultado incorreto!
```

**Por quê?** Sem ordem prévia, você PRECISA ordenar.

---

### Cenário 3: Buscar um Elemento

```javascript
const numbers = [1, 3, 5, 7, 9, 11, 13];

// ❌ LENTO: O(n)
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === 7) return i;
}

// ✅ RÁPIDO: O(log n) - Binary Search
// (funciona porque o array está ordenado!)
let low = 0,
  high = numbers.length - 1;
while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  if (numbers[mid] === 7) return mid;
  if (numbers[mid] < 7) low = mid + 1;
  else high = mid - 1;
}
```

**Por quê?** Binary Search aproveita a ordem!

---

## 🔬 Experimento Prático

### Teste Você Mesmo:

```javascript
// Função para medir tempo
function medirTempo(funcao, nome) {
  const inicio = performance.now();
  funcao();
  const fim = performance.now();
  console.log(`${nome}: ${(fim - inicio).toFixed(2)}ms`);
}

// Criar arrays grandes
const tamanho = 100000;
const nums1 = Array.from({ length: tamanho }, (_, i) => i * 2);
const nums2 = Array.from({ length: tamanho }, (_, i) => i * 2 + 1);

// Teste 1: Concatenar + Sort
medirTempo(() => {
  const resultado = [...nums1, ...nums2].sort((a, b) => a - b);
}, "Concatenar + Sort");

// Teste 2: Merge
medirTempo(() => {
  let i = 0,
    j = 0;
  const merged = [];
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }
  while (i < nums1.length) merged.push(nums1[i++]);
  while (j < nums2.length) merged.push(nums2[j++]);
}, "Merge");

// Resultados esperados:
// Concatenar + Sort: ~150ms
// Merge: ~15ms
// Merge é ~10x mais rápido!
```

### 💡 Execute esse código no console do navegador e veja a diferença!

---

## 📚 Recursos para Aprofundar

### 1️⃣ **Visualizadores de Algoritmos**

- [VisuAlgo](https://visualgo.net/) - Visualize sorting algorithms
- [Algorithm Visualizer](https://algorithm-visualizer.org/)

### 2️⃣ **Prática**

- [LeetCode](https://leetcode.com/) - Problemas de algoritmos
- [HackerRank](https://www.hackerrank.com/)

### 3️⃣ **Teoria**

- [Big O Cheat Sheet](https://www.bigocheatsheet.com/)
- [Time Complexity Analysis](https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/)

---

## ✅ Checklist de Compreensão

Marque quando conseguir fazer cada item:

- [ ] Entendo que `.sort()` faz múltiplas comparações
- [ ] Sei contar operações em algoritmos simples
- [ ] Reconheço quando estou "jogando informação fora"
- [ ] Identifico loops aninhados (alerta de O(n²))
- [ ] Entendo a hierarquia: O(1) < O(log n) < O(n) < O(n log n) < O(n²)
- [ ] Sei quando usar merge vs sort
- [ ] Consigo estimar performance de código simples
- [ ] Entendo por que aproveitar ordem existente é eficiente

---

## 🎯 Resumo Final

### 💎 Três Verdades Fundamentais:

1. **Uma linha de código ≠ Uma operação**

   - `.sort()` parece simples, mas faz milhares de operações

2. **Use informação disponível**

   - Se algo já está ordenado, APROVEITE isso!

3. **Complexidade importa em escala**
   - Com 10 elementos, tanto faz
   - Com 100.000 elementos, a diferença é ENORME

### 🚀 Próximos Passos:

1. Pratique contar operações em código simples
2. Execute o experimento prático acima
3. Estude um algoritmo de sort visualmente
4. Implemente seu próprio merge de arrays
5. Pratique problemas no LeetCode

---

**Lembre-se:** A intuição vem com PRÁTICA! Quanto mais você analisar algoritmos e contar operações, mais natural isso se tornará.

**Não desanime!** Até programadores experientes precisam parar e pensar sobre complexidade. A diferença é que eles têm mais prática fazendo isso. 🎓

---

**📝 Nota:** Este README foi criado para responder a dúvida real de um iniciante sobre por que reordenar é mais custoso que fazer merge. Se você tem mais dúvidas, continue perguntando! 💪

#######################################################################################################

# 🎓 Guia Completo: Infinity e Complexidade de Algoritmos

## 📑 Índice

1. [Infinity no JavaScript/TypeScript](#-infinity-no-javascripttypescript)
2. [Complexidade de Tempo e Espaço](#-complexidade-de-tempo-e-espaço)
3. [Como Calcular Complexidade Intuitivamente](#-como-calcular-complexidade-intuitivamente)
4. [Entendendo O(log(m+n))](#-entendendo-ologmn)
5. [Exemplos Práticos](#-exemplos-práticos)

---

## ∞ Infinity no JavaScript/TypeScript

### 🤔 O Que é Infinity?

```typescript
console.log(typeof Infinity); // "number"
console.log(Infinity > 999999999999); // true
console.log(1 / Infinity); // 0
```

**`Infinity`** é um valor numérico especial do JavaScript que representa o conceito matemático de infinito positivo. Apesar de parecer uma palavra-chave especial, ele é **tecnicamente um `number`**.

---

### 📊 Hierarquia de Valores Numéricos

```javascript
-Infinity < -999999 < -1 < 0 < 1 < 999999 < Infinity
    ↑                                           ↑
Menor que                                  Maior que
qualquer número                          qualquer número
```

---

### 🎯 Quando Usar Infinity?

#### **1️⃣ Como "Sentinela" em Algoritmos**

O caso mais comum (como no seu código de mediana):

```typescript
// Código do algoritmo de mediana
const minRight1: number = partition1 === m ? Infinity : nums1[partition1];
const maxLeft1: number = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
```

**Por quê usar Infinity aqui?**

```
Cenário: partition1 = m (chegou no final do array)

nums1: [1, 3, 5] (tamanho m=3)
partition1 = 3

Tentar acessar nums1[3] → ERRO! (índice fora dos limites)

Solução: Usar Infinity
- Representa "não há nada à direita"
- Qualquer número será ≤ Infinity
- A comparação maxLeft2 ≤ minRight1 funciona!
```

**Exemplo Prático Detalhado:**

```typescript
// Sem Infinity (RUIM - código complexo)
let minRight1: number;
if (partition1 === m) {
    // Array acabou, lógica especial necessária
    if (maxLeft2 <= /* o que comparar aqui? */) {
        // ...código confuso...
    }
} else {
    minRight1 = nums1[partition1];
    if (maxLeft2 <= minRight1) {
        // ...
    }
}

// Com Infinity (BOM - código limpo)
const minRight1 = partition1 === m ? Infinity : nums1[partition1];
if (maxLeft2 <= minRight1) { // Funciona SEMPRE!
    // ...
}
```

**Visualização:**

```
Array 1: [1, 3, 5]
         └─────┘
partition1 = 3 (depois do último elemento)

Lado ESQUERDO: [1, 3, 5]
Lado DIREITO:  [ ] ← Vazio!

Como representar "vazio" nas comparações?
→ Use Infinity (maior que qualquer número)

Lado ESQUERDO: [..., maxLeft1=5]
Lado DIREITO:  [minRight1=∞, ...]

Comparação: maxLeft2 ≤ minRight1
           maxLeft2 ≤ ∞ → SEMPRE true! ✓
```

---

#### **2️⃣ Inicialização para Busca de Mínimo/Máximo**

```typescript
// Encontrar o MENOR valor
const numeros = [10, 5, 8, 20, 3];
let menorValor = Infinity; // Começa com "infinitamente grande"

for (let n of numeros) {
  if (n < menorValor) {
    menorValor = n;
  }
}
console.log(menorValor); // 3

// Por que funciona?
// Iteração 1: 10 < Infinity? SIM → menorValor = 10
// Iteração 2: 5 < 10? SIM → menorValor = 5
// Iteração 3: 8 < 5? NÃO
// Iteração 4: 20 < 5? NÃO
// Iteração 5: 3 < 5? SIM → menorValor = 3
```

```typescript
// Encontrar o MAIOR valor
const numeros = [10, 5, 8, 20, 3];
let maiorValor = -Infinity; // Começa com "infinitamente pequeno"

for (let n of numeros) {
  if (n > maiorValor) {
    maiorValor = n;
  }
}
console.log(maiorValor); // 20
```

---

#### **3️⃣ Resultado de Divisão por Zero**

```javascript
console.log(10 / 0); // Infinity
console.log(-10 / 0); // -Infinity
console.log(0 / 0); // NaN (Not a Number)
```

**Comparação com outras linguagens:**

```
Python: 10 / 0 → ZeroDivisionError (erro)
Java:   10 / 0 → ArithmeticException (erro)
JavaScript: 10 / 0 → Infinity (valor especial)
```

---

### 🧮 Comportamento Matemático do Infinity

```javascript
// Adição
Infinity + 1 === Infinity; // true
Infinity + 999999 === Infinity; // true
Infinity + Infinity === Infinity; // true

// Subtração
Infinity - 1 === Infinity; // true
Infinity - Infinity; // NaN (indeterminado!)

// Multiplicação
Infinity * 2 === Infinity; // true
Infinity * Infinity === Infinity; // true
Infinity * 0; // NaN

// Divisão
10 / Infinity === 0; // true
Infinity / Infinity; // NaN

// Comparações
Infinity > 999999999999; // true
Infinity === Infinity; // true
-Infinity < Infinity; // true
```

---

### 🎨 Visualização: -Infinity vs Infinity

```javascript
const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];
const minRight1 = partition1 === m ? Infinity : nums1[partition1];
```

**Cenário 1: Partição no INÍCIO (partition1 = 0)**

```
nums1: [] | [1, 3, 5]
       ^
       Não há nada à esquerda!

maxLeft1 = -Infinity (menor que qualquer número)

Por quê? Para que a comparação funcione:
maxLeft1 ≤ minRight2
-∞ ≤ qualquer_coisa → SEMPRE true!
```

**Cenário 2: Partição no FINAL (partition1 = m)**

```
nums1: [1, 3, 5] | []
                   ^
                   Não há nada à direita!

minRight1 = Infinity (maior que qualquer número)

Por quê? Para que a comparação funcione:
maxLeft2 ≤ minRight1
qualquer_coisa ≤ ∞ → SEMPRE true!
```

---

### ⚠️ Cuidados ao Usar Infinity

```javascript
// ✅ FUNCIONA
const arr = [1, 2, 3, Infinity];
Math.max(...arr); // Infinity

// ⚠️ CUIDADO
Infinity - Infinity; // NaN (não é zero!)
Infinity / Infinity; // NaN
Infinity * 0; // NaN

// ✅ VERIFICAR SE É INFINITO
console.log(isFinite(10)); // true
console.log(isFinite(Infinity)); // false
console.log(isFinite(-Infinity)); // false
```

---

### 📚 Resumo: Quando Usar Infinity

| Situação                     | Use Infinity                | Exemplo                  |
| ---------------------------- | --------------------------- | ------------------------ |
| **Array vazio à direita**    | `Infinity`                  | `minRight = Infinity`    |
| **Array vazio à esquerda**   | `-Infinity`                 | `maxLeft = -Infinity`    |
| **Buscar menor valor**       | Inicializar com `Infinity`  | `let min = Infinity`     |
| **Buscar maior valor**       | Inicializar com `-Infinity` | `let max = -Infinity`    |
| **Representar "sem limite"** | `Infinity`                  | `maxDistance = Infinity` |

---

## ⏱️ Complexidade de Tempo e Espaço

### 🎯 O Que é Big O?

**Big O** mede como o **tempo de execução** ou **uso de memória** cresce quando a entrada aumenta.

```
Pergunta: "Se eu dobrar o tamanho da entrada, quanto mais lento fica?"

O(1)      → Não muda nada!
O(log n)  → Cresce um pouquinho
O(n)      → Dobra o tempo
O(n log n) → Mais que dobra
O(n²)     → Quadruplica! 😱
```

---

### 📊 Tabela de Complexidades (Do Melhor para o Pior)

| Complexidade   | Nome         | Descrição                            | Exemplo do Dia a Dia                        |
| -------------- | ------------ | ------------------------------------ | ------------------------------------------- |
| **O(1)**       | Constante    | Tempo fixo, não importa o tamanho    | Pegar um livro da mesa                      |
| **O(log n)**   | Logarítmica  | Dobra o tamanho, aumenta pouquinho   | Achar palavra no dicionário (Busca Binária) |
| **O(n)**       | Linear       | Dobra o tamanho, dobra o tempo       | Ler um livro página por página              |
| **O(n log n)** | Linearítmica | Um pouco pior que linear             | Ordenar cartas de baralho eficientemente    |
| **O(n²)**      | Quadrática   | Dobra o tamanho, quadruplica o tempo | Comparar cada item com todos os outros      |
| **O(2ⁿ)**      | Exponencial  | MUITO LENTO                          | Calcular Fibonacci recursivamente           |

---

### 🎨 Visualização de Crescimento

```
Input Size (n) →

    O(1):       ▂▂▂▂▂▂▂▂▂▂  (sempre igual)
    O(log n):   ▂▃▃▄▄▅▅▆▆▆  (cresce devagar)
    O(n):       ▂▃▄▅▆▇███  (linear)
    O(n log n): ▂▄▆▇████  (um pouco pior)
    O(n²):      ▂▅███████  (explode!)
    O(2ⁿ):      ▃█████████████ (CATASTRÓFICO!)
```

---

### 📈 Comparação Numérica

| n           | O(1) | O(log n) | O(n)    | O(n log n) | O(n²)          |
| ----------- | ---- | -------- | ------- | ---------- | -------------- |
| **10**      | 1    | 3        | 10      | 30         | 100            |
| **100**     | 1    | 7        | 100     | 700        | 10.000         |
| **1.000**   | 1    | 10       | 1.000   | 10.000     | 1.000.000      |
| **10.000**  | 1    | 13       | 10.000  | 130.000    | 100.000.000    |
| **100.000** | 1    | 17       | 100.000 | 1.700.000  | 10.000.000.000 |

**Interpretação:**

```
Com n = 100.000:

O(1):       1 operação          → 0.000001 seg
O(log n):   17 operações        → 0.00002 seg
O(n):       100.000 operações   → 0.1 seg
O(n log n): 1.700.000 ops       → 1.7 seg
O(n²):      10 bilhões ops      → 2.8 HORAS! 😱
```

---

## 🧠 Como Calcular Complexidade Intuitivamente

### Regra de Ouro: **CONTE OS LOOPS!**

---

### 1️⃣ **Regra do Loop Simples → O(n)**

```typescript
// EXEMPLO 1: Um loop
function somarArray(arr: number[]): number {
  let soma = 0;
  for (let i = 0; i < arr.length; i++) {
    // Loop de n
    soma += arr[i];
  }
  return soma;
}
// Complexidade: O(n)
```

**Por quê?** Percorre o array UMA vez.

```
n = 10   → 10 iterações
n = 100  → 100 iterações
n = 1000 → 1000 iterações

Tempo cresce linearmente!
```

---

### 2️⃣ **Regra do Acesso Direto → O(1)**

```typescript
// EXEMPLO 2: Acesso direto
function primeiroElemento(arr: number[]): number {
  return arr[0]; // Acesso direto
}
// Complexidade: O(1)
```

**Por quê?** Não importa se o array tem 10 ou 1 milhão de elementos, sempre pega o primeiro instantaneamente!

---

### 3️⃣ **Regra do Loop Aninhado → O(n²)**

```typescript
// EXEMPLO 3: Loop dentro de loop
function temDuplicatas(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    // Loop externo: n vezes
    for (let j = i + 1; j < arr.length; j++) {
      // Loop interno: n vezes
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
// Complexidade: O(n²)
```

**Por quê?** Para CADA elemento, você percorre TODOS os outros!

```
n = 10   → 10 × 10 = 100 comparações
n = 100  → 100 × 100 = 10.000 comparações
n = 1000 → 1000 × 1000 = 1.000.000 comparações!
```

---

### 4️⃣ **Regra do "Dividir pela Metade" → O(log n)**

```typescript
// EXEMPLO 4: Binary Search
function buscaBinaria(arr: number[], alvo: number): number {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (arr[mid] === alvo) return mid;

    if (arr[mid] < alvo) {
      low = mid + 1; // Descarta metade esquerda
    } else {
      high = mid - 1; // Descarta metade direita
    }
  }
  return -1;
}
// Complexidade: O(log n)
```

**Por quê?** A cada iteração, você ELIMINA metade das opções!

```
n = 1000:
Iteração 1: 1000 opções
Iteração 2: 500 opções  (dividiu por 2)
Iteração 3: 250 opções  (dividiu por 2)
Iteração 4: 125 opções  (dividiu por 2)
...
Iteração 10: 1 opção (ACHOU!)

log₂(1000) ≈ 10 iterações
```

---

### 5️⃣ **Regra dos Loops Independentes → O(n + m)**

```typescript
// EXEMPLO 5: Dois loops separados
function processarArrays(arr1: number[], arr2: number[]): void {
  // Loop 1: percorre arr1
  for (let item of arr1) {
    // n iterações
    console.log(item);
  }

  // Loop 2: percorre arr2
  for (let item of arr2) {
    // m iterações
    console.log(item);
  }
}
// Complexidade: O(n + m)
```

**Por quê?** Você percorre arr1 (n vezes) E arr2 (m vezes), mas NÃO um dentro do outro!

---

### 6️⃣ **Regra do Método Nativo `.sort()` → O(n log n)**

```typescript
// EXEMPLO 6: Ordenação
function ordenarArray(arr: number[]): number[] {
  return arr.sort((a, b) => a - b); // Usa algoritmo eficiente
}
// Complexidade: O(n log n)
```

**Por quê?** O JavaScript usa algoritmos como TimSort ou QuickSort, que são O(n log n).

---

### 🎯 Dica Visual: Identifique o Padrão

```typescript
// O(1) - SEM LOOP
function exemplo1(arr) {
    return arr[0];
}

// O(n) - UM LOOP
function exemplo2(arr) {
    for (let i...) { }
}

// O(n²) - LOOP DENTRO DE LOOP
function exemplo3(arr) {
    for (let i...) {
        for (let j...) { }
    }
}

// O(log n) - DIVIDE PELA METADE
function exemplo4(arr) {
    while (low <= high) {
        mid = (low + high) / 2;
        // ... descarta metade
    }
}

// O(n log n) - SORT OU RECURSÃO COM DIVISÃO
function exemplo5(arr) {
    arr.sort();  // ou merge sort recursivo
}
```

---

## 📐 Entendendo O(log(m+n))

### 🤔 O Que Significa?

```
O(log(m+n)) = Binary Search no universo total de (m+n) elementos
```

**Contexto:** Dois arrays

- Array A: m elementos
- Array B: n elementos
- **Total:** m + n elementos

---

### 🎯 Analogia: Dois Dicionários

```
🇧🇷 Dicionário Português: 1000 palavras (m)
🇺🇸 Dicionário Inglês: 500 palavras (n)

Se você JUNTAR os dois: 1500 palavras (m+n)

O(log(m+n)) = Busca binária no "super dicionário" de 1500 palavras
             = log₂(1500) ≈ 11 iterações

O(log(min(m,n))) = Busca apenas no menor (Inglês)
                  = log₂(500) ≈ 9 iterações (MAIS RÁPIDO!)
```

---

### 📊 Comparação: O(log(m+n)) vs O(log(min(m,n)))

| Tamanhos        | O(log(m+n))     | O(log(min(m,n))) | Diferença          |
| --------------- | --------------- | ---------------- | ------------------ |
| m=10, n=10      | log(20)≈4       | log(10)≈3        | ✅ Parecido        |
| m=100, n=100    | log(200)≈8      | log(100)≈7       | ✅ Parecido        |
| m=1000, n=10    | log(1010)≈10    | log(10)≈3        | 🎯 3x mais rápido! |
| m=1000000, n=10 | log(1000010)≈20 | log(10)≈3        | 🚀 7x mais rápido! |

---

### 🔍 Visualização do Algoritmo

```
nums1 = [1, 3, 5]  (m=3)
nums2 = [2, 4, 6, 8, 10]  (n=5)

Total: m+n = 8 elementos

ABORDAGEM 1: O(log(m+n))
"Vou buscar no universo de 8 elementos"
log₂(8) = 3 iterações

ABORDAGEM 2: O(log(min(m,n)))
"Vou buscar apenas em nums1 (o menor, m=3)"
log₂(3) ≈ 2 iterações ← MAIS RÁPIDO!

Por quê? Porque ao fazer a busca binária APENAS no array menor,
eu ainda consigo calcular automaticamente a partição do array maior!
```

---

### 🧮 Como Calcular Intuitivamente?

#### Pergunta 1: "Onde está acontecendo a busca binária?"

```typescript
// Se vejo isso:
while (low <= high) {
  partition1 = Math.floor((low + high) / 2); // Divide pela metade
  // ...
}
```

✅ **Conclusão:** É O(log algo)!

#### Pergunta 2: "Qual é o tamanho do espaço de busca?"

```typescript
// Opção A: Busca em AMBOS os arrays
let low = 0;
let high = m + n; // ← Espaço total!
// Resposta: O(log(m+n))

// Opção B: Busca apenas no menor
let low = 0;
let high = m; // ← Apenas nums1 (o menor)!
// Resposta: O(log(min(m,n)))
```

---

### 📚 Por Que O(log(min(m,n))) é Melhor?

```
Exemplo extremo:

Array 1: 10 elementos
Array 2: 1.000.000 elementos

O(log(m+n)):
→ Busca no espaço de 1.000.010 elementos
→ log₂(1.000.010) ≈ 20 iterações

O(log(min(m,n))):
→ Busca apenas nos 10 elementos
→ log₂(10) ≈ 3 iterações

Diferença: 7x mais rápido! 🚀
```

**Truque usado no código:**

```typescript
// Garante que nums1 é sempre o MENOR
if (nums1.length > nums2.length) {
  [nums1, nums2] = [nums2, nums1]; // Swap!
}

// Agora a busca binária em nums1 é O(log(min(m,n)))!
let low = 0;
let high = nums1.length; // Sempre o menor!
```

---

## 🎮 Exemplos Práticos de Complexidade

### Exemplo 1: Two Sum (Hash Map)

```typescript
function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    // Loop de n
    const complement = target - nums[i];

    if (map.has(complement)) {
      // O(1)
      return [map.get(complement)!, i];
    }

    map.set(nums[i], i); // O(1)
  }

  return [];
}
```

**Análise:**

- **Tempo:** O(n) - um loop, operações O(1) dentro
- **Espaço:** O(n) - Map pode ter até n elementos

---

### Exemplo 2: Bubble Sort (Ingênuo)

```typescript
function bubbleSort(arr: number[]): number[] {
  for (let i = 0; i < arr.length; i++) {
    // Loop 1: n vezes
    for (let j = 0; j < arr.length - i - 1; j++) {
      // Loop 2: n vezes
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

**Análise:**

- **Tempo:** O(n²) - loop dentro de loop
- **Espaço:** O(1) - ordena no próprio array

---

### Exemplo 3: Merge de Arrays Ordenados

```typescript
function mergeArrays(nums1: number[], nums2: number[]): number[] {
  const merged: number[] = [];
  let i = 0,
    j = 0;

  // Percorre ambos os arrays UMA vez
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i++]);
    } else {
      merged.push(nums2[j++]);
    }
  }

  // Adiciona restos
  while (i < nums1.length) merged.push(nums1[i++]);
  while (j < nums2.length) merged.push(nums2[j++]);

  return merged;
}
```

**Análise:**

- **Tempo:** O(m + n) - percorre cada array uma vez
- **Espaço:** O(m + n) - cria novo array com todos os elementos

---

### Exemplo 4: Mediana com Binary Search

```typescript
function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  let low = 0;
  let high = nums1.length;

  while (low <= high) {
    // Busca binária!
    const partition1 = Math.floor((low + high) / 2);
    // ... resto do código
  }
}
```

**Análise:**

- **Tempo:** O(log(min(m, n))) - busca binária no menor array
- **Espaço:** O(1) - apenas variáveis

---

## 🎯 Checklist de Análise de Complexidade

Use este checklist para analisar qualquer código:

### Para Complexidade de TEMPO:

- [ ] **Tem loop único?** → Provavelmente O(n)
- [ ] **Loop dentro de loop?** → Provavelmente O(n²)
- [ ] **Divide pela metade?** → Provavelmente O(log n)
- [ ] **Usa .sort()?** → O(n log n)
- [ ] **Apenas acessos diretos?** → O(1)
- [ ] **Recursão?** → Depende (pode ser O(n), O(log n), ou O(2ⁿ))

### Para Complexidade de ESPAÇO:

- [ ] **Cria novo array do tamanho da entrada?** → O(n)
- [ ] **Cria estrutura proporcional à entrada?** → O(n)
- [ ] **Apenas variáveis simples?** → O(1)
- [ ] **Recursão?** → O(profundidade da recursão)

---

## 🎓 Regras de Simplificação do Big O

### 1️⃣ **Ignore Constantes**

```typescript
// Código com constantes
function exemplo(arr: number[]): number {
  let soma1 = 0;
  let soma2 = 0;

  for (let i = 0; i < arr.length; i++) {
    // n
    soma1 += arr[i];
  }

  for (let i = 0; i < arr.length; i++) {
    // n
    soma2 += arr[i];
  }

  return soma1 + soma2;
}

// Análise ingênua: O(2n)
// Análise correta: O(n) ← Ignore o "2"!
```

---

### 2️⃣ **Pegue o Termo Dominante**

```typescript
// Código complexo
function exemplo(arr: number[]): void {
  // Parte 1: O(n)
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }

  // Parte 2: O(n²)
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}

// Análise ingênua: O(n + n²)
// Análise correta: O(n²) ← n² domina n!
```

**Por quê?**

```
n = 1000

n = 1.000
n² = 1.000.000

n é IRRELEVANTE perto de n²!
```

---

### 3️⃣ **Loops Independentes Somam**

```typescript
function exemplo(arr1: number[], arr2: number[]): void {
  for (let x of arr1) {
  } // O(m)
  for (let y of arr2) {
  } // O(n)
}
// Resultado: O(m + n)
```

---

### 4️⃣ **Loops Aninhados Multiplicam**

```typescript
function exemplo(arr1: number[], arr2: number[]): void {
  for (let x of arr1) {
    // O(m)
    for (let y of arr2) {
      // O(n)
      // ...
    }
  }
}
// Resultado: O(m × n)
```

---

## 💡 Dicas Finais

### ✅ Para Calcular Complexidade:

1. **Olhe para os loops primeiro**
2. **Identifique se divide pela metade**
3. **Conte quantos níveis de aninhamento**
4. **Ignore constantes e termos menores**

### ✅ Para Memorizar:

```
O(1)      = Sem loop
O(log n)  = Divide pela metade
O(n)      = Um loop
O(n log n) = Sort ou recursão com divisão
O(n²)     = Loop dentro de loop
```

### ✅ Quando Usar Infinity:

```
-Infinity = "Não há nada à esquerda"
Infinity  = "Não há nada à direita"
```

---

## 🎯 Exercícios para Praticar

Qual a complexidade destes códigos?

```typescript
// Exercício 1
function ex1(arr: number[]): number {
  return arr[arr.length - 1];
}
// Resposta: O(1)

// Exercício 2
function ex2(arr: number[]): number {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
// Resposta: O(n)

// Exercício 3
function ex3(arr: number[]): void {
  arr.sort((a, b) => a - b);
}
// Resposta: O(n log n)

// Exercício 4
function ex4(arr: number[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
// Resposta: O(n²)
```

---

**🎓 Conclusão:** A prática leva à perfeição! Quanto mais você analisar código, mais natural será identificar complexidade intuitivamente! 🚀
