import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SelectedClass = () => {
  const { currentUser } = useUser();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [page, setPage] = useState(1);
  const itemPerPage = 5;
  const totalPage = Math.ceil(classes.length / itemPerPage);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentUser?.email}`)
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error)
        setLoading(false);
      });
  }, []);

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
    <div className="my-6 text-center">
      <h1 className="text-4xl font-bold ">My <span className="text-secondary">Selected</span> Class</h1>
    </div>

    <div className="h-screen py-8 ">
      <div className="container px-4 mx-auto ">
        <h2 className="mb-4 text-2xl font-semibold">Shopping Cart:</h2>
        <div className="flex flex-col gap-4 md:flex-row">
          {/* left div */}
          <div className="md:w-3/4">
            <div className="p-6 mb-4 bg-white rounded-lg shadow-md">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="font-semibold text-left ">#</th>
                    <th className="font-semibold text-left ">Product</th>
                    <th className="font-semibold text-left ">Price</th>
                    <th className="font-semibold text-left ">Date</th>
                    <th className="font-semibold text-left ">Actions</th>
                  </tr>
                </thead>

                {/* table body */}
                <tbody>
                  {
                    classes.length === 0 ? <tr> <td colSpan='5' className="text-2xl font-bold text-center"> No classes Found</td></tr> : classes.map((item, idx) => {
                      const letIdx = (page - 1) * itemPerPage + idx + 1;
                      return <tr key={item._id}>
                        <td className="py-4">{letIdx}</td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/* right div */}
          <div className="fixed md:w-1/5 right-3">right</div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SelectedClass;
