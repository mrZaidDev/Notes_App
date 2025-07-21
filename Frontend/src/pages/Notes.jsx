import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { CiRead } from "react-icons/ci";
import { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const [userNotes, setUserNotes] = useState([]);
  useEffect(() => {
    fetchUserNotes();
  });
  const fetchUserNotes = async () => {
    const allNotes = await axios.get("http://localhost:5000/api/notes", {
      withCredentials: true,
    });
    setUserNotes(allNotes.data);
  };
  return (
    <div>
      {/* Sidebar */}
      <aside className="h-screen left-0 fixed border-r-1  text-gray-200 max-w-[12%] min-w-[7%] flex items-start justify-center">
        <button className="lg:text-3xl sm:text-2xl bg-blue-500 text-white py-[4px] px-3 rounded-[50%] cursor-pointer mt-5">
          +
        </button>
      </aside>
      {/* Notes section */}
      <section className="w-[88%] h-screen absolute right-0 p-5">
        {/* Notes Title */}
        <h1 className="text-4xl">NOTES</h1>
        {/* All Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 m-2">
          {userNotes.map((elem,i) => {
            return (
              <div key={i} className=" bg-white border text-black min-h-[200px] rounded p-5 flex flex-col justify-between">
               <div>
                 <h1 className="text-2xl font-bold tracking-wide">{elem.title}</h1>
                <p className="text-[19px] ">{elem.content}</p>
               </div>
                {/* BUTTONS START*/}
                <div className="flex justify-between">
                  <div className="flex flex-row gap-2">
                    <button className="w-[40px] h-[40px] bg-blue-500 flex items-center justify-center rounded-[50%] cursor-pointer">
                      <MdOutlineDelete className="text-3xl text-white " />
                    </button>
                    <button className="w-[40px] h-[40px] bg-blue-500 flex items-center justify-center rounded-[50%] cursor-pointer">
                      <FaRegEdit className="text-3xl text-white " />
                    </button>
                  </div>
                  <div>
                    <button className="w-[40px] h-[40px] bg-blue-500 flex items-center justify-center rounded-[50%] cursor-pointer">
                      <CiRead className="text-3xl text-white " />
                    </button>
                  </div>
                </div>
                {/* BUTTONS END */}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Notes;
