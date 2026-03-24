function getstarted(){
    return(
        <div className="bg-linear-to-r from-pink-500 rounded-2xl to-orange-400 grid grid-cols-2 gap-200 h-30 mb-10 w-300 ml-20 mt-20 p-5 pl-8 pt-7">
           <div>
                 <h1 className="w-300  text-black">Request Early Access to Get Started</h1>
                 <h1 className="text-2xl font-semibold w-200 text-black">Register today & start exploring the endless possibilities.</h1>

           </div>
              <div className="bg-black w-40 rounded-4xl  tet-white h-15  flex items-center justify-center cursor-pointer hover:bg-gray-800">
                  <button className=" text-white cursor-pointer">
                 Get Started
                </button>
              </div>
         
        </div>
    )
}

export default getstarted