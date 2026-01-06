import React from "react";
import { useAppContext } from "../contexts/AppContext";
import Card from "./Card";
import { Plus } from "../utils/Icons";

const Column = ({ status, onAddJob, onDropJob }) => {
  const { allJobs = [] } = useAppContext();
  const columnJobs = (allJobs || []).filter((job) => job.status === status);

  const handleDrop = (e) => {
    e.preventDefault();
    const jobId = e.dataTransfer.getData("text/plain");
    onDropJob(jobId, status);
  };

  //handle drag over to allow drop 
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-slate-50 rounded-3xl p-4 w-full md:min-w-[280px] md:max-w-[280px] flex flex-col"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-900 text-sm">{status}</h3>
        <div className="flex items-center">
          <span className="text-slate-600 text-xs mr-2">
            {columnJobs.length}
          </span>
          <button
            onClick={() => onAddJob(status)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {columnJobs.map((job) => (
          <Card key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default Column;
