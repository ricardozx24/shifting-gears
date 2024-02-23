import Header from "./Header";
import Autozoners from "./Autozoners";
import Layout from "./Layout";
import { AuthProvider } from "../contexts/AuthContext";

function App() {
  return (
    <AuthProvider initialLoggedInUser="Ricardo">
    <Layout startingTheme="light">
      <div>
        <Header />
        <Autozoners />
      </div>
    </Layout>
    </AuthProvider>
  );
}

export default App;