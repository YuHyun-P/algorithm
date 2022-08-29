/**
 * @param {number[]} nums
 * @return {number[]}
 */
var runningSum = function(nums) {
  const prefixSum = [];
  nums.forEach((num, index) => prefixSum.push(index === 0 ? num : prefixSum[index-1] + num));
  return prefixSum;
};