function solution(s) {
    const TARGET = "110";
    
    const answer = s.map((x) => {
        let count = 0;
        const xArr = x.split("");
        const stack = [];
        
        for (let i = 0; i < xArr.length; i++) {
            const num = xArr[i];
            if (num === "0") {
                if (stack.length >= 2) {
                    const second = stack.pop();
                    const first = stack.pop();
                    
                    const combination = first + second + num;
                    if (combination === TARGET) {
                        count++;
                        continue;
                    } 
                    
                    stack.push(first, second);
                } 
            }
            
            stack.push(num);
        }
        
        const rest = stack.join("");
        const index = rest.lastIndexOf("0");
        return index < 0 ? TARGET.repeat(count) + rest : rest.slice(0, index + 1) + TARGET.repeat(count) + rest.slice(index + 1);
    })
    return answer;
}