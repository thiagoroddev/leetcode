## 🎯 Quando Usar Map?

### ✅ USE Map quando:

1. **Chaves podem ser de qualquer tipo**

   ```javascript
   const mapa = new Map();
   mapa.set(1, "número"); // chave: número
   mapa.set("1", "string"); // chave: string
   mapa.set({ id: 1 }, "objeto"); // chave: objeto
   mapa.set([1, 2], "array"); // chave: array
   ```

2. **Precisa iterar frequentemente**

   ```javascript
   for (const [chave, valor] of mapa) {
     console.log(chave, valor);
   }
   ```

3. **Adiciona/remove pares frequentemente**

   ```javascript
   mapa.set("nova", "chave");
   mapa.delete("antiga");
   ```

4. **Precisa saber o tamanho facilmente**

   ```javascript
   console.log(mapa.size); // instantâneo
   ```

5. **Armazena metadados ou configurações**
   ```javascript
   const config = new Map([
     ["theme", "dark"],
     ["language", "pt-BR"],
     ["fontSize", 16],
   ]);
   ```

### ❌ NÃO use Map quando:

1. **Só precisa de chaves string** (use Object)
2. **Precisa de JSON.stringify** (Map não é serializável)
3. **Estrutura simples e fixa** (use Object literal)
4. **Propriedades nomeadas conhecidas** (use Object)

---

## 🛠️ Criando um Map

### 1. Map Vazio

```javascript
const mapa = new Map();
```

### 2. Map com valores iniciais (array de pares)

```javascript
const frutas = new Map([
  ["maçã", 5],
  ["banana", 3],
  ["laranja", 8],
]);
```

### 3. Map a partir de Object

```javascript
const obj = { nome: "João", idade: 25 };
const mapa = new Map(Object.entries(obj));
```

### 4. Copiar outro Map

```javascript
const original = new Map([
  ["a", 1],
  ["b", 2],
]);
const copia = new Map(original);
```

---

## 📚 Métodos Principais do Map

### 1. `set(chave, valor)` - Adicionar/Atualizar

```javascript
const usuarios = new Map();

// Adicionar
usuarios.set("user123", { nome: "João", idade: 25 });
usuarios.set("user456", { nome: "Maria", idade: 30 });

// Atualizar (mesma chave)
usuarios.set("user123", { nome: "João Silva", idade: 26 });

console.log(usuarios);
// Map {
//   'user123' => {nome: 'João Silva', idade: 26},
//   'user456' => {nome: 'Maria', idade: 30}
// }
```

**Retorna:** O próprio Map (permite encadeamento)

```javascript
const mapa = new Map();
mapa.set("a", 1).set("b", 2).set("c", 3);
```

**Chaves de qualquer tipo:**

```javascript
const mapa = new Map();

// Número como chave
mapa.set(1, "um");
mapa.set(2, "dois");

// Boolean como chave
mapa.set(true, "verdadeiro");
mapa.set(false, "falso");

// Objeto como chave
const obj = { id: 1 };
mapa.set(obj, "dados do objeto");

// Array como chave
mapa.set([1, 2], "array como chave");

// Function como chave
const fn = () => {};
mapa.set(fn, "função");
```

---

### 2. `get(chave)` - Obter valor

```javascript
const precos = new Map([
  ["maçã", 3.5],
  ["banana", 2.0],
  ["laranja", 4.0],
]);

console.log(precos.get("maçã")); // 3.50
console.log(precos.get("uva")); // undefined
```

**Complexidade:** O(1) - muito rápido!

**Com valor padrão:**

```javascript
const valor = precos.get("uva") || 0; // 0 se não existir
```

---

### 3. `has(chave)` - Verificar se existe

```javascript
const cache = new Map([
  ["user:123", { nome: "João" }],
  ["user:456", { nome: "Maria" }],
]);

console.log(cache.has("user:123")); // true
console.log(cache.has("user:789")); // false
```

**Complexidade:** O(1)  
**Retorna:** Boolean

**Uso comum:**

```javascript
if (!cache.has(userId)) {
  // buscar do banco de dados
  const user = await fetchUser(userId);
  cache.set(userId, user);
}
return cache.get(userId);
```

---

### 4. `delete(chave)` - Remover par

