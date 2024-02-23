import { useContext } from "react";
import { AutozonerContext } from "../contexts/AutozonerContext";

function AutozonerDelete() {
  const { autozoner, deleteRecord } = useContext(AutozonerContext);

  return (
    <span className="session w-100">
      <a href="#" className="remSes">
        <i
          onClick={(e) => {
            e.preventDefault();
            if (
              window.confirm("Are you sure you want to delete this autozoner?")
            ) {
              deleteRecord(autozoner);
            }
          }}
        >
          -
        </i>
      </a>
      <span className="padL2">Delete Autozoner</span>
    </span>
  );
}

export default AutozonerDelete;