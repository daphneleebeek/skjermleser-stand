import React from 'react';

const Skjema = ({ settStartetSkjema }) => {

    const sendInnSkjema = (event) => {
        event.preventDefault();
        settStartetSkjema(false);
    }

    return (
        <form onSubmit={sendInnSkjema}>
            <label htmlFor="navn">Navnet ditt:</label>
            <input type="text" id="navn" name="navn" />
            <button type="submit">Send inn</button>
        </form>
    );
};

export default Skjema;