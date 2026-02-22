export default function Login({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="grid">
      <section className="card">
        <div className="cardHeader">
          <div>
            <h2>Iniciar Sesion</h2>
        
          </div>
          <span className="badge">Demo</span>
        </div>

        <hr className="sep" />

        <div className="form">
          <div>
            <div className="label">Correo</div>
            <input className="input" type="email" placeholder="usuario@correo.com" />
          </div>

          <div>
            <div className="label">Contraseña</div>
            <input className="input" type="password" placeholder="********" />
          </div>

          <div className="btnRow">
            <button className="btn btnPrimary" onClick={onLogin}>
              Entrar
            </button>
          </div>
        </div>
      </section>

      <aside className="card">
        <div className="cardHeader">
          <div>
            <h2>Estado del avance</h2>
            <p>Módulos iniciales y endpoints base.</p>
          </div>
          <span className="badge">v0.1</span>
        </div>

        <div className="kpiRow">
          <div className="kpi">
            <strong style={{ color: "var(--ok)" }}>Backend OK</strong>
            <span>/api/health</span>
          </div>
          <div className="kpi">
            <strong>IA (simulada)</strong>
            <span>/api/analysis</span>
          </div>
          <div className="kpi">
            <strong>Pacientes</strong>
            <span>/api/patients (placeholder)</span>
          </div>
        </div>
      </aside>
    </div>
  );
}
