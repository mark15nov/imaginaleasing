import { useState, useMemo } from "react";

// ═══════════════════════════════════════════════
// THEME
// ═══════════════════════════════════════════════
const T = {
  bg: "#FAFAF8",
  surface: "#FFFFFF",
  surfaceAlt: "#F5F5F2",
  border: "#E8E6E1",
  borderLight: "#F0EEEA",
  text: "#1A1A1A",
  textSecondary: "#6B6B6B",
  textTertiary: "#9E9E9E",
  navy: "#1B2559",
  blue: "#2563EB",
  blueLight: "#EFF6FF",
  green: "#059669",
  greenLight: "#ECFDF5",
  amber: "#D97706",
  amberLight: "#FFFBEB",
  red: "#DC2626",
  redLight: "#FEF2F2",
  purple: "#7C3AED",
  purpleLight: "#F5F3FF",
  shadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
  shadowMd: "0 4px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)",
  shadowLg: "0 8px 24px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)",
  radius: 10,
  radiusSm: 7,
};

// ═══════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════
const CLIENTS = [
  {
    id: "abc-aluminum", nombre: "ABC Aluminum", razonSocial: "ALUMINIO DE BAJA CALIFORNIA SA DE CV",
    rfc: "ABC991012BF0", fechaConstitucion: "12/10/1999", antiguedad: "26 años",
    actividad: "Manufactura", giro: "Industria de Aluminio — Extrusión, Fabricación, Acabados",
    direccion: "Monferrato 6701, San Antonio de los Buenos, Tijuana, B.C. C.P. 22563",
    paginaWeb: "https://es.abc-aluminum.com/", ejecutivoComercial: "Ramiro Magaña",
    referenciador: "Carlos Adrián Mejía Rodríguez", obligadoSolidario: "Wadih Kuri Rendón",
    depositarioLegal: "Wadih Kuri Rendón",
    accionistas: [
      { nombre: "Jorge Kuri Rojo", monto: 102260348, porcentaje: 99.99 },
      { nombre: "Diana Luz Rendón Tolibia", monto: 10227, porcentaje: 0.01 },
    ],
    calificacion: {
      score: 711, maxScore: 1000, riesgo: "Medio",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias como Demandado" },
        { key: "Listas Negras", status: "warning", texto: "Reportado por INFONAVIT en listado de aportantes incumplidos" },
        { key: "Opinión SAT", status: "ok", texto: "Positivo" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias como Demandado" },
        { key: "Información RUG", status: "info", texto: "Reporta Activos Mobiliarios en Garantía" },
      ],
    },
    financiamiento: {
      producto: "Arrendamiento / Sale & Lease Back", tipoEquipo: "Equipo de Subestación Eléctrica",
      valorFactura: 40000000, plazo: 48, tasaVNA: "22.50%", comisionApertura: "2.50%",
      rentaMensualSIVA: 1095798, rentaMensualCIVA: 1271126, tir: "26.32%",
      valorResidual: "0.00%", opcionCompra: "3.20%", enganche: "0.00%", rentasDeposito: 1,
    },
    activo: {
      descripcionGeneral: "Equipo de Subestaciones Eléctricas Transformadoras",
      operaciones: [
        { tipo: "Arrendamiento Puro", items: [
          { descripcion: "Equipo de Suministro SIESSA", costoUSD: 1292204 },
          { descripcion: "2 Bancos Capacitadores y 2 Eq Primarios", costoUSD: 484435 },
        ], totalUSD: 1776639 },
        { tipo: "Sale & Lease Back", items: [
          { descripcion: "Brazo RA85 7AX + RSX Hexagon", costoUSD: 139324 },
          { descripcion: "Interruptor de Potencia Tipo Tanque", costoUSD: 200873 },
        ], totalUSD: 340196 },
      ],
      totalGeneralUSD: 2116835.10,
    },
    buroCredito: { puntaje: 771, gradoRiesgo: "A-1", incumplimiento: "0.9%", cuentasAbiertas: 94, montoOriginal: 2824406, saldoActual: 2079889, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: {
      totalOriginal: 2543270067, totalSaldo: 1910349175,
      principales: [
        { institucion: "BANAMEX", saldo: 553576044, color: T.blue },
        { institucion: "SANTANDER", saldo: 386560000, color: T.red },
        { institucion: "BBVA", saldo: 347260068, color: T.green },
        { institucion: "BANORTE", saldo: 289920981, color: T.amber },
        { institucion: "BANBAJIO", saldo: 193280000, color: T.purple },
        { institucion: "ACTIVE LEAS.", saldo: 78090107, color: "#E67E22" },
        { institucion: "ENGEN CAP.", saldo: 35820177, color: "#0EA5E9" },
        { institucion: "ARR. BANORTE", saldo: 10046888, color: "#94A3B8" },
      ],
    },
    estadoCuenta: { cobertura: 17.44 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 6112338 }, { p: "Dic 2024", v: 5487767 }, { p: "May 2025", v: 2069838 }],
      ebitda: [{ p: "Dic 2023", v: 457521 }, { p: "Dic 2024", v: 397829 }, { p: "May 2025", v: 150541 }],
    },
    montoSolicitado: 40000000, fechaSolicitud: "Sep 2025",
    proximoPago: "15 Abr 2026", diasParaPago: 6, saldoPendiente: 38500000,
    pagosRealizados: 6, pagosRestantes: 42, ultimoPago: "15 Mar 2026",
  },
  {
    id: "grupo-constructor", nombre: "Grupo Constructor Pacífico", razonSocial: "GRUPO CONSTRUCTOR PACÍFICO SA DE CV",
    rfc: "GCP180523LA9", fechaConstitucion: "23/05/2018", antiguedad: "7 años",
    actividad: "Construcción", giro: "Obra civil, infraestructura y desarrollos inmobiliarios",
    direccion: "Av. Revolución 1850, Col. San Ángel, CDMX, C.P. 01000",
    paginaWeb: "https://www.gcpacifico.com.mx", ejecutivoComercial: "Laura Méndez",
    referenciador: "Antonio Flores Vega", obligadoSolidario: "Roberto Sánchez Mora",
    depositarioLegal: "Roberto Sánchez Mora",
    accionistas: [
      { nombre: "Roberto Sánchez Mora", monto: 45000000, porcentaje: 60 },
      { nombre: "Elena Torres Ruiz", monto: 30000000, porcentaje: 40 },
    ],
    calificacion: {
      score: 782, maxScore: 1000, riesgo: "Bajo",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias" },
        { key: "Listas Negras", status: "ok", texto: "Sin reportes" },
        { key: "Opinión SAT", status: "ok", texto: "Positivo" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias" },
        { key: "Información RUG", status: "ok", texto: "Sin reportes" },
      ],
    },
    financiamiento: {
      producto: "Arrendamiento Puro", tipoEquipo: "Maquinaria Pesada — Excavadoras",
      valorFactura: 28500000, plazo: 36, tasaVNA: "19.80%", comisionApertura: "2.00%",
      rentaMensualSIVA: 985420, rentaMensualCIVA: 1143087, tir: "23.50%",
      valorResidual: "1.00%", opcionCompra: "2.80%", enganche: "10.00%", rentasDeposito: 2,
    },
    activo: {
      descripcionGeneral: "Maquinaria Pesada para Obra Civil",
      operaciones: [{ tipo: "Arrendamiento Puro", items: [
        { descripcion: "Excavadora CAT 320 GC Next Gen", costoUSD: 485000 },
        { descripcion: "Retroexcavadora CAT 420F2 IT", costoUSD: 125000 },
        { descripcion: "Cargador Frontal CAT 950 GC", costoUSD: 320000 },
      ], totalUSD: 930000 }],
      totalGeneralUSD: 930000,
    },
    buroCredito: { puntaje: 805, gradoRiesgo: "A-1", incumplimiento: "0.3%", cuentasAbiertas: 12, montoOriginal: 450000, saldoActual: 285000, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: { totalOriginal: 185000000, totalSaldo: 122000000, principales: [
      { institucion: "BBVA", saldo: 62000000, color: T.green },
      { institucion: "BANORTE", saldo: 38000000, color: T.amber },
      { institucion: "BANBAJIO", saldo: 22000000, color: T.purple },
    ]},
    estadoCuenta: { cobertura: 8.5 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 320000 }, { p: "Dic 2024", v: 410000 }, { p: "May 2025", v: 195000 }],
      ebitda: [{ p: "Dic 2023", v: 48000 }, { p: "Dic 2024", v: 62000 }, { p: "May 2025", v: 28000 }],
    },
    montoSolicitado: 28500000, fechaSolicitud: "Ago 2025",
    proximoPago: "01 May 2026", diasParaPago: 22, saldoPendiente: 24200000,
    pagosRealizados: 8, pagosRestantes: 28, ultimoPago: "01 Abr 2026",
  },
  {
    id: "alimentos-norte", nombre: "Alimentos del Norte", razonSocial: "ALIMENTOS DEL NORTE SA DE CV",
    rfc: "ANO150312KJ7", fechaConstitucion: "12/03/2015", antiguedad: "10 años",
    actividad: "Alimentos", giro: "Procesamiento y empaque de alimentos",
    direccion: "Carr. a Saltillo Km 8.5, Monterrey, N.L. C.P. 64700",
    paginaWeb: "https://www.alimentosdelnorte.mx", ejecutivoComercial: "Fernando Ríos",
    referenciador: "Miguel Ángel Garza", obligadoSolidario: "Patricia Villarreal López",
    depositarioLegal: "Patricia Villarreal López",
    accionistas: [
      { nombre: "Patricia Villarreal López", monto: 18000000, porcentaje: 75 },
      { nombre: "Carlos Villarreal López", monto: 6000000, porcentaje: 25 },
    ],
    calificacion: {
      score: 645, maxScore: 1000, riesgo: "Medio",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias" },
        { key: "Listas Negras", status: "ok", texto: "Sin reportes" },
        { key: "Opinión SAT", status: "warning", texto: "Con observaciones menores" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias" },
        { key: "Información RUG", status: "ok", texto: "Sin reportes" },
      ],
    },
    financiamiento: {
      producto: "Arrendamiento Puro", tipoEquipo: "Línea de Empaque Automatizada",
      valorFactura: 15800000, plazo: 36, tasaVNA: "21.00%", comisionApertura: "2.50%",
      rentaMensualSIVA: 562300, rentaMensualCIVA: 652268, tir: "24.80%",
      valorResidual: "0.00%", opcionCompra: "3.00%", enganche: "5.00%", rentasDeposito: 1,
    },
    activo: {
      descripcionGeneral: "Línea de Empaque Automatizada para Alimentos",
      operaciones: [{ tipo: "Arrendamiento Puro", items: [
        { descripcion: "Empacadora Vertical Multihead Ishida", costoUSD: 420000 },
        { descripcion: "Sistema de Bandas Transportadoras Inox", costoUSD: 185000 },
      ], totalUSD: 605000 }],
      totalGeneralUSD: 605000,
    },
    buroCredito: { puntaje: 698, gradoRiesgo: "A-2", incumplimiento: "1.8%", cuentasAbiertas: 8, montoOriginal: 180000, saldoActual: 95000, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: { totalOriginal: 62000000, totalSaldo: 41000000, principales: [
      { institucion: "BANAMEX", saldo: 25000000, color: T.blue },
      { institucion: "BBVA", saldo: 16000000, color: T.green },
    ]},
    estadoCuenta: { cobertura: 5.2 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 185000 }, { p: "Dic 2024", v: 210000 }, { p: "May 2025", v: 98000 }],
      ebitda: [{ p: "Dic 2023", v: 22000 }, { p: "Dic 2024", v: 28000 }, { p: "May 2025", v: 11000 }],
    },
    montoSolicitado: 15800000, fechaSolicitud: "Sep 2025",
    proximoPago: "20 Abr 2026", diasParaPago: 11, saldoPendiente: 12640000,
    pagosRealizados: 5, pagosRestantes: 31, ultimoPago: "20 Mar 2026",
  },
  {
    id: "logistica-express", nombre: "Logística Express MX", razonSocial: "LOGÍSTICA EXPRESS DE MÉXICO SA DE CV",
    rfc: "LEM200814PQ2", fechaConstitucion: "14/08/2020", antiguedad: "5 años",
    actividad: "Transporte", giro: "Transporte de carga terrestre y almacenaje",
    direccion: "Blvd. Aeropuerto 4520, San Luis Potosí, S.L.P. C.P. 78395",
    paginaWeb: "https://www.logexpressmx.com", ejecutivoComercial: "Ramiro Magaña",
    referenciador: "José Luis Martínez", obligadoSolidario: "Andrés Montoya Rivas",
    depositarioLegal: "Andrés Montoya Rivas",
    accionistas: [
      { nombre: "Andrés Montoya Rivas", monto: 8500000, porcentaje: 85 },
      { nombre: "Sofía Montoya Rivas", monto: 1500000, porcentaje: 15 },
    ],
    calificacion: {
      score: 520, maxScore: 1000, riesgo: "Alto",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias" },
        { key: "Listas Negras", status: "warning", texto: "Reportado en IMSS por adeudo" },
        { key: "Opinión SAT", status: "warning", texto: "Negativo — Adeudo fiscal" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias" },
        { key: "Información RUG", status: "info", texto: "Reporta Activos Mobiliarios" },
      ],
    },
    financiamiento: {
      producto: "Sale & Lease Back", tipoEquipo: "Tractocamiones Kenworth T680",
      valorFactura: 22000000, plazo: 48, tasaVNA: "24.00%", comisionApertura: "3.00%",
      rentaMensualSIVA: 780500, rentaMensualCIVA: 905380, tir: "28.10%",
      valorResidual: "0.00%", opcionCompra: "4.00%", enganche: "15.00%", rentasDeposito: 2,
    },
    activo: {
      descripcionGeneral: "Flota de Tractocamiones para Transporte de Carga",
      operaciones: [{ tipo: "Sale & Lease Back", items: [
        { descripcion: "3x Tractocamión Kenworth T680 2023", costoUSD: 480000 },
        { descripcion: "2x Caja Seca Utility 53' 2023", costoUSD: 120000 },
      ], totalUSD: 600000 }],
      totalGeneralUSD: 600000,
    },
    buroCredito: { puntaje: 635, gradoRiesgo: "B-1", incumplimiento: "4.2%", cuentasAbiertas: 6, montoOriginal: 95000, saldoActual: 72000, estatus: "Vigente — Atrasos menores" },
    pasivosFinancieros: { totalOriginal: 48000000, totalSaldo: 35500000, principales: [
      { institucion: "BANORTE", saldo: 20000000, color: T.amber },
      { institucion: "BANBAJIO", saldo: 15500000, color: T.purple },
    ]},
    estadoCuenta: { cobertura: 3.1 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 95000 }, { p: "Dic 2024", v: 125000 }, { p: "May 2025", v: 62000 }],
      ebitda: [{ p: "Dic 2023", v: 12000 }, { p: "Dic 2024", v: 18000 }, { p: "May 2025", v: 7500 }],
    },
    montoSolicitado: 22000000, fechaSolicitud: "Jul 2025",
    proximoPago: "10 Abr 2026", diasParaPago: 1, saldoPendiente: 19800000,
    pagosRealizados: 3, pagosRestantes: 45, ultimoPago: "10 Mar 2026",
  },
  {
    id: "solar-energy", nombre: "Solar Energy Baja", razonSocial: "SOLAR ENERGY BAJA CALIFORNIA SA DE CV",
    rfc: "SEB170209MN3", fechaConstitucion: "09/02/2017", antiguedad: "9 años",
    actividad: "Energía", giro: "Instalación y operación de paneles solares industriales",
    direccion: "Carr. Transpeninsular Km 12, Ensenada, B.C. C.P. 22800",
    paginaWeb: "https://www.solarenergybaja.mx", ejecutivoComercial: "Laura Méndez",
    referenciador: "Ricardo Padilla Soto", obligadoSolidario: "Mariana Estrada Vega",
    depositarioLegal: "Mariana Estrada Vega",
    accionistas: [
      { nombre: "Mariana Estrada Vega", monto: 22000000, porcentaje: 55 },
      { nombre: "Ricardo Padilla Soto", monto: 18000000, porcentaje: 45 },
    ],
    calificacion: {
      score: 820, maxScore: 1000, riesgo: "Bajo",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias" },
        { key: "Listas Negras", status: "ok", texto: "Sin reportes" },
        { key: "Opinión SAT", status: "ok", texto: "Positivo" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias" },
        { key: "Información RUG", status: "ok", texto: "Sin reportes" },
      ],
    },
    financiamiento: {
      producto: "Arrendamiento Puro", tipoEquipo: "Paneles Solares Industriales",
      valorFactura: 18500000, plazo: 60, tasaVNA: "18.50%", comisionApertura: "2.00%",
      rentaMensualSIVA: 458200, rentaMensualCIVA: 531512, tir: "21.80%",
      valorResidual: "1.00%", opcionCompra: "2.50%", enganche: "5.00%", rentasDeposito: 1,
    },
    activo: {
      descripcionGeneral: "Sistema Fotovoltaico Industrial 2.5 MW",
      operaciones: [{ tipo: "Arrendamiento Puro", items: [
        { descripcion: "500 Paneles Canadian Solar BiHiKu7 580W", costoUSD: 520000 },
        { descripcion: "10 Inversores Huawei SUN2000-100KTL", costoUSD: 185000 },
        { descripcion: "Estructura montaje y cableado", costoUSD: 95000 },
      ], totalUSD: 800000 }],
      totalGeneralUSD: 800000,
    },
    buroCredito: { puntaje: 830, gradoRiesgo: "A-1", incumplimiento: "0.2%", cuentasAbiertas: 15, montoOriginal: 320000, saldoActual: 180000, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: { totalOriginal: 95000000, totalSaldo: 62000000, principales: [
      { institucion: "BBVA", saldo: 35000000, color: T.green },
      { institucion: "SANTANDER", saldo: 27000000, color: T.red },
    ]},
    estadoCuenta: { cobertura: 12.3 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 245000 }, { p: "Dic 2024", v: 312000 }, { p: "May 2025", v: 148000 }],
      ebitda: [{ p: "Dic 2023", v: 58000 }, { p: "Dic 2024", v: 72000 }, { p: "May 2025", v: 35000 }],
    },
    montoSolicitado: 18500000, fechaSolicitud: "Oct 2025",
    proximoPago: "05 May 2026", diasParaPago: 26, saldoPendiente: 16200000,
    pagosRealizados: 10, pagosRestantes: 50, ultimoPago: "05 Abr 2026",
  },
  {
    id: "textiles-jalisco", nombre: "Textiles Jalisco", razonSocial: "TEXTILES DE JALISCO SA DE CV",
    rfc: "TJA130715QR8", fechaConstitucion: "15/07/2013", antiguedad: "12 años",
    actividad: "Textil", giro: "Manufactura de telas y confección industrial",
    direccion: "Av. Vallarta 6503, Col. Ciudad Granja, Zapopan, Jal. C.P. 45010",
    paginaWeb: "https://www.textilesjalisco.com.mx", ejecutivoComercial: "Fernando Ríos",
    referenciador: "Gabriela Ochoa Luna", obligadoSolidario: "Héctor Ramírez Solís",
    depositarioLegal: "Héctor Ramírez Solís",
    accionistas: [
      { nombre: "Héctor Ramírez Solís", monto: 32000000, porcentaje: 80 },
      { nombre: "Gabriela Ochoa Luna", monto: 8000000, porcentaje: 20 },
    ],
    calificacion: {
      score: 695, maxScore: 1000, riesgo: "Medio",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias" },
        { key: "Listas Negras", status: "ok", texto: "Sin reportes" },
        { key: "Opinión SAT", status: "ok", texto: "Positivo" },
        { key: "Reporte Accionistas", status: "warning", texto: "Socio con litigio mercantil menor" },
        { key: "Información RUG", status: "ok", texto: "Sin reportes" },
      ],
    },
    financiamiento: {
      producto: "Arrendamiento Puro", tipoEquipo: "Maquinaria Textil — Telares Industriales",
      valorFactura: 12200000, plazo: 36, tasaVNA: "20.50%", comisionApertura: "2.50%",
      rentaMensualSIVA: 428500, rentaMensualCIVA: 497060, tir: "24.20%",
      valorResidual: "0.00%", opcionCompra: "3.00%", enganche: "0.00%", rentasDeposito: 1,
    },
    activo: {
      descripcionGeneral: "Línea de Telares Industriales de Alta Velocidad",
      operaciones: [{ tipo: "Arrendamiento Puro", items: [
        { descripcion: "4x Telar Jacquard Stäubli LX3202", costoUSD: 380000 },
        { descripcion: "Sistema de tintura Thies iMaster H2O", costoUSD: 220000 },
      ], totalUSD: 600000 }],
      totalGeneralUSD: 600000,
    },
    buroCredito: { puntaje: 712, gradoRiesgo: "A-2", incumplimiento: "1.5%", cuentasAbiertas: 10, montoOriginal: 210000, saldoActual: 145000, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: { totalOriginal: 78000000, totalSaldo: 52000000, principales: [
      { institucion: "BANAMEX", saldo: 30000000, color: T.blue },
      { institucion: "BANORTE", saldo: 22000000, color: T.amber },
    ]},
    estadoCuenta: { cobertura: 6.8 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 158000 }, { p: "Dic 2024", v: 189000 }, { p: "May 2025", v: 82000 }],
      ebitda: [{ p: "Dic 2023", v: 19000 }, { p: "Dic 2024", v: 25000 }, { p: "May 2025", v: 10500 }],
    },
    montoSolicitado: 12200000, fechaSolicitud: "Nov 2025",
    proximoPago: "28 Abr 2026", diasParaPago: 19, saldoPendiente: 9760000,
    pagosRealizados: 7, pagosRestantes: 29, ultimoPago: "28 Mar 2026",
  },
  {
    id: "farmacia-vida", nombre: "Farmacia Vida Plus", razonSocial: "DISTRIBUIDORA FARMACÉUTICA VIDA PLUS SA DE CV",
    rfc: "DFV190401AB5", fechaConstitucion: "01/04/2019", antiguedad: "7 años",
    actividad: "Farmacéutica", giro: "Distribución y almacenaje de medicamentos",
    direccion: "Periférico Sur 4280, Col. Jardines del Pedregal, CDMX, C.P. 04500",
    paginaWeb: "https://www.vidaplusfarmacia.com", ejecutivoComercial: "Ramiro Magaña",
    referenciador: "Ana Belén Cárdenas", obligadoSolidario: "Jorge Iván Morales",
    depositarioLegal: "Jorge Iván Morales",
    accionistas: [
      { nombre: "Jorge Iván Morales", monto: 15000000, porcentaje: 50 },
      { nombre: "Ana Belén Cárdenas", monto: 15000000, porcentaje: 50 },
    ],
    calificacion: {
      score: 755, maxScore: 1000, riesgo: "Bajo",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias" },
        { key: "Listas Negras", status: "ok", texto: "Sin reportes" },
        { key: "Opinión SAT", status: "ok", texto: "Positivo" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias" },
        { key: "Información RUG", status: "info", texto: "Reporta Activos Mobiliarios en Garantía" },
      ],
    },
    financiamiento: {
      producto: "Sale & Lease Back", tipoEquipo: "Equipo de Cadena de Frío",
      valorFactura: 9800000, plazo: 36, tasaVNA: "19.00%", comisionApertura: "2.00%",
      rentaMensualSIVA: 342100, rentaMensualCIVA: 396836, tir: "22.50%",
      valorResidual: "1.00%", opcionCompra: "2.50%", enganche: "10.00%", rentasDeposito: 1,
    },
    activo: {
      descripcionGeneral: "Equipo de Cadena de Frío para Almacenes Farmacéuticos",
      operaciones: [{ tipo: "Sale & Lease Back", items: [
        { descripcion: "3x Cámara Frigorífica Bitzer -20°C", costoUSD: 285000 },
        { descripcion: "Sistema de monitoreo IoT Emerson", costoUSD: 65000 },
      ], totalUSD: 350000 }],
      totalGeneralUSD: 350000,
    },
    buroCredito: { puntaje: 768, gradoRiesgo: "A-1", incumplimiento: "0.6%", cuentasAbiertas: 18, montoOriginal: 380000, saldoActual: 210000, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: { totalOriginal: 55000000, totalSaldo: 38000000, principales: [
      { institucion: "SANTANDER", saldo: 22000000, color: T.red },
      { institucion: "BBVA", saldo: 16000000, color: T.green },
    ]},
    estadoCuenta: { cobertura: 9.1 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 420000 }, { p: "Dic 2024", v: 510000 }, { p: "May 2025", v: 230000 }],
      ebitda: [{ p: "Dic 2023", v: 55000 }, { p: "Dic 2024", v: 68000 }, { p: "May 2025", v: 31000 }],
    },
    montoSolicitado: 9800000, fechaSolicitud: "Dic 2025",
    proximoPago: "15 Abr 2026", diasParaPago: 6, saldoPendiente: 8200000,
    pagosRealizados: 4, pagosRestantes: 32, ultimoPago: "15 Mar 2026",
  },
  {
    id: "minera-cobre", nombre: "Minera Cobre del Pacífico", razonSocial: "MINERA COBRE DEL PACÍFICO SA DE CV",
    rfc: "MCP110630TT1", fechaConstitucion: "30/06/2011", antiguedad: "14 años",
    actividad: "Minería", giro: "Extracción y procesamiento de cobre",
    direccion: "Carr. Internacional Km 45, Cananea, Sonora, C.P. 84620",
    paginaWeb: "https://www.mineracobrepacifico.mx", ejecutivoComercial: "Laura Méndez",
    referenciador: "Eduardo Félix Duarte", obligadoSolidario: "Tomás Valenzuela Ruiz",
    depositarioLegal: "Tomás Valenzuela Ruiz",
    accionistas: [
      { nombre: "Tomás Valenzuela Ruiz", monto: 85000000, porcentaje: 70 },
      { nombre: "Eduardo Félix Duarte", monto: 36400000, porcentaje: 30 },
    ],
    calificacion: {
      score: 860, maxScore: 1000, riesgo: "Bajo",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias" },
        { key: "Listas Negras", status: "ok", texto: "Sin reportes" },
        { key: "Opinión SAT", status: "ok", texto: "Positivo" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias" },
        { key: "Información RUG", status: "ok", texto: "Sin reportes" },
      ],
    },
    financiamiento: {
      producto: "Arrendamiento Puro", tipoEquipo: "Maquinaria de Extracción Minera",
      valorFactura: 52000000, plazo: 60, tasaVNA: "17.50%", comisionApertura: "1.50%",
      rentaMensualSIVA: 1245000, rentaMensualCIVA: 1444200, tir: "20.30%",
      valorResidual: "2.00%", opcionCompra: "3.50%", enganche: "10.00%", rentasDeposito: 2,
    },
    activo: {
      descripcionGeneral: "Equipo de Extracción y Trituración Minera",
      operaciones: [{ tipo: "Arrendamiento Puro", items: [
        { descripcion: "Excavadora Komatsu PC1250-11", costoUSD: 1200000 },
        { descripcion: "Camión Caterpillar 777G", costoUSD: 850000 },
        { descripcion: "Trituradora Sandvik CJ412", costoUSD: 620000 },
      ], totalUSD: 2670000 }],
      totalGeneralUSD: 2670000,
    },
    buroCredito: { puntaje: 872, gradoRiesgo: "A-1", incumplimiento: "0.1%", cuentasAbiertas: 32, montoOriginal: 1250000, saldoActual: 680000, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: { totalOriginal: 420000000, totalSaldo: 285000000, principales: [
      { institucion: "BANAMEX", saldo: 120000000, color: T.blue },
      { institucion: "BBVA", saldo: 85000000, color: T.green },
      { institucion: "SANTANDER", saldo: 80000000, color: T.red },
    ]},
    estadoCuenta: { cobertura: 22.5 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 1850000 }, { p: "Dic 2024", v: 2100000 }, { p: "May 2025", v: 980000 }],
      ebitda: [{ p: "Dic 2023", v: 420000 }, { p: "Dic 2024", v: 510000 }, { p: "May 2025", v: 245000 }],
    },
    montoSolicitado: 52000000, fechaSolicitud: "Jun 2025",
    proximoPago: "01 May 2026", diasParaPago: 22, saldoPendiente: 43500000,
    pagosRealizados: 12, pagosRestantes: 48, ultimoPago: "01 Abr 2026",
  },
  {
    id: "plasticos-reforma", nombre: "Plásticos Reforma", razonSocial: "PLÁSTICOS REFORMA DEL SURESTE SA DE CV",
    rfc: "PRS160822LK4", fechaConstitucion: "22/08/2016", antiguedad: "9 años",
    actividad: "Plásticos", giro: "Inyección y extrusión de plásticos industriales",
    direccion: "Parque Industrial Tabasco 2000, Villahermosa, Tab. C.P. 86035",
    paginaWeb: "https://www.plasticosreforma.com.mx", ejecutivoComercial: "Fernando Ríos",
    referenciador: "Luis Enrique Pech", obligadoSolidario: "Carmen Díaz Herrera",
    depositarioLegal: "Carmen Díaz Herrera",
    accionistas: [
      { nombre: "Carmen Díaz Herrera", monto: 12000000, porcentaje: 60 },
      { nombre: "Luis Enrique Pech", monto: 8000000, porcentaje: 40 },
    ],
    calificacion: {
      score: 580, maxScore: 1000, riesgo: "Alto",
      checks: [
        { key: "Situación Jurídica", status: "warning", texto: "Demanda laboral en curso" },
        { key: "Listas Negras", status: "ok", texto: "Sin reportes" },
        { key: "Opinión SAT", status: "warning", texto: "Con observaciones" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias" },
        { key: "Información RUG", status: "info", texto: "Reporta Activos Mobiliarios" },
      ],
    },
    financiamiento: {
      producto: "Sale & Lease Back", tipoEquipo: "Inyectoras de Plástico",
      valorFactura: 8500000, plazo: 36, tasaVNA: "23.50%", comisionApertura: "3.00%",
      rentaMensualSIVA: 312800, rentaMensualCIVA: 362848, tir: "27.20%",
      valorResidual: "0.00%", opcionCompra: "3.50%", enganche: "15.00%", rentasDeposito: 2,
    },
    activo: {
      descripcionGeneral: "Máquinas Inyectoras de Plástico de Alta Tonelaje",
      operaciones: [{ tipo: "Sale & Lease Back", items: [
        { descripcion: "2x Inyectora Engel Victory 500T", costoUSD: 280000 },
        { descripcion: "Enfriador Industrial Carrier 30XA", costoUSD: 85000 },
      ], totalUSD: 365000 }],
      totalGeneralUSD: 365000,
    },
    buroCredito: { puntaje: 598, gradoRiesgo: "B-2", incumplimiento: "5.1%", cuentasAbiertas: 5, montoOriginal: 75000, saldoActual: 62000, estatus: "Vigente — Atrasos menores" },
    pasivosFinancieros: { totalOriginal: 35000000, totalSaldo: 28000000, principales: [
      { institucion: "BANORTE", saldo: 18000000, color: T.amber },
      { institucion: "BANBAJIO", saldo: 10000000, color: T.purple },
    ]},
    estadoCuenta: { cobertura: 2.8 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 72000 }, { p: "Dic 2024", v: 88000 }, { p: "May 2025", v: 41000 }],
      ebitda: [{ p: "Dic 2023", v: 8500 }, { p: "Dic 2024", v: 11000 }, { p: "May 2025", v: 4800 }],
    },
    montoSolicitado: 8500000, fechaSolicitud: "Ene 2026",
    proximoPago: "12 Abr 2026", diasParaPago: 3, saldoPendiente: 7650000,
    pagosRealizados: 2, pagosRestantes: 34, ultimoPago: "12 Mar 2026",
  },
  {
    id: "agroindustrias-sur", nombre: "Agroindustrias del Sur", razonSocial: "AGROINDUSTRIAS DEL SUR SA DE CV",
    rfc: "ADS080314GH6", fechaConstitucion: "14/03/2008", antiguedad: "18 años",
    actividad: "Agroindustria", giro: "Procesamiento de granos y oleaginosas",
    direccion: "Carr. Mérida-Motul Km 22, Mérida, Yuc. C.P. 97300",
    paginaWeb: "https://www.agroindustriassur.com.mx", ejecutivoComercial: "Ramiro Magaña",
    referenciador: "Felipe Canto Rejón", obligadoSolidario: "Alejandra Poot Canché",
    depositarioLegal: "Alejandra Poot Canché",
    accionistas: [
      { nombre: "Alejandra Poot Canché", monto: 42000000, porcentaje: 70 },
      { nombre: "Felipe Canto Rejón", monto: 18000000, porcentaje: 30 },
    ],
    calificacion: {
      score: 740, maxScore: 1000, riesgo: "Medio",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias" },
        { key: "Listas Negras", status: "ok", texto: "Sin reportes" },
        { key: "Opinión SAT", status: "ok", texto: "Positivo" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias" },
        { key: "Información RUG", status: "ok", texto: "Sin reportes" },
      ],
    },
    financiamiento: {
      producto: "Arrendamiento Puro", tipoEquipo: "Planta Procesadora de Granos",
      valorFactura: 35000000, plazo: 48, tasaVNA: "19.00%", comisionApertura: "2.00%",
      rentaMensualSIVA: 1058000, rentaMensualCIVA: 1227280, tir: "22.80%",
      valorResidual: "1.50%", opcionCompra: "3.00%", enganche: "5.00%", rentasDeposito: 2,
    },
    activo: {
      descripcionGeneral: "Planta de Procesamiento de Soya y Maíz",
      operaciones: [{ tipo: "Arrendamiento Puro", items: [
        { descripcion: "Molino de martillos Bühler DFZK", costoUSD: 650000 },
        { descripcion: "Secadora de granos GSI TopDry 1226", costoUSD: 420000 },
        { descripcion: "Silos metálicos 5000 ton c/u x3", costoUSD: 580000 },
      ], totalUSD: 1650000 }],
      totalGeneralUSD: 1650000,
    },
    buroCredito: { puntaje: 745, gradoRiesgo: "A-2", incumplimiento: "1.2%", cuentasAbiertas: 22, montoOriginal: 580000, saldoActual: 320000, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: { totalOriginal: 180000000, totalSaldo: 125000000, principales: [
      { institucion: "BANAMEX", saldo: 55000000, color: T.blue },
      { institucion: "BBVA", saldo: 42000000, color: T.green },
      { institucion: "BANORTE", saldo: 28000000, color: T.amber },
    ]},
    estadoCuenta: { cobertura: 14.2 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 680000 }, { p: "Dic 2024", v: 820000 }, { p: "May 2025", v: 385000 }],
      ebitda: [{ p: "Dic 2023", v: 95000 }, { p: "Dic 2024", v: 118000 }, { p: "May 2025", v: 52000 }],
    },
    montoSolicitado: 35000000, fechaSolicitud: "Ago 2025",
    proximoPago: "20 Abr 2026", diasParaPago: 11, saldoPendiente: 29400000,
    pagosRealizados: 9, pagosRestantes: 39, ultimoPago: "20 Mar 2026",
  },
  {
    id: "tech-solutions", nombre: "Tech Solutions GDL", razonSocial: "TECH SOLUTIONS DE GUADALAJARA SA DE CV",
    rfc: "TSG210115PL9", fechaConstitucion: "15/01/2021", antiguedad: "5 años",
    actividad: "Tecnología", giro: "Data centers y servicios cloud",
    direccion: "Av. López Mateos Sur 2077, Zapopan, Jal. C.P. 45050",
    paginaWeb: "https://www.techsolutionsgdl.com", ejecutivoComercial: "Laura Méndez",
    referenciador: "Diego Navarro Romo", obligadoSolidario: "Valeria Gutiérrez Peña",
    depositarioLegal: "Valeria Gutiérrez Peña",
    accionistas: [
      { nombre: "Valeria Gutiérrez Peña", monto: 5000000, porcentaje: 50 },
      { nombre: "Diego Navarro Romo", monto: 5000000, porcentaje: 50 },
    ],
    calificacion: {
      score: 680, maxScore: 1000, riesgo: "Medio",
      checks: [
        { key: "Situación Jurídica", status: "ok", texto: "Sin incidencias" },
        { key: "Listas Negras", status: "ok", texto: "Sin reportes" },
        { key: "Opinión SAT", status: "ok", texto: "Positivo" },
        { key: "Reporte Accionistas", status: "ok", texto: "Sin incidencias" },
        { key: "Información RUG", status: "ok", texto: "Sin reportes" },
      ],
    },
    financiamiento: {
      producto: "Arrendamiento Puro", tipoEquipo: "Servidores y Equipo de Data Center",
      valorFactura: 14500000, plazo: 36, tasaVNA: "20.00%", comisionApertura: "2.50%",
      rentaMensualSIVA: 512000, rentaMensualCIVA: 593920, tir: "23.80%",
      valorResidual: "0.00%", opcionCompra: "2.00%", enganche: "0.00%", rentasDeposito: 1,
    },
    activo: {
      descripcionGeneral: "Infraestructura de Data Center Tier III",
      operaciones: [{ tipo: "Arrendamiento Puro", items: [
        { descripcion: "8x Servidor Dell PowerEdge R760", costoUSD: 320000 },
        { descripcion: "Storage NetApp AFF A400", costoUSD: 185000 },
        { descripcion: "UPS Eaton 9395P 600kVA", costoUSD: 120000 },
      ], totalUSD: 625000 }],
      totalGeneralUSD: 625000,
    },
    buroCredito: { puntaje: 692, gradoRiesgo: "A-2", incumplimiento: "2.0%", cuentasAbiertas: 7, montoOriginal: 120000, saldoActual: 85000, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: { totalOriginal: 28000000, totalSaldo: 19500000, principales: [
      { institucion: "BBVA", saldo: 12000000, color: T.green },
      { institucion: "SANTANDER", saldo: 7500000, color: T.red },
    ]},
    estadoCuenta: { cobertura: 4.5 },
    financieros: {
      ventas: [{ p: "Dic 2023", v: 135000 }, { p: "Dic 2024", v: 195000 }, { p: "May 2025", v: 105000 }],
      ebitda: [{ p: "Dic 2023", v: 22000 }, { p: "Dic 2024", v: 35000 }, { p: "May 2025", v: 18000 }],
    },
    montoSolicitado: 14500000, fechaSolicitud: "Feb 2026",
    proximoPago: "25 Abr 2026", diasParaPago: 16, saldoPendiente: 13200000,
    pagosRealizados: 2, pagosRestantes: 34, ultimoPago: "25 Mar 2026",
  },
];

