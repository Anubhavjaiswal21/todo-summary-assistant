/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, SendHorizonal, Edit2, Check, X } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const backendUrl = 'http://localhost:4000';

  useEffect(() => {
    fetch(`${backendUrl}/todos`)
      .then(res => res.json())
      .then(setTodos)
      .catch(err => {
        console.error(err);
        setMessage('❌ Failed to load todos');
      });
  }, []);

  const addTodo = async () => {
    if (!input.trim()) return;
    try {
      const res = await fetch(`${backendUrl}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input.trim() }),
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setInput('');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add todo');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${backendUrl}/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to delete todo');
    }
  };

  const summarizeAndSend = async () => {
    setMessage('');
    try {
      const res = await fetch(`${backendUrl}/summarize`, {
        method: 'POST',
      });
      const result = await res.json();
      if (result.success) {
        setMessage('Summary sent to Slack! ✅ ');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(`⚠️ Failed: ${result.message || result.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`❌ Error while summarizing: ${err.message}`);
    }
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditText(currentText);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
  };

  const saveEdit = async (id) => {
    if (!editText.trim()) {
      setMessage('❌ Todo text cannot be empty');
      return;
    }
    try {
      const res = await fetch(`${backendUrl}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: editText.trim() }),
      });
      if (!res.ok) throw new Error('Failed to update todo');
      const updatedTodo = await res.json();
      setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      setEditingId(null);
      setEditText('');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to update todo');
    }
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200 p-6 pt-10">

      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">

        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">📝 Todo Summary Assistant</h1>
        <p className="text-center italic font-bold text-blue-600 mb-6">Small steps every day lead to big changes</p>

        <div className="flex mb-4 gap-2">
          <input
            type="text"
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            onClick={addTodo}
          >
            Add Task
          </button>
        </div>

        <ul className="space-y-2 mb-4">
          <AnimatePresence>
            {todos.map(todo => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
                className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg border shadow-sm"
              >
                {editingId === todo.id ? (
                  <input
                    autoFocus
                    type="text"
                    className="flex-1 px-2 py-1 border border-purple-500 rounded text-gray-900"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, todo.id)}
                    onBlur={() => saveEdit(todo.id)}
                  />
                ) : (
                  <span className="text-gray-800">{todo.text}</span>
                )}

                <div className="flex gap-3 items-center">
                  {editingId === todo.id ? (
                    <>
                      <button
                        onClick={() => saveEdit(todo.id)}
                        className="text-green-600 hover:text-green-800"
                        title="Save"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-gray-600 hover:text-gray-900"
                        title="Cancel"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(todo.id, todo.text)}
                        className="text-blue-600 hover:text-blue-800 transition"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </>
                  )}
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full flex justify-center items-center gap-2"
          onClick={summarizeAndSend}
        >
          <SendHorizonal size={18} />
          Summarize Tasks
        </button>

        {message && (
          <div className="mt-4 text-center text-md text-gray-700 whitespace-pre-wrap">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
