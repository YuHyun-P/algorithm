/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  const prefixSum = [0];
  nums.forEach((num, index) => prefixSum.push(num + prefixSum[index]));
  
  const lengths = new Set();
  
  let left = 0;
  let right = 1;
  while (right < prefixSum.length) {
    const sum = prefixSum[right] - prefixSum[left];
    if (sum < target) {
      right++;
    } else {
      lengths.add(right - left);
      left++;
    }
  }
  
  return lengths.size > 0 ? Math.min(...lengths) : 0;
};