/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
  const prefixSum = [];
  nums.forEach((num, index) => prefixSum.push(index === 0 ? num : num + prefixSum[index-1]));
  
  const pivotIndex = prefixSum.findIndex((pivotSum, index) => {
    const leftSum = pivotSum - nums[index];
    const rightSum = prefixSum.at(-1) - pivotSum;
    return leftSum === rightSum;
  });
  return pivotIndex;
};