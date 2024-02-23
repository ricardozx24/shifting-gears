import ShiftingGearsToolbar from "./ShiftingGearsToolbar";
import AutozonersList from "./AutozonersList";
import { AutozonerFilterProvider } from "../contexts/AutozonerFilterContext";

function Autozoners() {
  return (
    <AutozonerFilterProvider startingShowSessions={false}>
      <ShiftingGearsToolbar />
      <AutozonersList />
    </AutozonerFilterProvider>
  );
}

export default Autozoners;