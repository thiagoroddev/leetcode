# 📋 Conhecimentos Prévios Necessários: Add Two Numbers (LeetCode #2)

> **Checklist completo: O que você precisa saber ANTES de resolver este desafio**

Este documento mapeia **TODOS** os conhecimentos necessários, desde o básico até o intermediário, organizados por categoria e nível de importância.

---

## 🎯 Índice de Conhecimentos

1. [JavaScript Básico](#1-javascript-básico)
2. [Estruturas de Dados](#2-estruturas-de-dados)
3. [Lógica e Matemática](#3-lógica-e-matemática)
4. [Programação Orientada a Objetos](#4-programação-orientada-a-objetos)
5. [Padrões de Algoritmos](#5-padrões-de-algoritmos)
6. [Complexidade (Opcional)](#6-complexidade-opcional)

---

## 📊 Mapa Visual de Dependências

```
                    ┌──────────────────────────────┐
                    │  Add Two Numbers (LC #2)     │
                    └───────────────┬──────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
         ┌──────────▼─────────┐         ┌──────────▼─────────┐
         │  Linked Lists      │         │  Aritmética com    │
         │  (Estrutura)       │         │  Carry (Lógica)    │
         └──────────┬─────────┘         └──────────┬─────────┘
                    │                               │
         ┌──────────┴──────────┐       ┌───────────┴─────────┐
         │                     │       │                     │
    ┌────▼────┐         ┌─────▼────┐ ┌▼─────┐        ┌─────▼─────┐
    │ Objetos │         │ Ponteiros│ │ % 10 │        │ Math.floor│
    │ (this)  │         │ (refs)   │ │      │        │           │
    └─────────┘         └──────────┘ └──────┘        └───────────┘
```

---

## 1. JavaScript Básico

### ✅ Nível: CRÍTICO - Você DEVE dominar

### 1.1 Variáveis e Tipos

#### `let`, `const` e `var`
```javascript
// Você precisa saber declarar variáveis
let contador = 0;
const MAXIMO = 100;
var legado = "antigo";
```

**Por que é necessário:**
- Você criará variáveis para `carry`, `current`, `dummyHead`

#### Tipos Primitivos
```javascript
let numero = 42;           // Number
let texto = "hello";       // String
let verdadeiro = true;     // Boolean
let nada = null;           // Null
let indefinido;            // Undefined
```

**Por que é necessário:**
- Você trabalhará com `number` (valores dos nós)
- Precisará verificar `null` (fim da lista)

---

### 1.2 Operadores

#### Operadores Aritméticos
```javascript
let soma = 5 + 3;          // 8
let subtracao = 10 - 4;    // 6
let multiplicacao = 3 * 4; // 12
let divisao = 15 / 3;      // 5

// CRÍTICOS PARA ESTE PROBLEMA:
let resto = 17 % 10;       // 7 (módulo - pega o resto)
let divisaoInteira = Math.floor(17 / 10); // 1
```

**Por que é necessário:**
- `%` para extrair o dígito: `15 % 10 = 5`
- `Math.floor()` para calcular o carry: `Math.floor(15 / 10) = 1`

**📚 Teste seu conhecimento:**
```javascript
// O que retorna?
13 % 10  // ?
7 % 10   // ?
Math.floor(13 / 10) // ?
Math.floor(7 / 10)  // ?
```

<details>
<summary>Resposta</summary>

```javascript
13 % 10  // 3 (resto)
7 % 10   // 7 (resto)
Math.floor(13 / 10) // 1 (quociente inteiro)
Math.floor(7 / 10)  // 0 (quociente inteiro)
```
</details>

#### Operadores de Comparação
```javascript
5 === 5;           // true (igualdade estrita)
5 !== 3;           // true (diferença estrita)
null === null;     // true
undefined === null; // false

// EVITE:
5 == "5";          // true (igualdade frouxa - não use!)
```

**Por que é necessário:**
- Verificar se um nó é `null`: `if (l1 !== null)`
- Verificar se carry existe: `if (carry > 0)`

#### Operadores Lógicos
```javascript
true && true;   // true (E lógico)
true || false;  // true (OU lógico)
!true;          // false (NÃO lógico)

// Combinações:
(l1 !== null || l2 !== null || carry > 0) // Condição do while
```

**Por que é necessário:**
- Condição do loop principal usa `||` (OU)

---

### 1.3 Estruturas de Controle

#### if/else
```javascript
if (condicao) {
    // faz algo
} else {
    // faz outra coisa
}

// Usado no problema:
if (l1 !== null) {
    l1 = l1.next;
}
```

**Por que é necessário:**
- Verificar se ainda há nós para processar
- Evitar erros de `null`

#### while
```javascript
while (condicao) {
    // executa enquanto condição for verdadeira
}

// Usado no problema:
while (l1 !== null || l2 !== null || carry > 0) {
    // processa nós
}
```

**Por que é necessário:**
- Loop principal do algoritmo

#### Operador Ternário
```javascript
// Sintaxe: condicao ? valorSeVerdadeiro : valorSeFalso
let idade = 18;
let status = idade >= 18 ? "adulto" : "menor";

// Usado no problema:
let val1 = l1 !== null ? l1.val : 0;
```

**Por que é necessário:**
- Forma concisa de obter valores com fallback
- Muito usado para evitar erros com `null`

---

### 1.4 Funções

#### Declaração de Funções
```javascript
// Function declaration
function somar(a, b) {
    return a + b;
}

// Function expression (LeetCode usa este formato)
var addTwoNumbers = function(l1, l2) {
    // seu código aqui
    return resultado;
};

// Arrow function (ES6+)
const somar = (a, b) => a + b;
```

**Por que é necessário:**
- LeetCode exige que você complete uma função
- Você precisa entender parâmetros e retorno

#### Parâmetros e Retorno
```javascript
function exemplo(param1, param2) {
    let resultado = param1 + param2;
    return resultado; // Devolve um valor
}

let valor = exemplo(5, 3); // valor = 8
```

**Por que é necessário:**
- A função recebe `l1` e `l2` como parâmetros
- Deve retornar a lista resultado

---

## 2. Estruturas de Dados

### ✅ Nível: CRÍTICO - O coração do problema

### 2.1 Objetos em JavaScript

#### Criação e Acesso
```javascript
// Literal object
let pessoa = {
    nome: "Maria",
    idade: 25
};

// Acessar propriedades
console.log(pessoa.nome);    // "Maria"
console.log(pessoa["idade"]); // 25

// Modificar propriedades
pessoa.nome = "João";
pessoa.idade = 30;
```

**Por que é necessário:**
- Cada nó da lista é um objeto: `{val: 2, next: ...}`

#### Propriedades Aninhadas
```javascript
let node = {
    val: 5,
    next: {
        val: 10,
        next: null
    }
};

console.log(node.val);           // 5
console.log(node.next.val);      // 10
console.log(node.next.next);     // null
```

**Por que é necessário:**
- Você navega pela lista encadeada: `current.next.next`

---

### 2.2 Referências vs. Valores

#### Conceito Fundamental
```javascript
// Primitivos: cópia por VALOR
let a = 5;
let b = a;
b = 10;
console.log(a); // 5 (não mudou!)

// Objetos: cópia por REFERÊNCIA
let obj1 = {val: 5};
let obj2 = obj1;  // obj2 aponta para o MESMO objeto
obj2.val = 10;
console.log(obj1.val); // 10 (mudou!)
```

**Por que é CRÍTICO:**
```javascript
let current = dummyHead;
current.next = new ListNode(7);
// dummyHead.next também aponta para o novo nó!
// Isso é a MÁGICA da solução
```

**📚 Teste seu conhecimento:**
```javascript
let node1 = new ListNode(1);
let node2 = node1;
node2.val = 99;
console.log(node1.val); // ?
```

<details>
<summary>Resposta</summary>

```javascript
console.log(node1.val); // 99
// node1 e node2 apontam para o MESMO objeto na memória!
```
</details>

---

### 2.3 Linked Lists (Listas Encadeadas)

#### Estrutura Básica
```javascript
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// Criando nós individuais
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);

// Conectando (criando a lista)
node1.next = node2;
node2.next = node3;
// Lista: 1 -> 2 -> 3 -> null
```

**Por que é necessário:**
- É a estrutura central do problema!

#### Navegação (Traversal)
```javascript
// Percorrer toda a lista
let current = head; // Começa no primeiro nó

while (current !== null) {
    console.log(current.val);
    current = current.next; // Move para o próximo
}
```

**Por que é necessário:**
- Você precisa percorrer duas listas simultaneamente

#### Criação Dinâmica
```javascript
let dummy = new ListNode(0);
let current = dummy;

// Adicionar novo nó
current.next = new ListNode(5);
current = current.next;

// Adicionar outro
current.next = new ListNode(10);
current = current.next;

// Lista: 0 -> 5 -> 10 -> null
// Retornar: dummy.next (pula o 0)
```

**Por que é necessário:**
- É exatamente assim que você constrói a lista resultado

---

### 2.4 Ponteiros (Referências)

#### Conceito de Ponteiro
```javascript
// Um ponteiro é uma variável que "aponta" para um objeto
let head = new ListNode(1);
let current = head; // current e head apontam para o MESMO nó

current.val = 99;
console.log(head.val); // 99 (mudou via ponteiro!)
```

**Por que é necessário:**
- `current` é um ponteiro que você move pela lista
- `dummyHead` mantém a referência ao início

#### Movendo Ponteiros
```javascript
let list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);

let ptr = list;
console.log(ptr.val);    // 1

ptr = ptr.next;          // Move o ponteiro
console.log(ptr.val);    // 2

ptr = ptr.next;          // Move novamente
console.log(ptr.val);    // 3

ptr = ptr.next;          // Move para null
console.log(ptr);        // null (fim da lista)
```

**Por que é necessário:**
- Você move `l1`, `l2` e `current` durante o algoritmo

**📚 Exercício crucial:**
```javascript
let dummy = new ListNode(0);
let current = dummy;

current.next = new ListNode(7);
current = current.next;

current.next = new ListNode(8);
current = current.next;

// Qual é o valor de dummy.next.val?
// Qual é o valor de dummy.next.next.val?
```

<details>
<summary>Resposta</summary>

```javascript
dummy.next.val       // 7
dummy.next.next.val  // 8

// Visualização:
// dummy: [0] -> [7] -> [8] -> null
//         ↑      ↑      ↑
//      dummy  dummy.  current
//             next
```
</details>

---

## 3. Lógica e Matemática

### ✅ Nível: CRÍTICO - A lógica do algoritmo

### 3.1 Aritmética com Carry (Vai-um)

#### Soma Manual no Papel
```
    342
  + 465
  -----
    807

Passo 1 (unidades):  2 + 5 = 7
Passo 2 (dezenas):   4 + 6 = 10 → escreve 0, "vai 1"
Passo 3 (centenas):  3 + 4 + 1(carry) = 8
```

**Por que é necessário:**
- É EXATAMENTE o que o algoritmo faz!

#### Decomposição Matemática
```javascript
// Dado sum = 15
let digit = sum % 10;           // 5 (o que fica)
let carry = Math.floor(sum / 10); // 1 (o que sobe)

// Dado sum = 7
let digit = sum % 10;           // 7 (o que fica)
let carry = Math.floor(sum / 10); // 0 (nada sobe)

// Dado sum = 23
let digit = sum % 10;           // 3 (o que fica)
let carry = Math.floor(sum / 10); // 2 (sobe 2)
```

**📚 Pratique mentalmente:**
```
sum = 8  → digit = ? carry = ?
sum = 12 → digit = ? carry = ?
sum = 19 → digit = ? carry = ?
sum = 27 → digit = ? carry = ?
```

<details>
<summary>Respostas</summary>

```javascript
sum = 8  → digit = 8, carry = 0
sum = 12 → digit = 2, carry = 1
sum = 19 → digit = 9, carry = 1
sum = 27 → digit = 7, carry = 2
```
</details>

---

### 3.2 Lógica Booleana

#### Operadores Lógicos
```javascript
// E (AND): ambos devem ser true
true && true   // true
true && false  // false

// OU (OR): pelo menos um deve ser true
true || false  // true
false || false // false

// NÃO (NOT): inverte
!true   // false
!false  // true
```

**Por que é necessário:**
```javascript
// Condição do while: continua se QUALQUER condição for true
while (l1 !== null || l2 !== null || carry > 0) {
    // Processa
}
```

#### Truthy e Falsy
```javascript
// Valores Falsy (considerados false):
false, 0, "", null, undefined, NaN

// Valores Truthy (considerados true):
true, números != 0, strings não vazias, objetos, arrays

// Exemplos:
if (0) { }           // NÃO executa
if (5) { }           // EXECUTA
if (null) { }        // NÃO executa
if ({}) { }          // EXECUTA
if (new ListNode()) { } // EXECUTA
```

**Por que é necessário:**
```javascript
while (l1 || l2 || carry) // Funciona porque objetos são truthy
```

---

## 4. Programação Orientada a Objetos

### ✅ Nível: IMPORTANTE - Para entender ListNode

### 4.1 this

#### O que é `this`
```javascript
function Pessoa(nome) {
    this.nome = nome; // 'this' refere-se ao novo objeto sendo criado
}

let p = new Pessoa("Ana");
console.log(p.nome); // "Ana"
```

**Por que é necessário:**
- `ListNode` usa `this.val` e `this.next`

---

### 4.2 Construtores e `new`

#### Funções Construtoras
```javascript
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
}

// SEMPRE use 'new'
let node = new ListNode(5);
```

**Por que é necessário:**
- Você cria novos nós: `new ListNode(digit)`

#### O que `new` faz
```javascript
// Quando você faz:
let node = new ListNode(5);

// JavaScript faz:
// 1. Cria objeto vazio: {}
// 2. Define this = {}
// 3. Executa: this.val = 5; this.next = null
// 4. Retorna o objeto: {val: 5, next: null}
```

---

### 4.3 Classes (ES6) vs Funções Construtoras

```javascript
// Estilo antigo (LeetCode)
function ListNode(val, next) {
    this.val = val;
    this.next = next;
}

// Estilo moderno (equivalente)
class ListNode {
    constructor(val, next) {
        this.val = val;
        this.next = next;
    }
}

// Uso é IDÊNTICO
let node = new ListNode(5);
```

**Por que é necessário:**
- Entender que são a mesma coisa

---

## 5. Padrões de Algoritmos

### ✅ Nível: IMPORTANTE - Técnicas usadas

### 5.1 Dummy Head (Nó Sentinela)

#### O Padrão
```javascript
// Cria um nó "falso" no início
let dummy = new ListNode(0);
let current = dummy;

// Constrói a lista
current.next = new ListNode(1);
current = current.next;

current.next = new ListNode(2);
current = current.next;

// Retorna a lista real (pulando o dummy)
return dummy.next;
```

**Por que é necessário:**
- Simplifica a lógica (não precisa tratar o primeiro nó como caso especial)

---

### 5.2 Two Pointers (Dois Ponteiros)

#### O Padrão
```javascript
let ptr1 = list1;
let ptr2 = list2;

while (ptr1 !== null || ptr2 !== null) {
    // Processa ptr1 e ptr2 simultaneamente
    
    if (ptr1 !== null) ptr1 = ptr1.next;
    if (ptr2 !== null) ptr2 = ptr2.next;
}
```

**Por que é necessário:**
- Você percorre `l1` e `l2` ao mesmo tempo

---

### 5.3 Iteração com Condições Múltiplas

```javascript
while (condicao1 || condicao2 || condicao3) {
    // Processa enquanto QUALQUER condição for verdadeira
}
```

**Por que é necessário:**
- Loop principal: `while (l1 || l2 || carry)`

---

## 6. Complexidade (Opcional)

### ✅ Nível: BOM SABER - Para entrevistas

### 6.1 Notação Big O

#### Tempo
- **O(n)**: Percorre cada elemento uma vez
- **O(n²)**: Loops aninhados
- **O(log n)**: Divide e conquista

**Este problema é O(max(m, n)):**
- Percorre a maior das duas listas uma vez

#### Espaço
- **O(1)**: Espaço constante (algumas variáveis)
- **O(n)**: Espaço proporcional ao input

**Este problema é O(max(m, n)):**
- Cria uma nova lista do tamanho da maior entrada

---

## 📝 Checklist Final: Você Está Pronto?

Antes de resolver o problema, verifique:

### JavaScript Básico
- [ ] Sei declarar variáveis (`let`, `const`)
- [ ] Entendo operadores: `%`, `Math.floor()`, `===`, `!==`
- [ ] Consigo usar `if/else` e `while`
- [ ] Entendo o operador ternário: `cond ? a : b`
- [ ] Sei criar e chamar funções

### Estruturas de Dados
- [ ] Entendo objetos JavaScript
- [ ] Sei a diferença entre referência e valor
- [ ] Entendo o que é uma Linked List
- [ ] Sei navegar por uma lista: `current = current.next`
- [ ] Entendo ponteiros/referências

### Lógica Matemática
- [ ] Sei fazer aritmética com carry (vai-um)
- [ ] Entendo `digit = sum % 10`
- [ ] Entendo `carry = Math.floor(sum / 10)`
- [ ] Sei usar operadores lógicos: `&&`, `||`

### OOP
- [ ] Entendo `this` em construtores
- [ ] Sei usar `new` para criar objetos
- [ ] Entendo `function` construtora vs `class`

### Padrões
- [ ] Conheço o padrão "Dummy Head"
- [ ] Consigo usar dois ponteiros simultaneamente
- [ ] Sei construir estruturas dinamicamente

---

## 🎯 Ordem de Estudo Recomendada

Se você não domina todos os itens, estude nesta ordem:

### Semana 1: Fundamentos
1. Variáveis e tipos
2. Operadores (`%` e `Math.floor()`)
3. If/else e while
4. Funções

### Semana 2: Objetos e Referências
1. Objetos em JavaScript
2. Referências vs Valores (CRÍTICO!)
3. `this` e construtores
4. `new` operator

### Semana 3: Linked Lists
1. Estrutura de LinkedList
2. Navegação (traversal)
3. Criação dinâmica de nós
4. Padrão Dummy Head

### Semana 4: Lógica do Problema
1. Aritmética com carry
2. Operadores lógicos
3. Two pointers pattern
4. Resolver o problema!

---

## 📚 Recursos para Aprender

### JavaScript Básico
- [JavaScript.info - The Modern JavaScript Tutorial](https://javascript.info/)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Eloquent JavaScript (grátis)](https://eloquentjavascript.net/)

### Estruturas de Dados
- [Visualgo - Visualização de Estruturas](https://visualgo.net/en/list)
- [Data Structures Easy to Advanced (YouTube)](https://www.youtube.com/watch?v=RBSGKlAvoiM)

### Linked Lists Especificamente
- [CS50 - Linked Lists](https://www.youtube.com/watch?v=zQI3FyWm144)
- [FreeCodeCamp - Data Structures](https://www.freecodecamp.org/news/data-structures-101-linked-lists/)

### Prática
- [LeetCode - Easy Problems](https://leetcode.com/problemset/all/?difficulty=EASY)
- [HackerRank - Data Structures](https://www.hackerrank.com/domains/data-structures)

---

## 🎓 Mini-Testes para Auto-Avaliação

### Teste 1: Operadores
```javascript
// O que cada um retorna?
15 % 10
7 % 10
Math.floor(15 / 10)
Math.floor(7 / 10)
```

### Teste 2: Referências
```javascript
let a = {val: 5};
let b = a;
b.val = 10;
console.log(a.val); // ?
```

### Teste 3: Linked List
```javascript
let head = new ListNode(1);
head.next = new ListNode(2);
let current = head;
current = current.next;
console.log(current.val); // ?
console.log(head.val); // ?
```

### Teste 4: Dummy Head
```javascript
let dummy = new ListNode(0);
let curr = dummy;
curr.next = new ListNode(5);
curr = curr.next;
curr.next = new ListNode(10);
// O que dummy.next.val retorna?
```

<details>
<summary>📝 Respostas</summary>

**Teste 1:**
```javascript
15 % 10              // 5
7 % 10               // 7
Math.floor(15 / 10)  // 1
Math.floor(7 / 10)   // 0
```

**Teste 2:**
```javascript
console.log(a.val); // 10 (referência!)
```

**Teste 3:**
```javascript
console.log(current.val); // 2
console.log(head.val);    // 1
```

**Teste 4:**
```javascript
dummy.next.val // 5
```

</details>

---

## 💡 Dica Final

> **Não tente resolver o problema até dominar pelo menos 80% destes conceitos!**

É melhor passar uma semana estudando fundamentos do que passar meses frustrado tentando resolver problemas que você ainda não tem base para entender.

**Ordem correta:**
1. Aprenda os fundamentos
2. Pratique conceitos isolados
3. Combine os conceitos
4. Resolva o problema

---

<div align="center">

## 🚀 Você Está Pronto?

Se marcou ✅ em pelo menos 80% dos itens do checklist, você está preparado!

**Próximos passos:**
1. Revise o [README principal do problema](./add-two-numbers-readme.md)
2. Leia o [Guia de Estudo sobre Linked Lists](./linked-lists-study-guide.md)
3. Entenda [Funções Construtoras](./funcoes-construtoras-explicadas.md)
4. **Tente resolver sozinho primeiro!**

---

⭐ **Boa sorte na sua jornada de algoritmos!**

*Lembre-se: todo expert foi um iniciante que não desistiu.*

</div>