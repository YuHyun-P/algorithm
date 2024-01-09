function solution(word, pages) {
    const pageScoreMap = new Map(pages.map((page, index) => {
        const url = extractUrl(page);
        const externalLinkArray = extractExternalLinkArray(page);
        const wordCnt = countWord(word, page);
        
        return [url, { index, externalLinkArray, baseScore: wordCnt }];
    }));
    
    const pageMatchScoreArray = Array(pages.length).fill(0);
    pageScoreMap.forEach(({ index, externalLinkArray, baseScore }, url) => {
        pageMatchScoreArray[index] += baseScore;
        
        externalLinkArray.forEach((externalLink) => {
            if (!pageScoreMap.has(externalLink)) {
                return;
            }
            
            const { index: externalLinkPageIndex } = pageScoreMap.get(externalLink);
            pageMatchScoreArray[externalLinkPageIndex] += baseScore / externalLinkArray.length;
        });
    });
    
    const maxMatchScore = Math.max(...pageMatchScoreArray);
    return pageMatchScoreArray.findIndex((matchScore) => matchScore === maxMatchScore);
}

function extractUrl(page) {
    return /<meta property="og:url" content="(\S+)"/.exec(page)[1].trim();
}

function extractExternalLinkArray(page) {
    return [...page.matchAll(/<a href="(\S+)">/g)].map(((matchResult) => matchResult[1]));
}

function countWord(word, page) {
    return page.replaceAll(/[^a-z]/gi, ' ').split(' ').filter((curWord) => curWord.toLowerCase() === word.toLowerCase()).length;
}