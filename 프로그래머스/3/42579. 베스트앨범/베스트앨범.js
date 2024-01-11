function solution(genres, plays) {
    const MAX_SONG = 2;
    
    const ascendingPlays = (indexA, indexB) => plays[indexB] - plays[indexA] || indexA - indexB;
    
    const genreMap = new Map();
    genres.forEach((genre, index) => {
        const maxIndices = genreMap.get(genre) ?? [];
        maxIndices.push(index);
        maxIndices.sort(ascendingPlays);
        
        genreMap.set(genre, maxIndices.slice(0, MAX_SONG));
    });
    
    const genrePlaysMap = new Map();
    genres.forEach((genre, index) => {
       const nPlay = genrePlaysMap.get(genre) ?? 0;
        genrePlaysMap.set(genre, nPlay + plays[index]);
    });
    
    const ascendingGenrePlays = (genreA, genreB) => genrePlaysMap.get(genreB) - genrePlaysMap.get(genreA);
    
    const PLAYS = 0;
    const MAX_INDICES = 1;
    const playsByGenre = [...genreMap].sort(([genreA], [genreB]) => ascendingGenrePlays(genreA, genreB));
    return playsByGenre.flatMap(([_, maxIndices]) => maxIndices);
}
