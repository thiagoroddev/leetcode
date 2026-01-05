# LeetCode 6: Zigzag Conversion - Todas as Soluções em JavaScript

## 📋 Descrição do Problema

Dada uma string `s` e um número inteiro `numRows`, arranjar os caracteres de `s` em um padrão zigzag com o número especificado de linhas e então lê-los linha por linha.

**Exemplo Visual:**

```
String: "PAYPALISHIRING", numRows = 3

P   A   H   N
A P L S I I G
Y   I   R

Output: "PAHNAPLSIIGYIR"
```

**Exemplo com 4 linhas:**

```
String: "PAYPALISHIRING", numRows = 4

P     I     N
A   L S   I G
Y A   H R
P     I

Output: "PINALSIGYAHRPI"
```

---

## 🏆 Solução 1: Fórmula Matemática (Padrão de Índices)

**Complexidade:**

- ⏱️ **Tempo:** O(n) - onde n é o tamanho da string
- 💾 **Espaço:** O(1) - apenas variáveis auxiliares (não conta o output)

**Dificuldade:** ⭐⭐⭐⭐⭐ (Difícil)

**Conceitos Necessários:**

- Matemática e reconhecimento de padrões
- Manipulação de strings
- Loops aninhados
- Análise de sequências numéricas

### Explicação

Esta é a solução mais eficiente. Ao invés de simular o movimento zigzag, observamos o padrão matemático dos índices:

**Padrão descoberto:**

- Cada "ciclo" completo tem tamanho: `step = 2 * numRows - 2`
- Para a primeira linha: caracteres nos índices `0, step, 2*step, 3*step...`
- Para a última linha: caracteres nos índices `numRows-1, numRows-1+step, numRows-1+2*step...`
- Para linhas do meio (i):
  - Caracteres principais: `i, i+step, i+2*step...`
  - Caracteres diagonais: `i+step-2*i, i+2*step-2*i...`

```javascript
var convert = function (s, numRows) {
  // Casos base
  if (numRows === 1 || numRows >= s.length) {
    return s;
  }

  let result = "";
  const step = 2 * numRows - 2; // Tamanho do ciclo completo

  // Iterar por cada linha
  for (let row = 0; row < numRows; row++) {
    // Para cada caractere na linha atual
    for (let index = row; index < s.length; index += step) {
      result += s[index];

      // Adicionar caracteres diagonais (apenas para linhas do meio)
      const diagonalIndex = index + step - 2 * row;
      if (row !== 0 && row !== numRows - 1 && diagonalIndex < s.length) {
        result += s[diagonalIndex];
      }
    }
  }

  return result;
};

// Testes
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
console.log(convert("A", 1)); // "A"
```

**Vantagens:**

- ✅ Mais eficiente em espaço (O(1) auxiliar)
- ✅ Não precisa criar estruturas auxiliares
- ✅ Acesso direto aos caracteres

**Desvantagens:**

- ❌ Difícil de entender e desenvolver
- ❌ Requer análise matemática do padrão
- ❌ Difícil de debugar

---

## 🥈 Solução 2: Simulação com Array de Strings

**Complexidade:**

- ⏱️ **Tempo:** O(n) - onde n é o tamanho da string
- 💾 **Espaço:** O(n) - array de strings para armazenar cada linha

**Dificuldade:** ⭐⭐⭐ (Médio)

**Conceitos Necessários:**

- Arrays
- Manipulação de strings
- Controle de direção (flag booleana)
- Loop simples

### Explicação

Simulamos o movimento zigzag mantendo um array onde cada posição representa uma linha. Percorremos a string e vamos adicionando cada caractere na linha apropriada, mudando a direção quando chegamos ao topo ou ao fundo.