```javascript
const estoque = new Map([
  ["notebook", 10],
  ["mouse", 50],
  ["teclado", 30],
]);

estoque.delete("mouse");
console.log(estoque);
// Map {'notebook' => 10, 'teclado' => 30}

estoque.delete("webcam"); // não existe, não faz nada
```

**Retorna:** `true` se removeu, `false` se não existia

```javascript
if (estoque.delete("notebook")) {
  console.log("Item removido com sucesso");
} else {
  console.log("Item não encontrado");
}
```

---

### 5. `clear()` - Limpar tudo

```javascript
const dados = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

dados.clear();
console.log(dados); // Map {}
console.log(dados.size); // 0
```

**Retorna:** undefined

---

### 6. `size` - Tamanho do Map

```javascript
const frutas = new Map([
  ["maçã", 5],
  ["banana", 3],
  ["laranja", 8],
]);

console.log(frutas.size); // 3
```

**Nota:** É uma **propriedade**, não um método (sem parênteses!)

**Comparação:**

```javascript
// Object - precisa converter
const obj = { a: 1, b: 2, c: 3 };
Object.keys(obj).length; // 3

// Map - direto
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
map.size; // 3
```

---

## 🔄 Iterando sobre um Map

### 1. `for...of` (Mais comum) - Itera sobre [chave, valor]

```javascript
const precos = new Map([
  ["maçã", 3.5],
  ["banana", 2.0],
  ["laranja", 4.0],
]);

for (const [fruta, preco] of precos) {
  console.log(`${fruta}: R$ ${preco}`);
}
// maçã: R$ 3.50
// banana: R$ 2.00
// laranja: R$ 4.00
```

**Apenas chaves:**

```javascript
for (const [chave] of precos) {
  console.log(chave);
}
```

**Apenas valores:**

```javascript
for (const [, valor] of precos) {
  console.log(valor);
}
```

---

### 2. `forEach(callback)`

```javascript
const usuarios = new Map([
  ["user1", "João"],
  ["user2", "Maria"],
  ["user3", "Pedro"],
]);

usuarios.forEach((valor, chave, map) => {
  console.log(`${chave}: ${valor}`);
});
// user1: João
// user2: Maria
// user3: Pedro
```

**Ordem dos parâmetros:** `(valor, chave, map)` - diferente de Array!

---

### 3. `keys()` - Iterar sobre chaves

```javascript
const mapa = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

for (const chave of mapa.keys()) {
  console.log(chave); // a, b, c
}

// Converter para array
const chaves = [...mapa.keys()]; // ['a', 'b', 'c']
const chaves2 = Array.from(mapa.keys()); // ['a', 'b', 'c']
```

---

### 4. `values()` - Iterar sobre valores

```javascript
const precos = new Map([
  ["maçã", 3.5],
  ["banana", 2.0],
  ["laranja", 4.0],
]);

for (const preco of precos.values()) {
  console.log(preco); // 3.50, 2.00, 4.00
}

// Converter para array
const valores = [...precos.values()]; // [3.50, 2.00, 4.00]
```

---

### 5. `entries()` - Iterar sobre pares [chave, valor]

```javascript
const mapa = new Map([
  ["nome", "João"],
  ["idade", 25],
  ["cidade", "São Paulo"],
]);

for (const [chave, valor] of mapa.entries()) {
  console.log(`${chave}: ${valor}`);
}
// nome: João
// idade: 25
// cidade: São Paulo

// Converter para array
const pares = [...mapa.entries()];
// [['nome', 'João'], ['idade', 25], ['cidade', 'São Paulo']]
```

**Nota:** `for...of` no Map já itera sobre entries por padrão!

---

## 💡 Casos de Uso Práticos

### 1. Cache de Dados

```javascript
class Cache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = 60000) {
    // TTL em ms
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) return null;

    // Verificar se expirou
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  has(key) {
    return this.cache.has(key) && this.get(key) !== null;
  }

  clear() {
    this.cache.clear();
  }
}

// Uso
const cache = new Cache();
cache.set("user:123", { nome: "João" }, 5000); // expira em 5s

console.log(cache.get("user:123")); // {nome: 'João'}
// Após 5 segundos...
console.log(cache.get("user:123")); // null
```

