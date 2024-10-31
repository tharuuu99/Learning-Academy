import { useState } from "react";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Link } from "react-router-dom";
import GoogleLogin from "../../components/headers/Social/GoogleLogin";

const Login = () => {

const [showPassword, setShowPassword] = useState(false)
    
  return (
    <div className='max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8'>
      <h1 className='text-2xl font-bold text-center text-secondary sm:text-3xl'> Get Started Today</h1>
      <p className='max-w-md mx-auto mt-4 text-center text-gray-500'>Explore out comprehensive library of corses, meticulously created to cater to all levels of expertise</p>

     <div className='max-w-lg p-4 mx-auto mt-6 mb-0 rounded-lg shadow-lg sm:p-6 lg:p-8'>
        <form className='space-y-4'>
            <p className='text-lg font-medium text-center text-red-400'>Sign in to your account</p>
            <div>
                <label htmlFor="email" className='sr-only'>Email</label>
                <div className='relative'>
                    <input type="email" name='email' placeholder='Enter email' className='w-full p-4 text-sm border rounded-lg shadow-sm outline-none-gray-200 pe-12'/>
                    <span className="absolute inset-y-0 grid px-4 place-content-center end-0"><MdOutlineAlternateEmail className="w-4 h-4 text-gray-400"/></span>
                </div>
            </div>

            {/* password */}

            <div>
                <label htmlFor="password" className='sr-only'>Password</label>
                <div className='relative'>
                    <input type={showPassword ? 'text' : 'password'} name='email' placeholder='Enter password' className='w-full p-4 text-sm border rounded-lg shadow-sm outline-none-gray-200 pe-12'/>
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 grid px-4 place-content-center end-0"><MdOutlineRemoveRedEye className="w-4 h-4 text-gray-400"/></span>
                </div>
            </div>

            <button type='submit' className="block w-full px-5 py-3 text-sm font-medium text-white rounded-lg bg-secondary ">Sign in</button>
            <p className="text-sm text-center text-gray-500">No account? <Link className='underline' to="register">Sign up</Link></p>
        </form>
        <GoogleLogin/>
        
     </div>
      
    </div>
  )
}

export default Login
