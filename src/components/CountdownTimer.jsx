import React, { useState } from 'react';
import styled from 'styled-components';

import useCountdown from '../hooks/useCountdown';

const CountdownButton = styled.button`
    padding: 0;
    height: 20vh;
    width: 20vh;
    border: 1px solid #FF8034;
    background-color: #FFB88D;
    border-radius: 20vh;
    color: #0E0E0E;
    cursor: pointer;
    font-size: 1.25em;
    :focus {
        outline: none;
        background-color: #FF9999;
        border: 1px solid #FF5B5B;
    }
    :hover {
        background-color: #FF9999;
        border: 1px solid #FF5B5B;
    }
`;

const CountdownTimer = ({ onCountdownFinished, className, startText = 'Start' }) => {
    const [hasStarted, setHasStarted] = useState(false);

    const { startTimer, count } = useCountdown(3, 1000, () => {
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