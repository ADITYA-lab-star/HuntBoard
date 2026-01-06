import React, { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { Trash, MapPin } from "../utils/Icons";

const Card = ({ job }) => {
  const { deleteJob } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteJob(job.id);
  };
    

  return (
    <div
      className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-4 mb-3 cursor-move hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] transition-shadow duration-200 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", job.id);
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-slate-900 text-sm">{job.company}</h3>
        {isHovered && (
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition-colors"
          >
            <Trash className="w-4 h-4" />
          </button>
        )}
      </div>
      <p className="text-slate-700 text-xs mb-2">{job.role}</p>
      <div className="flex items-center text-slate-600 text-xs mb-1">
        <MapPin className="w-3 h-3 mr-1" />
        {job.location}
      </div>
      <p className="text-slate-600 text-xs mb-1">{job.salary}</p>
      <p className="text-slate-500 text-xs">
        {new Date(job.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Card;
