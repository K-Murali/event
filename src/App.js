import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { BASE_URL } from "./utils/api";
import Event_State, { Eventcontext } from "./context/Event_State";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Formnote from "./components/Formnote";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import UserEvents from "./components/User_Events";
import NewEvents from "./components/NewEvents";
import Readmore from "./components/Readmore";
import Mybookings from "./components/Mybookings";
import Loader from "./components/Loadingbar";

const App = () => {
  const [user, setuser] = useState(null);

  const signup = async (details, loginflag) => {
    try {
      const { username, email, password } = details;

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password }),
      };

      let base_url = `${BASE_URL}/api/users/signup`;

      if (!loginflag) {
        options.body = JSON.stringify({ email, password });
        base_url = `${BASE_URL}/api/users/login`;
      }
      const res = await fetch(base_url, options);
      const json = await res.json();
      if (json.status == "success") {
        setuser(json.user);
        localStorage.setItem("token", json.token);
        localStorage.setItem("role", json.user.role);
      }
      return json;
    } catch (err) {
      console.log("This is error message: " + err.message);
    }
  };

  const getuser = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch(`${BASE_URL}/api/users/getuserdetails`, options);
      const json = await res.json();
      localStorage.setItem("role", json.user.role);
      setuser(json.user);
    } catch (e) {
      console.log("this is error message" + e.message);
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return;
    } else {
      const call = async () => {
        await getuser();
      };
      call();
    }
  }, []);

  return (
    <>
      <Event_State>
        <div>
          <Router>
            <Navbar user={user} setuser={setuser} />

            <Routes>
              <Route
                exact
                path="/addevent"
                element={<Formnote user={user} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup signup={signup} />}
              />
              <Route exact path="/event" element={<Feed user={user} />} />
              <Route
                exact
                path="/myevents"
                element={<UserEvents user={user} />}
              />
              <Route
                exact
                path="/newevents"
                element={<NewEvents user={user} />}
              />
              <Route
                exact
                path="/readmore"
                element={<Readmore user={user} />}
              />
              <Route
                exact
                path="/registered"
                element={<Mybookings user={user} />}
              />
              <Route
                exact
                path="/readmore"
                element={<Readmore user={user} />}
              />
            </Routes>
          </Router>
        </div>
      </Event_State>
    </>
  );
};

export default App;
