# Add Two Numbers - LeetCode #2

## 📋 Descrição do Problema

Você recebe duas **listas encadeadas não vazias** representando dois números inteiros não negativos. Os dígitos são armazenados em **ordem inversa** e cada nó contém um único dígito. Some os dois números e retorne a soma como uma lista encadeada.

Você pode assumir que os dois números não contêm zeros à esquerda, exceto o número 0 em si.

### Exemplo 1:
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explicação: 342 + 465 = 807
```

### Exemplo 2:
```
Input: l1 = [0], l2 = [0]
Output: [0]
```

### Exemplo 3:
```
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
Explicação: 9999999 + 9999 = 10009998
```

### Restrições:
- O número de nós em cada lista está no intervalo `[1, 100]`
- `0 <= Node.val <= 9`
- É garantido que a lista representa um número que não possui zeros à esquerda

---

## 🎯 Conceitos Importantes para Iniciantes

### O que é uma Lista Encadeada (Linked List)?

Uma lista encadeada é uma estrutura de dados onde cada elemento (nó) contém:
- Um **valor** (data)
- Uma **referência** para o próximo nó (next)

```javascript
// Definição da estrutura de um nó
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
```

**Visualização:**
```
[2] -> [4] -> [3] -> null
 ↑      ↑      ↑
nó1    nó2    nó3
```

### Por que os números estão em ordem inversa?

Isso facilita a soma! Começamos somando as unidades, depois as dezenas, depois as centenas, etc.

**Exemplo:**
- Número: 342
- Lista: [2, 4, 3]
- Representa: 2 (unidades) + 4×10 (dezenas) + 3×100 (centenas)

---

## 💡 Soluções

## Solução 1: Iterativa (Recomendada para Iniciantes)

### Abordagem
Percorremos ambas as listas simultaneamente, somando os valores correspondentes e gerenciando o "vai um" (carry).

### Código Comentado
```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // Criamos um nó fictício (dummy) para facilitar a construção da lista resultado
    let dummyHead = new ListNode(0);
    
    // Ponteiro que vai construindo a lista resultado
    let current = dummyHead;
    
    // Variável para armazenar o "vai um" da soma
    let carry = 0;
    
    // Continuamos enquanto houver nós em l1, l2 ou carry para processar
    while (l1 !== null || l2 !== null || carry !== 0) {
        // Pega o valor do nó atual de l1 (ou 0 se l1 já terminou)
        let val1 = l1 !== null ? l1.val : 0;
        
        // Pega o valor do nó atual de l2 (ou 0 se l2 já terminou)
        let val2 = l2 !== null ? l2.val : 0;
        
        // Soma os dois valores mais o carry anterior
        let sum = val1 + val2 + carry;
        
        // Calcula o novo carry (vai um)
        // Se sum = 15, carry = 1
        // Se sum = 7, carry = 0
        carry = Math.floor(sum / 10);
        
        // O dígito a ser armazenado é o resto da divisão por 10
        // Se sum = 15, digit = 5
        // Se sum = 7, digit = 7
        let digit = sum % 10;
        
        // Cria um novo nó com o dígito calculado
        current.next = new ListNode(digit);
        
        // Move o ponteiro para o próximo nó
        current = current.next;
        
        // Avança para o próximo nó em l1 (se existir)
        if (l1 !== null) l1 = l1.next;
        
        // Avança para o próximo nó em l2 (se existir)
        if (l2 !== null) l2 = l2.next;
    }
    
    // Retorna a lista resultado (pulando o nó dummy)
    return dummyHead.next;
};
```

### Complexidade
- **Tempo:** O(max(m, n)) - onde m e n são os tamanhos de l1 e l2
- **Espaço:** O(max(m, n)) - para armazenar a lista resultado

### Exemplo Passo a Passo

Vamos somar `342 + 465`:
- l1 = [2, 4, 3]
- l2 = [5, 6, 4]

**Iteração 1:**
```
val1 = 2, val2 = 5, carry = 0
sum = 2 + 5 + 0 = 7
carry = 7 / 10 = 0
digit = 7 % 10 = 7
Resultado até agora: [7]
```

**Iteração 2:**
```
val1 = 4, val2 = 6, carry = 0
sum = 4 + 6 + 0 = 10
carry = 10 / 10 = 1
digit = 10 % 10 = 0
Resultado até agora: [7, 0]
```

**Iteração 3:**
```
val1 = 3, val2 = 4, carry = 1
sum = 3 + 4 + 1 = 8
carry = 8 / 10 = 0
digit = 8 % 10 = 8
Resultado até agora: [7, 0, 8]
```

**Resultado Final:** [7, 0, 8] que representa 807 ✅

---

## Solução 2: Recursiva

### Abordagem
Usamos recursão para somar cada par de nós. Como não podemos adicionar parâmetros extras, criamos uma função auxiliar interna para gerenciar o carry.

### Código Comentado
```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    // Função auxiliar recursiva que recebe o carry
    const addWithCarry = (l1, l2, carry) => {
        // Caso base: se ambas as listas terminaram e não há carry
        if (l1 === null && l2 === null && carry === 0) {
            return null;
        }
        
        // Obtém os valores (ou 0 se a lista já terminou)
        let val1 = l1 !== null ? l1.val : 0;
        let val2 = l2 !== null ? l2.val : 0;
        
        // Calcula a soma
        let sum = val1 + val2 + carry;
        
        // Cria o novo nó com o dígito
        let newNode = new ListNode(sum % 10);
        
        // Obtém os próximos nós (ou null se não existirem)
        let next1 = l1 !== null ? l1.next : null;
        let next2 = l2 !== null ? l2.next : null;
        
        // Chamada recursiva para os próximos nós
        newNode.next = addWithCarry(next1, next2, Math.floor(sum / 10));
        
        return newNode;
    };
    
    // Inicia a recursão com carry = 0
    return addWithCarry(l1, l2, 0);
};
```

### Complexidade
- **Tempo:** O(max(m, n))
- **Espaço:** O(max(m, n)) - devido à pilha de recursão

---

## Solução 3: Versão Mais Limpa (Código Conciso)

### Código Comentado
```javascript
var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode(0); // Cria um nó fictício (dummy) para facilitar a construção da lista resultado
    let curr = dummy; // Inicializa o ponteiro atual para o nó de resultado
    let carry = 0; // Variável para armazenar o "vai um" (carry)
    
    while (l1 || l2 || carry) {
        // Usa operador OR para pegar valor ou 0
        const sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        
        carry = Math.floor(sum / 10); // Calcula o novo carry
        curr.next = new ListNode(sum % 10); // Cria o novo nó com o dígito
        curr = curr.next; // Avança para o próximo nó de resultado
        
        // Usa operador de encadeamento opcional
        l1 = l1?.next;
        l2 = l2?.next;
    }
    
    return dummy.next;
};
```

### O que é `?.` (Optional Chaining)?
O operador `?.` permite acessar propriedades de um objeto que pode ser `null` ou `undefined` sem causar erro.

```javascript
// Sem optional chaining:
let val = l1 !== null ? l1.val : 0;

