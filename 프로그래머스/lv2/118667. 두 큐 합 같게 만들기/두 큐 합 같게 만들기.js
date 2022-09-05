function solution(queue1, queue2) {
    const LENGTH = queue1.length;
    const prefixQ1 = [];
    const prefixQ2 = [];
    queue1.forEach((num, index) => prefixQ1.push(index === 0 ? BigInt(num) : BigInt(num) + BigInt(prefixQ1[index-1])));
    queue2.forEach((num, index) => prefixQ2.push(index === 0 ? BigInt(num) : BigInt(num) + BigInt(prefixQ2[index-1])));

    const TARGET = (prefixQ1.at(-1) + prefixQ2.at(-1)) / 2n;
    if (TARGET === prefixQ1.at(-1)) return 0;
    
    let minusIndex = null;
    let plusIndex = 0;
    
    const [firstPrefixQ, secondPrefixQ] = prefixQ1.at(-1) < prefixQ2.at(-1) ? [prefixQ1, prefixQ2] : [prefixQ2, prefixQ1];
    
    while (minusIndex - LENGTH < plusIndex && plusIndex < LENGTH) {
        let minusNum;
        
        if (minusIndex === null) {
            minusNum = 0n;
        } else if (minusIndex < LENGTH) {
            minusNum = firstPrefixQ[minusIndex];
        } else {
            minusNum = firstPrefixQ.at(-1) + secondPrefixQ[minusIndex - LENGTH];
        }
        
        const curTotal = firstPrefixQ.at(-1) + secondPrefixQ[plusIndex] - minusNum;
        
        if (curTotal < TARGET) {
            plusIndex++;
        } else if (curTotal === TARGET) {
            if (minusIndex === null) return plusIndex + 1;
            return minusIndex + 1 + plusIndex + 1;
        } else {
            minusIndex = minusIndex === null ? 0 : minusIndex + 1;
        }
    }
    
    return -1;
}