---

### 2. Contagem de Frequência

```javascript
function contarFrequencia(array) {
  const frequencia = new Map();

  for (const item of array) {
    frequencia.set(item, (frequencia.get(item) || 0) + 1);
  }

  return frequencia;
}

const numeros = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
const freq = contarFrequencia(numeros);

console.log(freq);
// Map {1 => 1, 2 => 2, 3 => 3, 4 => 4}

// Encontrar o mais frequente
let maisFrequente = null;
let maxCount = 0;

for (const [numero, count] of freq) {
  if (count > maxCount) {
    maxCount = count;
    maisFrequente = numero;
  }
}

console.log(`Mais frequente: ${maisFrequente} (${maxCount}x)`);
// Mais frequente: 4 (4x)
```

**Aplicação em strings:**

```javascript
function contarLetras(texto) {
  const freq = new Map();

  for (const letra of texto.toLowerCase()) {
    if (letra.match(/[a-z]/)) {
      freq.set(letra, (freq.get(letra) || 0) + 1);
    }
  }

  return freq;
}

console.log(contarLetras("hello world"));
// Map {'h'=>1, 'e'=>1, 'l'=>3, 'o'=>2, 'w'=>1, 'r'=>1, 'd'=>1}
```

---

### 3. Rastreamento de Posições (LeetCode!)

```javascript
function lengthOfLongestSubstring(s) {
  let maxLength = 0;
  let left = 0;
  let charMap = new Map(); // Armazena: caractere -> última posição

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
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("dvdf")); // 3
```

**Por que Map aqui?**

- Armazena último índice de cada caractere
- `get()` é O(1)
- Pula diretamente para posição correta

---

### 4. Agrupamento de Dados

```javascript
function agruparPor(array, propriedade) {
  const grupos = new Map();

  for (const item of array) {
    const chave = item[propriedade];

    if (!grupos.has(chave)) {
      grupos.set(chave, []);
    }

    grupos.get(chave).push(item);
  }

  return grupos;
}

const pessoas = [
  { nome: "João", idade: 25 },
  { nome: "Maria", idade: 30 },
  { nome: "Pedro", idade: 25 },
  { nome: "Ana", idade: 30 },
];

const porIdade = agruparPor(pessoas, "idade");

console.log(porIdade);
// Map {
//   25 => [{nome: 'João', idade: 25}, {nome: 'Pedro', idade: 25}],
//   30 => [{nome: 'Maria', idade: 30}, {nome: 'Ana', idade: 30}]
// }
```

---

### 5. Memoização (Cache de Funções)

```javascript
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      console.log("Cache hit!");
      return cache.get(key);
    }

    console.log("Calculando...");
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Função pesada
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const fibMemo = memoize(fibonacci);

console.log(fibMemo(40)); // Calculando... (lento)
console.log(fibMemo(40)); // Cache hit! (instantâneo)
```

---

### 6. Sistema de Configuração

```javascript
class Config {
  constructor() {
    this.settings = new Map([
      ["theme", "light"],
      ["language", "pt-BR"],
      ["fontSize", 14],
      ["notifications", true],
    ]);
  }

  get(key) {
    return this.settings.get(key);
  }

  set(key, value) {
    this.settings.set(key, value);
    console.log(`Configuração atualizada: ${key} = ${value}`);
  }

  reset() {
    this.settings.clear();
    console.log("Configurações resetadas");
  }

  export() {
    return Object.fromEntries(this.settings);
  }

  import(obj) {
    for (const [key, value] of Object.entries(obj)) {
      this.settings.set(key, value);
    }
  }
}

const config = new Config();
console.log(config.get("theme")); // 'light'
config.set("theme", "dark"); // Configuração atualizada: theme = dark
console.log(config.export()); // {theme: 'dark', language: 'pt-BR', ...}
```

---

### 7. Relacionamento de Dados

