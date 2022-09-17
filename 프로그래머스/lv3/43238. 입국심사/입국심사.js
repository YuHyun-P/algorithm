function solution(n, times) {
    const ascendingTimes = [...times].sort((a, b) => a - b);
    
    let left = 0;
    let right = ascendingTimes[0] * n;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        const count = ascendingTimes.reduce((acc, cur) => acc + Math.floor(mid / cur), 0);
        if (count < n) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}