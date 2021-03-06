import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import useStopWatch from "../hooks/useStopWatch";
import {CheckboxGruppe, Checkbox, Feiloppsummering, Input, Radio, RadioGruppe, Select} from "nav-frontend-skjema";
import Time from "./Time";
import {getRandomSentence} from "../utils";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
`;

const StyledForm = styled.form`
  text-align: left;
  color: #162365;
  border: 2px solid #FF8034;
  padding: 3rem;
  margin-top: 3rem;
  filter: blur(6px);
  width: 70%;
  
  fieldset {
    border: none;
    padding: 0;
    margin: 0;
  }

  p, legend, label {
    font-size: 1.25rem;
  }

  .serier > label, .dag > label {
    font-size: 1rem;
  }
  
  .skjemaelement__feilmelding {
    color: #FF5B5B;
    .typo-feilmelding {
      margin: 0;
      font-weight: bold;
    }
  }
`;

export const Text = styled.p`
  font-size: 1.25rem;
  margin: 0;
  padding: 0;
  line-height: initial;
  font-family: DINOT;
`;

export const Tid = styled.div`
    display: flex;
    flex-direction: row;
`;

export const SchemaElement = styled.div`
  margin-bottom: 3rem;
`;

const StyledInput = styled(Input)`
    display: flex;
    flex-direction: column;
  
    input{
        width: 50%;
    }
`

const StyledButton = styled.button`
    width: 15rem;
    height: 3rem;
    border: 1px solid #FF8034;
    background-color: transparent;
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

const StyledFeiloppsummering = styled(Feiloppsummering)`
  border: 2px solid #FF5B5B;
  padding: 0.5rem;
  margin: 2rem 0;
`

const Form = ({ setFillingForm, setCurrentContestant }) => {
    const { startCounting, stopCounting, count } = useStopWatch();
    const [showErrorSummary, setShowErrorSummary] = useState(false);
    const [ currentHighscoreList ] = useState(
        localStorage.getItem('highscores') ? JSON.parse(localStorage.getItem('highscores')) : []
    )
    const validationOk = useRef(null)

    const contestantId = currentHighscoreList.length + 1;

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

    validationOk.current = (kommerFraKnapp = false) => {
        const updatedElements = schemaElements.map(element => {
            const hasError = !element.validation();
            return {
                ...element,
                showError: hasError,
                component: {
                    ...element.component,
                    props: {
                        ...element.component.props,
                        feil: (kommerFraKnapp || showErrorSummary) && hasError ? element.errorMsg : ''
                    }
                }}
        });
        const validationOk = !(updatedElements.find(element => element.showError));
        validationOk && setShowErrorSummary(false);
        setSchemaElements(updatedElements);
        return validationOk;
    }

    const [radioList] = useState([
        <Radio label={"Mandag"} name="dag" className={'dag'}/>,
        <Radio label={"Tirsdag"} name="dag" className={'dag'}/>,
        <Radio label={"Onsdag"} name="dag" className={'dag'}/>,
        <Radio label={"Torsdag"} name="dag" id={'torsdag'} className={'dag'}/>,
        <Radio label={"Fredag"} name="dag" className={'dag'}/>,
    ].sort((a, b) => 0.5 - Math.random()))

    const [ schemaElements, setSchemaElements ] = useState(
        [
            {
                component: <StyledInput label={'Hva heter du?'} id={'name'} onChange={() => validationOk.current()}/>,
                errorMsg: 'Du m?? svare med minst to bokstaver p?? hva du heter',
                showError: false,
                validation: () => document.getElementById('name').value.length > 1
            },
            {
                component: <Select label={'Hvilken rolle har du?'} id={'rolle'} onChange={() => validationOk.current()}>
                    <option value=''>Velg rolle</option>
                    <option value="uxDesign">UX designer</option>
                    <option value="grafiskDesign">Grafisk designer</option>
                    <option value="tekstforfatter">Tekstforfatter</option>
                    <option value="utvikler">Utvikler</option>
                    <option value="forretningsutvikler">Forretningsutvikler</option>
                    <option value="annet">Annet</option>
                </Select>,
                errorMsg: 'Du m?? velge hvilken rolle du har',
                showError: false,
                validation: () => document.getElementById('rolle').value !== ''
            },
            {
                component: <RadioGruppe legend={'Hvilken dag er det i dag?'} id={'dag'} onChange={() => validationOk.current()}>
                    {radioList.map(radio => radio)}
                </RadioGruppe>,
                errorMsg: 'Du m?? velge hvilken dag det er i dag eller du har valgt feil dag',
                showError: false,
                validation: () => document.getElementById('torsdag').checked
            },
            {
                component: <CheckboxGruppe id={'serier'} legend="Hvilken serie har du sett?" onChange={() => validationOk.current()}>
                    <Checkbox label={<span lang={"en"}>Friends</span>} className={'serier'} />
                    <Checkbox label={<span lang={"en"}>How I Met Your Mother</span>} className={'serier'} />
                    <Checkbox label={<span lang={"en"}>Game of Thrones</span>} className={'serier'} />
                    <Checkbox label={<span lang={"en"}>Farmen</span>} className={'serier'} />
                    <Checkbox label={"Ingen av disse"} className={'serier'} />
                </CheckboxGruppe>,
                errorMsg: `Du m?? svare p?? hvilken serier du har sett`,
                showError: false,
                validation: () => {
                    const checkboxes = document.getElementsByClassName('checkboks');
                    return Array.from(checkboxes).find(element => element.checked)
                }
            },
        ].sort((a, b) => 0.5 - Math.random()))

    const sendInnSkjema = (event) => {
        event.preventDefault();
        setShowErrorSummary(true);
        if (validationOk.current(true)) {
            const score = count;
            setCurrentContestant({id: contestantId, score: score})
            saveHighscoreInLocalStorage(score);
            stopCounting()
            setFillingForm(false);
        }
    }

    return (
        <Container>
            <Tid aria-hidden={true}>
                <Text>Tid brukt: </Text><Time time={count} />
            </Tid>
            <StyledForm onSubmit={sendInnSkjema}>
                <p aria-live={'assertive'}>Du kan begynne ?? fylle ut skjema</p>
                {schemaElements.map((element, index) => <SchemaElement key={index}>{element.component}</SchemaElement>)}
                {showErrorSummary && <StyledFeiloppsummering
                    aria-live={'polite'}
                    tittel="For ?? g?? videre m?? du rette opp f??lgende:"
                    feil={schemaElements
                        .filter(element => element.showError)
                        .map(element => ({ skjemaelementId: element.component.props.id, feilmelding: element.errorMsg }))}
                />}

                <StyledButton type="submit">Send inn</StyledButton>
            </StyledForm>
        </Container>
    );
};

export default Form;