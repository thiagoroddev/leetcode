# Debug Walkthrough - Solução Otimizada

## Caso de Teste: " -010 -+ 39 9aj -8"

---

## 🔍 Código da Solução

```javascript
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

---

## 📊 Estado Inicial

```javascript
Input: s = "  -010 -+ 39 9aj -8"

Constantes:
INT_MAX = 2147483647
INT_MIN = -2147483648

Variáveis:
i = 0
n = 21 (length da string)
sign = 1 (ainda não definido)
result = 0
```

---

## 🔄 Execução Passo a Passo

### **FASE 1: Remover Espaços em Branco**

```
Loop: while (i < n && s[i] === ' ')
```

| Iteração | i   | s[i] | Condição       | Ação             |
| -------- | --- | ---- | -------------- | ---------------- |
| 1        | 0   | ' '  | ' ' === ' ' ✅ | i++ → i = 1      |
| 2        | 1   | ' '  | ' ' === ' ' ✅ | i++ → i = 2      |
| 3        | 2   | '-'  | '-' === ' ' ❌ | **SAIR DO LOOP** |

```
Estado após Fase 1:
i = 2
s[i] = '-'
```

**🔍 Visualização:**

```
"  -010 -+ 39 9aj -8"
  ↑
  posição inicial (i=2)
```

---

### **FASE 2: Verificar Sinal**

```javascript
if (i < n && (s[i] === '+' || s[i] === '-'))
```

| Verificação        | Valor          | Resultado          |
| ------------------ | -------------- | ------------------ |
| i < n              | 2 < 21         | ✅ true            |
| s[i] === '+'       | '-' === '+'    | ❌ false           |
| s[i] === '-'       | '-' === '-'    | ✅ true            |
| **Condição final** | true \|\| true | ✅ **ENTRA NO IF** |

```javascript
sign = s[i] === "-" ? -1 : 1;
// '-' === '-' é true
// sign = -1

i++; // i = 3
```

```
Estado após Fase 2:
i = 3
sign = -1 (negativo)
s[i] = '0'
```

**🔍 Visualização:**

```
"  -010 -+ 39 9aj -8"
   ↑
   sinal processado, agora em i=3
```

---

### **FASE 3: Converter Dígitos**

```
Loop: while (i < n && s[i] >= '0' && s[i] <= '9')
```

#### **Iteração 1:**

```
i = 3
s[i] = '0'
```

| Verificação  | Valor                | Resultado       |
| ------------ | -------------------- | --------------- |
| i < n        | 3 < 21               | ✅ true         |
| s[i] >= '0'  | '0' >= '0'           | ✅ true         |
| s[i] <= '9'  | '0' <= '9'           | ✅ true         |
| **Condição** | true && true && true | ✅ **CONTINUA** |

```javascript
digit = s[i] - '0'
digit = '0' - '0' = 0

// Check overflow:
result > Math.floor(INT_MAX / 10)
0 > 214748364 ❌ false

result === Math.floor(INT_MAX / 10) && digit > 7
0 === 214748364 ❌ false

// Sem overflow, continua:
result = result * 10 + digit
result = 0 * 10 + 0 = 0

i++ → i = 4
```

```
Estado: i=4, result=0, s[i]='1'
```

#### **Iteração 2:**

```
i = 4
s[i] = '1'
```

| Verificação | Valor      | Resultado |
| ----------- | ---------- | --------- |
| i < n       | 4 < 21     | ✅ true   |
| s[i] >= '0' | '1' >= '0' | ✅ true   |
| s[i] <= '9' | '1' <= '9' | ✅ true   |

```javascript
digit = '1' - '0' = 1

// Check overflow:
result > 214748364 → 0 > 214748364 ❌
result === 214748364 && digit > 7 ❌

result = 0 * 10 + 1 = 1
i++ → i = 5
```

```
Estado: i=5, result=1, s[i]='0'
```

#### **Iteração 3:**

```
i = 5
s[i] = '0'
```

| Verificação | Valor      | Resultado |
| ----------- | ---------- | --------- |
| i < n       | 5 < 21     | ✅ true   |
| s[i] >= '0' | '0' >= '0' | ✅ true   |
| s[i] <= '9' | '0' <= '9' | ✅ true   |

```javascript
digit = '0' - '0' = 0

