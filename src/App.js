import React, {useEffect, useState} from "react";
import Form from "./components/Form";
import CountdownTimer from "./components/CountdownTimer";
import Highscore from "./components/Highscore";

const App = () => {
    const [startedForm, setStartetForm] = useState();
    const [currentContestantId, setCurrentContestantId] = useState();

    useEffect(() => {
        if (!localStorage.getItem('highscore')) {
            localStorage.setItem('highscores', [])
        }
    }, [])

      return (
        <main className="App">
          <header className="App-header">
            <h1>Skjermeleser-stand</h1>
          </header>
            {
                startedForm ?
                <Form setStartetForm={setStartetForm} setCurrentContestantId={setCurrentContestantId}/>
                : <>
                    <CountdownTimer onCountdownFinished={() => setStartetForm(true)}/>
                    <Highscore currentContestantId={currentContestantId}/>
                </>
            }
        </main>
  );
}

export default App;
