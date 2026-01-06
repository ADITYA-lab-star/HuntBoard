import React from "react";
import { useAppContext } from "../contexts/AppContext";
import { Briefcase, Sparkles } from "../utils/Icons";

const Analytics = () => {
  const { allJobs = [], columns } = useAppContext();

  const statusCounts = columns.map((status) => ({
    status,
    count: (allJobs || []).filter((job) => job.status === status).length,
  }));

  const total = allJobs?.length || 0;
  const progressSegments = statusCounts.map(({ status, count }) => ({
    status,
    count,
    percentage: total > 0 ? (count / total) * 100 : 0,
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case "Wishlist":
        return "bg-blue-200";
      case "Applied":
        return "bg-yellow-400";
      case "Interview":
        return "bg-blue-600";
      case "Offer":
        return "bg-green-500";
      case "Rejected":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 mb-6">
      <div className="flex items-center mb-4">
        <Sparkles className="w-6 h-6 text-slate-900 mr-2" />
        <h2 className="text-xl font-semibold text-slate-900">
          Application Analytics
        </h2>
      </div>
      <div className="flex items-center mb-4">
        <Briefcase className="w-5 h-5 text-slate-600 mr-2" />
        <span className="text-slate-600">Total Applications: {total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div className="flex h-4 rounded-full overflow-hidden">
          {progressSegments.map(({ status, percentage }, index) => (
            <div
              key={status}
              className={`${getStatusColor(status)} h-full`}
              style={{ width: `${percentage}%` }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {statusCounts.map(({ status, count }) => (
          <div key={status} className="text-center">
            <div
              className={`w-4 h-4 rounded-full ${getStatusColor(
                status
              )} mx-auto mb-2`}
            ></div>
            <div className="text-sm font-medium text-slate-900">{status}</div>
            <div className="text-lg font-bold text-slate-900">{count}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
