import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const GoogleLogin = () => {
    const {googleLogin} = useAuth();
    const navigate = useNavigate()
    const handleLogin = ()=> {
        console.log("google Login")
        googleLogin().then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            if(user){
                const userImp = {
                    name:user?.displayName,
                    email:user?.email,
                    photoURL:user?.photoURL,
                    role: 'user',
                    gender:"It is not specified",
                    address:"It is not Provided",
                    phone:"It is not Provided",
                };

                if(user.email && user.displayName){
                    return axios.post('http://localhost:5000/new-user',userImp).then(()=>{
                        navigate('/');
                        return "Registration successfull";
                    }).catch((err)=>{
                        throw new Error(err);
                    });
                }
            }
            
        })
    }
  return (
    <div className="flex items-center justify-center my-3">
      <button onClick={()=> handleLogin()} className="flex items-center px-6 py-4 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg shadow outline-none hover:bg-gray-200 focus:outline-none">
      <FcGoogle  className="w-6 h-6 mr-2"/>
        <span>Continue with Google</span>
      </button>
    </div>
  )
}

export default GoogleLogin;
