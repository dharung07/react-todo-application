import React from 'react'

export default function TableHead() {
    return (
        <thead className="border-b-2 border-[#222831]">
            <tr>
                <th className="py-3 text-center text-gray-700 font-medium">
                    #
                </th>
                <th className="py-3 px-4 text-center text-gray-700 font-medium">
                    Task Name
                </th>
                <th className="py-3 px-4 text-center text-gray-700 font-medium">
                    Status
                </th>
                <th className="hidden md:table-cell w-1/12 px-4 py-3 text-center text-gray-700 font-medium">
                    Edit
                </th>
                <th className="hidden md:table-cell w-1/12 px-4 py-3 text-center text-gray-700 font-medium">
                    Remove
                </th>
            </tr>
        </thead>
    )
}
