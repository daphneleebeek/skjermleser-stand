import React, {useState} from "react";
import Form from "./components/Form";
import CountdownTimer from "./components/CountdownTimer";
import Highscore from "./components/Highscore";
import styled from "styled-components";

const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 60%;
    margin: auto;
`;

const App = () => {
    const [fillingForm, setFillingForm] = useState();
    const [currentContestantId, setCurrentContestantId] = useState();

      return (
        <Container>
          <header className="App-header">
            <h1>Skjermleser-stand</h1>
          </header>
            <p>Under utvikling</p>
            {
                fillingForm ?
                <Form setFillingForm={setFillingForm} setCurrentContestantId={setCurrentContestantId}/>
                : <>
                        <p>Hvem i Bekk er raskest til å fylle ut et skjema med skjermleser?<br /><br />
                            Universell utforming handler om å gjøre tjenester vi lager tilgjengelig for alle,
                            uavhengig av hvilken forutsetning man har. Personer som ser dårlig har ofte behov
                            for hjelpemidler som skjermleser og navigering med tastatur.<br /><br />
                            Klarer du å navigere deg gjennom et skjema, uten å se?</p>
                        <CountdownTimer onCountdownFinished={() => setFillingForm(true)}/>
                        <Highscore currentContestantId={currentContestantId}/>
                </>
            }
        </Container>
  );
}

export default App;
