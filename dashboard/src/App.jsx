import { useState, useMemo } from "react";

// ═══════════════════════════════════════════════════════════
// MOCK DATABASE — Multiple clients for the list view
// ═══════════════════════════════════════════════════════════
const CLIENTS = [
  {
    id: "abc-aluminum",
    nombre: "ABC Aluminum",
    razonSocial: "ALUMINIO DE BAJA CALIFORNIA SA DE CV",
    rfc: "ABC991012BF0",
    fechaConstitucion: "12/10/1999",
    antiguedad: "26 años",
    actividad: "Industria de Aluminio",
    giro: "Manufactura — Extrusión, Fabricación, Acabados y Ensamblaje",
    direccion: "Monferrato 6701, San Antonio de los Buenos, Tijuana, B.C. C.P. 22563",
    paginaWeb: "https://es.abc-aluminum.com/",
    ejecutivoComercial: "Ramiro Magaña",
    referenciador: "Carlos Adrián Mejía Rodríguez",
    obligadoSolidario: "Wadih Kuri Rendón",
    depositarioLegal: "Wadih Kuri Rendón",
    accionistas: [
      { nombre: "Jorge Kuri Rojo", monto: 102260348, porcentaje: 99.99 },
      { nombre: "Diana Luz Rendón Tolibia", monto: 10227, porcentaje: 0.01 },
    ],
    calificacion: {
      score: 711, maxScore: 1000, riesgo: "Medio",
      situacionJuridica: { status: "ok", texto: "Sin incidencias como Demandado" },
      listasNegras: { status: "warning", texto: "Reportado por INFONAVIT en listado de aportantes incumplidos" },
      opinonSAT: { status: "ok", texto: "Positivo" },
      accionistas: { status: "ok", texto: "Sin incidencias como Demandado" },
      rug: { status: "info", texto: "Reporta Activos Mobiliarios en Garantía" },
    },
    financiamiento: {
      producto: "Arrendamiento / Sale & Lease Back",
      tipoEquipo: "Equipo de Subestación Eléctrica",
      valorFactura: 40000000, plazo: 48, tasaVNA: "22.50%",
      comisionApertura: "2.50%", rentaMensualSIVA: 1095798,
      rentaMensualCIVA: 1271126, tir: "26.32%",
      valorResidual: "0.00%", opcionCompra: "3.20%",
      enganche: "0.00%", rentasDeposito: 1,
    },
    activo: {
      descripcionGeneral: "Equipo de Subestaciones Eléctricas Transformadoras",
      ilustracion: "/abc-aluminum/asset-photo.png",
      operaciones: [
        {
          tipo: "Arrendamiento Puro",
          items: [
            { descripcion: "Equipo de Suministro SIESSA", costoUSD: 1292204 },
            { descripcion: "2 Bancos Capacitadores y 2 Eq Primarios", costoUSD: 484435 },
          ],
          totalUSD: 1776639,
        },
        {
          tipo: "Sale & Lease Back",
          items: [
            { descripcion: "Brazo RA85 7AX + RSX Hexagon", costoUSD: 139324 },
            { descripcion: "Interruptor de Potencia Tipo Tanque", costoUSD: 200873 },
          ],
          totalUSD: 340196,
        },
      ],
      totalGeneralUSD: 2116835.10,
    },
    organigrama: "/abc-aluminum/organigrama.png",
    buroCredito: {
      puntaje: 771, gradoRiesgo: "A-1", incumplimiento: "0.9%",
      cuentasAbiertas: 94, montoOriginal: 2824406, saldoActual: 2079889,
      estatus: "Vigente — Sin atraso",
    },
    pasivosFinancieros: {
      totalOriginal: 2543270067, totalSaldo: 1910349175,
      principales: [
        { institucion: "BANAMEX", saldo: 553576044, color: "#4F8EF7" },
        { institucion: "SANTANDER", saldo: 386560000, color: "#E74C3C" },
        { institucion: "BBVA", saldo: 347260068, color: "#2ECC71" },
        { institucion: "BANORTE", saldo: 289920981, color: "#F39C12" },
        { institucion: "BANBAJIO", saldo: 193280000, color: "#9B59B6" },
        { institucion: "ACTIVE LEAS.", saldo: 78090107, color: "#E67E22" },
        { institucion: "ENGEN CAP.", saldo: 35820177, color: "#1ABC9C" },
        { institucion: "ARR. BANORTE", saldo: 10046888, color: "#95A5A6" },
      ],
    },
    estadoCuenta: { cobertura: 17.44 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 6112338 }, { p: "Dic 2024", v: 5487767 }, { p: "May 2025", v: 2069838 }],
      ebitda: [{ p: "Dic 2023", v: 457521 }, { p: "Dic 2024", v: 397829 }, { p: "May 2025", v: 150541 }],
    },
    statusGeneral: "en_revision",
    montoSolicitado: 40000000,
    fechaSolicitud: "Sep 2025",
  },
  {
    id: "grupo-constructor-pacifico",
    nombre: "Grupo Constructor Pacífico",
    razonSocial: "GRUPO CONSTRUCTOR PACÍFICO SA DE CV",
    rfc: "GCP180523LA9",
    fechaConstitucion: "23/05/2018",
    antiguedad: "7 años",
    actividad: "Construcción",
    giro: "Construcción — Obra civil, infraestructura y desarrollos inmobiliarios",
    direccion: "Av. Revolución 1850, Col. San Ángel, CDMX, C.P. 01000",
    paginaWeb: "https://www.gcpacifico.com.mx",
    ejecutivoComercial: "Laura Méndez",
    referenciador: "Antonio Flores Vega",
    obligadoSolidario: "Roberto Sánchez Mora",
    depositarioLegal: "Roberto Sánchez Mora",
    accionistas: [
      { nombre: "Roberto Sánchez Mora", monto: 45000000, porcentaje: 60.0 },
      { nombre: "Elena Torres Ruiz", monto: 30000000, porcentaje: 40.0 },
    ],
    calificacion: {
      score: 782, maxScore: 1000, riesgo: "Bajo",
      situacionJuridica: { status: "ok", texto: "Sin incidencias" },
      listasNegras: { status: "ok", texto: "Sin reportes" },
      opinonSAT: { status: "ok", texto: "Positivo" },
      accionistas: { status: "ok", texto: "Sin incidencias" },
      rug: { status: "ok", texto: "Sin reportes" },
    },
    financiamiento: {
      producto: "Arrendamiento Puro",
      tipoEquipo: "Maquinaria Pesada — Excavadoras y Retroexcavadoras",
      valorFactura: 28500000, plazo: 36, tasaVNA: "19.80%",
      comisionApertura: "2.00%", rentaMensualSIVA: 985420,
      rentaMensualCIVA: 1143087, tir: "23.50%",
      valorResidual: "1.00%", opcionCompra: "2.80%",
      enganche: "10.00%", rentasDeposito: 2,
    },
    activo: {
      descripcionGeneral: "Maquinaria Pesada para Obra Civil",
      operaciones: [
        {
          tipo: "Arrendamiento Puro",
          items: [
            { descripcion: "Excavadora CAT 320 GC Next Gen", costoUSD: 485000 },
            { descripcion: "Retroexcavadora CAT 420F2 IT", costoUSD: 125000 },
            { descripcion: "Cargador Frontal CAT 950 GC", costoUSD: 320000 },
          ],
          totalUSD: 930000,
        },
      ],
      totalGeneralUSD: 930000,
    },
    buroCredito: {
      puntaje: 805, gradoRiesgo: "A-1", incumplimiento: "0.3%",
      cuentasAbiertas: 12, montoOriginal: 450000, saldoActual: 285000,
      estatus: "Vigente — Sin atraso",
    },
    pasivosFinancieros: {
      totalOriginal: 185000000, totalSaldo: 122000000,
      principales: [
        { institucion: "BBVA", saldo: 62000000, color: "#2ECC71" },
        { institucion: "BANORTE", saldo: 38000000, color: "#F39C12" },
        { institucion: "BANBAJIO", saldo: 22000000, color: "#9B59B6" },
      ],
    },
    estadoCuenta: { cobertura: 8.5 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 320000 }, { p: "Dic 2024", v: 410000 }, { p: "May 2025", v: 195000 }],
      ebitda: [{ p: "Dic 2023", v: 48000 }, { p: "Dic 2024", v: 62000 }, { p: "May 2025", v: 28000 }],
    },
    statusGeneral: "aprobado",
    montoSolicitado: 28500000,
    fechaSolicitud: "Ago 2025",
  },
  {
    id: "alimentos-del-norte",
    nombre: "Alimentos del Norte",
    razonSocial: "ALIMENTOS DEL NORTE SA DE CV",
    rfc: "ANO150312KJ7",
    fechaConstitucion: "12/03/2015",
    antiguedad: "10 años",
    actividad: "Alimentos y Bebidas",
    giro: "Manufactura — Procesamiento y empaque de alimentos",
    direccion: "Carr. a Saltillo Km 8.5, Monterrey, N.L. C.P. 64700",
    paginaWeb: "https://www.alimentosdelnorte.mx",
    ejecutivoComercial: "Fernando Ríos",
    referenciador: "Miguel Ángel Garza",
    obligadoSolidario: "Patricia Villarreal López",
    depositarioLegal: "Patricia Villarreal López",
    accionistas: [
      { nombre: "Patricia Villarreal López", monto: 18000000, porcentaje: 75.0 },
      { nombre: "Carlos Villarreal López", monto: 6000000, porcentaje: 25.0 },
    ],
    calificacion: {
      score: 645, maxScore: 1000, riesgo: "Medio",
      situacionJuridica: { status: "ok", texto: "Sin incidencias" },
      listasNegras: { status: "ok", texto: "Sin reportes" },
      opinonSAT: { status: "warning", texto: "Con observaciones menores" },
      accionistas: { status: "ok", texto: "Sin incidencias" },
      rug: { status: "ok", texto: "Sin reportes" },
    },
    financiamiento: {
      producto: "Arrendamiento Puro",
      tipoEquipo: "Línea de Empaque Automatizada",
      valorFactura: 15800000, plazo: 36, tasaVNA: "21.00%",
      comisionApertura: "2.50%", rentaMensualSIVA: 562300,
      rentaMensualCIVA: 652268, tir: "24.80%",
      valorResidual: "0.00%", opcionCompra: "3.00%",
      enganche: "5.00%", rentasDeposito: 1,
    },
    activo: {
      descripcionGeneral: "Línea de Empaque Automatizada para Alimentos",
      operaciones: [
        {
          tipo: "Arrendamiento Puro",
          items: [
            { descripcion: "Empacadora Vertical Multihead Ishida CCW-RV", costoUSD: 420000 },
            { descripcion: "Sistema de Bandas Transportadoras Inox", costoUSD: 185000 },
          ],
          totalUSD: 605000,
        },
      ],
      totalGeneralUSD: 605000,
    },
    buroCredito: {
      puntaje: 698, gradoRiesgo: "A-2", incumplimiento: "1.8%",
      cuentasAbiertas: 8, montoOriginal: 180000, saldoActual: 95000,
      estatus: "Vigente — Sin atraso",
    },
    pasivosFinancieros: {
      totalOriginal: 62000000, totalSaldo: 41000000,
      principales: [
        { institucion: "BANAMEX", saldo: 25000000, color: "#4F8EF7" },
        { institucion: "BBVA", saldo: 16000000, color: "#2ECC71" },
      ],
    },
    estadoCuenta: { cobertura: 5.2 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 185000 }, { p: "Dic 2024", v: 210000 }, { p: "May 2025", v: 98000 }],
      ebitda: [{ p: "Dic 2023", v: 22000 }, { p: "Dic 2024", v: 28000 }, { p: "May 2025", v: 11000 }],
    },
    statusGeneral: "en_revision",
    montoSolicitado: 15800000,
    fechaSolicitud: "Sep 2025",
  },
  {
    id: "logistica-express-mx",
    nombre: "Logística Express MX",
    razonSocial: "LOGÍSTICA EXPRESS DE MÉXICO SA DE CV",
    rfc: "LEM200814PQ2",
    fechaConstitucion: "14/08/2020",
    antiguedad: "5 años",
    actividad: "Transporte y Logística",
    giro: "Servicios — Transporte de carga terrestre y almacenaje",
    direccion: "Blvd. Aeropuerto 4520, San Luis Potosí, S.L.P. C.P. 78395",
    paginaWeb: "https://www.logexpressmx.com",
    ejecutivoComercial: "Ramiro Magaña",
    referenciador: "José Luis Martínez",
    obligadoSolidario: "Andrés Montoya Rivas",
    depositarioLegal: "Andrés Montoya Rivas",
    accionistas: [
      { nombre: "Andrés Montoya Rivas", monto: 8500000, porcentaje: 85.0 },
      { nombre: "Sofía Montoya Rivas", monto: 1500000, porcentaje: 15.0 },
    ],
    calificacion: {
      score: 520, maxScore: 1000, riesgo: "Alto",
      situacionJuridica: { status: "ok", texto: "Sin incidencias" },
      listasNegras: { status: "warning", texto: "Reportado en listado IMSS por adeudo" },
      opinonSAT: { status: "warning", texto: "Negativo — Adeudo fiscal pendiente" },
      accionistas: { status: "ok", texto: "Sin incidencias" },
      rug: { status: "info", texto: "Reporta Activos Mobiliarios en Garantía" },
    },
    financiamiento: {
      producto: "Sale & Lease Back",
      tipoEquipo: "Tractocamiones Kenworth T680",
      valorFactura: 22000000, plazo: 48, tasaVNA: "24.00%",
      comisionApertura: "3.00%", rentaMensualSIVA: 780500,
      rentaMensualCIVA: 905380, tir: "28.10%",
      valorResidual: "0.00%", opcionCompra: "4.00%",
      enganche: "15.00%", rentasDeposito: 2,
    },
    activo: {
      descripcionGeneral: "Flota de Tractocamiones para Transporte de Carga",
      operaciones: [
        {
          tipo: "Sale & Lease Back",
          items: [
            { descripcion: "3x Tractocamión Kenworth T680 2023", costoUSD: 480000 },
            { descripcion: "2x Caja Seca Utility 53' 2023", costoUSD: 120000 },
          ],
          totalUSD: 600000,
        },
      ],
      totalGeneralUSD: 600000,
    },
    buroCredito: {
      puntaje: 635, gradoRiesgo: "B-1", incumplimiento: "4.2%",
      cuentasAbiertas: 6, montoOriginal: 95000, saldoActual: 72000,
      estatus: "Vigente — Atrasos menores",
    },
    pasivosFinancieros: {
      totalOriginal: 48000000, totalSaldo: 35500000,
      principales: [
        { institucion: "BANORTE", saldo: 20000000, color: "#F39C12" },
        { institucion: "BANBAJIO", saldo: 15500000, color: "#9B59B6" },
      ],
    },
    estadoCuenta: { cobertura: 3.1 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 95000 }, { p: "Dic 2024", v: 125000 }, { p: "May 2025", v: 62000 }],
      ebitda: [{ p: "Dic 2023", v: 12000 }, { p: "Dic 2024", v: 18000 }, { p: "May 2025", v: 7500 }],
    },
    statusGeneral: "rechazado",
    montoSolicitado: 22000000,
    fechaSolicitud: "Jul 2025",
  },
];

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
const fmt = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
const fmtUSD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
const fmtShort = (n) => { if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`; if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`; if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`; return `$${n}`; };

const STATUS_MAP = {
  aprobado: { label: "Aprobado", color: "#22C55E", bg: "rgba(34,197,94,0.1)" },
  en_revision: { label: "En Revisión", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  rechazado: { label: "Rechazado", color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  pendiente: { label: "Pendiente", color: "#94A3B8", bg: "rgba(148,163,184,0.1)" },
};

const scoreColor = (s, max) => { const p = s / max; return p >= 0.75 ? "#22C55E" : p >= 0.5 ? "#F59E0B" : "#EF4444"; };

// ═══════════════════════════════════════════════════════════
// MAIN APP — Router between List and Detail
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [selectedClientId, setSelectedClientId] = useState(null);
  const selectedClient = CLIENTS.find((c) => c.id === selectedClientId);

  return (
    <div style={{ minHeight: "100vh", background: "#0B0D10", color: "rgba(255,255,255,0.9)", fontFamily: "'Outfit', 'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: rgba(79,142,247,0.3); }
        input::placeholder { color: rgba(255,255,255,0.25); }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .card-hover { transition: all 0.25s cubic-bezier(.4,0,.2,1); }
        .card-hover:hover { transform: translateY(-3px); border-color: rgba(79,142,247,0.2) !important; box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(79,142,247,0.08); }
      `}</style>

      {/* HEADER — always visible */}
      <Header
        showBack={!!selectedClient}
        onBack={() => setSelectedClientId(null)}
        clientName={selectedClient?.nombre}
      />

      {selectedClient ? (
        <ClientDetail client={selectedClient} />
      ) : (
        <ClientList onSelect={(id) => setSelectedClientId(id)} />
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════
function Header({ showBack, onBack, clientName }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "linear-gradient(180deg, rgba(79,142,247,0.03), transparent)", flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {showBack && (
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, color: "rgba(255,255,255,0.6)", padding: "6px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            ← Clientes
          </button>
        )}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#4F8EF7", lineHeight: 1.05 }}>
          <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: 2.5 }}>IMAGINA</span>
          <span style={{ fontSize: 7.5, letterSpacing: 4, opacity: 0.45, fontWeight: 600 }}>LEASING</span>
        </div>
        <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.06)" }} />
        <div>
          <h1 style={{ fontSize: 14, fontWeight: 700, margin: 0, letterSpacing: "-0.2px" }}>
            {showBack ? clientName : "Panel de Crédito"}
          </h1>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", margin: "1px 0 0" }}>
            {showBack ? "Análisis Ekatena" : "Dashboard Ekatena · Imagina Leasing"}
          </p>
        </div>
      </div>
      {!showBack && (
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          {CLIENTS.length} clientes registrados
        </div>
      )}
    </header>
  );
}

