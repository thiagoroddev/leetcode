# Guia Completo: Set em JavaScript

## 📖 O que é um Set?

Um **Set** é uma coleção de valores **únicos**. Diferente de um Array, um Set não permite duplicatas e não possui índices.

```javascript
const numeros = new Set([1, 2, 3, 2, 1]); // Set {1, 2, 3}
```

---

## 🎯 Quando Usar Set?

### ✅ USE Set quando:

1. **Precisa garantir valores únicos**

   ```javascript
   const tags = new Set(["javascript", "react", "javascript"]);
   // Set {'javascript', 'react'}
   ```

2. **Verificar se um valor existe (O(1))**

   ```javascript
   const visitados = new Set([1, 5, 10]);
   visitados.has(5); // true - muito rápido!
   ```

3. **Remover duplicatas de um array**

   ```javascript
   const array = [1, 2, 2, 3, 4, 4, 5];
   const unicos = [...new Set(array)]; // [1, 2, 3, 4, 5]
   ```

4. **Operações matemáticas (união, interseção, diferença)**

   ```javascript
   const setA = new Set([1, 2, 3]);
   const setB = new Set([3, 4, 5]);
   ```

5. **Rastrear itens já processados**
   ```javascript
   const processados = new Set();
   if (!processados.has(item)) {
     processados.add(item);
     // processar...
   }
   ```

### ❌ NÃO use Set quando:

1. **Precisa de valores duplicados**
2. **Precisa acessar por índice** (use Array)
3. **Precisa de pares chave-valor** (use Map ou Object)
4. **Ordem de inserção não é garantida** (na verdade é, mas não é o propósito)
5. **Precisa de métodos de array** (map, filter, reduce)

---

## 🛠️ Criando um Set

### 1. Set Vazio

```javascript
const meuSet = new Set();
```

### 2. Set a partir de um Array

```javascript
const numeros = new Set([1, 2, 3, 4, 5]);
```

### 3. Set a partir de String

```javascript
const letras = new Set("hello");
// Set {'h', 'e', 'l', 'o'} - 'l' aparece apenas uma vez
```

### 4. Set com valores iniciais

```javascript
const frutas = new Set(["maçã", "banana", "laranja"]);
```

---

## 📚 Métodos Principais do Set

### 1. `add(valor)` - Adicionar elemento

```javascript
const cores = new Set();

cores.add("vermelho");
cores.add("azul");
cores.add("verde");
cores.add("vermelho"); // Ignorado - já existe

console.log(cores); // Set {'vermelho', 'azul', 'verde'}
```

**Retorna:** O próprio Set (permite encadeamento)

```javascript
cores.add("amarelo").add("roxo").add("rosa");
```

---

### 2. `has(valor)` - Verificar se existe

```javascript
const numeros = new Set([1, 2, 3, 4, 5]);

console.log(numeros.has(3)); // true
console.log(numeros.has(10)); // false
```

**Complexidade:** O(1) - muito rápido!  
**Retorna:** Boolean

**Comparação com Array:**

```javascript
// Array - O(n) - lento
const array = [1, 2, 3, 4, 5];
array.includes(3); // percorre até encontrar

// Set - O(1) - rápido
const set = new Set([1, 2, 3, 4, 5]);
set.has(3); // busca direta
```

---

### 3. `delete(valor)` - Remover elemento

```javascript
const frutas = new Set(["maçã", "banana", "laranja"]);

frutas.delete("banana");
console.log(frutas); // Set {'maçã', 'laranja'}

frutas.delete("uva"); // não existe, não faz nada
```

**Retorna:** `true` se removeu, `false` se não existia

```javascript
if (frutas.delete("maçã")) {
  console.log("Maçã removida com sucesso");
}
```

---

### 4. `clear()` - Limpar tudo

```javascript
const numeros = new Set([1, 2, 3, 4, 5]);

numeros.clear();
console.log(numeros); // Set {}
console.log(numeros.size); // 0
```

**Retorna:** undefined

---

### 5. `size` - Tamanho do Set

```javascript
const letras = new Set(["a", "b", "c"]);

console.log(letras.size); // 3
```

**Nota:** É uma **propriedade**, não um método (sem parênteses!)

**Comparação com Array:**

```javascript
const array = [1, 2, 3];
array.length; // propriedade

const set = new Set([1, 2, 3]);
set.size; // propriedade (não é .length!)
```

---

## 🔄 Iterando sobre um Set

### 1. `for...of` (Mais comum)

