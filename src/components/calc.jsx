import { useState } from "react";

const [show, setShow] = useState();
  const [inputv, setInputv] = useState("");
  const [inputs, setInputs] = useState("");

  return (
    
   
    <div className='text-center '>
      <h1 className='text-3xl font-bold mb-4'>Mini - Calculator</h1>

      <div className='flex text-center justify-center gap-2'>
        <div className='mt-3'>
          <input
          type="number" 
          placeholder="value 1..."
          className='border border-gray-400 p-3 rounded-2xl mr-2 cursor-pointer' 
          value={inputv} 
          onChange={(e) => setInputv(e.target.value)}
          />

          <input
          type="number" 
          placeholder="value 2..."
          className='border border-gray-400 p-3 rounded-2xl cursor-pointer' 
          value={inputs} 
          onChange={(e) => setInputs(e.target.value)}
          />
        </div>
        <div className=''>

          <button onClick={() => setShow(inputv * inputs)} className='bg-black  mr-2 p-6 cursor-pointer text-white rounded-2xl'>
            *
          </button>

          <button onClick={() => setShow(Number(inputv) / Number(inputs))} className='bg-black mr-2 p-6 cursor-pointer text-white rounded-2xl'>
            /
          </button>

          <button onClick={() => setShow(Number(inputv) - Number(inputs))} className='bg-black mr-2 p-6 cursor-pointer text-white rounded-2xl'>
            -
          </button>

          <button onClick={() => setShow(Number(inputv) + Number(inputs))} className='bg-black p-6 cursor-pointer text-white rounded-2xl'>
            +
          </button>

        </div>

      </div>
     

      {show !== null && (
        <p className={`font-bold text-lg mt-4`}> Answer is : {show}</p>
      ) }
      

    </div>
  );