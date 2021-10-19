import React from 'react';
import styled from "styled-components";
import Contestant from "./Contestant";
import {getHighscoreList} from "../utils";

const HighscoreContainer = styled.div`
  margin-top: 3rem;
  width: 80%;
  text-align: left;
`;

const List = styled.ul`
  padding: 0;
  list-style-type: none;
`;

const Highscore = ({currentContestant}) => {
    return (
        <HighscoreContainer>
            <h2>Highscore:</h2>
            {
                getHighscoreList() &&
                <List>
                    { getHighscoreList().slice(0, 15).map((contestant, index) => {
                        return <Contestant
                            key={contestant.id}
                            contestant={{name: contestant.name, score: contestant.score}}
                            rank={index+1}
                            highlight={contestant.id === currentContestant.id}/>
                    })
                    }
                </List>
            }
        </HighscoreContainer>
    );
};

export default Highscore;