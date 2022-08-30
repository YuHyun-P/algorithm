# 포인트

## 나머지 연산 분배 법칙
```
(A + B) % k = ((A % k) + (B % k)) % k
(A - B) % k = ((A % k) - (B % k) + k) % k
```

## 누적합 알고리즘
누적합 알고리즘을 사용하여 시간 복잡도 줄이기

<br />

# 풀이
1. 누적합의 나머지 값을 요소로 하는 배열 `prefixSumMods`
2. 키-값이 `i`-`prefixSumMods` 요소 중 나머지 값이 `i`인 인덱스의 최솟값인 객체 `indices` 

```js
var checkSubarraySum = function(nums, k) {
  /* 엣지 케이스 방어 */
  if (nums.length < 2) return false; 
  if (k === 1) return true;
  
  const prefixSumMods = [0];
  nums.forEach((num, index) => prefixSumMods.push((num + prefixSumMods[index]) % k));
  
  // `indices`의 키의 범위가 0 ~ k-1로 한정되어 있어 배열로 풀었으나, k의 최댓값이 2^31-1 이어서 heap overflow가 발생함
  const indices = {};
 
  let found = false;
  for (let right = 0; right < prefixSumMods.length; right++) {
    const mod = prefixSumMods[right];
    
    // `indices[mod]` 값이 0인 경우도 있어 `!indices[mod]` 조건문으로 하면 일부 테스트를 통과할 수 없음
    // Map 자료구조를 사용하는 것이 안전할 듯!
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
```
