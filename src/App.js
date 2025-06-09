import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
    console.log('Tasks loaded:', res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSave = async (taskData) => {
    if (taskToEdit) {
      await updateTask(taskToEdit.id, taskData);
      setTaskToEdit(null);
    } else {
      await createTask(taskData);
    }
    loadTasks();
    setShowModal(false);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete) {
      await deleteTask(taskToDelete.id);
      setTaskToDelete(null);
      loadTasks();
    }
  };

  return (
    <div className="container mt-4">

      {/* Task Table with Button Triggers */}
      <TaskList
        tasks={tasks}
        onEdit={handleEdit}
        onDelete={(task) => setTaskToDelete(task)}
        onNewTask={() => {
          setTaskToEdit(null);
          setShowModal(true);
        }}
      />

      {/* Task Create/Edit Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header justify-content-center">
                <h5 className="modal-title text-center w-100">{taskToEdit ? 'Edit Task' : 'New Task'}</h5>
                <button
                  type="button"
                  className="btn-close position-absolute end-0 me-3"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <TaskForm
                  onSave={handleSave}
                  onCancel={() => setShowModal(false)}
                  taskToEdit={taskToEdit}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white justify-content-center">
                <h5 className="modal-title">Delete</h5>
              </div>
              <div className="modal-body text-center">
              <p>Do you want to delete task <strong>{taskToDelete.assignedTo}</strong>?</p>
              </div>
              <div className="modal-footer justify-content-center">
                <button className="btn btn-secondary" onClick={() => setTaskToDelete(null)}>No</button>
                <button className="btn btn-warning" onClick={confirmDeleteTask}>Yes</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
