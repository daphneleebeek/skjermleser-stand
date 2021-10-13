import React, { useState } from "react";
import Form from "./components/Form";
import CountdownTimer from "./components/CountdownTimer";
import Highscore from "./components/Highscore";

const App = () => {
    const [startetSkjema, settStartetSkjema] = useState();

      return (
        <main className="App">
          <header className="App-header">
            <h1>Skjermeleser-stand</h1>
          </header>
            {startetSkjema ?
                <Form settStartetSkjema={settStartetSkjema} />
                : <CountdownTimer onCountdownFinished={() => settStartetSkjema(true)}/>}
            <Highscore />
        </main>
  );
}

export default App;
