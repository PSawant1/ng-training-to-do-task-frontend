import React, { useState, useEffect } from 'react';
import Pagination from '../components/Pagination';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    fetchTodos();
  }, [currentPage, pageSize]);

  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `/api/todos?page=${currentPage}&limit=${pageSize}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setTodos(data.todos || []); // Ensure fallback to empty array
      setTotalRecords(data.totalRecords || 0); // Ensure fallback to 0
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]); // Reset todos on error
      setTotalRecords(0); // Reset total records on error
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        onPageChange={(page) => {
          setCurrentPage(page);
        }}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1); // Reset to first page on page size change
        }}
      />
    </div>
  );
};

export default TodoList;
