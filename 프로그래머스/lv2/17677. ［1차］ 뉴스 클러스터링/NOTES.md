

# [첫번째 풀이 방법](https://github.com/YuHyun-P/algorithm/commit/a9cf97d2020cd26438ce22919e60051646cbfa72#diff-03322e0b520d48449d73e76c402c9e4d668367ae15df03a211c35f32494b1c5c)
- `Set`, `Map` 자료구조를 이용하여, 중복되는 원소의 뒤에는 중복되는 횟수를 붙여 교집합을 구했다.
  - ex. Set A = `["aa", "aa"]`, Set B = `["aa", "aa", "aa"]` ⇒ A 교집합 B = `["aa", "aa_0"]`

<br />

# [두번째 풀이 방법](https://github.com/YuHyun-P/algorithm/blob/main/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4/lv2/17677.%E2%80%85%EF%BC%BB1%EC%B0%A8%EF%BC%BD%E2%80%85%EB%89%B4%EC%8A%A4%E2%80%85%ED%81%B4%EB%9F%AC%EC%8A%A4%ED%84%B0%EB%A7%81/%EF%BC%BB1%EC%B0%A8%EF%BC%BD%E2%80%85%EB%89%B4%EC%8A%A4%E2%80%85%ED%81%B4%EB%9F%AC%EC%8A%A4%ED%84%B0%EB%A7%81.js)
> 다중집합 자료구조에서 교집합과 합집합을 구하는 방법을 보고 풀었다.
- Set A의 복사본과 빈 배열을 이용하여 교집합과 A - B 집합을 구했다.
  ```js
  const AdiffB = [...A]; // A - B 집합을 담을 A 복사본
  const intersection = []; // 교집합을 담을 빈 배열
  
  B.forEach((element) => {
      if (AdiffB.includes(element)) {
          const index = AdiffB.indexOf(element);
          AdiffB.splice(index, 1);
          intersection.push(element);
      }
  });
  ```
