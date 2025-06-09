/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TodoList from '../pages/TodoList';
import '@testing-library/jest-dom';

describe('TodoList Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            todos: [
              { id: 1, title: 'Test Todo 1' },
              { id: 2, title: 'Test Todo 2' },
            ],
            totalRecords: 2,
          }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders TodoList component', async () => {
    render(<TodoList />);

    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Test Todo 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Todo 2/i)).toBeInTheDocument();
    });
  });

  test('handles fetch error gracefully', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Failed to fetch data'))
    );

    render(<TodoList />);

    await waitFor(() => {
      expect(screen.queryByText(/Test Todo 1/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Test Todo 2/i)).not.toBeInTheDocument();
    });
  });
});