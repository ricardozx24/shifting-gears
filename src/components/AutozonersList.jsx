import { useContext } from "react";
import Autozoner from "./Autozoner";
import ReactPlaceHolder from "react-placeholder";
import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay";
import { data } from "../AutozonerData";
import { AutozonerFilterContext } from "../contexts/AutozonerFilterContext";
import AutozonerAdd from './AutozonerAdd';

function AutozonersList() {
  const {
    data: autozonersData,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  } = useRequestDelay(2000, data);

  const { searchQuery, eventYear } = useContext(AutozonerFilterContext);

  if (requestStatus === REQUEST_STATUS.FAILURE) {
    return (
      <div className="text-danger">
        ERROR: <b>loading Autozoner Data Failed {error}</b>
      </div>
    );
  }

  //if (isLoading === true) return <div>Loading...</div>

  return (
    <div className="container autozoners-list">
      <ReactPlaceHolder
        type="media"
        rows={15}
        className="autozonerslist-placeholder"
        ready={requestStatus === REQUEST_STATUS.SUCCESS}
      >
        <AutozonerAdd eventYear={eventYear} insertRecord={insertRecord} />
        <div className="row">
          {autozonersData
            .filter(function (autozoner) {
              return (
                autozoner.first.toLowerCase().includes(searchQuery) ||
                autozoner.last.toLowerCase().includes(searchQuery)
              );
            })
            .filter(function (autozoner) {
              return autozoner.sessions.find((session) => {
                return session.eventYear === eventYear;
              });
            })
            .map(function (autozoner) {
              return (
                <Autozoner
                  key={autozoner.id}
                  autozoner={autozoner}
                  updateRecord={updateRecord}
                  insertRecord={insertRecord}
                  deleteRecord={deleteRecord}
                />
              );
            })}
        </div>
      </ReactPlaceHolder>
    </div>
  );
}

export default AutozonersList;