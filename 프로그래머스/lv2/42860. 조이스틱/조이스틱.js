function solution(name) {
  const arr = name.split("");
  const LENGTH = arr.length;
  let answer = arr.reduce(
    (acc, alphabet) =>
      acc +
      Math.min(
        alphabet.charCodeAt() - "A".charCodeAt(),
        "Z".charCodeAt() - alphabet.charCodeAt() + 1
      ),
    0
  );
  let minMove = LENGTH - 1;

  for (let i = 0; i < LENGTH; i++) {
    let lastContinuousAIndex = i + 1;
    while (
      lastContinuousAIndex < LENGTH &&
      name[lastContinuousAIndex] === "A"
    ) {
      lastContinuousAIndex++;
    }

    minMove = Math.min(
      minMove,
      i + i + (LENGTH - lastContinuousAIndex),
      LENGTH - lastContinuousAIndex + LENGTH - lastContinuousAIndex + i
    );
  }

  return answer + minMove;
}
