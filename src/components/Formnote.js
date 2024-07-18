import React, { useState, useContext, useEffect } from "react";
import { Eventcontext } from "../context/Event_State";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";

const Formnote = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [newnote, setNewnote] = useState({
    name: "",
    description: "",
    venue: "",
    eventtime: "",
    price: "",
    photo: "",
  });

  const { alert, setalert, setmessage, setloadval, add_event } =
    useContext(Eventcontext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setalert(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, [alert, setalert]);

  const validateForm = () => {
    const { name, venue, description, price, eventtime } = newnote;
    if (name && venue && description && eventtime && price && file) {
      return true;
    } else {
      setalert(true);
      setmessage("Please fill all the fields...!");
      return false;
    }
  };

  const onchange = (e) => {
    setNewnote({ ...newnote, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleclick = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Upload photo to cloudinary
    const cloudinary = new FormData();
    cloudinary.append("file", file);
    cloudinary.append("upload_preset", "Event-manager");
    cloudinary.append("cloud_name", "drfvhp1jh");

    const options = {
      method: "POST",
      body: cloudinary,
    };
    setloadval(20);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/drfvhp1jh/image/upload`,
      options
    );
    setloadval(30);
    const ans = await res.json();
    setloadval(40);
    newnote.photo = ans.url.split("upload/")[1];
    await add_event(newnote);
    setloadval(50);
    navigate("/myevents");
  };

  return (
    <>
      <div className="flex justify-center align-middle mt-14 p-5 flex-col">
        <div>
          <h1 className="my-5 text-center text-3xl text-pretty ">
            Host your events here
          </h1>
        </div>
        <div className="block">
          <form className="form">
            <div className="flex flex-col p-2 gap-4">
              <input
                name="name"
                type="text"
                placeholder="name... ( name of the event )"
                onChange={onchange}
                className="input focus:outline-none bordered  input-bordered w-full"
              />
              <input
                name="venue"
                type="text"
                placeholder="venue... (where it is hosted)  "
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <input
                name="eventtime"
                type="datetime-local"
                placeholder="time...  ( please enter the strat time)"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <input
                name="price"
                type="number"
                placeholder="ticket cost...  ( estimated expenses )"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              />
              <textarea
                name="description"
                rows="3"
                placeholder="summary ... ( briefly about the event )"
                onChange={onchange}
                className="input focus:outline-none bordered input-bordered w-full"
              ></textarea>

              <input
                name="photo"
                type="file"
                onChange={handleFileChange}
                className="file-input text-md file-input-bordered w-full"
              />
              {/* <ReactQuill value={newnote.para} onChange={handleQuillChange} /> */}
              <button
                type="submit"
                onClick={handleclick}
                disabled={!localStorage.getItem("token")}
                className="btn btn-outline btn-success"
              >
                Create post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formnote;
