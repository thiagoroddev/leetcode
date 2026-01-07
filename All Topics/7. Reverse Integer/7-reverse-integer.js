/*
Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

 

Example 1:

Input: x = 123
Output: 321
Example 2:

Input: x = -123
Output: -321
Example 3:

Input: x = 120
Output: 21
 

Constraints:

-231 <= x <= 231 - 1
*/

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let praTexto = String(x).replace(/^-/, "");
  let preResult = "";

  for (let i = praTexto.length - 1; i >= 0; i--) {
    preResult += praTexto[i];
  }

  let preResultado = preResult.replace(/^0+/, "");

  function verifyLimit(value) {
    if ((-2) ** 31 > value || 2 ** 31 - 1 < value) {
      return 0;
    } else {
      return value;
    }
  }

  if (x < 0) {
    resultado = preResultado * -1;
    console.log(verifyLimit(resultado));
    return verifyLimit(resultado);
  } else {
    resultado = +preResultado;
    console.log(verifyLimit(resultado));
    return verifyLimit(resultado);
  }
};
