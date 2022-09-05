function solution(str1, str2) {
    const rowStr1 = str1.toLowerCase().split(""),
          rowStr2 = str2.toLowerCase().split("");
    
    const str1Set = new Set(),
          str2Set = new Set();
    
    const map = new Map();
    for (let i = 0; i < rowStr1.length - 1; i++) {
        const element = rowStr1[i] + rowStr1[i + 1];
        if (!/[a-z]{2}/g.test(element)) continue;
        
        if (str1Set.has(element)) {
            const index = map.get(element);
            map.set(element, index + 1);
            str1Set.add(`${element}_${index}`);
        } else {
            str1Set.add(element);
            map.set(element, 0);
        }
    }
    
    map.clear();
    for (let i = 0; i < rowStr2.length - 1; i++) {
        const element = rowStr2[i] + rowStr2[i + 1];
        if (!/[a-z]{2}/g.test(element)) continue;
        
        if (str2Set.has(element)) {
            const index = map.get(element);
            map.set(element, index + 1);
            str2Set.add(`${element}_${index}`);
        } else {
            str2Set.add(element);
            map.set(element, 0);
        }
    }
    
    const intersection = [...str1Set].filter((element) => str2Set.has(element)),
          union = new Set([...str1Set, ...str2Set]);
    
    const answer = union.size === 0 ? 1 : intersection.length / union.size;
    return Math.floor(answer * 65536);
}