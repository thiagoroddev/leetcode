/*
Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

 

Example 1:

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
Example 2:

Input: nums = [3,2,4], target = 6
Output: [1,2]
Example 3:

Input: nums = [3,3], target = 6
Output: [0,1]
 

Constraints:

2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.
*/

//Solução ideal
var twoSum = function (nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};

//Todas as soluções


//1. Força Bruta (Dois loops)
//Complexidade: O(n²) tempo, O(1) espaço
function functionOne(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
}
//Prós: Simples, não usa memória extra
//Contras: Muito lento para arrays grandes

//2. Hash Map (Uma passada) - ⭐ Mais eficiente
//Complexidade: O(n) tempo, O(n) espaço
function functionTwo(nums, target) {
    const map = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (map.has(complement)) {
            return [map.get(complement), i];
        }

        map.set(nums[i], i);
    }
}
//Prós: Mais rápido, apenas uma passada
//Contras: Usa memória extra

//3. Hash Map (Duas passadas)
//Complexidade: O(n) tempo, O(n) espaço
function functionThree(nums, target) {
    const map = new Map();

    // Primeira passada: armazena todos os valores
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }

    // Segunda passada: busca o complemento
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement) && map.get(complement) !== i) {
            return [i, map.get(complement)];
        }
    }
}

//4. Usando Objeto JavaScript (em vez de Map)
//Complexidade: O(n) tempo, O(n) espaço
function functionFour(nums, target) {
    const obj = {};

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];

        if (complement in obj) {
            return [obj[complement], i];
        }

        obj[nums[i]] = i;
    }
}

//5. Abordagem funcional com findIndex
//Complexidade: O(n²) tempo (pior caso), O(1) espaço
function functionFive(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        const j = nums.findIndex((num, index) =>
            index > i && num === target - nums[i]
        );

        if (j !== -1) {
            return [i, j];
        }
    }
}

//6. Usando reduce (criativo, mas não recomendado)
//Complexidade: O(n) tempo, O(n) espaço
function functionSix(nums, target) {
    const result = nums.reduce((acc, num, i) => {
        if (acc.result) return acc;

        const complement = target - num;
        if (acc.map.has(complement)) {
            acc.result = [acc.map.get(complement), i];
        } else {
            acc.map.set(num, i);
        }
        return acc;
    }, { map: new Map(), result: null });

    return result.result;
}


//7. Ordenando + dois ponteiros (menos comum aqui)
//⚠️ Só funciona se você preservar os índices originais.
function functionSeven(nums, target) {
    const arr = nums.map((num, index) => ({ num, index }));
    arr.sort((a, b) => a.num - b.num);

    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const soma = arr[left].num + arr[right].num;

        if (soma === target) {
            return [arr[left].index, arr[right].index];
        }

        if (soma < target) left++;
        else right--;
    }
}

