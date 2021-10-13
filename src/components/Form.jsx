import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import useStopWatch from "../hooks/useStopWatch";

const Input = ({label, id}) => {
    return (
        <>
            <label htmlFor={id}>{label}:</label>
            <input type="text" id={id} />
        </>
    )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Form = ({ setStartetForm, setCurrentContestantId }) => {
    const { startCounting, stopCounting, count } = useStopWatch();
    const [ currentHighscoreList ] = useState(
        localStorage.getItem('highscores') ? JSON.parse(localStorage.getItem('highscores')) : []
    )
    const [ skjemaKomponenter ] = useState(
        [
            <Input key={'navn'} label={'Navnet ditt'} id={'name'} />,
            <Input key={'tlf'} label={'Telefonnr'} id={'tlf'} />,
            <Input key={'noeannet'} label={'Noe annet'} id={'noeannet'} />
        ].sort((a, b) => 0.5 - Math.random()))

    const contestantId = currentHighscoreList.length;

    useEffect(() => {
        setCurrentContestantId(contestantId)
        startCounting()
    }, [startCounting, setCurrentContestantId, contestantId]);


    const sendInnSkjema = (event) => {
        event.preventDefault();
        // TODO: validering
        // TODO: Stopp timer
        console.log(document.getElementById('name')); // TODO
        const highscore = {id: contestantId, name: 'test', score: count} // TODO
        const newHighscoreList = currentHighscoreList ? [...currentHighscoreList, highscore] : [highscore]
        localStorage.setItem('highscores', JSON.stringify(newHighscoreList));
        stopCounting()
        setStartetForm(false);
    }

    return (
        <StyledForm onSubmit={sendInnSkjema}>
            <p aria-hidden={true}>{count}</p>
            {skjemaKomponenter}
            <button type="submit">Send inn</button>
        </StyledForm>
    );
};

export default Form;