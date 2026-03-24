import { useState } from 'react';

export default function App() {
  // ← This is the magic line
  const [count, setCount] = useState(0);   // initial value = 0
  const [show, setShow] = useState(false);

  function handleClick() {
    setCount(count + 1);     // updates + triggers re-render
  }

  function reduce(){
    setCount(count - 1);
  }
  

  return (
    <div className='text-center '>
      <h1 className='text-3xl font-bold mb-4'>React useState Counter</h1>

      <p className='border-2 ml-90 mr-90 mb-5 '>
        {count}
      </p>

      <button onClick={handleClick} className='bg-black rounded-2xl text-white p-4 cursor-pointer'>
        this increases by 1
      </button>

      <button onClick={reduce} className='bg-red-500 rounded-2xl text-white p-4 cursor-pointer'>
        this reduces by 1
      </button>

      <button onClick={() => setShow(!show)} className='bg-blue-500 p-4 cursor-pointer text-white rounded-2xl'>
        {show ? 'Hide' : 'Show'} message
      </button>

      {show && <p className='text-green-500'>Hello, I am a toggled message!</p>}

    </div>
  );
}