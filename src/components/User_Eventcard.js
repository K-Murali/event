import { IMAGE_URL } from "../utils/api";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eventcontext } from "../context/Event_State";
import Modalbox from "./Update_eventbox";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { BiLogoGmail } from "react-icons/bi";
import { FaMinusCircle } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import {
  IoCheckmarkDoneCircle,
  IoCheckmarkDoneCircleOutline,
} from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa"; // Importing FontAwesome icons
import "./noteitem.css";
import Expensebox from "./User_Expensebox";
import Mailbox from "./User_Mailbox";

const UserEventsdetail = (props) => {
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
  const navigate = useNavigate();
  const { delete_event, update_event } = useContext(Eventcontext);

  const [photo, setphoto] = useState(null);
  const [newevent, setnewevent] = useState({
    photo: props.photo,
  });

  
  const handleedit = async () => {
    if (photo) {
      const cloudinary = new FormData();
      cloudinary.append("file", photo);
      cloudinary.append("upload_preset", "Event-manager");
      cloudinary.append("cloud_name", "drfvhp1jh");
      const options = {
        method: "POST",
        body: cloudinary,
      };
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/drfvhp1jh/image/upload`,
        options
      );
      const ans = await res.json();
      newevent.photo = ans.url?.split("upload/")[1];
    }

    const eventid = props.id;
    await update_event(newevent, eventid);
  };

  const onchange = (e) => {
    setnewevent({ ...newevent, [e.target.name]: e.target.value });
  };

  const handle_delete = () => {
    const ans = confirm("Are you sure u want to delete this");
    const eventid = props.id;
    if (ans) {
      delete_event(eventid);
    }
  };
  const handleclick = () => {
    document.getElementById(`update_event_${props.id}`).showModal();
  };
  const handleexpenseclick = () => {
    document.getElementById(`update_expense_${props.id}`).showModal();
  };
  const handle_mailclick = () => {
    document.getElementById(`send_mail_${props.id}`).showModal();
  };

  return (
    <div className=" lg:w-fit w-full md:w-1/2  h-fit shadow-sm rounded-lg border m-5 relative">
      <div className="note-card card overflow-hidden bg-base-100 shadow-xl">
        <div className="card-body p-2 gap-3">
          <div className="flex gap-3 w-fit flex-wrap flex-col justify-between lg:flex-row">
            <div className="flex">
              <img
                className="h-auto  w-full md:w-full lg:w-64   border rounded-md"
                alt=""
                src={`${IMAGE_URL}/${props.photo}`}
              />
            </div>

            <div className="flex mr-6 flex-col justify-center">
              <div className="h-fit flex flex-row justify-center overflow-hidden">
                <h1 className="text-xl font-semibold text-center">
                  <div
                    onClick={() => {
                      localStorage.setItem("eventid", props.id),
                        console.log(props.id),
                        navigate("/readmore");
                    }}
                    className="cursor-pointer  hover:text-blue-500"
                  >
                    {props.name} summary{" "}
                  </div>
                </h1>
                <div>
                  {props.reviewed ? (
                    <div className="flex text-xl  text-green-500 justify-center items-center ">
                      <span className="mb-1">&nbsp;&nbsp;</span>
                      <IoCheckmarkDoneCircle />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center  ">
                      <span className="mb-1">&nbsp;&nbsp;</span>
                      <IoCheckmarkDoneCircleOutline />
                    </div>
                  )}
                </div>

                {/* <p className="mt-2 font-serif">
              {props.description.slice(0, 200)} . . . .
            </p> */}
              </div>
              <div className="flex text-left gap-2 flex-row mt-8  justify-evenly">
                <div className="flex gap-3 flex-col">
                  <div className="flex p-1 border-2 rounded cursor-pointer hover:text-blue-500   w-36 justify-center items-center">
                    <span>{props.registered} Registered</span>
                    &nbsp;
                    <AiOutlineFileDone className="text-green-600 w-5 h-5" />
                  </div>
                  <div className="flex p-1 border-2 rounded  w-36 justify-center items-center">
                    <span>{props.reached} Reached</span>
                    &nbsp;
                    <BsGraphUpArrow className=" text-blue-500 w-4 h-4" />
                  </div>
                  <div
                    onClick={handleclick}
                    className="flex p-1 border-2  cursor-pointer hover:text-blue-500   rounded  w-36 justify-center items-center"
                  >
                    <span>Update</span>
                    &nbsp;
                    <FaRegEdit className="w-4 h-4" />
                  </div>
                  <div
                    onClick={handle_delete}
                    className="flex p-1 border-2 cursor-pointer hover:text-red-500 rounded  w-36 justify-center items-center"
                  >
                    <span>Delete</span>
                    &nbsp;
                    <AiOutlineDelete className="text-red-400 w-5 h-5" />
                  </div>
                </div>
                <div className="flex gap-3 flex-col">
                  <div className="flex p-1 border-2 cursor-pointer hover:text-blue-500  rounded  w-36 justify-center items-center">
                    <span>
                      {props.stats
                        ? props.stats[0]
                          ? props.stats[0].totalIncome
                          : "0k"
                        : "0k"}{" "}
                      Income
                    </span>
                    &nbsp;
                    <RiMoneyRupeeCircleFill className=" text-green-600 w-5 h-5" />
                  </div>
                  <div className="flex p-1 border-2 rounded cursor-pointer hover:text-blue-500   w-36 justify-center items-center">
                    <span>
                      {" "}
                      {props.stats
                        ? props.stats[0]
                          ? props.stats[0].totalExpense
                          : "0k"
                        : "0k"}{" "}
                      Expense
                    </span>
                    &nbsp;
                    <FaMinusCircle className="text-red-400 w-5 h-4" />
                  </div>
                  <div
                    onClick={handleexpenseclick}
                    className="flex p-1 border-2 rounded  cursor-pointer hover:text-blue-500   w-36 justify-center items-center"
                  >
                    <span>Add Expense</span>
                    &nbsp;
                    <HiPlusCircle className=" text-black w-5 h-5" />
                  </div>
                  <div
                    onClick={handle_mailclick}
                    className="flex p-1 border-2 rounded  cursor-pointer hover:text-blue-500 w-36 justify-center items-center"
                  >
                    <span>Send mail</span>
                    &nbsp;
                    <BiLogoGmail className=" text-gray-500 w-4 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <dialog id={`update_event_${props.id}`} className="modal">
          <Modalbox
            name={props.name}
            description={props.description}
            venue={props.venue}
            key={props.id}
            eventtime={props.eventtime}
            price={props.price}
            id={props.id}
            setphoto={setphoto}
            handleedit={handleedit}
            onchange={onchange}
          />
        </dialog>
        <dialog id={`update_expense_${props.id}`} className="modal">
          <Expensebox
            name={props.name}
            description={props.description}
            venue={props.venue}
            key={props.id}
            eventtime={props.eventtime}
            price={props.price}
            id={props.id}
            setphoto={setphoto}
            handleedit={handleedit}
            onchange={onchange}
          />
        </dialog>
        <dialog id={`send_mail_${props.id}`} className="modal">
          <Mailbox key={props.id} name={props.name} id={props.id}></Mailbox>
        </dialog>
      </div>
    </div>
  );
};

export default UserEventsdetail;
