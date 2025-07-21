import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const UpdateNote = ({ updateModel, setUpdateModel, noteId }) => {
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  console.log(note);
  useEffect(() => {
    getSingleNote();
  }, []);

  const getSingleNote = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/notes/${noteId}`, {
        withCredentials: true,
      });
      setNote({ ...note, title: res.data.title, content: res.data.content });
    } catch (error) {
      console.log(error);
    }
  };
  const handleNoteUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(
        `http://localhost:5000/api/notes/${noteId}`,
        note,
        {
          withCredentials: true,
        }
      );
      setUpdateModel(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-auto max-w-[80%] border h-[80vh] mt-20 p-5 flex flex-col gap-10 md:max-w-[500px] rounded-xl relative">
      {/* Cross Button */}
      <button
        className="w-[32px] h-[32px] bg-blue-500 flex items-center justify-center rounded-[50%] cursor-pointer absolute top-0 right-0 m-3 "
        onClick={() => navigate("/notes")}
      >
        <IoClose className="text-3xl text-white " />
      </button>
      {/* Form Title */}
      <h1 className="text-4xl text-center font-semibold pt-10">Update Note</h1>
      {/* Form */}
      <form className="flex flex-col gap-4" onSubmit={handleNoteUpdate}>
        {/* Title*/}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-[22px]">
            Title
          </label>
          <input
            value={note.title}
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
            value={note.content}
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

export default UpdateNote;
