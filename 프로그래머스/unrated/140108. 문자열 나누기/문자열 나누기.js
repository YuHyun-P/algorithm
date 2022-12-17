function solution(s) {
    let answer = 0;
    let x = '';
    let xCount = 0;
    let otherCount = 0;
    [...s].forEach((char) => {
        if (x === '') {
            x = char;
            xCount = 1;
            return;
        }
        
        switch (char) {
            case x:
                xCount += 1;
                break;
            default:
                otherCount += 1;
        }
        
        if (xCount === otherCount) {
            answer += 1;
            x = '';
            xCount = 0;
            otherCount= 0;
        }
    });
    
    return x === '' ? answer : answer + 1;
}