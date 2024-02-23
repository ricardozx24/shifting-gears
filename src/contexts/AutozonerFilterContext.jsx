import React, { createContext } from "react";
import useAutozonerFilter from "../hooks/useAutozonerFilter";

const AutozonerFilterContext = createContext();

function AutozonerFilterProvider({
  children,
  startingShowSessions = false,
  startingEventYear = "2023",
}) {
  const {
    showSessions,
    setShowSessions,
    eventYear,
    setEventYear,
    searchQuery,
    setSearchQuery,
    EVENT_YEARS,
  } = useAutozonerFilter(startingShowSessions, startingEventYear);

  return (
    <AutozonerFilterContext.Provider
      value={{
        showSessions,
        setShowSessions,
        eventYear,
        setEventYear,
        searchQuery,
        setSearchQuery,
        EVENT_YEARS,
      }}
    >
      {children}
    </AutozonerFilterContext.Provider>
  );
}

export { AutozonerFilterContext, AutozonerFilterProvider };