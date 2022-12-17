function solution(s) {
    const map = new Map();
    
    const result = [...s].map((char, index) => {
        const beforeIndex = map.get(char);
        map.set(char, index)
        return beforeIndex === undefined ? -1 : index - beforeIndex;
    })
        
    
    return result;
}