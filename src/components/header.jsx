
function Header (){

    return(
     <body className="bg-[#000e1b] justify-between">


        <div className= "flex flex-row">

            <img src="/GPT-3.png" alt="GPT-3 Logo" className="w-30 mt-15 ml-12 h-10"/>
            

            <nav className="flex gap-6 mt-16 ml-60 text-white text-lg">

                <p className="hover:text-gray-300 cursor-pointer">Home</p>
                <p className="hover:text-gray-300 cursor-pointer">What is GPT</p>
                <p className="hover:text-gray-300 cursor-pointer">Open AI</p>
                <p className="hover:text-gray-300 cursor-pointer">Case Studies</p>
                <p className="hover:text-gray-300 cursor-pointer">Library</p>


                <div className="flex gap-4 ml-50 -mt-3">
                    <button className="text-white hover:text-gray-300 cursor-pointer">Signin</button>
                    <button className="bg-orange-500 w-30 p-4 rounded-md cursor-pointer hover:bg-amber-800 hover:text-gray-100">SignUp</button>
                </div>
    
            </nav>


        </div>
    </body>
    )
}

export default Header