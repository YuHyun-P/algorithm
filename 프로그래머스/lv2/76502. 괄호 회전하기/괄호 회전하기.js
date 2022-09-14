const isValid = (bracketString) => {
    const OPEN = ["(", "{", "["];
    const CLOSE = [")", "}", "]"];
    
    const stack = [];
    
    for (const char of bracketString) {
        if (OPEN.includes(char)) {
            stack.push(char);
            continue;
        }
        
        const bracketIndex = CLOSE.findIndex((bracket) => char === bracket);
        const openBracket = OPEN[bracketIndex];
        if (openBracket === stack.at(-1)) {
            stack.pop();
        } else {
            return false;
        }
    }
    return stack.length === 0;
};

function solution(s){
    const validStrings = [...s].filter((_, index) => isValid(s.slice(index) + s.slice(0, index)));

    return validStrings.length;
}