import React from 'react';
import styled from "styled-components";
import {Text} from "./Form";
import Time from "./Time";

const StyledContestant = styled.li`
    display: flex;
    flex-direction: row;
    margin-bottom: 0.5rem;
    height: 2.5em;
    line-height: 2.5em;
    position: relative;
    border-bottom: 1px solid white;
`;

const RankContainer = styled.div`
    text-align: left;
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const RankWithCircle = styled.span`
    height: 2rem;
    width: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #FF8034;
    background-color: ${props => props.highlight ? '#FF8034' : 'transparent'};;
    border-radius: 2em;
    color: #162365;
`;

const Name = styled.div`
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% - 100px);
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
`;

const Score = styled.div`
    text-align: right;
    width: 50px;
    display: flex;
    align-items: center;
`;

const Contestant = ({ contestant, rank, highlight = false }) => (
    <StyledContestant key={`id-${contestant._id}`}>
        <RankContainer>
            <RankWithCircle highlight={highlight}>
                <Text>{rank}</Text>
            </RankWithCircle>
        </RankContainer>
        <Name><Text>{contestant.name}</Text></Name>
        <Score><Time time={contestant.score} /></Score>
    </StyledContestant>
);

export default Contestant;