```javascript
var convert = function (s, numRows) {
  // Casos base
  if (numRows === 1 || numRows >= s.length) {
    return s;
  }

  // Array para armazenar cada linha
  const rows = Array(numRows).fill("");

  let currentRow = 0;
  let goingDown = false;

  // Percorrer cada caractere da string
  for (let char of s) {
    rows[currentRow] += char;

    // Mudar direção quando atingir topo ou fundo
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    // Mover para próxima linha
    currentRow += goingDown ? 1 : -1;
  }

  // Concatenar todas as linhas
  return rows.join("");
};

// Testes
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
console.log(convert("AB", 1)); // "AB"
```

**Vantagens:**

- ✅ Fácil de entender e implementar
- ✅ Intuitivo - simula o processo real
- ✅ Fácil de debugar
- ✅ Código limpo e legível

**Desvantagens:**

- ❌ Usa espaço O(n) para o array auxiliar
- ❌ Múltiplas concatenações de strings

---

## 🥉 Solução 3: Simulação com Array de Arrays

**Complexidade:**

- ⏱️ **Tempo:** O(n) - onde n é o tamanho da string
- 💾 **Espaço:** O(n) - array de arrays para cada linha

**Dificuldade:** ⭐⭐⭐ (Médio)

**Conceitos Necessários:**

- Arrays multidimensionais
- Manipulação de arrays
- Controle de direção
- Métodos de array (join, map)

### Explicação

Similar à Solução 2, mas usa arrays de caracteres ao invés de concatenação de strings. Isso pode ser mais eficiente em algumas engines JavaScript, pois evita criar múltiplas strings intermediárias.

```javascript
var convert = function (s, numRows) {
  // Casos base
  if (numRows === 1 || numRows >= s.length) {
    return s;
  }

  // Array de arrays para cada linha
  const rows = Array.from({length: numRows}, () => []);

  let currentRow = 0;
  let goingDown = false;

  // Percorrer cada caractere
  for (let char of s) {
    rows[currentRow].push(char);

    // Mudar direção
    if (currentRow === 0 || currentRow === numRows - 1) {
      goingDown = !goingDown;
    }

    currentRow += goingDown ? 1 : -1;
  }

  // Concatenar arrays em string
  return rows.map((row) => row.join("")).join("");
};

// Testes
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
console.log(convert("A", 1)); // "A"
```

**Vantagens:**

- ✅ Pode ser mais eficiente que concatenação de strings
- ✅ Fácil de visualizar e debugar
- ✅ Estrutura clara

**Desvantagens:**

- ❌ Usa mais memória que strings
- ❌ Requer conversão final de arrays para string

---

## 🔧 Solução 4: Simulação com StringBuilder (Approach Alternativo)

**Complexidade:**

- ⏱️ **Tempo:** O(n) - onde n é o tamanho da string
- 💾 **Espaço:** O(n) - para armazenar as linhas

**Dificuldade:** ⭐⭐⭐ (Médio)

**Conceitos Necessários:**

- Arrays de objetos
- Estruturas de dados customizadas
- Manipulação de strings

### Explicação

Usa uma abordagem mais orientada a objetos, criando uma estrutura que simula um StringBuilder para cada linha.

```javascript
var convert = function (s, numRows) {
  if (numRows === 1 || numRows >= s.length) {
    return s;
  }

  // Criar array de StringBuilders (simulado com objetos)
  const rows = Array.from({length: numRows}, () => ({
    chars: [],
    append(char) {
      this.chars.push(char);
    },
    toString() {
      return this.chars.join("");
    },
  }));

  let currentRow = 0;
  let step = 1; // 1 = descendo, -1 = subindo

  for (let char of s) {
    rows[currentRow].append(char);

    // Inverter direção nos extremos
    if (currentRow === 0) {
      step = 1;
    } else if (currentRow === numRows - 1) {
      step = -1;
    }

    currentRow += step;
  }

  return rows.map((row) => row.toString()).join("");
};

// Testes
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
```

**Vantagens:**

- ✅ Abordagem mais estruturada
- ✅ Fácil de estender com funcionalidades

