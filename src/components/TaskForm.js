import React, { useState, useEffect } from 'react';

function TaskForm({ onSave, onCancel, taskToEdit }) {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('not started');
  const [priority, setPriority] = useState('normal');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setAssignedTo(taskToEdit.assignedTo || '');
      setDescription(taskToEdit.description || '');
      setDueDate(taskToEdit.dueDate?.split('T')[0] || '');
      setStatus(taskToEdit.status || 'not started');
      setPriority(taskToEdit.priority || 'normal');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, assignedTo, description, dueDate, status, priority });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Assigned To <span className="text-danger">*</span></label>
          <select className="form-select" value={assignedTo} onChange={e => setAssignedTo(e.target.value)} required>
            <option value="">-- Select User --</option>
            <option>User 1</option>
            <option>User 2</option>
            <option>User 3</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Status <span className="text-danger">*</span></label>
          <select className="form-select" value={status} onChange={e => setStatus(e.target.value)}>
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Due Date</label>
          <input className="form-control" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Priority <span className="text-danger">*</span></label>
          <select className="form-select" value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="low">Low</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea className="form-control" rows="3" value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div className="modal-footer">
        
      <button type="button" className="btn btn-warning" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-secondary">Save</button>
      </div>
    </form>
  );
}

export default TaskForm;
