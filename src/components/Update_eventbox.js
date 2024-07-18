import React from "react";

const Modalbox = ({
  name,
  setphoto,
  description,
  venue,
  eventtime,
  price,
  id,
  handleedit,
  onchange,
  // Function to close the modal
}) => {
  const handleClose = () => {
    document.getElementById(`update_event_${id}`).close();
  };
  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="bg-white rounded-md h-3/4 overflow-scroll w-11/12 sm:w-full lg:w-4/6 relative" // Add relative positioning to the parent div
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 bg-gray-200 rounded-full p-1"
      >
        X
      </button>

      <form method="dialog">
        <div className="m-4 items-center flex flex-col">
          <h3 className="font-bold font-mono text-2xl">Edit here</h3>
          <div className="mb-2.5 w-5/6 container flex flex-col items-center justify-center">
            <label className="form-control w-full">
              <span className="label-text flex flex-col">
                <h1 className="text-lg m-2">Name</h1>
              </span>
            </label>
            <input
              minLength={3}
              required
              defaultValue={name}
              name="name"
              onChange={onchange}
              type="text"
              className="input focus:outline-none input-bordered input-success w-full"
            />

            <label className="form-control w-full">
              <span className="label-text flex flex-col">
                <h1 className="text-lg m-2">Description</h1>
              </span>
            </label>
            <textarea
              minLength={5}
              defaultValue={description}
              required
              rows="8"
              name="description"
              onChange={onchange}
              type="text"
              placeholder="Type here"
              className="input focus:outline-none input-bordered input-success w-full h-fit"
            ></textarea>

            <label className="form-control w-full">
              <span className="label-text flex flex-col">
                <h1 className="text-lg m-2">Venue</h1>
              </span>
            </label>
            <input
              name="venue"
              defaultValue={venue}
              onChange={onchange}
              type="text"
              placeholder="Type here"
              className="input mb-5 focus:outline-none input-bordered input-success w-full"
            />

            <label className="form-control w-full">
              <span className="label-text flex flex-col">
                <h1 className="text-lg m-2">Eventtime</h1>
              </span>
            </label>
            <input
              name="eventtime"
              defaultValue={eventtime}
              onChange={onchange}
              type="datetime-local"
              placeholder="Type here"
              className="input mb-5 focus:outline-none input-bordered input-success w-full"
            />

            <label className="form-control w-full">
              <span className="label-text flex flex-col">
                <h1 className="text-lg m-2">Price</h1>
              </span>
            </label>
            <input
              name="price"
              defaultValue={price}
              onChange={onchange}
              type="text"
              placeholder="Type here"
              className="input mb-5 focus:outline-none input-bordered input-success w-full"
            />

            <input
              name="photo"
              type="file"
              onChange={(e) => {
                setphoto(e.target.files[0]);
              }}
              className="file-input focus:outline-none text-md file-input-bordered w-full"
            />

            <button
              name="edit"
              value={id}
              type="button"
              onClick={handleedit}
              className="bg-blue-600 mt-3 rounded p-1 h-fit text-white"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modalbox;
