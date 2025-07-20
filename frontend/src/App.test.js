import React, { useState } from "react";
import DayView from "./components/dayViewayView";

function App() {
  const [currentDay, setCurrentDay] = useState(1);

  return (
    <div>
      <DayView dayNumber={currentDay} setDay={setCurrentDay} />
    </div>
  );
}

export default App;
