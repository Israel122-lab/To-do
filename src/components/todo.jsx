import { useState, useEffect } from 'react';
import { MdDeleteForever, MdOutlineClearAll } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import confetti from 'canvas-confetti';
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from 'react-icons/fa';
import { Analytics } from "@vercel/analytics/react"

function TodoApp() {
  // --- 1. PERSISTENT STATES (Load from LocalStorage) ---
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("my_todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [remindersEnabled, setRemindersEnabled] = useState(() => {
    const saved = localStorage.getItem("reminders_active");
    return saved === "true";
  });

  const [reminderTime, setReminderTime] = useState(() => {
    const saved = localStorage.getItem("reminder_interval");
    return saved ? parseFloat(saved) : 120;
  });

  // --- 2. UI & EDIT STATES ---
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // --- 3. CALCULATIONS (Progress Bar) ---
  const totalTasks = todos.length;
  const completedTasks = todos.filter(t => t.isCompleted).length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  // --- 4. PERSISTENCE EFFECTS (Save to LocalStorage) ---
  useEffect(() => { 
    localStorage.setItem("my_todos", JSON.stringify(todos)); 
  }, [todos]);

  useEffect(() => { 
    localStorage.setItem("reminders_active", remindersEnabled); 
  }, [remindersEnabled]);

  useEffect(() => { 
    localStorage.setItem("reminder_interval", reminderTime); 
  }, [reminderTime]);

  // --- 5. CONFETTI TRIGGER ---
  useEffect(() => {
    if (progressPercentage === 100 && totalTasks > 0) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#10b981', '#f59e0b']
      });
    }
  }, [progressPercentage, totalTasks]);

  // --- 6. TALK TO THE BACKGROUND SERVICE WORKER ---
