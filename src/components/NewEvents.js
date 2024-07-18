import React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Eventcontext } from "../context/Event_State";
import Eventscard from "./Eventscard";

const NewEvents = ({ user }) => {
  const naviagte = useNavigate();
  const [events, setEvents] = useState(null);
  const { get_new_events, loadingflag } = useContext(Eventcontext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("No token");
      naviagte("/signup");
      return;
    } else {
      const fetchEvents = async () => {
        const res = await get_new_events();
        setEvents(res.data);
      };
      fetchEvents();
    }
  }, [loadingflag]);

  return (
    user && (
      <div className="flex flex-col items-center justify-center mt-10 gap-5 w-full">
        {events &&
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
              reviewed={e.reviewed}
              role={user.role}
              path={"newevent"}
            />
          ))}

        {events?.length == 0 && (
          <div className="flex flex-col text-center align-middle justify-center items-center text-4xl">
            No Recent Proposals.
          </div>
        )}
      </div>
    )
  );
};

export default NewEvents;
