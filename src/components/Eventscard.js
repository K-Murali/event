import React, { useState, useEffect, useContext } from "react";
import { BASE_URL, IMAGE_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineLike,
  AiOutlineDelete,
  AiOutlineDislike,
} from "react-icons/ai";
import { FaBookmark } from "react-icons/fa6";
import Modalbox from "./Update_eventbox";
import { FaRegComment, FaRegBookmark, FaRegEdit } from "react-icons/fa";
import {
  IoCheckmarkDoneCircle,
  IoCheckmarkDoneCircleOutline,
} from "react-icons/io5";
import { Eventcontext } from "../context/Event_State";
import { Link } from "react-router-dom";

const Eventscard = (props) => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  const [accept, setaccept] = useState(false);
  const [photo, setphoto] = useState(null);
  let [newevent, setnewevent] = useState({});

  const { delete_event, accept_event, update_event } = useContext(Eventcontext);
  const imageUrl = props.photo
    ? `${IMAGE_URL}/${props.photo}`
    : "https://www.si.com/.image/t_share/MTY4MTkyMjczODM4OTc0ODQ5/cfp-trophy-deitschjpg.jpg";

  const reviewed = props.reviewed;
  const postdate = new Date(props.event.createdat);
  const postmonth = postdate.toLocaleString("default", { month: "short" });
  const eventDate = new Date(props.eventtime);
  const month = eventDate.toLocaleString("default", { month: "short" });
  const time = eventDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const handleedit = async () => {
    if (photo) {
      const cloudinary = new FormData();
      cloudinary.append("file", photo);
      cloudinary.append("upload_preset", "Event-manager");
      cloudinary.append("cloud_name", "drfvhp1jh");
      const options = {
        method: "POST",
        body: cloudinary,
      };
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/drfvhp1jh/image/upload`,
        options
      );
      const ans = await res.json();
      newevent.photo = ans.url?.split("upload/")[1];
    }

    const eventid = props.id;
    update_event(newevent, eventid);
  };

  const onchange = (e) => {
    setnewevent({ ...newevent, [e.target.name]: e.target.value });
  };

  const handle_delete = () => {
    const ans = confirm("Are you sure u want to delete this");
    const eventid = props.id;
    if (ans) {
      delete_event(eventid);
    }
  };
  const handleclick = () => {
    document.getElementById(`update_event_${props.id}`).showModal();
  };

  const handle_accept = async () => {
    setloader(true);
    const eventid = props.id;
    await accept_event(eventid);
    setloader(false);
    setaccept(true);
  };

  return (
    <div className="p-2">
      <div className="note-item flex flex-col sm:w-full lg:w-[65rem] border p-2  md:p-0 lg:p-0 h-fit md:h-56  lg:h-56 bg-white rounded shadow-lg transition-transform duration-500 ease-in-out hover:transform hover:scale-105 hover:shadow-lg">
        <div className="flex  flex-grow w-full md:flex-row lg:flex-row  flex-col-reverse">
          <div className="hidden lg:flex  h-56 md:w-1/4 flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center ">
            <div className="md:text-4xl">{month}</div>
            <div className="md:text-6xl">{eventDate.getDate()}</div>
            <div className="md:text-xl">{time}</div>
          </div>
          <div className="flex flex-col md:flex-row p-4 font-normal text-gray-800 w-full">
            <div className="flex flex-col md:w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center ">
                  <h1 className=" mr-2 text-2xl font-bold leading-none tracking-tight text-black">
                    {props.name}
                  </h1>

                  {(props.path == "userevent" || props.role == "admin") && (
                    <div className="ml-4 flex gap-2">
                      <FaRegEdit
                        onClick={handleclick}
                        className="w-6  cursor-pointer h-6"
                      ></FaRegEdit>
                      <AiOutlineDelete
                        onClick={handle_delete}
                        className="w-6 cursor-pointer h-6"
                      ></AiOutlineDelete>
                    </div>
                  )}
                </div>
                <div className="flex ">
                  {props.role && props.role === "admin" && (
                    <div>
                      {!reviewed && (
                        <>
                          {loader ? (
                            <div className="loading loading-dots loading-sm"></div>
                          ) : (
                            <button
                              disabled={accept}
                              onClick={handle_accept}
                              className=" bg-green-400 bg-opacity-25 text-sm ml-3  mr-3 w-fit p-1 rounded border-2 border-green-800"
                            >
                              {accept ? "Done" : "Accept"}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                  {props.role !== "admin" && (
                    <div>
                      {reviewed ? (
                        <div className="flex  text-green-500 justify-center items-center ">
                          <span className="mb-1">&nbsp;reviewed&nbsp;</span>
                          <IoCheckmarkDoneCircle />
                        </div>
                      ) : (
                        <div className="flex justify-center items-center  ">
                          <span className="mb-1">&nbsp;under review&nbsp;</span>
                          <IoCheckmarkDoneCircleOutline />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-4  hidden md:flex lg:flex leading-normal">
                {props.description.slice(0, 250)}...{" "}
              </p>
              <p className="mt-4   text-md flex lg:hidden md:hidden  leading-normal">
                {props.description.slice(0, 250)}...{" "}
              </p>
              <div className="flex flex-col justify-center mt-4 text-gray-700">
                <div className="w-full flex flex-row justify-between items-center">
                  <div className="hidden lg:flex md:flex">
                    <span className="  font-bold">Venue:</span>
                    &nbsp;
                    <span className="mr-1 font-extrabold text-gray-700">
                      {props.venue}
                      {"  "}
                    </span>
                    {" at"}
                    <span className="text-bold  font-extrabold ">
                      &nbsp;{time}
                    </span>
                  </div>
                  <div
                    onClick={(e) => {
                      localStorage.setItem("eventid", props.id),
                        console.log(props.id),
                        navigate("/readmore");
                    }}
                    className={` ${
                      reviewed ? "" : "hidden"
                    }     text-blue-600 cursor-pointer`}
                  >
                    Read more
                  </div>
                  <div
                    className={`${
                      reviewed ? "" : "hidden"
                    } text-purple-600  hidden md:flex lg:flex cursor-pointer`}
                  >
                    &#8377; {props.event.price}
                  </div>
                  <div className="text-sm text-gray-600">
                    -by {props.event.host.name} on {postdate.getDate()}&nbsp;
                    {postmonth}
                  </div>
                </div>

                <div className="text-center"></div>
              </div>
            </div>
          </div>
          <div className=" w-full md:w-1/3 lg:w-1/3">
            <img
              src={imageUrl}
              alt="photo"
              className="w-full sm:h-80 md:h-56 lg:h-56  p-1"
            />
          </div>
        </div>
        <dialog id={`update_event_${props.id}`} className="modal">
          <Modalbox
            name={props.name}
            description={props.description}
            venue={props.venue}
            key={props.id}
            eventtime={props.eventtime}
            price={props.price}
            id={props.id}
            setphoto={setphoto}
            setnewevent={setnewevent}
            handleedit={handleedit}
            onchange={onchange}
          />
        </dialog>
      </div>
    </div>
  );
};

export default Eventscard;
