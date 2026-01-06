import React, { createContext } from "react";

export const AppContext = createContext();

// Re-export from AppProvider for backward compatibility
export { AppProvider, useAppContext } from "./AppProvider";
