import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = ({ tasks, onEdit, onDelete, onNewTask }) => {
  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Tasks</h5>
        <div>
          <button className="btn btn-warning btn-sm me-2" onClick={onNewTask}>New Task</button>
          <button className="btn btn-warning btn-sm">Refresh</button>
        </div>
      </div>

      <div className="card-body">
        <input
          className="form-control mb-3"
          placeholder="Search"
          // Optionally: onChange={handleSearch}
        />

        <table className="table table-bordered table-hover">
          <thead className="table-light">
            <tr>
              <th><input type="checkbox" /></th>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {!tasks?.content || tasks.content.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No tasks found</td>
              </tr>
            ) : (
                tasks?.content?.map((task) => (
                <tr key={task.id}>
                  <td><input type="checkbox" /></td>
                  <td>{task.assignedTo || '-'}</td>
                  <td>{task.status}</td>
                  <td>{task.dueDate ? task.dueDate.split('T')[0] : '-'}</td>
                  <td>{task.priority}</td>
                  <td>{task.description}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(task)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(task)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination UI */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <div>
            <select className="form-select form-select-sm" style={{ width: '80px' }}>
              <option>20</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>
          <div>
            <button className="btn btn-sm btn-light me-1">First</button>
            <button className="btn btn-sm btn-light me-1">Prev</button>
            <span>1</span>
            <button className="btn btn-sm btn-light ms-1">Next</button>
            <button className="btn btn-sm btn-light ms-1">Last</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