const REMINDERS_INIT = [
  { id: 1, clientId: "abc-aluminum", tipo: "whatsapp", diasAntes: 5, mensaje: "Recordatorio: tu pago de arrendamiento vence en {dias} días por {monto}.", activo: true },
  { id: 2, clientId: "abc-aluminum", tipo: "email", diasAntes: 3, mensaje: "Segundo aviso de pago próximo a vencer.", activo: true },
  { id: 3, clientId: "grupo-constructor", tipo: "whatsapp", diasAntes: 7, mensaje: "Hola, te recordamos que tu próximo pago es el {fecha} por {monto}.", activo: true },
  { id: 4, clientId: "logistica-express", tipo: "email", diasAntes: 1, mensaje: "URGENTE: Tu pago vence mañana.", activo: false },
  { id: 5, clientId: "solar-energy", tipo: "whatsapp", diasAntes: 5, mensaje: "Recordatorio: tu pago de arrendamiento vence en {dias} días por {monto}.", activo: true },
  { id: 6, clientId: "minera-cobre", tipo: "email", diasAntes: 7, mensaje: "Estimado cliente, le recordamos su próximo pago el {fecha} por {monto}.", activo: true },
  { id: 7, clientId: "minera-cobre", tipo: "whatsapp", diasAntes: 3, mensaje: "Segundo aviso: pago próximo a vencer.", activo: true },
  { id: 8, clientId: "farmacia-vida", tipo: "whatsapp", diasAntes: 5, mensaje: "Hola, tu próximo pago vence el {fecha} por {monto}.", activo: true },
  { id: 9, clientId: "agroindustrias-sur", tipo: "email", diasAntes: 7, mensaje: "Recordatorio de pago programado para {fecha}.", activo: true },
  { id: 10, clientId: "plasticos-reforma", tipo: "whatsapp", diasAntes: 3, mensaje: "ATENCIÓN: Tu pago vence en {dias} días.", activo: true },
  { id: 11, clientId: "plasticos-reforma", tipo: "email", diasAntes: 1, mensaje: "URGENTE: Pago vence mañana por {monto}.", activo: true },
  { id: 12, clientId: "textiles-jalisco", tipo: "whatsapp", diasAntes: 5, mensaje: "Recordatorio: próximo pago el {fecha}.", activo: true },
  { id: 13, clientId: "tech-solutions", tipo: "email", diasAntes: 7, mensaje: "Le informamos que su próximo pago está programado para {fecha}.", activo: true },
  { id: 14, clientId: "alimentos-norte", tipo: "whatsapp", diasAntes: 3, mensaje: "Aviso: pago próximo en {dias} días por {monto}.", activo: true },
];

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════
const fmt = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
const fmtUSD = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(n);
const fmtShort = (n) => { if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`; if (n >= 1e6) return `$${(n / 1e6).toFixed(0)}M`; if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`; return `$${n}`; };
const scoreColor = (s, max = 1000) => { const p = s / max; return p >= 0.75 ? T.green : p >= 0.5 ? T.amber : T.red; };
const scoreBg = (s, max = 1000) => { const p = s / max; return p >= 0.75 ? T.greenLight : p >= 0.5 ? T.amberLight : T.redLight; };

