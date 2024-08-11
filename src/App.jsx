import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import TableHead from "./Table-Head";
import TableBody from "./Table-Body";
import { GlobalContext } from "./Context";

function App() {

  const { list, addTask, taskName, taskStatus, hadleTaskName, handleTaskStatus, setTaskStatus, setTaskName, enableEdit, makeEdit } = useContext(GlobalContext);

  function handleButton() {
    if (taskName.length > 0 && taskStatus) {
      console.log(`${taskName}  ${taskStatus}`);

      addTask(taskName, taskStatus)
      setTaskName('');
      setTaskStatus('completed');
    } else {
      alert("Enter task details");
    }
  }

  function handleEditButton() {
    if (taskName.length > 0 && taskStatus) {
      makeEdit(taskName, taskStatus);
    } else {
      alert("Enter task details");
    }
  }

  return (
    <div className="py-5 px-4 sm:px-28">
      <h2 className="mb-4 text-[#222831] text-center font-semibold text-xl md:text-3xl md:mb-8">
        To-Do Application
      </h2>

      <div className="flex justify-center mb-5">
        <input
          type="text"
          name="taskName"
          value={taskName}
          onChange={hadleTaskName}
          className="mr-3 px-2 w-1/3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 text-xs sm:text-sm"
          placeholder="Enter task name"
        />

        <select value={taskStatus} onChange={handleTaskStatus} className="mr-3 px-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-600 text-xs sm:text-sm">
          <option value="completed">Completed</option>
          <option value="not completed">Not completed</option>
        </select>

        <button
          className="bg-black text-white p-2 rounded-lg text-xs md:text-sm"
          onClick={enableEdit ? handleEditButton : handleButton}
        >{enableEdit ? "Edit task" : "Add task"}
        </button>
      </div>

      <div className="block text-center mb-5 md:hidden">
        <h1>
          Tap to <span className="text-blue-600">Edit</span> - Swipe to <span className="text-red-600">Delete</span>
        </h1>
      </div>


      <div className="container mx-auto">
        <div className="overflow-x-auto">

          <table className="min-w-full border-collapse  ">
            <TableHead />
            <tbody>
              {list.map(item =>
                <TableBody key={item.id} task={item} />
              )}
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
}

export default App;
