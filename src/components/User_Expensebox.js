import React, { useState, useEffect, useContext } from "react";
import { Eventcontext } from "../context/Event_State";
import { useNavigate } from "react-router-dom";

const Expensebox = ({ id, name }) => {
  const navigate = useNavigate();
  const { get_all_expenses, add_expenses } = useContext(Eventcontext);
  const [formFlag, setFormFlag] = useState(true);
  const [loader, setLoader] = useState(true);
  const [entries, setEntries] = useState([]);
  const [form, setform] = useState({
    amount: 0,
    type: "income",
    source: "",
    event: id,
  });
  const [showTables, setShowTables] = useState(false);

  const fetchExpenses = async () => {
    setShowTables(true);
    const response = await get_all_expenses(id);
    setLoader(false);
    setEntries(response.data);
  };

  const handleChange = ({ target: { name, value } }) => {
    setform({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    if (!form.amount && !form.source) {
      alert("Please enter both amount and source");
      return;
    }
    e.preventDefault();
    add_expenses(form);
    setShowTables(true);
    fetchExpenses();
  };

  const handleClose = () => {
    document.getElementById(`update_expense_${id}`).close();
  };

  const renderTable = (type) => (
    <div className="h-full w-full flex flex-col justify-center lg:m-2 overflow-hidden">
      <h2 className="text-center text-xl mb-4">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </h2>
      <div
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        className="h-2/3 overflow-y-scroll"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {entries?.length != 0 &&
              entries
                .filter(
                  (entry) =>
                    entry.type === type.split(" ")[0] ||
                    entry.type === type.split(" ")[1]
                )
                .map((entry) => (
                  <tr key={entry._id}>
                    <td className="px-6 py-4 text-sm text-black">
                      {entry.amount} &#8377;
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {entry.source}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString("default", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-white flex flex-col justify-center rounded-md  lg:h-3/4 md:h-2/3 h-1/2 md:w-3/4   w-11/12 lg:w-6/12">
      <div className="flex justify-center items-center">
        {!showTables && (
          <form
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onSubmit={handleSubmit}
            className="bg-white  p-6 lg:h-fit w-full  md:h-3/4 md:overflow-y-scroll rounded-lg shadow-lg lg:w-3/4  relative"
          >
            <div className="flex gap-3 justify-center">
              <button
                type="button"
                onClick={fetchExpenses}
                className="text-sm  underline absolute top-2 right-13 text-blue-500 hover:text-gray-700"
              >
                {"<-back"}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="text-sm  underline absolute top-2 right-2 text-blue-500 hover:text-gray-700"
              >
                {"close"}
              </button>
            </div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="enter the amount . . ."
              value={form.amount}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 border-b-2 sm:text-sm p-2"
              required
            />
            <br />

            <label
              htmlFor="source"
              className="block text-sm font-medium text-gray-700"
            >
              Source
            </label>
            <input
              type="text"
              id="source"
              name="source"
              placeholder="add a source name . . ."
              value={form.source}
              onChange={handleChange}
              className="mt-1 block w-full focus:outline-none border-b-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
              required
            />
            <br />

            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700"
            >
              Notes
            </label>
            <input
              type="text"
              id="notes"
              name="notes"
              placeholder="add a note  . . ."
              value={form.notes}
              onChange={handleChange}
              className="mt-1 block w-full focus:outline-none border-b-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
            />
            <br />

            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <select
              id="type"
              name="type"
              onChange={handleChange}
              className="mt-1 block w-full focus:outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-500 sm:text-sm p-2"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <br />
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-600"
            >
              Insert
            </button>
          </form>
        )}
      </div>
      {showTables && (
        <div className="flex flex-col h-3/4 justify-center items-center">
          <button
            type="button"
            onClick={handleClose}
            className="text-sm  underline absolute top-10 right-10 text-blue-500 hover:text-gray-700"
          >
            {"X"}
          </button>{" "}
          <div className="flex justify-center  font-semibold text-center text-2xl lg:text-2xl text-black">
            Your Exepnses for {name}
          </div>
          <div className="flex lg:flex-row h-full flex-col  w-full">
            {renderTable("income audience")}
            {renderTable("expense")}
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                setFormFlag(true);
                setShowTables(false);
              }}
              className="mt-5 border-2 w-fit bg-green-400 p-1 rounded-md text-white"
            >
              Add new data
            </button>
            <button
              onClick={handleClose}
              // onClick={() => {
              //   navigate("/expenses");
              // }}
              className="mt-5 border-2 w-fit bg-blue-500 p-1 rounded-md text-white"
            >
              Close Tab
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expensebox;
