import { createContext } from "react";

const AutozonerContext = createContext();

function AutozonerProvider({
  children,
  autozoner,
  updateRecord,
  insertRecord,
  deleteRecord,
}) {
  return (
    <AutozonerContext.Provider
      value={{ autozoner, updateRecord, insertRecord, deleteRecord }}
    >
      {children}
    </AutozonerContext.Provider>
  );
}

export { AutozonerContext, AutozonerProvider };