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

function getRiskColor(risk: string) {
  if (risk === "high") return "#ff4d4f";
  if (risk === "moderate") return "#fa8c16";
  return "#52c41a";
}

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
            let scenarios: { name: string; probability: number }[] = [];
            let recs: string[] = [];

            try {
  scenarios = JSON.parse(d.scenarios || "[]");
} catch (e) {
  console.error("Error parseando escenarios", e);
}
try {
  recs = JSON.parse(d.recommendations || "[]");
} catch (e) {
  console.error("Error parseando recomendaciones", e);
}

            return (
              <div key={d.id} className="kpi" style={{ marginBottom: 14 }}>
                <strong>Paciente: {d.patient_id}</strong>
                <span style={{ color: getRiskColor(d.risk_level), display: "block", marginTop: 4 }}>
                  Riesgo: {d.risk_level}
                </span>
                <span style={{ display: "block", marginTop: 4 }}>
                  Fecha: {d.created_at}
                </span>

                <div style={{ marginTop: 12 }}>
                  <strong>Escenarios</strong>
                  <ul className="list">
                    {scenarios.map((s, i) => (
                      <li key={i}>
                        {s.name} — {(s.probability * 100).toFixed(0)}%
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginTop: 12 }}>
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