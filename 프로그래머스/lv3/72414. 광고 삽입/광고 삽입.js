const formatToSec = (format) => {
  const [h, m, s] = format.split(":").map((str) => parseInt(str, 10));
  return h * 3600 + m * 60 + s;
};

const secToFormat = (sec) => {
  const stringify = (num) => num.toString().padStart(2, "0");

  const h = stringify(Math.floor(sec / 3600));
  const m = stringify(Math.floor((sec % 3600) / 60));
  const s = stringify((sec % 3600) % 60);

  return `${h}:${m}:${s}`;
};

function solution(play_time, adv_time, logs) {
  const playTimeTotalSec = formatToSec(play_time);
  const advTimeTotalSec = formatToSec(adv_time);

  const prefixSum = new Array(playTimeTotalSec).fill(0);
  logs.forEach((log) => {
    const [start, end] = log.split("-").map(formatToSec);
    prefixSum[start] += 1;
    prefixSum[end] -= 1;
  });

  prefixSum.forEach(
    (count, index) =>
      (prefixSum[index] = index === 0 ? count : count + prefixSum[index - 1])
  );

  prefixSum.forEach(
    (count, index) =>
      (prefixSum[index] = index === 0 ? count : count + prefixSum[index - 1])
  );

  let maxAdvCount = 0;
  let maxAdvCountIndex = 0;

  for (let start = 0; start < prefixSum.length; start++) {
    const end =
      start + advTimeTotalSec - 1 < playTimeTotalSec
        ? start + advTimeTotalSec - 1
        : playTimeTotalSec;

    const accAdvCount = prefixSum[end] - prefixSum[start > 0 ? start - 1 : 0];
    if (accAdvCount > maxAdvCount) {
      maxAdvCount = accAdvCount;
      maxAdvCountIndex = start;
    }
  }
  
  return secToFormat(maxAdvCountIndex);
}
