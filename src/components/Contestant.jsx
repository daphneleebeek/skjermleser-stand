import React from 'react';
import styled from "styled-components";

const StyledContestant = styled.li`
    display: flex;
    flex-direction: row;
    height: 2.5em;
    line-height: 2.5em;
    position: relative;
    border-bottom: 1px solid white;
`;

const RankContainer = styled.div`
    text-align: left;
    margin-right: 20px;
`;

const RankWithCircle = styled.span`
    height: 2em;
    width: 2em;
    line-height: 1.75em;
    display: inline-block;
    border: 1px solid ${props => props.circleColor};
    border-radius: 2em;
    font-size: 0.8em;
    text-align: center;
`;

const Name = styled.div`
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% - 100px);
    text-overflow: ellipsis;
`;

const Score = styled.div`
    text-align: right;
    width: 50px;
`;

const Contestant = ({ contestant, rank, highlight = false }) => (
    <StyledContestant key={`id-${contestant._id}`}>
        <RankContainer>
            <RankWithCircle circleColor={highlight ? 'red' : 'white'}>
                {rank}
            </RankWithCircle>
        </RankContainer>
        <Name>{contestant.name}</Name>
        <Score>{contestant.score}</Score>
    </StyledContestant>
);

export default Contestant;