```javascript
const usuarios = new Map([
  [1, { nome: "João", email: "joao@email.com" }],
  [2, { nome: "Maria", email: "maria@email.com" }],
  [3, { nome: "Pedro", email: "pedro@email.com" }],
]);

const pedidos = new Map([
  [101, { usuarioId: 1, produto: "Notebook", valor: 3000 }],
  [102, { usuarioId: 2, produto: "Mouse", valor: 50 }],
  [103, { usuarioId: 1, produto: "Teclado", valor: 200 }],
]);

// Obter pedidos de um usuário
function obterPedidosUsuario(usuarioId) {
  const pedidosUsuario = [];

  for (const [pedidoId, pedido] of pedidos) {
    if (pedido.usuarioId === usuarioId) {
      pedidosUsuario.push({ pedidoId, ...pedido });
    }
  }

  return pedidosUsuario;
}

console.log(obterPedidosUsuario(1));
// [
//   {pedidoId: 101, usuarioId: 1, produto: 'Notebook', valor: 3000},
//   {pedidoId: 103, usuarioId: 1, produto: 'Teclado', valor: 200}
// ]
```

---

### 8. Grafo (Relações)

```javascript
class Grafo {
  constructor() {
    this.adjacencias = new Map();
  }

  adicionarVertice(vertice) {
    if (!this.adjacencias.has(vertice)) {
      this.adjacencias.set(vertice, []);
    }
  }

  adicionarAresta(v1, v2) {
    this.adicionarVertice(v1);
    this.adicionarVertice(v2);

    this.adjacencias.get(v1).push(v2);
    this.adjacencias.get(v2).push(v1); // grafo não direcionado
  }

  obterVizinhos(vertice) {
    return this.adjacencias.get(vertice) || [];
  }

  imprimir() {
    for (const [vertice, vizinhos] of this.adjacencias) {
      console.log(`${vertice} -> ${vizinhos.join(", ")}`);
    }
  }
}

const grafo = new Grafo();
grafo.adicionarAresta("A", "B");
grafo.adicionarAresta("A", "C");
grafo.adicionarAresta("B", "D");
grafo.adicionarAresta("C", "D");

grafo.imprimir();
// A -> B, C
// B -> A, D
// C -> A, D
// D -> B, C
```

---

## ⚖️ Map vs Object

| Característica | Map                    | Object                         |
| -------------- | ---------------------- | ------------------------------ |
| Tipo de chave  | Qualquer tipo          | String/Symbol                  |
| Ordem          | Garantida (inserção)   | Não garantida\*                |
| Tamanho        | `.size` (O(1))         | `Object.keys().length`         |
| Iteração       | `for...of` direto      | Precisa `Object.entries()`     |
| Performance    | Melhor para add/delete | Melhor para acesso simples     |
| JSON           | ❌ Não suporta         | ✅ Sim                         |
| Herança        | Limpo                  | Herda de prototype             |
| Chaves padrão  | Nenhuma                | `constructor`, `toString`, etc |

\*Parcialmente garantida em ES6+

---

## 🔍 Comparação Detalhada

### Chaves de Qualquer Tipo

```javascript
// Object - apenas strings/symbols
const obj = {};
obj[1] = "um";
obj[true] = "verdadeiro";
obj[{ id: 1 }] = "objeto";

console.log(obj);
// {
//   "1": "um",              // convertido para string
//   "true": "verdadeiro",   // convertido para string
//   "[object Object]": "objeto"  // toString()
// }

// Map - tipos preservados
const map = new Map();
map.set(1, "um");
map.set(true, "verdadeiro");
map.set({ id: 1 }, "objeto");

console.log(map);
// Map {
//   1 => 'um',              // número real
//   true => 'verdadeiro',   // boolean real
//   {id: 1} => 'objeto'     // objeto real
// }
```

### Ordem de Iteração

```javascript
// Object - ordem não garantida (mas geralmente mantida)
const obj = {
  z: 1,
  a: 2,
  m: 3,
};

// Map - ordem sempre garantida
const map = new Map([
  ["z", 1],
  ["a", 2],
  ["m", 3],
]);

for (const [key, value] of map) {
  console.log(key); // z, a, m (sempre nesta ordem)
}
```

### Performance

