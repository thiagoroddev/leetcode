# Debug Detalhado: Expand Around Center

## 🎯 Caso de Teste: `"aaaaaaaaaa"`

Vamos simular **passo a passo** como o algoritmo **Expand Around Center** processa a string `"aaaaaaaaaa"` (10 letras 'a').

---

## 📝 Código do Algoritmo

```javascript
function longestPalindrome(s) {
  if (!s || s.length === 0) return "";

  let start = 0; // Início do maior palíndromo
  let maxLen = 0; // Tamanho do maior palíndromo

  // Função que expande em torno de um centro
  function expandAroundCenter(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    // Retorna o tamanho do palíndromo encontrado
    return right - left - 1;
  }

  // Para cada posição, tenta expandir como centro
  for (let i = 0; i < s.length; i++) {
    // Caso 1: Palíndromo de tamanho ÍMPAR (centro em 1 caractere)
    const len1 = expandAroundCenter(i, i);

    // Caso 2: Palíndromo de tamanho PAR (centro entre 2 caracteres)
    const len2 = expandAroundCenter(i, i + 1);

    // Pega o maior dos dois
    const len = Math.max(len1, len2);

    // Se encontrou um palíndromo maior, atualiza
    if (len > maxLen) {
      maxLen = len;
      start = i - Math.floor((len - 1) / 2);
    }
  }

  return s.substring(start, start + maxLen);
}
```

---

## 🔍 Simulação Completa

### **Input:** `s = "aaaaaaaaaa"`

**Índices:**

```
Posição: 0 1 2 3 4 5 6 7 8 9
String:  a a a a a a a a a a
```

**Estado Inicial:**

```javascript
start = 0;
maxLen = 0;
```

---

## 🚀 Iteração por Iteração

### **i = 0** (primeira letra 'a')

#### **Teste 1: Palíndromo ÍMPAR** `expandAroundCenter(0, 0)`

```
Tentando expandir em torno do índice 0:

Iteração 1:
  left=0, right=0
  s[0]='a' === s[0]='a' ✅
  Expande: left=-1, right=1

Iteração 2:
  left=-1 (fora dos limites) ❌
  Para!

Retorna: right - left - 1 = 1 - (-1) - 1 = 1
Palíndromo encontrado: "a" (tamanho 1)
```

#### **Teste 2: Palíndromo PAR** `expandAroundCenter(0, 1)`

```
Tentando expandir entre índices 0 e 1:

Iteração 1:
  left=0, right=1
  s[0]='a' === s[1]='a' ✅
  Expande: left=-1, right=2

Iteração 2:
  left=-1 (fora dos limites) ❌
  Para!

Retorna: right - left - 1 = 2 - (-1) - 1 = 2
Palíndromo encontrado: "aa" (tamanho 2)
```

#### **Atualização:**

```javascript
len = Math.max(1, 2) = 2
len (2) > maxLen (0) ✅

maxLen = 2
start = 0 - Math.floor((2-1)/2) = 0 - 0 = 0

Maior palíndromo até agora: s.substring(0, 2) = "aa"
```

**Estado após i=0:**

```javascript
start = 0;
maxLen = 2;
melhorPalindromo = "aa";
```

---

### **i = 1** (segunda letra 'a')

#### **Teste 1: Palíndromo ÍMPAR** `expandAroundCenter(1, 1)`

```
Tentando expandir em torno do índice 1:

Iteração 1:
  left=1, right=1
  s[1]='a' === s[1]='a' ✅
  Expande: left=0, right=2

Iteração 2:
  left=0, right=2
  s[0]='a' === s[2]='a' ✅
  Expande: left=-1, right=3

Iteração 3:
  left=-1 (fora dos limites) ❌
  Para!

Retorna: 3 - (-1) - 1 = 3
Palíndromo encontrado: "aaa" (tamanho 3)
```

#### **Teste 2: Palíndromo PAR** `expandAroundCenter(1, 2)`

