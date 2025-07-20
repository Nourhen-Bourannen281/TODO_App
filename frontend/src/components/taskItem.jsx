import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const TaskItem = ({ task, checked, onCheck, onDelete }) => {
  return (
    <div className={`task ${checked ? 'completed' : ''}`} style={styles.taskContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheck}
        className="task-checkbox"
      />
      <button
        className="delete-btn"
        onClick={onDelete}
        aria-label="Supprimer"
        style={styles.deleteButton}
      >
        <FaTrashAlt size={14} />
      </button>
      <span className="task-text" style={styles.taskText}>
        {task}
      </span>
    </div>
  );
};

const styles = {
  taskContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#ffefef',
    padding: '10px 14px',
    borderRadius: '10px',
    width: '100%',
    boxSizing: 'border-box',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ff3e6c',
    cursor: 'pointer',
  },
  taskText: {
    flex: 1, // pour que le texte occupe tout l’espace restant
    wordBreak: 'break-word',
  },
};

export default TaskItem;
