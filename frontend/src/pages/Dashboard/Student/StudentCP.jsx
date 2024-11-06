import { useUser } from "../../../hooks/useUser";
import WelcomeImg from "../../../assets/dashboard/WelcomeImg.jpg"
import { Link } from "react-router-dom";

const StudentCP = () => {
    const {currentUser} = useUser()
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div>
            <div>
                <img onContextMenu={e => e.preventDefault()} src={WelcomeImg} alt="" className="h-[200px] "placeholder="blur" />
            </div>
            <h1 className="text-3xl font-bold capitalize">Hi, <span className="items-stretch text-secondary">{currentUser?.name}!</span> Welcome to your dashboard</h1>
            <p className="py-2 text-base text-center ">Hey Dear, This is a simple dashboard home. Our developer is trying to updating Dashboard</p>
            
            <div className="text-center">
                <h2 className="font-bold">You can jump to any page that you want from here</h2>
                <div className="flex flex-wrap items-center justify-center gap-3 my-4">
                    <div className="px-2 py-1 duration-200 border rounded-lg border-secondary hover:bg-secondary hover:text-white">
                        <Link to='dashboard/enrolled-class'>My Enroll</Link>
                    </div>
                    <div className="px-2 py-1 duration-200 border rounded-lg border-secondary hover:bg-secondary hover:text-white">
                        <Link to='dashboard/my-selected'>My Selected</Link>
                    </div>
                    <div className="px-2 py-1 duration-200 border rounded-lg border-secondary hover:bg-secondary hover:text-white">
                        <Link to='dashboard/my-payments'>Payment History</Link>
                    </div>
                    <div className="px-2 py-1 duration-200 border rounded-lg border-secondary hover:bg-secondary hover:text-white">
                        <Link to='dashboard/apply-instructor'>Join as a Instructor</Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default StudentCP;
