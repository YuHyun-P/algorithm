function solution(s)
{
    const paddedS = s.split('').join(' ');
    const length = paddedS.length;
    
    let result = 0;
    for (let mid = 0; mid < length; mid += 1) {
        let left = mid - 1;
        let right = mid + 1;
        let curLength = paddedS[mid] === ' ' ? 0 : 1;
        while (left >= 0 && right < length && paddedS[left] === paddedS[right]) {
            if (paddedS[left] !== ' ') {
                curLength += 2;
            }
            left -= 1;
            right += 1;
        }
        result = Math.max(result, curLength);
    }

    return result;
}