export default function Dashboard({
  onLogout,
  onOpenPatients,
  onOpenDecisions,
  onOpenAnalysis,
}: {
  onLogout: () => void;
  onOpenPatients: () => void;
  onOpenDecisions: () => void;
  onOpenAnalysis: () => void;
}) {
  return (
    <div className="grid">
      <section className="card">
        <div className="cardHeader">
          <div>
            <h2>Dashboard</h2>
            <p>Acceso a módulos del sistema.</p>
          </div>
          <span className="badge">Sesión activa</span>
        </div>

        <div className="kpiRow">
          <div className="kpi">
            <strong>Módulos</strong>
            <span>3 activos</span>
          </div>
          <div className="kpi">
            <strong>Persistencia</strong>
            <span>Base de datos activa</span>
          </div>
          <div className="kpi">
            <strong>Modelo IA</strong>
            <span>v1.0</span>
          </div>
        </div>

        <div className="btnRow" style={{ marginTop: 16 }}>
          <button className="btn btnPrimary" onClick={onOpenPatients}>
            Pacientes (CRUD)
          </button>

          <button className="btn btnGhost" onClick={onOpenAnalysis}>
            Nuevo análisis IA
          </button>

          <button className="btn btnGhost" onClick={onOpenDecisions}>
            Historial IA
          </button>

          <button className="btn btnDanger" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>

        <hr className="sep" />

        <p className="small">
          Flujo demostrable: Login → Dashboard → Pacientes / Nuevo análisis / Historial IA.
        </p>
      </section>
    </div>
  );
}