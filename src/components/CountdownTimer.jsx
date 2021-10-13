import React, { useState } from 'react';
import styled from 'styled-components';

import useTimer from '../hooks/useTimer';

const CountdownButton = styled.button`
    padding: 0;
    height: 20vh;
    width: 20vh;
    border: 1px solid yellow;
    border-radius: 20vh;
    color: black;
    background: transparent;
    cursor: pointer;
    font-size: 1.25em;
    :focus {
        outline: none;
    }
    :hover {
        background-color: red;
    }
`;

const CountdownTimer = ({ onCountdownFinished, className, startText = 'Start' }) => {
    const [hasStarted, setHasStarted] = useState(false);

    const { startTimer, count } = useTimer(3, 1000, () => {
        onCountdownFinished();
    });

    const onStartClick = () => {
        startTimer();
        setHasStarted(true);
    };

    return (
        <CountdownButton autoFocus type="button" className={className} onClick={() => onStartClick()}>
            {hasStarted ? count : startText}
        </CountdownButton>
    );
};

export default CountdownTimer;