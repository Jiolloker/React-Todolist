import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Initialize state directly from localStorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [input, setInput] = useState("");

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  // // Load todos from Local Storage on component mount
  // useEffect(() => {
  //   const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  //   setTodos(savedTodos);
  // }, []);

  // // Save todos to Local Storage whenever they change
  // useEffect(() => {
  //   console.log('Saving todos:', todos); // Debugging
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4 md:p-8">
        {/* Added responsive padding: p-4 for small screens, md:p-8 for medium and larger screens */}
        <div className="bg-white p-6 rounded-3xl shadow-lg max-w-[600px] w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 text-center">
            Todo List - With <span className="text-sky-500/70 font-bold">React</span>
          </h1>
          <div className="flex mb-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a task..."
            />
            <button
              onClick={addTodo}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center p-3 rounded-lg bg-slate-100 border border-gray-200"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() =>
                    setTodos(
                      todos.map((t) =>
                        t.id === todo.id ? { ...t, completed: !t.completed } : t
                      )
                    )
                  }
                  className="mr-2 h-5 w-5 text-blue-600"
                />
                <span
                  className={`flex-grow break-words overflow-x-hidden ${
                    todo.completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => setTodos(todos.filter((t) => t.id !== todo.id))}
                  className="ml-2 bg-red-500 border-none p-2 text-white rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;