```javascript
const cores = new Set(["vermelho", "azul", "verde"]);

for (const cor of cores) {
  console.log(cor);
}
// vermelho
// azul
// verde
```

---

### 2. `forEach()`

```javascript
const numeros = new Set([1, 2, 3, 4, 5]);

numeros.forEach((valor) => {
  console.log(valor * 2);
});
// 2, 4, 6, 8, 10
```

**Sintaxe completa:**

```javascript
numeros.forEach((valor, chave, set) => {
  // Em Set, valor === chave (por compatibilidade com Map)
  console.log(valor);
});
```

---

### 3. Converter para Array e usar métodos de array

```javascript
const numeros = new Set([1, 2, 3, 4, 5]);

// Spread operator
const array1 = [...numeros];

// Array.from()
const array2 = Array.from(numeros);

// Agora pode usar map, filter, etc
const dobrados = [...numeros].map((n) => n * 2);
console.log(dobrados); // [2, 4, 6, 8, 10]
```

---

### 4. Métodos de iteração

```javascript
const frutas = new Set(["maçã", "banana", "laranja"]);

// values() - retorna um iterator
for (const fruta of frutas.values()) {
  console.log(fruta);
}

// keys() - em Set, é igual a values()
for (const fruta of frutas.keys()) {
  console.log(fruta);
}

// entries() - retorna [valor, valor]
for (const [chave, valor] of frutas.entries()) {
  console.log(chave, valor); // chave === valor em Set
}
```

---

## 💡 Casos de Uso Práticos

### 1. Remover Duplicatas

```javascript
function removerDuplicatas(array) {
  return [...new Set(array)];
}

const numeros = [1, 2, 2, 3, 4, 4, 5, 5, 5];
console.log(removerDuplicatas(numeros)); // [1, 2, 3, 4, 5]
```

**Uso real:**

```javascript
// Remover tags duplicadas
const tags = ["javascript", "react", "javascript", "node", "react"];
const tagsUnicas = [...new Set(tags)];
// ['javascript', 'react', 'node']
```

---

### 2. Verificar Substring Única (LeetCode Problem!)

```javascript
function temCaracteresUnicos(str) {
  return str.length === new Set(str).size;
}

console.log(temCaracteresUnicos("abcdef")); // true
console.log(temCaracteresUnicos("abcabc")); // false
```

**Aplicação:**

```javascript
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  let charSet = new Set();

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

---

### 3. Rastrear Itens Visitados

```javascript
function imprimirSemRepeticao(array) {
  const visitados = new Set();

  for (const item of array) {
    if (!visitados.has(item)) {
      console.log(item);
      visitados.add(item);
    }
  }
}

imprimirSemRepeticao([1, 2, 2, 3, 4, 4, 5]);
// 1
// 2
// 3
// 4
// 5
```

**Uso em grafos:**

```javascript
function buscarEmProfundidade(grafo, inicio) {
  const visitados = new Set();

  function dfs(no) {
    if (visitados.has(no)) return;

    visitados.add(no);
    console.log(no);

    for (const vizinho of grafo[no]) {
      dfs(vizinho);
    }
  }

  dfs(inicio);
}
```

---

### 4. Operações de Conjuntos

#### União

```javascript
function uniao(setA, setB) {
  return new Set([...setA, ...setB]);
}

const a = new Set([1, 2, 3]);
const b = new Set([3, 4, 5]);
console.log(uniao(a, b)); // Set {1, 2, 3, 4, 5}
```

#### Interseção

```javascript
function intersecao(setA, setB) {
  return new Set([...setA].filter((x) => setB.has(x)));
}

const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);
console.log(intersecao(a, b)); // Set {2, 3}
```

#### Diferença

```javascript
function diferenca(setA, setB) {
  return new Set([...setA].filter((x) => !setB.has(x)));
}

const a = new Set([1, 2, 3, 4]);
const b = new Set([3, 4, 5]);
console.log(diferenca(a, b)); // Set {1, 2}
```

#### É Subconjunto?

```javascript
function ehSubconjunto(subSet, superSet) {
  return [...subSet].every((x) => superSet.has(x));
}

const a = new Set([1, 2]);
const b = new Set([1, 2, 3, 4]);
console.log(ehSubconjunto(a, b)); // true
```

---

### 5. Contagem de Elementos Únicos

```javascript
function contarPalavrasUnicas(texto) {
  const palavras = texto.toLowerCase().split(" ");
  return new Set(palavras).size;
}

const texto = "O rato roeu a roupa do rei de Roma";
console.log(contarPalavrasUnicas(texto)); // 8
```

---

### 6. Cache Simples

```javascript
class Cache {
  constructor() {
    this.cache = new Set();
  }

