# String to Integer (atoi) - LeetCode #8

## Descrição do Problema

Implemente a função `myAtoi(string s)` que converte uma string em um inteiro de 32 bits com sinal.

### Algoritmo:

1. **Whitespace**: Ignore espaços em branco no início
2. **Sinal**: Determine o sinal verificando se o próximo caractere é '-' ou '+' (assuma positivo se nenhum estiver presente)
3. **Conversão**: Leia o inteiro ignorando zeros à esquerda até encontrar um caractere não-dígito ou o fim da string
4. **Arredondamento**: Se o inteiro estiver fora do intervalo de 32 bits com sinal [-2³¹, 2³¹ - 1], arredonde para os limites
5. **Retorno**: Retorne o inteiro como resultado final

### Restrições:

- 0 <= s.length <= 200
- s consiste de letras inglesas (maiúsculas e minúsculas), dígitos (0-9), ' ', '+', '-', e '.'

---

## Soluções em JavaScript (Da Melhor para a Pior)

### 📌 Solução 1: Otimizada com Verificação de Overflow Antes de Calcular

**Classificação**: ⭐⭐⭐⭐⭐ (Melhor)

**Complexidade**:

- Tempo: O(n) - onde n é o comprimento da string
- Espaço: O(1) - apenas variáveis auxiliares

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const INT_MAX = 2147483647; // 2^31 - 1
  const INT_MIN = -2147483648; // -2^31

  let i = 0;
  const n = s.length;

  // 1. Remover espaços em branco à esquerda
  while (i < n && s[i] === " ") {
    i++;
  }

  // 2. Verificar sinal
  let sign = 1;
  if (i < n && (s[i] === "+" || s[i] === "-")) {
    sign = s[i] === "-" ? -1 : 1;
    i++;
  }

  // 3. Converter dígitos
  let result = 0;
  while (i < n && s[i] >= "0" && s[i] <= "9") {
    const digit = s[i] - "0";

    // Verificar overflow ANTES de adicionar o dígito
    // Se result > INT_MAX / 10, então result * 10 > INT_MAX
    // Se result == INT_MAX / 10 e digit > 7, então result * 10 + digit > INT_MAX
    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    i++;
  }

  return sign * result;
};
```

**Requisitos de Conhecimento**:

- Manipulação de strings e caracteres
- Conversão de char para número (ASCII)
- Operações matemáticas básicas
- Lógica de overflow prevention
- Comparação de inteiros

**Vantagens**:
✅ Não usa tipos de dados maiores (long/BigInt)  
✅ Detecta overflow ANTES de acontecer  
✅ Performance ótima  
✅ Uso mínimo de memória  
✅ Segue as melhores práticas de engenharia

---

### 📌 Solução 2: Com parseInt e Validação Manual

**Classificação**: ⭐⭐⭐⭐ (Boa)

**Complexidade**:

- Tempo: O(n)
- Espaço: O(n) - devido à criação de substring

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  // 1. Remover espaços em branco
  s = s.trim();

  if (s.length === 0) return 0;

  // 2. Verificar sinal
  let sign = 1;
  let i = 0;

  if (s[0] === "-" || s[0] === "+") {
    sign = s[0] === "-" ? -1 : 1;
    i++;
  }

  // 3. Extrair números
  let numStr = "";
  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    numStr += s[i];
    i++;
  }

  if (numStr.length === 0) return 0;

  // 4. Converter e verificar limites
  let result = parseInt(numStr) * sign;

  if (result > INT_MAX) return INT_MAX;
  if (result < INT_MIN) return INT_MIN;

  return result;
};
```

**Requisitos de Conhecimento**:

- String methods (trim)
- parseInt()
- Manipulação de strings
- Concatenação de strings
- Condicionais básicas

**Vantagens**:
✅ Código mais legível  
✅ Usa funções nativas do JavaScript  
✅ Fácil de entender

**Desvantagens**:
❌ Usa mais memória (cria nova string)  
❌ parseInt pode ter overhead  
❌ Menos eficiente que solução 1

---

### 📌 Solução 3: Usando BigInt para Overflow

**Classificação**: ⭐⭐⭐ (Razoável)

**Complexidade**:

