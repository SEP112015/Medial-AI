import { useEffect, useState } from "react";

type Decision = {
  id: number;
  patient_id: string;
  risk_level: string;
  scenarios: string;
  recommendations: string;
  created_at: string;
};

const API = "http://127.0.0.1:8000/api";

export default function Decisions({ onBack }: { onBack: () => void }) {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
  let alive = true;

  (async () => {
    try {
      const res = await fetch(`${API}/decisions`);
      const data = await res.json();

      if (!alive) return;
      setDecisions(data);
    } catch (e) {
      console.error(e);
    }
  })();

  return () => {
    alive = false;
  };
}, []);


  return (
    <div className="card">
      <h2>Historial de decisiones IA</h2>

      <button className="btn btnGhost" onClick={onBack}>
        ⬅ Volver
      </button>

      {decisions.length === 0 ? (
        <p>No hay decisiones registradas.</p>
      ) : (
        <div style={{ marginTop: 15 }}>
          {decisions.map((d) => {
  const scenarios = JSON.parse(d.scenarios || "[]") as {
    name: string;
    probability: number;
  }[];

  const recs = JSON.parse(d.recommendations || "[]") as string[];

  return (
    <div key={d.id} className="kpi" style={{ marginBottom: 10 }}>
      <strong>Paciente: {d.patient_id}</strong>
      <span>Riesgo: {d.risk_level}</span>
      <span>Fecha: {d.created_at}</span>

      <div style={{ marginTop: 10 }}>
        <strong>Escenarios</strong>
        <ul className="list">
          {scenarios.map((s, i) => (
            <li key={i}>
              {s.name} — {(s.probability * 100).toFixed(0)}%
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 10 }}>
        <strong>Recomendaciones</strong>
        <ul className="list">
          {recs.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
})}
        </div>
      )}
    </div>
  );
}
