import { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function TodoApp() {
  // 1. State for todos - initialized from localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("my_todos");
    return saved ? JSON.parse(saved) : [];
  });

  // 2. State for reminder toggle - initialized from localStorage
  const [remindersEnabled, setRemindersEnabled] = useState(() => {
    const saved = localStorage.getItem("reminders_active");
    return saved === "true";
  });

  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // EFFECT: Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("my_todos", JSON.stringify(todos));
  }, [todos]);

  // EFFECT: Save reminder preference
  useEffect(() => {
    localStorage.setItem("reminders_active", remindersEnabled);
  }, [remindersEnabled]);

  // EFFECT: Notification Logic (Checks every 10 minutes)
  useEffect(() => {
    if (!remindersEnabled) return;

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }

    const reminderInterval = setInterval(() => {
      const incompleteTasks = todos.filter(todo => !todo.isCompleted);
      
      if (incompleteTasks.length > 0 && Notification.permission === "granted") {
        new Notification("To-do Reminder", {
          body: `You still have ${incompleteTasks.length} tasks to finish!`,
          icon: "https://cdn-icons-png.flaticon.com"
        });
      }
    }, 120 * 60 * 1000); // 10 minutes

    return () => clearInterval(reminderInterval);
  }, [todos, remindersEnabled]);

  const deleteTodo = (id) => {
    const updated = todos.filter(todo => todo.id !== id);
    setTodos(updated);
  };

  const toggleComplete = (id) => {
    const updated = todos.map(todo => {
      if(todo.id === id) return {...todo, isCompleted: !todo.isCompleted};
      return todo;
    });
    setTodos(updated);
  };

  const startEdit = (id) => {
    const todo = todos.find(t => t.id === id);
    setEditingId(id);
    setEditValue(todo.text);
  };

  const saveEdit = () => {
    const updated = todos.map(todo => {
      if(todo.id === editingId) return {...todo, text: editValue};
      return todo;
    });
    setTodos(updated);
    setEditingId(null);
    setEditValue("");
  };

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = { id: Date.now(), text: inputValue, isCompleted: false };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const today = new Date().toLocaleDateString('en-CA');

  return (
    <div className='group'>
      <h1 className='text-center font-[cursive] text-9xl transition-all duration-1000 underline decoration-transparent decoration-wavy underline-offset-10 hover:decoration-black'>
        To-do List
      </h1>

      <div className='m-20 bg-white p-10 rounded-2xl flex-2'>
        <h1 className='font-[cursive]'>Awesome Todo List</h1>
        <p className='font-[cursive]'>Date: {today}</p>

        {/* Reminder Toggle UI */}
        <div className="flex items-center justify-end gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
          <span className="font-[cursive] text-sm text-gray-600">
            {remindersEnabled ? "Reminders ON" : "Reminders OFF"}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={remindersEnabled}
              onChange={() => setRemindersEnabled(!remindersEnabled)} 
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className='flex gap-2 mb-4'>
          <input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Add a task..."
            className='border-2 border-gray-300 rounded-md w-full pl-2'
          />
          <button onClick={addTodo} className='bg-blue-700 rounded-2xl text-white p-2 sm:p-6 cursor-pointer'>Add</button>
        </div>

        <ul>
          {todos.map(todo => (
            <li key={todo.id} className='flex justify-between mb-2'>
              <div className='flex gap-2 items-center'>
                <input type="checkbox" className='cursor-pointer' id={todo.id} checked={todo.isCompleted} onChange={() => toggleComplete(todo.id)} />
                {editingId === todo.id ? (
                  <input 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    className='border-2 border-gray-300 rounded-md pl-2 flex-1'
                  />
                ) : (
                  <label htmlFor={todo.id} className={`font-[cursive] ${todo.isCompleted ? 'line-through opacity-50' : ''}`}>{todo.text}</label>
                )}
              </div>
              <div className='flex items-center'>
                {editingId === todo.id ? (
                  <button onClick={saveEdit} className='text-green-600 cursor-pointer mr-2'>Save</button>
                ) : (
                  <FaEdit onClick={() => startEdit(todo.id)} className='text-green-600 size-7 cursor-pointer mr-2' />
                )}
                <MdDeleteForever onClick={() => deleteTodo(todo.id)} className='text-red-600 size-7 cursor-pointer'/>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <footer>
        <p className='text-center font-[cursive] text-2xl text-gray-500'>
          Made by <a href="https://github.com/Israel122-lab" target="_blank" rel="noopener noreferrer" className='text-gray-600 hover:underline'>Israel Olajide</a>
        </p>
      </footer>
    </div>
  );
}

export default TodoApp;