```
Tentando expandir entre índices 1 e 2:

Iteração 1:
  left=1, right=2
  s[1]='a' === s[2]='a' ✅
  Expande: left=0, right=3

Iteração 2:
  left=0, right=3
  s[0]='a' === s[3]='a' ✅
  Expande: left=-1, right=4

Iteração 3:
  left=-1 (fora dos limites) ❌
  Para!

Retorna: 4 - (-1) - 1 = 4
Palíndromo encontrado: "aaaa" (tamanho 4)
```

#### **Atualização:**

```javascript
len = Math.max(3, 4) = 4
len (4) > maxLen (2) ✅

maxLen = 4
start = 1 - Math.floor((4-1)/2) = 1 - 1 = 0

Maior palíndromo até agora: s.substring(0, 4) = "aaaa"
```

**Estado após i=1:**

```javascript
start = 0;
maxLen = 4;
melhorPalindromo = "aaaa";
```

---

### **i = 2** (terceira letra 'a')

#### **Teste 1: Palíndromo ÍMPAR** `expandAroundCenter(2, 2)`

```
Iteração 1: left=2, right=2 → s[2]='a' === s[2]='a' ✅
           Expande: left=1, right=3

Iteração 2: left=1, right=3 → s[1]='a' === s[3]='a' ✅
           Expande: left=0, right=4

Iteração 3: left=0, right=4 → s[0]='a' === s[4]='a' ✅
           Expande: left=-1, right=5

Iteração 4: left=-1 ❌ Para!

Retorna: 5 - (-1) - 1 = 5
Palíndromo: "aaaaa" (tamanho 5)
```

#### **Teste 2: Palíndromo PAR** `expandAroundCenter(2, 3)`

```
Iteração 1: left=2, right=3 → s[2]='a' === s[3]='a' ✅
           Expande: left=1, right=4

Iteração 2: left=1, right=4 → s[1]='a' === s[4]='a' ✅
           Expande: left=0, right=5

Iteração 3: left=0, right=5 → s[0]='a' === s[5]='a' ✅
           Expande: left=-1, right=6

Iteração 4: left=-1 ❌ Para!

Retorna: 6 - (-1) - 1 = 6
Palíndromo: "aaaaaa" (tamanho 6)
```

#### **Atualização:**

```javascript
len = Math.max(5, 6) = 6
len (6) > maxLen (4) ✅

maxLen = 6
start = 2 - Math.floor((6-1)/2) = 2 - 2 = 0

Maior palíndromo até agora: s.substring(0, 6) = "aaaaaa"
```

**Estado após i=2:**

```javascript
start = 0;
maxLen = 6;
melhorPalindromo = "aaaaaa";
```

---

### **i = 3** (quarta letra 'a')

#### **Teste 1: Palíndromo ÍMPAR** `expandAroundCenter(3, 3)`

```
Expande até os limites:
left: 3 → 2 → 1 → 0 → -1 ❌
right: 3 → 4 → 5 → 6 → 7

Retorna: 7 - (-1) - 1 = 7
Palíndromo: "aaaaaaa" (tamanho 7)
```

#### **Teste 2: Palíndromo PAR** `expandAroundCenter(3, 4)`

```
Expande até os limites:
left: 3 → 2 → 1 → 0 → -1 ❌
right: 4 → 5 → 6 → 7 → 8

Retorna: 8 - (-1) - 1 = 8
Palíndromo: "aaaaaaaa" (tamanho 8)
```

#### **Atualização:**

```javascript
len = Math.max(7, 8) = 8
len (8) > maxLen (6) ✅

maxLen = 8
start = 3 - Math.floor((8-1)/2) = 3 - 3 = 0

Maior palíndromo até agora: s.substring(0, 8) = "aaaaaaaa"
```

**Estado após i=3:**

```javascript
start = 0;
maxLen = 8;
melhorPalindromo = "aaaaaaaa";
```

---

### **i = 4** (quinta letra 'a' - CENTRO EXATO)

