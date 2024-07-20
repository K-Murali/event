import React from "react";
import { useEffect, useState, useContext } from "react";
import { Eventcontext } from "../context/Event_State";
import Eventscard from "./Eventscard";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
const Feed = ({ user }) => {
  const naviagte = useNavigate();

  const { get_all_events, events, setEvents, loadingflag } =
    useContext(Eventcontext);

  useEffect(() => {
    if (localStorage.getItem("token")?.length == 0) {
      console.log("No token");
      naviagte("/signup");
      return;
    } else {
      handlebooking();
    }
  }, [loadingflag]);

  const handlebooking = async () => {
    const query = window.location.href.split("?")[1]
      ? window.location.href.split("?")[1]
      : null;
    const res = await get_all_events(query);
    naviagte("/event");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      <Filters
        className={` me-2  bg-slate-600  mt-10  rounded text-white  w-16 h-8 
          }`}
      />
      {events?.length != 0 && user ? (
        events.map((e) => (
          <Eventscard
            key={e._id}
            name={e.name}
            id={e._id}
            description={e.description.slice(0, 250)}
            price={e.price}
            venue={e.venue}
            photo={e.photo}
            eventtime={e.eventtime}
            event={e}
            role={user.role}
            path={"feed"}
            reviewed={e.reviewed}
          />
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          No Events to display. . .
        </div>
      )}
    </div>
  );
};

export default Feed;
