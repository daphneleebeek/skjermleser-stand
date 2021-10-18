import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import useStopWatch from "../hooks/useStopWatch";
import {CheckboxGruppe, Checkbox, Feiloppsummering, Input, Radio, RadioGruppe, Select} from "nav-frontend-skjema";
import Time from "./Time";
import {getRandomSentence} from "../utils";

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

export const SchemaElement = styled.div`
  margin-bottom: 3rem;
`;

const Form = ({ setFillingForm, setCurrentContestant }) => {
    const { startCounting, stopCounting, count } = useStopWatch();
    const [showError, setShowError] = useState(false);
    const [ currentHighscoreList ] = useState(
        localStorage.getItem('highscores') ? JSON.parse(localStorage.getItem('highscores')) : []
    )
    const [randomSentence] = useState(getRandomSentence());

    const [ schemaElements, setSchemaElements ] = useState(
        [
            {
                component: <Input label={'Hva heter du?'} id={'name'}/>,
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
                component: <RadioGruppe legend="Hvem er administrerende direktør i Bekk?" id={'direktør'} onChange={() => {}}>
                    <Radio label={"Marius Helstad"} name="direktør" />
                    <Radio label={"Helene Vollene"} name="direktør" />
                    <Radio label={"Jøran Lillesand"} name="direktør" />
                    <Radio label={"Olav Folkestad"} name="direktør" id={'olav'}/>
                    <Radio label={"Unni Nyhamar Hinkel"} name="direktør" />
                    <Radio label={"Reidar Sande"} name="direktør" />
                </RadioGruppe>,
                errorMsg: 'Du må gjette hvem som er administrerende direktør',
                showError: false,
                validation: () => document.getElementById('olav').checked
            },
            {
                component: <Input label={`Skriv følgende setning i inputfeltet: ${randomSentence}`} id={'randomSentence'}/>,
                errorMsg: `Du må skrive ${randomSentence} i inputfeltet`,
                showError: false,
                validation: () => document.getElementById('randomSentence').value.toLowerCase() === randomSentence.toLowerCase()
            },
            {
                component: <CheckboxGruppe legend="Hvilken serie har du sett?">
                    <Checkbox label={<span lang={"en"}>Squid Game</span>} className={'serier'} />
                    <Checkbox label={<span lang={"en"}>How I Met Your Mother</span>} className={'serier'} />
                    <Checkbox label={<span lang={"en"}>The Good Place</span>} className={'serier'} />
                    <Checkbox label={<span lang={"en"}>Game of Thrones</span>} className={'serier'} />
                    <Checkbox label={"Broen"} className={'serier'} />
                    <Checkbox label={<span lang={"en"}>Community</span>} className={'serier'} />
                    <Checkbox label={"Farmen"} className={'serier'} />
                    <Checkbox label={<span lang={"en"}>Love is Blind</span>} className={'serier'} />
                    <Checkbox label={<span lang={"en"}>Parks and Recreation</span>} className={'serier'} />
                    <Checkbox label={"Æsj, ser ikke på serier"} className={'serier'} />
                </CheckboxGruppe>,
                errorMsg: `Du må svare på hvilken serier du har sett`,
                showError: false,
                validation: () => {
                    const checkboxes = document.getElementsByClassName('checkboks');
                    return Array.from(checkboxes).find(element => element.checked)
                }
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
            {schemaElements.map((element, index) => <SchemaElement key={index}>{element.component}</SchemaElement>)}

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