```javascript
// Teste: 1 milhão de operações

// Map
const map = new Map();
console.time("Map set");
for (let i = 0; i < 1000000; i++) {
  map.set(i, i);
}
console.timeEnd("Map set"); // ~50ms

console.time("Map get");
for (let i = 0; i < 1000000; i++) {
  map.get(i);
}
console.timeEnd("Map get"); // ~20ms

// Object
const obj = {};
console.time("Object set");
for (let i = 0; i < 1000000; i++) {
  obj[i] = i;
}
console.timeEnd("Object set"); // ~40ms

console.time("Object get");
for (let i = 0; i < 1000000; i++) {
  obj[i];
}
console.timeEnd("Object get"); // ~15ms
```

**Conclusão:**

- **Object**: Ligeiramente mais rápido para acesso simples
- **Map**: Melhor para add/delete frequente e iteração

---

## 🔄 Conversões

### Map → Object

```javascript
const map = new Map([
  ["nome", "João"],
  ["idade", 25],
  ["cidade", "São Paulo"],
]);

// Método 1: Object.fromEntries()
const obj1 = Object.fromEntries(map);

// Método 2: Spread
const obj2 = { ...Object.fromEntries(map) };

// Método 3: Manual
const obj3 = {};
for (const [key, value] of map) {
  obj3[key] = value;
}

console.log(obj1);
// {nome: 'João', idade: 25, cidade: 'São Paulo'}
```

### Object → Map

```javascript
const obj = {
  nome: "João",
  idade: 25,
  cidade: "São Paulo",
};

// Método 1: Object.entries()
const map1 = new Map(Object.entries(obj));

// Método 2: Manual
const map2 = new Map();
for (const key in obj) {
  map2.set(key, obj[key]);
}

console.log(map1);
// Map {'nome' => 'João', 'idade' => 25, 'cidade' => 'São Paulo'}
```

### Map → Array

```javascript
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

// Array de pares
const array1 = [...map]; // [['a', 1], ['b', 2], ['c', 3]]
const array2 = Array.from(map); // [['a', 1], ['b', 2], ['c', 3]]

// Array de chaves
const chaves = [...map.keys()]; // ['a', 'b', 'c']

// Array de valores
const valores = [...map.values()]; // [1, 2, 3]
```

### Array → Map

```javascript
const array = [
  ["a", 1],
  ["b", 2],
  ["c", 3],
];

const map = new Map(array);

console.log(map);
// Map {'a' => 1, 'b' => 2, 'c' => 3}
```

### Map → JSON (com conversão)

```javascript
const map = new Map([
  ["nome", "João"],
  ["idade", 25],
]);

// Map não é diretamente serializável
// Precisa converter para Object primeiro
const json = JSON.stringify(Object.fromEntries(map));

console.log(json);
// '{"nome":"João","idade":25}'

// De volta para Map
const mapNovo = new Map(Object.entries(JSON.parse(json)));
```

---

## 🚫 Limitações do Map

### 1. Não é JSON-serializável

```javascript
const map = new Map([
  ["a", 1],
  ["b", 2],
]);

JSON.stringify(map); // "{}" ❌

// Precisa converter primeiro
JSON.stringify(Object.fromEntries(map)); // '{"a":1,"b":2}' ✅
```

### 2. Objetos como chave (comparação por referência)

```javascript
const map = new Map();

map.set({ id: 1 }, "primeiro");
map.set({ id: 1 }, "segundo"); // Objeto diferente!

console.log(map.size); // 2 (não 1!)

// Para usar objeto como chave, use a mesma referência
const obj = { id: 1 };
map.set(obj, "primeiro");
map.set(obj, "segundo"); // Agora sobrescreve

console.log(map.size); // 1 ✅
```

### 3. Não tem acesso por propriedade

```javascript
const map = new Map([["nome", "João"]]);

map.nome; // undefined ❌
map["nome"]; // undefined ❌
map.get("nome"); // 'João' ✅
```

### 4. Métodos de array não funcionam diretamente

```javascript
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

// Não funciona ❌
map.map();
map.filter();

// Precisa converter ✅
[...map].map(([k, v]) => [k, v * 2]);
// [['a', 2], ['b', 4], ['c', 6]]

Array.from(map.values()).filter((v) => v > 1);
// [2, 3]
```

---

## 📊 Map vs Set vs Object vs Array

