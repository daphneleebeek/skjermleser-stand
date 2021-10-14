import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import useStopWatch from "../hooks/useStopWatch";
import {Feiloppsummering, Input, Radio, RadioGruppe, Select} from "nav-frontend-skjema";
import Time from "./Time";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

export const Text = styled.p`
  font-size: 1.25rem;
  margin: 0;
  padding: 0;
  line-height: initial;
  font-family: DINOT;
`;

const Form = ({ setFillingForm, setCurrentContestant }) => {
    const { startCounting, stopCounting, count } = useStopWatch();
    const [showError, setShowError] = useState(false);
    const [ currentHighscoreList ] = useState(
        localStorage.getItem('highscores') ? JSON.parse(localStorage.getItem('highscores')) : []
    )
    const [ schemaElements, setSchemaElements ] = useState(
        [
            {
                component: <Input key={'name'} label={'Hva heter du?'} id={'name'}/>,
                errorMsg: 'Du må svare med minst to bokstaver på hva du heter',
                showError: false,
                validation: () => document.getElementById('name').value.length > 1
            },
            {
                component: <Select label={'Hvilken avdeling er du i?'} id={'avdeling'}>
                    <option value=''>Velg avdeling</option>
                    <option value="design">Design</option>
                    <option value="teknologi">Teknologi</option>
                    <option value="basen">Basen</option>
                    <option value="salgOgAdmin">Salg og Admin</option>
                    <option value="bmc">BMC</option>
                    <option value="oppdrag">Oppdrag</option>
                    <option value="trondheim">Trondheim</option>
                    <option value="annet">Annet</option>
                </Select>,
                errorMsg: 'Du må velge hvilken avdeling du er i',
                showError: false,
                validation: () => document.getElementById('avdeling').value !== ''
            },
            {
                component: <RadioGruppe legend="Hvem er administrerende direktør i Bekk?" id={'direktør'}>
                    <Radio label={"todo"} name="direktør" />
                    <Radio label={"todo"} name="direktør" />
                    <Radio label={"todo"} name="direktør" />
                </RadioGruppe>,
                errorMsg: 'Du må gjette hvem som er administrerende direktør',
                showError: false,
                validation: () => document.getElementById('direktør')
            },
        ].sort((a, b) => 0.5 - Math.random()))


    const contestantId = currentHighscoreList.length;

    useEffect(() => {
        setCurrentContestant({id: contestantId, score: 0})
        startCounting()
    }, []);

    const saveHighscoreInLocalStorage = (score) => {
        const name = document.getElementById('name').value;
        const highscore = {id: contestantId, name, score: score}
        const newHighscoreList = currentHighscoreList ? [...currentHighscoreList, highscore] : [highscore]
        localStorage.setItem('highscores', JSON.stringify(newHighscoreList));
    };

    const validationOk = () => {
        const updatedElements = schemaElements.map(element => {
            const showError = !element.validation();
            return {
                ...element,
                showError,
                component: {
                    ...element.component,
                    props: {
                        ...element.component.props,
                        feil: showError ? element.errorMsg : ''
                    }
                }}
        });
        const showError = updatedElements.find(element => element.showError)
        setShowError(showError);
        setSchemaElements(updatedElements);
        return !showError;
    }


    const sendInnSkjema = (event) => {
        event.preventDefault();
        if (validationOk()) {
            const score = count;
            setCurrentContestant({id: contestantId, score: score})
            saveHighscoreInLocalStorage(score);
            stopCounting()
            setFillingForm(false);
        }
    }

    return (
        <StyledForm aria-live={'polite'} onSubmit={sendInnSkjema}>
            <div aria-hidden={true}>
                <Time time={count} />
            </div>
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