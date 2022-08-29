/**
 * @param {number[]} arr
 * @param {number[][]} queries
 * @return {number[]}
 */
var xorQueries = function(arr, queries) {
  const prefixXOR = [0];
  arr.forEach((num, index) => prefixXOR.push(prefixXOR[index] ^ num));
  
  return queries.map(([left, right]) => prefixXOR[right + 1] ^ prefixXOR[left]);
};