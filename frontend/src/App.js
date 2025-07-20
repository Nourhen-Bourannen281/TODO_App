import React, { useState, useEffect } from "react";
import './Styles.css'; // bien importer ton CSS ici
import DayView from "./components/dayView";
import Auth from "./components/auth/login";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [dayNumber, setDayNumber] = useState(1);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <div>
      {!loggedIn ? (
        <Auth onLogin={() => setLoggedIn(true)} />
      ) : (
        <DayView
          dayNumber={dayNumber}
          setDay={setDayNumber}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
