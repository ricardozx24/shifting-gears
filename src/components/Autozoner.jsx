import React, { useState, useContext, memo } from "react";
import { AutozonerFilterContext } from "../contexts/AutozonerFilterContext";
import { AutozonerProvider, AutozonerContext } from "../contexts/AutozonerContext";
import AutozonerDelete from "./AutozonerDelete";
import ErrorBoundary from "./ErrorBoundary";

function Session({ title, room }) {
  return (
    <span className="session w-100">
      {title} <strong>Location: {room.name}  <br></br>  Importance level: {room.capacity}</strong> 
    </span>
  );
}

function Sessions() {
  const { eventYear } = useContext(AutozonerFilterContext);
  const { autozoner } = useContext(AutozonerContext);
  const sessions = autozoner.sessions;
  return (
    <div className="sessionBox card h-250">
      {sessions
        .filter(function (session) {
          return session.eventYear === eventYear;
        })
        .map(function (session) {
          return (
            <div className="session w-100" key={session.id}>
              <Session {...session} />
            </div>
          );
        })}
    </div>
  );
}

function AutozonerImage() {
  const {
    autozoner: { id, first, last },
  } = useContext(AutozonerContext);
  return (
    <div className="autozoner-img d-flex flex-row justify-content-center align-items-center h-300">
      <img
        className="contain-fit"
        src={`/images/autozoner-${id}.jpg`}
        width="300"
        alt={`${first} ${last}`}
      />
    </div>
  );
}

function AutozonerFavorite() {
  const { autozoner, updateRecord } = useContext(AutozonerContext);
  const [inTransition, setInTransition] = useState(false);
  function doneCallback() {
    setInTransition(false);
    console.log(
      `In AutozonerFavorite:doneCallback    ${new Date().getMilliseconds()}`
    );
  }

  return (
    <div className="action padB1">
      <span
        onClick={function () {
          setInTransition(true);
          updateRecord(
            {
              ...autozoner,
              favorite: !autozoner.favorite,
            },
            doneCallback
          );
        }}
      >
        <i
          className={
            autozoner.favorite === true
              ? "fa fa-star orange"
              : "fa fa-star-o orange"
          }
        />{" "}
        Favorite{" "}
        {inTransition ? (
          <span className="fas fa-circle-notch fa-spin"></span>
        ) : null}
      </span>
    </div>
  );
}

function AutozonerDemographics() {
  const { autozoner } = useContext(AutozonerContext);
  const { first, last, bio, company, twitterHandle, favorite } = autozoner;
  return (
    <div className="autozoner-info">
      <div className="d-flex justify-content-between mb-3">
        <h3 className="text-truncate w-200">
          {first} {last}
        </h3>
      </div>
      <AutozonerFavorite />
      <div>
        <p className="card-description">{bio.substr(0, 70)}</p>
        <div className="social d-flex flex-row mt-4">
          <div className="company">
            <h5>Company</h5>
            <h6>{company}</h6>
          </div>
          <div className="twitter">
            <h5>Twitter</h5>
            <h6>{twitterHandle}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

const AutozonerNoErrorBoundary = memo(function Autozoner({
  autozoner,
  updateRecord,
  insertRecord,
  deleteRecord,
  showRecordCard,
}) {
  const { showSessions } = useContext(AutozonerFilterContext);
  console.log(`autozoner: ${autozoner.id} ${autozoner.first} ${autozoner.last}`);

  if (showRecordCard) {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <img src="/images/autozoner-99999.jpg" />
          <div>
            <b>Error Showing Autozoner</b>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AutozonerProvider
      autozoner={autozoner}
      updateRecord={updateRecord}
      insertRecord={insertRecord}
      deleteRecord={deleteRecord}
    >
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-sm-12 col-xs-12">
        <div className="card card-height p-4 mt-4">
          <AutozonerImage />
          <AutozonerDemographics />
        </div>
        {showSessions === true ? <Sessions /> : null}
        <AutozonerDelete />
      </div>
    </AutozonerProvider>
  );
},
areEqualAutozoner);

function Autozoner(props) {
  return (
    <ErrorBoundary
      errorUI={<AutozonerNoErrorBoundary {...props} showRecordCard={true}>

      </AutozonerNoErrorBoundary>}
    >
      <AutozonerNoErrorBoundary {...props}></AutozonerNoErrorBoundary>
    </ErrorBoundary>
  );
}

function areEqualAutozoner(prevProps, nextProps) {
  return prevProps.autozoner.favorite === nextProps.autozoner.favorite;
}

export default Autozoner;