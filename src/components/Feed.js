import React from "react";
import { useEffect, useState, useContext } from "react";
import { Eventcontext } from "../context/Event_State";
import Eventscard from "./Eventscard";
import { useNavigate } from "react-router-dom";
const Feed = ({ user }) => {
  const naviagte = useNavigate();
  const [events, setEvents] = useState(null);
  const { get_all_events, loadingflag } = useContext(Eventcontext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
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
    setEvents(res.data);
    naviagte("/event");
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 gap-5 w-full">
      {events &&
        user &&
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
        ))}
    </div>
  );
};

export default Feed;