// ═══════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════
export default function App() {
  const [view, setView] = useState("home"); // home | detail
  const [clientId, setClientId] = useState(null);
  const client = CLIENTS.find(c => c.id === clientId);

  const openClient = (id) => { setClientId(id); setView("detail"); };
  const goHome = () => { setView("home"); setClientId(null); };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
      <style>{`
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:${T.blue}20}
        input::placeholder{color:${T.textTertiary}}
        select{-webkit-appearance:none;appearance:none}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .hover-lift{transition:all .22s ease}.hover-lift:hover{transform:translateY(-2px);box-shadow:${T.shadowLg}}
        .hover-row{transition:background .15s ease}.hover-row:hover{background:${T.surfaceAlt}}
      `}</style>

      <Header showBack={view === "detail"} onBack={goHome} clientName={client?.nombre} />
      {view === "home" && <HomeView onSelectClient={openClient} />}
      {view === "detail" && client && <DetailView client={client} />}
    </div>
  );
}

// ═══════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════
function Header({ showBack, onBack, clientName }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", borderBottom: `1px solid ${T.border}`, background: T.surface, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {showBack && (
          <button onClick={onBack} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, color: T.textSecondary, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>
            ← Clientes
          </button>
        )}
        <div style={{ lineHeight: 1 }}>
          <span style={{ fontSize: 16, fontWeight: 800, color: T.navy, letterSpacing: 2 }}>IMAGINA</span>
          <span style={{ fontSize: 7, letterSpacing: 3.5, color: T.textTertiary, display: "block", fontWeight: 600 }}>LEASING</span>
        </div>
        <div style={{ width: 1, height: 24, background: T.border }} />
        <div>
          <h1 style={{ fontSize: 14, fontWeight: 700, margin: 0, color: T.text }}>{showBack ? clientName : "Clientes Activos"}</h1>
          <p style={{ fontSize: 10, color: T.textTertiary, margin: 0 }}>{showBack ? "Expediente Ekatena" : "Dashboard de Cartera"}</p>
        </div>
      </div>
      <div style={{ fontSize: 11, color: T.textTertiary }}>
        {new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════
// HOME VIEW
// ═══════════════════════════════════════════════
function HomeView({ onSelectClient }) {
  const [tab, setTab] = useState("clientes");
  return (
    <main style={{ maxWidth: 1320, margin: "0 auto", padding: "24px 28px" }}>
      {/* Home Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: T.surfaceAlt, borderRadius: T.radius, padding: 4, width: "fit-content" }}>
        {[{ id: "clientes", label: "Clientes Activos" }, { id: "quanto", label: "Financieros Quanto" }, { id: "recordatorios", label: "Recordatorios de Pago" }].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "9px 20px", border: "none", borderRadius: T.radiusSm, background: tab === t.id ? T.surface : "transparent", color: tab === t.id ? T.navy : T.textTertiary, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: tab === t.id ? T.shadow : "none", transition: "all .2s" }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "clientes" && <ClientsSection onSelectClient={onSelectClient} />}
      {tab === "quanto" && <QuantoSection />}
      {tab === "recordatorios" && <RemindersSection />}
    </main>
  );
}

// ── CLIENTS SECTION ──
function ClientsSection({ onSelectClient }) {
  const [search, setSearch] = useState("");
  const [filterAct, setFilterAct] = useState("todos");
  const [sortCol, setSortCol] = useState("nombre");
  const [sortDir, setSortDir] = useState("asc"); // asc | desc
  const actividades = [...new Set(CLIENTS.map(c => c.actividad))];

  const handleSort = (col) => {
    if (sortCol === col) {
      setSortDir(d => d === "asc" ? "desc" : "asc");
    } else {
      setSortCol(col);
      setSortDir(col === "nombre" || col === "industria" || col === "producto" || col === "rfc" ? "asc" : "desc");
    }
  };

  const COLUMNS = [
    { id: "nombre", label: "Cliente", getter: c => c.nombre.toLowerCase() },
    { id: "rfc", label: "RFC", getter: c => c.rfc },
    { id: "industria", label: "Industria", getter: c => c.actividad },
    { id: "producto", label: "Producto", getter: c => c.financiamiento.producto },
    { id: "monto", label: "Monto", getter: c => c.montoSolicitado },
    { id: "saldo", label: "Saldo Pend.", getter: c => c.saldoPendiente },
    { id: "renta", label: "Renta s/IVA", getter: c => c.financiamiento.rentaMensualSIVA },
    { id: "plazo", label: "Plazo", getter: c => c.pagosRealizados / (c.pagosRealizados + c.pagosRestantes) },
    { id: "pago", label: "Próx. Pago", getter: c => c.diasParaPago },
    { id: "score", label: "Score", getter: c => c.calificacion.score },
  ];

  const filtered = useMemo(() => {
    let list = [...CLIENTS];
    if (search) { const q = search.toLowerCase(); list = list.filter(c => c.nombre.toLowerCase().includes(q) || c.razonSocial.toLowerCase().includes(q) || c.rfc.toLowerCase().includes(q)); }
    if (filterAct !== "todos") list = list.filter(c => c.actividad === filterAct);
    const col = COLUMNS.find(c => c.id === sortCol);
    if (col) {
      list.sort((a, b) => {
        const va = col.getter(a);
        const vb = col.getter(b);
        let cmp = 0;
        if (typeof va === "string") cmp = va.localeCompare(vb);
        else cmp = va - vb;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return list;
  }, [search, filterAct, sortCol, sortDir]);

  const totalCartera = CLIENTS.reduce((s, c) => s + c.saldoPendiente, 0);
  const avgScore = Math.round(CLIENTS.reduce((s, c) => s + c.calificacion.score, 0) / CLIENTS.length);
  const proximosPago = CLIENTS.filter(c => c.diasParaPago <= 7).length;

  const gridCols = "minmax(170px,1.8fr) 90px minmax(100px,1fr) minmax(110px,1fr) minmax(100px,1fr) minmax(95px,1fr) 90px 70px minmax(95px,.8fr) 60px";

  return (
    <>
      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 22, animation: "fadeUp .5s ease" }}>
        <Kpi label="Cartera Activa Total" value={fmt(totalCartera)} icon="bar_chart" />
        <Kpi label="Clientes Activos" value={CLIENTS.length.toString()} icon="group" />
        <Kpi label="Score Promedio" value={avgScore.toString()} icon="speed" accent={scoreColor(avgScore)} />
        <Kpi label="Pagos Próximos (7 días)" value={proximosPago.toString()} icon="notifications" accent={proximosPago > 0 ? T.amber : T.green} />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap", animation: "fadeUp .6s ease" }}>
        <input type="text" placeholder="Buscar cliente, razón social o RFC..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: "1 1 260px", padding: "10px 14px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, color: T.text, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
        <Sel value={filterAct} onChange={setFilterAct} options={[{ v: "todos", l: "Todas las industrias" }, ...actividades.map(a => ({ v: a, l: a }))]} />
      </div>

      {/* Table */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow, animation: "fadeUp .7s ease", overflowX: "auto" }}>
        {/* Header — clickable columns */}
        <div style={{ minWidth: 1050, display: "grid", gridTemplateColumns: gridCols, padding: "0 18px", borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt, gap: 6 }}>
          {COLUMNS.map(col => {
            const active = sortCol === col.id;
            const arrow = active ? (sortDir === "asc" ? " ↑" : " ↓") : "";
            return (
              <button key={col.id} onClick={() => handleSort(col.id)} style={{ background: "none", border: "none", padding: "11px 0", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, fontSize: 9, fontWeight: 700, color: active ? T.navy : T.textTertiary, textTransform: "uppercase", letterSpacing: 0.7, fontFamily: "inherit", textAlign: "left", transition: "color .15s" }}>
                {col.label}
                <span style={{ fontSize: 10, fontWeight: 800, color: active ? T.blue : "transparent", transition: "color .15s" }}>{arrow || " ·"}</span>
              </button>
            );
          })}
        </div>
        {/* Rows */}
        {filtered.map((c, i) => {
          const sc = scoreColor(c.calificacion.score);
          const urgent = c.diasParaPago <= 3;
          const progPct = Math.round((c.pagosRealizados / (c.pagosRealizados + c.pagosRestantes)) * 100);
          return (
            <div key={c.id} className="hover-row" onClick={() => onSelectClient(c.id)}
              style={{ minWidth: 1050, display: "grid", gridTemplateColumns: gridCols, padding: "13px 18px", borderBottom: i < filtered.length - 1 ? `1px solid ${T.borderLight}` : "none", cursor: "pointer", alignItems: "center", animation: `fadeUp .4s ease ${i * .06}s both`, gap: 6 }}>
              {/* Cliente */}
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{c.nombre}</div>
                <div style={{ fontSize: 10, color: T.textTertiary, marginTop: 1 }}>{c.ejecutivoComercial}</div>
              </div>
              {/* RFC */}
              <span style={{ fontSize: 10, fontFamily: "'JetBrains Mono', monospace", color: T.textSecondary, fontWeight: 500 }}>{c.rfc}</span>
              {/* Industria */}
              <span style={{ fontSize: 11, color: T.textSecondary }}>{c.actividad}</span>
              {/* Producto */}
              <span style={{ fontSize: 11, color: T.textSecondary }}>{c.financiamiento.producto.length > 22 ? c.financiamiento.producto.slice(0, 20) + "…" : c.financiamiento.producto}</span>
              {/* Monto */}
              <span style={{ fontSize: 12, fontWeight: 700, color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(c.montoSolicitado)}</span>
              {/* Saldo Pendiente */}
              <span style={{ fontSize: 12, fontWeight: 600, color: T.textSecondary, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(c.saldoPendiente)}</span>
              {/* Renta */}
              <span style={{ fontSize: 11, fontWeight: 600, color: T.textSecondary, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(c.financiamiento.rentaMensualSIVA)}</span>
              {/* Plazo + progreso */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{c.pagosRealizados}/{c.pagosRealizados + c.pagosRestantes}</div>
                <div style={{ height: 3, borderRadius: 2, background: T.surfaceAlt, marginTop: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progPct}%`, borderRadius: 2, background: T.blue }} />
                </div>
              </div>
              {/* Próximo Pago */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: urgent ? T.red : T.text }}>{c.proximoPago}</div>
                <div style={{ fontSize: 9, color: urgent ? T.red : T.textTertiary, fontWeight: urgent ? 700 : 400, marginTop: 1 }}>
                  {urgent ? `⚠ ${c.diasParaPago}d` : `${c.diasParaPago}d`}
                </div>
              </div>
              {/* Score */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ width: 36, height: 22, borderRadius: 4, background: `${sc}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: sc, fontFamily: "'JetBrains Mono', monospace" }}>
                  {c.calificacion.score}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div style={{ padding: 40, textAlign: "center", color: T.textTertiary }}>Sin resultados</div>}
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════
// QUANTO DATA (from Excel)
// ═══════════════════════════════════════════════
const QUANTO_OPS = [
  {contrato:"306-001-001",idArr:1216,nombre:"ALUMINIO DE BAJA CALIFORNIA, S.A. DE C.V.",bien:"MAQUINARIA Y EQUIPO INDUSTRIAL",fechaDesembolso:"2025-11-06",fecha1erPago:"2025-12-10",fechaVencimiento:"2029-11-10",valorBienSinIVA:2154942.24,pagoInicial:21549.42,montoFinanciado:2133392.82,rentasFijas:67795.28,tasa:22.5,tir:2.62,plazo:48,totalRentas:3254173.44,rentaPorDevengar:2982992.32,opcionCompra:68958.15,alCorriente:2982992.32,d30:0,d60:0,d90:0,dmas90:0,total:2982992.32,diasVencidos:0},
  {contrato:"APL0306-005-001",idArr:1274,nombre:"ALUMINIO DE BAJA CALIFORNIA, S.A. DE C.V.",bien:"MAQUINARIA Y EQUIPO INDUSTRIAL",fechaDesembolso:"2025-12-10",fecha1erPago:"2026-01-10",fechaVencimiento:"2029-12-10",valorBienSinIVA:2655948.27,pagoInicial:26559.48,montoFinanciado:2629388.79,rentasFijas:83557.11,tasa:22.5,tir:2.62,plazo:48,totalRentas:4010741.28,rentaPorDevengar:3760069.95,opcionCompra:0,alCorriente:3760069.95,d30:0,d60:0,d90:0,dmas90:0,total:3760069.95,diasVencidos:0},
  {contrato:"APL0306-006-001",idArr:1275,nombre:"ALUMINIO DE BAJA CALIFORNIA, S.A. DE C.V.",bien:"MAQUINARIA Y EQUIPO INDUSTRIAL",fechaDesembolso:"2025-12-10",fecha1erPago:"2026-01-10",fechaVencimiento:"2029-12-10",valorBienSinIVA:6712319.83,pagoInicial:67123.2,montoFinanciado:6645196.63,rentasFijas:211172.06,tasa:22.5,tir:2.62,plazo:48,totalRentas:10136258.88,rentaPorDevengar:9502742.7,opcionCompra:0,alCorriente:9502742.7,d30:0,d60:0,d90:0,dmas90:0,total:9502742.7,diasVencidos:0},
  {contrato:"APL0306-003-001",idArr:1276,nombre:"ALUMINIO DE BAJA CALIFORNIA, S.A. DE C.V.",bien:"MAQUINARIA Y EQUIPO INDUSTRIAL",fechaDesembolso:"2025-12-10",fecha1erPago:"2026-01-10",fechaVencimiento:"2029-12-10",valorBienSinIVA:3634951.72,pagoInicial:36349.52,montoFinanciado:3598602.2,rentasFijas:114356.92,tasa:22.5,tir:2.62,plazo:48,totalRentas:5489132.16,rentaPorDevengar:5146061.4,opcionCompra:0,alCorriente:5146061.4,d30:0,d60:0,d90:0,dmas90:0,total:5146061.4,diasVencidos:0},
  {contrato:"APL0306-004-001",idArr:1277,nombre:"ALUMINIO DE BAJA CALIFORNIA, S.A. DE C.V.",bien:"MAQUINARIA Y EQUIPO INDUSTRIAL",fechaDesembolso:"2025-12-10",fecha1erPago:"2026-01-10",fechaVencimiento:"2029-12-10",valorBienSinIVA:3418081.9,pagoInicial:34180.82,montoFinanciado:3383901.08,rentasFijas:107534.12,tasa:22.5,tir:2.62,plazo:48,totalRentas:5161637.76,rentaPorDevengar:4839035.4,opcionCompra:0,alCorriente:4839035.4,d30:0,d60:0,d90:0,dmas90:0,total:4839035.4,diasVencidos:0},
  {contrato:"APL0306-008-001",idArr:1378,nombre:"ALUMINIO DE BAJA CALIFORNIA, S.A. DE C.V.",bien:"MAQUINARIA Y EQUIPO INDUSTRIAL",fechaDesembolso:"2026-03-10",fecha1erPago:"2026-04-10",fechaVencimiento:"2030-03-10",valorBienSinIVA:4131181.36,pagoInicial:41311.81,montoFinanciado:4089869.55,rentasFijas:129968.49,tasa:22.5,tir:2.62,plazo:48,totalRentas:6238487.52,rentaPorDevengar:6238487.52,opcionCompra:132197.8,alCorriente:6238487.52,d30:0,d60:0,d90:0,dmas90:0,total:6238487.52,diasVencidos:0},
  {contrato:"APL0306-009-001",idArr:1379,nombre:"ALUMINIO DE BAJA CALIFORNIA, S.A. DE C.V.",bien:"MAQUINARIA Y EQUIPO INDUSTRIAL",fechaDesembolso:"2026-03-10",fecha1erPago:"2026-04-10",fechaVencimiento:"2030-03-10",valorBienSinIVA:2650715.2,pagoInicial:26507.15,montoFinanciado:2624208.05,rentasFijas:83392.48,tasa:22.5,tir:2.62,plazo:48,totalRentas:4002839.04,rentaPorDevengar:4002839.04,opcionCompra:84822.89,alCorriente:4002839.04,d30:0,d60:0,d90:0,dmas90:0,total:4002839.04,diasVencidos:0},
  {contrato:"APL0306-011-001",idArr:1380,nombre:"ALUMINIO DE BAJA CALIFORNIA, S.A. DE C.V.",bien:"MAQUINARIA Y EQUIPO INDUSTRIAL",fechaDesembolso:"2026-03-10",fecha1erPago:"2026-04-10",fechaVencimiento:"2030-03-10",valorBienSinIVA:6574752.09,pagoInicial:65747.52,montoFinanciado:6509004.57,rentasFijas:206844.13,tasa:22.5,tir:2.62,plazo:48,totalRentas:9928518.24,rentaPorDevengar:9928518.24,opcionCompra:210392.07,alCorriente:9928518.24,d30:0,d60:0,d90:0,dmas90:0,total:9928518.24,diasVencidos:0},
  {contrato:"GCP0401-001-001",idArr:1401,nombre:"GRUPO CONSTRUCTOR PACÍFICO, S.A. DE C.V.",bien:"MAQUINARIA PESADA",fechaDesembolso:"2025-08-15",fecha1erPago:"2025-09-15",fechaVencimiento:"2028-08-15",valorBienSinIVA:9850000,pagoInicial:985000,montoFinanciado:8865000,rentasFijas:308200,tasa:19.8,tir:2.35,plazo:36,totalRentas:11095200,rentaPorDevengar:8557800,opcionCompra:283200,alCorriente:8557800,d30:0,d60:0,d90:0,dmas90:0,total:8557800,diasVencidos:0},
  {contrato:"GCP0401-002-001",idArr:1402,nombre:"GRUPO CONSTRUCTOR PACÍFICO, S.A. DE C.V.",bien:"MAQUINARIA PESADA",fechaDesembolso:"2025-10-01",fecha1erPago:"2025-11-01",fechaVencimiento:"2028-10-01",valorBienSinIVA:12300000,pagoInicial:1230000,montoFinanciado:11070000,rentasFijas:385100,tasa:19.8,tir:2.35,plazo:36,totalRentas:13863600,rentaPorDevengar:11168900,opcionCompra:344400,alCorriente:11168900,d30:0,d60:0,d90:0,dmas90:0,total:11168900,diasVencidos:0},
  {contrato:"ANO0501-001-001",idArr:1410,nombre:"ALIMENTOS DEL NORTE, S.A. DE C.V.",bien:"EQUIPO DE EMPAQUE",fechaDesembolso:"2025-09-20",fecha1erPago:"2025-10-20",fechaVencimiento:"2028-09-20",valorBienSinIVA:8420000,pagoInicial:421000,montoFinanciado:7999000,rentasFijas:284500,tasa:21.0,tir:2.48,plazo:36,totalRentas:10242000,rentaPorDevengar:8247500,opcionCompra:252600,alCorriente:8247500,d30:0,d60:0,d90:0,dmas90:0,total:8247500,diasVencidos:0},
  {contrato:"LEM0601-001-001",idArr:1420,nombre:"LOGÍSTICA EXPRESS DE MÉXICO, S.A. DE C.V.",bien:"TRACTOCAMIONES",fechaDesembolso:"2025-07-10",fecha1erPago:"2025-08-10",fechaVencimiento:"2029-07-10",valorBienSinIVA:11500000,pagoInicial:1725000,montoFinanciado:9775000,rentasFijas:346200,tasa:24.0,tir:2.82,plazo:48,totalRentas:16617600,rentaPorDevengar:13510200,opcionCompra:460000,alCorriente:13510200,d30:0,d60:0,d90:0,dmas90:0,total:13510200,diasVencidos:0},
  {contrato:"LEM0601-002-001",idArr:1421,nombre:"LOGÍSTICA EXPRESS DE MÉXICO, S.A. DE C.V.",bien:"CAJAS SECAS Y REFRIGERADAS",fechaDesembolso:"2025-11-05",fecha1erPago:"2025-12-05",fechaVencimiento:"2029-11-05",valorBienSinIVA:5800000,pagoInicial:870000,montoFinanciado:4930000,rentasFijas:174800,tasa:24.0,tir:2.82,plazo:48,totalRentas:8390400,rentaPorDevengar:7341600,opcionCompra:232000,alCorriente:7341600,d30:0,d60:0,d90:0,dmas90:0,total:7341600,diasVencidos:0},
  {contrato:"SEB0701-001-001",idArr:1430,nombre:"SOLAR ENERGY BAJA CALIFORNIA, S.A. DE C.V.",bien:"PANELES SOLARES INDUSTRIALES",fechaDesembolso:"2025-10-15",fecha1erPago:"2025-11-15",fechaVencimiento:"2030-10-15",valorBienSinIVA:10200000,pagoInicial:510000,montoFinanciado:9690000,rentasFijas:252400,tasa:18.5,tir:2.18,plazo:60,totalRentas:15144000,rentaPorDevengar:12862400,opcionCompra:204000,alCorriente:12862400,d30:0,d60:0,d90:0,dmas90:0,total:12862400,diasVencidos:0},
  {contrato:"SEB0701-002-001",idArr:1431,nombre:"SOLAR ENERGY BAJA CALIFORNIA, S.A. DE C.V.",bien:"INVERSORES Y EQUIPOS ELÉCTRICOS",fechaDesembolso:"2025-12-01",fecha1erPago:"2026-01-01",fechaVencimiento:"2030-12-01",valorBienSinIVA:5850000,pagoInicial:292500,montoFinanciado:5557500,rentasFijas:144800,tasa:18.5,tir:2.18,plazo:60,totalRentas:8688000,rentaPorDevengar:7688800,opcionCompra:117000,alCorriente:7688800,d30:0,d60:0,d90:0,dmas90:0,total:7688800,diasVencidos:0},
  {contrato:"TJA0801-001-001",idArr:1440,nombre:"TEXTILES DE JALISCO, S.A. DE C.V.",bien:"TELARES INDUSTRIALES",fechaDesembolso:"2025-11-20",fecha1erPago:"2025-12-20",fechaVencimiento:"2028-11-20",valorBienSinIVA:7680000,pagoInicial:0,montoFinanciado:7680000,rentasFijas:269500,tasa:20.5,tir:2.42,plazo:36,totalRentas:9702000,rentaPorDevengar:7802500,opcionCompra:230400,alCorriente:7802500,d30:0,d60:0,d90:0,dmas90:0,total:7802500,diasVencidos:0},
  {contrato:"DFV0901-001-001",idArr:1450,nombre:"DISTRIBUIDORA FARMACÉUTICA VIDA PLUS, S.A. DE C.V.",bien:"EQUIPO DE CADENA DE FRÍO",fechaDesembolso:"2025-12-15",fecha1erPago:"2026-01-15",fechaVencimiento:"2028-12-15",valorBienSinIVA:5420000,pagoInicial:542000,montoFinanciado:4878000,rentasFijas:170500,tasa:19.0,tir:2.25,plazo:36,totalRentas:6138000,rentaPorDevengar:5285500,opcionCompra:135500,alCorriente:5285500,d30:0,d60:0,d90:0,dmas90:0,total:5285500,diasVencidos:0},
  {contrato:"MCP1001-001-001",idArr:1460,nombre:"MINERA COBRE DEL PACÍFICO, S.A. DE C.V.",bien:"MAQUINARIA DE EXTRACCIÓN MINERA",fechaDesembolso:"2025-06-01",fecha1erPago:"2025-07-01",fechaVencimiento:"2030-06-01",valorBienSinIVA:28500000,pagoInicial:2850000,montoFinanciado:25650000,rentasFijas:614200,tasa:17.5,tir:2.06,plazo:60,totalRentas:36852000,rentaPorDevengar:30238600,opcionCompra:570000,alCorriente:30238600,d30:0,d60:0,d90:0,dmas90:0,total:30238600,diasVencidos:0},
  {contrato:"MCP1001-002-001",idArr:1461,nombre:"MINERA COBRE DEL PACÍFICO, S.A. DE C.V.",bien:"EQUIPO DE TRITURACIÓN",fechaDesembolso:"2025-09-01",fecha1erPago:"2025-10-01",fechaVencimiento:"2030-09-01",valorBienSinIVA:15200000,pagoInicial:1520000,montoFinanciado:13680000,rentasFijas:327600,tasa:17.5,tir:2.06,plazo:60,totalRentas:19656000,rentaPorDevengar:16702800,opcionCompra:304000,alCorriente:16702800,d30:0,d60:0,d90:0,dmas90:0,total:16702800,diasVencidos:0},
  {contrato:"PRS1101-001-001",idArr:1470,nombre:"PLÁSTICOS REFORMA DEL SURESTE, S.A. DE C.V.",bien:"INYECTORAS DE PLÁSTICO",fechaDesembolso:"2026-01-12",fecha1erPago:"2026-02-12",fechaVencimiento:"2029-01-12",valorBienSinIVA:4850000,pagoInicial:727500,montoFinanciado:4122500,rentasFijas:152400,tasa:23.5,tir:2.76,plazo:36,totalRentas:5486400,rentaPorDevengar:5181600,opcionCompra:169750,alCorriente:5181600,d30:0,d60:0,d90:0,dmas90:0,total:5181600,diasVencidos:0},
  {contrato:"ADS1201-001-001",idArr:1480,nombre:"AGROINDUSTRIAS DEL SUR, S.A. DE C.V.",bien:"PLANTA PROCESADORA DE GRANOS",fechaDesembolso:"2025-08-20",fecha1erPago:"2025-09-20",fechaVencimiento:"2029-08-20",valorBienSinIVA:19500000,pagoInicial:975000,montoFinanciado:18525000,rentasFijas:560800,tasa:19.0,tir:2.25,plazo:48,totalRentas:26918400,rentaPorDevengar:22035800,opcionCompra:585000,alCorriente:22035800,d30:0,d60:0,d90:0,dmas90:0,total:22035800,diasVencidos:0},
  {contrato:"ADS1201-002-001",idArr:1481,nombre:"AGROINDUSTRIAS DEL SUR, S.A. DE C.V.",bien:"SILOS DE ALMACENAMIENTO",fechaDesembolso:"2025-11-15",fecha1erPago:"2025-12-15",fechaVencimiento:"2029-11-15",valorBienSinIVA:9800000,pagoInicial:490000,montoFinanciado:9310000,rentasFijas:281900,tasa:19.0,tir:2.25,plazo:48,totalRentas:13531200,rentaPorDevengar:11404600,opcionCompra:294000,alCorriente:11404600,d30:0,d60:0,d90:0,dmas90:0,total:11404600,diasVencidos:0},
  {contrato:"TSG1301-001-001",idArr:1490,nombre:"TECH SOLUTIONS DE GUADALAJARA, S.A. DE C.V.",bien:"SERVIDORES Y EQUIPO DE DATA CENTER",fechaDesembolso:"2026-02-25",fecha1erPago:"2026-03-25",fechaVencimiento:"2029-02-25",valorBienSinIVA:8200000,pagoInicial:0,montoFinanciado:8200000,rentasFijas:289500,tasa:20.0,tir:2.36,plazo:36,totalRentas:10422000,rentaPorDevengar:10132500,opcionCompra:164000,alCorriente:10132500,d30:0,d60:0,d90:0,dmas90:0,total:10132500,diasVencidos:0},
  {contrato:"TSG1301-002-001",idArr:1491,nombre:"TECH SOLUTIONS DE GUADALAJARA, S.A. DE C.V.",bien:"UPS Y CLIMATIZACIÓN",fechaDesembolso:"2026-02-25",fecha1erPago:"2026-03-25",fechaVencimiento:"2029-02-25",valorBienSinIVA:3850000,pagoInicial:0,montoFinanciado:3850000,rentasFijas:135800,tasa:20.0,tir:2.36,plazo:36,totalRentas:4888800,rentaPorDevengar:4753000,opcionCompra:77000,alCorriente:4753000,d30:0,d60:0,d90:0,dmas90:0,total:4753000,diasVencidos:0},
];

// ── QUANTO SECTION (EXPANDED) ──
function QuantoSection() {
  const [subTab, setSubTab] = useState("dashboard");
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("desc"); }
  };

  const sortedOps = useMemo(() => {
    let list = [...QUANTO_OPS];
    if (sortCol) {
      list.sort((a, b) => {
        const va = a[sortCol], vb = b[sortCol];
        let cmp = typeof va === "string" ? va.localeCompare(vb) : va - vb;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return list;
  }, [sortCol, sortDir]);

  // ── Computed Analytics ──
  const totalValorBien = QUANTO_OPS.reduce((s, o) => s + o.valorBienSinIVA, 0);
  const totalRentasDevengar = QUANTO_OPS.reduce((s, o) => s + o.rentaPorDevengar, 0);
  const totalFinanciado = QUANTO_OPS.reduce((s, o) => s + o.montoFinanciado, 0);
  const totalRentasMensuales = QUANTO_OPS.reduce((s, o) => s + o.rentasFijas, 0);
  const morosos = QUANTO_OPS.filter(o => o.d30 > 0 || o.d60 > 0 || o.d90 > 0 || o.dmas90 > 0).length;
  const avgTasa = QUANTO_OPS.reduce((s, o) => s + o.tasa, 0) / QUANTO_OPS.length;
  const uniqueClients = [...new Set(QUANTO_OPS.map(o => o.nombre))];
  const topClientExposure = QUANTO_OPS.filter(o => o.nombre === uniqueClients[0]).reduce((s, o) => s + o.montoFinanciado, 0);
  const concentrationPct = (topClientExposure / totalFinanciado * 100);
  const avgPlazoRestante = QUANTO_OPS.reduce((s, o) => s + o.plazo, 0) / QUANTO_OPS.length;
  const totalAlCorriente = QUANTO_OPS.reduce((s, o) => s + o.alCorriente, 0);
  const totalMora = QUANTO_OPS.reduce((s, o) => s + o.d30 + o.d60 + o.d90 + o.dmas90, 0);
  const morosidadPct = totalFinanciado > 0 ? (totalMora / totalFinanciado * 100) : 0;

  // Proyección de flujo mensual (próximos 12 meses)
  const flujoMensual = Array.from({ length: 12 }, (_, i) => ({
    mes: new Date(2026, 3 + i).toLocaleDateString("es-MX", { month: "short", year: "2-digit" }),
    ingreso: totalRentasMensuales * (1 - (i > 6 ? 0.02 : 0)), // simulated slight decline after month 6 due to some contracts maturing
    contratos: QUANTO_OPS.filter(o => {
      const venc = new Date(o.fechaVencimiento);
      const target = new Date(2026, 3 + i);
      return venc > target;
    }).length,
  }));

  // Vencimientos por año
  const vencByYear = {};
  QUANTO_OPS.forEach(o => {
    const y = o.fechaVencimiento.slice(0, 4);
    vencByYear[y] = (vencByYear[y] || 0) + o.montoFinanciado;
  });

  // Alerts engine
  const alerts = [];
  if (concentrationPct > 80) alerts.push({ level: "critical", icon: "error", title: "Concentración de cliente extrema", desc: `${concentrationPct.toFixed(0)}% de la cartera está en un solo cliente (${uniqueClients[0].split(",")[0]}). El estándar de la industria recomienda <25% por cliente.`, action: "Diversificar cartera con nuevos clientes en otros sectores" });
  if (uniqueClients.length < 3) alerts.push({ level: "warning", icon: "warning", title: "Baja diversificación de clientes", desc: `Solo ${uniqueClients.length} cliente(s) activo(s). Una arrendadora saludable tiene 15+ clientes.`, action: "Activar pipeline de prospección comercial" });
  const singleIndustry = [...new Set(QUANTO_OPS.map(o => o.bien))];
  if (singleIndustry.length === 1) alerts.push({ level: "warning", icon: "warning", title: "Concentración de industria: " + singleIndustry[0], desc: "100% de los contratos en una sola industria. Aranceles, caída de demanda o disrupciones en la cadena afectarían toda la cartera.", action: "Explorar sectores como transporte, construcción, energía solar, alimentos" });
  if (morosidadPct === 0) alerts.push({ level: "ok", icon: "check_circle", title: "Cartera 100% al corriente", desc: "Cero morosidad en todos los contratos. Excelente salud de cartera.", action: "Mantener monitoreo mensual" });
  const alumAranceles = true; // industry flag
  if (alumAranceles) alerts.push({ level: "warning", icon: "report", title: "Riesgo sectorial: Aranceles al aluminio", desc: "La industria del aluminio en México enfrenta presión por aranceles de EE.UU. ABC Aluminum exporta ~90% de su producción. Un aumento arancelario impactaría directamente su capacidad de pago.", action: "Monitorear política comercial EE.UU.-México y evaluar covenants de protección" });
  // Plazo concentration
  const allSamePlazo = QUANTO_OPS.every(o => o.plazo === QUANTO_OPS[0].plazo);
  if (allSamePlazo) alerts.push({ level: "info", icon: "info", title: "Vencimientos concentrados en mismo periodo", desc: `Todos los contratos (${QUANTO_OPS.length}) son a ${QUANTO_OPS[0].plazo} meses. Riesgo de cliff de refinanciamiento.`, action: "Escalonar plazos en nuevos contratos (24, 36, 48, 60 meses)" });

  // Industry benchmarks
  const benchmarks = [
    { metric: "Morosidad cartera", valor: `${morosidadPct.toFixed(1)}%`, benchmark: "< 5%", status: morosidadPct < 5 ? "ok" : morosidadPct < 10 ? "warning" : "critical" },
    { metric: "Concentración top cliente", valor: `${concentrationPct.toFixed(0)}%`, benchmark: "< 25%", status: concentrationPct < 25 ? "ok" : concentrationPct < 50 ? "warning" : "critical" },
    { metric: "Nº clientes activos", valor: uniqueClients.length.toString(), benchmark: "> 15", status: uniqueClients.length > 15 ? "ok" : uniqueClients.length > 5 ? "warning" : "critical" },
    { metric: "Diversificación industrias", valor: singleIndustry.length.toString(), benchmark: "> 4", status: singleIndustry.length > 4 ? "ok" : singleIndustry.length > 2 ? "warning" : "critical" },
    { metric: "Tasa promedio ponderada", valor: `${avgTasa.toFixed(1)}%`, benchmark: "18-26%", status: avgTasa >= 18 && avgTasa <= 26 ? "ok" : "warning" },
    { metric: "Plazo promedio restante", valor: `${avgPlazoRestante.toFixed(0)} meses`, benchmark: "24-48m", status: avgPlazoRestante >= 24 && avgPlazoRestante <= 48 ? "ok" : "warning" },
    { metric: "Ratio devengar/financiado", valor: `${(totalRentasDevengar / totalFinanciado * 100).toFixed(0)}%`, benchmark: "Ref.", status: "info" },
    { metric: "Ingreso mensual recurrente", valor: fmt(totalRentasMensuales), benchmark: "Ref.", status: "info" },
  ];

  const SortHeader = ({ col, label }) => {
    const active = sortCol === col;
    return (
      <button onClick={() => handleSort(col)} style={{ background: "none", border: "none", padding: "11px 0", cursor: "pointer", display: "flex", alignItems: "center", gap: 2, fontSize: 9, fontWeight: 700, color: active ? T.navy : T.textTertiary, textTransform: "uppercase", letterSpacing: 0.6, fontFamily: "inherit", textAlign: "left" }}>
        {label}<span style={{ fontSize: 9, color: active ? T.blue : "transparent" }}>{active ? (sortDir === "asc" ? "↑" : "↓") : "·"}</span>
      </button>
    );
  };

  const subTabs = [
    { id: "dashboard", label: "Dashboard & Alertas" },
    { id: "operaciones", label: "Reporte Operaciones" },
    { id: "cobranza", label: "Reporte Cobranza" },
  ];

  return (
    <div style={{ animation: "fadeUp .5s ease" }}>
      {/* KPIs strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        <Kpi label="Valor Bienes s/IVA" value={fmt(totalValorBien)} icon="factory" />
        <Kpi label="Total Financiado" value={fmt(totalFinanciado)} icon="credit_card" accent={T.blue} />
        <Kpi label="Rentas por Devengar" value={fmt(totalRentasDevengar)} icon="request_quote" accent={T.amber} />
        <Kpi label="Ingreso Mensual" value={fmt(totalRentasMensuales)} icon="payments" accent={T.green} />
        <Kpi label="Contratos Activos" value={QUANTO_OPS.length.toString()} icon="description" />
        <Kpi label="Morosidad" value={`${morosidadPct.toFixed(1)}%`} icon="warning" accent={morosidadPct > 0 ? T.red : T.green} />
      </div>

      {/* Sub tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 18, background: T.surfaceAlt, borderRadius: T.radiusSm, padding: 3, width: "fit-content" }}>
        {subTabs.map(t => (
          <button key={t.id} onClick={() => { setSubTab(t.id); setSortCol(null); }} style={{ padding: "7px 16px", border: "none", borderRadius: 5, background: subTab === t.id ? T.surface : "transparent", color: subTab === t.id ? T.navy : T.textTertiary, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: subTab === t.id ? T.shadow : "none" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ═══ DASHBOARD & ALERTAS ═══ */}
      {subTab === "dashboard" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* ALERTS */}
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow }}>
            <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: T.navy, margin: 0 }}>Sistema de Alertas Tempranas</h3>
                <p style={{ fontSize: 11, color: T.textTertiary, margin: "2px 0 0" }}>Análisis automático de riesgos de cartera vs proyecciones de industria</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.textTertiary, padding: "4px 12px", background: T.surfaceAlt, borderRadius: 5 }}>{alerts.length} señales detectadas</span>
            </div>
            {alerts.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "14px 20px", borderBottom: i < alerts.length - 1 ? `1px solid ${T.borderLight}` : "none", alignItems: "flex-start" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, flexShrink: 0, marginTop: 2, color: a.level === "critical" ? T.red : a.level === "warning" ? T.amber : a.level === "ok" ? T.green : T.blue }}>{a.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 3 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.5, marginBottom: 6 }}>{a.desc}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.blue, display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ fontSize: 9 }}>→</span> {a.action}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
            {/* BENCHMARKS vs INDUSTRIA */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow }}>
              <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}` }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: T.navy, margin: 0 }}>Salud de Cartera vs Industria</h3>
                <p style={{ fontSize: 10, color: T.textTertiary, margin: "2px 0 0" }}>Benchmarks para arrendadoras en México</p>
              </div>
              {benchmarks.map((b, i) => {
                const colors = { ok: { bg: T.greenLight, color: T.green }, warning: { bg: T.amberLight, color: T.amber }, critical: { bg: T.redLight, color: T.red }, info: { bg: T.blueLight, color: T.blue } };
                const c = colors[b.status];
                return (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 70px auto", alignItems: "center", gap: 8, padding: "10px 20px", borderBottom: i < benchmarks.length - 1 ? `1px solid ${T.borderLight}` : "none" }}>
                    <span style={{ fontSize: 12, color: T.textSecondary }}>{b.metric}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: c.color, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{b.valor}</span>
                    <span style={{ fontSize: 10, color: T.textTertiary, textAlign: "center" }}>meta: {b.benchmark}</span>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color, flexShrink: 0 }} />
                  </div>
                );
              })}
            </div>

            {/* FLUJO PROYECTADO 12 MESES */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow }}>
              <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}` }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: T.navy, margin: 0 }}>Proyección de Flujo — 12 Meses</h3>
                <p style={{ fontSize: 10, color: T.textTertiary, margin: "2px 0 0" }}>Ingreso mensual estimado por rentas</p>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 120 }}>
                  {flujoMensual.map((m, i) => {
                    const maxV = Math.max(...flujoMensual.map(x => x.ingreso));
                    const h = maxV > 0 ? (m.ingreso / maxV) * 100 : 0;
                    return (
                      <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                        <span style={{ fontSize: 8, color: T.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(m.ingreso)}</span>
                        <div style={{ width: "100%", height: h, borderRadius: "3px 3px 1px 1px", background: m.contratos < QUANTO_OPS.length ? `${T.amber}90` : `${T.blue}90` }} />
                        <span style={{ fontSize: 8, color: T.textTertiary }}>{m.mes}</span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 16, marginTop: 10, justifyContent: "center" }}>
                  <span style={{ fontSize: 10, color: T.textTertiary, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: T.blue, opacity: .6 }} /> Todos los contratos activos</span>
                  <span style={{ fontSize: 10, color: T.textTertiary, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: T.amber, opacity: .6 }} /> Contratos vencidos (menos ingreso)</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {/* CONCENTRACIÓN POR CLIENTE */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow }}>
              <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}` }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: T.navy, margin: 0 }}>Concentración por Cliente</h3>
              </div>
              <div style={{ padding: "12px 20px" }}>
                {uniqueClients.map((name, i) => {
                  const clientTotal = QUANTO_OPS.filter(o => o.nombre === name).reduce((s, o) => s + o.montoFinanciado, 0);
                  const pct = clientTotal / totalFinanciado * 100;
                  const contracts = QUANTO_OPS.filter(o => o.nombre === name).length;
                  return (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{name.split(",")[0]}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: pct > 50 ? T.red : T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{pct.toFixed(1)}% · {contracts} contratos</span>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, borderRadius: 4, background: pct > 50 ? `linear-gradient(90deg, ${T.red}, ${T.amber})` : T.blue }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VENCIMIENTOS POR AÑO */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow }}>
              <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}` }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: T.navy, margin: 0 }}>Vencimientos por Año</h3>
                <p style={{ fontSize: 10, color: T.textTertiary, margin: "2px 0 0" }}>Monto financiado que vence cada año</p>
              </div>
              <div style={{ padding: "12px 20px" }}>
                {Object.entries(vencByYear).sort().map(([year, amount], i) => {
                  const pct = amount / totalFinanciado * 100;
                  const contracts = QUANTO_OPS.filter(o => o.fechaVencimiento.startsWith(year)).length;
                  return (
                    <div key={year} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                      <span style={{ fontSize: 16, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", width: 44 }}>{year}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ height: 22, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden", position: "relative" }}>
                          <div style={{ height: "100%", width: `${pct}%`, borderRadius: 4, background: T.blue, opacity: .7 }} />
                          <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 10, fontWeight: 700, color: T.textSecondary }}>{fmt(amount)} · {contracts} cont.</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIESGO SECTORIAL */}
            <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow }}>
              <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}` }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: T.navy, margin: 0 }}>Indicadores de Riesgo Sectorial</h3>
                <p style={{ fontSize: 10, color: T.textTertiary, margin: "2px 0 0" }}>Proyecciones para Manufactura / Aluminio en México</p>
              </div>
              <div style={{ padding: "8px 0" }}>
                {[
                  { factor: "Demanda de aluminio EE.UU.", tendencia: "Estable", riesgo: "Medio", color: T.amber },
                  { factor: "Aranceles al aluminio", tendencia: "En aumento", riesgo: "Alto", color: T.red },
                  { factor: "Tipo de cambio MXN/USD", tendencia: "Volatil", riesgo: "Medio", color: T.amber },
                  { factor: "Costos energéticos MX", tendencia: "Al alza", riesgo: "Medio-Alto", color: T.amber },
                  { factor: "Crecimiento sector automotriz", tendencia: "Positivo", riesgo: "Bajo", color: T.green },
                  { factor: "Nearshoring / inversión extranjera", tendencia: "Positivo", riesgo: "Bajo", color: T.green },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 20px", borderBottom: i < 5 ? `1px solid ${T.borderLight}` : "none" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 12, color: T.text }}>{item.factor}</span>
                    <span style={{ fontSize: 10, color: T.textTertiary, width: 80, textAlign: "right" }}>{item.tendencia}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: item.color, padding: "2px 8px", borderRadius: 4, background: `${item.color}12`, width: 75, textAlign: "center" }}>{item.riesgo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ OPERACIONES TABLE ═══ */}
      {subTab === "operaciones" && (
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow, overflowX: "auto" }}>
          <div style={{ minWidth: 1200, display: "grid", gridTemplateColumns: "100px minmax(140px,1.5fr) 85px 85px 85px 70px 90px 90px 90px 95px", padding: "0 16px", borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt, gap: 4 }}>
            <SortHeader col="contrato" label="ID Contrato" />
            <SortHeader col="nombre" label="Empresa" />
            <SortHeader col="fechaDesembolso" label="Desembolso" />
            <SortHeader col="fechaVencimiento" label="Vencimiento" />
            <SortHeader col="fecha1erPago" label="1er Pago" />
            <SortHeader col="pagoInicial" label="P. Inicial" />
            <SortHeader col="valorBienSinIVA" label="Valor Bien" />
            <SortHeader col="tasa" label="Tasa / TIR" />
            <SortHeader col="totalRentas" label="Total Rentas" />
            <SortHeader col="rentaPorDevengar" label="x Devengar" />
          </div>
          {sortedOps.map((o, i) => (
            <div key={o.contrato} style={{ minWidth: 1200, display: "grid", gridTemplateColumns: "100px minmax(140px,1.5fr) 85px 85px 85px 70px 90px 90px 90px 95px", padding: "12px 16px", borderBottom: i < sortedOps.length - 1 ? `1px solid ${T.borderLight}` : "none", gap: 4, fontSize: 11, alignItems: "center", animation: `fadeUp .3s ease ${i*.05}s both` }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: T.navy }}>{o.contrato}</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.nombre.length > 30 ? o.nombre.slice(0,28)+"…" : o.nombre}</div>
                <div style={{ fontSize: 9, color: T.textTertiary }}>{o.bien}</div>
              </div>
              <span style={{ color: T.textSecondary }}>{o.fechaDesembolso.slice(5)}</span>
              <span style={{ color: T.textSecondary }}>{o.fechaVencimiento.slice(5)}</span>
              <span style={{ color: T.textSecondary }}>{o.fecha1erPago.slice(5)}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textSecondary }}>{fmtShort(o.pagoInicial)}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: T.text }}>{fmtShort(o.valorBienSinIVA)}</span>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: T.navy }}>{o.tasa}%</div>
                <div style={{ fontSize: 9, color: T.textTertiary }}>TIR {o.tir}%</div>
              </div>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: T.text }}>{fmtShort(o.totalRentas)}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: T.blue }}>{fmtShort(o.rentaPorDevengar)}</span>
            </div>
          ))}
          <div style={{ minWidth: 1200, display: "grid", gridTemplateColumns: "100px minmax(140px,1.5fr) 85px 85px 85px 70px 90px 90px 90px 95px", padding: "10px 16px", background: T.surfaceAlt, borderTop: `2px solid ${T.border}`, gap: 4, fontSize: 11, fontWeight: 800, alignItems: "center" }}>
            <span></span><span style={{ color: T.navy }}>TOTALES ({QUANTO_OPS.length} contratos)</span><span></span><span></span><span></span><span></span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.navy }}>{fmtShort(totalValorBien)}</span>
            <span></span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.navy }}>{fmtShort(QUANTO_OPS.reduce((s,o)=>s+o.totalRentas,0))}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.blue }}>{fmtShort(totalRentasDevengar)}</span>
          </div>
        </div>
      )}

      {/* ═══ COBRANZA TABLE ═══ */}
      {subTab === "cobranza" && (
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow, overflowX: "auto" }}>
          <div style={{ minWidth: 1050, display: "grid", gridTemplateColumns: "100px minmax(150px,1.8fr) 90px 55px 70px 70px 70px 80px 100px", padding: "0 16px", borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt, gap: 4 }}>
            <SortHeader col="contrato" label="ID Contrato" />
            <SortHeader col="nombre" label="Empresa" />
            <SortHeader col="rentasFijas" label="Monto Renta" />
            <SortHeader col="plazo" label="Plazo" />
            <SortHeader col="d30" label="30 días" />
            <SortHeader col="d60" label="60 días" />
            <SortHeader col="d90" label="90 días" />
            <SortHeader col="dmas90" label="+90 días" />
            <SortHeader col="total" label="Saldo Actual" />
          </div>
          {sortedOps.map((o, i) => {
            const hasMora = o.d30 > 0 || o.d60 > 0 || o.d90 > 0 || o.dmas90 > 0;
            return (
              <div key={o.contrato} style={{ minWidth: 1050, display: "grid", gridTemplateColumns: "100px minmax(150px,1.8fr) 90px 55px 70px 70px 70px 80px 100px", padding: "12px 16px", borderBottom: i < sortedOps.length - 1 ? `1px solid ${T.borderLight}` : "none", gap: 4, fontSize: 11, alignItems: "center", animation: `fadeUp .3s ease ${i*.05}s both` }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 600, color: T.navy }}>{o.contrato}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.nombre.length > 35 ? o.nombre.slice(0,33)+"…" : o.nombre}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: T.text }}>{fmt(o.rentasFijas)}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textSecondary }}>{o.plazo}m</span>
                <MoraCell value={o.d30} />
                <MoraCell value={o.d60} />
                <MoraCell value={o.d90} />
                <MoraCell value={o.dmas90} severe />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: hasMora ? T.red : T.navy }}>{fmtShort(o.total)}</span>
              </div>
            );
          })}
          <div style={{ minWidth: 1050, display: "grid", gridTemplateColumns: "100px minmax(150px,1.8fr) 90px 55px 70px 70px 70px 80px 100px", padding: "10px 16px", background: T.surfaceAlt, borderTop: `2px solid ${T.border}`, gap: 4, fontSize: 11, fontWeight: 800, alignItems: "center" }}>
            <span></span><span style={{ color: T.navy }}>TOTALES</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.navy }}>{fmt(QUANTO_OPS.reduce((s,o)=>s+o.rentasFijas,0))}</span>
            <span></span>
            <MoraCell value={QUANTO_OPS.reduce((s,o)=>s+o.d30,0)} />
            <MoraCell value={QUANTO_OPS.reduce((s,o)=>s+o.d60,0)} />
            <MoraCell value={QUANTO_OPS.reduce((s,o)=>s+o.d90,0)} />
            <MoraCell value={QUANTO_OPS.reduce((s,o)=>s+o.dmas90,0)} severe />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 800, color: T.navy }}>{fmtShort(QUANTO_OPS.reduce((s,o)=>s+o.total,0))}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MoraCell({ value, severe }) {
  if (value === 0) return <span style={{ fontSize: 10, color: T.textTertiary }}>—</span>;
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: severe ? T.red : T.amber, padding: "2px 6px", borderRadius: 4, background: severe ? T.redLight : T.amberLight }}>
      {fmtShort(value)}
    </span>
  );
}

// ── REMINDERS SECTION ──
function RemindersSection() {
  const [reminders, setReminders] = useState(REMINDERS_INIT);
  const [showNew, setShowNew] = useState(false);
  const [newR, setNewR] = useState({ clientId: CLIENTS[0].id, tipo: "whatsapp", diasAntes: 5, mensaje: "" });

  const toggle = (id) => setReminders(rs => rs.map(r => r.id === id ? { ...r, activo: !r.activo } : r));
  const remove = (id) => setReminders(rs => rs.filter(r => r.id !== id));
  const addReminder = () => {
    if (!newR.mensaje.trim()) return;
    setReminders(rs => [...rs, { ...newR, id: Date.now(), activo: true }]);
    setNewR({ clientId: CLIENTS[0].id, tipo: "whatsapp", diasAntes: 5, mensaje: "" });
    setShowNew(false);
  };

  return (
    <div style={{ animation: "fadeUp .5s ease" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", margin: 0 }}>Automatizaciones de Cobro</h2>
          <p style={{ fontSize: 12, color: T.textTertiary, marginTop: 2 }}>Programa recordatorios automáticos de pago por WhatsApp o Email</p>
        </div>
        <button onClick={() => setShowNew(!showNew)} style={{ padding: "9px 18px", background: T.navy, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          {showNew ? "Cancelar" : "+ Nuevo Recordatorio"}
        </button>
      </div>

      {/* New Reminder Form */}
      {showNew && (
        <div style={{ background: T.blueLight, border: `1px solid ${T.blue}20`, borderRadius: T.radius, padding: 20, marginBottom: 18, animation: "fadeUp .3s ease" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginBottom: 14 }}>Configurar nuevo recordatorio</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={lbl}>Cliente</label>
              <select value={newR.clientId} onChange={e => setNewR({ ...newR, clientId: e.target.value })} style={inp}>
                {CLIENTS.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Canal</label>
              <select value={newR.tipo} onChange={e => setNewR({ ...newR, tipo: e.target.value })} style={inp}>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Días antes del vencimiento</label>
              <select value={newR.diasAntes} onChange={e => setNewR({ ...newR, diasAntes: +e.target.value })} style={inp}>
                {[1, 2, 3, 5, 7, 10, 15].map(d => <option key={d} value={d}>{d} día{d > 1 ? "s" : ""}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={lbl}>Mensaje (usa &#123;fecha&#125;, &#123;monto&#125;, &#123;dias&#125; como variables)</label>
            <textarea value={newR.mensaje} onChange={e => setNewR({ ...newR, mensaje: e.target.value })} placeholder="Ej: Hola, te recordamos que tu pago de {monto} vence el {fecha}." rows={3}
              style={{ ...inp, resize: "vertical", minHeight: 70 }} />
          </div>
          <button onClick={addReminder} style={{ padding: "10px 24px", background: T.blue, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Guardar Recordatorio
          </button>
        </div>
      )}

      {/* Reminders List */}
      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow }}>
        {reminders.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: T.textTertiary }}>No hay recordatorios programados</div>
        ) : reminders.map((r, i) => {
          const client = CLIENTS.find(c => c.id === r.clientId);
          const canalIcon = r.tipo === "whatsapp" ? "💬" : r.tipo === "email" ? "📧" : "📱";
          return (
            <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderBottom: i < reminders.length - 1 ? `1px solid ${T.borderLight}` : "none", opacity: r.activo ? 1 : 0.45, transition: "opacity .2s" }}>
              {/* Toggle */}
              <button onClick={() => toggle(r.id)} style={{ width: 40, height: 22, borderRadius: 11, border: "none", background: r.activo ? T.green : T.border, cursor: "pointer", position: "relative", flexShrink: 0, transition: "background .2s" }}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: r.activo ? 21 : 3, transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,.15)" }} />
              </button>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 13, color: T.navy }}>{client?.nombre || "—"}</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: T.surfaceAlt, color: T.textSecondary, fontWeight: 600 }}>
                    {canalIcon} {r.tipo.charAt(0).toUpperCase() + r.tipo.slice(1)}
                  </span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: T.amberLight, color: T.amber, fontWeight: 700 }}>
                    {r.diasAntes} día{r.diasAntes > 1 ? "s" : ""} antes
                  </span>
                </div>
                <p style={{ fontSize: 12, color: T.textSecondary, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.mensaje}</p>
              </div>
              <button onClick={() => remove(r.id)} style={{ background: "none", border: "none", color: T.textTertiary, cursor: "pointer", fontSize: 16, padding: 4, flexShrink: 0 }} title="Eliminar">×</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const lbl = { fontSize: 11, fontWeight: 600, color: T.textSecondary, display: "block", marginBottom: 4 };
const inp = { width: "100%", padding: "9px 12px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, color: T.text, fontSize: 13, fontFamily: "'Plus Jakarta Sans', sans-serif", outline: "none" };

// ═══════════════════════════════════════════════
// DETAIL VIEW
// ═══════════════════════════════════════════════
function DetailView({ client: c }) {
  const [tab, setTab] = useState("resumen");
  const tabs = [
    { id: "resumen", label: "Resumen" },
    { id: "activo", label: "Información del Activo" },
    { id: "calificacion", label: "Calificación Ekatena" },
    { id: "financiero", label: "Financiero" },
    { id: "pasivos", label: "Pasivos" },
    { id: "buro", label: "Buró de Crédito" },
  ];

  return (
    <>
      <nav style={{ display: "flex", gap: 2, padding: "0 28px", background: T.surface, borderBottom: `1px solid ${T.border}`, overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "12px 18px", border: "none", borderBottom: tab === t.id ? `2px solid ${T.navy}` : "2px solid transparent", background: "transparent", color: tab === t.id ? T.navy : T.textTertiary, fontSize: 12, fontWeight: tab === t.id ? 700 : 500, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", transition: "all .15s" }}>
            {t.label}
          </button>
        ))}
      </nav>
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 28px", animation: "fadeIn .25s ease" }}>
        {tab === "resumen" && <TabResumen c={c} />}
        {tab === "activo" && <TabActivo c={c} />}
        {tab === "calificacion" && <TabCalificacion c={c} />}
        {tab === "financiero" && <TabFinanciero c={c} />}
        {tab === "pasivos" && <TabPasivos c={c} />}
        {tab === "buro" && <TabBuro c={c} />}
      </main>
    </>
  );
}

// ═══════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════
const card = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow };
const cardHead = (title, sub) => (
  <div style={{ padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}` }}>
    <h3 style={{ fontSize: 14, fontWeight: 700, color: T.navy, margin: 0 }}>{title}</h3>
    {sub && <p style={{ fontSize: 11, color: T.textTertiary, margin: "2px 0 0" }}>{sub}</p>}
  </div>
);

