import React from "react";
// import img1 from "./images/899048.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Eventcontext } from "../context/Event_State";
import Alert from "./Alert";
import { CiBellOn } from "react-icons/ci";
import { IMAGE_URL } from "../utils/api";
import Loader from "./Loadingbar";
export default function Navbar({ user, setuser }) {
  const navigate = useNavigate();

  const { alert, get_notify, setalert } = useContext(Eventcontext);
  const [notify, setnotify] = useState([]);

  const [load, setload] = useState(false);
  useEffect(() => {
    const call = async () => {
      await handlenotify();
    };
    call();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("theme", "light");
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setalert(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, [alert, setalert]);
  const handlenotify = async () => {
    if (!user) {
      return;
    }
    setload(true);
    try {
      const res = await get_notify();
      setnotify(res.data);
      setload(false);
    } catch (error) {
      console.log("Failed to fetch notifications", error);
    }
  };

  const handlelogout = (e) => {
    e.preventDefault();
    setuser(null);
    localStorage.setItem("token", "");
    localStorage.setItem("role", "user");
    navigate("/signup");
  };

  return (
    <>
      {/* {theme === "light" ? "dark" : "light"} */}
      {/* {theme === "light" ? "dark" : "light"} */}
      <Loader />
      <div data-theme="dark">
        <div data-theme="dark">
          <div className="navbar  bg-base-100 h-fit ">
            <div className="navbar-start">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to="/addevent" className="text-lg">
                      Host Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/event" className="text-lg">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/myevents" className="text-lg">
                      My Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/registered" className="text-lg">
                      Registered
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/newevents"
                      className={`${
                        localStorage.getItem("role") === "admin" ? "" : "hidden"
                      }  text-lg`}
                    >
                      New Events
                    </Link>
                  </li>
                  {/* <li><Link to='/about' className='text-lg'>About me</Link></li> */}
                  {/* <li tabIndex={0}>
                    <details>
                      <summary><Link to='/addnotes' className='text-lg'>Checkout</Link> </summary>
                      <ul className="p-2 my-1">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                        <li><a>Submenu 3</a></li>
                        <li><a>Submenu 4</a></li>
                      </ul>
                    </details>
                  </li> */}
                  {/* <li><Link  to='/contact'  className='text-lg'>Contact us</Link></li> */}

                  {/* <li><Link to='/about' className='text-lg'>About</Link></li> */}
                  {/* <li tabIndex={0}>
                    <details>
                      <summary><Link to='/addnotes' className='text-lg'>Checkout</Link> </summary>
                      <ul className="p-2 my-1">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                        <li><a>Submenu 3</a></li>
                        <li><a>Submenu 4</a></li>
                      </ul>
                    </details>
                  </li> */}

                  {/* <li><Link  to='/contact'  className='text-lg'>Contact us</Link></li> */}
                </ul>
              </div>
              <Link to="Event" className="btn btn-ghost normal-case text-xl">
                Event Planner
              </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
              <ul className="menu menu-horizontal p-0">
                <li>
                  <Link to="/addevent" className="text-lg">
                    Host Events
                  </Link>
                </li>
                <li>
                  <Link to="/event" className="text-lg">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/myevents" className="text-lg">
                    My Events
                  </Link>
                </li>
                <li>
                  <Link to="/registered" className="text-lg">
                    Registered
                  </Link>
                </li>
                <li>
                  <Link
                    to="/newevents"
                    className={`${
                      localStorage.getItem("role") === "admin" ? "" : "hidden"
                    }  text-lg`}
                  >
                    New Events
                  </Link>
                </li>
                {/* <li><Link to='/about' className='text-lg'>About me</Link></li> */}
                {/* <li tabIndex={0}>
                    <details>
                      <summary><Link to='/addnotes' className='text-lg'>Checkout</Link> </summary>
                      <ul className="p-2 my-1">
                        <li><a>Submenu 1</a></li>
                        <li><a>Submenu 2</a></li>
                        <li><a>Submenu 3</a></li>
                        <li><a>Submenu 4</a></li>
                      </ul>
                    </details>
                  </li> */}
                {/* <li><Link  to='/contact'  className='text-lg'>Contact us</Link></li> */}
              </ul>
            </div>

            <div className="navbar-end">
              {user && (
                <div className="dropdown dropdown-bottom dropdown-end">
                  <div
                    onClick={handlenotify}
                    tabIndex={0}
                    role="button"
                    className="relative btn-ghost p-2 text-blue-100 rounded"
                  >
                    <CiBellOn className="w-7 h-7" />
                    <span className="absolute bg-green-700 text-green-100 p-1 text-xs font-bold rounded-full -top-2 right-5">
                      {notify.length}+
                    </span>
                  </div>
                  {
                    <div
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                      tabIndex={0}
                      className="dropdown-content menu bg-white rounded-box z-[1] mt-2 w-80  h-fit max-h-64   p-2 shadow"
                    >
                      <div
                        style={{
                          scrollbarWidth: "none",
                        }}
                        className="h-full overflow-y-scroll"
                      >
                        {user && notify?.length > 0 ? (
                          notify.map((e) => {
                            return (
                              <div
                                className="text-black justify-between p-2  flex"
                                key={e._id}
                              >
                                <div className="text-sm   text-gray-800">
                                  <span className="text-blue-500 underline font-bold">
                                    {e.eventname}
                                  </span>{" "}
                                  : {e.message}
                                </div>
                                <div className="text-gray-600  text-bold   font-bold text-sm">
                                  {new Date(e.createdAt).getDate()}{" "}
                                  {new Date(e.createdAt).toLocaleString(
                                    "default",
                                    {
                                      month: "short",
                                    }
                                  )}
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="flex justify-center items-center h-fit p-2 text-xl ">
                            {"no new notifications"}
                          </div>
                        )}
                      </div>
                    </div>
                  }
                </div>
              )}
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full  ">
                  <img
                    src={`${IMAGE_URL}/${`v1719489972/ktr7kxohfxoxht7wqyap.jpg`}
                `}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100  rounded-box w-52"
              >
                {user && (
                  <>
                    <li>
                      {" "}
                      <div className="justify-between">
                        {user.name}
                        <span className="badge">New</span>
                      </div>{" "}
                    </li>
                    <li>
                      <div className="justify-between">
                        Wallet : INR {user.income} Rs
                      </div>{" "}
                    </li>
                  </>
                )}
                {!user && (
                  <li>
                    <Link to="/signup">Log in</Link>
                  </li>
                )}
                {user && (
                  <li>
                    <Link onClick={handlelogout}>Logout</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {alert && <Alert message="This is deleted" />}
    </>
  );
}