useEffect(() => {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    // If reminders are ON and tasks aren't finished...
    if (remindersEnabled && totalTasks > completedTasks) {
      console.log("Sending START_REMINDER to Worker");
      navigator.serviceWorker.controller.postMessage({
        type: 'START_REMINDER',
        interval: reminderTime
      });
    } else {
      // Otherwise, kill the timer
      console.log("Sending STOP_REMINDER to Worker");
      navigator.serviceWorker.controller.postMessage({ type: 'STOP_REMINDER' });
    }
  }
}, [remindersEnabled, reminderTime, totalTasks, completedTasks]);

  // --- 7. ACTION HANDLERS ---
  const handleToggleReminders = () => {
    if (!remindersEnabled) {
      Notification.requestPermission().then(res => { 
        if (res === "granted") setRemindersEnabled(true); 
        else alert("Please enable notifications in your browser settings.");
      });
    } else { 
      setRemindersEnabled(false); 
    }
  };

  const addTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: inputValue, isCompleted: false }]);
      setInputValue("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Delete all tasks?")) {
      setTodos([]);
    }
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  const startEdit = (id) => {
    const todo = todos.find(t => t.id === id);
    setEditingId(id);
    setEditValue(todo.text);
  };

  const saveEdit = () => {
    setTodos(todos.map(todo => 
      todo.id === editingId ? { ...todo, text: editValue } : todo
    ));
    setEditingId(null);
    setEditValue("");
  };

  const today = new Date().toLocaleDateString('en-CA');

  return (
    <div className='min-h-screen bg-gray-50 p-4 font-sans text-gray-900'>

      <Analytics />
      <h1 className='text-center text-5xl md:text-8xl font-black tracking-tighter mt-10 mb-4'>
        To-do List
      </h1>

      <div className='max-w-xl mx-auto my-10 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden'>
        
        {/* PROGRESS BAR */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-100">
          <div 
            className="h-full bg-blue-500 transition-all duration-700 ease-in-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-end mb-6 pt-2">
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>My Tasks</h2>
            <p className='text-[10px] font-black text-gray-400 uppercase tracking-widest'>Date: {today}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-black text-blue-600">{progressPercentage}%</span>
          </div>
        </div>

        {/* SETTINGS PANEL */}
        <div className="my-6 p-4 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-md ${remindersEnabled ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'}`}>
              Reminders {remindersEnabled ? "ON" : "OFF"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={remindersEnabled} 
                onChange={handleToggleReminders} 
              />
              <div className="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[10px] font-black text-gray-500 uppercase">Notify Every:</label>
            <select 
              value={reminderTime} 
              onChange={(e) => setReminderTime(Number(e.target.value))} 
              className="text-xs font-bold p-1 rounded border outline-none bg-white cursor-pointer"
            >
              <option value="0.16">10 Secs (Test)</option>
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 Hour</option>
              <option value="120">2 Hours</option>
              <option value="180">3 Hours</option>
              <option value="240">4 Hours</option>
              <option value="300">5 Hours</option>
              <option value="360">6 Hours</option>
              <option value="420">7 Hours</option>
              <option value="480">8 Hours</option>
              <option value="540">9 Hours</option>
              <option value="600">10 Hours</option>
              <option value="660">11 Hours</option>
              <option value="720">12 Hours</option>
              <option value="1440">24 Hours</option>
            </select>
          </div>
        </div>

        {/* INPUT FIELD */}
        <div className='flex gap-2 mb-8'>
          <input 
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            placeholder="What's the plan?" 
            className='border-2 border-gray-100 bg-gray-50 rounded-xl w-full px-4 py-3 outline-none focus:border-blue-500 transition-all font-medium' 
            onKeyDown={(e) => e.key === 'Enter' && addTodo()} 
          />
          <button 
            onClick={addTodo} 
            className='bg-blue-600 rounded-xl text-white px-6 font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 active:scale-95 transition-all cursor-pointer'
          >
            ADD
          </button>
        </div>

        {/* TASK LIST */}
        <ul className="space-y-3">
          {todos.map(todo => (
            <li key={todo.id} className='flex justify-between items-center bg-white p-2 rounded-xl border border-transparent hover:border-gray-50 transition-colors'>
              <div className='flex gap-4 items-center flex-1'>
                <input 
                  type="checkbox" 
                  className='w-5 h-5 cursor-pointer accent-blue-600' 
                  checked={todo.isCompleted} 
                  onChange={() => toggleComplete(todo.id)} 
                />
                {editingId === todo.id ? (
                  <input 
                    value={editValue} 
                    onChange={(e) => setEditValue(e.target.value)} 
                    className='border-b-2 border-blue-500 flex-1 outline-none text-lg font-medium' 
                    autoFocus 
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()} 
                  />
                ) : (
                  <span className={`text-lg font-medium transition-all ${todo.isCompleted ? 'line-through text-gray-300' : 'text-gray-700'}`}>
                    {todo.text}
                  </span>
                )}
              </div>
              
              <div className='flex items-center gap-3 ml-4'>
                {editingId === todo.id ? (
                  <button 
                    onClick={saveEdit} 
                    className='text-blue-600 font-black text-xs px-2 cursor-pointer hover:bg-blue-50 py-1 rounded'
                  >
                    SAVE
                  </button>
                ) : (
                  <FaEdit 
                    onClick={() => startEdit(todo.id)} 
                    className='text-green-600 size-5 cursor-pointer hover:scale-110 transition-transform' 
                  />
                )}
                <MdDeleteForever 
                  onClick={() => deleteTodo(todo.id)} 
                  className='text-red-600 size-6 cursor-pointer hover:scale-110 transition-transform'
                />
              </div>
            </li>
          ))}
        </ul>

        {/* CLEAR ALL BUTTON */}
        {totalTasks > 0 ? (
          <button 
            onClick={clearAll} 
            className="mt-8 w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase text-red-400 hover:text-red-600 transition-colors cursor-pointer tracking-widest border-t border-gray-50 pt-4"
          >
            <MdOutlineClearAll size={18} /> Clear All Tasks
          </button>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-300 font-bold uppercase tracking-widest text-xs italic">Your list is empty</p>
          </div>
        )}
      </div>

      <footer className="mt-auto text-center text-[10px] font-black text-gray-400 pb-10 uppercase tracking-widest">
        Made by <a href="" target="_blank" rel="noopener noreferrer" className='text-blue-400 hover:underline'>Israel Olajide</a>

        <div className="flex justify-center items-center gap-6">
          <a 
            href="https://github.com/Israel122-lab" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-900 transition-all transform hover:scale-110"
            title="GitHub"
          >
            <FaGithub size={18} />
          </a>

          <a 
            href="https://linkedin.com/in/israel-olajide-77b97036a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-all transform hover:scale-110"
            title="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>

          <a 
          href="https://wa.me/2348166198180?text=Hi%20Israel!%20I%27m%20reaching%20out%20from%20your%20To-do%20List%20app..." // Replace with your number in international format
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#25D366] transition-all transform hover:scale-110"
          title="Chat on WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>

          <a 
            href="mailto:israelolajide51@gmail.com" 
            className="text-gray-400 hover:text-red-500 transition-all transform hover:scale-110"
            title="Email Me"
          >
            <MdEmail size={20} />
          </a>

        </div>
      </footer>
    </div>
  );
}

export default TodoApp;
