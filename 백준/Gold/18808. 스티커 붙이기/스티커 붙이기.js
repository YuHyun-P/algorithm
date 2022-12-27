const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(N, M, stickerList) {
  const laptop = Array.from(Array(N), () => Array(M).fill(0));

  const outOfBound = (row, col) => row < 0 || N <= row || col < 0 || M <= col;
  const getSize = (twoDimensional) => [
    twoDimensional.length,
    twoDimensional[0].length,
  ];
  const rotate = (sticker) => {
    const [R, C] = getSize(sticker);
    const rotated = Array.from(Array(C), () => Array(R).fill(0));

    for (let row = 0; row < R; row++) {
      for (let col = 0; col < C; col++) {
        if (sticker[row][col]) {
          rotated[col][R - 1 - row] = 1;
        }
      }
    }

    return rotated;
  };
  const canPutStickerOn = (row, col, sticker) => {
    const [R, C] = getSize(sticker);
    if (outOfBound(row + R - 1, col + C - 1)) {
      return false;
    }

    return sticker.every((stickerRow, curRow) =>
      stickerRow.every(
        (stickerCol, curCol) =>
          !stickerCol || !laptop[row + curRow][col + curCol]
      )
    );
  };
  const putSticker = (row, col, sticker) => {
    let count = 0;
    sticker.forEach((stickerRow, curRow) =>
      stickerRow.forEach((stickerCol, curCol) => {
        if (stickerCol) {
          count += 1;
          laptop[row + curRow][col + curCol] = 1;
        }
      })
    );
    return count;
  };

  let count = 0;
  for (let index = 0; index < stickerList.length; index++) {
    let curSticker = stickerList[index];
    let flag = false;

    for (let rotateIter = 0; rotateIter < 4 && !flag; rotateIter++) {
      for (let laptopIndex = 0; laptopIndex < N * M; laptopIndex++) {
        const row = Math.floor(laptopIndex / M);
        const col = laptopIndex % M;

        if (!canPutStickerOn(row, col, curSticker)) {
          continue;
        }

        count += putSticker(row, col, curSticker);
        flag = true;
        break;
      }
      curSticker = rotate(curSticker);
    }
  }

  return count;
}

const parseToNumberArray = (row) => row.trim().split(" ").map(Number);
const [N, M, K] = parseToNumberArray(input.shift());
const stickerList = (() => {
  const stickerList = [];
  for (let i = 0; i < K; i++) {
    const [R, C] = parseToNumberArray(input.shift());
    stickerList.push(input.splice(0, R).map(parseToNumberArray));
  }
  return stickerList;
})();
console.log(solution(N, M, stickerList));
