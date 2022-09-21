function solution(queue1, queue2) {
    const queue = [...queue1, ...queue2];
    
    const sum = (acc, cur) => acc + cur;
    const target = queue.reduce(sum, 0) / 2;
    let queue1Total = queue1.reduce(sum, 0);
    let queue2Total = queue2.reduce(sum, 0);
    
    let queue1Index = 0;
    let queue2Index = queue1.length;
    let count = 0;
    while (queue1Index < queue2Index && queue2Index < queue.length) {
        if (queue1Total > queue2Total) {
            const popNum = queue[queue1Index];
            queue1Total -= popNum;
            queue2Total += popNum;
            queue1Index++;
        } else if (queue1Total === queue2Total){
            break;
        } else {
            const popNum = queue[queue2Index];
            queue2Total -= popNum;
            queue1Total += popNum;
            queue2Index++;
        }
        count++;
    }
    
    return queue1Total === queue2Total ? count : -1;
}