// ═══════════════════════════════════════════════════════════
// CLIENT LIST VIEW
// ═══════════════════════════════════════════════════════════
function ClientList({ onSelect }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("todos");
  const [filterActividad, setFilterActividad] = useState("todos");
  const [sortBy, setSortBy] = useState("nombre");

  const actividades = [...new Set(CLIENTS.map((c) => c.actividad))];

  const filtered = useMemo(() => {
    let list = [...CLIENTS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((c) => c.nombre.toLowerCase().includes(q) || c.razonSocial.toLowerCase().includes(q) || c.rfc.toLowerCase().includes(q));
    }
    if (filterStatus !== "todos") list = list.filter((c) => c.statusGeneral === filterStatus);
    if (filterActividad !== "todos") list = list.filter((c) => c.actividad === filterActividad);
    list.sort((a, b) => {
      if (sortBy === "nombre") return a.nombre.localeCompare(b.nombre);
      if (sortBy === "score") return b.calificacion.score - a.calificacion.score;
      if (sortBy === "monto") return b.montoSolicitado - a.montoSolicitado;
      if (sortBy === "fecha") return 0;
      return 0;
    });
    return list;
  }, [search, filterStatus, filterActividad, sortBy]);

  // Summary KPIs
  const totalMonto = CLIENTS.reduce((s, c) => s + c.montoSolicitado, 0);
  const avgScore = Math.round(CLIENTS.reduce((s, c) => s + c.calificacion.score, 0) / CLIENTS.length);
  const aprobados = CLIENTS.filter((c) => c.statusGeneral === "aprobado").length;
  const enRevision = CLIENTS.filter((c) => c.statusGeneral === "en_revision").length;

  return (
    <main style={{ padding: "24px 28px", maxWidth: 1200, margin: "0 auto" }}>
      {/* KPI STRIP */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24, animation: "fadeUp 0.5s ease" }}>
        <MiniKpi label="Monto Total Solicitado" value={fmt(totalMonto)} color="#4F8EF7" />
        <MiniKpi label="Score Promedio" value={avgScore.toString()} color={scoreColor(avgScore, 1000)} />
        <MiniKpi label="Aprobados" value={aprobados.toString()} color="#22C55E" />
        <MiniKpi label="En Revisión" value={enRevision.toString()} color="#F59E0B" />
      </div>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center", animation: "fadeUp 0.6s ease" }}>
        <input
          type="text"
          placeholder="Buscar por nombre, razón social o RFC..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: "1 1 260px", padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 9, color: "rgba(255,255,255,0.9)", fontSize: 13, fontFamily: "inherit", outline: "none" }}
        />
        <FilterSelect value={filterStatus} onChange={setFilterStatus} options={[{ v: "todos", l: "Todos los estatus" }, { v: "aprobado", l: "Aprobado" }, { v: "en_revision", l: "En Revisión" }, { v: "rechazado", l: "Rechazado" }]} />
        <FilterSelect value={filterActividad} onChange={setFilterActividad} options={[{ v: "todos", l: "Todas las industrias" }, ...actividades.map((a) => ({ v: a, l: a }))]} />
        <FilterSelect value={sortBy} onChange={setSortBy} options={[{ v: "nombre", l: "Ordenar: Nombre" }, { v: "score", l: "Ordenar: Score" }, { v: "monto", l: "Ordenar: Monto" }]} />
      </div>

      {/* CLIENT CARDS */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "rgba(255,255,255,0.2)" }}>
          No se encontraron clientes con esos filtros.
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {filtered.map((c, i) => (
            <ClientCard key={c.id} client={c} onClick={() => onSelect(c.id)} delay={i * 0.07} />
          ))}
        </div>
      )}
    </main>
  );
}

