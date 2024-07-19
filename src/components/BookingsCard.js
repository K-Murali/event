import React, { useState, useEffect, useContext } from "react";
import { BASE_URL, IMAGE_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Eventcontext } from "../context/Event_State";

const BookingsCard = (props) => {
  const navigate = useNavigate();
  const [loader, setloader] = useState(false);
  let [event, setevent] = useState(null);

  const { get_event_byid } = useContext(Eventcontext);

  const gettime_from_eventtime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  useEffect(() => {
    const caller = async () => {
      setloader(true);
      const eventid = props.id;
      const res = await get_event_byid(eventid);
      setloader(false);
      setevent(res.data);
    };
    caller();
  }, []);

  return (
    event && (
      <div className="p-2">
        <div className="note-item flex flex-col sm:w-full lg:w-[65rem] border p-2  md:p-0 lg:p-0 h-fit md:h-56  lg:h-56 bg-white rounded shadow-lg transition-transform duration-500 ease-in-out hover:transform hover:scale-105 hover:shadow-lg">
          <div className="flex  flex-grow w-full md:flex-row lg:flex-row  flex-col-reverse">
            <div className="hidden lg:flex  h-56 md:w-1/4 flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 rounded md:flex-col md:items-center md:justify-center ">
              <div className="md:text-4xl">
                {new Date(event.eventtime).toLocaleString("default", {
                  month: "short",
                })}
              </div>
              {/* <div className="md:text-6xl">{event.eventtime.getDate()}</div> */}
              <div className="md:text-xl">
                {new Date(event.eventtime).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </div>
            </div>
            <div className="flex flex-col md:flex-row p-4 font-normal text-gray-800 w-full">
              <div className="flex flex-col md:w-full">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center ">
                    <h1 className=" mr-2 text-2xl font-bold leading-none tracking-tight text-black">
                      {event.name}
                    </h1>
                  </div>
                </div>

                <p className="mt-4  hidden md:flex lg:flex leading-normal">
                  {event.description?.slice(0, 250)}...{" "}
                </p>
                <p className="mt-4   text-md flex lg:hidden md:hidden  leading-normal">
                  {event.description?.slice(0, 250)}...{" "}
                </p>
                <div className="flex flex-col justify-center mt-4 text-gray-700">
                  <div className="w-full flex flex-row justify-between items-center">
                    <div className="hidden lg:flex md:flex">
                      <span className="  font-bold">Venue:</span>
                      &nbsp;
                      <span className=" font-extrabold text-gray-700">
                        {event.venue}{" "}
                      </span>
                      at
                      <span className="text-bold  font-extrabold ">
                        &nbsp;
                        {gettime_from_eventtime(new Date(event.eventtime))}
                      </span>
                    </div>
                    <div
                      onClick={(e) => {
                        localStorage.setItem("eventid", props.id),
                          console.log(props.id),
                          navigate("/readmore");
                      }}
                      className={` ${
                        event.reviewed ? "" : "hidden"
                      }     text-blue-600 cursor-pointer`}
                    >
                      Read more
                    </div>
                    <div
                      className={`${
                        event.reviewed ? "" : "hidden"
                      } text-purple-600  hidden md:flex lg:flex  cursor-pointer`}
                    >
                      Registered
                    </div>
                    <div className="text-sm text-gray-600">
                      -by {event.host.name} on{" "}
                      {new Date(event.createdat).getDate()}&nbsp;
                      {new Date(event.createdat).toLocaleString("default", {
                        month: "short",
                      })}
                    </div>
                  </div>

                  <div className="text-center"></div>
                </div>
              </div>
            </div>
            <div className=" w-full md:w-1/3 lg:w-1/3">
              <img
                src={`${IMAGE_URL}/${event.photo}`}
                alt="photo"
                className="w-full sm:h-80 md:h-56 lg:h-56  p-1"
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default BookingsCard;