// Com optional chaining:
let val = l1?.val || 0;
```

---

## Solução 4: Com BigInt (Para Números Muito Grandes)

### ⚠️ Aviso
Esta solução **NÃO é aceita** pelo LeetCode para este problema, pois converte a lista em número. Mas é útil para entender o problema!

### Código Comentado
```javascript
var addTwoNumbers = function(l1, l2) {
    // Função auxiliar para converter lista em número
    const listToNumber = (list) => {
        let num = BigInt(0);
        let multiplier = BigInt(1);
        
        while (list !== null) {
            num += BigInt(list.val) * multiplier;
            multiplier *= BigInt(10);
            list = list.next;
        }
        
        return num;
    };
    
    // Função auxiliar para converter número em lista
    const numberToList = (num) => {
        if (num === BigInt(0)) return new ListNode(0);
        
        let dummy = new ListNode(0);
        let current = dummy;
        
        while (num > BigInt(0)) {
            let digit = num % BigInt(10);
            current.next = new ListNode(Number(digit));
            current = current.next;
            num = num / BigInt(10);
        }
        
        return dummy.next;
    };
    
    // Converte listas em números, soma e converte de volta
    let num1 = listToNumber(l1);
    let num2 = listToNumber(l2);
    let sum = num1 + num2;
    
    return numberToList(sum);
};
```

**Por que usar BigInt?**
- JavaScript tem limite para números: até 2^53 - 1
- BigInt permite trabalhar com números arbitrariamente grandes
- Útil quando os números têm muitos dígitos

---

## 🔧 Funções Auxiliares para Testar

### Criar Lista Encadeada a partir de Array
```javascript
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    
    let head = new ListNode(arr[0]);
    let current = head;
    
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    
    return head;
}
```

### Converter Lista Encadeada em Array
```javascript
function linkedListToArray(head) {
    let arr = [];
    let current = head;
    
    while (current !== null) {
        arr.push(current.val);
        current = current.next;
    }
    
    return arr;
}
```

### Imprimir Lista Encadeada
```javascript
function printLinkedList(head) {
    let arr = linkedListToArray(head);
    console.log(arr.join(' -> '));
}
```

### Exemplo de Uso
```javascript
// Criar listas de teste
let l1 = createLinkedList([2, 4, 3]);
let l2 = createLinkedList([5, 6, 4]);

