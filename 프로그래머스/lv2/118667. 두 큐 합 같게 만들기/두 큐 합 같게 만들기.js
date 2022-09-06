function solution(queue1, queue2) {
    let q1Total = queue1.reduce((acc, cur) => acc + cur, 0),
          q2Total = queue2.reduce((acc, cur) => acc + cur, 0);
    const TARGET = (q1Total + q2Total) / 2;
    
    const concatQueue = [...queue1, ...queue2];
    let q1Index = 0,
        q2Index = queue2.length;
    while (q1Index < q2Index) {
        if (q1Total === q2Total) {
            return q1Index + q2Index - queue2.length;
        } else if (q1Total < q2Total) {
            q1Total += concatQueue[q2Index];
            q2Total -= concatQueue[q2Index];
            q2Index++;
        } else {
            q1Total -= concatQueue[q1Index];
            q2Total += concatQueue[q1Index];
            q1Index++;
        }
    }
    return -1;
}