// TodoColumn.js, DoingColumn.js, and DoneColumn.js (similar structure)
import React from 'react';
import Task from './Task';

const TodoColumn = ({ tasks, moveTask, editTask, deleteTask }) => {
  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-header">{tasks[0]?.column.toUpperCase()}</div>
        <ul className="list-group list-group-flush">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              moveTask={moveTask}
              editTask={editTask}
              deleteTask={deleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoColumn;