// Check overflow:
result > 214748364 → 1 > 214748364 ❌
result === 214748364 && digit > 7 ❌

result = 1 * 10 + 0 = 10
i++ → i = 6
```

```
Estado: i=6, result=10, s[i]=' '
```

#### **Iteração 4 (Tentativa):**

```
i = 6
s[i] = ' ' (espaço)
```

| Verificação  | Valor              | Resultado           |
| ------------ | ------------------ | ------------------- |
| i < n        | 6 < 21             | ✅ true             |
| s[i] >= '0'  | ' ' >= '0'         | ❌ **false**        |
| **Condição** | true && false && ? | ❌ **SAIR DO LOOP** |

```
LOOP TERMINA!
```

**🔍 Visualização:**

```
"  -010 -+ 39 9aj -8"
   ^^^^
   processados: -010
       ↑
       parou aqui (espaço)
```

---

### **FASE 4: Retornar Resultado**

```javascript
return sign * result;
return -1 * 10;
return -10;
```

---

## ✅ Resultado Final

```javascript
Input: "  -010 -+ 39 9aj -8";
Output: -10;
```

---

## 📋 Resumo da Execução

| Fase | Ação                | Caracteres Processados | Estado Final       |
| ---- | ------------------- | ---------------------- | ------------------ |
| 1    | Skip espaços        | " " (2 espaços)        | i = 2              |
| 2    | Detectar sinal      | "-"                    | sign = -1, i = 3   |
| 3    | Ler dígitos         | "010"                  | result = 10, i = 6 |
| 4    | Parar no não-dígito | " " (espaço)           | Loop termina       |
| 5    | Retorno             | -                      | -1 × 10 = **-10**  |

---

## 🎯 Por Que Parou no Espaço?

A string contém:

```
"  -010 -+ 39 9aj -8"
       ↑
       espaço aqui
```

A condição do loop é:

```javascript
while (i < n && s[i] >= '0' && s[i] <= '9')
```

Quando `s[i] = ' '`:

- `' ' >= '0'` → **false** (espaço tem código ASCII 32, '0' tem 48)
- Loop termina imediatamente

**Os caracteres restantes `" -+ 39 9aj -8"` são completamente ignorados!**

---

## 🔬 Análise Detalhada dos Caracteres Ignorados

```
"  -010 -+ 39 9aj -8"
       └─────────────┘
       NÃO PROCESSADO

Razão: Após converter "010", encontramos um espaço.
O algoritmo para imediatamente, pois só processa
dígitos CONTÍGUOS após o sinal inicial.
```

---

## 💡 Pontos Importantes

### 1. **Zeros à Esquerda**

```
"010" → 10
```

Os zeros à esquerda são naturalmente ignorados pela multiplicação:

- 0 × 10 + 0 = 0
- 0 × 10 + 1 = 1
- 1 × 10 + 0 = 10

### 2. **Apenas Primeiro Sinal Conta**

```
"  -010 -+ 39 9aj -8"
   ^      ^^
   ✅     ❌❌
   usado  ignorados
