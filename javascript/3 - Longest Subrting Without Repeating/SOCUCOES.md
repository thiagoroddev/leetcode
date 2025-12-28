**LeetCode Problem:** [#3 - Medium](https://leetcode.com/problems/longest-substring-without-repeating-characters/)

## 📋 Descrição do Problema

Dada uma string `s`, encontre o comprimento da **maior substring sem caracteres repetidos**.

### Exemplos:

```
Input: s = "abcabcbb"
Output: 3
Explicação: A resposta é "abc", com comprimento 3.

Input: s = "bbbbb"
Output: 1
Explicação: A resposta é "b", com comprimento 1.

Input: s = "pwwkew"
Output: 3
Explicação: A resposta é "wke", com comprimento 3.
Note que a resposta deve ser uma substring, "pwke" é uma subsequência e não uma substring.
```

---

## 🎯 Soluções

### Solução 1: Força Bruta ❌ (Não Recomendada)

```javascript
var lengthOfLongestSubstring = function (s) {
  let maxLength = 0;

  for (let i = 0; i < s.length; i++) {
    let chars = new Set();
    for (let j = i; j < s.length; j++) {
      if (chars.has(s[j])) break;
      chars.add(s[j]);
      maxLength = Math.max(maxLength, j - i + 1);
    }
  }

  return maxLength;
};
```

**Complexidade:**

- ⏱️ **Tempo:** O(n²) - Loop aninhado
- 💾 **Espaço:** O(min(n, m)) - onde m é o tamanho do alfabeto

**Pré-requisitos:**

- Loops básicos (for)
- Set em JavaScript
- Método `has()` e `add()`

**Prós:** Simples de entender
**Contras:** Muito lento para strings grandes

---

### Solução 2: Sliding Window com Set ✅ (Recomendada para Iniciantes)

```javascript
var lengthOfLongestSubstring = function (s) {
  let maxLength = 0;
  let left = 0;
  let charSet = new Set();

  for (let right = 0; right < s.length; right++) {
    // Remove caracteres da esquerda até não haver duplicata
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }

    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};
```

**Complexidade:**

- ⏱️ **Tempo:** O(n) - Cada caractere é visitado no máximo 2 vezes
- 💾 **Espaço:** O(min(n, m))

**Pré-requisitos:**

- Técnica de Sliding Window (Janela Deslizante)
- Set em JavaScript
- Dois ponteiros (left e right)

**Como funciona:**

1. Expandimos a janela movendo `right`
2. Se encontramos duplicata, contraímos a janela movendo `left`
3. Mantemos o tamanho máximo encontrado

**Visualização:**

```
"abcabcbb"
 LR          → charSet = {a}, max = 1
 L R         → charSet = {a,b}, max = 2
 L  R        → charSet = {a,b,c}, max = 3
 L   R       → duplicata! Remove 'a'
   L  R      → charSet = {b,c,a}, max = 3
   L   R     → duplicata! Remove 'b'
     L  R    → charSet = {c,a,b}, max = 3
```

---

### Solução 3: Sliding Window com Map 🏆 (Mais Eficiente)

```javascript
var lengthOfLongestSubstring = function (s) {
  let maxLength = 0;
  let left = 0;
  let charMap = new Map();

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // Se o caractere já existe e está na janela atual
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1;
    }

    charMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};
```

**Complexidade:**

- ⏱️ **Tempo:** O(n) - Apenas uma passagem pela string
- 💾 **Espaço:** O(min(n, m))

**Pré-requisitos:**

- Map em JavaScript
- Métodos `has()`, `get()`, `set()`
- Sliding Window avançado
- Compreensão de índices

**Vantagens sobre Solução 2:**

- Evita o loop `while` interno
- Pula diretamente para a posição correta
- Mais eficiente na prática

**Como funciona:**

- Armazenamos o **último índice** de cada caractere
- Quando encontramos duplicata, pulamos `left` para depois da duplicata anterior
- Atualizamos sempre a posição do caractere atual

---

### Solução 4: Array para ASCII (Otimização de Espaço)

```javascript
var lengthOfLongestSubstring = function (s) {
  let maxLength = 0;
  let left = 0;
  let charIndex = new Array(128).fill(-1); // ASCII

  for (let right = 0; right < s.length; right++) {
    const charCode = s.charCodeAt(right);

    if (charIndex[charCode] >= left) {
      left = charIndex[charCode] + 1;
    }

    charIndex[charCode] = right;
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
};
```

**Complexidade:**

- ⏱️ **Tempo:** O(n)
- 💾 **Espaço:** O(1) - Array fixo de 128 posições

**Pré-requisitos:**

- Tabela ASCII
- `charCodeAt()` em JavaScript
- Arrays de tamanho fixo

**Quando usar:**

- Apenas caracteres ASCII
- Quando espaço é crítico
- Performance máxima

---

## 📊 Comparação de Eficiência

| Solução              | Tempo | Espaço | Dificuldade  | Recomendação   |
| -------------------- | ----- | ------ | ------------ | -------------- |
| Força Bruta          | O(n²) | O(m)   | ⭐ Fácil     | ❌ Evitar      |
| Sliding Window + Set | O(n)  | O(m)   | ⭐⭐ Média   | ✅ Iniciantes  |
| Sliding Window + Map | O(n)  | O(m)   | ⭐⭐⭐ Média | 🏆 Recomendada |
| Array ASCII          | O(n)  | O(1)   | ⭐⭐⭐ Média | ⚡ Performance |

---

## 🐛 Erros Comuns

### ❌ Erro 1: Resetar completamente a substring

```javascript
// ERRADO
if (lastSubstring.includes(s[index])) {
  lastSubstring = ""; // Perde todo o progresso!
}
```

**Problema:** Ao resetar completamente, você perde substrings válidas que começam após o caractere duplicado.

**Exemplo:** Para `"dvdf"`, você perde a substring `"vdf"` (tamanho 3).

### ❌ Erro 2: Não usar dois ponteiros

```javascript
// ERRADO
for (let i = 0; i < s.length; i++) {
  // Apenas um ponteiro não consegue manter a janela
}
```

**Problema:** Precisa de dois ponteiros (left/right) para controlar a janela.

### ❌ Erro 3: Confiar apenas nos casos de exemplo

**Problema:** O LeetCode tem centenas de test cases ocultos. Sempre clique em **Submit**, não apenas **Run Code**.

---

## 🧪 Casos de Teste Importantes

```javascript
// Teste sua solução com estes casos:
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
console.log(lengthOfLongestSubstring("")); // 0
console.log(lengthOfLongestSubstring(" ")); // 1
console.log(lengthOfLongestSubstring("au")); // 2
console.log(lengthOfLongestSubstring("dvdf")); // 3 (caso crítico!)
console.log(lengthOfLongestSubstring("tmmzuxt")); // 5
console.log(lengthOfLongestSubstring("abcda")); // 4
```
