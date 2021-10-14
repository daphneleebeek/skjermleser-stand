
export const getHighscoreList = () => {
    return localStorage.getItem('highscores')
    && JSON.parse(localStorage.getItem('highscores'))
        .sort((a, b) => (a.score > b.score) ? 1 : -1)
};


export const getRandomSentence = () => {
    const sentences = ['Fagdag er gøy', 'UU er gøy', 'Ha en fin dag']
    return sentences[Math.floor(Math.random() * sentences.length)]
}
