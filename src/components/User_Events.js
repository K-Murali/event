import React from "react";
import { useEffect, useState, useContext } from "react";
import { Eventcontext } from "../context/Event_State";
import Eventscard from "./Eventscard";
import { useNavigate } from "react-router-dom";
import UserEventsdetail from "./User_Eventcard";

const UserEvents = ({ user }) => {
  const naviagte = useNavigate();

  const [events, setEvents] = useState(null);
  const [stats, setstats] = useState(null);
  const [pageflag, setpageflag] = useState(false);
  const { get_user_events, get_stats, loadingflag } = useContext(Eventcontext);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("No token");
      naviagte("/signup");
      return;
    } else {
      const fetchEvents = async () => {
        const res = await get_user_events();
        setEvents(res.data);
        const stats = await get_stats();
        setstats(stats.data);
      };
      fetchEvents();
    }
  }, [loadingflag]);

  return (
    user && (
      <div className="flex  flex-wrap items-center justify-center  gap-5 w-full">
        {events?.length != 0 ? (
          <div className="mt-10 flex  flex-wrap items-center justify-center  gap-5 w-full">
            {events?.map((e) => (
              <UserEventsdetail
                stats={stats?.filter((f) => f._id == e._id)}
                key={e._id}
                name={e.name}
                id={e._id}
                reached={e.reached}
                registered={e.bookings}
                description={e.description}
                price={e.price}
                venue={e.venue}
                photo={e.photo}
                eventtime={e.eventtime}
                event={e}
                // role={'user'}
                path={"userevent"}
                reviewed={e.reviewed}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center text-3xl">
              Host new events to display. . .
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default UserEvents;
