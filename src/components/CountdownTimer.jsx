import React, { useState } from 'react';
import styled from 'styled-components';

import useCountdown from '../hooks/useCountdown';

const CountdownButton = styled.button`
    padding: 0;
    height: 20vh;
    width: 20vh;
    border: 1px solid #FF8034;
    background-color: transparent;
    border-radius: 20vh;
    color: #162365;
    cursor: pointer;
    font-size: 1.25em;
    :focus {
        outline: none;
        background-color: #FFB88D;
    }
    :hover {
        background-color: #FFB88D;
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