// Somar
let result = addTwoNumbers(l1, l2);

// Imprimir resultado
printLinkedList(result); // 7 -> 0 -> 8
console.log(linkedListToArray(result)); // [7, 0, 8]
```

---

## 🎓 Conceitos de JavaScript Explicados

### 1. Math.floor() vs parseInt()
```javascript
// Math.floor() - arredonda para baixo
Math.floor(15 / 10); // 1
Math.floor(7 / 10);  // 0

// parseInt() - converte string para inteiro
parseInt("15"); // 15
```

### 2. Operador Módulo (%)
```javascript
// Retorna o resto da divisão
15 % 10; // 5
7 % 10;  // 7
20 % 10; // 0
```

### 3. Operador Ternário (? :)
```javascript
// Sintaxe: condição ? valorSeVerdadeiro : valorSeFalso
let val = l1 !== null ? l1.val : 0;

// Equivalente a:
let val;
if (l1 !== null) {
    val = l1.val;
} else {
    val = 0;
}
```

### 4. Optional Chaining (?.)
```javascript
// Evita erro quando objeto é null/undefined
let val = l1?.val; // undefined se l1 é null

// Sem optional chaining:
let val = l1 && l1.val; // mais verboso
```

### 5. Nullish Coalescing (||)
```javascript
// Retorna valor à direita se esquerda for falsy
let val = l1?.val || 0;

// Se l1.val é 0, null, undefined, false -> retorna 0
```

---

## 🐛 Erros Comuns para Evitar

### 1. Esquecer de Lidar com Carry Final
```javascript
// ❌ ERRADO
while (l1 || l2) { // Esqueceu do carry!
    // ...
}

// ✅ CORRETO
while (l1 || l2 || carry) {
    // ...
}
```

### 2. Não Verificar null antes de Acessar .val
```javascript
// ❌ ERRADO
let val1 = l1.val; // Erro se l1 é null!

// ✅ CORRETO
let val1 = l1 !== null ? l1.val : 0;
// ou
let val1 = l1?.val || 0;
```

### 3. Não Retornar dummy.next
```javascript
// ❌ ERRADO
return dummy; // Retorna o nó dummy!

// ✅ CORRETO
return dummy.next; // Retorna o primeiro nó real
```

### 4. Esquecer de Avançar os Ponteiros
```javascript
// ❌ ERRADO
while (l1 || l2) {
    // ... processar
    // Esqueceu: l1 = l1.next; l2 = l2.next;
} // Loop infinito!
```

---

## 📊 Comparação de Soluções

| Solução | Tempo | Espaço | Dificuldade | Recomendação |
|---------|-------|--------|-------------|--------------|
| Iterativa | O(max(m,n)) | O(max(m,n)) | Fácil | ⭐⭐⭐⭐⭐ Melhor para iniciantes |
| Recursiva | O(max(m,n)) | O(max(m,n)) | Média | ⭐⭐⭐ Boa para praticar recursão |
| Concisa | O(max(m,n)) | O(max(m,n)) | Fácil | ⭐⭐⭐⭐ Quando já dominar o básico |
| BigInt | O(m+n) | O(m+n) | Fácil | ❌ Não aceita no LeetCode |

---

## 🎯 Dicas de Estudo

1. **Comece com papel e caneta:** Desenhe as listas e simule a soma manualmente
2. **Use console.log():** Imprima os valores em cada iteração para entender o fluxo
3. **Teste casos extremos:**
   - Listas de tamanhos diferentes
   - Carry no último nó: [9,9,9] + [1]
   - Números com zero: [0] + [0]
4. **Pratique criar e percorrer listas encadeadas** antes de tentar este problema
5. **Entenda o conceito de dummy node** - facilita muito!

---

## 🔗 Recursos Adicionais

- [Visualização de Listas Encadeadas](https://visualgo.net/en/list)
- [MDN - Operadores JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Expressions_and_Operators)
- [LeetCode Discuss - Add Two Numbers](https://leetcode.com/problems/add-two-numbers/discuss/)

---

## 📝 Exercícios Relacionados

Após dominar este problema, tente:
- **LeetCode #445** - Add Two Numbers II (números em ordem normal)
- **LeetCode #21** - Merge Two Sorted Lists
- **LeetCode #2** - Reverse Linked List

---

**Autor:** Criado para estudo e consulta futura  
**Data:** Dezembro 2025  
**Problema:** [LeetCode #2 - Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)

---

## ⭐ Se este README te ajudou, deixe uma estrela no repositório!