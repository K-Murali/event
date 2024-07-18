import React, { useState, useEffect, useContext } from "react";
import { IMAGE_URL } from "../utils/api";
import "./readmore.css";
import BookTourButton from "../utils/bookings";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { Eventcontext } from "../context/Event_State";

const Readmore = ({ user }) => {
  const [event, setevent] = useState(null);
  const [booked, setbooked] = useState(null);
  const { get_event_byid } = useContext(Eventcontext);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const caller = async () => {
      const eventid = localStorage.getItem("eventid");
      console.log(eventid);
      const res = await get_event_byid(eventid);

      setevent(res.data);
      setbooked(res.booked);
    };
    caller();
  }, []);

  return (
    user &&
    event && (
      <div className="flex justify-center items-center align-middle  lg:mt-12 w-full ">
        <div className="    lg:flex-row flex  flex-col sm:w-full md:full lg:w-4/6 justify-center items-center   rounded-lg bg-white shadow-lg">
          <div className="sm:w-full    h-fit md:full lg:w-7/12">
            <img
              className=" lg:h-[40rem] sm:h-full sm:w-full pb-0  "
              src={`${IMAGE_URL}/${event.photo}`}
              alt="Post"
            />
          </div>
          <div className="flex lg:flex-col sm:w-full md:full lg:w-1/2 lg:h-[40rem]  flex-col-reverse  justify-between   ">
            <div
              // onClick={() => {
              //   navigate("/myprofile");
              // }}
              className="  border flex border-b-0   flex-col  "
            >
              <div className="username lg:bg-gray-400  lg:bg-opacity-15  lg:border-2   text-2xl p-3  font-bold">
                Event Description
              </div>
              <div
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                className="hashtags    h-fit overflow-scroll text-md text-gray-600 p-4"
              >
                {event.description}
              </div>

              <div className="flex lg:flex-row flex-col text-gray-600 justify-start lg:gap-10 lg:items-center">
                <div className=" ml-5 p-4 ">
                  <ul className=" list-disc gap-3">
                    <li>
                      {" "}
                      Price : {event.price == 0 ? "Free.." : event.price}
                    </li>
                    <li>Open to : {event.opento}.. </li>
                    <li>Venue : {event.venue}</li>
                    <li>
                      Event Date :{" "}
                      {months[new Date(event.eventtime).getMonth()]} ,
                      {new Date(event.eventtime).getDate()}
                    </li>
                    <li>
                      Event time : {new Date(event.eventtime).getHours()}:
                      {new Date(event.eventtime).getMinutes()} Hrs
                    </li>
                    <li>Duration : {event.duration} Hrs </li>
                  </ul>
                </div>
                {!booked ? (
                  <div className="flex justify-center mb-5">
                    <BookTourButton></BookTourButton>
                  </div>
                ) : (
                  <button className="bg-gray-600 rounded p-1 h-fit w-fit text-white">
                    Booked
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-between p-4 text-gray-600 sm:w-full md:full lg:w-full ">
              <div className="flex justify-end">
                <span className=" font-normal   text-sm   text-gray-500">
                  {new Date(event.createdat).getDate()}
                  &nbsp;{months[new Date(event.createdat).getMonth()]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Readmore;
