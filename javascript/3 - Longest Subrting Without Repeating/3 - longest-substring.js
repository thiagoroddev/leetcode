/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let lastSubstring = "";
  let currentSubstring = "";
  for (let index = 0; index < s.length; index++) {
    if (lastSubstring.includes(s[index])) {
      lastSubstring = "";
      console.log(`${s[index]} is already in lastSubstring`);
    } else {
      lastSubstring += s[index];
      console.log(
        `lastSubstring updated: incremented ${s[index]}. lastSubstring: ${lastSubstring}. `
      );
      if (lastSubstring.length > currentSubstring.length) {
        currentSubstring = lastSubstring;
        console.log(`currentSubstring updated: ${currentSubstring}`);
      }
    }
  }
  console.log(currentSubstring);
  console.log(currentSubstring.length);
  return currentSubstring.length;
};

lengthOfLongestSubstring("dvdf");
