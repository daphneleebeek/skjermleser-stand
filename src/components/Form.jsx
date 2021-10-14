import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import useStopWatch from "../hooks/useStopWatch";
import {Feiloppsummering, Input} from "nav-frontend-skjema";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Form = ({ setFillingForm, setCurrentContestantId }) => {
    const { startCounting, stopCounting, count } = useStopWatch();
    const [showError, setShowError] = useState(false);
    const [ currentHighscoreList ] = useState(
        localStorage.getItem('highscores') ? JSON.parse(localStorage.getItem('highscores')) : []
    )
    const [ schemaElements, setSchemaElements ] = useState(
        [
            {
                component: <Input key={'name'} label={'Navnet ditt:'} id={'name'} />,
                errorMsg: 'Du må skrive navn',
                showError: false,
                validation: () => document.getElementById('name').value.length > 3
            },
            {
                component: <Input key={'tlf'} label={'Telefonnr'} id={'tlf'} />,
                errorMsg: 'Du må skrive navn',
                showError: false,
                validation: () => document.getElementById('tlf').value.length === 8
            },
        ].sort((a, b) => 0.5 - Math.random()))


    const contestantId = currentHighscoreList.length;

    useEffect(() => {
        setCurrentContestantId(contestantId)
        startCounting()
    }, [startCounting, setCurrentContestantId, contestantId]);

    const saveHighscoreInLocalStorage = () => {
        const name = document.getElementById('name').value;
        const highscore = {id: contestantId, name, score: count} // TODO bruke navn
        const newHighscoreList = currentHighscoreList ? [...currentHighscoreList, highscore] : [highscore]
        localStorage.setItem('highscores', JSON.stringify(newHighscoreList));
    };

    const validationOk = () => {
        const updatedElements = schemaElements.map(element => {
            return {...element, showError: !element.validation()}
        });
        const showError = updatedElements.find(element => element.showError)
        setShowError(showError);
        setSchemaElements(updatedElements);
        return !showError;
    }


    const sendInnSkjema = (event) => {
        event.preventDefault();
        if (validationOk()) {
            saveHighscoreInLocalStorage();
            stopCounting()
            setFillingForm(false);
        }
    }

    return (
        <StyledForm aria-live={'polite'} onSubmit={sendInnSkjema}>
            <p aria-hidden={true}>{count}</p>
            {schemaElements.map(element => element.component)}

            {showError && <Feiloppsummering
                tittel="For å gå videre må du rette opp følgende:"
                feil={schemaElements
                    .filter(element => element.showError)
                    .map(element => ({ skjemaelementId: element.component.props.id, feilmelding: element.errorMsg }))}
            />}

            <button type="submit">Send inn</button>
        </StyledForm>
    );
};

export default Form;