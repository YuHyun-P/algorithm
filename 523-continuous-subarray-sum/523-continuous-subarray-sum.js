/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

var checkSubarraySum = function(nums, k) {
  if (nums.length < 2) return false;
  if (k === 1) return true;
  
  const prefixSumMods = [0];
  nums.forEach((num, index) => prefixSumMods.push((num + prefixSumMods[index]) % k));
  
  const indices = {};

  
  let found = false;
  for (let right = 0; right < prefixSumMods.length; right++) {
    const mod = prefixSumMods[right];
    
    if (indices[mod] !== undefined) {
      const left = indices[mod];
      if (right - left >= 2) {
        found = true;
        break;
      }
    } else {
      indices[mod] = right; 
    }
  }
  
  return found;
};