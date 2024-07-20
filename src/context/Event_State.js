import React, { createContext, useState } from "react";
import { BASE_URL } from "../utils/api";
export const Eventcontext = createContext();

const Event_State = (props) => {
  const [events, setEvents] = useState(null);
  const [loadval, setloadval] = useState(100);
  const [state, setState] = useState("some state"); // Example state
  const [alert, setalert] = useState(true);
  const [loadingflag, setloadingflag] = useState(false);
  const [user, setuser] = useState(null);
  const [message, setmessage] = useState("welcome");
  const [query, setQuery] = useState({
    date: {
      gte: "",
      lte: "",
    },
    price: {
      lte: "10000",
    },
    sort: "",
    keyword: "",
  });

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
      setloadval(30);
      const res = await fetch(base_url, options);
      setloadval(60);
      const json = await res.json();
      setloadval(100);
      if (json.status == "success") {
        setuser(json.user);
        localStorage.setItem("token", json.token);
        localStorage.setItem("role", json.user.role);
      }
      console.log(json);
      return json;
    } catch (err) {
      console.log("This is error message: " + err.message);
      setmessage(err.message);
      setalert(true);
    }
  };

  const getuser = async () => {
    try {
      console.log(localStorage.getItem("token"));
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
      setmessage(e.message);
      setalert(true);
    }
  };

  const get_event_byid = async (eventid) => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      setloadval(30);
      const res = await fetch(
        `${BASE_URL}/api/events/getbyid/${eventid}`,
        options
      );
      setloadval(60);
      const json = await res.json();
      setloadval(100);
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };
  const get_event = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const res = await fetch(`${BASE_URL}/api/events/getallevents`, options);
      const json = res.json();
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };
  const add_event = async (newnote) => {
    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newnote),
      };

      const res = await fetch(`${BASE_URL}/api/events/addevent`, options);
      const json = await res.json();

      if (json.status == "success") {
        setmessage("New event went for review");
        setalert(true);
      } else {
        setmessage("error: ", json.message);
        setalert(true);
      }
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };
  const delete_event = async (eventid) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      setloadingflag(!loadingflag);
      setloadval(30);
      const res = await fetch(
        `${BASE_URL}/api/events/delete/${eventid}`,
        options
      );
      setloadval(60);
      const json = await res.json();
      setloadval(100);

      if (json.status == "success") {
        setmessage("Successfully deleted");
        setalert(true);
      } else {
        setmessage("error: ", json.message);
        setalert(true);
      }
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };
  const update_event = async (newevent, eventid) => {
    try {
      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newevent),
      };
      setloadingflag(!loadingflag);
      setloadval(30);
      const res = await fetch(
        `${BASE_URL}/api/events/update/${eventid}`,
        options
      );
      setloadval(30);
      const json = await res.json();
      setloadval(100);

      if (json.status == "success") {
        setmessage("Successfully updated");
        setalert(true);
      } else {
        setmessage("error: ", json.message);
        setalert(true);
      }
      setloadingflag(!loadingflag);
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };
  const get_user_events = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      setloadval(60);
      const res = await fetch(`${BASE_URL}/api/events/getuserevents`, options);
      setloadval(0);
      const json = await res.json();
      setloadval(100);
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };
  const get_all_events = async (query) => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      let url = `${BASE_URL}/api/events/getallevents`;
      if (query) {
        url = `${BASE_URL}/api/events/getallevents?${query}`;
      }
      setloadval(30);
      const res = await fetch(url, options);
      setloadval(60);
      const json = await res.json();
      setloadval(100);
      setEvents(json.data);
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage("from get all event" + e.message);
      setalert(true);
    }
  };

  const get_new_events = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      setloadval(30);
      const res = await fetch(`${BASE_URL}/api/events/getnewevents`, options);
      setloadval(60);
      const json = await res.json();
      setloadval(100);
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };

  const accept_event = async (eventid) => {
    try {
      setloadingflag(!loadingflag);
      const options = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewed: true }),
      };

      const res = await fetch(
        `${BASE_URL}/api/events/update/${eventid}`,
        options
      );
    } catch (e) {
      console.log("this is error message" + e.message);
    }
  };
  const get_all_expenses = async (id) => {
    try {
      let query = "";
      if (id) {
        query = `eventid=${id}`;
      }
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(
        `${BASE_URL}/api/expenses/getallexpenses?${query}`,
        options
      );
      const json = await res.json();
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };
  const add_expenses = async (data) => {
    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(`${BASE_URL}/api/expenses/addexpense`, options);
      const json = await res.json();
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };
  const add_notify = async (data) => {
    try {
      const options = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await fetch(`${BASE_URL}/api/notify/message`, options);
      const json = await res.json();
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };
  const get_notify = async (eventid) => {
    try {
      let query = "";
      if (eventid) {
        query = `eventid=${eventid}`;
        console.log(eventid);
      }

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };

      const res = await fetch(
        `${BASE_URL}/api/notify/message?${query}`,
        options
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      return json;
    } catch (e) {
      console.log("this is error message: " + e.message);
      setmessage(e.message);
      setalert(true);
      return null; // Return null or handle as needed
    }
  };
  const get_stats = async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(`${BASE_URL}/api/expenses/getstats`, options);
      const json = await res.json();
      return json;
    } catch (e) {
      console.log("this is error message" + e.message);
      setmessage(e.message);
      setalert(true);
    }
  };

  return (
    <Eventcontext.Provider
      value={{
        // states
        events,
        setEvents,
        alert,
        setalert,
        message,
        setmessage,
        loadingflag,
        setloadingflag,
        loadval,
        setloadval,
        query,
        setQuery,

        // api calls
        signup,
        get_event,
        add_event,
        delete_event,
        update_event,
        get_user_events,
        getuser,
        get_all_events,
        get_new_events,
        accept_event,
        get_event_byid,
        get_all_expenses,
        add_expenses,
        add_notify,
        get_notify,
        get_stats,
      }}
    >
      {props.children}
    </Eventcontext.Provider>
  );
};

export default Event_State;
