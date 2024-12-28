
import { FaLanguage, FaUser, FaUsers } from "react-icons/fa";
import { MdBookOnline } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import img from "../../assets/home/girl.jpg";


const SingleClass = () => {
  
  
   
  
    const course = useLoaderData();
    const instructor = useLoaderData();
    const { currentUser } = useUser();
    const role = currentUser?.role;
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    // console.log(course)
    console.log(currentUser)

    
    const handleSelect = async (id) => {
      if (!currentUser) {
          alert("Please login first");
          return navigate("/login");
      }
  
      try {
          // Fetch enrolled classes and ensure the state is updated
          const res = await axiosSecure.get(`/enrolled-classes/${currentUser?.email}`);
          const fetchedEnrolledClasses = res.data;
  
          // Check if already enrolled
          if (fetchedEnrolledClasses.find((item) => item.classes._id === id)) {
              return alert("Already enrolled");
          }
  
          // Check if already selected
          const cartRes = await axiosSecure.get(`/cart-item/${id}?email=${currentUser?.email}`);
          if (cartRes.data.classId === id) {
              return alert("Already selected");
          }
  
          // Add to cart if not already enrolled or selected
          const data = {
              classId: id,
              userMail: currentUser?.email,
              date: new Date(),
          };
          const addRes = await axiosSecure.post('/add-to-cart', data);
          alert("Successfully added to the cart!");
          console.log(addRes.data);
      } catch (err) {
          console.error(err);
      }
  };

    
  return (

    
    <>
      <div
        className=" font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto"
        data-new-gr-c-s-check-loaded="14.1157.0"
        data-gr-ext-installed=""
      >
        {/* breadcrumb or header */}
        <div className="py-20 mt-20 bg-center bg-no-repeat bg-cover breadcrumbs bg-slate-700 section-padding">
          <div className="container text-center">
            <h2 className="text-white">Course Details</h2>
          </div>
        </div>
        
        <div className="mt-8 nav-tab-wrapper tabs section-padding">
          <div className="container">
            <div className="grid grid-cols-12 md:gap-[30px]">
            <div className="col-span-12 lg:col-span-8">
                <div className="single-course-details">
                  <div className="xl:h-[470px] h-[350px] mb-10 course-main-thumb">
                    <img
                      src={course?.Image}
                      alt=""
                      className="block w-full h-full rounded-md object-fut"
                    />
                  </div>
                  <h2 className="mb-2 text-2xl">{course?.name}</h2>

                  

                  
                  
                </div>
              </div>

              {/* right side */}
              <div className="col-span-12 mt-8 lg:col-span-4 md:mt-0">
                <div className="sidebarWrapper space-y-[30px]">
                  <div className="space-y-5 wdiget custom-text ">
                    <a className="h-[220px]  rounded relative block" href="#">
                      <img
                         src={course.Image}
                        alt=""
                        className="block object-cover w-full h-full rounded "
                      />
                      <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                        <img src="/play.png" alt="" />
                      </div>
                    </a>
                    <h3>LKR {course.price}</h3>
                    <button onClick={() => handleSelect(course._id)} title={role === 'admin' || role === 'instructor' ? 'Instructor/Admin Can not be able to select ' ? course.availableSeats <1 : 'No seat avalible' : 'You can select this classes' } disabled={role === 'admin' || role === 'instructor' || course.availableSeats < 1}  className="w-full px-6 py-2 text-center text-white btn btn-primary bg-secondary ">
                      Enroll Now
                    </button>
                    <ul className="list ">
                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex items-center flex-1 space-x-3">
                          <FaUser className="inline-flex"/>
                          <div className="font-semibold text-black ">
                            Instructor
                          </div>
                        </div>
                        <div className="flex-none">{course.instructorName}</div>
                      </li>

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex items-center flex-1 space-x-3">
                          <MdBookOnline/>
                          <div className="font-semibold text-black ">
                            Lectures
                          </div>
                        </div>
                        <div className="flex-none">10</div>
                      </li>

                      

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex items-center flex-1 space-x-3">
                          <FaUsers />
                          <div className="font-semibold text-black ">
                            Enrolled
                          </div>
                        </div>
                        <div className="flex-none">{course.totalEnrolled}</div>
                      </li>

                     

                      <li className=" flex space-x-3 border-b border-[#ECECEC] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0">
                        <div className="flex items-center flex-1 space-x-3">
                          <FaLanguage />
                          <div className="font-semibold text-black ">
                            Language
                          </div>
                        </div>
                        <div className="flex-none">English</div>
                      </li>
                    </ul>
                    
                  </div>

                  
                </div>
              </div>
            </div>
            <div>
              <div className="items-center mt-6 space-y-5 author-meta sm:flex lg:space-x-16 sm:space-x-5 sm:space-y-0">
                    <div className="flex items-center space-x-4 group">
                      <div className="flex-none">
                        <div className="w-12 h-12 rounded">
                          
                        <img src={img} alt="" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className=" text-secondary">
                          Trainer
                          <a href="#" className="text-black dark:text-white">
                            : {course.instructorName}
                          </a>
                          
                        </p>
                        
                      </div>
                    </div>

                    <div>
                      <span className=" text-secondary">
                       Email
                        <a href="#" className="ml-1 text-black dark:text-white">
                        {course.instructorEmail}
                        </a>
                      </span>
                    </div>
                    
                    <div>
                      <span className=" text-secondary">
                        Last Update: 
                        <a href="#" className="ml-1 text-black dark:text-white">
                         {new Date(course.submitted).toLocaleDateString()}
                        </a>
                      </span>
                    </div>

                   
                  </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleClass;
