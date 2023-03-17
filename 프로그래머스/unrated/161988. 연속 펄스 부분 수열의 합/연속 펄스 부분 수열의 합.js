function solution(sequence) {
    const N = sequence.length;
    const SIGN = [
        [-1, 1],
        [1, -1]
    ];
          
    let max = -100000;
    const negSequence = [];
    const posSequence = [];
    
    sequence.forEach((num, index) => {
        negSequence.push(num * SIGN[0][index % 2])
        posSequence.push(num * SIGN[1][index % 2])
    });
    
    const search = (curSequence) => {
        let left = 0;
        let total = 0;
        
        for (let right = 0; right < N; right++) {
            total += curSequence[right];
            
            if (left < right) {
                if (total < 0) {
                    total = curSequence[right];
                    left = right;
                } else if (curSequence[left] < 0) {
                    total -= curSequence[left];
                    left += 1;
                }
            }
            
            max = Math.max(max, total);
        }
    };
    
    search(negSequence);
    search(posSequence);
    
    return max;
}