```

### 3. **Para no Primeiro Não-Dígito**

```
Após o sinal e zeros à esquerda, o algoritmo converte
dígitos até encontrar qualquer caractere que NÃO seja 0-9.
```

---

## 🧪 Comparação com Outros Casos

| Input                | Output | Explicação                    |
| -------------------- | ------ | ----------------------------- |
| " -010 -+ 39 9aj -8" | -10    | Para no espaço após "010"     |
| " -010"              | -10    | Converte tudo, sem obstáculos |
| " -010abc"           | -10    | Para no 'a'                   |
| " -010 39"           | -10    | Para no espaço                |
| " 010"               | 10     | Sem sinal (assume positivo)   |

---

## 🎓 Lições Aprendidas

1. **Processamento Sequencial**: O algoritmo processa da esquerda para direita, uma vez
2. **Apenas Primeiro Segmento**: Só o primeiro grupo contíguo de dígitos após espaços/sinal importa
3. **Zeros à Esquerda**: São naturalmente tratados pela matemática
4. **Sinais Múltiplos**: Apenas o primeiro sinal (se existir) é considerado
5. **Parada Imediata**: Qualquer caractere inválido termina o processamento

---

## 🔍 Trace Completo em Formato de Tabela

| Step   | i   | s[i] | result | sign | digit | Ação                       |
| ------ | --- | ---- | ------ | ---- | ----- | -------------------------- |
| Init   | 0   | ' '  | 0      | 1    | -     | Início                     |
| 1      | 0   | ' '  | 0      | 1    | -     | Skip espaço, i++           |
| 2      | 1   | ' '  | 0      | 1    | -     | Skip espaço, i++           |
| 3      | 2   | '-'  | 0      | -1   | -     | Define sign=-1, i++        |
| 4      | 3   | '0'  | 0      | -1   | 0     | result = 0\*10+0 = 0, i++  |
| 5      | 4   | '1'  | 1      | -1   | 1     | result = 0\*10+1 = 1, i++  |
| 6      | 5   | '0'  | 10     | -1   | 0     | result = 1\*10+0 = 10, i++ |
| 7      | 6   | ' '  | 10     | -1   | -     | Não é dígito, SAIR         |
| Return | -   | -    | 10     | -1   | -     | Retorna -1 × 10 = **-10**  |

---

## 🖼️ Visualização ASCII Art

```
INPUT: "  -010 -+ 39 9aj -8"
        ││ ││││
        ││ │││└─ '0' → digit=0 → result = 1*10+0 = 10
        ││ ││└── '1' → digit=1 → result = 0*10+1 = 1
        ││ │└─── '0' → digit=0 → result = 0*10+0 = 0
        ││ └──── '-' → sign = -1
        │└────── ' ' → skip
        └─────── ' ' → skip
            └─── ' ' → STOP (não é dígito)

RESULTADO: sign × result = -1 × 10 = -10
```

---

## ✨ Conclusão

O algoritmo processou corretamente:

1. ✅ Removeu espaços iniciais
2. ✅ Detectou sinal negativo
3. ✅ Converteu "010" para 10 (ignorando zero à esquerda)
4. ✅ Parou no primeiro não-dígito (espaço)
5. ✅ Aplicou o sinal: -10

**Tempo de execução**: O(n) onde n = comprimento da string  
**Espaço usado**: O(1) - apenas variáveis auxiliares

---

## 🚀 Para Testar Você Mesmo

```javascript
const myAtoi = function (s) {
  const INT_MAX = 2147483647;
  const INT_MIN = -2147483648;

  let i = 0;
  const n = s.length;

  // Debug logs
  console.log(`Input: "${s}"`);
  console.log(`Length: ${n}\n`);

  // Fase 1: Skip whitespace
  console.log("=== FASE 1: Skip Whitespace ===");
  while (i < n && s[i] === " ") {
    console.log(`i=${i}, s[i]='${s[i]}' → skip`);
    i++;
  }
  console.log(`Após fase 1: i=${i}\n`);

  // Fase 2: Check sign
  console.log("=== FASE 2: Check Sign ===");
  let sign = 1;
  if (i < n && (s[i] === "+" || s[i] === "-")) {
    sign = s[i] === "-" ? -1 : 1;
    console.log(`i=${i}, s[i]='${s[i]}' → sign=${sign}`);
    i++;
  }
  console.log(`Após fase 2: i=${i}, sign=${sign}\n`);

  // Fase 3: Convert digits
  console.log("=== FASE 3: Convert Digits ===");
  let result = 0;
  while (i < n && s[i] >= "0" && s[i] <= "9") {
    const digit = s[i] - "0";
    console.log(
      `i=${i}, s[i]='${s[i]}', digit=${digit}, result antes=${result}`
    );

    if (
      result > Math.floor(INT_MAX / 10) ||
      (result === Math.floor(INT_MAX / 10) && digit > 7)
    ) {
      console.log("OVERFLOW detectado!");
      return sign === 1 ? INT_MAX : INT_MIN;
    }

    result = result * 10 + digit;
    console.log(`result depois=${result}`);
    i++;
  }

  if (i < n) {
    console.log(`\nParou em i=${i}, s[i]='${s[i]}' (não é dígito)`);
  }

  console.log(`\n=== RESULTADO ===`);
  console.log(`sign=${sign}, result=${result}`);
  console.log(`Final: ${sign} × ${result} = ${sign * result}`);

  return sign * result;
};

// Teste
myAtoi("  -010 -+ 39 9aj -8");
```

Execute este código no console do seu navegador ou Node.js para ver o debug completo!
