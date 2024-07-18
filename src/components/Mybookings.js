import React from "react";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import BookingsCard from "./BookingsCard";
const Mybookings = ({ user }) => {
  const naviagte = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("No token");
      naviagte("/signup");
      return;
    }
  }, []);

  return (
    user && (
      <>
        {user?.bookings?.length != 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 gap-5 w-full">
            {user.bookings?.map((e) => (
              <BookingsCard key={e.event} id={e.event} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-center text-3xl">
              Register events to display
            </div>
          </div>
        )}
      </>
    )
  );
};

export default Mybookings;
