import React from 'react'



const Navbar = () => {

    const navLinks = [
        {name: 'Home', route:'/'},
        {name: 'Instructors', route:'/instructors'},
        {name: 'Classes', route:'/classes'},
    ]
  return (
   <nav>
    <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
        <div className='flex items-center justify-center px-4 py-4'>
            {/* logo */}
            <div>
                <h1 className='items-center inline gap-3 font-bold text-2xl-flex '>
                    Learning Academy 
                    <img src="/learning-logo.png" alt="" className='w-8 h-8'/>
                    <p className='font-bold text-[13px] tracking-[8px]'>Quick Explore</p>
                </h1>
            </div>
        </div>
    </div>
   </nav>
  )
}

export default Navbar