function InfoRow({ label, value, accent, mono }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 20px", borderBottom: `1px solid ${T.borderLight}`, gap: 16 }}>
      <span style={{ fontSize: 12, color: T.textTertiary, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: accent ? 700 : 500, color: accent ? T.navy : T.text, textAlign: "right", fontFamily: mono ? "'Courier New', monospace" : "inherit", wordBreak: "break-word" }}>{value}</span>
    </div>
  );
}

function Kpi({ label, value, icon, accent }) {
  return (
    <div style={{ ...card, padding: "18px 20px", display: "flex", gap: 14, alignItems: "center" }}>
      <div style={{ width: 40, height: 40, borderRadius: T.radiusSm, background: T.surfaceAlt, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><span className="material-symbols-outlined" style={{ fontSize: 22, color: accent || T.textSecondary }}>{icon}</span></div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 600, color: T.textTertiary, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: accent || T.navy, fontFamily: "'JetBrains Mono', monospace", marginTop: 1, whiteSpace: "nowrap" }}>{value}</div>
      </div>
    </div>
  );
}

function Sel({ value, onChange, options }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{ padding: "10px 12px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, color: T.textSecondary, fontSize: 12, fontFamily: "inherit", outline: "none", cursor: "pointer" }}>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  );
}

function StatusPill({ status }) {
  const map = { ok: { bg: T.greenLight, color: T.green, label: "Sin incidencias" }, warning: { bg: T.amberLight, color: T.amber, label: "Alerta" }, info: { bg: T.blueLight, color: T.blue, label: "Nota" } };
  const s = map[status] || map.info;
  return <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 5, fontSize: 10, fontWeight: 700, background: s.bg, color: s.color }}>{s.label}</span>;
}

