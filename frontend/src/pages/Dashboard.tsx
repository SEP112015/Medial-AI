export default function Dashboard({
  onLogout,
  onOpenPatients,
  onOpenDecisions,
}: {
  onLogout: () => void;
  onOpenPatients: () => void;
  onOpenDecisions: () => void;
}) {
  return (
    <div className="grid">
      <section className="card">
        <div className="cardHeader">
          <div>
            <h2>Dashboard</h2>
            <div className="kpiRow">
  <div className="kpi">
    <strong>Módulos</strong>
    <span>3</span>
  </div>
  <div className="kpi">
    <strong>Persistencia</strong>
    <span>Activa</span>
  </div>
  <div className="kpi">
    <strong>Modelo IA</strong>
    <span>v1.0</span>
  </div>
</div>
          </div>
          <span className="badge">Sesión activa</span>
        </div>

        <div className="btnRow" style={{ marginTop: 12 }}>
          <button className="btn btnPrimary" onClick={onOpenPatients}>
            Pacientes
          </button>

          <button className="btn btnGhost" onClick={onOpenDecisions}>
            Historial
          </button>

          <button className="btn btnDanger" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>

        <p className="small">
        </p>
      </section>
    </div>
  );
}