#### **Teste 1: Palíndromo ÍMPAR** `expandAroundCenter(4, 4)`

```
Expande simetricamente:

Iteração 1: left=4, right=4 → s[4]='a' === s[4]='a' ✅
Iteração 2: left=3, right=5 → s[3]='a' === s[5]='a' ✅
Iteração 3: left=2, right=6 → s[2]='a' === s[6]='a' ✅
Iteração 4: left=1, right=7 → s[1]='a' === s[7]='a' ✅
Iteração 5: left=0, right=8 → s[0]='a' === s[8]='a' ✅
Iteração 6: left=-1, right=9 → s[-1] ❌ Para!

Retorna: 9 - (-1) - 1 = 9
Palíndromo: "aaaaaaaaa" (tamanho 9)
```

#### **Teste 2: Palíndromo PAR** `expandAroundCenter(4, 5)`

```
Expande simetricamente:

Iteração 1: left=4, right=5 → s[4]='a' === s[5]='a' ✅
Iteração 2: left=3, right=6 → s[3]='a' === s[6]='a' ✅
Iteração 3: left=2, right=7 → s[2]='a' === s[7]='a' ✅
Iteração 4: left=1, right=8 → s[1]='a' === s[8]='a' ✅
Iteração 5: left=0, right=9 → s[0]='a' === s[9]='a' ✅
Iteração 6: left=-1, right=10 → left=-1 ❌ Para!

Retorna: 10 - (-1) - 1 = 10
Palíndromo: "aaaaaaaaaa" (tamanho 10) 🎯
```

#### **Atualização:**

```javascript
len = Math.max(9, 10) = 10
len (10) > maxLen (8) ✅

maxLen = 10
start = 4 - Math.floor((10-1)/2) = 4 - 4 = 0

Maior palíndromo até agora: s.substring(0, 10) = "aaaaaaaaaa"
```

**Estado após i=4:**

```javascript
start = 0
maxLen = 10
melhorPalindromo = "aaaaaaaaaa" ✅ STRING COMPLETA!
```

---

### **i = 5, 6, 7, 8, 9** (Iterações restantes)

A partir daqui, **nenhum palíndromo será maior que 10** (tamanho da string completa).

#### **i = 5:**

```javascript
len1 = 9  // "aaaaaaaaa" (índices 0-8, perdeu último 'a')
len2 = 8  // "aaaaaaaa"  (índices 1-8, perdeu primeiro 'a')
len = 9
9 < 10 ❌ Não atualiza
```

#### **i = 6:**

```javascript
len1 = 7  // "aaaaaaa"
len2 = 6  // "aaaaaa"
len = 7
7 < 10 ❌ Não atualiza
```

#### **i = 7, 8, 9:**

```javascript
Palíndromos cada vez menores...
Nenhum maior que 10
```

---

## 📊 Resultado Final

```javascript
return s.substring(0, 10) = "aaaaaaaaaa"
```

**✅ Resposta:** A string inteira é o maior palíndromo!

---

## 📈 Análise de Complexidade

### **Número de Operações:**

```
Para cada i (0 a 9):
  - Testa palíndromo ímpar
  - Testa palíndromo par

Total de iterações do loop principal: 10

Operações de expandAroundCenter:
i=0: 1 + 2 = 3 comparações
i=1: 3 + 4 = 7 comparações
i=2: 5 + 6 = 11 comparações
i=3: 7 + 8 = 15 comparações
i=4: 9 + 10 = 19 comparações ← Maior esforço
i=5: 9 + 8 = 17 comparações
i=6: 7 + 6 = 13 comparações
i=7: 5 + 4 = 9 comparações
i=8: 3 + 2 = 5 comparações
i=9: 1 + 0 = 1 comparações

Total: ~100 comparações para n=10
```

**Fórmula:** Para string de tamanho `n` com todos caracteres iguais:

```
Total de comparações ≈ n²
Complexidade: O(n²)
```

---

## 🎯 Visualização Gráfica

