import React from "react";
import { useAppContext } from "../contexts/AppContext";
import Column from "./Column";

const KanbanBoard = ({ onAddJob }) => {
  const { columns, updateJobStatus } = useAppContext();

  const handleDropJob = (jobId, newStatus) => {
    updateJobStatus(jobId, newStatus);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 pb-4">
      {columns.map((status) => (
        <Column
          key={status}
          status={status}
          onAddJob={() => onAddJob(status)}
          onDropJob={handleDropJob}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