**Desvantagens:**

- ❌ Overhead de criar objetos
- ❌ Mais complexo que necessário
- ❌ Não oferece vantagem real de performance

---

## ❌ Solução 5: Simulação Ingênua com Loops Aninhados

**Complexidade:**

- ⏱️ **Tempo:** O(n \* m) - onde n é tamanho da string e m é numRows
- 💾 **Espaço:** O(n)

**Dificuldade:** ⭐⭐ (Fácil de implementar, mas ineficiente)

**Conceitos Necessários:**

- Loops aninhados
- Arrays
- Controle de fluxo básico

### Explicação

Esta é uma solução menos eficiente que usa loops aninhados separados para simular a descida e subida do padrão zigzag. É a versão mais "crua" da simulação.

```javascript
var convert = function (s, numRows) {
  if (numRows === 1 || numRows >= s.length) {
    return s;
  }

  const rows = Array(numRows).fill("");
  let currentRow = 0;
  let i = 0;

  // Loop principal
  while (i < s.length) {
    // Fase de descida
    while (i < s.length && currentRow < numRows) {
      rows[currentRow] += s[i];
      currentRow++;
      i++;
    }

    currentRow = numRows - 2; // Volta para penúltima linha

    // Fase de subida
    while (i < s.length && currentRow > 0) {
      rows[currentRow] += s[i];
      currentRow--;
      i++;
    }

    currentRow = 1; // Próximo ciclo começa na segunda linha
  }

  return rows.join("");
};

// Testes
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
```

**Vantagens:**

- ✅ Fácil de pensar inicialmente

**Desvantagens:**

- ❌ Código mais verboso
- ❌ Difícil de manter e entender
- ❌ Mais propenso a bugs de índice
- ❌ Menos eficiente

---

## 🚫 Solução 6: Força Bruta com Matriz 2D (PIOR SOLUÇÃO)

**Complexidade:**

- ⏱️ **Tempo:** O(n \* m) - onde n é tamanho da string e m é numRows
- 💾 **Espaço:** O(n \* numCols) - matriz completa

**Dificuldade:** ⭐ (Fácil, mas muito ineficiente)

**Conceitos Necessários:**

- Matrizes 2D
- Loops aninhados
- Cálculo de dimensões

### Explicação

Esta é a solução mais ineficiente possível. Cria uma matriz 2D completa para simular visualmente o padrão zigzag, depois lê linha por linha.

```javascript
var convert = function (s, numRows) {
  if (numRows === 1 || numRows >= s.length) {
    return s;
  }

  // Calcular número de colunas necessárias
  const cycleLen = 2 * numRows - 2;
  const numCycles = Math.ceil(s.length / cycleLen);
  const numCols = numCycles * (numRows - 1);

  // Criar matriz
  const matrix = Array.from({length: numRows}, () => Array(numCols).fill(""));

  let charIndex = 0;
  let col = 0;

  // Preencher matriz
  while (charIndex < s.length) {
    // Descer
    for (let row = 0; row < numRows && charIndex < s.length; row++) {
      matrix[row][col] = s[charIndex++];
    }
    col++;

    // Subir na diagonal
    for (let row = numRows - 2; row > 0 && charIndex < s.length; row--) {
      matrix[row][col] = s[charIndex++];
      col++;
    }
  }

  // Ler linha por linha
  let result = "";
  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (matrix[row][col] !== "") {
        result += matrix[row][col];
      }
    }
  }

  return result;
};

// Testes
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"
```

**Vantagens:**

- ✅ Visualmente mais próximo do problema
- ✅ Fácil de visualizar em debug

**Desvantagens:**

- ❌ MUITO ineficiente em espaço
- ❌ Cria uma matriz enorme com muitos espaços vazios
- ❌ Complexidade desnecessária
- ❌ Não passa em casos de teste grandes por timeout
- ❌ Desperdício massivo de memória

---