### **Progressão do Maior Palíndromo:**

```
i=0: "aa"          (tamanho 2)
i=1: "aaaa"        (tamanho 4)
i=2: "aaaaaa"      (tamanho 6)
i=3: "aaaaaaaa"    (tamanho 8)
i=4: "aaaaaaaaaa"  (tamanho 10) ✅ MÁXIMO ATINGIDO
i=5: (sem mudança)
i=6: (sem mudança)
i=7: (sem mudança)
i=8: (sem mudança)
i=9: (sem mudança)
```

### **Expansões na Posição i=4 (Centro):**

```
String:     a a a a a a a a a a
Índices:    0 1 2 3 4 5 6 7 8 9
                    ↑
                  centro

Expansão ÍMPAR (centro no índice 4):
Passo 1:            [a]              tamanho 1
Passo 2:          [a a a]            tamanho 3
Passo 3:        [a a a a a]          tamanho 5
Passo 4:      [a a a a a a a]        tamanho 7
Passo 5:    [a a a a a a a a a]      tamanho 9

Expansão PAR (centro entre índices 4 e 5):
Passo 1:            [a a]            tamanho 2
Passo 2:          [a a a a]          tamanho 4
Passo 3:        [a a a a a a]        tamanho 6
Passo 4:      [a a a a a a a a]      tamanho 8
Passo 5:    [a a a a a a a a a a]    tamanho 10 ✅
```

---

## 🧮 Comparação: Sua Solução vs Expand Around Center

### **Caso: `"aaaaaaaaaa"` (10 caracteres 'a')**

| Algoritmo                | Operações   | Complexidade | Resultado       |
| ------------------------ | ----------- | ------------ | --------------- |
| **Sua solução (Map)**    | ~495 testes | O(n³)        | "aaaaaaaaaa" ✅ |
| **Expand Around Center** | ~100 testes | O(n²)        | "aaaaaaaaaa" ✅ |

**Detalhamento da sua solução:**

```javascript
Map = { 'a': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] }

i=1: testa contra índice 0 → 1 teste
i=2: testa contra índices 0,1 → 2 testes
i=3: testa contra índices 0,1,2 → 3 testes
...
i=9: testa contra índices 0,1,2,3,4,5,6,7,8 → 9 testes

Total: 1+2+3+...+9 = 45 testes de palíndromo
Cada teste: O(n) para verificar
Total: 45 × 10 = 450+ operações ❌
```

**Expand Around Center:**

```javascript
10 posições × 2 tipos de centro = 20 expansões
Cada expansão: máximo 10 comparações
Total: ~100 operações ✅
```

**Diferença:** ~5x mais rápido! 🚀

---

## 💡 Por Que Este Caso é Interessante?

### **1. Pior caso para ambos os algoritmos**

- Todos os caracteres são iguais
- Máximo de expansões possíveis
- String inteira é um palíndromo

### **2. Demonstra a diferença de complexidade**

- Sua solução: O(n³) → 450+ operações
- Expand Around Center: O(n²) → ~100 operações
- **4.5x mais eficiente!**

### **3. Mostra a elegância do Expand Around Center**

- Não precisa guardar posições (Map)
- Testa sistematicamente todas as possibilidades
- Performance previsível
- Código mais simples

---

## 🎓 Lições Aprendidas

### **Por que Expand Around Center é melhor:**

1. ✅ **Complexidade consistente:** Sempre O(n²), não varia
2. ✅ **Espaço constante:** O(1) vs O(n) do Map
3. ✅ **Código mais simples:** Menos linhas, mais legível
4. ✅ **Performance previsível:** Não depende da distribuição dos caracteres

### **Quando sua solução é competitiva:**

```javascript
// Caso favorável: poucos caracteres repetidos
"abcdefghij";
// Sua solução: O(n) - muito rápida!
// Expand Around: O(n²) - mais lenta

// Mas este caso é raro em problemas reais
```

---

## 🔍 Debug Visual Completo

