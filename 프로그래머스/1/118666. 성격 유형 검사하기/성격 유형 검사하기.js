function solution(survey, choices) {
    const mid = 4;
    const score = [0, 3, 2, 1, 0, 1, 2, 3];
    const types = "RTCFJMAN".split('');
    const typeMap = new Map(types.map((type, index) => [type, index]));
    const typeScore = Array(types.length).fill(0);
    
    survey.forEach((curTypes, index) => {
        const choice = choices[index];
        if (choice === mid) return;
        
        const [leftType, rightType] = curTypes.split('');
        const choiceType = choice < mid ? leftType : rightType;
        
        const typeIndex = typeMap.get(choiceType);
        typeScore[typeIndex] += score[choice];
    });
    
    const result = [];
    for (let category = 0; category < types.length; category += 2) {
        const leftScore = typeScore[category];
        const rightScore = typeScore[category + 1];
        
        const leftType = types[category];
        const rightType = types[category + 1];
        
        
        if (leftScore === rightScore) {
            result.push(leftType < rightType ? leftType : rightType);
            continue;
        }
        
        const type = leftScore < rightScore ? rightType : leftType;
        result.push(type);
    }
    
    return result.join('');
}