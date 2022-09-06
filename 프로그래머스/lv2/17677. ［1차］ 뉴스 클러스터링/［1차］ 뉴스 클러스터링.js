function solution(str1, str2) {
    const str1Arr = str1.toLowerCase().split(""),
          str2Arr = str2.toLowerCase().split("");
    
    const createMultiSet = (arr) => {
        const set = [];
        arr.forEach((second, index) => {
            if (index === 0) return;
            
            const element = arr[index - 1] + second;
            if (/[a-z]{2}/g.test(element)) set.push(element);
        });
        return set;
    }
    
    const A = createMultiSet(str1Arr),
          B = createMultiSet(str2Arr);
    
    const AdiffB = [...A];
    const intersection = [];
    B.forEach((element) => {
        if (AdiffB.includes(element)) {
            const index = AdiffB.indexOf(element);
            AdiffB.splice(index, 1);
            intersection.push(element);
        }
    });
    
    const jaccardCoefficient = intersection.length / (AdiffB.length + B.length);
    
    return Number.isNaN(jaccardCoefficient) ? 65536 : Math.floor(jaccardCoefficient * 65536);
}