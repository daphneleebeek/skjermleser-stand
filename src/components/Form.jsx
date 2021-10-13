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

const Form = ({ settStartetSkjema }) => {
    const { startCounting, stopCounting, count } = useStopWatch();
    const [ skjemaKomponenter ] = useState(
        [
            <Input key={'navn'} label={'Navnet ditt'} id={'navn'} />,
            <Input key={'tlf'} label={'Telefonnr'} id={'tlf'} />,
            <Input key={'noeannet'} label={'Noe annet'} id={'noeannet'} />
        ].sort((a, b) => 0.5 - Math.random()))

    useEffect(() => {
        console.log('kjører en gang')
        startCounting()
    }, []);


    const sendInnSkjema = (event) => {
        event.preventDefault();
        // TODO: validering
        // TODO: Stopp timer
        // TODO: Lagre i local storage
        stopCounting()
        settStartetSkjema(false);
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