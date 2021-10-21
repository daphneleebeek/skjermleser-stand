
export const getHighscoreList = () => {
    return localStorage.getItem('highscores')
    && JSON.parse(localStorage.getItem('highscores'))
        .sort((a, b) => (a.score > b.score) ? 1 : -1)
};
