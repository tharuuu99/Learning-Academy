import { useContext, useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import { Transition } from '@headlessui/react'
import {Link} from "react-router-dom"
import useUser from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from 'react-toastify'; 



const Classes = () => {
    const [classes,setClasses] = useState([]);
    const {currentUser} = useUser();
    //console.log(currentUser)
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [hoveredCard, setHoveredCard] = useState([null]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    

    const handleHover = (index) => {
      setHoveredCard(index);
    };
    useEffect(()=>{
      axiosFetch.get('/classes').then(res=>setClasses(res.data)).catch(err=>console.log(err))
    },[]);

    //handle add to cart
    const handleSelect = (id) =>{
      //console.log(id)
      axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
      .then(res =>setEnrolledClasses(res.data)).catch(err => console.log(err))


      if(!currentUser){
        return toast.error("Please Login First!")
      }

      axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
      .then(res =>{
        if(res.data.classId === id){
          return toast.error("already Selected!")
        }else if(enrolledClasses.find(item => item.classes._id === id)){
          return toast.error("Already Enrolled!")
        }else{
          const data = {
            classId:id,
            userMail: currentUser.email,
            data: new Date()
          }

          toast.promise(axiosSecure.post('/add-to-cart',data))
          .then(res=>{
            console.log(res.data)
          }),{
            pending: 'Selecting...',
            success: {
              render({data}){
                return "Selected Successfully!"
              }
            },
            error: {
              render({data}){
                //When the promise reject, data will contains the error
                return `Error: ${data.message}`
              }
            }
          }
        }
      })
    }

    

    //console.log(classes);
  return (
    <div>
      <div className="pt-3 mt-20">
        <h1 className="text-4xl font-bold text-center text-secondary">Classes</h1>
      </div>
      <div className="my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
        {
          classes.map((cls, index)=>(
            <div 
            onMouseLeave={()=> handleHover(null)}
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64  mx-auto ${cls.availabeSeats < 1 ? 'bg-red-300' : 'bg-white'} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={()=>handleHover(index)}
            >
              <div className="relative h-48">
                {/* dynamic classname thats why curly brackets and self closing tags */}
                <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? "opacity-60" : ""}`}/>
                <img src={cls.Image} alt="" className="object-cover w-full h-full"/>
                <Transition show={hoveredCard === index}>
                  <div className="transition duration-300 ease-in data-[closed]:opacity-0">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button onClick={() => handleSelect(cls._id)} title={role == 'admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select' ? cls.availableSeats < 1 : 'No Seat Available' : "You can select Classes"}
                      disabled={role === "admin" || role === 'instructor' || cls.availableSeats <1}
                      
                      className="px-4 py-2 text-white duration-300 rounded disabled:bg-red-300 bg-secondary hover:bg-red-700">Add to Cart</button>
                    </div>
                  </div>
                </Transition>
              </div>
              {/* details */}
              <div className="px-6 py-2">
                <h3 className="mb-1 font-semibold">{cls.name}</h3>
                <p className="text-xs text-gray-500 ">Instructor: {cls.instructorName}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-600 ">AvailableSeats: {cls.availableSeats}</span>
                  <span className="font-semibold text-green-500">${cls.price}</span>
                </div>
                <Link to={`class/${cls._id}`}><button className="w-full px-4 py-2 mx-auto mt-4 mb-2 text-white duration-300 rounded disabled:bg-red-300 bg-secondary hover:bg-red-700">View</button></Link>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Classes