| Característica  | Map         | Set            | Object        | Array             |
| --------------- | ----------- | -------------- | ------------- | ----------------- |
| Estrutura       | Chave-Valor | Valores únicos | Chave-Valor   | Valores indexados |
| Tipo de chave   | Qualquer    | N/A            | String/Symbol | Número            |
| Valores únicos  | ❌ Não      | ✅ Sim         | ❌ Não        | ❌ Não            |
| Ordem garantida | ✅ Sim      | ✅ Sim         | ⚠️ Parcial    | ✅ Sim            |
| Busca O(1)      | ✅ Sim      | ✅ Sim         | ✅ Sim        | ❌ O(n)           |
| Tamanho         | `.size`     | `.size`        | calcular      | `.length`         |
| Iteração fácil  | ✅ Sim      | ✅ Sim         | ⚠️ Converter  | ✅ Sim            |
| JSON            | ❌ Não      | ❌ Não         | ✅ Sim        | ✅ Sim            |

---

## 🎯 Quando usar cada um?

### Use **Map** quando:

- Chaves podem ser qualquer tipo
- Adiciona/remove frequentemente
- Itera sobre pares chave-valor
- Precisa de ordem garantida
- Precisa de .size instantâneo

### Use **Set** quando:

- Precisa de valores únicos
- Verifica existência (has)
- Remove duplicatas
- Não precisa de chave-valor

### Use **Object** quando:

- Chaves são sempre strings
- Estrutura fixa e simples
- Precisa de JSON
- Acesso por propriedade (obj.prop)

### Use **Array** quando:

- Ordem e índice são importantes
- Permite duplicatas
- Precisa de map/filter/reduce
- Lista sequencial

---

## 📝 Resumo Rápido

```javascript
// Criar
const map = new Map([
  ["a", 1],
  ["b", 2],
]);

// Adicionar/Atualizar
map.set("c", 3); // Map {'a'=>1, 'b'=>2, 'c'=>3}

// Obter
map.get("a"); // 1

// Verificar
map.has("b"); // true

// Remover
map.delete("c"); // Map {'a'=>1, 'b'=>2}

// Tamanho
map.size; // 2

// Limpar tudo
map.clear(); // Map {}

// Iterar
for (const [chave, valor] of map) {
  console.log(chave, valor);
}

// Converter para Object
const obj = Object.fromEntries(map);

// Converter para Array
const array = [...map]; // [['a', 1], ['b', 2]]
```

---

## 🎓 Exercícios Práticos

### Nível Fácil

1. **Criar um Map com 3 frutas e seus preços**

```javascript
// Seu código aqui
```

2. **Contar quantas vezes cada letra aparece em uma string**

```javascript
function contarLetras(str) {
  // Seu código aqui
}
console.log(contarLetras("banana")); // Map {'b'=>1, 'a'=>3, 'n'=>2}
```

3. **Verificar se um Map tem uma chave específica**

```javascript
const map = new Map([
  ["nome", "João"],
  ["idade", 25],
]);
// Verificar se tem a chave 'idade'
```

### Nível Médio

4. **Agrupar pessoas por idade**

```javascript
function agruparPorIdade(pessoas) {
  // Seu código aqui
}

const pessoas = [
  { nome: "João", idade: 25 },
  { nome: "Maria", idade: 30 },
  { nome: "Pedro", idade: 25 },
];

console.log(agruparPorIdade(pessoas));
// Map {25 => ['João', 'Pedro'], 30 => ['Maria']}
```

5. **Inverter um Map (trocar chaves por valores)**

```javascript
function inverterMap(map) {
  // Seu código aqui
}

const original = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(inverterMap(original));
// Map {1 => 'a', 2 => 'b', 3 => 'c'}
```

6. **Mesclar dois Maps**

```javascript
function mesclarMaps(map1, map2) {
  // Seu código aqui
  // Em caso de conflito, valor do map2 prevalece
}

const m1 = new Map([
  ["a", 1],
  ["b", 2],
]);
const m2 = new Map([
  ["b", 20],
  ["c", 3],
]);
console.log(mesclarMaps(m1, m2));
// Map {'a'=>1, 'b'=>20, 'c'=>3}
```

### Nível Difícil

7. **Implementar um sistema de cache com expiração**

```javascript
class CacheComExpiracao {
  constructor() {
    // Seu código aqui
  }

  set(key, value, ttl) {
    // ttl em milissegundos
    // Seu código aqui
  }

  get(key) {
    // Retorna null se expirou
    // Seu código aqui
  }
}
```

