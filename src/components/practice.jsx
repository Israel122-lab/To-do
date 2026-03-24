import  { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function TodoApp() {

  // 1. State for the list of todos
  const [todos, setTodos] = useState([]);
  // 2. State for the current text in the input box
  const [inputValue, setInputValue] = useState("");
  // 3. State for editing mode
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const deleteTodo = (id) => {
    const updated = todos.filter(todo => todo.id !== id);
    setTodos(updated)
  }

  const toggleComplete = (id) => {
    const updated = todos.map(todo => {
      if(todo.id === id){
        return {...todo,isCompleted: !todo.isCompleted}
      }
      return todo;
    })
    setTodos(updated);
  };

  const startEdit = (id) => {
    const todo = todos.find(t => t.id === id);
    setEditingId(id);
    setEditValue(todo.text);
  };

  const saveEdit = () => {
    const updated = todos.map(todo => {
      if(todo.id === editingId){
        return {...todo, text: editValue}
      }
      return todo;
    })
    setTodos(updated);
    setEditingId(null);
    setEditValue("");
  };

   const today = new Date().toLocaleDateString('en-CA'); 

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = { id: Date.now(), text: inputValue, isCompleted: false };
      // We use the spread operator (...) to keep old todos and add the new one
      setTodos([...todos, newTodo]);
      setInputValue(""); // Clear the input after adding
    }
  };

  return (
    <div className='group'>
      <h1 className='text-center font-[cursive] text-9xl transition-all duration-1000 underline  decoration-transparent decoration-wavy underline-offset-10 hover:decoration-black'>
        To-do List
      </h1>
      

      <div className=' m-20 bg-white p-10 rounded-2xl flex-2 '>
      <h1 className='font-[cursive]'>Awesome Todo List</h1>
      
      <p className='font-[cursive]'>Date:{today}</p>

      <div className='flex gap-2 mb-4'>
            <input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="Add a task..."
            className='border-2 border-gray-300 rounded-md w-full pl-2'
            />
            <button onClick={addTodo} className='bg-blue-700 rounded-2xl text-white p-2 sm:p-6 cursor-pointer'>Add</button>
      </div>

      <ul >
        {todos.map(todo => (
          <li key={todo.id} className='flex justify-between'>
            <div className='flex gap-2'>
              <input type="checkbox" className='cursor-pointer' name="todo" id={todo.id} checked={todo.isCompleted} onChange={() => toggleComplete(todo.id)} />
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
            <div className='flex'>
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

      <p className='text-center font-[cursive] text-2xl text-gray-500'>Made by <a href="https://github.com/Israel122-lab" target="_blank" rel="noopener noreferrer" className='text-gray-600 hover:underline'>Israel Olajide</a></p>
    </footer>
    </div>
    
  );
}

export default TodoApp;