function FilterSelect({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "10px 12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 9, color: "rgba(255,255,255,0.7)", fontSize: 12, fontFamily: "inherit", outline: "none", cursor: "pointer", appearance: "none", minWidth: 150 }}
    >
      {options.map((o) => (
        <option key={o.v} value={o.v} style={{ background: "#1a1d22", color: "#fff" }}>
          {o.l}
        </option>
      ))}
    </select>
  );
}

function MiniKpi({ label, value, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 11, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontSize: 22, fontWeight: 800, color, fontFamily: "'Playfair Display', serif", letterSpacing: "-0.5px" }}>{value}</span>
    </div>
  );
}

function ClientCard({ client: c, onClick, delay }) {
  const st = STATUS_MAP[c.statusGeneral] || STATUS_MAP.pendiente;
  const sc = scoreColor(c.calificacion.score, c.calificacion.maxScore);

  return (
    <div
      className="card-hover"
      onClick={onClick}
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: "20px", cursor: "pointer", animation: `fadeUp 0.5s ease ${delay}s both`, position: "relative", overflow: "hidden" }}
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${sc}, transparent)` }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, letterSpacing: "-0.3px" }}>{c.nombre}</h3>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 3 }}>{c.actividad} · {c.antiguedad}</p>
        </div>
        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 5, background: st.bg, color: st.color, border: `1px solid ${st.color}20`, textTransform: "uppercase", letterSpacing: 0.5, flexShrink: 0 }}>
          {st.label}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: 0.5 }}>Monto Solicitado</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#4F8EF7", marginTop: 2 }}>{fmt(c.montoSolicitado)}</div>
          </div>
          <div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: 0.5 }}>RFC</div>
            <div style={{ fontSize: 12, fontWeight: 500, fontFamily: "monospace", color: "rgba(255,255,255,0.5)", marginTop: 1 }}>{c.rfc}</div>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: sc, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>{c.calificacion.score}</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>Score Ekatena</div>
        </div>
      </div>

      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{c.fechaSolicitud} · {c.financiamiento.producto}</span>
        <span style={{ fontSize: 11, color: "#4F8EF7", fontWeight: 600 }}>Ver detalle →</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CLIENT DETAIL VIEW
// ═══════════════════════════════════════════════════════════
function ClientDetail({ client: c }) {
  const [tab, setTab] = useState("general");
  const tabs = [
    { id: "general", label: "Datos Generales", icon: "◉" },
    { id: "activo", label: "Info del Activo", icon: "⬡" },
    { id: "calificacion", label: "Calificación", icon: "◈" },
    { id: "financiero", label: "Financiero", icon: "◆" },
    { id: "pasivos", label: "Pasivos", icon: "◇" },
    { id: "buro", label: "Buró", icon: "◎" },
  ];

  return (
    <>
      <nav style={{ display: "flex", gap: 3, padding: "10px 28px", borderBottom: "1px solid rgba(255,255,255,0.04)", overflowX: "auto" }}>
        {tabs.map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 15px", border: "none", borderRadius: 7, background: tab === t.id ? "rgba(79,142,247,0.1)" : "transparent", color: tab === t.id ? "#4F8EF7" : "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all 0.2s" }}>
            <span style={{ fontSize: 12 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </nav>
      <main style={{ padding: "22px 28px", maxWidth: 1100, margin: "0 auto", animation: "fadeIn 0.3s ease" }}>
        {tab === "general" && <TabGeneral c={c} />}
        {tab === "activo" && <TabActivo c={c} />}
        {tab === "calificacion" && <TabCalificacion c={c} />}
        {tab === "financiero" && <TabFinanciero c={c} />}
        {tab === "pasivos" && <TabPasivos c={c} />}
        {tab === "buro" && <TabBuro c={c} />}
      </main>
    </>
  );
}

// ── SHARED DETAIL COMPONENTS ──
const C = { card: { background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflow: "hidden" }, head: { display: "flex", alignItems: "center", gap: 8, padding: "14px 18px", borderBottom: "1px solid rgba(255,255,255,0.04)" }, body: { padding: "6px 18px 14px" }, title: { fontSize: 13, fontWeight: 700, margin: 0 }, icon: { color: "#4F8EF7", fontSize: 13 } };

function InfoRow({ label, value, accent, mono }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.03)", gap: 14 }}>
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", flexShrink: 0, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: accent ? 700 : 500, color: accent ? "#4F8EF7" : "rgba(255,255,255,0.8)", textAlign: "right", fontFamily: mono ? "'Courier New', monospace" : "inherit", wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = { ok: { bg: "rgba(34,197,94,0.12)", color: "#22C55E", icon: "✓", label: "OK" }, warning: { bg: "rgba(245,158,11,0.12)", color: "#F59E0B", icon: "⚠", label: "Alerta" }, info: { bg: "rgba(79,142,247,0.12)", color: "#4F8EF7", icon: "ℹ", label: "Info" } };
  const s = map[status] || map.info;
  return (<span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 5, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.color}20`, letterSpacing: "0.5px", textTransform: "uppercase" }}><span style={{ fontSize: 10 }}>{s.icon}</span>{s.label}</span>);
}

