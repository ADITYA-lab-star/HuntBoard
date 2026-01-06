import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "./AppContext";
import { mockData, columns } from "../data/mockData";
import axios from "axios";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

const API_URL = "http://localhost:5000/api/applications";

const getData = async () => {
  try {
    const response = await axios.get(API_URL);
    const result = response.data;
    console.log("Data fetched successfully:", result);

    // Map MongoDB field names to frontend field names
    const mappedData = result.map((item) => ({
      id: item._id,
      company: item.companyName || "",
      role: item.role || "",
      salary: item.salary || "N/A",
      date: item.dateApplied
        ? new Date(item.dateApplied).toLocaleDateString()
        : "",
      status: item.status || "Wishlist",
      location: item.location || "Remote",
      description: item.notes || "",
    }));

    console.log("Mapped data:", mappedData);
    return mappedData;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};

const sendData = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    const result = response.data;
    console.log("Data sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending data:", error.message);
    return null;
  }
};

const delData = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    const result = response.data;
    console.log("Data deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting data:", error.message);
    return null;
  }
};

const uptData = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, data);
    const result = response.data;
    console.log("Data updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating data:", error.message);
    return null;
  }
};

export const AppProvider = ({ children }) => {
  const [jobs, setJobs] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [initialStatus, setInitialStatus] = useState("Wishlist");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getData().then((data) => {
      console.log("Setting jobs to:", data);
      setJobs(data || []);
      setLoading(false);
    });
  }, []);

  const addJob = (newJob) => {
    // Map frontend field names to backend field names
    const backendJob = {
      companyName: newJob.company,
      role: newJob.role,
      salary: newJob.salary || "N/A",
      location: newJob.location || "Remote",
      status: newJob.status || "Wishlist",
      notes: newJob.description || "",
    };

    const tempId = Date.now();
    setJobs([...jobs, { ...newJob, id: tempId }]);

    sendData(backendJob).then((savedJob) => {
      if (savedJob) {
        // Replace temp ID with actual MongoDB ID
        setJobs((prevJobs) =>
          prevJobs.map((job) =>
            job.id === tempId ? { ...newJob, id: savedJob._id } : job
          )
        );
      } else {
        // Remove job if save failed
        setJobs((prevJobs) => prevJobs.filter((job) => job.id !== tempId));
      }
    });
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
    delData(id).then((result) => {
      if (result) {
        console.log(`Job with id ${id} deleted from backend`);
      }
    });
  };

  const updateJobStatus = (id, newStatus) => {
    // Update UI immediately for better UX
    setJobs(
      jobs.map((job) => (job.id === id ? { ...job, status: newStatus } : job))
    );

    // Update backend
    uptData(id, { status: newStatus }).then((result) => {
      if (!result) {
        // If backend update fails, revert the UI change
        setJobs(
          jobs.map((job) =>
            job.id === id ? { ...job, status: job.status } : job
          )
        );
        console.error(
          `Failed to update job with id ${id} to status ${newStatus}`
        );
      } else {
        console.log(
          `Job with id ${id} updated to status ${newStatus} in backend`
        );
      }
    });
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (job?.company || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job?.role || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job?.location || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppContext.Provider
      value={{
        jobs: filteredJobs, // For search/filter features
        allJobs: jobs, // For Kanban board display
        searchTerm,
        setSearchTerm,
        isAddModalOpen,
        setIsAddModalOpen,
        initialStatus,
        setInitialStatus,
        addJob,
        deleteJob,
        updateJobStatus,
        columns,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
