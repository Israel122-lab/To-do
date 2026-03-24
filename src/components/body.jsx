function body() {
    return(
        <div className="ml-10 mt-12 grid grid-cols-2 gap-30">
            <div>
                <h1 className="text-4xl lg:text-[62px] w-200 font-extrabold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-orange-500">Let’s Build <br /> Something amazing <br /> with GPT-3 OpenAI</h1>
                <p className="mt-2 text-blue-300">Yet, using GPT-3 OpenAI makes tasks easier and faster. From generating ideas to answering questions, it provides guidance, support, and inspiration instantly. Every interaction helps you learn, create, and explore in a smarter, more efficient way</p>
        
                
                    <input 
                        type="email"
                        placeholder="Enter your email" 
                        className="mt-4 bg-blue-950 text-white  flex-1 rounded-l-lg py-3 h-16 px-4 w-115"
                    />

                    <button className="bg-orange-700 -ml-2 px-8 py-2 p-4 h-16 rounded-r-lg text-white cursor-pointer hover:bg-amber-800 hover:text-gray-100">Get Started</button>
               

                <img src="/Signup.png" alt="" className="mt-4 w-90 h-5"/>

            </div>

            <img src="/header-illustration.png" alt="Header illustration" className="ml-10 w-116 mt[-23px] h-116 object-fill"/>
        </div>
    )
}

export default body