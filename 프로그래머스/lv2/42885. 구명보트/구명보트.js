function solution(people, limit) {
    people.sort((a, b) => a - b);

    let count = 0;
    let minIndex = 0, maxIndex = people.length - 1;
    
    while (minIndex < maxIndex) {
        const max = people[maxIndex];
        const min = people[minIndex];
        
        if (max + min <= limit) minIndex++;
        maxIndex--;
        count++;
    }
    
    if (minIndex === maxIndex) {
        count++;
    }
    
    return count;
}