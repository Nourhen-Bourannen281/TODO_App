import React, { useState, useEffect } from "react";
import TaskItem from "./taskItem";

const DayView = ({ dayNumber, setDay, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`http://localhost:5000/api/userdays/${dayNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => {
        setTasks(data.tasks || []);
        setCompleted(data.completed || []);
        setTitle(data.title || "");
        setQuote(data.quote || "");
      })
      .catch(() => {
        setTasks([]);
        setCompleted([]);
        setTitle("");
        setQuote("");
      });
  }, [dayNumber, token]);

  // Ajouter une tâche localement + sauvegarder dans la base
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const updatedTasks = [...tasks, newTask];
    const updatedCompleted = [...completed, false];

    setTasks(updatedTasks);
    setCompleted(updatedCompleted);
    setNewTask("");

    saveTasks(updatedTasks, updatedCompleted);
  };

  // Cocher/décocher tâche
  const handleCheck = (index) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !updatedCompleted[index];
    setCompleted(updatedCompleted);

    saveTasks(tasks, updatedCompleted);
  };

  // Supprimer une tâche
  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    const updatedCompleted = completed.filter((_, i) => i !== index);

    setTasks(updatedTasks);
    setCompleted(updatedCompleted);

    saveTasks(updatedTasks, updatedCompleted);
  };

  // Fonction pour sauvegarder les tasks dans la base via API
  const saveTasks = (tasksToSave, completedToSave) => {
    fetch("http://localhost:5000/api/userdays/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        dayNumber,
        tasks: tasksToSave,
        completed: completedToSave,
        title,
        quote,
      }),
    }).catch(() => {
      alert("Erreur lors de la sauvegarde des tâches.");
    });
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="quote">{quote}</div>

      <div className="day">
        {tasks.map((task, i) => (
          <TaskItem
            key={i}
            task={task}
            index={i}
            checked={completed[i]}
              onCheck={() => handleCheck(i)} // Simplifié
      onDelete={() => handleDelete(i)} // Simplifié
          />
        ))}
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask} style={{ marginLeft: "10px" }}>
          ➕ Ajouter
        </button>
      </div>

      <div className="nav" style={{ marginTop: "20px", textAlign: "center" }}>
        {dayNumber > 1 && (
          <button onClick={() => setDay(dayNumber - 1)} style={{ marginRight: "10px" }}>
            ⬅️ Jour {dayNumber - 1}
          </button>
        )}
        {dayNumber < 9 && (
          <button onClick={() => setDay(dayNumber + 1)}>
            ⏭️ Jour {dayNumber + 1}
          </button>
        )}
      </div>

      <div style={{ position: "fixed", bottom: "20px", right: "20px" }}>
        <button onClick={onLogout}>🚪 Se déconnecter</button>
      </div>
    </div>
  );
};

export default DayView;
