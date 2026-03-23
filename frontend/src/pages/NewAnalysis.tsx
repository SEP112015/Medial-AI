import { useState } from "react";

const API = "http://127.0.0.1:8000/api";

type AnalysisResponse = {
  diagnostic_scenarios: {
    name: string;
    probability: number;
  }[];
  risk_level: string;
  recommendations: string[];
  model_version?: string;
};

export default function NewAnalysis({
  onBack,
  onGoHistory,
}: {
  onBack: () => void;
  onGoHistory: () => void;
}) {
  const [patientId, setPatientId] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [history, setHistory] = useState("");
  const [results, setResults] = useState("");
  const [response, setResponse] = useState<AnalysisResponse | null>(null);


  
  async function handleAnalyze() {
    try {
      const res = await fetch(`${API}/analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patient_id: patientId,
          symptoms: symptoms.split(","),
          history: history.split(","),
          results: results.split(","),
        }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="card">
      <h2>Nuevo análisis IA</h2>

      <button className="btn btnGhost" onClick={onBack}>
        ⬅ Volver
      </button>

      <div className="form" style={{ marginTop: 15 }}>
        <input
          placeholder="ID Paciente"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />

        <input
          placeholder="Síntomas (coma separados)"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
        />

        <input
          placeholder="Historial (coma separados)"
          value={history}
          onChange={(e) => setHistory(e.target.value)}
        />

        <input
          placeholder="Resultados (coma separados)"
          value={results}
          onChange={(e) => setResults(e.target.value)}
        />

        <button className="btn btnPrimary" onClick={handleAnalyze}>
          Ejecutar análisis
        </button>
      </div>

      {response && (
        <div style={{ marginTop: 20 }}>
          <h3>Resultado</h3>

          <p><strong>Riesgo:</strong> {response.risk_level}</p>

          <p><strong>Modelo:</strong> {response.model_version}</p>

          <h4>Escenarios</h4>
          <ul>
            {response.diagnostic_scenarios?.map((s, i) => (
              <li key={i}>
                {s.name} - {(s.probability * 100).toFixed(0)}%
              </li>
            ))}
          </ul>

          <h4>Recomendaciones</h4>
          <ul>
            {response.recommendations?.map((r: string, i: number) => (
              <li key={i}>{r}</li>
            ))}
          </ul>

          <button
            className="btn btnGhost"
            style={{ marginTop: 10 }}
            onClick={onGoHistory}
          >
            Ver historial
          </button>
        </div>
      )}
    </div>
  );
}