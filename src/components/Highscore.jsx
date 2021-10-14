import React from 'react';
import styled from "styled-components";
import Contestant from "./Contestant";

const HighscoreContainer = styled.div`
  margin-top: 3rem;
  width: 80%;
  text-align: left;
`;

const List = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const Highscore = ({currentContestantId}) => {
    return (
        <HighscoreContainer>
            <h2>Highscore:</h2>
            <List>
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
            </List>
        </HighscoreContainer>
    );
};

export default Highscore;