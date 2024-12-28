import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from "moment";
import { MdDeleteSweep } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import Swal from "sweetalert2";

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

  const totalPrice = classes.reduce((acc, item) => acc + parseInt(item.price),0);
  const totalTax = totalPage * 0.01;
  const price = totalPrice + totalTax;

  const handlePay = (id) =>{
   // console.log(id)
    const item = classes.find((item) => item._id === id)
    const price = item.price;
    console.log(price)
    navigate('/dashboard/user/payment', { state: {price:price, itemId:id}})
  }

  const handleDelete = (id) => {
    //console.log(id)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete-cart-item/${id}`).then((res) => {
          if(result.data.deletedCount > 0){
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
            const newClasses = classes.filter((item) => item._id !== id);
            setClasses(newClasses);
          }
         
        }).catch((error) => console.log(error))
      }
    });
  }

  if(loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
    <div className="my-6 text-center">
      <h1 className="text-4xl font-bold text-black">My Selected Classes</h1>
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
                        <td className="py-4">
                          <div className="flex items-center">
                            <img src={item.Image} alt=""className="w-16 h-16 mr-4"/>
                            <span>{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4">${item.price}</td>
                        <td className="py-4">
                          <p className="text-sm text-green-700">
                            {moment(item.submitted).format("MMMM Do YYYY")}
                          </p>
                        </td>
                        <td className="flex gap-2 py-4 pt-8">
                          <button onClick={() => handleDelete(item._id)} className="px-3 py-1 font-bold text-white bg-red-500 cursor-pointer rounded-3xl"><MdDeleteSweep /></button>
                          <button onClick={() => handlePay(item._id)} className="flex items-center px-3 py-1 font-bold text-white bg-green-500 cursor-pointer rounded-3xl"><FiDollarSign  className="mr-2"/></button>
                        </td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

          {/* right div */}
          <div className="fixed md:w-1/5 right-3">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold"> Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Taxes</span>
              <span>${totalTax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Extra Fees</span>
              <span>$0</span>
            </div>
            <hr className="my-2"/>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${price.toFixed(2)}</span>
            </div>
            <button disabled={price <= 0} onClick={() => navigate('/dashboard/user/payment', { state: {price:price, itemId:null}})} className="w-full px-4 py-2 mt-4 text-white rounded-lg bg-secondary">
              Checkout
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SelectedClass;
