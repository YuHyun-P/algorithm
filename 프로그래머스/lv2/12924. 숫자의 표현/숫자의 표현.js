function solution(n) {
    let count = 0;
    let acc = 0;
    let left = 1;
    for (let right = 1; right < n + 1; right++) {
        acc += right;
        if (acc < n) continue;
        
        while (acc > n) {
            acc -= left;
            left += 1;
        }
        
        if (acc === n) count += 1;
    }
    return count;
}