```
═══════════════════════════════════════════════════════════
                EXPAND AROUND CENTER
           String: "aaaaaaaaaa" (10 chars)
═══════════════════════════════════════════════════════════

┌─────┬──────────────────┬──────────────────┬───────────┐
│  i  │  Palíndromo Ímpar│  Palíndromo Par  │  Melhor   │
├─────┼──────────────────┼──────────────────┼───────────┤
│  0  │  "a" (1)         │  "aa" (2) ✅     │  "aa"     │
│  1  │  "aaa" (3)       │  "aaaa" (4) ✅   │  "aaaa"   │
│  2  │  "aaaaa" (5)     │  "aaaaaa" (6) ✅ │  "aaaaaa" │
│  3  │  "aaaaaaa" (7)   │  "aaaaaaaa" (8)✅│"aaaaaaaa" │
│  4  │  "aaaaaaaaa" (9) │"aaaaaaaaaa"(10)✅│"aaaaaaaaaa"│← MÁXIMO
│  5  │  "aaaaaaaaa" (9) │  "aaaaaaaa" (8)  │    -      │
│  6  │  "aaaaaaa" (7)   │  "aaaaaa" (6)    │    -      │
│  7  │  "aaaaa" (5)     │  "aaaa" (4)      │    -      │
│  8  │  "aaa" (3)       │  "aa" (2)        │    -      │
│  9  │  "a" (1)         │  "" (0)          │    -      │
└─────┴──────────────────┴──────────────────┴───────────┘

Resultado Final: "aaaaaaaaaa" (toda a string)
```

---

## 🚀 Conclusão

O algoritmo **Expand Around Center** é:

- ✅ Sistemático: Testa todas as posições como centro
- ✅ Eficiente: O(n²) garantido
- ✅ Elegante: Código limpo e simples
- ✅ Confiável: Performance previsível

**Este é o algoritmo recomendado para entrevistas técnicas!** 💪

---

## 📚 Código Final Comentado

```javascript
function longestPalindrome(s) {
  // Edge cases
  if (!s || s.length === 0) return "";
  if (s.length === 1) return s;

  let start = 0; // Início do maior palíndromo
  let maxLen = 0; // Tamanho do maior palíndromo

  /**
   * Expande em torno de um centro (left, right)
   * Retorna o tamanho do palíndromo encontrado
   */
  function expandAroundCenter(left, right) {
    // Continua enquanto:
    // 1. left >= 0 (não sai pela esquerda)
    // 2. right < s.length (não sai pela direita)
    // 3. s[left] === s[right] (caracteres são iguais)
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--; // Expande para esquerda
      right++; // Expande para direita
    }

    // Quando para, left e right estão 1 posição além do palíndromo
    // Tamanho = right - left - 1
    // Exemplo: left=-1, right=3 → 3 - (-1) - 1 = 3
    return right - left - 1;
  }

  // Testa cada posição como possível centro
  for (let i = 0; i < s.length; i++) {
    // Caso 1: Palíndromo ÍMPAR (centro em 1 caractere)
    // Exemplo: "aba" tem centro em 'b'
    const len1 = expandAroundCenter(i, i);

    // Caso 2: Palíndromo PAR (centro entre 2 caracteres)
    // Exemplo: "abba" tem centro entre 'b' e 'b'
    const len2 = expandAroundCenter(i, i + 1);

    // Pega o maior dos dois casos
    const len = Math.max(len1, len2);

    // Se encontrou um palíndromo maior, atualiza
    if (len > maxLen) {
      maxLen = len;
      // Calcula o índice de início do palíndromo
      // Fórmula: i - (len - 1) / 2
      start = i - Math.floor((len - 1) / 2);
    }
  }

  // Retorna a substring do maior palíndromo
  return s.substring(start, start + maxLen);
}

// Teste
console.log(longestPalindrome("aaaaaaaaaa")); // "aaaaaaaaaa"
```

---

**Estude este debug e você dominará o algoritmo!** 📖✨