  adicionar(item) {
    if (this.cache.has(item)) {
      console.log("Item já existe no cache");
      return false;
    }
    this.cache.add(item);
    return true;
  }

  tem(item) {
    return this.cache.has(item);
  }

  limpar() {
    this.cache.clear();
  }
}

const cache = new Cache();
cache.adicionar("user:123");
cache.adicionar("user:456");
cache.adicionar("user:123"); // Item já existe no cache
```

---

## ⚖️ Set vs Array vs Map vs Object

| Característica | Set      | Array     | Map                    | Object                 |
| -------------- | -------- | --------- | ---------------------- | ---------------------- |
| Valores únicos | ✅ Sim   | ❌ Não    | ❌ Não (chaves únicas) | ❌ Não (chaves únicas) |
| Índice/Posição | ❌ Não   | ✅ Sim    | ❌ Não                 | ❌ Não                 |
| Ordem mantida  | ✅ Sim\* | ✅ Sim    | ✅ Sim                 | ⚠️ Parcial             |
| Chave-Valor    | ❌ Não   | ❌ Não    | ✅ Sim                 | ✅ Sim                 |
| Busca O(1)     | ✅ Sim   | ❌ O(n)   | ✅ Sim                 | ✅ Sim                 |
| Tamanho        | `.size`  | `.length` | `.size`                | `Object.keys().length` |
| Métodos úteis  | poucos   | muitos    | vários                 | vários                 |
| Iteração       | ✅ Fácil | ✅ Fácil  | ✅ Fácil               | ⚠️ Precisa converter   |

\*Set mantém ordem de inserção desde ES6

---

## 🎓 Quando usar cada um?

### Use **Set** quando:

- Precisa de valores únicos
- Verificação rápida de existência
- Operações matemáticas de conjuntos
- Rastreamento de itens processados

### Use **Array** quando:

- Permite duplicatas
- Precisa de índices
- Precisa de map/filter/reduce
- Ordem e posição são importantes

### Use **Map** quando:

- Precisa de chave-valor
- Chaves podem ser qualquer tipo
- Precisa iterar sobre pares
- Frequência de add/delete

### Use **Object** quando:

- Chaves são sempre strings
- Estrutura de dados simples
- JSON compatibility
- Propriedades nomeadas

---

## 🔍 Comparação de Performance

### Busca: `has()` vs `includes()`

```javascript
// Set - O(1)
const set = new Set([...Array(1000000).keys()]);
console.time("Set has");
set.has(999999);
console.timeEnd("Set has"); // ~0.001ms

// Array - O(n)
const array = [...Array(1000000).keys()];
console.time("Array includes");
array.includes(999999);
console.timeEnd("Array includes"); // ~10ms
```

**Set é ~10.000x mais rápido!**

### Adição

```javascript
// Set - O(1)
const set = new Set();
console.time("Set add");
for (let i = 0; i < 100000; i++) {
  set.add(i);
}
console.timeEnd("Set add"); // ~10ms

// Array - O(1) também
const array = [];
console.time("Array push");
for (let i = 0; i < 100000; i++) {
  array.push(i);
}
console.timeEnd("Array push"); // ~5ms
```

**Array é ligeiramente mais rápido para adicionar**

### Conclusão:

- **Set**: Melhor para busca/verificação
- **Array**: Melhor para adicionar e métodos de transformação

---

## 🚫 Limitações do Set

### 1. Não tem índices

```javascript
const set = new Set([1, 2, 3]);
set[0]; // undefined ❌
// Precisa converter para array primeiro
[...set][0]; // 1 ✅
```

### 2. Não tem métodos de array

```javascript
const set = new Set([1, 2, 3, 4, 5]);

// Não funciona ❌
set.map((x) => x * 2); // TypeError
set.filter((x) => x > 2); // TypeError

// Precisa converter ✅
[...set].map((x) => x * 2); // [2, 4, 6, 8, 10]
[...set].filter((x) => x > 2); // [3, 4, 5]
```

### 3. Igualdade por referência em objetos

```javascript
const set = new Set();

set.add({ nome: "João" });
set.add({ nome: "João" }); // Objetos diferentes!

console.log(set.size); // 2 (não 1!)
```

**Solução:**

```javascript
const obj1 = { nome: "João" };
const set = new Set();

set.add(obj1);
set.add(obj1); // Mesma referência

