import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../axios";


const CreateNote = () => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleNoteCreate = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/notes", note, {
        withCredentials: true,
      });
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto max-w-[80%] border h-[80vh] mt-20 p-5 flex flex-col gap-10 md:max-w-[500px] rounded-xl relative">
      {/* Cross Button */}
      <button className="w-[32px] h-[32px] bg-blue-500 flex items-center justify-center rounded-[50%] cursor-pointer absolute top-0 right-0 m-3 " onClick={()=>
      navigate('/')}>
        <IoClose className="text-3xl text-white " />
      </button>
      {/* Form Title */}
      <h1 className="text-4xl text-center font-semibold pt-10">
        Create New Note
      </h1>
      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleNoteCreate}>
        {/* Title*/}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-[22px]">
            Title
          </label>
          <input
            id="title"
            onChange={(e) => setNote({ ...note, title: e.target.value })}
            type="text"
            className="border h-9 rounded pl-2"
            required
          />
        </div>
        {/* Content */}
        <div className="flex flex-col">
          <label htmlFor="content" className="text-[22px]">
            Content
          </label>
          <textarea
            id="content"
            minLength="1"
            onChange={(e) => setNote({ ...note, content: e.target.value })}
            className="border h- rounded pl-2 resize-none"
            required
          />
        </div>
        {/* Submit Button */}
        <input
          type="submit"
          className="bg-blue-400 text-white p-2 mt-8 cursor-pointer"
          value="create Note"
        />
      </form>
    </div>
  );
};

export default CreateNote;
