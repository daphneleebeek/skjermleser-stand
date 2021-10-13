import React from 'react';
import styled from "styled-components";

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

const Skjema = ({ settStartetSkjema }) => {

    const skjemaKomponenter = [
        <Input key={'navn'} label={'Navnet ditt'} id={'navn'} />,
        <Input key={'tlf'} label={'Telefonnr'} id={'tlf'} />,
        <Input key={'noeannet'} label={'Noe annet'} id={'noeannet'} />
    ]

    const sendInnSkjema = (event) => {
        event.preventDefault();
        settStartetSkjema(false);
    }

    return (
        <StyledForm onSubmit={sendInnSkjema}>
            {skjemaKomponenter.sort((a, b) => 0.5 - Math.random())}
            <button type="submit">Send inn</button>
        </StyledForm>
    );
};

export default Skjema;