console.log(set.size); // 1 ✅
```

### 4. Sem chave-valor direto

```javascript
// Se precisa de chave-valor, use Map!
const map = new Map();
map.set("nome", "João");
map.set("idade", 25);
```

---

## 📝 Resumo Rápido

```javascript
// Criar
const set = new Set([1, 2, 3]);

// Adicionar
set.add(4); // Set {1, 2, 3, 4}

// Verificar
set.has(2); // true

// Remover
set.delete(3); // Set {1, 2, 4}

// Tamanho
set.size; // 3

// Limpar tudo
set.clear(); // Set {}

// Iterar
for (const valor of set) {
  console.log(valor);
}

// Converter para Array
const array = [...set];
const array2 = Array.from(set);

// Remover duplicatas
const unicos = [...new Set([1, 1, 2, 2, 3])]; // [1, 2, 3]
```

---

## 🎯 Exercícios Práticos

### Nível Fácil

1. **Criar um Set com 5 números e imprimir seu tamanho**

```javascript
// Seu código aqui
```

2. **Remover duplicatas de um array**

```javascript
function removerDuplicatas(arr) {
  // Seu código aqui
}
console.log(removerDuplicatas([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
```

3. **Verificar se uma string tem todos caracteres únicos**

```javascript
function caracteresUnicos(str) {
  // Seu código aqui
}
console.log(caracteresUnicos("abcdef")); // true
console.log(caracteresUnicos("abcdea")); // false
```

### Nível Médio

4. **Contar quantas palavras únicas tem em uma frase**

```javascript
function contarPalavrasUnicas(frase) {
  // Seu código aqui
}
console.log(contarPalavrasUnicas("o rato roeu a roupa")); // 5
```

5. **Encontrar elementos comuns entre dois arrays**

```javascript
function elementosComuns(arr1, arr2) {
  // Seu código aqui
}
console.log(elementosComuns([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]
```

6. **Verificar se um array é subconjunto de outro**

```javascript
function ehSubconjunto(arr1, arr2) {
  // Seu código aqui
}
console.log(ehSubconjunto([1, 2], [1, 2, 3, 4])); // true
```

### Nível Difícil

7. **Implementar um sistema de permissões**

```javascript
class Permissoes {
  constructor() {
    // Seu código aqui
  }

  adicionar(permissao) {
    // Seu código aqui
  }

  remover(permissao) {
    // Seu código aqui
  }

  tem(permissao) {
    // Seu código aqui
  }
}

const permissoes = new Permissoes();
permissoes.adicionar("ler");
permissoes.adicionar("escrever");
console.log(permissoes.tem("ler")); // true
```

8. **Longest Substring Without Repeating Characters (LeetCode)**

```javascript
function lengthOfLongestSubstring(s) {
  // Implemente usando Set!
}
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
```

---

## 🔗 Recursos Adicionais

### Documentação

- [MDN - Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [JavaScript.info - Set](https://javascript.info/map-set)

### Vídeos

- [Web Dev Simplified - JavaScript Sets](https://www.youtube.com/watch?v=PrjuFCIHH_E)
- [Traversy Media - Sets in JavaScript](https://www.youtube.com/watch?v=PowDDGWL5BM)

### Prática

- LeetCode - Tag "Hash Table"
- HackerRank - Data Structures

---

## ✅ Checklist de Domínio

- [ ] Sei criar um Set vazio e com valores iniciais
- [ ] Domino os 5 métodos principais (add, has, delete, clear, size)
- [ ] Consigo iterar sobre um Set de 3 formas diferentes
- [ ] Sei converter Set ↔ Array
- [ ] Entendo quando usar Set vs Array
- [ ] Sei usar Set para remover duplicatas
- [ ] Consigo implementar operações de conjuntos (união, interseção)
- [ ] Entendo a complexidade O(1) do método has()
- [ ] Sei as limitações do Set
- [ ] Resolvi pelo menos 3 problemas usando Set

---

**Criado em:** Dezembro 2025  
**Tópico:** Estruturas de Dados em JavaScript  
**Nível:** Iniciante a Intermediário

💡 **Dica final:** Set é uma ferramenta poderosa quando você precisa de valores únicos e busca rápida. Pratique identificar esses padrões em problemas! 🚀

---

# Guia Completo: Map em JavaScript

## 📖 O que é um Map?

Um **Map** é uma coleção de pares **chave-valor** onde as chaves podem ser de **qualquer tipo** (não apenas strings como em Objects). Map mantém a ordem de inserção e oferece métodos poderosos para manipulação.

```javascript
const mapa = new Map();
mapa.set("nome", "João");
mapa.set(1, "um");
mapa.set(true, "verdadeiro");
```

---
