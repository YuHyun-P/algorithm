/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  const prefixSum = [0];
  nums.forEach((num, index) => prefixSum.push(num + prefixSum[index]));
  
  let minLength = Infinity;
  
  let left = 0;
  let right = 1;
  while (right < prefixSum.length) {
    const sum = prefixSum[right] - prefixSum[left];
    if (sum < target) {
      right++;
    } else {
      minLength = Math.min(minLength, (right - left));
      left++;
    }
  }
  
  return minLength === Infinity ? 0 : minLength;
};