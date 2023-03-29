function solution(n, l, r) {
    const ONE = "11011";
    const PREFIX_SUM = [0, 1, 2, 2, 3, 4];
    const length = ONE.length;
    const ZERO_BASE = 1;
    l -= ZERO_BASE;
    r -= ZERO_BASE;
    
    const positions = Array(n).fill(null);
    
    while (n) {
        positions[n - 1] = [l % length, r % length];
        l = Math.floor(l / length);
        r = Math.floor(r / length);
        n -= 1;
    }
    
    let leftBit = '1';
    let rightBit = '1';
    let nOne = 1;
    positions.forEach(([left, right]) => {
        nOne *= PREFIX_SUM.at(-1);
        if (leftBit === '1') {
            nOne -= PREFIX_SUM[left];
            leftBit = ONE[left];
        }
        if (rightBit === '1') {
            nOne -= PREFIX_SUM.at(-1) - PREFIX_SUM[right + 1];
            rightBit = ONE[right];
        }
    });
    
    return nOne;
}