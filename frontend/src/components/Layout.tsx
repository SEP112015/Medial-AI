import { ReactNode } from "react";

export default function Layout({
  children,
  right,
}: {
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="container">
      <header className="topbar">
        <div className="brand">
          <div className="logo">AI</div>
          <div>
            <h1>Medical AI Platform</h1>
            <p>Decisiones médicas asistidas por IA • Avance 1</p>
          </div>
        </div>

        <div className="actions">
          <span className="badge">Frontend: Vite + React + TS</span>
          <span className="badge">Backend: FastAPI</span>
          {right}
        </div>
      </header>

      <main>{children}</main>

      <div className="footer">
        © 2026 • Proyecto Final • ITLA
      </div>
    </div>
  );
}
