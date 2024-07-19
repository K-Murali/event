import React, { useState, useContext } from "react";
import { Eventcontext } from "../context/Event_State";

const Mailbox = (props) => {
  const { add_notify, get_notify } = useContext(Eventcontext);
  const [data, setdata] = useState({
    event: props.id,
    message: "",
    eventname: props.name,
  });
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);

  const handlenotify = async () => {
    const eventid = data.event;
    const res = await get_notify(eventid);
    setNotifications(res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.message === "") {
      alert("Please enter something. . . ");
      return;
    }
    add_notify(data);
    handlenotify();
    setIsFormVisible(false);
  };

  const handleSeePastMessages = async () => {
    setIsFormVisible(false);
    await handlenotify();
  };
  const handleClose = () => {
    document.getElementById(`send_mail_${props.id}`).close();
  };

  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="bg-white rounded-md lg:h-1/2   overflow-scroll w-11/12 lg:w-4/6"
    >
      {isFormVisible ? (
        <form method="dialog">
          <div className="m-4 items-center flex flex-col">
            <h3 className="font-bold font-mono text-2xl">Send message</h3>

            <div className="mb-2.5 w-5/6 container flex flex-col items-center justify-between">
              <label className="form-control w-full">
                <div className="label-text flex justify-between  ">
                  <div className="text-lg m-2">From team {props.name}</div>
                  <div
                    className="text-blue-600 underline cursor-pointer mt-2"
                    onClick={handleSeePastMessages}
                  >
                    past messages
                  </div>
                  <div
                    type="button"
                    onClick={handleClose}
                    className="text-sm w-fit flex justify-center  border-0 underline text-blue-500 hover:text-gray-700"
                  >
                    close
                  </div>
                </div>
              </label>
              <textarea
                minLength={5}
                required
                rows="9"
                name="description"
                onChange={(e) => {
                  setdata({ ...data, message: e.target.value });
                }}
                type="text"
                placeholder="Type your message here . . ."
                className="input focus:outline-none p-2 input-bordered input-success w-full h-fit"
              ></textarea>
              <button
                name="edit"
                type="button"
                onClick={handleSubmit}
                className="bg-blue-600 mt-3 rounded p-1 h-fit text-white"
              >
                Send Now
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="m-4 h-full ">
          <div className="flex justify-between">
            <h3 className="font-bold font-mono text-2xl">Past Messages</h3>
            <p
              className="text-blue-600 underline cursor-pointer text-sm mt-2"
              onClick={() => setIsFormVisible(true)}
            >
              Send a new message
            </p>
          </div>
          <div
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="mt-4  overflow-scroll"
          >
            {notifications?.length !== 0 ? (
              notifications?.map((notify) => (
                <div
                  key={notify.id}
                  className="flex border-2 m-2 items-center justify-between p-2"
                >
                  <div className="text-sm font-bold text-gray-800">
                    {notify.message}
                  </div>
                  <div className="text-gray-600  text-bold   font-bold text-sm">
                    {new Date(notify.createdAt).getDate()}-
                    {new Date(notify.createdAt).toLocaleString("default", {
                      month: "short",
                    })}
                  </div>
                </div>
              ))
            ) : (
              <div>{"no recent messages"}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mailbox;
