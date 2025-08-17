


// AI intigration ,
// better features and look


// src/App.jsx
import FacialExpression from "./components/FacialExpression";
import MoodSongs from "./components/MoodSongs";
import { useState } from "react";

function App() {
  const [songs, setSongs] = useState([]);

  return (
    <div>
      {/* Heading stays separate from flex panels */}
      <h1 className="app-heading">Moodify – <span> Let your emotions pick the Songs.</span></h1>

      <div className="app-container">
        <div className="left-panel">
          <FacialExpression setSongs={setSongs} />
        </div>
        <div className="right-panel">
          <MoodSongs Songs={songs} />
        </div>
      </div>
    </div>
  );
}

export default App;




