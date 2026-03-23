import { useState } from "react";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Decisions from "./pages/Decisions";
import NewAnalysis from "./pages/NewAnalysis";

type View = "dashboard" | "patients" | "decisions" | "analysis";

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
      {view === "dashboard" && (
        <Dashboard
          onLogout={() => setIsLoggedIn(false)}
          onOpenPatients={() => setView("patients")}
          onOpenDecisions={() => setView("decisions")}
          onOpenAnalysis={() => setView("analysis")}
        />
      )}

      {view === "patients" && <Patients onBack={() => setView("dashboard")} />}

      {view === "decisions" && <Decisions onBack={() => setView("dashboard")} />}

      {view === "analysis" && (
        <NewAnalysis
          onBack={() => setView("dashboard")}
          onGoHistory={() => setView("decisions")}
        />
      )}
    </Layout>
  );
}