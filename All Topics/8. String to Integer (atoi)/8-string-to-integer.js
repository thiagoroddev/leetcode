/*
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

Whitespace: Ignore any leading whitespace (" ").
Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.
Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
Rounding: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded to 231 - 1.
Return the integer as the final result.

 

Example 1:

Input: s = "42"

Output: 42

Explanation:

The underlined characters are what is read in and the caret is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
           ^
Example 2:

Input: s = " -042"

Output: -42

Explanation:

Step 1: "   -042" (leading whitespace is read and ignored)
            ^
Step 2: "   -042" ('-' is read, so the result should be negative)
             ^
Step 3: "   -042" ("042" is read in, leading zeros ignored in the result)
               ^
Example 3:

Input: s = "1337c0d3"

Output: 1337

Explanation:

Step 1: "1337c0d3" (no characters read because there is no leading whitespace)
         ^
Step 2: "1337c0d3" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "1337c0d3" ("1337" is read in; reading stops because the next character is a non-digit)
             ^
Example 4:

Input: s = "0-1"

Output: 0

Explanation:

Step 1: "0-1" (no characters read because there is no leading whitespace)
         ^
Step 2: "0-1" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "0-1" ("0" is read in; reading stops because the next character is a non-digit)
          ^
Example 5:

Input: s = "words and 987"

Output: 0

Explanation:

Reading stops at the first non-digit character 'w'.

 

Constraints:

0 <= s.length <= 200
s consists of English letters (lower-case and upper-case), digits (0-9), ' ', '+', '-', and '.'.
*/

// Minha solução
var myAtoi = function (s) {
  let index = 0;
  let inicioNumero = undefined;
  let finalNumero = undefined;
  let primeiroNumeroEncontrado = false;
  let ultimoNumeroEncontrado = false;
  let sinalVisto = false;
  let paraArray = s.split("");
  console.log(paraArray);

  while (index < paraArray.length && !ultimoNumeroEncontrado) {
    console.log("Entrando no while principal");
    while (paraArray[index] == " ") {
      console.log(
        `Espaço vazio encontrado no primeiro while: ${paraArray[index]} no indice: ${index}, seguindo em frente`
      );
      index++;
    }

    while (!primeiroNumeroEncontrado) {
      console.log(
        "Entrando no while sem o primeiro numero encontrado ainda (segundo while"
      );
      if (/^\d$/.test(paraArray[index])) {
        console.log(
          `Primeiro numero encontrado: ${paraArray[index]} no index: ${index}`
        );
        inicioNumero = index;
        primeiroNumeroEncontrado = true;
        index++;
      } else {
        if (
          (paraArray[index] == "-" && !sinalVisto) ||
          (paraArray[index] == "+" && !sinalVisto)
        ) {
          console.log(
            `Sinal encontrado: "${paraArray[index]}", encontrado no index ${index}, seguinte em frente com index ++`
          );
          sinalVisto = true;
          index++;
        } else {
          console.log(
            `Letra encontrada sem que nenhum numero tenha sido encontrado. Letra: ${paraArray[index]} no index ${index}, encerrando tudo.`
          );
          console.log("Retornando 0");
          return 0;
        }
      }
    }

    while (primeiroNumeroEncontrado && !ultimoNumeroEncontrado) {
      console.log(
        "Entrando no while com o primeiro numero já encontrado (terceiro while"
      );
      if (/^\d$/.test(paraArray[index])) {
        console.log(
          `Outro numero encontrado: ${paraArray[index]} no index: ${index}`
        );
        index++;
      } else {
        console.log(
          `Letra encontrada no while 2. Letra : ${paraArray[index]} no index ${index}. Saindo do segundo while .`
        );
        ultimoNumeroEncontrado = true;
        finalNumero = index;
        break;
      }
    }
    console.log("Saindo do while principal");
  }

  let arrayQuaseFinal = paraArray.slice(inicioNumero, finalNumero);
  console.log(
    `Array encontrado: ${arrayQuaseFinal} entre o indice ${inicioNumero} e ${finalNumero}`
  );
  let valorQuaseFinal = arrayQuaseFinal
    .filter((value) => {
      return value != " ";
    })
    .join("");
  console.log(
    `Valor quase final tratado, removido os espaços: ${valorQuaseFinal}`
  );
  let limiteMaximo = 2 ** 31 - 1;
  let limiteMinimo = -(2 ** 31);

  if (valorQuaseFinal > 2 ** 31 - 1 || valorQuaseFinal < -(2 ** 31)) {
    if (paraArray[inicioNumero - 1] == "-") {
      console.log(
        `Valor final ${valorQuaseFinal} é menor que o limite, arredondado para ${limiteMinimo}`
      );
      return limiteMinimo;
    } else {
      console.log(
        `Valor final ${valorQuaseFinal} é maior que o limite, arredondado para ${limiteMaximo}`
      );
      return limiteMaximo;
    }
  }

  if (paraArray[inicioNumero - 1] == "-") {
    console.log(
      `Numero tem sinal de negativo antes dele, então o resultado será: "${Number(
        valorQuaseFinal * -1
      )}"`
    );

    return Number(valorQuaseFinal * -1);
  } else {
    console.log(
      `Numero é positivo, então o resultado final será : "${Number(
        valorQuaseFinal
      )}"`
    );
    return Number(valorQuaseFinal);
  }
};

myAtoi("42");
