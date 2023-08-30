// Task.js
import React from 'react';

const Task = ({ task, moveTask, editTask, deleteTask }) => {
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5>{task.title}</h5>
          <p>{task.description}</p>
        </div>
        <div>
          <button
            className="btn btn-warning btn-sm mr-2"
            onClick={() => editTask(task)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
      <button
        className="btn btn-primary btn-sm mt-2"
        onClick={() => moveTask(task.id, getNextColumn(task.column))}
      >
        Move to {getNextColumn(task.column)}
      </button>
    </li>
  );
};

// Helper function to get the next column
const getNextColumn = (currentColumn) => {
  switch (currentColumn) {
    case 'todo':
      return 'doing';
    case 'doing':
      return 'done';
    default:
      return 'done';
  }
};

export default Task;