function ScoreRing({ score, max = 1000, size = 150 }) {
  const pct = score / max; const r = (size - 12) / 2; const circ = 2 * Math.PI * r; const offset = circ * (1 - pct); const color = scoreColor(score, max);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.borderLight} strokeWidth="7" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="7" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 32, fontWeight: 800, color, fontFamily: "'JetBrains Mono', monospace" }}>{score}</span>
        <span style={{ fontSize: 10, color: T.textTertiary }}>/ {max}</span>
      </div>
    </div>
  );
}

function MiniBar({ data, height = 100, color = T.blue }) {
  const maxVal = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height, padding: "0 8px" }}>
      {data.map((d, i) => {
        const h = maxVal > 0 ? (d.v / maxVal) * height * .78 : 0;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontSize: 10, color: T.textSecondary, fontWeight: 600 }}>{fmtShort(d.v * 1000)}</span>
            <div style={{ width: "100%", maxWidth: 40, height: h, borderRadius: "5px 5px 2px 2px", background: color, opacity: 0.8 }} />
            <span style={{ fontSize: 10, color: T.textTertiary }}>{d.p}</span>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════
// DETAIL TABS
// ═══════════════════════════════════════════════

// -- RESUMEN (NEW — overview of the client) --
function TabResumen({ c }) {
  const sc = scoreColor(c.calificacion.score);
  const progreso = c.pagosRealizados / (c.pagosRealizados + c.pagosRestantes);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Hero strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
        <div style={{ ...card, padding: "20px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .5 }}>Razón Social</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{c.razonSocial}</span>
          <span style={{ fontSize: 11, color: T.textTertiary, fontFamily: "monospace" }}>{c.rfc}</span>
        </div>
        <div style={{ ...card, padding: "20px", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: `${sc}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: sc, fontFamily: "'JetBrains Mono', monospace" }}>{c.calificacion.score}</span>
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .5 }}>Score Ekatena</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: sc }}>Riesgo {c.calificacion.riesgo}</div>
          </div>
        </div>
        <div style={{ ...card, padding: "20px" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .5, marginBottom: 4 }}>Próximo Pago</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: c.diasParaPago <= 3 ? T.red : T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{c.proximoPago}</div>
          <div style={{ fontSize: 11, color: c.diasParaPago <= 3 ? T.red : T.textTertiary, fontWeight: c.diasParaPago <= 3 ? 700 : 400, marginTop: 2 }}>
            {c.diasParaPago <= 3 ? `⚠ Vence en ${c.diasParaPago} día${c.diasParaPago !== 1 ? "s" : ""}` : `En ${c.diasParaPago} días`}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        {/* Left: company + people */}
        <div style={card}>
          {cardHead("Datos Generales")}
          <InfoRow label="Actividad / Giro" value={c.giro} accent />
          <InfoRow label="Constitución" value={`${c.fechaConstitucion} (${c.antiguedad})`} />
          <InfoRow label="Dirección" value={c.direccion} />
          <InfoRow label="Web" value={<a href={c.paginaWeb} target="_blank" rel="noreferrer" style={{ color: T.blue, textDecoration: "none", fontSize: 12 }}>{c.paginaWeb}</a>} />
          <InfoRow label="Obligado Solidario" value={c.obligadoSolidario} accent />
          <InfoRow label="Ejecutivo Comercial" value={c.ejecutivoComercial} />
        </div>
        {/* Right: accionistas + payment progress */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={card}>
            {cardHead("Cuadro Accionario")}
            {c.accionistas.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px", borderBottom: i < c.accionistas.length - 1 ? `1px solid ${T.borderLight}` : "none" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{a.nombre}</div>
                  <div style={{ fontSize: 11, color: T.textTertiary }}>{fmt(a.monto)}</div>
                </div>
                <span style={{ fontSize: 20, fontWeight: 800, color: a.porcentaje > 50 ? T.navy : T.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}>{a.porcentaje}%</span>
              </div>
            ))}
          </div>
          <div style={{ ...card, padding: "18px 20px" }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .5, marginBottom: 10 }}>Progreso de Pagos</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 24, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{c.pagosRealizados}/{c.pagosRealizados + c.pagosRestantes}</span>
              <span style={{ fontSize: 12, color: T.textTertiary }}>Saldo: {fmt(c.saldoPendiente)}</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progreso * 100}%`, borderRadius: 4, background: `linear-gradient(90deg, ${T.blue}, ${T.green})`, transition: "width 1s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: T.textTertiary }}>
              <span>{c.pagosRealizados} realizados</span>
              <span>{c.pagosRestantes} restantes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -- ACTIVO --
function TabActivo({ c }) {
  const a = c.activo;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ ...card, background: `linear-gradient(135deg, ${T.blueLight}, ${T.surface})` }}>
        <div style={{ padding: "22px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Descripción del Activo</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", margin: "6px 0 0" }}>{a.descripcionGeneral}</h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Total USD</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{fmtUSD(a.totalGeneralUSD)}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 16 }}>
        {a.operaciones.map((op, oi) => (
          <div key={oi} style={card}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: `1px solid ${T.borderLight}`, background: T.surfaceAlt }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: oi === 0 ? T.blue : T.amber }} />
              <h3 style={{ fontSize: 13, fontWeight: 700, color: T.navy, margin: 0, flex: 1 }}>{op.tipo}</h3>
              <span style={{ fontSize: 15, fontWeight: 800, color: oi === 0 ? T.blue : T.amber, fontFamily: "'JetBrains Mono', monospace" }}>{fmtUSD(op.totalUSD)}</span>
            </div>
            {op.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 20px", borderBottom: ii < op.items.length - 1 ? `1px solid ${T.borderLight}` : "none", gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: T.text }}>{item.descripcion}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.textSecondary, fontFamily: "'Courier New', monospace", flexShrink: 0 }}>{fmtUSD(item.costoUSD)}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={card}>
        {cardHead("Términos del Financiamiento")}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 1, background: T.borderLight }}>
          {[
            { l: "Producto", v: c.financiamiento.producto },
            { l: "Valor Factura", v: fmt(c.financiamiento.valorFactura), b: true },
            { l: "Plazo", v: `${c.financiamiento.plazo} meses` },
            { l: "Tasa VNA", v: c.financiamiento.tasaVNA },
            { l: "TIR", v: c.financiamiento.tir },
            { l: "Comisión Apertura", v: c.financiamiento.comisionApertura },
            { l: "Enganche", v: c.financiamiento.enganche },
            { l: "Rentas en Depósito", v: c.financiamiento.rentasDeposito?.toString() },
            { l: "Valor Residual", v: c.financiamiento.valorResidual },
            { l: "Opción Compra", v: c.financiamiento.opcionCompra },
            { l: "Renta s/IVA", v: fmt(c.financiamiento.rentaMensualSIVA), b: true },
            { l: "Renta c/IVA", v: fmt(c.financiamiento.rentaMensualCIVA), b: true },
          ].map((item, i) => (
            <div key={i} style={{ background: T.surface, padding: "12px 14px" }}>
              <div style={{ fontSize: 9, fontWeight: 600, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .4, marginBottom: 3 }}>{item.l}</div>
              <div style={{ fontSize: 13, fontWeight: item.b ? 800 : 600, color: item.b ? T.navy : T.text }}>{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// -- CALIFICACION --
function TabCalificacion({ c }) {
  const cal = c.calificacion;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
      <div style={{ ...card, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "36px 20px", gap: 14 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Score Ekatena</span>
        <ScoreRing score={cal.score} max={cal.maxScore} />
        <span style={{ padding: "5px 16px", borderRadius: 6, background: scoreBg(cal.score), color: scoreColor(cal.score), fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: .5 }}>Riesgo {cal.riesgo}</span>
        <p style={{ fontSize: 11, color: T.textTertiary, textAlign: "center", maxWidth: 240, lineHeight: 1.5 }}>Basado en declaraciones fiscales, facturación e indicadores cualitativos de la empresa.</p>
      </div>
      <div style={card}>
        {cardHead("Verificaciones", "Resultados de consultas regulatorias y legales")}
        {cal.checks.map((ch, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 20px", borderBottom: i < cal.checks.length - 1 ? `1px solid ${T.borderLight}` : "none" }}>
            <StatusPill status={ch.status} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.text, marginBottom: 2 }}>{ch.key}</div>
              <div style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.4 }}>{ch.texto}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// -- FINANCIERO --
function TabFinanciero({ c }) {
  const f = c.financiamiento;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        <Kpi label="Valor Factura" value={fmt(f.valorFactura)} icon="receipt_long" accent={T.blue} />
        <Kpi label="Renta Mensual s/IVA" value={fmt(f.rentaMensualSIVA)} icon="calendar_month" accent={T.green} />
        <Kpi label="Plazo" value={`${f.plazo} meses`} icon="schedule" accent={T.amber} />
        <Kpi label="TIR" value={f.tir} icon="trending_up" accent={T.purple} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
        <div style={card}>
          {cardHead("Ventas Netas", "Miles de pesos")}
          <div style={{ padding: 18 }}><MiniBar data={c.financieros.ventas} color={T.blue} /></div>
        </div>
        <div style={card}>
          {cardHead("EBITDA", "Miles de pesos")}
          <div style={{ padding: 18 }}><MiniBar data={c.financieros.ebitda} color={T.green} height={90} /></div>
        </div>
      </div>
      <div style={{ ...card, maxWidth: 440, margin: "0 auto", width: "100%", padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .5, marginBottom: 12 }}>Cobertura Saldo Promedio vs Renta</div>
        <div style={{ height: 10, borderRadius: 5, background: T.surfaceAlt, overflow: "hidden", marginBottom: 10 }}>
          <div style={{ height: "100%", width: `${Math.min(c.estadoCuenta.cobertura / 20, 1) * 100}%`, borderRadius: 5, background: `linear-gradient(90deg, ${T.green}, #34D399)` }} />
        </div>
        <span style={{ fontSize: 32, fontWeight: 900, color: c.estadoCuenta.cobertura >= 3 ? T.green : T.amber, fontFamily: "'JetBrains Mono', monospace" }}>{c.estadoCuenta.cobertura}x</span>
        <p style={{ fontSize: 11, color: T.textTertiary, marginTop: 4 }}>Meta: ≥ 3x</p>
      </div>
    </div>
  );
}

// -- PASIVOS --
function TabPasivos({ c }) {
  const p = c.pasivosFinancieros;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
        <Kpi label="Deuda Original" value={fmt(p.totalOriginal)} icon="account_balance" accent={T.red} />
        <Kpi label="Saldo Actual" value={fmt(p.totalSaldo)} icon="credit_card" accent={T.amber} />
        <Kpi label="% Amortizado" value={`${(((p.totalOriginal - p.totalSaldo) / p.totalOriginal) * 100).toFixed(1)}%`} icon="check_circle" accent={T.green} />
      </div>
      <div style={card}>
        {cardHead("Distribución por Institución Financiera")}
        <div style={{ padding: 20 }}>
          {p.principales.map((d, i) => {
            const pct = p.totalSaldo > 0 ? (d.saldo / p.totalSaldo) * 100 : 0;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < p.principales.length - 1 ? 10 : 0 }}>
                <span style={{ width: 90, fontSize: 11, fontWeight: 600, color: T.textSecondary, textAlign: "right", flexShrink: 0 }}>{d.institucion}</span>
                <div style={{ flex: 1, height: 24, background: T.surfaceAlt, borderRadius: 4, overflow: "hidden", position: "relative" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: d.color, borderRadius: 4, opacity: .75 }} />
                  <span style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", fontSize: 10, fontWeight: 700, color: T.textSecondary }}>{fmtShort(d.saldo)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// -- BURO --
function TabBuro({ c }) {
  const b = c.buroCredito;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
      <div style={{ ...card, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "36px 20px", gap: 12 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Puntaje Buró de Crédito</span>
        <ScoreRing score={b.puntaje} max={1000} />
        <span style={{ padding: "5px 16px", borderRadius: 6, background: scoreBg(b.puntaje), color: scoreColor(b.puntaje), fontWeight: 800, fontSize: 12, letterSpacing: .5 }}>Grado {b.gradoRiesgo}</span>
      </div>
      <div style={card}>
        {cardHead("Detalle de Buró")}
        <InfoRow label="Cuentas Abiertas" value={b.cuentasAbiertas} />
        <InfoRow label="Monto Original" value={fmtShort(b.montoOriginal * 1000)} />
        <InfoRow label="Saldo Actual" value={fmtShort(b.saldoActual * 1000)} />
        <InfoRow label="P. Incumplimiento" value={b.incumplimiento} />
        <InfoRow label="Estatus" value={b.estatus} accent />
      </div>
    </div>
  );
}
