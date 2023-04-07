function solution(n) {
    let next = n;
    const binary = n.toString(2);
    const N = binary.length;
    
    const countOne = (num) => num.toString(2).match(/1/g).length;

    let oneLastIndex = N - 1;
    while (binary[oneLastIndex] !== '1') oneLastIndex -=1;    
    
    next += 2 ** (N - oneLastIndex - 1);
    next += 2 ** (countOne(n) - countOne(next)) - 1;
    
    return next;
}