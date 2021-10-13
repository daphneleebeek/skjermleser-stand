import React, {useState} from "react";
import Form from "./components/Form";
import CountdownTimer from "./components/CountdownTimer";
import Highscore from "./components/Highscore";

const App = () => {
    const [fillingForm, setFillingForm] = useState();
    const [currentContestantId, setCurrentContestantId] = useState();

      return (
        <main className="App">
          <header className="App-header">
            <h1>Skjermeleser-stand</h1>
          </header>
            {
                fillingForm ?
                <Form setFillingForm={setFillingForm} setCurrentContestantId={setCurrentContestantId}/>
                : <>
                    <CountdownTimer onCountdownFinished={() => setFillingForm(true)}/>
                    <Highscore currentContestantId={currentContestantId}/>
                </>
            }
        </main>
  );
}

export default App;
