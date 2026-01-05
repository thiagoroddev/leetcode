//racunhos
const arr = Array.from({length: 3}, () => []);

arr[0].push("X");
arr[1].push("Y");
arr[1].push("Z");

function criarStringsVazias(qtd) {
  return new Array(qtd).fill("");
}

const vars = criarStringsVazias(3);
vars[0] += "A";
vars[1] += "B";
vars[0] += "C";

// ["", "", ""]
let contatenado = "";
vars.map((v) => (contatenado += v));

let numRows = 3;
let rows = Array.from({length: numRows}, () => "");

rows[0] += "A";
rows[1] += "B";
rows[0] += "C";

//Minha solução ###################################################################################################################
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  let arrayRows = Array.from({length: numRows}, () => "");
  let indiceRow = 0;
  let i = 0;

  if (numRows === 1) {
    console.log(`s = 1 , resultado final: ${s}`);
    return s;
  }

  while (i < s.length) {
    console.log(
      `Início do while principal: arrayRows: ${arrayRows}, indiceRow: ${indiceRow}, i: ${i}, s[i]  : ${s[i]}`
    );
    while (i < s.length) {
      arrayRows[indiceRow] += s[i];
      indiceRow++;
      i++;

      console.log(
        `While subida: arrayRows: ${arrayRows}, indiceRow: ${indiceRow}, i: ${i}, s[i]  : ${s[i]}`
      );
      if (indiceRow === numRows - 1) {
        console.log("entrou no break, iniciando descida");
        break;
      }
    }

    while (i < s.length) {
      arrayRows[indiceRow] += s[i];
      indiceRow--;
      i++;
      console.log(
        `While descida: arrayRows: ${arrayRows}, indiceRow: ${indiceRow}, i: ${i}, s[i]  : ${s[i]}`
      );

      if (indiceRow === 0) {
        console.log("entrou no break, iniciando subida");
        break;
      }
    }
  }
  let resultado = "";
  for (let row of arrayRows) {
    resultado += row;
    console.log(`row: ${row}`);
  }
  console.log(`resultado final: ${resultado}`);
  return resultado;
};

convert("AB", 1);

//solução otimizada da minha versão ###################################################################################################################

var convert = function (s, numRows) {
  if (numRows === 1) return s; // Caso especial

  let arrayRows = Array.from({length: numRows}, () => "");
  let indiceRow = 0;
  let i = 0;
  let descendo = true;

  while (i < s.length) {
    arrayRows[indiceRow] += s[i];
    i++;

    // Determina a direção
    if (indiceRow === 0) {
      descendo = true;
    } else if (indiceRow === numRows - 1) {
      descendo = false;
    }

    // Move o índice
    if (descendo) {
      indiceRow++;
    } else {
      indiceRow--;
    }
  }

  return arrayRows.join("");
};

console.log(convert("AB", 1)); // "AB"
console.log(convert("PAYPALISHIRING", 3)); // "P
