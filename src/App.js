import React, { useState } from "react";
import Skjema from "./components/Skjema";
import CountdownTimer from "./components/CountdownTimer";

const App = () => {
    const [startetSkjema, settStartetSkjema] = useState();

      return (
        <main className="App">
          <header className="App-header">
            <h1>Skjermeleser-stand</h1>
          </header>
            {startetSkjema ?
                <Skjema settStartetSkjema={settStartetSkjema} />
                : <CountdownTimer onCountdownFinished={() => settStartetSkjema(true)}/>}
        </main>
  );
}

export default App;
