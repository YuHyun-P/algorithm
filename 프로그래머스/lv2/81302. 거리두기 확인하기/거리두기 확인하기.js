function solution(places) {
  const [PERSON, PARTITION] = ["P", "X"];
  const LENGTH = 5;

  const getDistance = ([sourceI, sourceJ], [targetI, targetJ]) =>
    Math.abs(sourceI - targetI) + Math.abs(sourceJ - targetJ);

  const answer = places.map((place) => {
    const person = [];
    for (let i = 0; i < LENGTH; i++) {
      for (let j = 0; j < LENGTH; j++) {
        if (place[i][j] === PERSON) person.push([i, j]);
      }
    }

    for (let source = 0; source < person.length - 1; source++) {
      for (let target = source + 1; target < person.length; target++) {
        const distance = getDistance(person[source], person[target]);
        if (distance > 2) continue;
        else if (distance === 1) return 0;
        else if (distance === 2) {
          const [sourceI, sourceJ] = person[source];
          const [targetI, targetJ] = person[target];

          const isDiagonal = Math.abs(sourceI - targetI) === 1;
          if (
            isDiagonal &&
            (place[sourceI][targetJ] !== PARTITION ||
              place[targetI][sourceJ] !== PARTITION)
          )
            return 0;

          const [midI, midJ] = [
            (sourceI + targetI) / 2,
            (sourceJ + targetJ) / 2,
          ];
          if (!isDiagonal && place[midI][midJ] !== PARTITION) return 0;
        }
      }
    }

    return 1;
  });

  return answer;
}