- Tempo: O(n)
- Espaço: O(1)

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  let i = 0;

  // 1. Skip whitespace
  while (i < s.length && s[i] === " ") {
    i++;
  }

  // 2. Check sign
  let sign = 1;
  if (i < s.length && (s[i] === "+" || s[i] === "-")) {
    sign = s[i] === "-" ? -1 : 1;
    i++;
  }

  // 3. Convert digits usando BigInt
  let result = 0n;
  while (i < s.length && s[i] >= "0" && s[i] <= "9") {
    result = result * 10n + BigInt(s[i]);
    i++;
  }

  // 4. Apply sign e converter para Number
  result = result * BigInt(sign);

  // 5. Clamp to 32-bit integer range
  if (result > INT_MAX) return INT_MAX;
  if (result < INT_MIN) return INT_MIN;

  return Number(result);
};
```

**Requisitos de Conhecimento**:

- BigInt (ES2020)
- Type conversion
- Manipulação de strings
- Operadores básicos

**Vantagens**:
✅ Não precisa se preocupar com overflow durante cálculo  
✅ Código relativamente simples

**Desvantagens**:
❌ BigInt tem overhead de performance  
❌ Conversões entre BigInt e Number  
❌ Usa mais memória  
❌ Não é a abordagem mais eficiente

---

### 📌 Solução 4: Usando Regex

**Classificação**: ⭐⭐⭐ (Regular)

**Complexidade**:

- Tempo: O(n)
- Espaço: O(n) - devido ao match array

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  // Regex para capturar: espaços opcionais, sinal opcional, dígitos
  const match = s.trim().match(/^[+-]?\d+/);

  if (!match) return 0;

  const num = parseInt(match[0]);

  if (num > INT_MAX) return INT_MAX;
  if (num < INT_MIN) return INT_MIN;

  return num;
};
```

**Requisitos de Conhecimento**:

- Expressões regulares (Regex)
- String methods (trim, match)
- parseInt()
- Condicionais

**Vantagens**:
✅ Código muito conciso  
✅ Elegante e expressivo

**Desvantagens**:
❌ Regex tem overhead  
❌ Menos performático  
❌ Mais difícil de debugar  
❌ Pode ser menos legível para iniciantes

---

### 📌 Solução 5: Usando Array e Reduce

**Classificação**: ⭐⭐ (Abaixo da média)

**Complexidade**:

- Tempo: O(n)
- Espaço: O(n) - cria array

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  s = s.trim();
  if (!s) return 0;

  const sign = s[0] === "-" ? -1 : 1;
  const start = s[0] === "-" || s[0] === "+" ? 1 : 0;

  const result =
    s
      .slice(start)
      .split("")
      .reduce(
        (acc, char) => {
          if (char < "0" || char > "9") return {value: acc.value, done: true};
          if (acc.done) return acc;
          return {value: acc.value * 10 + (char - "0"), done: false};
        },
        {value: 0, done: false}
      ).value * sign;

  if (result > INT_MAX) return INT_MAX;
  if (result < INT_MIN) return INT_MIN;

  return result;
};
```

**Requisitos de Conhecimento**:

- Array methods (split, slice, reduce)
- Funções de ordem superior
- Closures
- Objetos
- String manipulation

**Vantagens**:
✅ Abordagem funcional  
✅ Demonstra conhecimento de programação funcional

**Desvantagens**:
❌ Cria array desnecessário  
❌ Overhead do reduce  
❌ Menos performático  
❌ Código mais complexo para problema simples  
❌ Difícil de ler

---

### 📌 Solução 6: Usando eval() (NUNCA USE!)

**Classificação**: ⭐ (Péssima - NÃO RECOMENDADA)

**Complexidade**:

- Tempo: O(n) + overhead do eval
- Espaço: O(n)

```javascript
/**
 * @param {string} s
 * @return {number}
 *
 * ⚠️ NUNCA USE ESTA SOLUÇÃO EM PRODUÇÃO!
 * Apenas para fins educacionais
 */