function ScoreRing({ score, max = 1000, size = 160 }) {
  const pct = score / max; const r = (size - 14) / 2; const circ = 2 * Math.PI * r; const offset = circ * (1 - pct); const color = scoreColor(score, max);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="8" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)", filter: `drop-shadow(0 0 8px ${color}40)` }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 34, fontWeight: 900, color, fontFamily: "'Playfair Display', serif", letterSpacing: "-1px" }}>{score}</span>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>/ {max}</span>
      </div>
    </div>
  );
}

function MiniBar({ data, height = 100, color = "#4F8EF7" }) {
  const maxVal = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height, width: "100%" }}>
      {data.map((d, i) => {
        const h = maxVal > 0 ? (d.v / maxVal) * height * 0.8 : 0;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>{fmtShort(d.v * 1000)}</span>
            <div style={{ width: "100%", maxWidth: 42, height: h, borderRadius: "5px 5px 2px 2px", background: `linear-gradient(180deg, ${color}, ${color}45)` }} />
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)" }}>{d.p}</span>
          </div>
        );
      })}
    </div>
  );
}

function DebtBar({ data, total }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {data.map((d, i) => {
        const pct = total > 0 ? (d.saldo / total) * 100 : 0;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 90, fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.55)", textAlign: "right", flexShrink: 0 }}>{d.institucion}</div>
            <div style={{ flex: 1, height: 20, background: "rgba(255,255,255,0.03)", borderRadius: 3, overflow: "hidden", position: "relative" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${d.color}BB, ${d.color}45)`, borderRadius: 3 }} />
              <span style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>{fmtShort(d.saldo)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KpiCard({ label, value, color, raw }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 11, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "18px 12px", gap: 5, textAlign: "center" }}>
      <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: 0.6, textTransform: "uppercase" }}>{label}</span>
      <span style={{ fontSize: 19, fontWeight: 800, color, fontFamily: "'Playfair Display', serif" }}>{raw ? value : fmt(value)}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// DETAIL TABS
// ═══════════════════════════════════════════════════════════

function TabGeneral({ c }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
      <div style={C.card}>
        <div style={C.head}><span style={C.icon}>◉</span><h2 style={C.title}>Información de la Empresa</h2></div>
        <div style={C.body}>
          <InfoRow label="Razón Social" value={c.razonSocial} accent />
          <InfoRow label="RFC" value={c.rfc} mono />
          <InfoRow label="Constitución" value={c.fechaConstitucion} />
          <InfoRow label="Antigüedad" value={c.antiguedad} />
          <InfoRow label="Actividad / Giro" value={c.giro} />
          <InfoRow label="Dirección" value={c.direccion} />
          <InfoRow label="Web" value={<a href={c.paginaWeb} target="_blank" rel="noreferrer" style={{ color: "#4F8EF7", textDecoration: "none", fontSize: 12 }}>{c.paginaWeb}</a>} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={C.card}>
          <div style={C.head}><span style={C.icon}>◈</span><h2 style={C.title}>Cuadro Accionario</h2></div>
          <div style={C.body}>
            {c.accionistas.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: i < c.accionistas.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{a.nombre}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{fmt(a.monto)}</div>
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: a.porcentaje > 50 ? "#4F8EF7" : "rgba(255,255,255,0.4)", fontFamily: "'Playfair Display', serif" }}>{a.porcentaje}%</div>
              </div>
            ))}
          </div>
        </div>
        <div style={C.card}>
          <div style={C.head}><span style={C.icon}>◎</span><h2 style={C.title}>Personas Clave</h2></div>
          <div style={C.body}>
            <InfoRow label="Obligado Solidario" value={c.obligadoSolidario} accent />
            <InfoRow label="Depositario Legal" value={c.depositarioLegal} />
            <InfoRow label="Ejecutivo Comercial" value={c.ejecutivoComercial} />
            <InfoRow label="Referenciador" value={c.referenciador} />
          </div>
        </div>
      </div>
    </div>
    {c.organigrama && (
      <div style={C.card}>
        <div style={C.head}><span style={C.icon}>⌬</span><h2 style={C.title}>Organigrama Directivo</h2></div>
        <div style={{ padding: 18, background: "rgba(255,255,255,0.015)", overflowX: "auto" }}>
          <img
            src={c.organigrama}
            alt={`Organigrama directivo — ${c.nombre}`}
            style={{ width: "100%", minWidth: 720, height: "auto", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", background: "#fff" }}
          />
        </div>
      </div>
    )}
    </div>
  );
}

// ── NEW: ACTIVO TAB ──
function TabActivo({ c }) {
  const a = c.activo;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header card */}
      <div style={{ ...C.card, background: "linear-gradient(135deg, rgba(79,142,247,0.04), rgba(255,255,255,0.02))" }}>
        <div style={{ padding: "22px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Descripción General del Activo</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: "rgba(255,255,255,0.95)" }}>{a.descripcionGeneral}</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 4 }}>Total General USD</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#4F8EF7", fontFamily: "'Playfair Display', serif", letterSpacing: "-1px" }}>{fmtUSD(a.totalGeneralUSD)}</div>
          </div>
        </div>
      </div>

      {/* Asset illustration */}
      {a.ilustracion && (
        <div style={C.card}>
          <div style={C.head}><span style={C.icon}>▣</span><h2 style={C.title}>Ilustración del Activo</h2></div>
          <div style={{ padding: 18, display: "flex", justifyContent: "center", background: "rgba(255,255,255,0.015)" }}>
            <img
              src={a.ilustracion}
              alt={`Ilustración del activo — ${a.descripcionGeneral}`}
              style={{ maxWidth: "100%", height: "auto", maxHeight: 480, borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)", objectFit: "contain" }}
            />
          </div>
        </div>
      )}

      {/* Operation cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
        {a.operaciones.map((op, oi) => (
          <div key={oi} style={C.card}>
            <div style={{ ...C.head, background: "rgba(255,255,255,0.01)" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: oi === 0 ? "#4F8EF7" : "#F59E0B" }} />
              <h3 style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{op.tipo}</h3>
              <span style={{ marginLeft: "auto", fontSize: 14, fontWeight: 800, color: oi === 0 ? "#4F8EF7" : "#F59E0B", fontFamily: "'Playfair Display', serif" }}>{fmtUSD(op.totalUSD)}</span>
            </div>
            <div style={{ padding: "4px 0" }}>
              {op.items.map((item, ii) => (
                <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: ii < op.items.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{item.descripcion}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.65)", fontFamily: "'Courier New', monospace", flexShrink: 0 }}>{fmtUSD(item.costoUSD)}</div>
                </div>
              ))}
            </div>
            {/* Subtotal bar */}
            <div style={{ margin: "0 18px 14px", padding: "8px 14px", background: `${oi === 0 ? "rgba(79,142,247,0.06)" : "rgba(245,158,11,0.06)"}`, borderRadius: 7, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.5 }}>Subtotal {op.tipo}</span>
              <span style={{ fontSize: 13, fontWeight: 800, color: oi === 0 ? "#4F8EF7" : "#F59E0B" }}>{fmtUSD(op.totalUSD)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Financing summary card */}
      <div style={C.card}>
        <div style={C.head}><span style={C.icon}>◆</span><h2 style={C.title}>Resumen del Financiamiento</h2></div>
        <div style={{ padding: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12 }}>
          {[
            { l: "Valor Factura", v: fmt(c.financiamiento.valorFactura), cl: "#4F8EF7" },
            { l: "Producto", v: c.financiamiento.producto, cl: "rgba(255,255,255,0.7)" },
            { l: "Plazo", v: `${c.financiamiento.plazo} meses`, cl: "#F59E0B" },
            { l: "Tasa VNA", v: c.financiamiento.tasaVNA, cl: "#A855F7" },
            { l: "Renta s/IVA", v: fmt(c.financiamiento.rentaMensualSIVA), cl: "#22C55E" },
            { l: "Renta c/IVA", v: fmt(c.financiamiento.rentaMensualCIVA), cl: "#22C55E" },
            { l: "Enganche", v: c.financiamiento.enganche, cl: "rgba(255,255,255,0.5)" },
            { l: "Opción Compra", v: c.financiamiento.opcionCompra, cl: "rgba(255,255,255,0.5)" },
          ].map((item, i) => (
            <div key={i} style={{ padding: "10px 12px", background: "rgba(255,255,255,0.015)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.03)" }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{item.l}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: item.cl }}>{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabCalificacion({ c }) {
  const cal = c.calificacion;
  const checks = [
    { key: "Situación Jurídica", ...cal.situacionJuridica },
    { key: "Listas Negras", ...cal.listasNegras },
    { key: "Opinión SAT", ...cal.opinonSAT },
    { key: "Reporte Accionistas", ...cal.accionistas },
    { key: "Información RUG", ...cal.rug },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
      <div style={{ ...C.card, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "30px 20px" }}>
        <h2 style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", margin: 0 }}>Score Ekatena</h2>
        <ScoreRing score={cal.score} max={cal.maxScore} />
        <div style={{ padding: "4px 14px", borderRadius: 6, background: `${scoreColor(cal.score, cal.maxScore)}15`, color: scoreColor(cal.score, cal.maxScore), fontWeight: 800, fontSize: 12, letterSpacing: 0.8, textTransform: "uppercase" }}>
          Riesgo {cal.riesgo}
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", textAlign: "center", maxWidth: 250, lineHeight: 1.5 }}>Puntuación basada en declaraciones fiscales, facturación e indicadores cualitativos.</p>
      </div>
      <div style={C.card}>
        <div style={C.head}><span style={C.icon}>◉</span><h2 style={C.title}>Verificaciones</h2></div>
        <div style={C.body}>
          {checks.map((ch, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "11px 0", borderBottom: i < checks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <StatusBadge status={ch.status} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 2 }}>{ch.key}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.4 }}>{ch.texto}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabFinanciero({ c }) {
  const f = c.financiamiento;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
        <KpiCard label="Valor Factura" value={f.valorFactura} color="#4F8EF7" />
        <KpiCard label="Renta s/IVA" value={f.rentaMensualSIVA} color="#22C55E" />
        <KpiCard label="Plazo" value={`${f.plazo} meses`} color="#F59E0B" raw />
        <KpiCard label="TIR" value={f.tir} color="#A855F7" raw />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        <div style={C.card}>
          <div style={C.head}><h2 style={C.title}>Propuesta de Financiamiento</h2></div>
          <div style={C.body}>
            <InfoRow label="Producto" value={f.producto} accent />
            <InfoRow label="Tipo de Equipo" value={f.tipoEquipo} />
            <InfoRow label="Tasa VNA" value={f.tasaVNA} />
            <InfoRow label="Comisión Apertura" value={f.comisionApertura} />
            <InfoRow label="Valor Residual" value={f.valorResidual} />
            <InfoRow label="Opción Compra" value={f.opcionCompra} />
            <InfoRow label="Renta c/IVA" value={fmt(f.rentaMensualCIVA)} accent />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={C.card}>
            <div style={C.head}><h2 style={C.title}>Ventas Netas (miles)</h2></div>
            <div style={{ padding: 16 }}><MiniBar data={c.financieros.ventas} color="#4F8EF7" /></div>
          </div>
          <div style={C.card}>
            <div style={C.head}><h2 style={C.title}>EBITDA (miles)</h2></div>
            <div style={{ padding: 16 }}><MiniBar data={c.financieros.ebitda} color="#22C55E" height={85} /></div>
          </div>
        </div>
      </div>
      <div style={{ ...C.card, maxWidth: 440, margin: "0 auto", width: "100%", padding: 22, textAlign: "center" }}>
        <h2 style={{ fontSize: 12, fontWeight: 700, margin: "0 0 14px", color: "rgba(255,255,255,0.4)" }}>Cobertura Saldo Promedio vs Renta</h2>
        <div style={{ height: 11, borderRadius: 6, background: "rgba(255,255,255,0.04)", overflow: "hidden", marginBottom: 8 }}>
          <div style={{ height: "100%", width: `${Math.min(c.estadoCuenta.cobertura / 20, 1) * 100}%`, borderRadius: 6, background: "linear-gradient(90deg, #22C55E, #4ADE80)", boxShadow: "0 0 8px rgba(34,197,94,0.25)" }} />
        </div>
        <span style={{ fontSize: 30, fontWeight: 900, color: c.estadoCuenta.cobertura >= 3 ? "#22C55E" : "#F59E0B", fontFamily: "'Playfair Display', serif" }}>{c.estadoCuenta.cobertura}x</span>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 4 }}>≥ 3x = verde</p>
      </div>
    </div>
  );
}

function TabPasivos({ c }) {
  const p = c.pasivosFinancieros;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <KpiCard label="Deuda Original" value={p.totalOriginal} color="#EF4444" />
        <KpiCard label="Saldo Actual" value={p.totalSaldo} color="#F59E0B" />
        <KpiCard label="% Amortizado" value={`${(((p.totalOriginal - p.totalSaldo) / p.totalOriginal) * 100).toFixed(1)}%`} color="#22C55E" raw />
      </div>
      <div style={C.card}>
        <div style={C.head}><span style={C.icon}>◇</span><h2 style={C.title}>Distribución por Institución</h2></div>
        <div style={{ padding: 18 }}><DebtBar data={p.principales} total={p.totalSaldo} /></div>
      </div>
    </div>
  );
}

function TabBuro({ c }) {
  const b = c.buroCredito;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
      <div style={{ ...C.card, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, padding: "30px 20px" }}>
        <h2 style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", margin: 0 }}>Puntaje Buró de Crédito</h2>
        <ScoreRing score={b.puntaje} max={1000} />
        <div style={{ padding: "4px 16px", borderRadius: 6, background: `${scoreColor(b.puntaje, 1000)}15`, color: scoreColor(b.puntaje, 1000), fontWeight: 800, fontSize: 13, letterSpacing: 0.8 }}>
          Grado {b.gradoRiesgo}
        </div>
      </div>
      <div style={C.card}>
        <div style={C.head}><span style={C.icon}>◎</span><h2 style={C.title}>Detalle Buró</h2></div>
        <div style={C.body}>
          <InfoRow label="Cuentas Abiertas" value={b.cuentasAbiertas} />
          <InfoRow label="Monto Original" value={fmtShort(b.montoOriginal * 1000)} />
          <InfoRow label="Saldo Actual" value={fmtShort(b.saldoActual * 1000)} />
          <InfoRow label="P. Incumplimiento" value={b.incumplimiento} />
          <InfoRow label="Estatus" value={b.estatus} accent />
        </div>
      </div>
    </div>
  );
}
