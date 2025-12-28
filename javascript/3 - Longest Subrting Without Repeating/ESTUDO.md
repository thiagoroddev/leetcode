## 📚 Conceitos-Chave para Dominar

### 1. **Sliding Window (Janela Deslizante)**

- Técnica fundamental em problemas de substring/subarray
- Mantém uma "janela" que se expande e contrai
- Evita recalcular do zero

**Outros problemas para praticar:**

- Minimum Window Substring
- Longest Repeating Character Replacement
- Permutation in String

### 2. **Two Pointers (Dois Ponteiros)**

- `left` e `right` delimitam a janela atual
- `right` sempre avança
- `left` avança apenas quando necessário

### 3. **Hash Tables (Set/Map)**

- Busca O(1) para verificar duplicatas
- Armazena posições ou apenas presença

### 4. **Complexidade de Tempo**

- Por que O(n) é melhor que O(n²)
- Análise amortizada (cada elemento visitado no máximo 2x)

---

## 🎓 Dicas de Estudo

### Para Iniciantes:

1. **Comece pela Solução 2** (Sliding Window + Set)
2. Desenhe no papel o processo para `"abcabcbb"`
3. Entenda por que resetar a string não funciona
4. Pratique outros problemas de Sliding Window

### Para Intermediários:

1. Compare Set vs Map (Soluções 2 e 3)
2. Analise por que Map é mais eficiente
3. Implemente todas as 4 soluções
4. Meça o tempo de execução com strings grandes

### Para Avançados:

1. Otimize para casos específicos (apenas letras, apenas números)
2. Implemente versões para outros tipos de dados
3. Analise o comportamento com Unicode
4. Estude variações do problema (k caracteres repetidos permitidos)

---

## 🔗 Recursos Recomendados

### Vídeos:

