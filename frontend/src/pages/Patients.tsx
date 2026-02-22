import { useEffect, useState } from "react";


type Patient = {
  id: number;
  full_name: string;
  age: number;
  gender: string;
};


const API = "http://127.0.0.1:8000/api";

export default function Patients({ onBack }: { onBack: () => void }) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  const [full_name, setFullName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState("M");

  const [editingId, setEditingId] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch(`${API}/patients`);
    const data = await res.json();
    setPatients(data);
    setLoading(false);
  }

  useEffect(() => {
  let alive = true;

  (async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/patients`);
      const data = await res.json();

      if (!alive) return;
      setPatients(data);
    } catch (e) {
      console.error(e);
    } finally {
      if (alive) setLoading(false);
    }
  })();

  return () => {
    alive = false;
  };
}, []);
  async function createPatient() {
    const res = await fetch(`${API}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, age, gender }),
    });

    if (!res.ok) {
      alert("Error creando paciente");
      return;
    }
    setFullName("");
    setAge(0);
    setGender("M");
    await load();
  }

  async function startEdit(p: Patient) {
    setEditingId(p.id);
    setFullName(p.full_name);
    setAge(p.age);
    setGender(p.gender);
  }

  async function saveEdit() {
    if (editingId === null) return;

    const res = await fetch(`${API}/patients/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, age, gender }),
    });

    if (!res.ok) {
      alert("Error actualizando paciente");
      return;
    }

    setEditingId(null);
    setFullName("");
    setAge(0);
    setGender("M");
    await load();
  }

  async function remove(id: number) {
    const ok = confirm("¿Eliminar este paciente?");
    if (!ok) return;

    const res = await fetch(`${API}/patients/${id}`, { method: "DELETE" });
    if (!res.ok) {
      alert("Error eliminando paciente");
      return;
    }
    await load();
  }

  return (
    <div className="grid">
      <section className="card">
        <div className="cardHeader">
          <div>
            <h2>Pacientes</h2>
          </div>
          <span className="badge">{loading ? "Cargando..." : `${patients.length} registros`}</span>
        </div>

        <div className="btnRow" style={{ marginBottom: 12 }}>
          <button className="btn btnGhost" onClick={onBack}>⬅ Volver</button>
          <button className="btn btnGhost" onClick={load}>↻ Refrescar</button>
        </div>

        {loading ? (
          <p className="small">Cargando listado...</p>
        ) : patients.length === 0 ? (
          <p className="small">No hay pacientes registrados todavía.</p>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {patients.map((p) => (
              <div key={p.id} className="kpi" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong>{p.full_name}</strong>
                  <span>ID: {p.id} • Edad: {p.age} • Género: {p.gender}</span>
                </div>

                <div className="btnRow" style={{ margin: 0 }}>
                  <button className="btn btnGhost" onClick={() => startEdit(p)}>Editar</button>
                  <button className="btn btnDanger" onClick={() => remove(p.id)}>Eliminar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <aside className="card">
        <div className="cardHeader">
          <div>
            <h2>{editingId ? "Editar paciente" : "Nuevo paciente"}</h2>
            <p>Formulario conectado al backend.</p>
          </div>
          <span className="badge">{editingId ? `ID ${editingId}` : "Create"}</span>
        </div>

        <div className="form">
          <div>
            <div className="label">Nombre completo</div>
            <input className="input" value={full_name} onChange={(e) => setFullName(e.target.value)} />
          </div>

          <div>
            <div className="label">Edad</div>
            <input className="input" type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>

          <div>
            <div className="label">Género</div>
            <select className="input" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="M">M</option>
              <option value="F">F</option>
              <option value="Otro">Otro</option>
            </select>
          </div>

          <div className="btnRow">
            {editingId ? (
              <>
                <button className="btn btnPrimary" onClick={saveEdit}>Guardar cambios</button>
                <button className="btn btnGhost" onClick={() => setEditingId(null)}>Cancelar</button>
              </>
            ) : (
              <button className="btn btnPrimary" onClick={createPatient}>Crear paciente</button>
            )}
          </div>

          <p className="small">
            * Este módulo ya implementa Create/Read/Update/Delete usando endpoints del backend y persiste en BD.
          </p>
        </div>
      </aside>
    </div>
  );
}
