import { useEffect, useState } from "react";
import { useUser } from "../../../../hooks/useUser";
import useAxiosFetch from "../../../../hooks/useAxiosFetch";
import { FiBriefcase, FiMail, FiSend, FiUser } from "react-icons/fi";

const AsInstructor = () => {
  const { currentUser } = useUser();
  const [submittedData, setSubmittedData] = useState({});
  const [loading, setLoading] = useState(true); // [1
  const axiosFetch = useAxiosFetch();

  const onSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.Email.value;
    const experience = e.target.experience.value;
    //console.log(experience)
    const data = {
      name, email, experience
    }
    axiosFetch.post(`/as-instructor`, data).then(res => {
      console.log(res.data);
      
    })
  };

  useEffect(() => {
    axiosFetch
      .get(`/applied-instructors/${currentUser?.email}`)
      .then((res) => {
        setSubmittedData(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {!submittedData?.name && (
        <div className="md:w-1/2">
          <form onSubmit={onSubmit}>
            <div className="flex w-full">
              <div className="w-full mb-4">
                <label className="text-gray-700" htmlFor="name">
                  Name
                </label>
                <div className="flex items-center mt-1">
                  <FiUser className="text-gray-500" />
                  <input
                    defaultValue={currentUser?.name}
                    disabled
                    readOnly
                    className="w-full ml-2 border-b border-gray-300 outline-none focus:border-secondary"
                    type="text"
                    id="name"
                    name="name"
                  />
                </div>
              </div>
              <div
               
                className="w-full mb-4"
              >
                <label className="text-gray-700" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center mt-1">
                  <FiMail className="text-gray-500" />
                  <input
                    defaultValue={currentUser?.email}
                    disabled
                    readOnly
                    className="w-full ml-2 border-b border-gray-300 outline-none focus:border-secondary"
                    type="email"
                    id="email"
                    name="email"
                  />
                </div>
              </div>
            </div>

            <div className="w-full mb-4">
              <label className="text-gray-700" htmlFor="experience">
                Experience
              </label>
              <div className="flex items-center mt-1">
                <FiBriefcase className="text-gray-500" />
                <textarea
                  placeholder="Tell us about your experience..."
                  className="w-full px-2 py-1 ml-2 border border-gray-300 rounded-lg outline-none resize-none placeholder:text-sm focus:border-secondary"
                  id="experience"
                  name="experience"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center text-center ">
              <button
                type="submit"
                className="flex items-center px-4 py-2 text-white rounded-md bg-secondary focus:outline-none"
              >
                <FiSend className="mr-2" />
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AsInstructor;
