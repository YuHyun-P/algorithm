function solution(n, k) {
    k -= 1;
    
    const number = Array.from(Array(n), (_, i) => i + 1);
    const sequence = Array(n).fill(-1);
    
    let nChildren = number.reduce((acc, cur) => acc * cur, 1);
    for (let level = 0; level < n - 1; level++) {
        nChildren /= (n - level);
        
        const index = Math.floor(k / nChildren);
        k %= nChildren;
        
        sequence[level] = number.splice(index, 1)[0];
    }
    sequence[n - 1] = number.pop();

    return sequence;
}