var myAtoi = function (s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  try {
    s = s.trim();
    const match = s.match(/^[+-]?\d+/);

    if (!match) return 0;

    const result = eval(match[0]);

    if (result > INT_MAX) return INT_MAX;
    if (result < INT_MIN) return INT_MIN;

    return result;
  } catch {
    return 0;
  }
};
```

**Requisitos de Conhecimento**:

- eval() (antipattern)
- Regex
- Try-catch
- String methods

**Por que é péssima**:
❌ **RISCO DE SEGURANÇA**: eval() pode executar código malicioso  
❌ Performance horrível  
❌ Dificulta debugging  
❌ Má prática de programação  
❌ Nunca deve ser usada em código real  
❌ Pode causar vulnerabilidades XSS

---

## 📊 Comparação de Performance

| Solução                         | Tempo | Espaço | Legibilidade | Eficiência | Segurança  |
| ------------------------------- | ----- | ------ | ------------ | ---------- | ---------- |
| 1. Otimizada com Overflow Check | O(n)  | O(1)   | ⭐⭐⭐⭐     | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 2. parseInt com Validação       | O(n)  | O(n)   | ⭐⭐⭐⭐⭐   | ⭐⭐⭐⭐   | ⭐⭐⭐⭐⭐ |
| 3. BigInt                       | O(n)  | O(1)   | ⭐⭐⭐⭐     | ⭐⭐⭐     | ⭐⭐⭐⭐⭐ |
| 4. Regex                        | O(n)  | O(n)   | ⭐⭐⭐       | ⭐⭐⭐     | ⭐⭐⭐⭐⭐ |
| 5. Array + Reduce               | O(n)  | O(n)   | ⭐⭐         | ⭐⭐       | ⭐⭐⭐⭐⭐ |
| 6. eval()                       | O(n)+ | O(n)   | ⭐           | ⭐         | ⭐         |

---

## 🎯 Casos de Teste

```javascript
// Teste 1: Número básico
console.log(myAtoi("42")); // 42

// Teste 2: Com espaços
console.log(myAtoi("   -42")); // -42

// Teste 3: Com palavras depois
console.log(myAtoi("4193 with words")); // 4193

// Teste 4: Overflow positivo
console.log(myAtoi("91283472332")); // 2147483647

// Teste 5: Overflow negativo
console.log(myAtoi("-91283472332")); // -2147483648

// Teste 6: Apenas sinal
console.log(myAtoi("+-12")); // 0

// Teste 7: Zero com espaços
console.log(myAtoi("   ")); // 0

// Teste 8: Palavras antes
console.log(myAtoi("words and 987")); // 0

// Teste 9: Sinal positivo explícito
console.log(myAtoi("+1")); // 1

// Teste 10: Com zeros à esquerda
console.log(myAtoi("00000-42a1234")); // 0
```

---

## 💡 Dicas e Conceitos Importantes

### 1. Overflow Detection

A chave para detectar overflow antes que ele ocorra é verificar:

```javascript
// Para positivos:
if (result > INT_MAX / 10 || (result === INT_MAX / 10 && digit > 7))

// Para negativos:
if (result > INT_MAX / 10 || (result === INT_MAX / 10 && digit > 8))
```

### 2. Conversão de Char para Número

```javascript
const digit = char - "0"; // '5' - '0' = 5
// ou
const digit = char.charCodeAt(0) - "0".charCodeAt(0);
```

### 3. Limites de 32-bit Integer

- INT_MAX = 2³¹ - 1 = 2147483647
- INT_MIN = -2³¹ = -2147483648

### 4. Por que 7 e 8?

```
INT_MAX = 2147483647
INT_MAX / 10 = 214748364 (com resto 7)
INT_MIN = -2147483648
|INT_MIN| / 10 = 214748364 (com resto 8)
```

---

## 🎓 Níveis de Conhecimento Necessário

### 📗 Iniciante (Soluções 2, 4)

- Operadores básicos
- Condicionais (if/else)
- Loops (for/while)
- String methods
- parseInt()

### 📘 Intermediário (Soluções 1, 3)

- Manipulação de caracteres
- ASCII e conversão char-to-int
- Overflow detection
- Operações bit a bit (opcional)
- BigInt (ES2020)

### 📙 Avançado (Solução 5)

- Programação funcional
- Array methods (map, reduce, filter)
- Closures
- High-order functions

### 📕 Especialista (Conceitos)

- Arquitetura de computadores (representação de inteiros)
- Two's complement
- Memory management
- Performance optimization

---

## 🏆 Recomendação Final

**Para entrevistas**: Use a **Solução 1** (Otimizada)

- Demonstra conhecimento profundo
- Eficiente em tempo e espaço
- Mostra atenção a edge cases
- Não usa bibliotecas externas

**Para aprendizado**: Estude as **Soluções 1, 2 e 3**

- Solução 1: Aprenda overflow detection
- Solução 2: Compreenda parseInt e validação
- Solução 3: Conheça BigInt e seus trade-offs

**Evite**: Soluções 5 e 6

- Muito complexas para o problema
- Performance ruim
- Má prática (especialmente eval)

---

## 📚 Recursos Adicionais

- [MDN: parseInt()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- [MDN: BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)
- [Integer Overflow Explained](https://en.wikipedia.org/wiki/Integer_overflow)
- [Two's Complement](https://en.wikipedia.org/wiki/Two%27s_complement)

---

**Problema Original**: [LeetCode #8 - String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/)

**Dificuldade**: Médio

**Tags**: String, Math, Simulation
