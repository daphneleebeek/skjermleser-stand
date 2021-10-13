import React from 'react';
import styled from "styled-components";
import Contestant from "./Contestant";

const HighscoreContainer = styled.div`
  width: 100%;
`;

const Highscore = ({currentContestantId}) => {
    return (
        <HighscoreContainer>
            <h2>HIGHSCORE:</h2>
            <ul>
                { localStorage.getItem('highscores')
                && JSON.parse(localStorage.getItem('highscores'))
                    .sort((a, b) => (a.score > b.score) ? 1 : -1)
                    .map((contestant, index) => {
                        return <Contestant
                            key={contestant.id}
                            contestant={{name: contestant.name, score: contestant.score}}
                            rank={index+1}
                            highlight={contestant.id === currentContestantId}/>
                    })
                }
            </ul>
        </HighscoreContainer>
    );
};

export default Highscore;