class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function addTwoNumbers2(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  // Criamos um "nó dummy" para facilitar a manipulação da cabeça da lista
  const dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0; // O famoso "vai um"

  // O loop continua enquanto houver nós em l1, l2 ou sobrar um carry
  while (l1 !== null || l2 !== null || carry !== 0) {
    // Pega o valor dos nós ou 0 se forem nulos
    const x = l1 ? l1.val : 0;
    const y = l2 ? l2.val : 0;

    // Soma os valores + o transporte do cálculo anterior
    const sum = carry + x + y;

    // Atualiza o carry para a próxima iteração (ex: 15 / 10 = 1)
    carry = Math.floor(sum / 10);

    // Cria o novo nó com o dígito da unidade (ex: 15 % 10 = 5)
    current.next = new ListNode(sum % 10);

    // Move o ponteiro do resultado para frente
    current = current.next;

    // Avança nas listas de entrada se possível
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }

  // Retornamos dummyHead.next porque o dummyHead em si é apenas um marcador
  return dummyHead.next;
}
