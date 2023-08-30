import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [editingTask, setEditingTask] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  const addTask = () => {
    if (newTask.title && newTask.description) {
      const task = {
        id: Date.now(),
        ...newTask,
        column: 'todo',
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', description: '' });
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const startEditTask = (task) => {
    setEditingTask(task);
    setEditedTitle(task.title);
    setEditedDescription(task.description);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id
        ? { ...task, title: editedTitle, description: editedDescription }
        : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  const moveTask = (taskId, targetColumn) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, column: targetColumn } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Kanban Board</h1>
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-header bg-primary text-white">To Do</div>
            <ul className="list-group list-group-flush">
              {tasks
                .filter((task) => task.column === 'todo')
                .map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                    <button
                      className="btn btn-light"
                      onClick={() => moveTask(task.id, 'doing')}
                    >
                      Move
                    </button>
                    <button
                      className="btn btn-light"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-light"
                      onClick={() => startEditTask(task)}
                    >
                      Edit
                    </button>

                
                    {editingTask && editingTask.id === task.id && (
                      <div
                        className="modal fade"
                        id={`editModal-${task.id}`}
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby={`editModalLabel-${task.id}`}
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id={`editModalLabel-${task.id}`}>
                                Edit Task
                              </h5>
                              <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={cancelEdit}
                              >
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <div className="form-group">
                                <label>Title</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  value={editedTitle}
                                  onChange={(e) => setEditedTitle(e.target.value)}
                                />
                              </div>
                              <div className="form-group">
                                <label>Description</label>
                                <textarea
                                  className="form-control"
                                  value={editedDescription}
                                  onChange={(e) => setEditedDescription(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={cancelEdit}
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={updateTask}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      
        <div className="col">
          <div className="card">
            <div className="card-header bg-warning">Doing</div>
            <ul className="list-group list-group-flush">
              {tasks
                .filter((task) => task.column === 'doing')
                .map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => moveTask(task.id, 'done')}
                    >
                      Mark as Done
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header bg-success text-white">Done</div>
            <ul className="list-group list-group-flush">
              {tasks
                .filter((task) => task.column === 'done')
                .map((task) => (
                  <li className="list-group-item" key={task.id}>
                    <h5>{task.title}</h5>
                    <p>{task.description}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <h4>Add a Task</h4>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          ></textarea>
        </div>
        <button className="btn btn-primary" onClick={addTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default App;
