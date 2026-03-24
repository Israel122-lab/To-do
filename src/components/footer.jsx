function footer(){
    return(
        <div className="bg-linear-to-r from-[#0F172a] to-[#1e3a8a] px-4 sm:px-8 py-16 mt-20 mb-20 ml-3 mr-10 p-10 flex flex-col items-center justify-center">
            <h1 className="text-5xl text-center h-30 w-300 font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-orange-500">
                Do you want to step in to the <br />
                future before others
            </h1>
            <button className=" text-white border-2 border-white hover:bg-white hover:text-black cursor-pointer py-2 px-4">
                Request Early Access
            </button>
        </div>
        
    )
}

export default footer;