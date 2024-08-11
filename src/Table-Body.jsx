import React, { useContext, useState } from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import { GlobalContext } from './Context';


export default function TableBody(props) {

    const { task } = props;
    const { removeTask, editTask, enableEdit, setEnableEdit } = useContext(GlobalContext);

    const [startTouch, setStartTouch] = useState(null);

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setStartTouch({ x: touch.clientX, y: touch.clientY });
    };

    const handleTouchMove = (e) => {
        if (!startTouch) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - startTouch.x;
        const deltaY = touch.clientY - startTouch.y;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
            if (deltaX > 0) {
                if (window.confirm("Are you sure to delete?")) {
                    removeTask(task?.id);
                }
            } else {
                console.log("Swipe Left");
            }
            setStartTouch(null);
        }
    };

    function handleDelete(id) {
        if (window.confirm("Are you sure to delete?")) {
            removeTask(task?.id);
        }
    }

    function handleEdit(id) {
        setEnableEdit(!enableEdit);
        editTask(id);
    }

    return (
        <tr className="hover:bg-gray-100 border-b-2 border-[#abaeb1]" onClick={() => handleEdit(task?.id)} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
            <td className="py-3 text-center w-1/12 sm:w-1/6 md:w-1/12">
                {task?.id}
            </td>
            <td className="py-3 px-10 text-start w-8/12 sm:w-5/12 md:w-4/12">
                {task?.name}
            </td>
            <td className="py-2 text-center w-2/12 sm:w-4/12 md:w-2/12">
                <div
                    onClick={() => console.log("status clicked")}
                    className={task?.status === 'not completed' ? "bg-red-500 px-4 py-1 rounded-md text-xs md:text-sm cursor-pointer" : "bg-green-500 px-4 py-1 rounded-md text-xs md:text-sm cursor-pointer"}
                >
                    {task?.status}
                </div>
            </td>
            <td className="hidden md:table-cell w-1/12 px-4 py-3 text-center text-gray-700 font-medium border">
                <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEdit(task?.id)}
                >
                    <FaEdit />
                </button>
            </td>
            <td className="hidden md:table-cell w-1/12 px-4 py-3 text-center text-gray-700 font-medium border">
                <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(task?.id)}
                >
                    <FaTrash />
                </button>
            </td>
        </tr>

    )
}
