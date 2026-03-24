function blog(){
    return(
        <div>
            <div className="bg-[#000e1b] mt-20 mb-20 ml-3 mr-10 p-10 rounded-2xl flex items-center justify-center">
                <h1 className="text-4xl h-30 w-300 font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-600 to-orange-500">
                    A lot is happening,<br />
                    We are blogging about it.
                </h1>
            </div>


            <div className="grid grid-cols-3 ml-15 -mt-15 mr-20 gap-10">

                <div className="bg-[#042c54] h-144 rounded-tl-2xl w-95">
                    <img src="/First.png" alt=""  className="w-105 h-40 object-cover rounded-tl-2xl"/>
                    <div className="p-4 text-white">
                        <p className="text-xs text-gray-300">Sep 26, 2021 <br /></p>
                        <h1 className="mb-2 text-sm font-medium mt-1"> GPT-3 and Open AI is the future. Let us explore how it is?  </h1>
                        <span className="text-xs underline hover:underline-offset-3 cursor-pointer ">Read Full Article</span> 
                    </div>
             
                </div>
            
                <div>

                    <div className="bg-[#042c54] h-70 w-95 mb-4">
                        <img src="/Second.png" alt="" className="w-105 h-40 object-cover rounded-tl-2xl"/>
                        <div className="p-4 text-white">
                            <p className="text-xs text-gray-300">Sep 26, 2021 <br /></p>        
                            <h1 className="mb-2 text-sm font-medium mt-1"> GPT-3 and Open AI is the future. Let us explore how it is?  </h1>
                            <span className="text-xs underline hover:underline-offset-3 cursor-pointer ">Read Full Article</span> 
                        </div>
                    </div>

                    <div className="bg-[#042c54] h-70 w-95">
                        <img src="/Third.png" alt="" className="w-105 h-40 object-cover rounded-tl-2xl"/>
                        <div className="p-4 text-white">
                            <p className="text-xs text-gray-300">Sep 26, 2021 <br /></p>        
                            <h1 className="mb-2 text-sm font-medium mt-1"> GPT-3 and Open AI is the future. Let us explore how it is?  </h1>
                            <span className="text-xs underline hover:underline-offset-3 cursor-pointer ">Read Full Article</span> 
                        </div>
                    </div>
                    
                </div>

                <div>

                    <div className="bg-[#042c54] h-70 w-95 mb-4">
                        <img src="/Fourth.png" alt="" className="w-105 h-40 object-cover rounded-tl-2xl"/>
                        <div className="p-4 text-white">
                            <p className="text-xs text-gray-300">Sep 26, 2021 <br /></p>        
                            <h1 className="mb-2 text-sm font-medium mt-1"> GPT-3 and Open AI is the future. Let us explore how it is?  </h1>
                            <span className="text-xs underline hover:underline-offset-3 cursor-pointer ">Read Full Article</span> 
                        </div>
                    </div>

                    <div className="bg-[#042c54] h-70 w-95">
                        <img src="/Second.png" alt="" className="w-105 h-40 object-cover rounded-tl-2xl"/>
                        <div className="p-4 text-white">
                            <p className="text-xs text-gray-300">Sep 26, 2021 <br /></p>        
                            <h1 className="mb-2 text-sm font-medium mt-1"> GPT-3 and Open AI is the future. Let us explore how it is?  </h1>
                            <span className="text-xs underline hover:underline-offset-3 cursor-pointer ">Read Full Article</span> 
                        </div>
                    </div>
                    
                </div>
                
            </div>
        
        </div>

    
    )
}

export default blog