8. **Longest Substring Without Repeating Characters usando Map**

```javascript
function lengthOfLongestSubstring(s) {
  // Implemente usando Map para rastrear posições
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("dvdf")); // 3
```

9. **Two Sum com Map**

```javascript
function twoSum(nums, target) {
  // Usar Map para encontrar pares que somam target
  // Retornar índices
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

---

## 🔗 Recursos Adicionais

### Documentação

- [MDN - Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [JavaScript.info - Map and Set](https://javascript.info/map-set)

### Vídeos

- [Web Dev Simplified - JavaScript Maps](https://www.youtube.com/watch?v=_1BPrCHcjhs)
- [Traversy Media - Maps in JavaScript](https://www.youtube.com/watch?v=FqKkFsjkXKs)

### Artigos

- [Map vs Object in JavaScript](https://medium.com/@luke_schmuke/how-to-use-map-over-objects-in-javascript-5d0f3f47c7f8)
- [When to use Map over Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_vs._maps)

### Prática

- LeetCode - Tag "Hash Table"
- HackerRank - Data Structures
- Exercism - JavaScript Track

---

## 🌟 Padrões Avançados

### 1. Map com Maps (Estrutura aninhada)

```javascript
const matriz = new Map([
  [
    0,
    new Map([
      [0, 1],
      [1, 2],
      [2, 3],
    ]),
  ],
  [
    1,
    new Map([
      [0, 4],
      [1, 5],
      [2, 6],
    ]),
  ],
  [
    2,
    new Map([
      [0, 7],
      [1, 8],
      [2, 9],
    ]),
  ],
]);

// Acessar elemento [1][2]
matriz.get(1).get(2); // 6
```

### 2. WeakMap para Dados Privados

```javascript
const privateData = new WeakMap();

class Usuario {
  constructor(nome, senha) {
    this.nome = nome;
    privateData.set(this, { senha });
  }

  verificarSenha(senha) {
    return privateData.get(this).senha === senha;
  }
}

const user = new Usuario("João", "senha123");
console.log(user.senha); // undefined
console.log(user.verificarSenha("senha123")); // true
```

### 3. Map como State Manager

```javascript
class StateManager {
  constructor() {
    this.state = new Map();
    this.listeners = new Map();
  }

  setState(key, value) {
    const oldValue = this.state.get(key);
    this.state.set(key, value);
    this.notify(key, value, oldValue);
  }

  getState(key) {
    return this.state.get(key);
  }

  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key).push(callback);
  }

  notify(key, newValue, oldValue) {
    const callbacks = this.listeners.get(key) || [];
    callbacks.forEach((cb) => cb(newValue, oldValue));
  }
}

const state = new StateManager();

state.subscribe("theme", (newValue, oldValue) => {
  console.log(`Tema mudou de ${oldValue} para ${newValue}`);
});

state.setState("theme", "dark");
// Tema mudou de undefined para dark
```

---

## ✅ Checklist de Domínio

- [ ] Sei criar Map vazio e com valores iniciais
- [ ] Domino os 6 métodos principais (set, get, has, delete, clear, size)
- [ ] Consigo iterar sobre Map de 5 formas diferentes
- [ ] Sei converter Map ↔ Object ↔ Array
- [ ] Entendo quando usar Map vs Object
- [ ] Sei usar Map para contagem de frequência
- [ ] Consigo implementar cache com Map
- [ ] Entendo Map com chaves de qualquer tipo
- [ ] Sei as limitações do Map
- [ ] Resolvi pelo menos 3 problemas usando Map
- [ ] Entendo a diferença entre Map e WeakMap

---

**Criado em:** Dezembro 2025  
**Tópico:** Estruturas de Dados em JavaScript  
**Nível:** Iniciante a Avançado

💡 **Dica final:** Map é extremamente poderoso quando você precisa rastrear relações chave-valor com chaves de qualquer tipo. É essencial para muitos algoritmos! 🚀

🔥 **Dica de LeetCode:** Map é a estrutura perfeita para problemas de "Two Sum", "Longest Substring", "Group Anagrams", e muitos outros! Pratique!
