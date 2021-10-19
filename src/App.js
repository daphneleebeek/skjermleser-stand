import React, {useState} from "react";
import Form, {Text} from "./components/Form";
import CountdownTimer from "./components/CountdownTimer";
import Highscore from "./components/Highscore";
import styled from "styled-components";
import Time from "./components/Time";
import {getHighscoreList} from "./utils";

const Container = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 45rem;
    margin: 5rem auto;
    text-align: center;
`;

const PageTitle = styled.h1`
    font-weight: 100;
`;

const IntroTekst = styled.p`
  color: #162365;
  font-family: DINOT;
  font-size: 1.25rem;
  margin-bottom: 3rem;
`;

const App = () => {
    const [fillingForm, setFillingForm] = useState();
    const [currentContestant, setCurrentContestant] = useState({id: undefined, score: 0});

      return (
        <Container>
          <header className="App-header">
            <PageTitle>UU-utfordringen</PageTitle>
          </header>
            {
                fillingForm ?
                <Form setFillingForm={setFillingForm} setCurrentContestant={setCurrentContestant}/>
                : <>
                    {!!currentContestant.score &&
                    (<Text>
                        Du brukte <Time time={currentContestant.score} /> og kom på {getHighscoreList().findIndex(highscore => highscore.id === currentContestant.id) + 1}. plass
                    </Text>)}
                    <IntroTekst>
                        <b>Er du den raskeste bekkeren til å fylle ut et skjema med skjermleser?</b><br /><br />
                        Hvis du vinner vil UU i praksis faggruppen gjennomføre en analyse av en side eller et produkt du jobber på!
                    </IntroTekst>
                    <CountdownTimer onCountdownFinished={() => setFillingForm(true)}/>
                    <Highscore currentContestant={currentContestant}/>
                </>
            }
        </Container>
  );
}

export default App;