- [NeetCode - Longest Substring Without Repeating Characters](https://www.youtube.com/watch?v=wiGpQwVHdE0)
- [Tech Dose - Sliding Window Technique](https://www.youtube.com/watch?v=jM2dhDPYMQM)

### Artigos:

- [LeetCode Discuss - Top Solutions](https://leetcode.com/problems/longest-substring-without-repeating-characters/discuss/)
- [GeeksforGeeks - Sliding Window Technique](https://www.geeksforgeeks.org/window-sliding-technique/)

### Prática:

- [NeetCode 150](https://neetcode.io/) - Lista curada de problemas
- LeetCode - Filtre por tag "Sliding Window"

---

## 💡 Padrões de Problema Similares

Este problema é um exemplo clássico de **Sliding Window**. Outros padrões relacionados:

- **Fixed-size Window:** Janela de tamanho fixo
- **Dynamic Window:** Janela que cresce/diminui (este problema!)
- **Two Pointers:** Técnica mais geral

**Próximos desafios recomendados:**

1. [LeetCode #76 - Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) (Hard)
2. [LeetCode #438 - Find All Anagrams in a String](https://leetcode.com/problems/find-all-anagrams-in-a-string/) (Medium)
3. [LeetCode #567 - Permutation in String](https://leetcode.com/problems/permutation-in-string/) (Medium)

---

## ✅ Checklist de Domínio

- [ ] Entendi por que resetar a substring não funciona
- [ ] Consigo explicar Sliding Window para alguém
- [ ] Implementei pelo menos 2 soluções diferentes
- [ ] Passei em todos os test cases (incluindo Submit)
- [ ] Consigo resolver em < 15 minutos
- [ ] Entendo a diferença entre O(n) e O(n²)
- [ ] Consigo identificar quando usar Set vs Map
- [ ] Resolvi 3+ problemas similares de Sliding Window

---

## 🏆 Progresso

```
Primeira tentativa: [ ]
Solução 2 (Set):    [ ]
Solução 3 (Map):    [ ]
Solução 4 (Array):  [ ]
Revisão após 1 dia: [ ]
Revisão após 1 sem: [ ]
```

---

**Última atualização:** Dezembro 2025  
**Nível:** Medium  
**Tags:** `Hash Table` `String` `Sliding Window` `Two Pointers`

**Dica final:** Não se preocupe se não entendeu de primeira. Sliding Window é um conceito que "clica" com a prática. Continue tentando! 🚀

---

###############################################################################################################################################

# Set vs Map: Guia Comparativo Completo

## 🎯 Introdução

Embora ambos façam parte da mesma família de coleções no JavaScript (ES6+), entender onde eles se encontram e onde se separam é o que define um desenvolvedor sênior.

---

## ⚖️ Comparativo Direto: Set vs Map

### 1. O que eles têm em comum? (A Interface de Coleção)

Ambos compartilham uma estrutura de API consistente para facilitar o aprendizado:

#### Métodos Compartilhados:

```javascript
// Ambos usem estes métodos
const set = new Set([1, 2, 3]);
const map = new Map([
  ["a", 1],
  ["b", 2],
]);

// .has(item) - Verificar existência em O(1)
set.has(2); // true
map.has("a"); // true

// .delete(item) - Remover elementos eficientemente
set.delete(3); // true
map.delete("b"); // true

// .clear() - Limpar toda a coleção instantaneamente
set.clear(); // Set {}
map.clear(); // Map {}

// .size - Quantidade de itens (NÃO use .length!)
console.log(set.size); // 0
console.log(map.size); // 0
```

#### Ordem de Inserção Garantida:

Ao contrário de objetos antigos, **ambos garantem** que os itens serão iterados na ordem em que foram adicionados.

```javascript
const set = new Set([3, 1, 2]);
console.log([...set]); // [3, 1, 2] - ordem preservada!

const map = new Map([
  ["z", 1],
  ["a", 2],
  ["m", 3],
]);
for (const [k, v] of map) {
  console.log(k); // z, a, m - ordem preservada!
}
```

---

### 2. Tabela de Diferenças Fundamentais

| Característica         | Set 🟢                            | Map 🔵                                       |
| ---------------------- | --------------------------------- | -------------------------------------------- |
| **Estrutura**          | Lista de **valores únicos**       | Pares de **chave-valor**                     |
| **Finalidade**         | Garantir que algo não se repita   | Mapear/Associar uma informação a outra       |
| **Método de Inserção** | `.add(valor)`                     | `.set(chave, valor)`                         |
| **Recuperação**        | Não possui `.get()`               | Possui `.get(chave)`                         |
| **Chaves**             | O próprio valor age como "chave"  | Chaves podem ser qualquer tipo (até objetos) |
| **Verificação**        | `.has(valor)`                     | `.has(chave)`                                |
| **Uso em Algoritmos**  | Detecção de duplicatas e presença | Frequência, cache e rastreamento de índices  |
| **Valores duplicados** | ❌ Impossível                     | ✅ Permitido (chaves únicas, valores não)    |

---

### 3. Exemplos Side-by-Side

#### Inserção de Dados

```javascript
// SET - apenas valores
const set = new Set();
set.add("maçã");
set.add("banana");
set.add("maçã"); // Ignorado - duplicata!

console.log(set);
// Set {'maçã', 'banana'}

// MAP - chave-valor
const map = new Map();
map.set("maçã", 5);
map.set("banana", 3);
map.set("maçã", 10); // Atualiza o valor!

console.log(map);
// Map {'maçã' => 10, 'banana' => 3}
```

#### Recuperação de Dados

```javascript
// SET - verifica apenas existência
const set = new Set(["maçã", "banana"]);

set.has("maçã"); // true
// Não há .get() em Set! O valor É a chave.

// MAP - recupera o valor associado
const map = new Map([
  ["maçã", 5],
  ["banana", 3],
]);

map.has("maçã"); // true
map.get("maçã"); // 5 ✅
```

#### Iteração

```javascript
// SET - itera sobre valores
const set = new Set(["a", "b", "c"]);

for (const valor of set) {
  console.log(valor); // a, b, c
}

// MAP - itera sobre pares [chave, valor]
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

for (const [chave, valor] of map) {
  console.log(chave, valor); // a 1, b 2, c 3
}
```

---

### 4. A Curiosidade do `forEach`

Para manter a compatibilidade entre as coleções, o **Set** possui uma assinatura de `forEach` curiosa. Note como o **Map** passa `(valor, chave)`, mas como o **Set** não tem chave, ele **repete o valor**:

```javascript
// No Map: (valor, chave, map)
const meuMap = new Map([
  ["nome", "João"],
  ["idade", 25],
]);

meuMap.forEach((valor, chave, map) => {
  console.log(`${chave} -> ${valor}`);
});
// nome -> João
// idade -> 25

// No Set: (valor, valorRepetido, set)
const meuSet = new Set(["a", "b", "c"]);

meuSet.forEach((valor, valorRepetido, set) => {
  console.log(valor, valorRepetido);
  // valor === valorRepetido (sempre iguais!)
});
// a a
// b b
// c c
```

**Por que essa duplicação?**  
Para manter a assinatura consistente com `Map.forEach()` e `Array.forEach()`. É uma decisão de design para compatibilidade.

---

## 🔀 Qual escolher? (Fluxograma de Decisão)

### Cenário 1: Detecção de Duplicatas

**Pergunta:** Preciso apenas saber se um ID já foi processado?  
**Resposta:** ➡️ Use **Set**

```javascript
const idsProcessados = new Set();

function processar(id) {
  if (idsProcessados.has(id)) {
    console.log("ID já processado!");
    return;
  }

  idsProcessados.add(id);
  // processar...
}
```

---

### Cenário 2: Contagem de Frequência

**Pergunta:** Preciso saber quantas vezes uma palavra apareceu?  
**Resposta:** ➡️ Use **Map** (Palavra -> Contador)

```javascript
function contarPalavras(texto) {
  const frequencia = new Map();

  for (const palavra of texto.split(" ")) {
    frequencia.set(palavra, (frequencia.get(palavra) || 0) + 1);
  }

  return frequencia;
}

console.log(contarPalavras("o rato roeu a roupa do rato"));
// Map {'o' => 2, 'rato' => 2, 'roeu' => 1, 'a' => 1, 'roupa' => 1, 'do' => 1}
```

---

### Cenário 3: Lista Única

**Pergunta:** Preciso de uma lista de nomes sem duplicatas?  
**Resposta:** ➡️ Use **Set**

```javascript
const nomes = ["João", "Maria", "João", "Pedro", "Maria"];
const nomesUnicos = [...new Set(nomes)];

console.log(nomesUnicos);
// ['João', 'Maria', 'Pedro']
```

---

### Cenário 4: Rastreamento de Posições

**Pergunta:** Preciso guardar a última posição de cada letra na string?  
**Resposta:** ➡️ Use **Map** (Letra -> Índice)

```javascript
function ultimaPosicao(str) {
  const posicoes = new Map();

  for (let i = 0; i < str.length; i++) {
    posicoes.set(str[i], i);
  }

  return posicoes;
}

console.log(ultimaPosicao("abcabc"));
// Map {'a' => 3, 'b' => 4, 'c' => 5}
```

---

### Cenário 5: Operações de Conjuntos

**Pergunta:** Preciso realizar operações de união ou interseção?  
**Resposta:** ➡️ Use **Set**

```javascript
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// União
const uniao = new Set([...setA, ...setB]);
console.log(uniao); // Set {1, 2, 3, 4, 5, 6}

// Interseção
const intersecao = new Set([...setA].filter((x) => setB.has(x)));
console.log(intersecao); // Set {3, 4}

// Diferença
const diferenca = new Set([...setA].filter((x) => !setB.has(x)));
console.log(diferenca); // Set {1, 2}
```

---

## 🏆 Exemplo de Performance em Problemas de Entrevista

### Problema: "Longest Substring Without Repeating Characters"

A transição do **Set** para o **Map** é o que separa uma solução aceitável de uma solução otimizada:

#### Com Set (Boa solução - O(2n) no pior caso)

```javascript
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  let charSet = new Set();

  for (let right = 0; right < s.length; right++) {
    // Quando encontra duplicata, usa while para remover
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++; // Move passo a passo ⚠️
    }

    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

**Análise:**

- Quando encontra uma duplicata, você precisa de um loop `while`
- Vai removendo do Set passo a passo até limpar a duplicata
- Pode visitar cada caractere até 2 vezes (inserção + remoção)

---

#### Com Map (Solução otimizada - O(n))

```javascript
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  let charMap = new Map(); // Armazena: char -> índice

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // Quando encontra duplicata, consulta o índice no Map
    if (charMap.has(char) && charMap.get(char) >= left) {
      left = charMap.get(char) + 1; // Pula direto! ✅
    }

    charMap.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

**Análise:**

- Quando encontra uma duplicata, consulta o índice dela no Map
- Faz o ponteiro `left` **pular direto** para a posição correta
- Cada caractere é visitado apenas 1 vez
- **Mais eficiente!**

---

### Visualização Comparativa

Para `s = "abcabcbb"`:

**Com Set:**

```
"abcabcbb"
 LR          → Set {a}, max=1
 L R         → Set {a,b}, max=2
 L  R        → Set {a,b,c}, max=3
 L   R       → 'a' duplicado! while loop começa
   L  R      → Set {b,c,a}, max=3
   L   R     → 'b' duplicado! while loop começa
     L  R    → Set {c,a,b}, max=3
```

Loop `while` executa **múltiplas vezes** ⚠️

**Com Map:**

```
"abcabcbb"
 LR          → Map {a=>0}, max=1
 L R         → Map {a=>0,b=>1}, max=2
 L  R        → Map {a=>0,b=>1,c=>2}, max=3
 L   R       → 'a' duplicado em índice 0
   L  R      → left = 0+1 = 1 (pulo direto!) ✅
              → Map {a=>3,b=>1,c=>2}, max=3
```

Sem loop `while`, apenas atualização de `left` ✅

---

## 💡 Regra de Ouro

> **Se o problema pede para você "esquecer" o que viu, o `Set` resolve.**  
> **Se o problema pede para você "lembrar onde viu", o `Map` é obrigatório.**

### Exemplos:

| Problema                                    | Estrutura | Motivo                                  |
| ------------------------------------------- | --------- | --------------------------------------- |
| "Já processei este ID?"                     | Set       | Só precisa saber se existe              |
| "Quantas vezes vi esta palavra?"            | Map       | Precisa contar (palavra -> count)       |
| "Qual a última posição desta letra?"        | Map       | Precisa lembrar índice (letra -> index) |
| "Estes dois arrays têm elementos em comum?" | Set       | Apenas verificar presença               |
| "Agrupar pessoas por idade"                 | Map       | Precisa associar (idade -> [pessoas])   |

---

## 🎓 Quando Combinar Set e Map

Às vezes, usar **ambos** na mesma solução é a melhor abordagem!

### Exemplo: Remover duplicatas mantendo primeira ocorrência

```javascript
function primeiraOcorrencia(array) {
  const visto = new Set();
  const resultado = [];

  for (const item of array) {
    if (!visto.has(item)) {
      visto.add(item); // Set para rastrear
      resultado.push(item); // Array para ordem
    }
  }

  return resultado;
}

console.log(primeiraOcorrencia([1, 2, 2, 3, 4, 4, 5]));
// [1, 2, 3, 4, 5]
```

### Exemplo: Encontrar anagramas

```javascript
function agruparAnagramas(palavras) {
  const grupos = new Map(); // chaveOrdenada -> [palavras]

  for (const palavra of palavras) {
    // Ordenar letras para criar chave única
    const chave = palavra.split("").sort().join("");

    if (!grupos.has(chave)) {
      grupos.set(chave, []);
    }

    grupos.get(chave).push(palavra);
  }

  return [...grupos.values()];
}

console.log(agruparAnagramas(["eat", "tea", "tan", "ate", "nat", "bat"]));
// [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
```

---

## 🔥 Casos Especiais e Pegadinhas

### 1. NaN como chave/valor

Uma das maiores vantagens de Set e Map: eles tratam `NaN` corretamente!

```javascript
// Set
const set = new Set();
set.add(NaN);
set.add(NaN); // Ignorado - NaN é considerado igual a NaN!

console.log(set.size); // 1 ✅

// Map
const map = new Map();
map.set(NaN, "valor");
map.set(NaN, "novo valor"); // Atualiza!

console.log(map.get(NaN)); // 'novo valor' ✅

// Object (problema!)
const obj = {};
obj[NaN] = "valor";
console.log(obj); // {'NaN': 'valor'} - convertido para string ❌
```

---

### 2. Objetos como chaves

```javascript
// Set - comparação por referência
const set = new Set();
set.add({ id: 1 });
set.add({ id: 1 }); // Objetos diferentes!

console.log(set.size); // 2

// Map - comparação por referência
const map = new Map();
const obj = { id: 1 };

map.set(obj, "valor1");
map.set(obj, "valor2"); // Mesma referência - atualiza!

console.log(map.size); // 1
console.log(map.get(obj)); // 'valor2'
```

---

### 3. -0 e +0

```javascript
// Set e Map tratam -0 e +0 como iguais
const set = new Set();
set.add(0);
set.add(-0);

console.log(set.size); // 1 (são considerados iguais)

const map = new Map();
map.set(0, "zero");
map.set(-0, "menos zero");

console.log(map.size); // 1
console.log(map.get(-0)); // 'menos zero' (atualizado)
```

---

## 📊 Cheat Sheet Visual

```
┌─────────────────────────────────────────────────────────┐
│                    QUANDO USAR?                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐         ┌─────────────────┐      │
│  │      SET 🟢      │         │      MAP 🔵      │      │
│  └─────────────────┘         └─────────────────┘      │
│                                                         │
│  ✓ Valores únicos            ✓ Pares chave-valor      │
│  ✓ Verificar existência      ✓ Associar informações   │
│  ✓ Remover duplicatas        ✓ Contar frequências     │
│  ✓ Operações de conjunto     ✓ Rastrear posições      │
│  ✓ Lista de processados      ✓ Cache/Memoização       │
│                              ✓ Agrupamento de dados    │
│                                                         │
│  Métodos únicos:             Métodos únicos:           │
│  • .add(valor)               • .set(chave, valor)      │
│                              • .get(chave)             │
│                                                         │
│  Métodos compartilhados:                               │
│  • .has()  • .delete()  • .clear()  • .size           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Quiz Rápido

Teste seu conhecimento! Escolha Set ou Map:

1. **Remover emails duplicados de uma lista**

   - [ ] Set
   - [ ] Map

2. **Contar quantas vezes cada número aparece em um array**

   - [ ] Set
   - [ ] Map

3. **Verificar se já visitei um nó em um grafo**

   - [ ] Set
   - [ ] Map

4. **Armazenar configurações (chave: nome, valor: configuração)**

   - [ ] Set
   - [ ] Map

5. **Encontrar elementos comuns entre dois arrays**
   - [ ] Set
   - [ ] Map

### Respostas:

1. Set (apenas valores únicos)
2. Map (número -> contagem)
3. Set (apenas verificar presença)
4. Map (associar nome -> config)
5. Set (operação de interseção)

---

## 📚 Exercícios Práticos

### Exercício 1: Migração Set → Map

Você tem esta solução com Set:

```javascript
// Versão com Set
function temDuplicatas(array) {
  const set = new Set(array);
  return set.size !== array.length;
}
```

**Desafio:** Reescreva para usar Map e **retorne quais elementos estão duplicados** e **quantas vezes**.

<details>
<summary>Ver solução</summary>

```javascript
function encontrarDuplicatas(array) {
  const frequencia = new Map();

  for (const item of array) {
    frequencia.set(item, (frequencia.get(item) || 0) + 1);
  }

  const duplicados = new Map();
  for (const [item, count] of frequencia) {
    if (count > 1) {
      duplicados.set(item, count);
    }
  }

  return duplicados;
}

console.log(encontrarDuplicatas([1, 2, 2, 3, 3, 3, 4]));
// Map {2 => 2, 3 => 3}
```

</details>

---

### Exercício 2: Combinando Set e Map

**Desafio:** Dado um array de objetos `{id, categoria}`, retorne um Map onde a chave é a categoria e o valor é um Set de IDs únicos.

```javascript
const dados = [
  { id: 1, categoria: "A" },
  { id: 2, categoria: "B" },
  { id: 3, categoria: "A" },
  { id: 1, categoria: "A" }, // ID duplicado
];

// Resultado esperado:
// Map {
//   'A' => Set {1, 3},
//   'B' => Set {2}
// }
```

<details>
<summary>Ver solução</summary>

```javascript
function agruparPorCategoria(dados) {
  const grupos = new Map();

  for (const { id, categoria } of dados) {
    if (!grupos.has(categoria)) {
      grupos.set(categoria, new Set());
    }
    grupos.get(categoria).add(id);
  }

  return grupos;
}
```

</details>

---

## ✅ Checklist de Domínio

- [ ] Entendo a diferença fundamental entre Set e Map
- [ ] Sei quando usar Set (valores únicos, verificação)
- [ ] Sei quando usar Map (chave-valor, rastreamento)
- [ ] Conheço os métodos compartilhados (has, delete, clear, size)
- [ ] Entendo a curiosidade do forEach no Set
- [ ] Sei por que Map é melhor que Set para "Longest Substring"
- [ ] Consigo identificar quando combinar Set e Map
- [ ] Entendo como NaN é tratado em ambos
- [ ] Sei a diferença de performance entre Set e Map
- [ ] Resolvi pelo menos 3 problemas usando cada um

---

## 🔗 Recursos Adicionais

### Documentação Oficial

- [MDN - Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN - Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

### Problemas LeetCode Recomendados

**Para praticar Set:**

- #217 - Contains Duplicate
- #349 - Intersection of Two Arrays
- #771 - Jewels and Stones

**Para praticar Map:**

- #1 - Two Sum
- #3 - Longest Substring Without Repeating Characters
- #49 - Group Anagrams
- #383 - Ransom Note
- #454 - 4Sum II

**Para praticar ambos:**

- #350 - Intersection of Two Arrays II
- #599 - Minimum Index Sum of Two Lists

---

## 💎 Dica de Mestre

> Lembre-se que **NaN** pode ser usado como chave em um Map e valor único em um Set, algo que objetos normais tratam com dificuldade! 🚀

```javascript
// Isso funciona perfeitamente!
const meuMap = new Map();
meuMap.set(NaN, "Este é o valor de NaN");
console.log(meuMap.get(NaN)); // 'Este é o valor de NaN'

const meuSet = new Set([NaN, NaN, NaN]);
console.log(meuSet.size); // 1 - apenas um NaN!
```

---

**Última atualização:** Dezembro 2025  
**Nível:** Intermediário a Avançado  
**Tags:** `Set` `Map` `Data Structures` `Interview Prep` `Algorithm Optimization`

🎓 **Próximo passo:** Domine WeakSet e WeakMap para casos de uso com garbage collection!
