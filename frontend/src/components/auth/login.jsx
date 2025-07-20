import React, { useState } from "react";
import "./auth.css";

function Auth({ onLogin }) {
  const [rightPanelActive, setRightPanelActive] = React.useState(false);

  const [signInEmail, setSignInEmail] = React.useState("");
  const [signInPassword, setSignInPassword] = React.useState("");

  const [signUpName, setSignUpName] = React.useState("");
  const [signUpEmail, setSignUpEmail] = React.useState("");
  const [signUpPassword, setSignUpPassword] = React.useState("");

  const handleSignUpClick = () => setRightPanelActive(true);
  const handleSignInClick = () => setRightPanelActive(false);

 const handleSignInSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInEmail, // 👈 ici tu envoies bien username = email
        password: signInPassword,
      }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      onLogin();
    } else {
      alert(data.message || "Erreur");
    }
  } catch (error) {
    alert("Erreur serveur");
  }
};

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: signUpEmail, password: signUpPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Inscription réussie !");
        setRightPanelActive(false);
      } else {
        alert(data.message || "Erreur");
      }
    } catch {
      alert("Erreur serveur");
    }
  };

  return (
    <div className={`container ${rightPanelActive ? "right-panel-active" : ""}`} id="container">
      <div className="form-container sign-up-container">
        <form onSubmit={handleSignUpSubmit}>
          <h1>Créer un compte</h1>
          <input
            type="text"
            placeholder="Nom"
            value={signUpName}
            onChange={(e) => setSignUpName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>
      </div>

      <div className="form-container sign-in-container">
        <form onSubmit={handleSignInSubmit}>
          <h1>Connexion</h1>
          <input
            type="email"
            placeholder="Email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            required
          />
          <a href="#">Mot de passe oublié ?</a>
          <button type="submit">Connexion</button>
        </form>
      </div>

      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Bienvenue !</h1>
            <p>Connecte-toi avec tes informations</p>
            <button className="ghost" onClick={handleSignInClick}>
              Connexion
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Salut, amie !</h1>
            <p>Entre tes infos pour créer un compte</p>
            <button className="ghost" onClick={handleSignUpClick}>
              Inscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
