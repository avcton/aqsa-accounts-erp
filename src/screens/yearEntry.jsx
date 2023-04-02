export default function YearEntry() {
  return (
      <div className="  flex flex-col items-center mt-15 justify-center overflow-auto h-screen w-screen bg-slate-50">
          <h3 className=" text-black text-3xl font-bold mt-10 mb-6 ">Year Entry</h3>
          <form className="justify-center rounded-xl" onSubmit={null}>
              <div className="flex md:flex-row flex-col -mx-1">
                  <div className="w-full px-3 py-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                          Year Name
                      </label>
                      <input className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                          leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="text" placeholder="Description" />
                  </div>
              </div>

              <div className="flex flex-col md:flex-row -mx-1">
                  <div className="w-full px-3 py-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                          Year Duration
                      </label>
                      <input className="appearance-textfield block w-full bg-gray-100 text-black border border-gray-300 rounded-lg py-4 px-4 mb-3 
                          leading-tight focus:outline-none focus:bg-gray-50 focus:border-gray-500" id="grid-card-number" type="number" min={2000} max={3000} placeholder={2023}/>
                  </div>
              </div>

              <div className="flex justify-center px-4 py-4">
                  <button className='px-4 py-2 bg-orange-400 font-semibold text-white rounded-lg'>Insert Year</button>
              </div>
          </form>
      </div>
  )
}