## 📊 Comparação das Soluções

| Solução                  | Tempo   | Espaço  | Dificuldade | Legibilidade | Recomendação     |
| ------------------------ | ------- | ------- | ----------- | ------------ | ---------------- |
| 1. Fórmula Matemática    | O(n)    | O(1)    | ⭐⭐⭐⭐⭐  | ⭐⭐         | ✅ Produção      |
| 2. Simulação com Strings | O(n)    | O(n)    | ⭐⭐⭐      | ⭐⭐⭐⭐⭐   | ✅ Entrevistas   |
| 3. Simulação com Arrays  | O(n)    | O(n)    | ⭐⭐⭐      | ⭐⭐⭐⭐     | ✅ Alternativa   |
| 4. StringBuilder Custom  | O(n)    | O(n)    | ⭐⭐⭐      | ⭐⭐⭐       | ⚠️ Desnecessário |
| 5. Loops Aninhados       | O(n\*m) | O(n)    | ⭐⭐        | ⭐⭐         | ❌ Não usar      |
| 6. Matriz 2D             | O(n\*m) | O(n\*m) | ⭐          | ⭐           | ❌ NUNCA usar    |

---

## 🎯 Qual Solução Usar?

### Para Entrevistas Técnicas:

**Use a Solução 2 (Simulação com Array de Strings)**

- É intuitiva e fácil de explicar
- Demonstra compreensão clara do problema
- Código limpo e legível
- Complexidade adequada O(n)

### Para Código de Produção:

**Use a Solução 1 (Fórmula Matemática)**

- Mais eficiente em espaço O(1)
- Performance ligeiramente melhor
- Menos alocações de memória

### Para Aprendizado:

**Comece com a Solução 2, depois evolua para a Solução 1**

- Entenda primeiro a lógica da simulação
- Depois analise o padrão matemático
- Finalmente implemente a fórmula otimizada

---

## 💡 Dicas de Otimização

1. **Casos Base:** Sempre trate `numRows === 1` ou `numRows >= s.length` primeiro
2. **Evite Concatenação Excessiva:** Em JavaScript, concatenar strings repetidamente pode ser lento
3. **Use Array.join():** Mais eficiente que múltiplas concatenações com `+`
4. **Analise Padrões:** Muitos problemas de string têm padrões matemáticos escondidos

---

## 🧪 Casos de Teste Importantes

```javascript
// Caso 1: String pequena
console.log(convert("A", 1)); // "A"

// Caso 2: numRows = 1 (sem zigzag)
console.log(convert("ABCDEF", 1)); // "ABCDEF"

// Caso 3: numRows >= length (linha única)
console.log(convert("AB", 3)); // "AB"

// Caso 4: Exemplo clássico
console.log(convert("PAYPALISHIRING", 3)); // "PAHNAPLSIIGYIR"

// Caso 5: 4 linhas
console.log(convert("PAYPALISHIRING", 4)); // "PINALSIGYAHRPI"

// Caso 6: String longa
console.log(convert("ABCDEFGHIJKLMNOP", 5));
```

---

## 📚 Conceitos Fundamentais para Dominar

### Iniciante:

- Arrays e manipulação de strings
- Loops (for, while)
- Condicionais (if/else)

### Intermediário:

- Controle de direção com flags
- Array methods (fill, join, map)
- Otimização de concatenação de strings

### Avançado:

- Análise de padrões matemáticos
- Cálculo de complexidade
- Otimização de espaço/tempo trade-offs

---

## 🎓 Conclusão

O problema **Zigzag Conversion** é excelente para praticar:

- ✅ Manipulação de strings
- ✅ Simulação de padrões
- ✅ Análise matemática
- ✅ Trade-offs de otimização

A melhor abordagem depende do contexto: simplicidade para entrevistas, eficiência para produção. Dominar ambas as soluções (2 e 1) é o ideal!

---

**Boa sorte nos seus estudos! 🚀**
