const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(T, testCase) {
  const [PLUS, MINUS, EMPTY] = ["+", "-", " "];

  const calc = (equation) => {
    let acc = 0;
    let sign = 1;
    let prev = 0;
    equation.forEach((numOrChar) => {
      if (Number.isInteger(numOrChar)) {
        prev += numOrChar;
      } else {
        switch (numOrChar) {
          case PLUS:
            acc += prev * sign;
            prev = 0;
            sign = 1;
            break;
          case MINUS:
            acc += prev * sign;
            prev = 0;
            sign = -1;
            break;
          case EMPTY:
            prev *= 10;
            break;
          default:
            break;
        }
      }
    });
    return acc + prev * sign;
  };

  const findZeroEquations = (N) => {
    const sign = [PLUS, MINUS, EMPTY];
    const zeroEquations = [];

    const dfs = (cur, equation) => {
      if (N === cur) {
        equation.push(cur);
        if (calc(equation) === 0) {
          zeroEquations.push(equation.join(""));
        }
        equation.pop();
        return;
      }

      equation.push(cur);
      sign.forEach((symbol) => {
        equation.push(symbol);
        dfs(cur + 1, equation);
        equation.pop();
      });
      equation.pop();
    };

    dfs(1, []);

    zeroEquations.sort();
    return zeroEquations;
  };

  return testCase.map((N) => findZeroEquations(N).join("\n")).join("\n\n");
}

const T = Number(input.shift());
const testCase = input.map(Number);
console.log(solution(T, testCase));
