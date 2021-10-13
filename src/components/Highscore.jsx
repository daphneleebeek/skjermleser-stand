import React from 'react';
import styled from "styled-components";
import Contestant from "./Contestant";

const HighscoreContainer = styled.div`
  width: 100%;
`;

const Highscore = () => {
    return (
        <HighscoreContainer>
            <h2>HIGHSCORE:</h2>
            <ul>
                <Contestant contestant={{name: 'daphne', score: '45'}} rank={'1'} highlight={true}/>
                <Contestant contestant={{name: 'daphne', score: '45'}} rank={'1'} highlight={false}/>
            </ul>
        </HighscoreContainer>
    );
};

export default Highscore;