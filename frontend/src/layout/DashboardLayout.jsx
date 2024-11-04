import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BiHomeAlt, BiLogInCircle } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
//import { IoMdDoneAll } from "react-icons/io";
import { BsFillPostcardFill } from "react-icons/bs";
//import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { TbBrandAppleArcade } from "react-icons/tb";
import { MdOfflineBolt } from "react-icons/md";
import { GiFigurehead } from "react-icons/gi";

const adminNavItems = [
  {
    to: "/dashboard/admin-home",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Dashboard Home",
  },
  {
    to: "/dashboard/manage-users",
    icon: <FaUsers className="text-2xl" />,
    label: "Manage Users",
  },
  {
    to: "/dashboard/manage-class",
    icon: <BsFillPostcardFill className="text-2xl" />,
    label: "Manage Class",
  },
  {
    to: "/dashboard/admin-home",
    icon: <TbBrandAppleArcade className="text-2xl" />,
    label: "Applications",
  },
];

const lastMenuItem = [
  {
    to: "/",
    icon: <BiHomeAlt className="text-2xl" />,
    label: "Main Home",
  },
  {
    to: "/trending",
    icon: <MdOfflineBolt className="text-2xl" />,
    label: "Trending",
  },
  {
    to: "/browse",
    icon: <GiFigurehead className="text-2xl" />,
    label: "Following",
  },
];

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const { loader, logout } = useAuth();
  const { currentUser } = useUser();
  const navigate = useNavigate();
  //const role = currentUser?.role;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
          .then(
            Swal.fire({
              title: "Logged Out!",
              text: "Done",
              icon: "success",
            })
          )
          .catch((error) => console.log(error));
      }
      navigate("/")
    });
  };

  const role = "admin";

  if (loader) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72 overflow-y-auto" : "w-[90px]  overflow-auto"
        } bg-white h-screen p-5 md:block hidden pt-8 relative duration-300`}
      >
        <div className="flex items-center gap-x-4">
          <img
            onClick={() => setOpen(!open)}
            src="/learning-logo.png"
            alt=""
            className={`cursor-poniter h-[40px] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            onClick={() => setOpen(!open)}
            className={`text-dark-primary cursor-pointer font-bold origin-left text-l duration-200 ${
              !open && "scale-0"
            }`}
          >
            Learning Academy
          </h1>
        </div>

        {/* Navlinks */}
        {role === "admin" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}>
              <small> MENU </small>
            </p>
            {role === "admin" &&
              adminNavItems.map((menuItem, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={menuItem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-red-500 text-white " : "text-[#413F44]"
                      }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                    }
                  >
                    {menuItem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-200`}
                    >
                      {menuItem.label}{" "}
                    </span>
                  </NavLink>
                </li>
              ))}
          </ul>
        )}

        <ul className="pt-6">
          <p
            className={`ml-3 text-gray-500  uppercase mb-3 ${
              !open && "hidden"
            }`}
          >
            <small> Useful links </small>
          </p>
          {lastMenuItem.map((menuItem, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={menuItem.to}
                className={({ isActive }) =>
                  `flex ${
                    isActive ? "bg-red-500 text-white " : "text-[#413F44]"
                  }duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`
                }
              >
                {menuItem.icon}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menuItem.label}{" "}
                </span>
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleLogout()}
              className="flex items-center p-2 text-sm font-bold duration-150 rounded-md cursor-pointer hover:bg-secondary hover:text-white gap-x-4"
            >
              <BiLogInCircle className="text-2xl" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
