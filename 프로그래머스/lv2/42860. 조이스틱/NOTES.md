# 풀이 방법
> **연속되는 A 부분**은 최대한 피해서 좌우로 이동해야 좌우 조이스틱의 최솟값을 구할 수 있음

```js
function solution(name) {
  const arr = name.split("");
  const LENGTH = arr.length;
  
  // 모든 알파벳의 위 아래 최소값 합
  let answer = arr.reduce(
    (acc, alphabet) =>
      acc +
      Math.min(
        alphabet.charCodeAt() - "A".charCodeAt(),
        "Z".charCodeAt() - alphabet.charCodeAt() + 1
      ),
    0
  );
  
  // 좌우 이동 경로의 최솟값 구하기, 초기값은 start -> end
  let minMove = LENGTH - 1;

  for (let i = 0; i < LENGTH; i++) {
    // 현재 i의 오른쪽으로 연속되는 A 문자열의 마지막 index 구하기
    let lastContinuousAIndex = i + 1;
    while (
      lastContinuousAIndex < LENGTH &&
      name[lastContinuousAIndex] === "A"
    ) {
      lastContinuousAIndex++;
    }
    
    // 첫번째 값: 현재 좌우 이동 경로의 최솟값
    // 두번째 값: start -> i -> start -> last -> lastContinuousIndex
    // 세번째 값: start -> last -> lastContinuousIndex -> last -> start -> i
    minMove = Math.min(
      minMove,
      i + i + (LENGTH - lastContinuousAIndex),
      LENGTH - lastContinuousAIndex + LENGTH - lastContinuousAIndex + i
    );
  }

  return answer + minMove;
}
```

## "BBBBAAAAAAAB" 입력 예시
![프로그래머스 조이스틱](https://user-images.githubusercontent.com/96400112/188699385-a1d545c0-752e-4f9e-bb75-c8d4017a5ac2.jpeg)

