import { useState } from "react";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Decisions from "./pages/Decisions";


type View = "dashboard" | "patients" | "decisions";


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState<View>("dashboard");

  if (!isLoggedIn) {
    return (
      <Layout>
        <Login onLogin={() => setIsLoggedIn(true)} />
      </Layout>
    );
  }

  return (
    <Layout>
      {view === "dashboard" ? (
        <Dashboard
          onLogout={() => setIsLoggedIn(false)}
          onOpenPatients={() => setView("patients")}
          onOpenDecisions={() => setView("decisions")}

        />

        
      ) : (
        <Patients onBack={() => setView("dashboard")} />
        
      )}
        {view === "decisions" && (
          <Decisions onBack={() => setView("dashboard")} />
        )}

      
    </Layout>
  );
}
