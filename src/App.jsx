import React, { useState, useMemo } from "react";

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
  blue: "#2B5A8E",
  blueLight: "#A8C2DC",
  green: "#1F7A4D",
  greenLight: "#B5DCC2",
  amber: "#A66E3D",
  amberLight: "#E2C295",
  red: "#A03838",
  redLight: "#E5B0B0",
  purple: "#5E4880",
  purpleLight: "#C5B0D2",
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
      ilustracion: "/abc-aluminum/asset-photo.png",
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
    organigrama: "/abc-aluminum/organigrama.png",
    buroCredito: { puntaje: 771, gradoRiesgo: "A-1", incumplimiento: "0.9%", cuentasAbiertas: 94, montoOriginal: 2824406, saldoActual: 2079889, estatus: "Vigente — Sin atraso" },
    pasivosFinancieros: {
      totalOriginal: 2543270067, totalSaldo: 1910349175,
      principales: [
        { institucion: "BANAMEX", saldo: 553576044, color: T.blue },
        { institucion: "SANTANDER", saldo: 386560000, color: T.red },
        { institucion: "BBVA", saldo: 347260068, color: T.green },
        { institucion: "BANORTE", saldo: 289920981, color: T.amber },
        { institucion: "BANBAJIO", saldo: 193280000, color: T.purple },
        { institucion: "ACTIVE LEAS.", saldo: 78090107, color: "#8B7355" },
        { institucion: "ENGEN CAP.", saldo: 35820177, color: "#688CB3" },
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
const fmtShort = (n) => {
  const abs = Math.abs(n); const sign = n < 0 ? "-" : "";
  if (abs >= 1e9) return `${sign}$${(abs / 1e9).toFixed(2)}B`;
  if (abs >= 1e8) return `${sign}$${(abs / 1e6).toFixed(0)}M`;
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `${sign}$${(abs / 1e3).toFixed(0)}K`;
  return `${sign}$${abs}`;
};
const scoreColor = (s, max = 1000) => { const p = s / max; return p >= 0.75 ? T.green : p >= 0.5 ? T.amber : T.red; };
const scoreBg = (s, max = 1000) => { const p = s / max; return p >= 0.75 ? T.greenLight : p >= 0.5 ? T.amberLight : T.redLight; };

// ═══════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════
const NAV_SECTIONS = [
  {
    id: "direccion",
    label: "Dirección General",
    icon: "dashboard",
    items: [
      { id: "kpis-corp", label: "KPI's Corporativos" },
      { id: "dashboard-financiero", label: "Dashboard Financiero" },
    ],
  },
  {
    id: "comercial",
    label: "Comercial",
    icon: "groups",
    items: [
      { id: "clientes", label: "Clientes Activos" },
    ],
  },
  {
    id: "crm",
    label: "CRM",
    icon: "hub",
    items: [
      { id: "crm-pipeline", label: "Pipeline" },
      { id: "crm-reportes", label: "Reportes" },
      { id: "crm-bitacora", label: "Bitácora" },
    ],
  },
  {
    id: "finanzas",
    label: "Finanzas",
    icon: "account_balance",
    items: [
      { id: "working-capital", label: "Capital de Trabajo Operativo" },
    ],
  },
  {
    id: "cobranza",
    label: "Cobranza",
    icon: "paid",
    items: [
      { id: "cobranza-dashboard", label: "Dashboard & Alertas" },
      { id: "reporte-cobranza", label: "Reporte Cobranza" },
      { id: "recordatorios", label: "Recordatorios de Pago" },
    ],
  },
  {
    id: "operacion",
    label: "Operación",
    icon: "build",
    items: [
      { id: "op-general", label: "General" },
      { id: "op-admin-activos", label: "Administración de Activos" },
      { id: "op-reporte-operaciones", label: "Reporte Operaciones" },
    ],
  },
  {
    id: "riesgos",
    label: "Riesgos",
    icon: "shield",
    items: [
      { id: "riesgos-panorama", label: "Panorama" },
      { id: "riesgos-expedientes", label: "Expedientes" },
      { id: "riesgos-analisis", label: "Análisis de Riesgos" },
    ],
  },
];

// ═══════════════════════════════════════════════
// APP
// ═══════════════════════════════════════════════
export default function App() {
  const [activeSection, setActiveSection] = useState("direccion");
  const [activeItemBySection, setActiveItemBySection] = useState(() =>
    Object.fromEntries(NAV_SECTIONS.map(s => [s.id, s.items[0].id]))
  );
  const [clientId, setClientId] = useState(null);
  const [adminActivosTab, setAdminActivosTab] = useState("colocacion");

  // CRM — estado compartido entre Pipeline / Reportes / Bitácora
  const [crmDeals, setCrmDeals] = useState(CRM_DEALS_INIT);
  const [crmActivities, setCrmActivities] = useState(CRM_ACTIVITIES_INIT);
  const addDeal = (d) => setCrmDeals(prev => [{ ...d, id: `d${Date.now()}` }, ...prev]);
  const updateDeal = (id, patch) => setCrmDeals(prev => prev.map(d => d.id === id ? { ...d, ...patch } : d));
  const addActivity = (a) => setCrmActivities(prev => [{ ...a, id: Date.now() }, ...prev]);

  const section = NAV_SECTIONS.find(s => s.id === activeSection);
  const activeItem = activeItemBySection[activeSection];
  const itemMeta = section?.items.find(i => i.id === activeItem);
  const client = CLIENTS.find(c => c.id === clientId);

  const openClient = (id) => setClientId(id);
  const closeClient = () => setClientId(null);
  const navigateSection = (id) => { setClientId(null); setActiveSection(id); };
  const navigateItem = (id) => { setClientId(null); setActiveItemBySection(prev => ({ ...prev, [activeSection]: id })); };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Plus Jakarta Sans', sans-serif", display: "flex" }}>
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
        .nav-section:hover:not(.is-active){background:${T.surfaceAlt}}
      `}</style>

      <Sidebar activeSection={activeSection} onNavigate={navigateSection} />

      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Header
          showBack={!!clientId}
          onBack={closeClient}
          title={clientId ? client?.nombre : section?.label}
          subtitle={clientId ? "Expediente" : "Sección"}
        />

        {clientId && client ? (
          <DetailView client={client} />
        ) : (
          <main style={{ maxWidth: 1320, margin: "0 auto", padding: "24px 28px", width: "100%" }}>
            {/* Pestañas internas de la sección */}
            {section && section.items.length > 0 && (
              <div style={{ display: "flex", gap: 4, marginBottom: 24, background: T.surfaceAlt, borderRadius: T.radius, padding: 4, width: "fit-content", flexWrap: "wrap" }}>
                {section.items.map(it => {
                  const active = it.id === activeItem;
                  return (
                    <button key={it.id} onClick={() => navigateItem(it.id)}
                      style={{
                        padding: "9px 18px", border: "none", borderRadius: T.radiusSm,
                        background: active ? T.surface : "transparent",
                        color: active ? T.navy : T.textTertiary,
                        fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                        boxShadow: active ? T.shadow : "none",
                        display: "flex", alignItems: "center", gap: 8,
                        transition: "all .2s",
                      }}>
                      <span>{it.label}</span>
                      {it.placeholder && (
                        <span style={{ fontSize: 8, color: T.amber, fontWeight: 800, padding: "2px 6px", borderRadius: 3, background: T.amberLight, textTransform: "uppercase", letterSpacing: 0.5 }}>WIP</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {activeItem === "kpis-corp" && <KpiCorporativosSection />}
            {activeItem === "dashboard-financiero" && <DashboardFinancieroSection />}
            {activeItem === "working-capital" && <WorkingCapitalSection />}
            {activeItem === "clientes" && <ClientsSection onSelectClient={openClient} />}
            {activeItem === "crm-pipeline" && <CrmPipelineSection deals={crmDeals} activities={crmActivities} onAddDeal={addDeal} onUpdateDeal={updateDeal} onAddActivity={addActivity} />}
            {activeItem === "crm-reportes" && <CrmReportesSection deals={crmDeals} activities={crmActivities} />}
            {activeItem === "crm-bitacora" && <CrmBitacoraSection deals={crmDeals} activities={crmActivities} onAddActivity={addActivity} />}
            {activeItem === "cobranza-dashboard" && <CobranzaDashboardSection />}
            {activeItem === "reporte-cobranza" && <CobranzaReporteSection onSelectClient={openClient} />}
            {activeItem === "recordatorios" && <RemindersSection />}
            {activeItem === "op-general" && <OperacionGeneralSection onGoSubTab={(sub) => { setAdminActivosTab(sub); navigateItem("op-admin-activos"); }} />}
            {activeItem === "op-admin-activos" && <AdminActivosSection activeTab={adminActivosTab} onTabChange={setAdminActivosTab} />}
            {activeItem === "op-reporte-operaciones" && <ReporteOperacionesSection onSelectClient={openClient} />}
            {activeItem === "riesgos-panorama" && <RiesgosPanoramaSection onSelectClient={openClient} />}
            {activeItem === "riesgos-expedientes" && <RiesgosExpedientesSection onSelectClient={openClient} />}
            {activeItem === "riesgos-analisis" && <RiesgosAnalisisSection />}
            {itemMeta?.placeholder && <Placeholder title={itemMeta.label} section={section?.label} />}
          </main>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// SIDEBAR
// ═══════════════════════════════════════════════
function Sidebar({ activeSection, onNavigate }) {
  return (
    <aside style={{ width: 240, flexShrink: 0, background: T.surface, borderRight: `1px solid ${T.border}`, position: "sticky", top: 0, height: "100vh", overflowY: "auto", display: "flex", flexDirection: "column" }}>
      {/* Brand */}
      <div style={{ padding: "20px 22px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 9, background: `linear-gradient(135deg, ${T.navy}, ${T.blue})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>IL</div>
        <div style={{ lineHeight: 1.05 }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, letterSpacing: 1.6 }}>IMAGINA</div>
          <div style={{ fontSize: 8, letterSpacing: 3, color: T.textTertiary, fontWeight: 700, marginTop: 2 }}>LEASING</div>
        </div>
      </div>

      {/* Section buttons */}
      <nav style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 4 }}>
        {NAV_SECTIONS.map(s => {
          const active = activeSection === s.id;
          return (
            <button
              key={s.id}
              className={`nav-section${active ? " is-active" : ""}`}
              onClick={() => onNavigate(s.id)}
              style={{
                textAlign: "left", border: "none", padding: "12px 14px", borderRadius: T.radiusSm,
                background: active ? T.navy : "transparent",
                color: active ? "#fff" : T.text,
                fontSize: 13, fontWeight: active ? 700 : 600, cursor: "pointer", fontFamily: "inherit",
                display: "flex", alignItems: "center", gap: 12,
                transition: "all .18s",
                boxShadow: active ? T.shadow : "none",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, color: active ? "#fff" : T.textSecondary }}>{s.icon}</span>
              <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "14px 22px", borderTop: `1px solid ${T.border}`, fontSize: 10, color: T.textTertiary, fontWeight: 600, letterSpacing: 0.4 }}>
        v1.0 · Dashboard
      </div>
    </aside>
  );
}

// ═══════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════
function Header({ showBack, onBack, title, subtitle }) {
  return (
    <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 28px", borderBottom: `1px solid ${T.border}`, background: T.surface, position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {showBack && (
          <button onClick={onBack} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, color: T.textSecondary, padding: "6px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>
            ← Volver
          </button>
        )}
        <div>
          <p style={{ fontSize: 10, color: T.textTertiary, margin: 0, fontWeight: 700, letterSpacing: 1.2, textTransform: "uppercase" }}>{subtitle || ""}</p>
          <h1 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: T.navy }}>{title || "—"}</h1>
        </div>
      </div>
      <div style={{ fontSize: 11, color: T.textTertiary }}>
        {new Date().toLocaleDateString("es-MX", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
      </div>
    </header>
  );
}

// ═══════════════════════════════════════════════
// PLACEHOLDER (en desarrollo)
// ═══════════════════════════════════════════════
function Placeholder({ title, section }) {
  return (
    <div style={{ animation: "fadeUp .5s ease", padding: "60px 20px", textAlign: "center" }}>
      <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 72, height: 72, borderRadius: 18, background: T.blueLight, color: T.blue, marginBottom: 18 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 38 }}>construction</span>
      </div>
      <div style={{ fontSize: 10, color: T.textTertiary, fontWeight: 800, letterSpacing: 1.6, textTransform: "uppercase", marginBottom: 6 }}>{section}</div>
      <h2 style={{ fontSize: 22, fontWeight: 800, color: T.navy, margin: 0 }}>{title}</h2>
      <p style={{ fontSize: 13, color: T.textSecondary, marginTop: 10, maxWidth: 460, marginInline: "auto", lineHeight: 1.55 }}>
        Esta sección está en desarrollo. Pronto la habilitaremos con el contenido y los flujos correspondientes.
      </p>
    </div>
  );
}

// ── KPI's CORPORATIVOS ──
function KpiCorporativosSection() {
  // ── Datos calculados ──
  const totalCartera = QUANTO_OPS.reduce((s, o) => s + o.montoFinanciado, 0);
  const totalRentasMensuales = QUANTO_OPS.reduce((s, o) => s + o.rentasFijas, 0);
  const totalMora = QUANTO_OPS.reduce((s, o) => s + o.d30 + o.d60 + o.d90 + o.dmas90, 0);
  const totalSaldos = QUANTO_OPS.reduce((s, o) => s + o.total, 0);
  const indiceMorosidad = totalMora > 0 ? (totalMora / totalSaldos) * 100 : 4.32;
  const solicitudesEnProceso = 4; // dato estático de ejemplo

  // Indicadores financieros (YTD 2026)
  const ytdMeses = 4;
  const ytd = DASH_FIN_TREND.slice(-ytdMeses).reduce(
    (s, m) => ({ ingresos: s.ingresos + m.ingresos, costoFond: s.costoFond + m.costoFond, opex: s.opex + m.opex, prov: s.prov + m.prov }),
    { ingresos: 0, costoFond: 0, opex: 0, prov: 0 }
  );
  const eficiencia = (ytd.opex / (ytd.ingresos - ytd.costoFond)) * 100;
  const margenFinPct = ((ytd.ingresos - ytd.costoFond) / ytd.ingresos) * 100;
  const ebitdaYtd = ytd.ingresos - ytd.costoFond - ytd.opex - ytd.prov;
  const ebitdaPct = (ebitdaYtd / ytd.ingresos) * 100;
  const carteraActualFin = DASH_FIN_CARTERA_TREND[DASH_FIN_CARTERA_TREND.length - 1].v;
  const carteraInicioFin = DASH_FIN_CARTERA_TREND[0].v;
  const crecYoY = ((carteraActualFin - carteraInicioFin) / carteraInicioFin) * 100;
  const npl = 2.8;
  const cobertura = 142;
  const roa = 4.2;
  const roe = 14.6;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {/* Solicitudes en Proceso */}
        <div style={{ ...card, padding: 0, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${T.purple}, ${T.blue})` }} />
          <div style={{ padding: "22px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: `linear-gradient(135deg, ${T.purpleLight}, ${T.blueLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 26, color: T.purple }}>pending_actions</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Solicitudes en Proceso</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: T.purple, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.1 }}>{solicitudesEnProceso}</div>
              <div style={{ fontSize: 10, color: T.textTertiary, marginTop: 2 }}>Expedientes en evaluación</div>
            </div>
          </div>
        </div>

        {/* Cartera Total */}
        <div style={{ ...card, padding: 0, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${T.blue}, ${T.green})` }} />
          <div style={{ padding: "22px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: `linear-gradient(135deg, ${T.blueLight}, ${T.greenLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 26, color: T.blue }}>account_balance_wallet</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Cartera Total</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: T.navy, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.1 }}>{fmtShort(totalCartera)}</div>
              <div style={{ fontSize: 10, color: T.textTertiary, marginTop: 2 }}>{QUANTO_OPS.length} contratos · {CLIENTS.length} clientes</div>
            </div>
          </div>
        </div>

        {/* Rentas Mensuales */}
        <div style={{ ...card, padding: 0, overflow: "hidden", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${T.green}, ${T.amber})` }} />
          <div style={{ padding: "22px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: `linear-gradient(135deg, ${T.greenLight}, ${T.amberLight})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 26, color: T.green }}>payments</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Rentas Mensuales</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: T.green, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.1 }}>{fmtShort(totalRentasMensuales)}</div>
              <div style={{ fontSize: 10, color: T.textTertiary, marginTop: 2 }}>Ingreso recurrente mensual</div>
            </div>
          </div>
        </div>
      </div>

      {/* Índice de Morosidad — barra grande */}
      <div style={{ ...card, padding: 0, overflow: "hidden", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: indiceMorosidad > 5 ? `linear-gradient(90deg, ${T.amber}, ${T.red})` : `linear-gradient(90deg, ${T.green}, ${T.blue})` }} />
        <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: indiceMorosidad > 5 ? T.redLight : T.greenLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 26, color: indiceMorosidad > 5 ? T.red : T.green }}>{indiceMorosidad > 5 ? "warning" : "verified"}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Índice de Morosidad</div>
                <span style={{ fontSize: 32, fontWeight: 900, color: indiceMorosidad > 5 ? T.red : T.green, fontFamily: "'JetBrains Mono', monospace" }}>{indiceMorosidad.toFixed(2)}%</span>
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: indiceMorosidad > 5 ? T.red : T.green, padding: "4px 12px", borderRadius: 6, background: indiceMorosidad > 5 ? T.redLight : T.greenLight }}>{indiceMorosidad > 5 ? "Requiere atención" : indiceMorosidad > 0 ? "En rango aceptable" : "Cartera sana"}</span>
            </div>
            <div style={{ height: 10, borderRadius: 5, background: T.surfaceAlt, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(indiceMorosidad * 5, 100)}%`, borderRadius: 5, background: indiceMorosidad > 5 ? `linear-gradient(90deg, ${T.amber}, ${T.red})` : `linear-gradient(90deg, ${T.green}, ${T.blue})`, transition: "width 1s ease" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: T.textTertiary }}>
              <span>0%</span>
              <span>Meta: &lt; 5%</span>
              <span>20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores y ratios · YTD */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 12 }}>
        <OpKpi icon="account_balance_wallet" label="Cartera total" value={`$${(carteraActualFin / 1000).toFixed(2)}B`} sub={`${crecYoY >= 0 ? "+" : ""}${crecYoY.toFixed(1)}% YoY`} accent={T.navy}
          gauge={{ value: crecYoY, target: 15, direction: ">", scaleMax: 30, unit: "%", ok: crecYoY > 15 }} />
        <OpKpi icon="payments" label="Ingresos YTD" value={fmtShort(ytd.ingresos * 1000)} sub={`${ytdMeses} meses · plan $132M`} accent={T.blue}
          gauge={{ value: ytd.ingresos / 1000, target: 132, direction: ">", scaleMax: 160, unit: "M", ok: ytd.ingresos / 1000 > 132 }} />
        <OpKpi icon="trending_up" label="Margen financiero" value={`${margenFinPct.toFixed(1)}%`} sub={`${fmtShort((ytd.ingresos - ytd.costoFond) * 1000)} YTD`} accent={T.green}
          gauge={{ value: margenFinPct, target: 55, direction: ">", scaleMax: 80, unit: "%", ok: margenFinPct > 55 }} />
        <OpKpi icon="paid" label="EBITDA / Margen" value={`${ebitdaPct.toFixed(1)}%`} sub={fmtShort(ebitdaYtd * 1000)} accent={T.purple}
          gauge={{ value: ebitdaPct, target: 30, direction: ">", scaleMax: 50, unit: "%", ok: ebitdaPct > 30 }} />
        <OpKpi icon="speed" label="ROE / ROA" value={`${roe}% · ${roa}%`} sub="Anualizado · meta ROE >12%" accent={T.amber}
          gauge={{ value: roe, target: 12, direction: ">", scaleMax: 25, unit: "%", ok: roe > 12 }} />
        <OpKpi icon="verified" label="NPL ratio" value={`${npl}%`} sub={`Cobertura ${cobertura}%`} accent={npl < 3 ? T.green : T.amber}
          gauge={{ value: npl, target: 3, direction: "<", scaleMax: 8, unit: "%", ok: npl < 3 }} />
        {[
          { label: "Eficiencia operativa", value: eficiencia, display: `${eficiencia.toFixed(1)}%`, targetText: "<40%", target: 40, direction: "<", scaleMax: 60, unit: "%", ok: eficiencia < 40, hint: "Gasto opex / margen financiero" },
          { label: "Apalancamiento", value: 5.4, display: "5.4×", targetText: "<7×", target: 7, direction: "<", scaleMax: 10, unit: "×", ok: true, hint: "Pasivo / Capital" },
          { label: "Solvencia (capital)", value: 16.8, display: "16.8%", targetText: ">12%", target: 12, direction: ">", scaleMax: 25, unit: "%", ok: true, hint: "Capital regulatorio" },
          { label: "Liquidez", value: 1.42, display: "1.42×", targetText: ">1×", target: 1, direction: ">", scaleMax: 3, unit: "×", ok: true, hint: "Activos circ / Pasivos circ" },
          { label: "Días cobranza (DSO)", value: 12, display: "12 d", targetText: "<15 d", target: 15, direction: "<", scaleMax: 30, unit: "d", ok: true, hint: "Rotación cuentas por cobrar" },
          { label: "Cost-to-income", value: 33.4, display: "33.4%", targetText: "<40%", target: 40, direction: "<", scaleMax: 60, unit: "%", ok: true, hint: "Costo total / Ingresos" },
        ].map(r => (
          <div key={r.label} style={opCard}>
            <div style={{ fontSize: 9, fontWeight: 800, color: T.textTertiary, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8 }}>{r.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: r.ok ? T.navy : T.amber, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{r.display}</span>
              <span style={{ fontSize: 14, padding: "4px 10px", borderRadius: 4, background: r.ok ? T.greenLight : T.amberLight, color: r.ok ? T.green : T.amber, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{r.targetText}</span>
            </div>
            <div style={{ fontSize: 10, color: T.textTertiary }}>{r.hint}</div>
            <RatioGauge value={r.value} target={r.target} direction={r.direction} scaleMax={r.scaleMax} unit={r.unit} ok={r.ok} />
          </div>
        ))}
      </div>

    </div>
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

// ── COBRANZA — DASHBOARD & ALERTAS ──
function CobranzaDashboardSection() {
  const totalValorBien = QUANTO_OPS.reduce((s, o) => s + o.valorBienSinIVA, 0);
  const totalRentasDevengar = QUANTO_OPS.reduce((s, o) => s + o.rentaPorDevengar, 0);
  const totalFinanciado = QUANTO_OPS.reduce((s, o) => s + o.montoFinanciado, 0);
  const totalRentasMensuales = QUANTO_OPS.reduce((s, o) => s + o.rentasFijas, 0);
  const avgTasa = QUANTO_OPS.reduce((s, o) => s + o.tasa, 0) / QUANTO_OPS.length;
  const uniqueClients = [...new Set(QUANTO_OPS.map(o => o.nombre))];
  const topClientExposure = QUANTO_OPS.filter(o => o.nombre === uniqueClients[0]).reduce((s, o) => s + o.montoFinanciado, 0);
  const concentrationPct = (topClientExposure / totalFinanciado * 100);
  const avgPlazoRestante = QUANTO_OPS.reduce((s, o) => s + o.plazo, 0) / QUANTO_OPS.length;
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
                {uniqueClients
                  .map(name => ({
                    name,
                    total: QUANTO_OPS.filter(o => o.nombre === name).reduce((s, o) => s + o.montoFinanciado, 0),
                  }))
                  .sort((a, b) => b.total - a.total)
                  .map(({ name, total }, i) => {
                  const pct = total / totalFinanciado * 100;
                  return (
                    <div key={i} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{name.split(",")[0]}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: pct > 50 ? T.red : T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{pct.toFixed(1)}%</span>
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
                  { factor: "Aranceles al aluminio", tendencia: "En aumento", riesgo: "Alto", color: T.red },
                  { factor: "Costos energéticos MX", tendencia: "Al alza", riesgo: "Medio-Alto", color: T.amber },
                  { factor: "Demanda de aluminio EE.UU.", tendencia: "Estable", riesgo: "Medio", color: T.amber },
                  { factor: "Tipo de cambio MXN/USD", tendencia: "Volatil", riesgo: "Medio", color: T.amber },
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
    </div>
  );
}

// ═══════════════════════════════════════════════
// OPERACIÓN — REPORTE OPERACIONES
// ═══════════════════════════════════════════════
function ReporteOperacionesSection({ onSelectClient }) {
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("desc"); }
  };

  const sortedOps = useMemo(() => {
    let list = [...QUANTO_OPS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(o => o.nombre.toLowerCase().includes(q) || o.contrato.toLowerCase().includes(q) || o.bien.toLowerCase().includes(q));
    }
    if (sortCol) {
      list.sort((a, b) => {
        const va = a[sortCol], vb = b[sortCol];
        let cmp = typeof va === "string" ? va.localeCompare(vb) : va - vb;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return list;
  }, [sortCol, sortDir, search]);

  const totalValorBien = QUANTO_OPS.reduce((s, o) => s + o.valorBienSinIVA, 0);
  const totalRentas = QUANTO_OPS.reduce((s, o) => s + o.totalRentas, 0);
  const totalRentasDevengar = QUANTO_OPS.reduce((s, o) => s + o.rentaPorDevengar, 0);
  const totalFinanciado = QUANTO_OPS.reduce((s, o) => s + o.montoFinanciado, 0);

  const SortHeader = ({ col, label }) => {
    const active = sortCol === col;
    return (
      <button onClick={() => handleSort(col)} style={{ background: "none", border: "none", padding: "11px 0", cursor: "pointer", display: "flex", alignItems: "center", gap: 2, fontSize: 9, fontWeight: 700, color: active ? T.navy : T.textTertiary, textTransform: "uppercase", letterSpacing: 0.6, fontFamily: "inherit", textAlign: "left" }}>
        {label}<span style={{ fontSize: 9, color: active ? T.blue : "transparent" }}>{active ? (sortDir === "asc" ? "↑" : "↓") : "·"}</span>
      </button>
    );
  };

  return (
    <div style={{ animation: "fadeUp .5s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <Kpi label="Valor Bienes s/IVA" value={fmt(totalValorBien)} icon="factory" />
        <Kpi label="Total Financiado" value={fmt(totalFinanciado)} icon="credit_card" accent={T.blue} />
        <Kpi label="Rentas por Devengar" value={fmt(totalRentasDevengar)} icon="request_quote" accent={T.amber} />
        <Kpi label="Contratos Activos" value={QUANTO_OPS.length.toString()} icon="description" accent={T.green} />
      </div>

      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow, overflowX: "auto" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: T.textTertiary }}>search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por empresa, contrato o bien..." style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: T.text, background: "transparent", fontFamily: "inherit" }} />
          {search && <span className="material-symbols-outlined" onClick={() => setSearch("")} style={{ fontSize: 16, color: T.textTertiary, cursor: "pointer" }}>close</span>}
        </div>
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
              <div onClick={() => { const cl = CLIENTS.find(cl => o.nombre.toUpperCase().includes(cl.razonSocial.split(" SA")[0])); if (cl && onSelectClient) onSelectClient(cl.id); }} style={{ fontSize: 11, fontWeight: 600, color: T.blue, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", cursor: "pointer", textDecoration: "underline", textDecorationColor: "transparent", transition: "text-decoration-color .2s" }} onMouseEnter={e => e.target.style.textDecorationColor = T.blue} onMouseLeave={e => e.target.style.textDecorationColor = "transparent"}>{o.nombre.length > 30 ? o.nombre.slice(0,28)+"…" : o.nombre}</div>
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
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.navy }}>{fmtShort(totalRentas)}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.blue }}>{fmtShort(totalRentasDevengar)}</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// COBRANZA — REPORTE
// ═══════════════════════════════════════════════
function CobranzaReporteSection({ onSelectClient }) {
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");

  const handleSort = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("desc"); }
  };

  const sortedOps = useMemo(() => {
    let list = [...QUANTO_OPS];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(o => o.nombre.toLowerCase().includes(q) || o.contrato.toLowerCase().includes(q) || o.bien.toLowerCase().includes(q));
    }
    if (sortCol) {
      list.sort((a, b) => {
        const va = a[sortCol], vb = b[sortCol];
        let cmp = typeof va === "string" ? va.localeCompare(vb) : va - vb;
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return list;
  }, [sortCol, sortDir, search]);

  const totalRentaMensual = QUANTO_OPS.reduce((s, o) => s + o.rentasFijas, 0);
  const totalSaldo = QUANTO_OPS.reduce((s, o) => s + o.total, 0);
  const totalMora = QUANTO_OPS.reduce((s, o) => s + o.d30 + o.d60 + o.d90 + o.dmas90, 0);
  const contratosEnMora = QUANTO_OPS.filter(o => o.d30 > 0 || o.d60 > 0 || o.d90 > 0 || o.dmas90 > 0).length;

  const SortHeader = ({ col, label }) => {
    const active = sortCol === col;
    return (
      <button onClick={() => handleSort(col)} style={{ background: "none", border: "none", padding: "11px 0", cursor: "pointer", display: "flex", alignItems: "center", gap: 2, fontSize: 9, fontWeight: 700, color: active ? T.navy : T.textTertiary, textTransform: "uppercase", letterSpacing: 0.6, fontFamily: "inherit", textAlign: "left" }}>
        {label}<span style={{ fontSize: 9, color: active ? T.blue : "transparent" }}>{active ? (sortDir === "asc" ? "↑" : "↓") : "·"}</span>
      </button>
    );
  };

  return (
    <div style={{ animation: "fadeUp .5s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <Kpi label="Renta Mensual" value={fmt(totalRentaMensual)} icon="payments" accent={T.green} />
        <Kpi label="Saldo Actual" value={fmt(totalSaldo)} icon="account_balance_wallet" />
        <Kpi label="Mora Total" value={fmt(totalMora)} icon="warning" accent={totalMora > 0 ? T.red : T.green} />
        <Kpi label="Contratos en Mora" value={`${contratosEnMora} / ${QUANTO_OPS.length}`} icon="receipt_long" accent={contratosEnMora > 0 ? T.amber : T.green} />
      </div>

      <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow, overflowX: "auto" }}>
        <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", alignItems: "center", gap: 8 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, color: T.textTertiary }}>search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por empresa, contrato o bien..." style={{ flex: 1, border: "none", outline: "none", fontSize: 13, color: T.text, background: "transparent", fontFamily: "inherit" }} />
          {search && <span className="material-symbols-outlined" onClick={() => setSearch("")} style={{ fontSize: 16, color: T.textTertiary, cursor: "pointer" }}>close</span>}
        </div>
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
              <span onClick={() => { const cl = CLIENTS.find(cl => o.nombre.toUpperCase().includes(cl.razonSocial.split(" SA")[0])); if (cl && onSelectClient) onSelectClient(cl.id); }} style={{ fontSize: 11, fontWeight: 600, color: T.blue, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", cursor: "pointer", textDecoration: "underline", textDecorationColor: "transparent", transition: "text-decoration-color .2s" }} onMouseEnter={e => e.target.style.textDecorationColor = T.blue} onMouseLeave={e => e.target.style.textDecorationColor = "transparent"}>{o.nombre.length > 35 ? o.nombre.slice(0,33)+"…" : o.nombre}</span>
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
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.navy }}>{fmt(totalRentaMensual)}</span>
          <span></span>
          <MoraCell value={QUANTO_OPS.reduce((s,o)=>s+o.d30,0)} />
          <MoraCell value={QUANTO_OPS.reduce((s,o)=>s+o.d60,0)} />
          <MoraCell value={QUANTO_OPS.reduce((s,o)=>s+o.d90,0)} />
          <MoraCell value={QUANTO_OPS.reduce((s,o)=>s+o.dmas90,0)} severe />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 800, color: T.navy }}>{fmtShort(totalSaldo)}</span>
        </div>
      </div>
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
// CLIENT ↔ CONTRACTS MAPPING
// ═══════════════════════════════════════════════
const CLIENT_QUANTO_KEY = {
  "abc-aluminum": "ALUMINIO DE BAJA CALIFORNIA",
  "grupo-constructor": "GRUPO CONSTRUCTOR PACÍFICO",
  "alimentos-norte": "ALIMENTOS DEL NORTE",
  "logistica-express": "LOGÍSTICA EXPRESS DE MÉXICO",
  "solar-energy": "SOLAR ENERGY BAJA CALIFORNIA",
  "textiles-jalisco": "TEXTILES DE JALISCO",
  "farmacia-vida": "DISTRIBUIDORA FARMACÉUTICA VIDA PLUS",
  "minera-cobre": "MINERA COBRE DEL PACÍFICO",
  "plasticos-reforma": "PLÁSTICOS REFORMA DEL SURESTE",
  "agroindustrias-sur": "AGROINDUSTRIAS DEL SUR",
  "tech-solutions": "TECH SOLUTIONS DE GUADALAJARA",
};
const contractsForClient = (c) => {
  const key = CLIENT_QUANTO_KEY[c.id];
  if (!key) return [];
  return QUANTO_OPS.filter(op => op.nombre.includes(key));
};

// ═══════════════════════════════════════════════
// OPERACIÓN — DATA
// ═══════════════════════════════════════════════
const ENTIDAD_BY_CLIENTE = {
  "ALUMINIO DE BAJA CALIFORNIA": "Baja California",
  "GRUPO CONSTRUCTOR PACÍFICO": "CDMX",
  "ALIMENTOS DEL NORTE": "Nuevo León",
  "LOGÍSTICA EXPRESS DE MÉXICO": "Estado de México",
  "SOLAR ENERGY BAJA CALIFORNIA": "Baja California",
  "TEXTILES DE JALISCO": "Jalisco",
  "DISTRIBUIDORA FARMACÉUTICA VIDA PLUS": "Querétaro",
  "MINERA COBRE DEL PACÍFICO": "Sonora",
  "PLÁSTICOS REFORMA DEL SURESTE": "Tabasco",
  "AGROINDUSTRIAS DEL SUR": "Chiapas",
  "TECH SOLUTIONS DE GUADALAJARA": "Jalisco",
};

const PROVEEDORES_BY_BIEN = {
  "MAQUINARIA Y EQUIPO INDUSTRIAL": [
    { nombre: "SIEMENS MÉXICO S.A. DE C.V.", rfc: "SIE920731AB1", entidad: "CDMX" },
    { nombre: "ABB MÉXICO S.A. DE C.V.", rfc: "ABB890215XY3", entidad: "Nuevo León" },
    { nombre: "ROCKWELL AUTOMATION DE MÉXICO", rfc: "RAM870612MN4", entidad: "Jalisco" },
  ],
  "MAQUINARIA PESADA": [
    { nombre: "CATERPILLAR MÉXICO S.A. DE C.V.", rfc: "CAT850412AC1", entidad: "Nuevo León" },
    { nombre: "KOMATSU LATINOAMÉRICA S.A.", rfc: "KOM920518DH9", entidad: "CDMX" },
  ],
  "EQUIPO DE EMPAQUE": [
    { nombre: "ISHIDA DE MÉXICO S.A. DE C.V.", rfc: "ISH910330KP2", entidad: "CDMX" },
  ],
  "TRACTOCAMIONES": [
    { nombre: "KENWORTH MEXICANA S.A. DE C.V.", rfc: "KEN790115QP1", entidad: "Baja California" },
    { nombre: "FREIGHTLINER DE MÉXICO", rfc: "FRE850920TX5", entidad: "Coahuila" },
  ],
  "CAJAS SECAS Y REFRIGERADAS": [
    { nombre: "THERMO KING DE MÉXICO", rfc: "TKM900403VR8", entidad: "Nuevo León" },
  ],
  "PANELES SOLARES INDUSTRIALES": [
    { nombre: "JINKO SOLAR MÉXICO", rfc: "JKS131120LL7", entidad: "CDMX" },
  ],
  "INVERSORES Y EQUIPOS ELÉCTRICOS": [
    { nombre: "SCHNEIDER ELECTRIC MÉXICO", rfc: "SEM880714GG2", entidad: "Estado de México" },
  ],
  "TELARES INDUSTRIALES": [
    { nombre: "PICANOL DE MÉXICO", rfc: "PIM050811BB4", entidad: "Jalisco" },
  ],
  "EQUIPO DE CADENA DE FRÍO": [
    { nombre: "CARRIER MÉXICO S.A. DE C.V.", rfc: "CAM800219EE1", entidad: "Querétaro" },
  ],
  "MAQUINARIA DE EXTRACCIÓN MINERA": [
    { nombre: "SANDVIK MINING DE MÉXICO", rfc: "SAN940510MM3", entidad: "Sonora" },
  ],
  "EQUIPO DE TRITURACIÓN": [
    { nombre: "METSO OUTOTEC MÉXICO", rfc: "MOM110425OO9", entidad: "Sonora" },
  ],
  "INYECTORAS DE PLÁSTICO": [
    { nombre: "ENGEL MAQUINARIA S.A.", rfc: "ENG020308PP6", entidad: "Querétaro" },
  ],
  "PLANTA PROCESADORA DE GRANOS": [
    { nombre: "BÜHLER DE MÉXICO", rfc: "BUH960712BB8", entidad: "Estado de México" },
  ],
  "SILOS DE ALMACENAMIENTO": [
    { nombre: "AGI INTERNATIONAL S.A.", rfc: "AGI990605II7", entidad: "Sinaloa" },
  ],
  "SERVIDORES Y EQUIPO DE DATA CENTER": [
    { nombre: "DELL TECHNOLOGIES MÉXICO", rfc: "DEL850922DD2", entidad: "CDMX" },
  ],
  "UPS Y CLIMATIZACIÓN": [
    { nombre: "APC SCHNEIDER ELECTRIC", rfc: "APC910707AA5", entidad: "Estado de México" },
  ],
};

const ASEGURADORAS = ["AXA Seguros", "GNP Seguros", "Mapfre Tepeyac", "Quálitas", "Chubb Seguros", "Zurich Santander"];
const TIPOS_OPERACION = ["Nuevo", "Sale & Lease Back", "Reestructura"];
// Distribución no uniforme por idx (simulación realista)
// AXA: 7 · GNP: 5 · Mapfre: 4 · Quálitas: 3 · Chubb: 3 · Zurich: 2
const ASEGURADORA_DIST = [0, 0, 1, 0, 2, 0, 1, 3, 0, 1, 4, 2, 0, 3, 1, 5, 2, 0, 4, 1, 5, 4, 2, 3];
// Nuevo: 14 (58%) · Sale & Lease Back: 6 (25%) · Reestructura: 4 (17%)
const TIPO_OP_DIST = [0, 0, 1, 0, 2, 0, 1, 0, 0, 1, 0, 2, 0, 1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 2];

const _today = new Date("2026-05-06");
const _addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const _iso = (d) => d.toISOString().slice(0, 10);

const ASSETS_REPORT = QUANTO_OPS.map((op, i) => {
  const proveedoresList = PROVEEDORES_BY_BIEN[op.bien] || [{ nombre: "PROVEEDOR GENERAL S.A.", rfc: "PGE010101AAA", entidad: "CDMX" }];
  const proveedor = proveedoresList[i % proveedoresList.length];
  const aseguradora = ASEGURADORAS[ASEGURADORA_DIST[i % ASEGURADORA_DIST.length]];
  const tipoOperacion = TIPOS_OPERACION[TIPO_OP_DIST[i % TIPO_OP_DIST.length]];

  const fechaDesembolso = new Date(op.fechaDesembolso);
  const fechaFact = _addDays(fechaDesembolso, -(15 + (i % 25)));
  const tiempoPagoDias = 20 + (i % 50);
  const fechaPago = _addDays(fechaFact, tiempoPagoDias);
  const fechaComp = _addDays(fechaPago, 2 + (i % 4));

  // Spread póliza expirations across next 12 months for variety in semáforo
  const polizaOffset = [-30, 12, 25, 55, 85, 120, 180, 240, 300, 350][i % 10];
  const fechaVencPoliza = _addDays(_today, polizaOffset);

  // ~20% de los contratos están "terminados" (vendidos)
  const terminado = i % 5 === 1;
  const fechaTerminoVenta = terminado ? _addDays(new Date(op.fechaVencimiento), -((i * 17) % 90 + 30)) : null;

  const clienteKey = Object.keys(ENTIDAD_BY_CLIENTE).find(k => op.nombre.includes(k));
  const entidadFederativa = ENTIDAD_BY_CLIENTE[clienteKey] || "CDMX";

  const estatus = polizaOffset < 0 ? "Vencida" : "Vigente";
  const valorFactura = +(op.valorBienSinIVA * 1.16).toFixed(2);
  const valorAccesorios = Math.round(op.valorBienSinIVA * 0.02);

  return {
    id: i + 1,
    contratoAnexo: op.contrato,
    acreditada: op.nombre,
    acreditadaCorta: op.nombre.split(",")[0],
    tipoActivo: op.bien,
    tipoOperacion,
    descripcionActivo: `${op.bien} · ${proveedor.nombre.split(" ")[0]} ${1000 + i}`,
    numeroSerie: `SN-${2025 + (i % 2)}-${String(op.idArr || (1000 + i)).padStart(5, "0")}`,
    proveedor: proveedor.nombre,
    rfcProveedor: proveedor.rfc,
    entidadProveedor: proveedor.entidad,
    fechaFacturacion: _iso(fechaFact),
    factura: `F-${2025 + (i % 2)}-${1000 + i}`,
    folioFiscal: `${["A1B2C3D4", "E5F6G7H8", "I9J0K1L2", "M3N4O5P6", "Q7R8S9T0"][i % 5]}-${i.toString(16).toUpperCase()}`,
    valorFactura,
    moneda: "MXN",
    valorAccesorios,
    fechaPago: _iso(fechaPago),
    tiempoPagoDias,
    fechaComplementoPago: _iso(fechaComp),
    folioFiscalComplemento: `CMP-${i.toString(16).toUpperCase()}-${1000 + i}`,
    estatus,
    numeroPoliza: `POL-${aseguradora.split(" ")[0].toUpperCase().slice(0,4)}-${2025}-${String(i + 1).padStart(4, "0")}`,
    fechaVencimientoPoliza: _iso(fechaVencPoliza),
    aseguradora,
    vencimiento: op.fechaVencimiento,
    fechaTerminoVenta: fechaTerminoVenta ? _iso(fechaTerminoVenta) : null,
    receptorTermino: fechaTerminoVenta ? `Recolocación ${1000 + i}` : null,
    fechaDesembolso: op.fechaDesembolso,
    fecha1erPago: op.fecha1erPago,
    pagoInicial: op.pagoInicial,
    valorBienSinIVA: op.valorBienSinIVA,
    plazo: op.plazo,
    montoFinanciado: op.montoFinanciado,
    rentaMensual: op.rentasFijas,
    tasa: op.tasa,
    entidadFederativa,
  };
});

// ═══════════════════════════════════════════════
// OPERACIÓN — HELPERS
// ═══════════════════════════════════════════════
const daysFromToday = (dateStr) => {
  const d = new Date(dateStr);
  return Math.round((d - _today) / 86400000);
};

const polizaSemaforo = (days) => {
  if (days < 0) return { color: T.red, bg: T.redLight, label: "VENCIDA" };
  if (days <= 30) return { color: "#7A4848", bg: "#F1ECE5", label: "CRÍTICA" };
  if (days <= 90) return { color: T.amber, bg: T.amberLight, label: "PRÓXIMA" };
  return { color: T.green, bg: T.greenLight, label: "VIGENTE" };
};

// ═══════════════════════════════════════════════
// OPERACIÓN — UI PRIMITIVES
// ═══════════════════════════════════════════════
const opCard = { background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, padding: 18, boxShadow: T.shadow };

function OpKpi({ label, value, sub, accent = T.navy, icon, gauge, onClick, glow }) {
  const style = {
    ...opCard,
    cursor: onClick ? "pointer" : "default",
    border: glow ? `2px solid ${accent}` : opCard.border,
    boxShadow: glow ? `0 0 0 4px ${accent}22, 0 6px 20px ${accent}40, ${opCard.boxShadow}` : opCard.boxShadow,
    transition: "transform .2s, box-shadow .2s",
    fontFamily: "inherit",
    textAlign: "left",
    width: "100%",
    position: "relative",
  };
  const Component = onClick ? "button" : "div";
  return (
    <Component onClick={onClick} style={style}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        {icon && <span className="material-symbols-outlined" style={{ fontSize: 16, color: accent }}>{icon}</span>}
        <span style={{ fontSize: 9, fontWeight: 800, color: T.textTertiary, textTransform: "uppercase", letterSpacing: 1.2 }}>{label}</span>
        {onClick && <span className="material-symbols-outlined" style={{ fontSize: 14, color: accent, marginLeft: "auto" }}>arrow_forward</span>}
      </div>
      <div style={{ fontSize: 22, fontWeight: 900, color: accent, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: T.textTertiary, marginTop: 4 }}>{sub}</div>}
      {gauge && <RatioGauge {...gauge} />}
    </Component>
  );
}

function RatioGauge({ value, target, direction, scaleMin = 0, scaleMax, unit = "", ok }) {
  const range = scaleMax - scaleMin;
  const valuePct = Math.max(0, Math.min(((value - scaleMin) / range) * 100, 100));
  const targetPct = Math.max(0, Math.min(((target - scaleMin) / range) * 100, 100));
  const safeOnLeft = direction === "<";
  const safeColor = T.green + "E6";
  const dangerColor = T.red + "E6";
  const arrowColor = ok ? T.green : T.amber;
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ position: "relative", height: 18 }}>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 8, borderRadius: 4, overflow: "hidden", display: "flex", border: `1px solid ${T.borderLight}` }}>
          <div style={{ width: `${targetPct}%`, background: safeOnLeft ? safeColor : dangerColor }} />
          <div style={{ flex: 1, background: safeOnLeft ? dangerColor : safeColor }} />
        </div>
        <div style={{ position: "absolute", left: `${targetPct}%`, bottom: 0, height: 12, width: 2, background: T.navy, transform: "translateX(-1px)" }} />
        <span style={{ position: "absolute", left: `${valuePct}%`, transform: "translateX(-50%)", top: -2, fontSize: 12, color: arrowColor, fontWeight: 900, lineHeight: 1, textShadow: "0 0 3px white, 0 0 3px white, 0 0 3px white" }}>▼</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, color: T.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}>
        <span>{scaleMin}{unit}</span>
        <span>{scaleMax}{unit}</span>
      </div>
    </div>
  );
}

function HBars({ entries, palette, formatter = fmtShort }) {
  const max = Math.max(...entries.map(e => e.value), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {entries.map((e, i) => {
        const pct = (e.value / max) * 100;
        const color = palette[i % palette.length];
        return (
          <div key={e.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 11 }}>
              <span style={{ fontWeight: 600, color: T.text }}>{e.label}</span>
              <span style={{ fontWeight: 700, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{formatter(e.value)}</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${color}BB)`, borderRadius: 4, transition: "width .8s ease" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PieChart({ entries, palette, size = 190 }) {
  const total = entries.reduce((s, e) => s + e.value, 0) || 1;
  let acc = 0;
  const stops = entries.map((e, i) => {
    const start = (acc / total) * 360;
    acc += e.value;
    const end = (acc / total) * 360;
    return `${palette[i % palette.length]} ${start}deg ${end}deg`;
  }).join(", ");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
      <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${stops})`, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: "22%", borderRadius: "50%", background: T.surface, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 9, color: T.textTertiary, fontWeight: 700, letterSpacing: 1 }}>TOTAL</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{entries.length}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1, minWidth: 180 }}>
        {entries.map((e, i) => {
          const pct = ((e.value / total) * 100).toFixed(1);
          return (
            <div key={e.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: palette[i % palette.length], flexShrink: 0 }} />
              <span style={{ flex: 1, color: T.text, fontWeight: 600 }}>{e.label}</span>
              <span style={{ color: T.navy, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StackedBar({ entries, palette }) {
  const total = entries.reduce((s, e) => s + e.value, 0) || 1;
  return (
    <div>
      <div style={{ display: "flex", height: 22, borderRadius: 6, overflow: "hidden", border: `1px solid ${T.border}` }}>
        {entries.map((e, i) => {
          const pct = (e.value / total) * 100;
          return <div key={e.label} title={`${e.label}: ${pct.toFixed(1)}%`} style={{ width: `${pct}%`, background: palette[i % palette.length] }} />;
        })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 10 }}>
        {entries.map((e, i) => {
          const pct = ((e.value / total) * 100).toFixed(1);
          return (
            <div key={e.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: palette[i % palette.length] }} />
              <span style={{ color: T.textSecondary }}>{e.label}</span>
              <span style={{ color: T.navy, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScrollTable({ columns, rows, gridCols, minWidth = 1100, renderCell, defaultSortCol = null, defaultSortDir = "asc" }) {
  const [sortCol, setSortCol] = useState(defaultSortCol);
  const [sortDir, setSortDir] = useState(defaultSortDir);

  const sortedRows = useMemo(() => {
    if (!sortCol) return rows;
    const col = columns.find(c => c.id === sortCol);
    const accessor = col?.sortValue || (r => r[sortCol]);
    return [...rows].sort((a, b) => {
      const va = accessor(a);
      const vb = accessor(b);
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      const na = typeof va === "string" ? va.toLowerCase() : va;
      const nb = typeof vb === "string" ? vb.toLowerCase() : vb;
      if (na < nb) return sortDir === "asc" ? -1 : 1;
      if (na > nb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortCol, sortDir, columns]);

  const handleSort = (id) => {
    const col = columns.find(c => c.id === id);
    if (col?.sortable === false) return;
    if (sortCol === id) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(id); setSortDir(col?.defaultDir || "asc"); }
  };

  return (
    <div style={{ ...opCard, padding: 0, position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "6px 14px", borderBottom: `1px solid ${T.borderLight}`, background: T.surfaceAlt, fontSize: 9, fontWeight: 700, color: T.textTertiary, letterSpacing: 0.8, textTransform: "uppercase", gap: 6 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>swipe</span>
        Desliza horizontal para ver más columnas
      </div>
      <div className="scroll-x" style={{ overflowX: "scroll", overflowY: "hidden" }}>
        <div style={{ minWidth, display: "grid", gridTemplateColumns: gridCols, padding: "12px 18px", borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt, gap: 8 }}>
          {columns.map(c => {
            const active = sortCol === c.id;
            const arrow = active ? (sortDir === "asc" ? "↑" : "↓") : "·";
            const sortable = c.sortable !== false;
            return (
              <button key={c.id} onClick={() => handleSort(c.id)} disabled={!sortable} style={{ background: "none", border: "none", padding: 0, cursor: sortable ? "pointer" : "default", display: "flex", alignItems: "center", gap: 4, fontSize: 9, fontWeight: 800, color: active ? T.navy : T.textTertiary, textTransform: "uppercase", letterSpacing: 0.7, fontFamily: "inherit", textAlign: "left" }}>
                {c.label}
                {sortable && <span style={{ fontSize: 10, color: active ? T.blue : "transparent", fontWeight: 800 }}>{arrow}</span>}
              </button>
            );
          })}
        </div>
        {sortedRows.length === 0 && <div style={{ padding: 30, textAlign: "center", color: T.textTertiary, fontSize: 12 }}>Sin registros</div>}
        {sortedRows.map((r, i) => (
          <div key={r.id ?? i} style={{ minWidth, display: "grid", gridTemplateColumns: gridCols, padding: "11px 18px", borderBottom: i < sortedRows.length - 1 ? `1px solid ${T.borderLight}` : "none", gap: 8, alignItems: "center", fontSize: 11 }}>
            {columns.map(c => <div key={c.id}>{renderCell(c, r)}</div>)}
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// OPERACIÓN — GENERAL
// ═══════════════════════════════════════════════
function OperacionGeneralSection({ onGoSubTab }) {
  const totalActivos = ASSETS_REPORT.length;
  const totalFacturado = ASSETS_REPORT.reduce((s, a) => s + a.valorFactura, 0);
  const polizasVigentes = ASSETS_REPORT.filter(a => daysFromToday(a.fechaVencimientoPoliza) > 0).length;
  const polizasPorVencer90 = ASSETS_REPORT.filter(a => { const d = daysFromToday(a.fechaVencimientoPoliza); return d >= 0 && d <= 90; }).length;
  const polizasVencidas = ASSETS_REPORT.filter(a => daysFromToday(a.fechaVencimientoPoliza) < 0).length;
  const proveedoresUnicos = new Set(ASSETS_REPORT.map(a => a.proveedor)).size;
  const promDiasPago = Math.round(ASSETS_REPORT.reduce((s, a) => s + a.tiempoPagoDias, 0) / ASSETS_REPORT.length);
  const terminados = ASSETS_REPORT.filter(a => a.fechaTerminoVenta).length;
  const aseguradoraTop = Object.entries(ASSETS_REPORT.reduce((acc, a) => { acc[a.aseguradora] = (acc[a.aseguradora] || 0) + 1; return acc; }, {})).sort((a, b) => b[1] - a[1])[0];

  const cards = [
    { id: "colocacion", icon: "place", title: "Colocación", value: `${totalActivos} activos`, sub: `${fmtShort(totalFacturado)} facturados`, color: T.blue },
    { id: "seguros", icon: "shield", title: "Seguros", value: `${polizasVigentes} vigentes`, sub: `${polizasPorVencer90} próximas · ${polizasVencidas} vencidas`, color: polizasVencidas > 0 ? T.red : T.green },
    { id: "facturacion", icon: "receipt_long", title: "Facturación / Proveedores", value: `${proveedoresUnicos} proveedores`, sub: `${promDiasPago} días promedio de pago`, color: T.purple },
    { id: "vencimientos", icon: "event_busy", title: "Vencimientos", value: `${terminados} terminados`, sub: `${totalActivos - terminados} arrendamientos activos`, color: T.amber },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14 }}>
        <OpKpi icon="inventory_2" label="Activos administrados" value={totalActivos.toString()} accent={T.navy} />
        <OpKpi icon="payments" label="Valor facturado total" value={fmtShort(totalFacturado)} accent={T.blue} />
        <OpKpi icon="verified" label="Pólizas vigentes" value={`${polizasVigentes}/${totalActivos}`} accent={T.green} sub={polizasVencidas > 0 ? `${polizasVencidas} vencidas` : "Sin vencidas"} />
        <OpKpi icon="schedule" label="Aseguradora líder" value={aseguradoraTop ? aseguradoraTop[0].split(" ")[0] : "—"} accent={T.purple} sub={aseguradoraTop ? `${aseguradoraTop[1]} pólizas` : ""} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        {cards.map(c => (
          <button key={c.id} onClick={() => onGoSubTab && onGoSubTab(c.id)} className="hover-lift"
            style={{ ...opCard, padding: 20, cursor: "pointer", textAlign: "left", border: `1px solid ${T.border}`, fontFamily: "inherit" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `${c.color}14`, color: c.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{c.icon}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.navy }}>{c.title}</div>
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: c.color, fontFamily: "'JetBrains Mono', monospace" }}>{c.value}</div>
            <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 4 }}>{c.sub}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, marginTop: 12, letterSpacing: 0.8, textTransform: "uppercase" }}>Abrir reporte →</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// OPERACIÓN — ADMINISTRACIÓN DE ACTIVOS (wrapper)
// ═══════════════════════════════════════════════
function AdminActivosSection({ activeTab, onTabChange }) {
  const tabs = [
    { id: "colocacion", label: "Colocación" },
    { id: "seguros", label: "Seguros" },
    { id: "facturacion", label: "Facturación / Proveedores" },
    { id: "vencimientos", label: "Vencimientos" },
  ];

  return (
    <div style={{ animation: "fadeUp .5s ease" }}>
      <div style={{ display: "flex", gap: 4, marginBottom: 18, background: T.surfaceAlt, borderRadius: T.radiusSm, padding: 3, width: "fit-content", flexWrap: "wrap" }}>
        {tabs.map(t => {
          const active = t.id === activeTab;
          return (
            <button key={t.id} onClick={() => onTabChange(t.id)}
              style={{ padding: "7px 16px", border: "none", borderRadius: 5, background: active ? T.surface : "transparent", color: active ? T.navy : T.textTertiary, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: active ? T.shadow : "none" }}>
              {t.label}
            </button>
          );
        })}
      </div>

      {activeTab === "colocacion" && <OperacionColocacionSection />}
      {activeTab === "seguros" && <OperacionSegurosSection />}
      {activeTab === "facturacion" && <OperacionFacturacionSection />}
      {activeTab === "vencimientos" && <OperacionVencimientosSection />}
    </div>
  );
}

// ═══════════════════════════════════════════════
// OPERACIÓN — COLOCACIÓN
// ═══════════════════════════════════════════════
function OperacionColocacionSection() {
  const yearTarget = 2026;
  const data2026 = ASSETS_REPORT.filter(a => new Date(a.fechaDesembolso).getFullYear() === yearTarget);
  const totalAnual = data2026.reduce((s, a) => s + a.valorFactura, 0);
  const contratosActivos = data2026.length;
  const clientesUnicos = new Set(data2026.map(a => a.acreditada)).size;
  const totalRentas = data2026.reduce((s, a) => s + a.rentaMensual, 0);

  const plazoCount = data2026.reduce((acc, a) => { acc[a.plazo] = (acc[a.plazo] || 0) + 1; return acc; }, {});
  const plazoTop = Object.entries(plazoCount).sort((a, b) => b[1] - a[1])[0];

  // Anual
  const yearsAll = ASSETS_REPORT.reduce((acc, a) => { const y = new Date(a.fechaDesembolso).getFullYear(); acc[y] = (acc[y] || 0) + a.valorFactura; return acc; }, {});
  const yearsEntries = Object.entries(yearsAll).sort().map(([y, v]) => ({ label: y, value: v }));

  // Trimestral 2026
  const triData = [1, 2, 3, 4].map(q => ({
    label: `Q${q} ${yearTarget}`,
    value: data2026.filter(a => Math.ceil((new Date(a.fechaDesembolso).getMonth() + 1) / 3) === q).reduce((s, a) => s + a.valorFactura, 0),
  }));

  // Por mes (anexos)
  const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const mesData = meses.map((m, idx) => ({
    label: m,
    value: data2026.filter(a => new Date(a.fechaDesembolso).getMonth() === idx).reduce((s, a) => s + a.valorFactura, 0),
  }));

  // Entidad federativa
  const entidades = data2026.reduce((acc, a) => { acc[a.entidadFederativa] = (acc[a.entidadFederativa] || 0) + 1; return acc; }, {});
  const entidadEntries = Object.entries(entidades).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ label: k, value: v }));

  const palette = [T.blue, T.green, T.amber, T.purple, T.red, "#688CB3", "#9A8AAB", T.navy, "#8B7355", "#7A9684"];

  const columns = [
    { id: "contrato", label: "Contrato", sortValue: r => r.contratoAnexo },
    { id: "acreditada", label: "Acreditada", sortValue: r => r.acreditadaCorta },
    { id: "fechaDesembolso", label: "Desembolso" },
    { id: "fecha1erPago", label: "1er Pago" },
    { id: "vencimiento", label: "Vencimiento" },
    { id: "valorBienSinIVA", label: "Valor s/IVA", defaultDir: "desc" },
    { id: "valorFactura", label: "Valor Fact.", defaultDir: "desc" },
    { id: "plazo", label: "Plazo", defaultDir: "desc" },
    { id: "rentaMensual", label: "Renta", defaultDir: "desc" },
    { id: "entidad", label: "Entidad", sortValue: r => r.entidadFederativa },
  ];

  const renderCell = (c, r) => {
    if (c.id === "contrato") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: T.navy }}>{r.contratoAnexo}</span>;
    if (c.id === "acreditada") return <span style={{ fontWeight: 600, color: T.text }}>{r.acreditadaCorta}</span>;
    if (c.id === "fechaDesembolso") return <span style={{ color: T.textSecondary }}>{r.fechaDesembolso}</span>;
    if (c.id === "fecha1erPago") return <span style={{ color: T.textSecondary }}>{r.fecha1erPago}</span>;
    if (c.id === "vencimiento") return <span style={{ color: T.textSecondary }}>{r.vencimiento}</span>;
    if (c.id === "valorBienSinIVA") return <span style={{ fontFamily: "'JetBrains Mono', monospace", color: T.textSecondary }}>{fmtShort(r.valorBienSinIVA)}</span>;
    if (c.id === "valorFactura") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: T.navy }}>{fmtShort(r.valorFactura)}</span>;
    if (c.id === "plazo") return <span>{r.plazo}m</span>;
    if (c.id === "rentaMensual") return <span style={{ fontFamily: "'JetBrains Mono', monospace", color: T.textSecondary }}>{fmtShort(r.rentaMensual)}</span>;
    if (c.id === "entidad") return <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: T.blueLight, color: T.blue, fontWeight: 700 }}>{r.entidadFederativa}</span>;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <OpKpi icon="paid" label={`Monto total ${yearTarget}`} value={fmtShort(totalAnual)} accent={T.blue} />
        <OpKpi icon="description" label="Contratos activos" value={contratosActivos.toString()} accent={T.navy} />
        <OpKpi icon="groups" label="Clientes únicos" value={clientesUnicos.toString()} accent={T.green} />
        <OpKpi icon="schedule" label="Plazo dominante" value={plazoTop ? `${plazoTop[0]} meses` : "—"} sub={plazoTop ? `${plazoTop[1]} contratos` : ""} accent={T.purple} />
        <OpKpi icon="payments" label="Rentas mensuales" value={fmtShort(totalRentas)} accent={T.amber} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Colocación anual</h3>
          <HBars entries={yearsEntries} palette={palette} />
        </div>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Colocación trimestral · {yearTarget}</h3>
          <HBars entries={triData} palette={palette} />
        </div>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Valor facturado por mes · {yearTarget}</h3>
          <HBars entries={mesData} palette={palette} />
        </div>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Presencia por entidad federativa</h3>
          <PieChart entries={entidadEntries} palette={palette} />
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Reporte de colocación · drive</h3>
          <span style={{ fontSize: 11, color: T.textTertiary }}>{ASSETS_REPORT.length} registros</span>
        </div>
        <ScrollTable
          columns={columns}
          rows={ASSETS_REPORT}
          gridCols="120px minmax(140px,1.6fr) 90px 90px 90px 90px 100px 60px 90px minmax(110px,1fr)"
          minWidth={1180}
          renderCell={renderCell}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// OPERACIÓN — SEGUROS
// ═══════════════════════════════════════════════
function OperacionSegurosSection() {
  const total = ASSETS_REPORT.length;
  const polizasVencidas = ASSETS_REPORT.filter(a => daysFromToday(a.fechaVencimientoPoliza) < 0).length;
  const polizas30 = ASSETS_REPORT.filter(a => { const d = daysFromToday(a.fechaVencimientoPoliza); return d >= 0 && d <= 30; }).length;
  const polizas90 = ASSETS_REPORT.filter(a => { const d = daysFromToday(a.fechaVencimientoPoliza); return d > 30 && d <= 90; }).length;
  const polizasVigentes = total - polizasVencidas - polizas30 - polizas90;

  // Concentración por aseguradora (count + valor)
  const porAseg = ASSETS_REPORT.reduce((acc, a) => {
    if (!acc[a.aseguradora]) acc[a.aseguradora] = { count: 0, valor: 0 };
    acc[a.aseguradora].count += 1;
    acc[a.aseguradora].valor += a.valorFactura;
    return acc;
  }, {});
  const asegEntries = Object.entries(porAseg).map(([k, v]) => ({ label: k, value: v.count })).sort((a, b) => b.value - a.value);

  // Concentración aseguradora x tipo de activo (top match)
  const porAsegTipo = {};
  ASSETS_REPORT.forEach(a => {
    porAsegTipo[a.aseguradora] = porAsegTipo[a.aseguradora] || {};
    porAsegTipo[a.aseguradora][a.tipoActivo] = (porAsegTipo[a.aseguradora][a.tipoActivo] || 0) + 1;
  });

  const palette = [T.blue, T.green, T.amber, T.purple, T.red, "#688CB3", "#9A8AAB", T.navy];

  const columns = [
    { id: "estatus", label: "Estatus", sortValue: r => daysFromToday(r.fechaVencimientoPoliza) },
    { id: "acreditada", label: "Acreditada", sortValue: r => r.acreditadaCorta },
    { id: "contrato", label: "Contrato", sortValue: r => r.contratoAnexo },
    { id: "tipoActivo", label: "Tipo Activo" },
    { id: "descripcion", label: "Descripción", sortValue: r => r.descripcionActivo },
    { id: "serie", label: "N° Serie", sortValue: r => r.numeroSerie },
    { id: "poliza", label: "N° Póliza", sortValue: r => r.numeroPoliza },
    { id: "venc", label: "Venc. Póliza", sortValue: r => r.fechaVencimientoPoliza },
    { id: "aseguradora", label: "Aseguradora" },
  ];

  const renderCell = (c, r) => {
    const days = daysFromToday(r.fechaVencimientoPoliza);
    const sem = polizaSemaforo(days);
    if (c.id === "estatus") return <span style={{ fontSize: 9, fontWeight: 800, padding: "3px 8px", borderRadius: 4, background: sem.bg, color: sem.color, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.5 }}>{sem.label}</span>;
    if (c.id === "acreditada") return <span style={{ fontWeight: 600, color: T.text }}>{r.acreditadaCorta}</span>;
    if (c.id === "contrato") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.navy, fontWeight: 700 }}>{r.contratoAnexo}</span>;
    if (c.id === "tipoActivo") return <span style={{ color: T.textSecondary, fontSize: 10 }}>{r.tipoActivo.length > 26 ? r.tipoActivo.slice(0, 24) + "…" : r.tipoActivo}</span>;
    if (c.id === "descripcion") return <span style={{ color: T.textSecondary, fontSize: 10 }}>{r.descripcionActivo.length > 32 ? r.descripcionActivo.slice(0, 30) + "…" : r.descripcionActivo}</span>;
    if (c.id === "serie") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textTertiary }}>{r.numeroSerie}</span>;
    if (c.id === "poliza") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.text }}>{r.numeroPoliza}</span>;
    if (c.id === "venc") return (
      <span style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: sem.color, fontWeight: 700 }}>{r.fechaVencimientoPoliza}</span>
        <span style={{ fontSize: 9, color: T.textTertiary }}>{days < 0 ? `${Math.abs(days)}d vencida` : `en ${days}d`}</span>
      </span>
    );
    if (c.id === "aseguradora") return <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: T.surfaceAlt, color: T.text, fontWeight: 600 }}>{r.aseguradora}</span>;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <OpKpi icon="shield" label="Pólizas activas" value={`${total - polizasVencidas}`} sub={`${total} totales`} accent={T.green} />
        <OpKpi icon="warning" label="Vencidas" value={polizasVencidas.toString()} accent={T.red} />
        <OpKpi icon="schedule" label="Críticas (≤30 días)" value={polizas30.toString()} accent="#7A4848" />
        <OpKpi icon="event_upcoming" label="Próximas (31–90 días)" value={polizas90.toString()} accent={T.amber} />
        <OpKpi icon="verified" label="Vigentes (>90 días)" value={polizasVigentes.toString()} accent={T.green} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Concentración por aseguradora</h3>
          <HBars entries={asegEntries} palette={palette} formatter={n => `${n} pólizas`} />
        </div>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Aseguradora × tipo de activo</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: 320, overflowY: "auto" }}>
            {Object.entries(porAsegTipo).sort((a, b) => Object.values(b[1]).reduce((x,y)=>x+y,0) - Object.values(a[1]).reduce((x,y)=>x+y,0)).map(([aseg, tipos]) => {
              const entries = Object.entries(tipos).map(([k, v]) => ({ label: k.length > 22 ? k.slice(0,20) + "…" : k, value: v })).sort((a,b) => b.value - a.value);
              return (
                <div key={aseg}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.navy, marginBottom: 6 }}>{aseg}</div>
                  <StackedBar entries={entries} palette={palette} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Reporte de seguros · drive</h3>
          <div style={{ display: "flex", gap: 10, fontSize: 10, color: T.textSecondary }}>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: T.green }} />Vigente</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: T.amber }} />Próxima</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#7A4848" }} />Crítica</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: T.red }} />Vencida</span>
          </div>
        </div>
        <ScrollTable
          columns={columns}
          rows={[...ASSETS_REPORT].sort((a, b) => daysFromToday(a.fechaVencimientoPoliza) - daysFromToday(b.fechaVencimientoPoliza))}
          gridCols="80px minmax(140px,1.4fr) 110px minmax(140px,1.2fr) minmax(160px,1.4fr) 110px 130px 130px minmax(110px,1fr)"
          minWidth={1280}
          renderCell={renderCell}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// OPERACIÓN — FACTURACIÓN / PROVEEDORES
// ═══════════════════════════════════════════════
function OperacionFacturacionSection() {
  const total = ASSETS_REPORT.length;
  const totalFacturado = ASSETS_REPORT.reduce((s, a) => s + a.valorFactura, 0);
  const promDias = Math.round(ASSETS_REPORT.reduce((s, a) => s + a.tiempoPagoDias, 0) / total);
  const proveedoresUnicos = new Set(ASSETS_REPORT.map(a => a.proveedor)).size;

  const minDias = Math.min(...ASSETS_REPORT.map(a => a.tiempoPagoDias));
  const maxDias = Math.max(...ASSETS_REPORT.map(a => a.tiempoPagoDias));

  // Top proveedores por número de facturas
  const porProv = ASSETS_REPORT.reduce((acc, a) => {
    if (!acc[a.proveedor]) acc[a.proveedor] = { count: 0, valor: 0, diasSum: 0 };
    acc[a.proveedor].count += 1;
    acc[a.proveedor].valor += a.valorFactura;
    acc[a.proveedor].diasSum += a.tiempoPagoDias;
    return acc;
  }, {});
  const provEntries = Object.entries(porProv).map(([k, v]) => ({ label: k.length > 26 ? k.slice(0,24) + "…" : k, value: v.valor, raw: v })).sort((a, b) => b.value - a.value).slice(0, 8);

  // Distribución días de pago en buckets
  const buckets = [
    { label: "0-15 días", min: 0, max: 15 },
    { label: "16-30 días", min: 16, max: 30 },
    { label: "31-45 días", min: 31, max: 45 },
    { label: "46-60 días", min: 46, max: 60 },
    { label: "60+ días", min: 61, max: Infinity },
  ];
  const bucketData = buckets.map(b => ({ label: b.label, value: ASSETS_REPORT.filter(a => a.tiempoPagoDias >= b.min && a.tiempoPagoDias <= b.max).length }));

  const palette = [T.blue, T.green, T.amber, T.purple, T.red, "#688CB3", "#9A8AAB", T.navy];

  const columns = [
    { id: "acreditada", label: "Acreditada", sortValue: r => r.acreditadaCorta },
    { id: "contrato", label: "Contrato", sortValue: r => r.contratoAnexo },
    { id: "tipoActivo", label: "Tipo Activo" },
    { id: "tipoOp", label: "Operación", sortValue: r => r.tipoOperacion },
    { id: "proveedor", label: "Proveedor" },
    { id: "rfc", label: "RFC", sortValue: r => r.rfcProveedor },
    { id: "entidadProv", label: "Entidad Prov.", sortValue: r => r.entidadProveedor },
    { id: "fechaFact", label: "Fecha Factura", sortValue: r => r.fechaFacturacion },
    { id: "factura", label: "Factura" },
    { id: "folio", label: "Folio Fiscal", sortValue: r => r.folioFiscal },
    { id: "valorFact", label: "Valor c/IVA", sortValue: r => r.valorFactura, defaultDir: "desc" },
    { id: "moneda", label: "Mon." },
    { id: "accesorios", label: "Accesorios", sortValue: r => r.valorAccesorios, defaultDir: "desc" },
    { id: "fechaPago", label: "Fecha Pago" },
    { id: "diasPago", label: "Días", sortValue: r => r.tiempoPagoDias, defaultDir: "desc" },
    { id: "fechaComp", label: "Comp. Pago", sortValue: r => r.fechaComplementoPago },
  ];

  const renderCell = (c, r) => {
    if (c.id === "acreditada") return <span style={{ fontWeight: 600, color: T.text, fontSize: 10 }}>{r.acreditadaCorta}</span>;
    if (c.id === "contrato") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.navy, fontWeight: 700 }}>{r.contratoAnexo}</span>;
    if (c.id === "tipoActivo") return <span style={{ fontSize: 10, color: T.textSecondary }}>{r.tipoActivo.length > 22 ? r.tipoActivo.slice(0,20) + "…" : r.tipoActivo}</span>;
    if (c.id === "tipoOp") {
      const colorMap = { "Nuevo": T.green, "Sale & Lease Back": T.blue, "Reestructura": T.amber };
      return <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: `${colorMap[r.tipoOperacion]}14`, color: colorMap[r.tipoOperacion], fontWeight: 700 }}>{r.tipoOperacion}</span>;
    }
    if (c.id === "proveedor") return <span style={{ fontSize: 10, color: T.text, fontWeight: 600 }}>{r.proveedor.length > 24 ? r.proveedor.slice(0,22) + "…" : r.proveedor}</span>;
    if (c.id === "rfc") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: T.textTertiary }}>{r.rfcProveedor}</span>;
    if (c.id === "entidadProv") return <span style={{ fontSize: 10, color: T.textSecondary }}>{r.entidadProveedor}</span>;
    if (c.id === "fechaFact") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textSecondary }}>{r.fechaFacturacion}</span>;
    if (c.id === "factura") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.text }}>{r.factura}</span>;
    if (c.id === "folio") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: T.textTertiary }}>{r.folioFiscal}</span>;
    if (c.id === "valorFact") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: T.navy }}>{fmtShort(r.valorFactura)}</span>;
    if (c.id === "moneda") return <span style={{ fontSize: 10, color: T.textSecondary }}>{r.moneda}</span>;
    if (c.id === "accesorios") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textSecondary }}>{fmtShort(r.valorAccesorios)}</span>;
    if (c.id === "fechaPago") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textSecondary }}>{r.fechaPago}</span>;
    if (c.id === "diasPago") {
      const color = r.tiempoPagoDias <= 30 ? T.green : r.tiempoPagoDias <= 60 ? T.amber : T.red;
      return <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 3, background: `${color}14`, color, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{r.tiempoPagoDias}d</span>;
    }
    if (c.id === "fechaComp") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textTertiary }}>{r.fechaComplementoPago}</span>;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
        <OpKpi icon="receipt_long" label="Facturas registradas" value={total.toString()} accent={T.navy} />
        <OpKpi icon="paid" label="Total facturado" value={fmtShort(totalFacturado)} accent={T.blue} />
        <OpKpi icon="schedule" label="Días promedio de pago" value={`${promDias} días`} sub={`Rango: ${minDias}–${maxDias}d`} accent={T.purple} />
        <OpKpi icon="storefront" label="Proveedores únicos" value={proveedoresUnicos.toString()} accent={T.green} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Top proveedores por valor facturado</h3>
          <HBars entries={provEntries} palette={palette} />
        </div>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Distribución días de pago</h3>
          <HBars entries={bucketData} palette={palette} formatter={n => `${n} facturas`} />
          <div style={{ marginTop: 14, padding: 12, background: T.blueLight, borderRadius: T.radiusSm, fontSize: 11, color: T.navy }}>
            <strong>Promedio del portafolio: {promDias} días</strong> entre fecha de facturación y fecha de pago.
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Reporte de facturación · drive</h3>
          <span style={{ fontSize: 11, color: T.textTertiary }}>{total} registros</span>
        </div>
        <ScrollTable
          columns={columns}
          rows={ASSETS_REPORT}
          gridCols="minmax(140px,1.3fr) 110px minmax(140px,1.2fr) 100px minmax(160px,1.4fr) 100px 100px 100px 100px 110px 90px 60px 80px 100px 60px 100px"
          minWidth={1700}
          renderCell={renderCell}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// OPERACIÓN — VENCIMIENTOS
// ═══════════════════════════════════════════════
function OperacionVencimientosSection() {
  const total = ASSETS_REPORT.length;
  const terminados = ASSETS_REPORT.filter(a => a.fechaTerminoVenta);
  const activos = total - terminados.length;

  const proximos90 = ASSETS_REPORT.filter(a => { const d = daysFromToday(a.vencimiento); return d >= 0 && d <= 90 && !a.fechaTerminoVenta; }).length;
  const vencidos = ASSETS_REPORT.filter(a => { const d = daysFromToday(a.vencimiento); return d < 0 && !a.fechaTerminoVenta; }).length;

  // % por tipo de operación
  const porTipo = ASSETS_REPORT.reduce((acc, a) => { acc[a.tipoOperacion] = (acc[a.tipoOperacion] || 0) + 1; return acc; }, {});
  const tipoEntries = Object.entries(porTipo).map(([k, v]) => ({ label: k, value: v }));

  // Tiempo de venta = fechaTerminoVenta - vencimiento
  const tiemposVenta = terminados.map(a => ({
    ...a,
    diasVenta: Math.round((new Date(a.fechaTerminoVenta) - new Date(a.vencimiento)) / 86400000),
  }));
  const promVenta = tiemposVenta.length > 0 ? Math.round(tiemposVenta.reduce((s, a) => s + a.diasVenta, 0) / tiemposVenta.length) : 0;

  // Tiempo de venta por tipo de activo
  const ventaPorTipo = {};
  tiemposVenta.forEach(a => {
    if (!ventaPorTipo[a.tipoActivo]) ventaPorTipo[a.tipoActivo] = { sum: 0, count: 0 };
    ventaPorTipo[a.tipoActivo].sum += a.diasVenta;
    ventaPorTipo[a.tipoActivo].count += 1;
  });
  const ventaTipoEntries = Object.entries(ventaPorTipo).map(([k, v]) => ({ label: k.length > 26 ? k.slice(0,24) + "…" : k, value: Math.round(v.sum / v.count), count: v.count })).sort((a, b) => b.value - a.value);

  const palette = [T.green, T.blue, T.amber, T.purple, T.red, "#688CB3", "#9A8AAB", T.navy];
  const tipoOpPalette = { "Nuevo": T.green, "Sale & Lease Back": T.blue, "Reestructura": T.amber };

  const columns = [
    { id: "acreditada", label: "Acreditada", sortValue: r => r.acreditadaCorta },
    { id: "contrato", label: "Contrato", sortValue: r => r.contratoAnexo },
    { id: "tipoActivo", label: "Tipo Activo" },
    { id: "tipoOp", label: "Operación", sortValue: r => r.tipoOperacion },
    { id: "factura", label: "Factura" },
    { id: "folio", label: "Folio Fiscal", sortValue: r => r.folioFiscal },
    { id: "valor", label: "Valor c/IVA", sortValue: r => r.valorFactura, defaultDir: "desc" },
    { id: "vencimiento", label: "Vencimiento" },
    { id: "termino", label: "Término (Venta)", sortValue: r => r.fechaTerminoVenta || "" },
    { id: "diasVenta", label: "Días Venta", sortValue: r => r.fechaTerminoVenta ? Math.round((new Date(r.fechaTerminoVenta) - new Date(r.vencimiento)) / 86400000) : null, defaultDir: "desc" },
    { id: "receptor", label: "Receptor", sortValue: r => r.receptorTermino || "" },
  ];

  const renderCell = (c, r) => {
    const diasVenta = r.fechaTerminoVenta ? Math.round((new Date(r.fechaTerminoVenta) - new Date(r.vencimiento)) / 86400000) : null;
    if (c.id === "acreditada") return <span style={{ fontWeight: 600, color: T.text, fontSize: 10 }}>{r.acreditadaCorta}</span>;
    if (c.id === "contrato") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.navy, fontWeight: 700 }}>{r.contratoAnexo}</span>;
    if (c.id === "tipoActivo") return <span style={{ fontSize: 10, color: T.textSecondary }}>{r.tipoActivo.length > 24 ? r.tipoActivo.slice(0,22) + "…" : r.tipoActivo}</span>;
    if (c.id === "tipoOp") return <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: `${tipoOpPalette[r.tipoOperacion]}14`, color: tipoOpPalette[r.tipoOperacion], fontWeight: 700 }}>{r.tipoOperacion}</span>;
    if (c.id === "factura") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.text }}>{r.factura}</span>;
    if (c.id === "folio") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: T.textTertiary }}>{r.folioFiscal}</span>;
    if (c.id === "valor") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: T.navy }}>{fmtShort(r.valorFactura)}</span>;
    if (c.id === "vencimiento") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textSecondary }}>{r.vencimiento}</span>;
    if (c.id === "termino") return r.fechaTerminoVenta
      ? <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.green, fontWeight: 700 }}>{r.fechaTerminoVenta}</span>
      : <span style={{ fontSize: 10, color: T.textTertiary }}>— activo —</span>;
    if (c.id === "diasVenta") {
      if (diasVenta === null) return <span style={{ color: T.textTertiary, fontSize: 10 }}>—</span>;
      const color = diasVenta < 0 ? T.green : diasVenta <= 60 ? T.amber : T.red;
      return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 800, color, padding: "2px 6px", borderRadius: 3, background: `${color}14` }}>{diasVenta > 0 ? `+${diasVenta}d` : `${diasVenta}d`}</span>;
    }
    if (c.id === "receptor") return <span style={{ fontSize: 10, color: T.textSecondary }}>{r.receptorTermino || "—"}</span>;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <OpKpi icon="event" label="Arrendamientos activos" value={activos.toString()} accent={T.blue} />
        <OpKpi icon="check_circle" label="Terminados / Vendidos" value={terminados.length.toString()} sub={`${((terminados.length/total)*100).toFixed(1)}% del portafolio`} accent={T.green} />
        <OpKpi icon="alarm" label="Próximos a vencer (≤90d)" value={proximos90.toString()} accent={T.amber} />
        <OpKpi icon="warning" label="Vencidos sin recolocar" value={vencidos.toString()} accent={T.red} />
        <OpKpi icon="schedule" label="Tiempo prom. de venta" value={`${promVenta}d`} sub="vs vencimiento contrato" accent={T.purple} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Distribución por tipo de operación</h3>
          <PieChart entries={tipoEntries} palette={[T.green, T.blue, T.amber]} />
        </div>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 4px" }}>Tiempo de venta por tipo de activo</h3>
          <p style={{ fontSize: 11, color: T.textTertiary, margin: "0 0 14px" }}>Días entre vencimiento y recolocación · negativo = vendido antes de vencer</p>
          {ventaTipoEntries.length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", color: T.textTertiary, fontSize: 12 }}>Aún no hay activos terminados</div>
          ) : (
            <HBars entries={ventaTipoEntries} palette={palette} formatter={n => `${n} días prom.`} />
          )}
        </div>
      </div>

      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Reporte de vencimientos · drive</h3>
          <span style={{ fontSize: 11, color: T.textTertiary }}>{total} registros</span>
        </div>
        <ScrollTable
          columns={columns}
          rows={[...ASSETS_REPORT].sort((a, b) => new Date(a.vencimiento) - new Date(b.vencimiento))}
          gridCols="minmax(140px,1.3fr) 110px minmax(150px,1.3fr) 110px 100px 110px 100px 100px 110px 80px minmax(120px,1fr)"
          minWidth={1380}
          renderCell={renderCell}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// CRM — DATA
// ═══════════════════════════════════════════════
const CRM_EJECUTIVOS = ["Carlos Mendoza", "Ana Ríos", "Jorge Fuentes", "Laura Soto"];
const CRM_ETAPAS = [
  { id: "Prospección", color: T.blue, bg: T.blueLight },
  { id: "Propuesta", color: T.purple, bg: T.purpleLight },
  { id: "Negociación", color: T.amber, bg: T.amberLight },
  { id: "Cierre", color: "#3D6792", bg: "#A8C2DC" },
  { id: "Ganada", color: T.green, bg: T.greenLight },
  { id: "Perdida", color: T.red, bg: T.redLight },
  { id: "No calificó", color: "#6B7280", bg: "#F3F4F6" },
];

const CRM_DEALS_INIT = [
  { id: "d01", empresa: "Transportes del Norte", rs: "TRANSPORTES DEL NORTE SA DE CV", rfc: "TNO150612AB1", sector: "Transporte y logística", ubicacion: "Nuevo León", web: "https://transnorte.com.mx", tipoPersona: "pm", canal: "broker", broker: "Capital Brokers SA", ejecutivo: "Carlos Mendoza", contacto: { nombre: "Roberto Garza", puesto: "Director Operaciones", tel: "+52 81 1234 5678", email: "rgarza@transnorte.com.mx" }, fechaAcercamiento: "2026-03-15", semaforo: "verde", etapa: "Negociación", activo: { tipo: "Volvo FH 540 (5 unid.)", cat: "Equipo de transporte", valor: 4500000, monto: 3600000, plazo: 48, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: "2026-03-22", viable: true }, contrato: { tasa: "TIIE+4.5%", renta: 95000, residual: "10%", tir: "18.5%" }, exp: { docsOk: 18, docsTotal: 26, riesgos: "2026-04-08", autorizado: null, cierre: null }, verde: false, perdida: null, ai: { score: 78, rec: "Cliente con alta probabilidad. Avanzar con propuesta agresiva en plazo y tasa para asegurar cierre antes de fin de mes." } },
  { id: "d02", empresa: "Constructora Bajío Premium", rs: "CONSTRUCTORA BAJÍO PREMIUM SA DE CV", rfc: "CBP180214MN5", sector: "Construcción", ubicacion: "Guanajuato", web: "https://cbpremium.mx", tipoPersona: "pm", canal: "referido", broker: null, ejecutivo: "Ana Ríos", contacto: { nombre: "Mariana López", puesto: "Gerente Financiero", tel: "+52 477 220 1100", email: "mlopez@cbpremium.mx" }, fechaAcercamiento: "2026-03-22", semaforo: "verde", etapa: "Cierre", activo: { tipo: "CAT 320 GC + Retro 420F2", cat: "Maquinaria pesada", valor: 8900000, monto: 7120000, plazo: 60, arr: "Arrendamiento Financiero", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: "2026-03-28", viable: true }, contrato: { tasa: "TIIE+3.8%", renta: 162000, residual: "8%", tir: "17.2%" }, exp: { docsOk: 24, docsTotal: 26, riesgos: "2026-04-05", autorizado: "2026-04-22", cierre: null }, verde: false, perdida: null, ai: { score: 91, rec: "Expediente sólido y autorización lista. Programar firma esta semana, riesgo de demora si se posterga >10 días." } },
  { id: "d03", empresa: "Tech Solutions GDL", rs: "TECH SOLUTIONS DE GUADALAJARA SA DE CV", rfc: "TSG170418PQ4", sector: "Tecnología", ubicacion: "Jalisco", web: "https://techgdl.com", tipoPersona: "pm", canal: "interno", broker: null, ejecutivo: "Jorge Fuentes", contacto: { nombre: "Andrés Ruiz", puesto: "CTO", tel: "+52 33 3456 7890", email: "aruiz@techgdl.com" }, fechaAcercamiento: "2026-04-02", semaforo: "amarillo", etapa: "Propuesta", activo: { tipo: "Servidores HPE Gen11 + UPS", cat: "Tecnología / IT", valor: 3200000, monto: 2880000, plazo: 36, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "10%" }, ekatena: { fecha: "2026-04-08", viable: true }, contrato: { tasa: "TIIE+5.2%", renta: 96000, residual: "5%", tir: "20.1%" }, exp: { docsOk: 8, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: true, perdida: null, ai: { score: 64, rec: "Tecnología deprecia rápido — sugerir plazo 36m y enganche reforzado. Cliente comparando con 2 competidores." } },
  { id: "d04", empresa: "AgroBajío Industrial", rs: "AGROINDUSTRIAS DEL BAJÍO SA DE CV", rfc: "ABI160910KP1", sector: "Agropecuario", ubicacion: "Guanajuato", web: "https://agrobajio.com", tipoPersona: "pm", canal: "alianza", broker: "Alianza Banco Local", ejecutivo: "Laura Soto", contacto: { nombre: "Pedro Hernández", puesto: "Director General", tel: "+52 461 555 7788", email: "phernandez@agrobajio.com" }, fechaAcercamiento: "2026-03-30", semaforo: "verde", etapa: "Negociación", activo: { tipo: "John Deere 8R + Cosechadora", cat: "Maquinaria pesada", valor: 12500000, monto: 10000000, plazo: 60, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: "2026-04-01", viable: true }, contrato: { tasa: "TIIE+4.0%", renta: 215000, residual: "12%", tir: "16.8%" }, exp: { docsOk: 14, docsTotal: 26, riesgos: "2026-04-12", autorizado: null, cierre: null }, verde: true, perdida: null, ai: { score: 82, rec: "Negocio estacional. Aprovechar ventana antes del ciclo agrícola. Buena reputación crediticia del aval." } },
  { id: "d05", empresa: "Logística Express MX", rs: "LOGÍSTICA EXPRESS DE MÉXICO SA DE CV", rfc: "LEM140312BB9", sector: "Transporte y logística", ubicacion: "Estado de México", web: "https://logiexpressmx.com", tipoPersona: "pm", canal: "broker", broker: "Brokers Premier", ejecutivo: "Carlos Mendoza", contacto: { nombre: "Susana Martínez", puesto: "VP Operaciones", tel: "+52 55 8800 1122", email: "smartinez@logiexpressmx.com" }, fechaAcercamiento: "2026-04-10", semaforo: "verde", etapa: "Propuesta", activo: { tipo: "Cajas Refrigeradas Thermo King (10 unid.)", cat: "Equipo de transporte", valor: 6800000, monto: 5440000, plazo: 48, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: "2026-04-15", viable: true }, contrato: { tasa: "TIIE+4.2%", renta: 142000, residual: "10%", tir: "17.5%" }, exp: { docsOk: 11, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: true, perdida: null, ai: { score: 73, rec: "Cliente recurrente del sector. Sólidas relaciones bancarias — tasa competitiva clave. Acelerar firma." } },
  { id: "d06", empresa: "Manufactura Textil Querétaro", rs: "MANUFACTURA TEXTIL QUERÉTARO SA DE CV", rfc: "MTQ190501XX2", sector: "Manufactura", ubicacion: "Querétaro", web: "https://mtq.com.mx", tipoPersona: "pm", canal: "referido", broker: null, ejecutivo: "Ana Ríos", contacto: { nombre: "Carlos Ortega", puesto: "Director Industrial", tel: "+52 442 290 0011", email: "cortega@mtq.com.mx" }, fechaAcercamiento: "2026-04-12", semaforo: "amarillo", etapa: "Prospección", activo: { tipo: "Telar industrial Picanol OmniPlus", cat: "Equipo de manufactura", valor: 3800000, monto: 3040000, plazo: 48, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: null, viable: null }, contrato: null, exp: { docsOk: 3, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: false, perdida: null, ai: { score: 52, rec: "Información financiera incompleta. Solicitar EEFF antes de cotizar. Cliente nuevo sin historial." } },
  { id: "d07", empresa: "Solar Energy Sonora", rs: "SOLAR ENERGY SONORA SA DE CV", rfc: "SES210603AA3", sector: "Energía", ubicacion: "Sonora", web: "https://solarsonora.mx", tipoPersona: "pm", canal: "alianza", broker: "Alianza Verde", ejecutivo: "Jorge Fuentes", contacto: { nombre: "Diana Reyes", puesto: "Directora de Proyectos", tel: "+52 662 480 5566", email: "dreyes@solarsonora.mx" }, fechaAcercamiento: "2026-04-15", semaforo: "verde", etapa: "Negociación", activo: { tipo: "Paneles + Inversores 5MW", cat: "Energía / Generación", valor: 18500000, monto: 15725000, plazo: 60, arr: "Arrendamiento Puro", moneda: "USD", enganche: "15%" }, ekatena: { fecha: "2026-04-18", viable: true }, contrato: { tasa: "TIIE+3.5%", renta: 320000, residual: "10%", tir: "15.9%" }, exp: { docsOk: 16, docsTotal: 26, riesgos: "2026-04-25", autorizado: null, cierre: null }, verde: true, perdida: null, ai: { score: 86, rec: "Operación verde con bono BONO ESG. Aprovechar incentivos. Mercado secundario de paneles activo." } },
  { id: "d08", empresa: "Distribuidora Pacífico", rs: "DISTRIBUIDORA PACÍFICO SA DE CV", rfc: "DIP080718JK6", sector: "Comercio", ubicacion: "Sinaloa", web: "https://distpacifico.com", tipoPersona: "pm", canal: "interno", broker: null, ejecutivo: "Laura Soto", contacto: { nombre: "Hugo Castillo", puesto: "Gerente General", tel: "+52 667 712 9988", email: "hcastillo@distpacifico.com" }, fechaAcercamiento: "2026-03-28", semaforo: "verde", etapa: "Cierre", activo: { tipo: "Camiones de reparto Hino (8 unid.)", cat: "Equipo de transporte", valor: 5200000, monto: 4160000, plazo: 48, arr: "Arrendamiento Financiero", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: "2026-04-02", viable: true }, contrato: { tasa: "TIIE+4.3%", renta: 112000, residual: "8%", tir: "17.8%" }, exp: { docsOk: 25, docsTotal: 26, riesgos: "2026-04-08", autorizado: "2026-04-24", cierre: null }, verde: false, perdida: null, ai: { score: 94, rec: "Listo para cierre. Solo falta acta constitutiva certificada. Probabilidad muy alta." } },
  { id: "d09", empresa: "Hospital San Vicente", rs: "HOSPITAL SAN VICENTE SC", rfc: "HSV050422FF1", sector: "Salud", ubicacion: "CDMX", web: "https://hsanvicente.mx", tipoPersona: "pm", canal: "referido", broker: null, ejecutivo: "Carlos Mendoza", contacto: { nombre: "Dra. Patricia Vega", puesto: "Directora Médica", tel: "+52 55 5530 8800", email: "pvega@hsanvicente.mx" }, fechaAcercamiento: "2026-04-08", semaforo: "amarillo", etapa: "Propuesta", activo: { tipo: "Resonador Magnético Siemens 3T", cat: "Equipo médico", valor: 14200000, monto: 11360000, plazo: 60, arr: "Arrendamiento Financiero", moneda: "USD", enganche: "20%" }, ekatena: { fecha: "2026-04-14", viable: true }, contrato: { tasa: "TIIE+4.8%", renta: 245000, residual: "5%", tir: "18.2%" }, exp: { docsOk: 9, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: false, perdida: null, ai: { score: 67, rec: "Equipo especializado de bajo mercado secundario. Reforzar covenants de mantenimiento." } },
  { id: "d10", empresa: "Inmobiliaria Polanco", rs: "INMOBILIARIA POLANCO SAPI DE CV", rfc: "IPO110205RE7", sector: "Servicios", ubicacion: "CDMX", web: "https://inmpolanco.com", tipoPersona: "pm", canal: "interno", broker: null, ejecutivo: "Ana Ríos", contacto: { nombre: "Eduardo Salinas", puesto: "CFO", tel: "+52 55 5280 3344", email: "esalinas@inmpolanco.com" }, fechaAcercamiento: "2026-04-18", semaforo: "amarillo", etapa: "Prospección", activo: { tipo: "Mantenimiento + Equipo HVAC", cat: "Inmueble productivo", valor: 2800000, monto: 2240000, plazo: 36, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: null, viable: null }, contrato: null, exp: { docsOk: 2, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: true, perdida: null, ai: { score: 48, rec: "Etapa muy temprana. Confirmar capacidad de pago y sector secundario inmobiliario." } },
  { id: "d11", empresa: "Minera Cobre Pacífico", rs: "MINERA COBRE DEL PACÍFICO SA DE CV", rfc: "MCP120815MM5", sector: "Construcción", ubicacion: "Sonora", web: "https://mcpacifico.com", tipoPersona: "pm", canal: "broker", broker: "Mining Capital", ejecutivo: "Jorge Fuentes", contacto: { nombre: "Roberto Sánchez", puesto: "Director Operaciones", tel: "+52 631 320 4400", email: "rsanchez@mcpacifico.com" }, fechaAcercamiento: "2026-02-10", semaforo: "verde", etapa: "Ganada", activo: { tipo: "Sandvik DD422i Jumbo + Trituradora", cat: "Maquinaria pesada", valor: 22000000, monto: 17600000, plazo: 60, arr: "Arrendamiento Puro", moneda: "USD", enganche: "20%" }, ekatena: { fecha: "2026-02-18", viable: true }, contrato: { tasa: "TIIE+3.2%", renta: 380000, residual: "12%", tir: "15.5%" }, exp: { docsOk: 26, docsTotal: 26, riesgos: "2026-02-25", autorizado: "2026-03-18", cierre: "2026-04-02" }, verde: false, perdida: null, ai: { score: 100, rec: "Operación cerrada exitosamente. Cliente ancla — explorar oportunidades de cross-sell." } },
  { id: "d12", empresa: "ABC Aluminum", rs: "ALUMINIO DE BAJA CALIFORNIA SA DE CV", rfc: "ABC991012BF0", sector: "Manufactura", ubicacion: "Baja California", web: "https://abc-aluminum.com", tipoPersona: "pm", canal: "interno", broker: null, ejecutivo: "Laura Soto", contacto: { nombre: "Wadih Kuri Rendón", puesto: "Director General", tel: "+52 664 980 1144", email: "wkuri@abc-aluminum.com" }, fechaAcercamiento: "2026-01-20", semaforo: "verde", etapa: "Ganada", activo: { tipo: "Equipo de Subestación Eléctrica", cat: "Equipo de manufactura", valor: 40000000, monto: 32000000, plazo: 48, arr: "Sale & Lease Back", moneda: "USD", enganche: "0%" }, ekatena: { fecha: "2026-01-28", viable: true }, contrato: { tasa: "TIIE+5.5%", renta: 1095798, residual: "0%", tir: "26.3%" }, exp: { docsOk: 26, docsTotal: 26, riesgos: "2026-02-05", autorizado: "2026-02-28", cierre: "2026-03-15" }, verde: false, perdida: null, ai: { score: 100, rec: "Cliente activo recurrente. Mantener relación cercana con CFO." } },
  { id: "d13", empresa: "Grupo Constructor Pacífico", rs: "GRUPO CONSTRUCTOR PACÍFICO SA DE CV", rfc: "GCP180523LA9", sector: "Construcción", ubicacion: "CDMX", web: "https://gcpacifico.com.mx", tipoPersona: "pm", canal: "referido", broker: null, ejecutivo: "Carlos Mendoza", contacto: { nombre: "Roberto Sánchez Mora", puesto: "Director General", tel: "+52 55 5350 7700", email: "rsanchez@gcpacifico.com.mx" }, fechaAcercamiento: "2026-01-15", semaforo: "verde", etapa: "Ganada", activo: { tipo: "Excavadora CAT 320 + Retro 420F2", cat: "Maquinaria pesada", valor: 28500000, monto: 25650000, plazo: 36, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "10%" }, ekatena: { fecha: "2026-01-25", viable: true }, contrato: { tasa: "TIIE+3.9%", renta: 985420, residual: "1%", tir: "23.5%" }, exp: { docsOk: 26, docsTotal: 26, riesgos: "2026-02-02", autorizado: "2026-02-22", cierre: "2026-03-08" }, verde: false, perdida: null, ai: { score: 100, rec: "Cliente activo. Buena oportunidad de ampliar línea de crédito." } },
  { id: "d14", empresa: "Plásticos del Sureste", rs: "PLÁSTICOS REFORMA DEL SURESTE SA DE CV", rfc: "PRS220317LL3", sector: "Manufactura", ubicacion: "Tabasco", web: "https://plasticossur.mx", tipoPersona: "pm", canal: "broker", broker: "Sur Capital", ejecutivo: "Ana Ríos", contacto: { nombre: "Felipe Mora", puesto: "Director", tel: "+52 993 350 2200", email: "fmora@plasticossur.mx" }, fechaAcercamiento: "2026-02-01", semaforo: "verde", etapa: "Ganada", activo: { tipo: "Inyectora Engel ENGEL 500T", cat: "Equipo de manufactura", valor: 4850000, monto: 4122500, plazo: 36, arr: "Arrendamiento Financiero", moneda: "MXN", enganche: "15%" }, ekatena: { fecha: "2026-02-08", viable: true }, contrato: { tasa: "TIIE+4.6%", renta: 152400, residual: "5%", tir: "23.5%" }, exp: { docsOk: 26, docsTotal: 26, riesgos: "2026-02-15", autorizado: "2026-03-01", cierre: "2026-03-12" }, verde: false, perdida: null, ai: { score: 100, rec: "Cliente activo. Buen pagador. Considerar segunda línea." } },
  { id: "d15", empresa: "Servicios Logísticos Central", rs: "SERVICIOS LOGÍSTICOS CENTRAL SA DE CV", rfc: "SLC210918DD8", sector: "Transporte y logística", ubicacion: "Puebla", web: "https://slcentral.mx", tipoPersona: "pm", canal: "broker", broker: "Capital Brokers SA", ejecutivo: "Carlos Mendoza", contacto: { nombre: "Lorena Díaz", puesto: "Operaciones", tel: "+52 222 880 1100", email: "ldiaz@slcentral.mx" }, fechaAcercamiento: "2026-03-05", semaforo: "rojo", etapa: "Perdida", activo: { tipo: "Tractocamiones Kenworth (3 unid.)", cat: "Equipo de transporte", valor: 4200000, monto: 3360000, plazo: 48, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: "2026-03-12", viable: true }, contrato: null, exp: { docsOk: 12, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: false, perdida: "Precio / Tasa no competitiva", ai: { score: 0, rec: "Perdido por tasa. Cliente comparó con 3 competidores. Cerrar archivo." } },
  { id: "d16", empresa: "Distribuidora Farmacéutica RB", rs: "DISTRIBUIDORA FARMACÉUTICA RB SA DE CV", rfc: "DFR181122RR4", sector: "Salud", ubicacion: "CDMX", web: "https://farmaciasrb.com", tipoPersona: "pm", canal: "referido", broker: null, ejecutivo: "Jorge Fuentes", contacto: { nombre: "Miguel Ángel Pérez", puesto: "CFO", tel: "+52 55 5390 4422", email: "mperez@farmaciasrb.com" }, fechaAcercamiento: "2026-03-10", semaforo: "rojo", etapa: "No calificó", activo: { tipo: "Equipo cadena de frío Carrier", cat: "Equipo médico", valor: 2200000, monto: 1760000, plazo: 36, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: "2026-03-15", viable: false }, contrato: null, exp: { docsOk: 5, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: false, perdida: "No calificó", motivoNoCalifico: "Buró de crédito", ai: { score: 0, rec: "Buró negativo. Reconsiderar en 12 meses si mejora el reporte." } },
  { id: "d17", empresa: "Acero Industrial Toluca", rs: "ACERO INDUSTRIAL TOLUCA SA DE CV", rfc: "AIT170604KK9", sector: "Manufactura", ubicacion: "Estado de México", web: "https://aceroit.mx", tipoPersona: "pm", canal: "interno", broker: null, ejecutivo: "Laura Soto", contacto: { nombre: "Mario Vega", puesto: "Director", tel: "+52 722 250 3030", email: "mvega@aceroit.mx" }, fechaAcercamiento: "2026-04-22", semaforo: "amarillo", etapa: "Prospección", activo: { tipo: "Línea de laminado en frío", cat: "Equipo de manufactura", valor: 8200000, monto: 6560000, plazo: 60, arr: "Arrendamiento Financiero", moneda: "USD", enganche: "20%" }, ekatena: { fecha: null, viable: null }, contrato: null, exp: { docsOk: 1, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: true, perdida: null, ai: { score: 55, rec: "Cliente nuevo en exploración. Programar visita técnica antes de cotizar." } },
  { id: "d18", empresa: "Constructora Vega Hermanos", rs: "CONSTRUCTORA VEGA HERMANOS SA DE CV", rfc: "CVH140228OO0", sector: "Construcción", ubicacion: "Jalisco", web: "https://vegah.com.mx", tipoPersona: "pfae", canal: "broker", broker: "Brokers Premier", ejecutivo: "Ana Ríos", contacto: { nombre: "Javier Vega", puesto: "Propietario", tel: "+52 33 3650 9911", email: "jvega@vegah.com.mx" }, fechaAcercamiento: "2026-04-05", semaforo: "verde", etapa: "Negociación", activo: { tipo: "Cargador frontal CAT 950 GC", cat: "Maquinaria pesada", valor: 1850000, monto: 1480000, plazo: 36, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: "2026-04-12", viable: true }, contrato: { tasa: "TIIE+5.0%", renta: 52000, residual: "10%", tir: "19.5%" }, exp: { docsOk: 13, docsTotal: 21, riesgos: null, autorizado: null, cierre: null }, verde: false, perdida: null, ai: { score: 71, rec: "PFAE con buen historial. Plazo razonable. Acelerar integración del expediente." } },
  { id: "d19", empresa: "Comercializadora Pérez", rs: "COMERCIALIZADORA PÉREZ SA DE CV", rfc: "CPE190615ZZ7", sector: "Comercio", ubicacion: "Nuevo León", web: "https://compperez.mx", tipoPersona: "pm", canal: "alianza", broker: "Alianza Banco Local", ejecutivo: "Carlos Mendoza", contacto: { nombre: "Patricia Pérez", puesto: "CEO", tel: "+52 81 8400 5566", email: "pperez@compperez.mx" }, fechaAcercamiento: "2026-04-25", semaforo: "amarillo", etapa: "Prospección", activo: { tipo: "Montacargas Toyota (6 unid.)", cat: "Equipo de manufactura", valor: 3100000, monto: 2480000, plazo: 36, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: null, viable: null }, contrato: null, exp: { docsOk: 0, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: false, perdida: null, ai: { score: 45, rec: "Lead recién generado. Confirmar interés real antes de invertir tiempo." } },
  { id: "d20", empresa: "Energía Verde Yucatán", rs: "ENERGÍA VERDE YUCATÁN SA DE CV", rfc: "EVY210812VV1", sector: "Energía", ubicacion: "Yucatán", web: "https://everdeyuc.mx", tipoPersona: "pm", canal: "alianza", broker: "Alianza Verde", ejecutivo: "Jorge Fuentes", contacto: { nombre: "Alejandro Ku", puesto: "Director", tel: "+52 999 320 4040", email: "aku@everdeyuc.mx" }, fechaAcercamiento: "2026-04-20", semaforo: "verde", etapa: "Propuesta", activo: { tipo: "Aerogenerador 2.5MW", cat: "Energía / Generación", valor: 9500000, monto: 7600000, plazo: 60, arr: "Arrendamiento Puro", moneda: "USD", enganche: "20%" }, ekatena: { fecha: "2026-04-22", viable: true }, contrato: { tasa: "TIIE+3.8%", renta: 175000, residual: "12%", tir: "16.4%" }, exp: { docsOk: 7, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: true, perdida: null, ai: { score: 76, rec: "Operación verde con incentivos disponibles. Coordinar con área de bonos verdes." } },
  { id: "d21", empresa: "Transportes Carga Pesada", rs: "TRANSPORTES CARGA PESADA SA DE CV", rfc: "TCP100517PP5", sector: "Transporte y logística", ubicacion: "Coahuila", web: "https://tcargapes.mx", tipoPersona: "pm", canal: "broker", broker: "Capital Brokers SA", ejecutivo: "Laura Soto", contacto: { nombre: "Ricardo Flores", puesto: "Operaciones", tel: "+52 844 412 7700", email: "rflores@tcargapes.mx" }, fechaAcercamiento: "2026-03-18", semaforo: "rojo", etapa: "Perdida", activo: { tipo: "Tractocamiones Freightliner (5 unid.)", cat: "Equipo de transporte", valor: 7500000, monto: 6000000, plazo: 48, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" }, ekatena: { fecha: "2026-03-25", viable: true }, contrato: null, exp: { docsOk: 8, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: false, perdida: "Sin decisión del cliente", ai: { score: 0, rec: "Cliente fríjo. Sin avance en 30 días. Cerrar y reactivar en Q3." } },
  { id: "d22", empresa: "Servicios IT Empresariales", rs: "SERVICIOS IT EMPRESARIALES SA DE CV", rfc: "SIE200402II9", sector: "Tecnología", ubicacion: "CDMX", web: "https://serviceit.com.mx", tipoPersona: "pm", canal: "interno", broker: null, ejecutivo: "Carlos Mendoza", contacto: { nombre: "Daniela Solís", puesto: "Directora Comercial", tel: "+52 55 5260 3322", email: "dsolis@serviceit.com.mx" }, fechaAcercamiento: "2026-04-28", semaforo: "amarillo", etapa: "Prospección", activo: { tipo: "Equipo de cómputo + UPS APC", cat: "Tecnología / IT", valor: 1850000, monto: 1665000, plazo: 24, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "10%" }, ekatena: { fecha: null, viable: null }, contrato: null, exp: { docsOk: 0, docsTotal: 26, riesgos: null, autorizado: null, cierre: null }, verde: false, perdida: null, ai: { score: 50, rec: "Lead temprano. Calendarizar primera reunión." } },
];

const CRM_ACTIVITIES_INIT = [
  { id: 1, dealId: "d01", fecha: "2026-04-30", ejecutivo: "Carlos Mendoza", tipo: "Reunión", resumen: "Presentación de propuesta. Cliente solicitó ajuste en plazo a 60 meses.", siguiente: "Enviar propuesta ajustada · 3 may" },
  { id: 2, dealId: "d02", fecha: "2026-04-29", ejecutivo: "Ana Ríos", tipo: "Llamada", resumen: "Confirmación de autorización por riesgos. Programación de firma.", siguiente: "Coordinar firma con notario · 8 may" },
  { id: 3, dealId: "d03", fecha: "2026-04-28", ejecutivo: "Jorge Fuentes", tipo: "Email", resumen: "Envío de propuesta formal con 3 escenarios financieros.", siguiente: "Esperar feedback · 5 may" },
  { id: 4, dealId: "d04", fecha: "2026-04-27", ejecutivo: "Laura Soto", tipo: "Visita", resumen: "Visita a instalaciones. Revisión de operación agrícola en campo.", siguiente: "Cotización formal · 1 may" },
  { id: 5, dealId: "d05", fecha: "2026-04-26", ejecutivo: "Carlos Mendoza", tipo: "Zoom", resumen: "Negociación de tasa con CFO. Aceptaron TIIE+4.2%.", siguiente: "Enviar contrato · 2 may" },
  { id: 6, dealId: "d07", fecha: "2026-04-25", ejecutivo: "Jorge Fuentes", tipo: "Reunión", resumen: "Revisión de proyecto solar con equipo técnico.", siguiente: "Confirmar incentivos verdes · 30 abr" },
  { id: 7, dealId: "d08", fecha: "2026-04-24", ejecutivo: "Laura Soto", tipo: "Llamada", resumen: "Cliente confirmó autorización. Solicitando solo acta certificada.", siguiente: "Recibir acta y cerrar · 5 may" },
  { id: 8, dealId: "d09", fecha: "2026-04-22", ejecutivo: "Carlos Mendoza", tipo: "Email", resumen: "Envío de propuesta para resonador magnético. Cliente comparando opciones.", siguiente: "Follow-up · 28 abr" },
  { id: 9, dealId: "d18", fecha: "2026-04-20", ejecutivo: "Ana Ríos", tipo: "Llamada", resumen: "PFAE solicita 36 meses con tasa fija. Ajustamos cotización.", siguiente: "Recibir documentos faltantes · 25 abr" },
  { id: 10, dealId: "d20", fecha: "2026-04-23", ejecutivo: "Jorge Fuentes", tipo: "Email", resumen: "Coordinación con área de bonos verdes para incentivos del aerogenerador.", siguiente: "Confirmar elegibilidad · 27 abr" },
  { id: 11, dealId: "d11", fecha: "2026-04-02", ejecutivo: "Jorge Fuentes", tipo: "Reunión", resumen: "Firma de contrato Sandvik. Operación cerrada exitosamente.", siguiente: "Iniciar entrega · 15 abr" },
  { id: 12, dealId: "d06", fecha: "2026-04-19", ejecutivo: "Ana Ríos", tipo: "Zoom", resumen: "Primera reunión de evaluación. Cliente requiere envío de información financiera.", siguiente: "Recibir EEFF · 26 abr" },
  { id: 13, dealId: "d10", fecha: "2026-04-21", ejecutivo: "Ana Ríos", tipo: "Llamada", resumen: "Exploración inicial. Cliente interesado pero sin decisión inmediata.", siguiente: "Agendar visita · 5 may" },
  { id: 14, dealId: "d15", fecha: "2026-03-22", ejecutivo: "Carlos Mendoza", tipo: "Email", resumen: "Cliente decidió por competidor por mejor tasa. Cerramos como pérdida.", siguiente: "—" },
  { id: 15, dealId: "d04", fecha: "2026-04-12", ejecutivo: "Laura Soto", tipo: "Email", resumen: "Envío inicial de propuesta. Esperando respuesta.", siguiente: "Follow-up · 18 abr" },
  { id: 16, dealId: "d17", fecha: "2026-04-26", ejecutivo: "Laura Soto", tipo: "Llamada", resumen: "Primer contacto. Cliente nuevo evaluando proveedores.", siguiente: "Visita técnica · 5 may" },
];

// ═══════════════════════════════════════════════
// CRM — HELPERS
// ═══════════════════════════════════════════════
const etapaConfig = (id) => CRM_ETAPAS.find(e => e.id === id) || CRM_ETAPAS[0];
const semaforoConfig = {
  rojo: { color: T.red, bg: T.redLight, label: "Sin interés" },
  amarillo: { color: T.amber, bg: T.amberLight, label: "En seguimiento" },
  verde: { color: T.green, bg: T.greenLight, label: "Listo / Activo" },
};
// ═══════════════════════════════════════════════
// CRM — PIPELINE
// ═══════════════════════════════════════════════
function CrmPipelineSection({ deals, activities, onAddDeal, onUpdateDeal, onAddActivity }) {
  const [view, setView] = useState("kanban"); // kanban | tabla
  const [search, setSearch] = useState("");
  const [filterEj, setFilterEj] = useState("todos");
  const [filterEtapa, setFilterEtapa] = useState("todas");
  const [selectedId, setSelectedId] = useState(null);
  const [showNewLead, setShowNewLead] = useState(false);
  const [sortCol, setSortCol] = useState(null);
  const [sortDir, setSortDir] = useState("asc"); // asc | desc

  const filtered = deals.filter(d => {
    if (search) {
      const q = search.toLowerCase();
      if (!d.empresa.toLowerCase().includes(q) && !d.rs.toLowerCase().includes(q) && !d.rfc.toLowerCase().includes(q) && !d.contacto.nombre.toLowerCase().includes(q)) return false;
    }
    if (filterEj !== "todos" && d.ejecutivo !== filterEj) return false;
    if (filterEtapa !== "todas" && d.etapa !== filterEtapa) return false;
    return true;
  });

  const sortAccessors = {
    empresa: d => d.empresa.toLowerCase(),
    etapa: d => CRM_ETAPAS.findIndex(s => s.id === d.etapa),
    activo: d => d.activo.cat.toLowerCase(),
    ejecutivo: d => d.ejecutivo.toLowerCase(),
    monto: d => d.activo.monto,
    renta: d => d.contrato ? d.contrato.renta : 0,
    score: d => d.ai.score,
  };
  const sortedTabla = sortCol ? [...filtered].sort((a, b) => {
    const va = sortAccessors[sortCol](a);
    const vb = sortAccessors[sortCol](b);
    if (va < vb) return sortDir === "asc" ? -1 : 1;
    if (va > vb) return sortDir === "asc" ? 1 : -1;
    return 0;
  }) : filtered;
  const handleSortTabla = (col) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir(["score", "monto", "renta"].includes(col) ? "desc" : "asc"); }
  };

  const activeStages = ["Prospección", "Propuesta", "Negociación", "Cierre"];
  const activos = filtered.filter(d => activeStages.includes(d.etapa));
  const pipelineMonto = activos.reduce((s, d) => s + d.activo.monto, 0);
  const ganadas = filtered.filter(d => d.etapa === "Ganada").length;
  const perdidas = filtered.filter(d => d.etapa === "Perdida" || d.etapa === "No calificó").length;
  const conversionPct = (ganadas + perdidas) > 0 ? (ganadas / (ganadas + perdidas)) * 100 : 0;
  const ticketProm = activos.length > 0 ? pipelineMonto / activos.length : 0;

  const selected = deals.find(d => d.id === selectedId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp .5s ease" }}>
      {showNewLead && <NewLeadModal onClose={() => setShowNewLead(false)} onSubmit={(deal) => { onAddDeal(deal); setShowNewLead(false); }} />}

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <OpKpi icon="hub" label="Pipeline activo" value={fmtShort(pipelineMonto)} sub={`${activos.length} operaciones`} accent={T.navy} />
        <OpKpi icon="check_circle" label="Ganadas" value={ganadas.toString()} accent="#4A6B5C" />
        <OpKpi icon="cancel" label="Perdidas" value={perdidas.toString()} accent="#7A4848" />
        <OpKpi icon="conversion_path" label="Conversión" value={`${conversionPct.toFixed(0)}%`} accent="#3D6792" sub={`${ganadas} de ${ganadas + perdidas}`} />
        <OpKpi icon="payments" label="Ticket promedio" value={fmtShort(ticketProm)} accent="#8B7355" />
      </div>

      {/* Filters + view toggle */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar empresa, RFC o contacto..."
          style={{ flex: "1 1 240px", padding: "10px 14px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
        <select value={filterEj} onChange={e => setFilterEj(e.target.value)} style={{ ...inp, width: 180 }}>
          <option value="todos">Todos los ejecutivos</option>
          {CRM_EJECUTIVOS.map(ej => <option key={ej} value={ej}>{ej}</option>)}
        </select>
        <select value={filterEtapa} onChange={e => setFilterEtapa(e.target.value)} style={{ ...inp, width: 160 }}>
          <option value="todas">Todas las etapas</option>
          {CRM_ETAPAS.map(e => <option key={e.id} value={e.id}>{e.id}</option>)}
        </select>
        <div style={{ display: "flex", gap: 4, background: T.surfaceAlt, borderRadius: T.radiusSm, padding: 4 }}>
          {[{ id: "kanban", icon: "view_kanban", label: "Kanban" }, { id: "tabla", icon: "table_rows", label: "Tabla" }].map(v => (
            <button key={v.id} onClick={() => setView(v.id)}
              style={{ padding: "7px 14px", border: "none", borderRadius: 5, background: view === v.id ? T.surface : "transparent", color: view === v.id ? T.navy : T.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: view === v.id ? T.shadow : "none", display: "flex", alignItems: "center", gap: 6 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{v.icon}</span>
              {v.label}
            </button>
          ))}
        </div>
        <button onClick={() => setShowNewLead(true)} style={{ padding: "10px 18px", background: T.navy, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span>
          Nuevo lead
        </button>
      </div>

      {/* Detail panel (when deal selected) */}
      {selected && <DealDetailPanel deal={selected} activities={activities} onUpdateDeal={onUpdateDeal} onAddActivity={onAddActivity} onClose={() => setSelectedId(null)} />}

      {/* Kanban view */}
      {view === "kanban" && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${CRM_ETAPAS.length}, minmax(220px, 1fr))`, gap: 12, overflowX: "auto", paddingBottom: 8 }}>
          {CRM_ETAPAS.map(stage => {
            const stageDeals = filtered.filter(d => d.etapa === stage.id);
            const stageMonto = stageDeals.reduce((s, d) => s + d.activo.monto, 0);
            return (
              <div key={stage.id} style={{ background: T.surfaceAlt, borderRadius: T.radius, padding: 10, minWidth: 0 }}>
                <div style={{ padding: "6px 8px 10px", borderBottom: `2px solid ${stage.color}30`, marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: stage.color, textTransform: "uppercase", letterSpacing: 0.6 }}>{stage.id}</span>
                    <span style={{ fontSize: 10, fontWeight: 800, padding: "2px 7px", borderRadius: 10, background: stage.bg, color: stage.color, fontFamily: "'JetBrains Mono', monospace" }}>{stageDeals.length}</span>
                  </div>
                  <div style={{ fontSize: 10, color: T.textTertiary, marginTop: 3, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(stageMonto)}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {stageDeals.map(d => (
                    <button key={d.id} onClick={() => setSelectedId(d.id === selectedId ? null : d.id)} className="hover-lift"
                      style={{ background: T.surface, border: `1px solid ${selectedId === d.id ? stage.color : T.border}`, borderLeft: `3px solid ${stage.color}`, borderRadius: T.radiusSm, padding: 10, textAlign: "left", cursor: "pointer", fontFamily: "inherit", minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: T.navy, lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.empresa}</div>
                      <div style={{ fontSize: 10, color: T.textTertiary, marginTop: 3 }}>{d.activo.cat}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(d.activo.monto)}</span>
                        <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 3, background: d.ai.score >= 80 ? T.greenLight : d.ai.score >= 60 ? T.amberLight : T.redLight, color: d.ai.score >= 80 ? T.green : d.ai.score >= 60 ? T.amber : T.red, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>IA {d.ai.score}</span>
                      </div>
                      <div style={{ fontSize: 9, color: T.textTertiary, marginTop: 6, display: "flex", alignItems: "center", gap: 4 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 11 }}>person</span>
                        {d.ejecutivo}
                      </div>
                    </button>
                  ))}
                  {stageDeals.length === 0 && <div style={{ padding: 14, textAlign: "center", fontSize: 11, color: T.textTertiary, fontStyle: "italic" }}>Sin operaciones</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tabla view */}
      {view === "tabla" && (
        <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radius, overflow: "hidden", boxShadow: T.shadow, overflowX: "auto" }}>
          {(() => {
            const cols = [
              { id: "empresa", label: "Empresa", width: "minmax(180px, 1.6fr)", align: "flex-start" },
              { id: "etapa", label: "Etapa", width: "130px", align: "flex-start" },
              { id: "activo", label: "Activo", width: "minmax(140px, 1fr)", align: "flex-start" },
              { id: "ejecutivo", label: "Ejecutivo", width: "130px", align: "flex-start" },
              { id: "monto", label: "Monto", width: "110px", align: "flex-end" },
              { id: "renta", label: "Renta", width: "110px", align: "flex-end" },
              { id: "score", label: "Score", width: "90px", align: "center" },
            ];
            const gridTemplate = cols.map(c => c.width).join(" ");
            const rows = sortedTabla.length === 0
              ? [<div key="empty" style={{ gridColumn: `1 / -1`, padding: 30, textAlign: "center", color: T.textTertiary, fontSize: 12 }}>Sin resultados</div>]
              : sortedTabla.flatMap((d, i) => {
                  const stage = etapaConfig(d.etapa);
                  const aiBg = d.ai.score >= 80 ? T.greenLight : d.ai.score >= 60 ? T.amberLight : T.redLight;
                  const aiCol = d.ai.score >= 80 ? T.green : d.ai.score >= 60 ? T.amber : T.red;
                  const isLast = i === sortedTabla.length - 1;
                  const onRowClick = () => setSelectedId(d.id === selectedId ? null : d.id);
                  const rowBg = selectedId === d.id ? T.blueLight : "transparent";
                  const cellStyle = (justify) => ({ display: "flex", alignItems: "center", justifyContent: justify, minWidth: 0, padding: "12px 0", borderBottom: isLast ? "none" : `1px solid ${T.borderLight}`, background: rowBg, cursor: "pointer" });
                  return [
                    <div key={`${d.id}-empresa`} onClick={onRowClick} style={{ ...cellStyle("flex-start"), flexDirection: "column", alignItems: "flex-start", paddingLeft: 18 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100%" }}>{d.empresa}</div>
                      <div style={{ fontSize: 10, color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>{d.rfc}</div>
                    </div>,
                    <div key={`${d.id}-etapa`} onClick={onRowClick} style={cellStyle("flex-start")}>
                      <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 12, background: stage.bg, color: T.text, fontWeight: 800 }}>{d.etapa}</span>
                    </div>,
                    <div key={`${d.id}-activo`} onClick={onRowClick} style={cellStyle("flex-start")}>
                      <span style={{ fontSize: 11, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.activo.cat}</span>
                    </div>,
                    <div key={`${d.id}-ejecutivo`} onClick={onRowClick} style={cellStyle("flex-start")}>
                      <span style={{ fontSize: 11, color: T.text }}>{d.ejecutivo}</span>
                    </div>,
                    <div key={`${d.id}-monto`} onClick={onRowClick} style={cellStyle("flex-end")}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(d.activo.monto)}</span>
                    </div>,
                    <div key={`${d.id}-renta`} onClick={onRowClick} style={cellStyle("flex-end")}>
                      <span style={{ fontSize: 11, color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>{d.contrato ? fmtShort(d.contrato.renta) : "—"}</span>
                    </div>,
                    <div key={`${d.id}-score`} onClick={onRowClick} style={{ ...cellStyle("center"), paddingRight: 18 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, padding: "4px 10px", borderRadius: 4, background: aiBg, color: T.text, fontFamily: "'JetBrains Mono', monospace" }}>{d.ai.score}</span>
                    </div>,
                  ];
                });
            return (
              <div style={{ minWidth: 1000, display: "grid", gridTemplateColumns: gridTemplate, columnGap: 8 }}>
                {cols.map((h, idx) => {
                  const active = sortCol === h.id;
                  const arrow = active ? (sortDir === "asc" ? "↑" : "↓") : "·";
                  return (
                    <button key={h.id} onClick={() => handleSortTabla(h.id)} style={{ background: T.surfaceAlt, border: "none", borderBottom: `1px solid ${T.border}`, padding: `11px ${idx === 0 ? 18 : 0}px 11px ${idx === 0 ? 18 : 0}px`, paddingRight: idx === cols.length - 1 ? 18 : 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: h.align, gap: 4, fontSize: 9, fontWeight: 800, color: active ? T.navy : T.textTertiary, textTransform: "uppercase", letterSpacing: 0.7, fontFamily: "inherit" }}>
                      {h.label}
                      <span style={{ fontSize: 10, color: active ? T.blue : "transparent", fontWeight: 800 }}>{arrow}</span>
                    </button>
                  );
                })}
                {rows}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// CRM — DEAL DETAIL PANEL
// ═══════════════════════════════════════════════
function DealDetailPanel({ deal: d, activities, onUpdateDeal, onAddActivity, onClose }) {
  const stage = etapaConfig(d.etapa);
  const sem = semaforoConfig[d.semaforo] || semaforoConfig.amarillo;
  const docPct = (d.exp.docsOk / d.exp.docsTotal) * 100;
  const dealActs = activities.filter(a => a.dealId === d.id).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  const aiBg = d.ai.score >= 80 ? T.greenLight : d.ai.score >= 60 ? T.amberLight : T.redLight;
  const aiCol = d.ai.score >= 80 ? T.green : d.ai.score >= 60 ? T.amber : T.red;
  const [showActForm, setShowActForm] = useState(false);
  const [actForm, setActForm] = useState({ fecha: new Date().toISOString().slice(0, 10), tipo: "Llamada", resumen: "", siguiente: "" });

  return (
    <div style={{ ...opCard, padding: 0, borderLeft: `4px solid ${stage.color}`, animation: "fadeUp .3s ease" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
        <div style={{ minWidth: 0, flex: "1 1 240px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 12, background: stage.bg, color: stage.color, fontWeight: 800 }}>{d.etapa}</span>
            <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 12, background: sem.bg, color: sem.color, fontWeight: 800 }}>● {sem.label}</span>
            {d.verde && <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 12, background: T.greenLight, color: T.green, fontWeight: 800 }}>🌿 Verde</span>}
            <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 12, background: T.surfaceAlt, color: T.textSecondary, fontWeight: 700 }}>{d.tipoPersona === "pm" ? "Persona Moral" : "PFAE"}</span>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: T.navy, margin: 0 }}>{d.empresa}</h2>
          <div style={{ fontSize: 11, color: T.textTertiary, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{d.rs} · {d.rfc}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 6, background: aiBg, color: aiCol, fontFamily: "'JetBrains Mono', monospace" }}>IA · {d.ai.score}</span>
          <button onClick={onClose} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, padding: "6px 10px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", color: T.textSecondary, display: "flex", alignItems: "center", gap: 4 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>close</span>
            Cerrar
          </button>
        </div>
      </div>

      {/* Stage mover */}
      <div style={{ padding: "12px 20px", borderBottom: `1px solid ${T.borderLight}`, background: T.surfaceAlt, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: T.textTertiary, letterSpacing: 1, textTransform: "uppercase", marginRight: 4 }}>Mover a:</span>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {CRM_ETAPAS.map(s => {
            const active = d.etapa === s.id;
            return (
              <button key={s.id} onClick={() => onUpdateDeal(d.id, { etapa: s.id })}
                style={{ padding: "5px 11px", borderRadius: 12, border: `1px solid ${active ? s.color : T.border}`, background: active ? s.bg : T.surface, color: active ? s.color : T.textSecondary, fontSize: 10, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", letterSpacing: 0.3 }}>
                {s.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI insight */}
      <div style={{ padding: "12px 20px", background: `linear-gradient(135deg, ${T.purple}08, ${T.blue}08)`, borderBottom: `1px solid ${T.borderLight}`, display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color: T.purple, flexShrink: 0, marginTop: 2 }}>psychology</span>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, color: T.purple, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 }}>Recomendación IA</div>
          <div style={{ fontSize: 12, color: T.text, lineHeight: 1.5 }}>{d.ai.rec}</div>
        </div>
      </div>

      {/* Body grid */}
      <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {/* Empresa */}
        <DealCard title="Datos de la empresa" icon="business">
          <DealRow label="Sector" value={d.sector} />
          <DealRow label="Ubicación" value={d.ubicacion} />
          <DealRow label="Web" value={<a href={d.web} target="_blank" rel="noreferrer" style={{ color: T.blue, textDecoration: "none", fontSize: 12 }}>{d.web.replace(/https?:\/\//, "")}</a>} />
          <DealRow label="Tipo de persona" value={d.tipoPersona === "pm" ? "Persona Moral" : "PFAE"} />
        </DealCard>
        {/* Contacto */}
        <DealCard title="Contacto principal" icon="contact_mail">
          <DealRow label="Nombre" value={d.contacto.nombre} accent />
          <DealRow label="Puesto" value={d.contacto.puesto} />
          <DealRow label="Teléfono" value={d.contacto.tel} mono />
          <DealRow label="Email" value={d.contacto.email} mono />
        </DealCard>
        {/* Origen */}
        <DealCard title="Origen y asignación" icon="route">
          <DealRow label="Canal" value={d.canal.charAt(0).toUpperCase() + d.canal.slice(1)} />
          {d.broker && <DealRow label="Broker / Alianza" value={d.broker} />}
          <DealRow label="Ejecutivo asignado" value={d.ejecutivo} accent />
          <DealRow label="Fecha acercamiento" value={d.fechaAcercamiento} mono />
        </DealCard>
        {/* Activo */}
        <DealCard title="Activo y propuesta" icon="precision_manufacturing">
          <DealRow label="Tipo" value={d.activo.tipo} accent />
          <DealRow label="Categoría" value={d.activo.cat} />
          <DealRow label="Valor del activo" value={`${fmt(d.activo.valor)} ${d.activo.moneda}`} mono />
          <DealRow label="Monto a financiar" value={`${fmt(d.activo.monto)} ${d.activo.moneda}`} accent mono />
          <DealRow label="Plazo / Tipo" value={`${d.activo.plazo} meses · ${d.activo.arr}`} />
          <DealRow label="Enganche" value={d.activo.enganche} />
        </DealCard>
        {/* Ekatena + Contrato */}
        <DealCard title="Ekatena y contratación" icon="verified">
          <DealRow label="Firma CIEC" value={d.ekatena.fecha || "—"} mono />
          <DealRow label="Buró viable" value={d.ekatena.viable === null ? "Pendiente" : d.ekatena.viable ? "✓ Sí" : "✗ No"} accent />
          {d.contrato && (
            <>
              <DealRow label="Tasa aplicada" value={d.contrato.tasa} />
              <DealRow label="Renta mensual" value={fmt(d.contrato.renta)} mono accent />
              <DealRow label="TIR" value={d.contrato.tir} />
              <DealRow label="Valor residual" value={d.contrato.residual} />
            </>
          )}
        </DealCard>
        {/* Expediente */}
        <DealCard title="Expediente y proceso" icon="folder_open">
          <div style={{ padding: "10px 16px", borderBottom: `1px solid ${T.borderLight}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11 }}>
              <span style={{ color: T.textTertiary }}>Documentos integrados</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: T.navy }}>{d.exp.docsOk}/{d.exp.docsTotal}</span>
            </div>
            <div style={{ height: 6, background: T.surfaceAlt, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${docPct}%`, background: docPct >= 90 ? T.green : docPct >= 50 ? T.amber : T.red, borderRadius: 3 }} />
            </div>
          </div>
          <DealRow label="Ingreso a riesgos" value={d.exp.riesgos || "Pendiente"} mono />
          <DealRow label="Autorizado" value={d.exp.autorizado || "Pendiente"} mono />
          <DealRow label="Cierre" value={d.exp.cierre || "Pendiente"} mono accent />
          {d.perdida && <DealRow label="Motivo de pérdida" value={d.perdida} />}
        </DealCard>
      </div>

      {/* Activities timeline + registro */}
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: T.textTertiary, letterSpacing: 1, textTransform: "uppercase" }}>Bitácora · {dealActs.length}</span>
          <button onClick={() => setShowActForm(!showActForm)}
            style={{ padding: "6px 12px", background: showActForm ? T.surfaceAlt : T.navy, color: showActForm ? T.text : "#fff", border: `1px solid ${showActForm ? T.border : T.navy}`, borderRadius: T.radiusSm, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{showActForm ? "close" : "add"}</span>
            {showActForm ? "Cancelar" : "Registrar actividad"}
          </button>
        </div>

        {showActForm && (
          <div style={{ background: T.blueLight, border: `1px solid ${T.blue}30`, borderRadius: T.radiusSm, padding: 14, marginBottom: 10 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 10 }}>
              <div>
                <label style={lbl}>Fecha</label>
                <input type="date" value={actForm.fecha} onChange={e => setActForm({ ...actForm, fecha: e.target.value })} style={inp} />
              </div>
              <div>
                <label style={lbl}>Tipo</label>
                <select value={actForm.tipo} onChange={e => setActForm({ ...actForm, tipo: e.target.value })} style={inp}>
                  {["Llamada", "Reunión", "Zoom", "Email", "Visita", "WhatsApp"].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={lbl}>Resumen</label>
              <textarea rows={2} value={actForm.resumen} onChange={e => setActForm({ ...actForm, resumen: e.target.value })} placeholder="Resultado de la actividad..." style={{ ...inp, resize: "vertical", minHeight: 60 }} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={lbl}>Siguiente paso</label>
              <input value={actForm.siguiente} onChange={e => setActForm({ ...actForm, siguiente: e.target.value })} placeholder="Ej. Follow-up el viernes" style={inp} />
            </div>
            <button onClick={() => {
              if (!actForm.resumen.trim()) return;
              onAddActivity({ dealId: d.id, fecha: actForm.fecha, ejecutivo: d.ejecutivo, tipo: actForm.tipo, resumen: actForm.resumen.trim(), siguiente: actForm.siguiente.trim() || "—" });
              setActForm({ fecha: new Date().toISOString().slice(0, 10), tipo: "Llamada", resumen: "", siguiente: "" });
              setShowActForm(false);
            }} disabled={!actForm.resumen.trim()}
              style={{ padding: "9px 16px", background: actForm.resumen.trim() ? T.blue : T.border, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 12, fontWeight: 700, cursor: actForm.resumen.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
              Guardar actividad
            </button>
          </div>
        )}

        {dealActs.length === 0 && !showActForm && (
          <div style={{ padding: 18, textAlign: "center", color: T.textTertiary, fontSize: 12, fontStyle: "italic", background: T.surfaceAlt, borderRadius: T.radiusSm }}>Sin actividades registradas para este lead</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {dealActs.map(a => (
            <div key={a.id} style={{ display: "grid", gridTemplateColumns: "90px 100px 1fr", gap: 12, padding: 11, background: T.surfaceAlt, borderRadius: T.radiusSm, borderLeft: `3px solid ${T.blue}` }}>
              <span style={{ fontSize: 10, color: T.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}>{a.fecha}</span>
              <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 3, background: T.blueLight, color: T.blue, fontWeight: 800, justifySelf: "start", height: "fit-content" }}>{a.tipo}</span>
              <div>
                <div style={{ fontSize: 12, color: T.text }}>{a.resumen}</div>
                {a.siguiente && a.siguiente !== "—" && <div style={{ fontSize: 10, color: T.green, marginTop: 4, fontWeight: 600 }}>→ {a.siguiente}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// CRM — NEW LEAD MODAL
// ═══════════════════════════════════════════════
function NewLeadModal({ onClose, onSubmit }) {
  const [f, setF] = useState({
    empresa: "", rs: "", rfc: "", sector: "Manufactura", ubicacion: "", web: "",
    tipoPersona: "pm", canal: "interno", broker: "", ejecutivo: CRM_EJECUTIVOS[0],
    semaforo: "amarillo", etapa: "Prospección",
    contacto: { nombre: "", puesto: "", tel: "", email: "" },
    activo: { tipo: "", cat: "Equipo de transporte", valor: "", monto: "", plazo: 36, arr: "Arrendamiento Puro", moneda: "MXN", enganche: "20%" },
    fechaAcercamiento: new Date().toISOString().slice(0, 10),
  });

  const setField = (k, v) => setF(p => ({ ...p, [k]: v }));
  const setContacto = (k, v) => setF(p => ({ ...p, contacto: { ...p.contacto, [k]: v } }));
  const setActivo = (k, v) => setF(p => ({ ...p, activo: { ...p.activo, [k]: v } }));

  const valid = f.empresa.trim() && f.rfc.trim() && f.contacto.nombre.trim() && f.contacto.email.trim() && f.activo.tipo.trim() && +f.activo.valor > 0;

  const submit = () => {
    if (!valid) return;
    const valor = +f.activo.valor;
    const monto = +f.activo.monto || valor * 0.8;
    onSubmit({
      empresa: f.empresa.trim(), rs: (f.rs.trim() || f.empresa.toUpperCase()), rfc: f.rfc.trim().toUpperCase(),
      sector: f.sector, ubicacion: f.ubicacion.trim(), web: f.web.trim() || "",
      tipoPersona: f.tipoPersona, canal: f.canal, broker: f.broker.trim() || null, ejecutivo: f.ejecutivo,
      contacto: { ...f.contacto },
      fechaAcercamiento: f.fechaAcercamiento, semaforo: f.semaforo, etapa: f.etapa,
      activo: { tipo: f.activo.tipo.trim(), cat: f.activo.cat, valor, monto, plazo: +f.activo.plazo, arr: f.activo.arr, moneda: f.activo.moneda, enganche: f.activo.enganche },
      ekatena: { fecha: null, viable: null }, contrato: null,
      exp: { docsOk: 0, docsTotal: f.tipoPersona === "pfae" ? 21 : 26, riesgos: null, autorizado: null, cierre: null },
      verde: false, perdida: null,
      ai: { score: 50, rec: "Lead recién registrado. Confirmar interés y agendar primera reunión para calificar." },
    });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13, 15, 18, 0.55)", zIndex: 1000, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 20px", overflowY: "auto", animation: "fadeIn .2s ease" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.surface, borderRadius: T.radius, maxWidth: 760, width: "100%", boxShadow: T.shadowLg, animation: "fadeUp .25s ease" }}>
        <div style={{ padding: "16px 22px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.blue, letterSpacing: 1, textTransform: "uppercase" }}>Fase 1 · Prospección</div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: T.navy, margin: "2px 0 0" }}>Registrar nuevo lead</h2>
          </div>
          <button onClick={onClose} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, padding: "6px 10px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", color: T.textSecondary }}>✕</button>
        </div>

        <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 18 }}>
          <FormSection title="Datos de la empresa">
            <FormGrid cols={2}>
              <Field label="Nombre comercial" req value={f.empresa} onChange={v => setField("empresa", v)} placeholder="Ej. Transportes del Norte" />
              <Field label="Razón social" value={f.rs} onChange={v => setField("rs", v)} placeholder="Como aparece en acta constitutiva" />
              <Field label="RFC" req value={f.rfc} onChange={v => setField("rfc", v.toUpperCase())} placeholder="XAXX010101000" />
              <Field label="Tipo de persona" type="select" value={f.tipoPersona} onChange={v => setField("tipoPersona", v)} options={[{ v: "pm", l: "Persona Moral" }, { v: "pfae", l: "PFAE" }]} />
              <Field label="Sector / Industria" type="select" value={f.sector} onChange={v => setField("sector", v)} options={["Manufactura", "Transporte y logística", "Construcción", "Comercio", "Agropecuario", "Servicios", "Tecnología", "Salud", "Energía"].map(s => ({ v: s, l: s }))} />
              <Field label="Ubicación" value={f.ubicacion} onChange={v => setField("ubicacion", v)} placeholder="Estado / Ciudad" />
              <Field label="Página web" value={f.web} onChange={v => setField("web", v)} placeholder="https://..." />
            </FormGrid>
          </FormSection>

          <FormSection title="Contacto principal">
            <FormGrid cols={2}>
              <Field label="Nombre" req value={f.contacto.nombre} onChange={v => setContacto("nombre", v)} placeholder="Nombre completo" />
              <Field label="Puesto" value={f.contacto.puesto} onChange={v => setContacto("puesto", v)} placeholder="Director, Gerente..." />
              <Field label="Teléfono" value={f.contacto.tel} onChange={v => setContacto("tel", v)} placeholder="+52 ..." />
              <Field label="Email" req value={f.contacto.email} onChange={v => setContacto("email", v)} placeholder="contacto@empresa.com" />
            </FormGrid>
          </FormSection>

          <FormSection title="Origen y asignación">
            <FormGrid cols={3}>
              <Field label="Canal" type="select" value={f.canal} onChange={v => setField("canal", v)} options={[{ v: "interno", l: "Interno" }, { v: "referido", l: "Referido" }, { v: "broker", l: "Broker" }, { v: "alianza", l: "Alianza" }]} />
              {(f.canal === "broker" || f.canal === "alianza") && <Field label="Nombre broker / alianza" value={f.broker} onChange={v => setField("broker", v)} placeholder="Razón social" />}
              <Field label="Ejecutivo" type="select" value={f.ejecutivo} onChange={v => setField("ejecutivo", v)} options={CRM_EJECUTIVOS.map(e => ({ v: e, l: e }))} />
              <Field label="Fecha acercamiento" type="date" value={f.fechaAcercamiento} onChange={v => setField("fechaAcercamiento", v)} />
              <Field label="Semáforo" type="select" value={f.semaforo} onChange={v => setField("semaforo", v)} options={[{ v: "rojo", l: "Sin interés" }, { v: "amarillo", l: "En seguimiento" }, { v: "verde", l: "Listo / Activo" }]} />
              <Field label="Etapa inicial" type="select" value={f.etapa} onChange={v => setField("etapa", v)} options={CRM_ETAPAS.map(e => ({ v: e.id, l: e.id }))} />
            </FormGrid>
          </FormSection>

          <FormSection title="Activo y propuesta inicial">
            <FormGrid cols={2}>
              <Field label="Tipo de activo" req value={f.activo.tipo} onChange={v => setActivo("tipo", v)} placeholder="Ej. Volvo FH 540 (5 unid.)" />
              <Field label="Categoría" type="select" value={f.activo.cat} onChange={v => setActivo("cat", v)} options={["Equipo de transporte", "Maquinaria pesada", "Equipo de manufactura", "Tecnología / IT", "Equipo médico", "Inmueble productivo", "Equipo de construcción", "Energía / Generación", "Otro"].map(c => ({ v: c, l: c }))} />
              <Field label="Valor del activo (MXN)" req type="number" value={f.activo.valor} onChange={v => setActivo("valor", v)} placeholder="0" />
              <Field label="Monto a financiar" type="number" value={f.activo.monto} onChange={v => setActivo("monto", v)} placeholder="(80% del valor si vacío)" />
              <Field label="Plazo (meses)" type="select" value={f.activo.plazo} onChange={v => setActivo("plazo", v)} options={[12, 24, 36, 48, 60].map(p => ({ v: p, l: `${p} meses` }))} />
              <Field label="Tipo arrendamiento" type="select" value={f.activo.arr} onChange={v => setActivo("arr", v)} options={[{ v: "Arrendamiento Puro", l: "Arrendamiento Puro" }, { v: "Arrendamiento Financiero", l: "Arrendamiento Financiero" }, { v: "Sale & Lease Back", l: "Sale & Lease Back" }]} />
              <Field label="Moneda" type="select" value={f.activo.moneda} onChange={v => setActivo("moneda", v)} options={[{ v: "MXN", l: "MXN" }, { v: "USD", l: "USD" }]} />
              <Field label="Enganche" value={f.activo.enganche} onChange={v => setActivo("enganche", v)} placeholder="20% o monto" />
            </FormGrid>
          </FormSection>
        </div>

        <div style={{ padding: "14px 22px", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: T.surfaceAlt }}>
          <span style={{ fontSize: 11, color: T.textTertiary }}>Campos con <span style={{ color: T.red }}>*</span> son requeridos</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={{ padding: "9px 16px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: 12, fontWeight: 600, color: T.textSecondary, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
            <button onClick={submit} disabled={!valid}
              style={{ padding: "9px 18px", background: valid ? T.navy : T.border, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 12, fontWeight: 700, cursor: valid ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
              Crear lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 800, color: T.navy, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, paddingBottom: 6, borderBottom: `1px solid ${T.borderLight}` }}>{title}</div>
      {children}
    </div>
  );
}

function FormGrid({ cols = 2, children }) {
  return <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap: 10 }}>{children}</div>;
}

function Field({ label, req, type = "text", value, onChange, placeholder, options }) {
  return (
    <div style={{ minWidth: 0 }}>
      <label style={{ ...lbl, display: "flex", alignItems: "center", gap: 4 }}>
        {label}{req && <span style={{ color: T.red }}>*</span>}
      </label>
      {type === "select" ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={inp}>
          {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
        </select>
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inp} />
      )}
    </div>
  );
}

function DealCard({ title, icon, children }) {
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, overflow: "hidden", minWidth: 0 }}>
      <div style={{ padding: "10px 16px", borderBottom: `1px solid ${T.borderLight}`, background: T.surfaceAlt, display: "flex", alignItems: "center", gap: 8 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 14, color: T.navy }}>{icon}</span>
        <span style={{ fontSize: 11, fontWeight: 800, color: T.navy, letterSpacing: 0.5, textTransform: "uppercase" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function DealRow({ label, value, accent, mono }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 16px", borderBottom: `1px solid ${T.borderLight}`, gap: 10, alignItems: "flex-start" }}>
      <span style={{ fontSize: 11, color: T.textTertiary, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: accent ? 700 : 500, color: accent ? T.navy : T.text, fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit", textAlign: "right", wordBreak: "break-word", minWidth: 0 }}>{value}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════
// CRM — REPORTES
// ═══════════════════════════════════════════════
function CrmReportesSection({ deals, activities }) {
  const [tab, setTab] = useState("pipeline");
  const tabs = [
    { id: "pipeline", label: "Pipeline" },
    { id: "actividad", label: "Actividad Comercial" },
    { id: "regional", label: "Regional" },
    { id: "trimestre", label: "Trimestre Anterior" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${T.border}` }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: "10px 18px", border: "none", borderBottom: tab === t.id ? `2px solid ${T.navy}` : "2px solid transparent", marginBottom: -2, background: "transparent", color: tab === t.id ? T.navy : T.textSecondary, fontSize: 13, fontWeight: tab === t.id ? 700 : 500, cursor: "pointer", fontFamily: "inherit" }}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "pipeline" && <ReportePipeline deals={deals} />}
      {tab === "actividad" && <ReporteActividad deals={deals} activities={activities} />}
      {tab === "regional" && <ReporteRegional deals={deals} />}
      {tab === "trimestre" && <ReporteTrimestre deals={deals} />}
    </div>
  );
}

function ReportePipeline({ deals }) {
  const activos = deals.filter(d => ["Prospección", "Propuesta", "Negociación", "Cierre"].includes(d.etapa));
  const pipelineMonto = activos.reduce((s, d) => s + d.activo.monto, 0);
  const ganadas = deals.filter(d => d.etapa === "Ganada").length;
  const perdidas = deals.filter(d => d.etapa === "Perdida" || d.etapa === "No calificó").length;
  const conversion = (ganadas + perdidas) > 0 ? (ganadas / (ganadas + perdidas)) * 100 : 0;
  const ticket = activos.length > 0 ? pipelineMonto / activos.length : 0;
  const expRiesgos = deals.filter(d => d.exp.riesgos && !d.exp.cierre).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <OpKpi icon="hub" label="Pipeline total" value={fmtShort(pipelineMonto)} accent={T.navy} sub="Monto ponderado activo" />
        <OpKpi icon="pending_actions" label="Operaciones activas" value={activos.length.toString()} accent={T.blue} />
        <OpKpi icon="conversion_path" label="Tasa conversión" value={`${conversion.toFixed(0)}%`} accent={T.purple} />
        <OpKpi icon="payments" label="Ticket promedio" value={fmtShort(ticket)} accent={T.amber} />
        <OpKpi icon="folder_open" label="Expedientes en riesgos" value={expRiesgos.toString()} accent={T.green} />
      </div>

      <div style={opCard}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Distribución por etapa</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CRM_ETAPAS.map(stage => {
            const ds = deals.filter(d => d.etapa === stage.id);
            const monto = ds.reduce((s, d) => s + d.activo.monto, 0);
            const pct = (ds.length / (deals.length || 1)) * 100;
            return (
              <div key={stage.id} style={{ display: "grid", gridTemplateColumns: "150px 60px minmax(0, 1fr) 100px", gap: 12, alignItems: "center" }}>
                <span style={{ fontSize: 11, padding: "3px 9px", borderRadius: 12, background: stage.bg, color: stage.color, fontWeight: 800, justifySelf: "start" }}>{stage.id}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{ds.length}</span>
                <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: stage.color, borderRadius: 4 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.text, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{fmtShort(monto)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReporteActividad({ deals, activities }) {
  const ejecutivosStats = CRM_EJECUTIVOS.map(ej => {
    const dealsEj = deals.filter(d => d.ejecutivo === ej);
    const acts = activities.filter(a => a.ejecutivo === ej).length;
    const ganadas = dealsEj.filter(d => d.etapa === "Ganada");
    const expedientes = dealsEj.filter(d => d.exp.riesgos).length;
    const cotizaciones = dealsEj.filter(d => d.contrato).length;
    const cerrado = ganadas.reduce((s, d) => s + d.activo.monto, 0);
    return { ej, citas: acts, cotizaciones, expedientes, cierres: ganadas.length, cerrado };
  });

  const motivosCount = {};
  deals.forEach(d => { if (d.perdida) motivosCount[d.perdida] = (motivosCount[d.perdida] || 0) + 1; });
  const totalPerdidas = Object.values(motivosCount).reduce((s, n) => s + n, 0) || 1;
  const motivosArr = Object.entries(motivosCount).sort((a, b) => b[1] - a[1]);

  const totalCitas = activities.length;
  const totalCotiz = deals.filter(d => d.contrato).length;
  const totalExp = deals.filter(d => d.exp.riesgos).length;
  const totalAuto = deals.filter(d => d.exp.autorizado).length;
  const brokersAct = new Set(deals.filter(d => d.canal === "broker" && d.broker && ["Prospección","Propuesta","Negociación","Cierre"].includes(d.etapa)).map(d => d.broker)).size;
  const alianzasAct = new Set(deals.filter(d => d.canal === "alianza" && d.broker && ["Prospección","Propuesta","Negociación","Cierre"].includes(d.etapa)).map(d => d.broker)).size;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <OpKpi icon="event" label="Actividades registradas" value={totalCitas.toString()} accent={T.blue} />
        <OpKpi icon="description" label="Cotizaciones" value={totalCotiz.toString()} accent={T.purple} />
        <OpKpi icon="folder_managed" label="Expedientes" value={totalExp.toString()} accent={T.amber} />
        <OpKpi icon="check_circle" label="Autorizaciones" value={totalAuto.toString()} accent={T.green} />
        <OpKpi icon="hub" label="Brokers activos" value={brokersAct.toString()} accent={T.navy} />
        <OpKpi icon="handshake" label="Alianzas activas" value={alianzasAct.toString()} accent="#3D6792" />
      </div>

      <div style={opCard}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Actividad por ejecutivo</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr repeat(5, 1fr)", gap: 8, fontSize: 11 }}>
          {["Ejecutivo", "Citas", "Cotizaciones", "Expedientes", "Cierres", "Monto cerrado"].map(h => (
            <span key={h} style={{ fontSize: 9, fontWeight: 800, color: T.textTertiary, textTransform: "uppercase", letterSpacing: 0.7, padding: "0 0 8px", borderBottom: `1px solid ${T.border}` }}>{h}</span>
          ))}
          {ejecutivosStats.map(e => (
            <React.Fragment key={e.ej}>
              <span style={{ fontWeight: 700, color: T.navy, padding: "10px 0", borderBottom: `1px solid ${T.borderLight}` }}>{e.ej}</span>
              <span style={{ padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace" }}>{e.citas}</span>
              <span style={{ padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace" }}>{e.cotizaciones}</span>
              <span style={{ padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace" }}>{e.expedientes}</span>
              <span style={{ padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace", color: T.green, fontWeight: 700 }}>{e.cierres}</span>
              <span style={{ padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: T.navy }}>{fmtShort(e.cerrado)}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={opCard}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Principales motivos de pérdida</h3>
        {motivosArr.length === 0 && <div style={{ padding: 14, textAlign: "center", color: T.textTertiary, fontSize: 12 }}>Sin pérdidas registradas</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {motivosArr.map(([motivo, count]) => {
            const pct = (count / totalPerdidas) * 100;
            return (
              <div key={motivo} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) 50px minmax(0, 1fr) 60px", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: T.text }}>{motivo}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{count}</span>
                <div style={{ height: 6, borderRadius: 3, background: T.surfaceAlt, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: T.red, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.red, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{pct.toFixed(0)}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ReporteRegional({ deals }) {
  const porUbicacion = {};
  deals.forEach(d => {
    porUbicacion[d.ubicacion] = (porUbicacion[d.ubicacion] || 0) + d.activo.monto;
  });
  const ubicEntries = Object.entries(porUbicacion).sort((a, b) => b[1] - a[1]);
  const maxUbic = ubicEntries[0]?.[1] || 1;

  const porCategoria = {};
  deals.forEach(d => {
    if (!porCategoria[d.activo.cat]) porCategoria[d.activo.cat] = { count: 0, monto: 0 };
    porCategoria[d.activo.cat].count += 1;
    porCategoria[d.activo.cat].monto += d.activo.monto;
  });
  const totalMonto = Object.values(porCategoria).reduce((s, c) => s + c.monto, 0) || 1;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={opCard}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Cartera por ubicación geográfica</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {ubicEntries.map(([ubic, monto], i) => (
            <div key={ubic} style={{ display: "grid", gridTemplateColumns: "30px minmax(0, 1.2fr) minmax(0, 1.5fr) 100px", gap: 12, alignItems: "center" }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", background: T.surfaceAlt, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", color: T.textSecondary }}>{i + 1}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{ubic}</span>
              <div style={{ height: 6, borderRadius: 3, background: T.surfaceAlt, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${(monto / maxUbic) * 100}%`, background: T.navy, borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 11, color: T.text, fontFamily: "'JetBrains Mono', monospace", textAlign: "right", fontWeight: 700 }}>{fmtShort(monto)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={opCard}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Mix por tipo de activo</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 60px 110px 60px", gap: 8, fontSize: 11 }}>
          {["Categoría", "Operaciones", "Monto", "%"].map(h => (
            <span key={h} style={{ fontSize: 9, fontWeight: 800, color: T.textTertiary, textTransform: "uppercase", letterSpacing: 0.7, padding: "0 0 8px", borderBottom: `1px solid ${T.border}` }}>{h}</span>
          ))}
          {Object.entries(porCategoria).sort((a, b) => b[1].monto - a[1].monto).map(([cat, v]) => (
            <React.Fragment key={cat}>
              <span style={{ fontWeight: 600, color: T.text, padding: "9px 0", borderBottom: `1px solid ${T.borderLight}` }}>{cat}</span>
              <span style={{ padding: "9px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace" }}>{v.count}</span>
              <span style={{ padding: "9px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: T.navy }}>{fmtShort(v.monto)}</span>
              <span style={{ padding: "9px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace", color: T.blue, fontWeight: 700 }}>{((v.monto / totalMonto) * 100).toFixed(0)}%</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReporteTrimestre({ deals }) {
  const ganadas = deals.filter(d => d.etapa === "Ganada");
  const totalContratos = ganadas.length;
  const totalMonto = ganadas.reduce((s, d) => s + d.activo.monto, 0);
  const ticketProm = totalContratos > 0 ? totalMonto / totalContratos : 0;

  const meses = [
    { label: "Enero 2026", m: 0 },
    { label: "Febrero 2026", m: 1 },
    { label: "Marzo 2026", m: 2 },
    { label: "Abril 2026", m: 3 },
  ];
  const detalle = meses.map(({ label, m }) => {
    const ds = ganadas.filter(d => d.exp.cierre && new Date(d.exp.cierre).getMonth() === m && new Date(d.exp.cierre).getFullYear() === 2026);
    const monto = ds.reduce((s, d) => s + d.activo.monto, 0);
    return { label, count: ds.length, monto, ticket: ds.length > 0 ? monto / ds.length : 0 };
  });

  const META_ANUAL_MONTO = 130000000;
  const META_ANUAL_CONTRATOS = 88;
  const META_NUEVOS_CLIENTES = 60;
  const nuevosClientes = new Set(deals.map(d => d.empresa)).size;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        <OpKpi icon="check_circle" label="Contratos firmados" value={totalContratos.toString()} sub="Ciclo actual" accent={T.green} />
        <OpKpi icon="paid" label="Monto cerrado" value={fmtShort(totalMonto)} sub="MXN equivalente" accent={T.navy} />
        <OpKpi icon="payments" label="Ticket promedio" value={fmtShort(ticketProm)} accent={T.blue} />
      </div>

      <div style={opCard}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Detalle por mes de cierre</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 80px 140px 120px", gap: 8, fontSize: 11 }}>
          {["Mes", "Contratos", "Monto", "Ticket prom."].map(h => (
            <span key={h} style={{ fontSize: 9, fontWeight: 800, color: T.textTertiary, textTransform: "uppercase", letterSpacing: 0.7, padding: "0 0 8px", borderBottom: `1px solid ${T.border}` }}>{h}</span>
          ))}
          {detalle.map(m => (
            <React.Fragment key={m.label}>
              <span style={{ padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, color: T.text, fontWeight: 600 }}>{m.label}</span>
              <span style={{ padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace" }}>{m.count}</span>
              <span style={{ padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: T.navy }}>{fmtShort(m.monto)}</span>
              <span style={{ padding: "10px 0", borderBottom: `1px solid ${T.borderLight}`, fontFamily: "'JetBrains Mono', monospace", color: T.textSecondary }}>{m.count > 0 ? fmtShort(m.ticket) : "—"}</span>
            </React.Fragment>
          ))}
          <span style={{ padding: "12px 0", color: T.green, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5, fontSize: 11 }}>Total acumulado</span>
          <span style={{ padding: "12px 0", fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: T.green }}>{totalContratos}</span>
          <span style={{ padding: "12px 0", fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: T.green }}>{fmtShort(totalMonto)}</span>
          <span style={{ padding: "12px 0", fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: T.green }}>{fmtShort(ticketProm)}</span>
        </div>
      </div>

      <div style={opCard}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Comparativo vs meta anual</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Monto colocado", actual: totalMonto, meta: META_ANUAL_MONTO, fmt: fmtShort },
            { label: "Contratos firmados", actual: totalContratos, meta: META_ANUAL_CONTRATOS, fmt: n => n },
            { label: "Clientes únicos", actual: nuevosClientes, meta: META_NUEVOS_CLIENTES, fmt: n => n },
          ].map(row => {
            const pct = (row.actual / row.meta) * 100;
            return (
              <div key={row.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: T.textSecondary, fontWeight: 600 }}>{row.label}</span>
                  <span style={{ color: T.navy, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{row.fmt(row.actual)} / {row.fmt(row.meta)} <span style={{ color: pct >= 25 ? T.green : T.amber, marginLeft: 8 }}>{pct.toFixed(0)}%</span></span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: pct >= 25 ? T.green : pct >= 15 ? T.amber : T.red, borderRadius: 4 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// CRM — BITÁCORA GLOBAL
// ═══════════════════════════════════════════════
function CrmBitacoraSection({ deals, activities, onAddActivity }) {
  const [filterEj, setFilterEj] = useState("todos");
  const [filterTipo, setFilterTipo] = useState("todos");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [actForm, setActForm] = useState({ dealId: deals[0]?.id || "", fecha: new Date().toISOString().slice(0, 10), tipo: "Llamada", resumen: "", siguiente: "" });

  const tipos = [...new Set([...activities.map(a => a.tipo), "Llamada", "Reunión", "Zoom", "Email", "Visita", "WhatsApp"])];
  const filtered = activities.filter(a => {
    if (filterEj !== "todos" && a.ejecutivo !== filterEj) return false;
    if (filterTipo !== "todos" && a.tipo !== filterTipo) return false;
    if (search) {
      const q = search.toLowerCase();
      const deal = deals.find(d => d.id === a.dealId);
      const empresa = deal?.empresa.toLowerCase() || "";
      if (!a.resumen.toLowerCase().includes(q) && !empresa.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const submitForm = () => {
    if (!actForm.resumen.trim() || !actForm.dealId) return;
    const deal = deals.find(d => d.id === actForm.dealId);
    onAddActivity({ dealId: actForm.dealId, fecha: actForm.fecha, ejecutivo: deal?.ejecutivo || CRM_EJECUTIVOS[0], tipo: actForm.tipo, resumen: actForm.resumen.trim(), siguiente: actForm.siguiente.trim() || "—" });
    setActForm({ dealId: deals[0]?.id || "", fecha: new Date().toISOString().slice(0, 10), tipo: "Llamada", resumen: "", siguiente: "" });
    setShowForm(false);
  };

  const tipoColors = {
    "Llamada": { bg: T.blueLight, color: T.blue },
    "Reunión": { bg: T.greenLight, color: T.green },
    "Zoom": { bg: T.purpleLight, color: T.purple },
    "Email": { bg: T.amberLight, color: T.amber },
    "Visita": { bg: T.redLight, color: T.red },
    "WhatsApp": { bg: T.greenLight, color: T.green },
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp .5s ease" }}>
      <div style={{ ...opCard, padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: T.textTertiary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>Filtros</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          <div>
            <label style={lbl}>Buscar</label>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Empresa o resumen..." style={inp} />
          </div>
          <div>
            <label style={lbl}>Ejecutivo</label>
            <select value={filterEj} onChange={e => setFilterEj(e.target.value)} style={inp}>
              <option value="todos">Todos</option>
              {CRM_EJECUTIVOS.map(ej => <option key={ej} value={ej}>{ej}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Tipo de actividad</label>
            <select value={filterTipo} onChange={e => setFilterTipo(e.target.value)} style={inp}>
              <option value="todos">Todos</option>
              {tipos.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 11, color: T.textTertiary, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>{filtered.length} actividades</span>
        <button onClick={() => setShowForm(!showForm)}
          style={{ padding: "9px 16px", background: showForm ? T.surfaceAlt : T.navy, color: showForm ? T.text : "#fff", border: `1px solid ${showForm ? T.border : T.navy}`, borderRadius: T.radiusSm, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{showForm ? "close" : "add"}</span>
          {showForm ? "Cancelar" : "Registrar actividad"}
        </button>
      </div>

      {showForm && (
        <div style={{ ...opCard, padding: 16, background: T.blueLight, border: `1px solid ${T.blue}30` }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10, marginBottom: 10 }}>
            <div>
              <label style={lbl}>Lead</label>
              <select value={actForm.dealId} onChange={e => setActForm({ ...actForm, dealId: e.target.value })} style={inp}>
                {deals.map(d => <option key={d.id} value={d.id}>{d.empresa}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Fecha</label>
              <input type="date" value={actForm.fecha} onChange={e => setActForm({ ...actForm, fecha: e.target.value })} style={inp} />
            </div>
            <div>
              <label style={lbl}>Tipo</label>
              <select value={actForm.tipo} onChange={e => setActForm({ ...actForm, tipo: e.target.value })} style={inp}>
                {["Llamada", "Reunión", "Zoom", "Email", "Visita", "WhatsApp"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={lbl}>Resumen</label>
            <textarea rows={2} value={actForm.resumen} onChange={e => setActForm({ ...actForm, resumen: e.target.value })} placeholder="Resultado de la actividad..." style={{ ...inp, resize: "vertical", minHeight: 60 }} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={lbl}>Siguiente paso</label>
            <input value={actForm.siguiente} onChange={e => setActForm({ ...actForm, siguiente: e.target.value })} placeholder="Ej. Follow-up el viernes" style={inp} />
          </div>
          <button onClick={submitForm} disabled={!actForm.resumen.trim() || !actForm.dealId}
            style={{ padding: "9px 16px", background: actForm.resumen.trim() ? T.blue : T.border, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 12, fontWeight: 700, cursor: actForm.resumen.trim() ? "pointer" : "not-allowed", fontFamily: "inherit" }}>
            Guardar actividad
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 && <div style={{ padding: 30, textAlign: "center", color: T.textTertiary, fontSize: 13 }}>Sin actividades que coincidan</div>}
        {filtered.map(a => {
          const deal = deals.find(d => d.id === a.dealId);
          const tc = tipoColors[a.tipo] || { bg: T.surfaceAlt, color: T.textSecondary };
          return (
            <div key={a.id} style={{ ...opCard, padding: "14px 18px", borderLeft: `3px solid ${tc.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: tc.bg, color: tc.color, fontWeight: 800, textTransform: "uppercase", letterSpacing: 0.5 }}>{a.tipo}</span>
                <span style={{ fontSize: 11, color: T.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}>{a.fecha}</span>
                <span style={{ fontSize: 11, color: T.textSecondary }}>· {a.ejecutivo}</span>
                {deal && <span style={{ fontSize: 11, fontWeight: 700, color: T.navy, marginLeft: "auto" }}>{deal.empresa}</span>}
              </div>
              <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>{a.resumen}</div>
              {a.siguiente && a.siguiente !== "—" && (
                <div style={{ fontSize: 11, color: T.green, marginTop: 6, fontWeight: 600 }}>→ Siguiente: {a.siguiente}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// RIESGOS — DATA & HELPERS
// ═══════════════════════════════════════════════
const EMPRESA_PERFIL = {
  "Manufactura":   { antecedentes: "Empresa con presencia consolidada en el sector industrial mexicano. Opera bajo certificaciones ISO 9001 y cuenta con cadena de suministro establecida con clientes Tier 1.", instalaciones: "Planta principal con 25,000 m² techados, líneas automatizadas y áreas certificadas para exportación.", capacidad: "1,200 ton/mes" },
  "Construcción":  { antecedentes: "Constructora con portafolio de obra civil, infraestructura vial y desarrollos inmobiliarios. Contratos vigentes con dependencias federales y municipales.", instalaciones: "Oficinas centrales + flota de equipo pesado en 4 frentes activos.", capacidad: "850 mil m² ejecutados/año" },
  "Alimentos":     { antecedentes: "Operación de procesamiento y empaque con distribución nacional. Cuenta con certificación HACCP y FSSC 22000.", instalaciones: "Planta refrigerada de 12,000 m² con sala blanca y bodega de producto terminado.", capacidad: "180 ton/mes" },
  "Logística":     { antecedentes: "Operador logístico con flota especializada en cargas refrigeradas y secas. Cobertura nacional con cross-dock en zonas estratégicas.", instalaciones: "Patio de maniobras + taller propio + sistema TMS en operación.", capacidad: "+9,000 viajes/año" },
  "Energía":       { antecedentes: "Empresa especializada en proyectos de generación distribuida y eficiencia energética. Cartera de PPAs vigentes con clientes industriales.", instalaciones: "Centro de operaciones SCADA + bodegas técnicas regionales.", capacidad: "32 MW instalados" },
  "Textil":        { antecedentes: "Productor textil con orientación exportadora. Atiende marcas nacionales y maquila para Estados Unidos.", instalaciones: "Naves de tejido y acabado, área de tintorería propia.", capacidad: "1.8 M m² tela/año" },
  "Salud":         { antecedentes: "Distribuidor farmacéutico con cobertura B2B en clínicas, hospitales y farmacias regionales. Cumple con la normativa COFEPRIS.", instalaciones: "Centro de distribución refrigerado + flota controlada.", capacidad: "240 mil unidades/mes" },
  "Minería":       { antecedentes: "Operación minera de cobre en yacimiento activo. Reservas probadas y permisos ambientales vigentes.", instalaciones: "Mina a cielo abierto + planta de molienda + presa de jales.", capacidad: "8,500 ton mineral/día" },
  "Plásticos":     { antecedentes: "Transformador de plástico inyectado con piezas técnicas para automotriz y línea blanca.", instalaciones: "Planta con 38 inyectoras y celda de ensamble.", capacidad: "9,200 ton/año" },
  "Agroindustria": { antecedentes: "Procesador agroindustrial con integración campo-planta. Operación contracíclica entre granos y oleaginosas.", instalaciones: "Planta procesadora + silos de almacenamiento + báscula propia.", capacidad: "45,000 ton/ciclo" },
  "Tecnología":    { antecedentes: "Integrador de soluciones de TI y servicios gestionados. Maneja data center propio Tier III y contratos plurianuales.", instalaciones: "Data center 1,200 m² + NOC 24/7.", capacidad: "+2,400 racks gestionados" },
};

const empresaFor = (c) => {
  const map = { "Manufactura":"Manufactura", "Construcción":"Construcción", "Alimentos":"Alimentos", "Logística":"Logística", "Energía":"Energía", "Textil":"Textil", "Salud":"Salud", "Minería":"Minería", "Plásticos":"Plásticos", "Agroindustria":"Agroindustria", "Tecnología":"Tecnología" };
  return EMPRESA_PERFIL[map[c.actividad] || "Manufactura"];
};

const SERVICIOS_BY_ACT = {
  "Manufactura":   ["Extrusión de aluminio", "Fabricación de perfiles", "Acabado anodizado", "Maquila a especificación"],
  "Construcción":  ["Obra civil", "Infraestructura vial", "Desarrollos inmobiliarios", "Concretos y acabados"],
  "Alimentos":     ["Procesamiento de alimentos", "Empaque al vacío", "Distribución refrigerada"],
  "Logística":     ["Carga refrigerada", "Carga seca", "Cross-dock", "Almacenaje en tránsito"],
  "Energía":       ["Diseño solar industrial", "Construcción de plantas", "O&M", "PPAs corporativos"],
  "Textil":        ["Tejido plano", "Acabado y tintura", "Maquila exportación"],
  "Salud":         ["Distribución farmacéutica", "Cadena de frío", "Logística regulada"],
  "Minería":       ["Extracción", "Concentración", "Comercialización de cobre"],
  "Plásticos":     ["Inyección técnica", "Ensamble", "Diseño de moldes"],
  "Agroindustria": ["Acopio de granos", "Procesamiento", "Almacenamiento"],
  "Tecnología":    ["Servicios gestionados", "Cloud privado", "Data center colocation"],
};

const generarConclusionesIA = (c) => {
  const score = c.calificacion.score;
  const cobertura = c.estadoCuenta.cobertura;
  const ventas = c.financieros.ventas;
  const ebitda = c.financieros.ebitda;
  const tendVentas = ventas[ventas.length - 1].v >= ventas[0].v ? "creciente" : "decreciente";
  const margen = ebitda[ebitda.length - 1].v / ventas[ventas.length - 1].v;

  const fortalezas = [];
  const riesgos = [];
  const recomendaciones = [];

  if (score >= 700) fortalezas.push({ titulo: "Calificación crediticia sólida", texto: `Score Ekatena de ${score} ubica al cliente en banda de riesgo controlado.` });
  if (cobertura >= 10) fortalezas.push({ titulo: "Cobertura de flujo robusta", texto: `Saldo promedio cubre ${cobertura.toFixed(1)}× la renta mensual, lo que deja holgura ante shocks de corto plazo.` });
  if (tendVentas === "creciente") fortalezas.push({ titulo: "Tendencia de ventas positiva", texto: "El cliente muestra crecimiento sostenido en sus últimas ventanas reportadas." });
  if (margen >= 0.10) fortalezas.push({ titulo: "Margen operativo saludable", texto: `EBITDA / Ventas estimado en ${(margen*100).toFixed(1)}% ubicado por encima del promedio sectorial.` });

  if (score < 700) riesgos.push({ titulo: "Score por debajo del umbral preferente", texto: `Calificación de ${score} requiere monitoreo trimestral y validación de garantías.` });
  if (cobertura < 8) riesgos.push({ titulo: "Cobertura ajustada", texto: `Cobertura de ${cobertura.toFixed(1)}× deja poco margen ante caída de ingresos. Evaluar fortalecer aval.` });
  if (tendVentas === "decreciente") riesgos.push({ titulo: "Ventas en contracción", texto: "La curva de ventas presenta deterioro en el último ciclo; verificar concentración de clientes." });
  riesgos.push({ titulo: "Concentración de pasivos", texto: `${c.pasivosFinancieros.principales.length} acreedores principales con ${fmtShort(c.pasivosFinancieros.totalSaldo)} en saldo. Validar covenants vigentes.` });

  recomendaciones.push({ titulo: "Refresh financiero", texto: "Solicitar EEFF a corte ≤ 90 días y carta de buró actualizada antes del próximo desembolso." });
  if (cobertura < 10) recomendaciones.push({ titulo: "Reforzar garantías", texto: "Considerar GPS y aval solidario adicional dado el perfil de cobertura." });
  recomendaciones.push({ titulo: "Monitoreo de sector", texto: `Vigilar indicadores macro de ${c.actividad}: precio de insumos, demanda y FX dado que afecta al activo financiado.` });
  if (margen < 0.10) recomendaciones.push({ titulo: "Análisis de eficiencia", texto: "Margen EBITDA por debajo del umbral; profundizar en estructura de costos en próxima revisión." });

  return { fortalezas, riesgos, recomendaciones, score, cobertura, margen, tendVentas };
};

// ═══════════════════════════════════════════════
// RIESGOS — PANORAMA
// ═══════════════════════════════════════════════
function RiesgosPanoramaSection({ onSelectClient }) {
  const totalExposicion = CLIENTS.reduce((s, c) => s + c.saldoPendiente, 0);
  const avgScore = Math.round(CLIENTS.reduce((s, c) => s + c.calificacion.score, 0) / CLIENTS.length);
  const altoRiesgo = CLIENTS.filter(c => c.calificacion.score < 650).length;
  const proximosPago = CLIENTS.filter(c => c.diasParaPago <= 7).length;

  // Distribución por banda de score
  const bandas = [
    { label: "Excelente (≥750)", min: 750, max: 1000, color: T.green },
    { label: "Bueno (700–749)", min: 700, max: 749, color: T.blue },
    { label: "Aceptable (650–699)", min: 650, max: 699, color: T.amber },
    { label: "Riesgoso (<650)", min: 0, max: 649, color: T.red },
  ];
  const bandaData = bandas.map(b => ({ ...b, count: CLIENTS.filter(c => c.calificacion.score >= b.min && c.calificacion.score <= b.max).length }));

  // Check breakdown
  const checkStats = {};
  CLIENTS.forEach(c => c.calificacion.checks.forEach(ch => {
    checkStats[ch.key] = checkStats[ch.key] || { ok: 0, warning: 0, info: 0 };
    checkStats[ch.key][ch.status] = (checkStats[ch.key][ch.status] || 0) + 1;
  }));

  // Top exposiciones
  const topExposicion = [...CLIENTS].sort((a, b) => b.saldoPendiente - a.saldoPendiente).slice(0, 5);

  // Alertas combinadas
  const alertas = [];
  CLIENTS.forEach(c => {
    if (c.calificacion.score < 650) alertas.push({ tipo: "score", color: T.red, cliente: c, texto: `Score ${c.calificacion.score} bajo umbral preferente`, severidad: 3 });
    if (c.estadoCuenta.cobertura < 6) alertas.push({ tipo: "cobertura", color: T.amber, cliente: c, texto: `Cobertura ${c.estadoCuenta.cobertura.toFixed(1)}× ajustada`, severidad: 2 });
    if (c.diasParaPago <= 3) alertas.push({ tipo: "pago", color: "#7A4848", cliente: c, texto: `Próximo pago en ${c.diasParaPago}d`, severidad: 2 });
    const warningChecks = c.calificacion.checks.filter(ch => ch.status === "warning").length;
    if (warningChecks >= 2) alertas.push({ tipo: "checks", color: T.amber, cliente: c, texto: `${warningChecks} alertas en calificación`, severidad: 2 });
  });
  alertas.sort((a, b) => b.severidad - a.severidad);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <OpKpi icon="account_balance_wallet" label="Exposición total" value={fmtShort(totalExposicion)} accent={T.navy} />
        <OpKpi icon="speed" label="Score promedio" value={avgScore.toString()} accent={scoreColor(avgScore)} sub={`${CLIENTS.length} clientes`} />
        <OpKpi icon="warning" label="Alto riesgo (<650)" value={altoRiesgo.toString()} accent={altoRiesgo > 0 ? T.red : T.green} />
        <OpKpi icon="alarm" label="Pagos en ≤7 días" value={proximosPago.toString()} accent={proximosPago > 0 ? T.amber : T.green} />
        <OpKpi icon="report" label="Alertas activas" value={alertas.length.toString()} accent={T.amber} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Distribución de score</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {bandaData.map(b => (
              <div key={b.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 11 }}>
                  <span style={{ fontWeight: 600 }}>{b.label}</span>
                  <span style={{ fontWeight: 800, color: b.color, fontFamily: "'JetBrains Mono', monospace" }}>{b.count}</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(b.count / CLIENTS.length) * 100}%`, background: b.color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Salud por dimensión de calificación</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {Object.entries(checkStats).map(([key, st]) => {
              const total = (st.ok || 0) + (st.warning || 0) + (st.info || 0);
              return (
                <div key={key}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.navy, marginBottom: 6 }}>{key}</div>
                  <StackedBar
                    entries={[
                      { label: "OK", value: st.ok || 0 },
                      { label: "Warning", value: st.warning || 0 },
                      { label: "Info", value: st.info || 0 },
                    ]}
                    palette={[T.green, T.amber, T.blue]}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Top 5 exposiciones</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {topExposicion.map(c => {
              const sc = scoreColor(c.calificacion.score);
              const pct = (c.saldoPendiente / totalExposicion) * 100;
              return (
                <button key={c.id} onClick={() => onSelectClient(c.id)} className="hover-row"
                  style={{ display: "grid", gridTemplateColumns: "1.6fr 60px 70px 1fr", alignItems: "center", gap: 10, padding: 10, background: "transparent", border: `1px solid ${T.borderLight}`, borderRadius: T.radiusSm, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{c.nombre}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: sc, fontFamily: "'JetBrains Mono', monospace", padding: "2px 6px", background: `${sc}14`, borderRadius: 3, textAlign: "center" }}>{c.calificacion.score}</span>
                  <span style={{ fontSize: 11, color: T.text, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textAlign: "right" }}>{fmtShort(c.saldoPendiente)}</span>
                  <div style={{ height: 6, borderRadius: 3, background: T.surfaceAlt, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: T.blue }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div style={opCard}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Alertas tempranas</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 320, overflowY: "auto" }}>
            {alertas.length === 0 && <div style={{ padding: 20, textAlign: "center", color: T.textTertiary, fontSize: 12 }}>Sin alertas activas</div>}
            {alertas.map((a, i) => (
              <button key={i} onClick={() => onSelectClient(a.cliente.id)} className="hover-row"
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "transparent", border: `1px solid ${T.borderLight}`, borderLeft: `3px solid ${a.color}`, borderRadius: T.radiusSm, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.navy }}>{a.cliente.nombre}</div>
                  <div style={{ fontSize: 10, color: T.textSecondary, marginTop: 2 }}>{a.texto}</div>
                </div>
                <span className="material-symbols-outlined" style={{ fontSize: 16, color: a.color }}>chevron_right</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// RIESGOS — EXPEDIENTES
// ═══════════════════════════════════════════════
function RiesgosExpedientesSection({ onSelectClient }) {
  const [search, setSearch] = useState("");
  const [bandaFilter, setBandaFilter] = useState("todos");

  const filtered = CLIENTS.filter(c => {
    if (search) {
      const q = search.toLowerCase();
      if (!c.nombre.toLowerCase().includes(q) && !c.razonSocial.toLowerCase().includes(q) && !c.rfc.toLowerCase().includes(q)) return false;
    }
    if (bandaFilter === "alto") return c.calificacion.score < 650;
    if (bandaFilter === "medio") return c.calificacion.score >= 650 && c.calificacion.score < 750;
    if (bandaFilter === "bajo") return c.calificacion.score >= 750;
    return true;
  }).sort((a, b) => a.calificacion.score - b.calificacion.score);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar cliente, razón social o RFC..."
          style={{ flex: "1 1 280px", padding: "10px 14px", background: T.surface, border: `1px solid ${T.border}`, borderRadius: T.radiusSm, fontSize: 13, fontFamily: "inherit", outline: "none" }} />
        <div style={{ display: "flex", gap: 4, background: T.surfaceAlt, borderRadius: T.radiusSm, padding: 4 }}>
          {[
            { id: "todos", label: "Todos" },
            { id: "alto", label: "Alto riesgo" },
            { id: "medio", label: "Medio" },
            { id: "bajo", label: "Bajo riesgo" },
          ].map(b => (
            <button key={b.id} onClick={() => setBandaFilter(b.id)}
              style={{ padding: "8px 14px", border: "none", borderRadius: 5, background: bandaFilter === b.id ? T.surface : "transparent", color: bandaFilter === b.id ? T.navy : T.textSecondary, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: bandaFilter === b.id ? T.shadow : "none" }}>
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        {filtered.length === 0 && <div style={{ padding: 40, textAlign: "center", color: T.textTertiary, fontSize: 13 }}>Sin resultados</div>}
        {filtered.map(c => {
          const sc = scoreColor(c.calificacion.score);
          const warningChecks = c.calificacion.checks.filter(ch => ch.status === "warning").length;
          const okChecks = c.calificacion.checks.filter(ch => ch.status === "ok").length;
          const totalChecks = c.calificacion.checks.length;
          const pctOk = (okChecks / totalChecks) * 100;
          return (
            <button key={c.id} onClick={() => onSelectClient(c.id)} className="hover-lift"
              style={{ ...opCard, padding: 0, cursor: "pointer", textAlign: "left", border: `1px solid ${T.border}`, fontFamily: "inherit", overflow: "hidden" }}>
              <div style={{ padding: "16px 18px 14px", borderBottom: `1px solid ${T.borderLight}` }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: T.navy }}>{c.nombre}</div>
                    <div style={{ fontSize: 10, color: T.textTertiary, marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{c.rfc}</div>
                  </div>
                  <div style={{ width: 56, height: 56, borderRadius: 10, background: `${sc}14`, color: sc, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 16, fontWeight: 900, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1 }}>{c.calificacion.score}</span>
                    <span style={{ fontSize: 8, fontWeight: 800, marginTop: 2, letterSpacing: 0.5 }}>{c.calificacion.riesgo.toUpperCase()}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 3, background: T.surfaceAlt, color: T.textSecondary, fontWeight: 700 }}>{c.actividad}</span>
                  {warningChecks > 0 && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 3, background: T.amberLight, color: T.amber, fontWeight: 700 }}>⚠ {warningChecks} alertas</span>}
                  {c.diasParaPago <= 7 && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 3, background: "#F1ECE5", color: "#7A4848", fontWeight: 700 }}>Pago en {c.diasParaPago}d</span>}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "14px 18px", borderBottom: `1px solid ${T.borderLight}` }}>
                <div>
                  <div style={{ fontSize: 9, color: T.textTertiary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Saldo pendiente</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{fmtShort(c.saldoPendiente)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: T.textTertiary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Cobertura</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: c.estadoCuenta.cobertura >= 8 ? T.green : T.amber, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{c.estadoCuenta.cobertura.toFixed(1)}×</div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: T.textTertiary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Buró</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{c.buroCredito.puntaje} <span style={{ fontSize: 10, color: T.textTertiary }}>· {c.buroCredito.gradoRiesgo}</span></div>
                </div>
                <div>
                  <div style={{ fontSize: 9, color: T.textTertiary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Pasivos</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{fmtShort(c.pasivosFinancieros.totalSaldo)}</div>
                </div>
              </div>

              <div style={{ padding: "12px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 10 }}>
                  <span style={{ color: T.textTertiary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Calificación · {okChecks}/{totalChecks} OK</span>
                  <span style={{ color: T.navy, fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{pctOk.toFixed(0)}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: T.surfaceAlt, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pctOk}%`, background: pctOk >= 80 ? T.green : pctOk >= 60 ? T.amber : T.red, borderRadius: 3 }} />
                </div>
                <div style={{ marginTop: 12, fontSize: 10, color: T.textTertiary, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Abrir expediente →</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// RIESGOS — ANÁLISIS IA
// ═══════════════════════════════════════════════
function RiesgosAnalisisSection() {
  const [clientId, setClientId] = useState(CLIENTS[0].id);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);
  const c = CLIENTS.find(x => x.id === clientId);

  const ejecutar = () => {
    setRunning(true);
    setTimeout(() => {
      setResult(generarConclusionesIA(c));
      setRunning(false);
    }, 900);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <div style={{ ...opCard, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", background: `linear-gradient(135deg, ${T.blue}10, ${T.green}10)`, borderBottom: `1px solid ${T.borderLight}`, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${T.blue}, ${T.green})`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined">psychology</span>
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: T.navy, margin: 0 }}>Análisis cruzados</h3>
            <p style={{ fontSize: 11, color: T.textSecondary, margin: "2px 0 0" }}>Cruza estados financieros, historial de pagos y dinámica del sector para generar recomendaciones para el equipo de Riesgos.</p>
          </div>
        </div>
        <div style={{ padding: 20, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 240px" }}>
            <label style={lbl}>Cliente a analizar</label>
            <select value={clientId} onChange={e => { setClientId(e.target.value); setResult(null); }} style={inp}>
              {CLIENTS.map(cl => <option key={cl.id} value={cl.id}>{cl.nombre} — {cl.actividad}</option>)}
            </select>
          </div>
          <button onClick={ejecutar} disabled={running}
            style={{ padding: "11px 22px", background: `linear-gradient(135deg, ${T.blue}, ${T.green})`, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 13, fontWeight: 700, cursor: running ? "wait" : "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{running ? "progress_activity" : "psychology"}</span>
            {running ? "Procesando..." : "Generar análisis"}
          </button>
        </div>
      </div>

      {result && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
            <OpKpi icon="speed" label="Score Ekatena" value={result.score.toString()} accent={scoreColor(result.score)} />
            <OpKpi icon="account_balance" label="Cobertura" value={`${result.cobertura.toFixed(1)}×`} accent={result.cobertura >= 8 ? T.green : T.amber} />
            <OpKpi icon="trending_up" label="Margen EBITDA" value={`${(result.margen * 100).toFixed(1)}%`} accent={result.margen >= 0.10 ? T.green : T.amber} />
            <OpKpi icon={result.tendVentas === "creciente" ? "north_east" : "south_east"} label="Tendencia ventas" value={result.tendVentas} accent={result.tendVentas === "creciente" ? T.green : T.red} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
            <ConclusionsBlock title="Fortalezas" icon="check_circle" color={T.green} items={result.fortalezas} />
            <ConclusionsBlock title="Riesgos detectados" icon="warning" color={T.red} items={result.riesgos} />
            <ConclusionsBlock title="Recomendaciones" icon="lightbulb" color={T.purple} items={result.recomendaciones} />
          </div>

          <div style={{ ...opCard, padding: 18, borderLeft: `4px solid ${T.blue}`, display: "flex", gap: 12 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 22, color: T.blue, flexShrink: 0 }}>info</span>
            <div style={{ fontSize: 12, color: T.textSecondary, lineHeight: 1.6 }}>
              <strong style={{ color: T.navy }}>Nota:</strong> Las recomendaciones se generan a partir de los datos cargados en el expediente del cliente. Para producir conclusiones más finas, se sugiere conectar la fuente original de estados financieros (mensual) y el reporte de buró actualizado en el módulo Operación → Drive.
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ConclusionsBlock({ title, icon, color, items }) {
  return (
    <div style={opCard}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span className="material-symbols-outlined" style={{ fontSize: 18, color }}>{icon}</span>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>{title}</h3>
        <span style={{ fontSize: 10, color: T.textTertiary, fontFamily: "'JetBrains Mono', monospace" }}>· {items.length}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.length === 0 && <div style={{ fontSize: 12, color: T.textTertiary, padding: 12, textAlign: "center" }}>Sin elementos detectados</div>}
        {items.map((it, i) => (
          <div key={i} style={{ padding: 12, background: T.surfaceAlt, borderRadius: T.radiusSm, borderLeft: `3px solid ${color}` }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, marginBottom: 4 }}>{it.titulo}</div>
            <div style={{ fontSize: 11, color: T.textSecondary, lineHeight: 1.5 }}>{it.texto}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// DASHBOARD FINANCIERO — DATA
// ═══════════════════════════════════════════════
const DASH_FIN_TREND = [
  { m: "May 25", ingresos: 28500, costoFond: 11400, opex: 6800, prov: 1200 },
  { m: "Jun 25", ingresos: 29800, costoFond: 11900, opex: 6900, prov: 1100 },
  { m: "Jul 25", ingresos: 31200, costoFond: 12500, opex: 7100, prov: 1300 },
  { m: "Ago 25", ingresos: 30700, costoFond: 12300, opex: 7000, prov: 1400 },
  { m: "Sep 25", ingresos: 32100, costoFond: 12850, opex: 7200, prov: 1250 },
  { m: "Oct 25", ingresos: 33400, costoFond: 13360, opex: 7400, prov: 1100 },
  { m: "Nov 25", ingresos: 34200, costoFond: 13680, opex: 7500, prov: 1350 },
  { m: "Dic 25", ingresos: 36800, costoFond: 14720, opex: 8200, prov: 1500 },
  { m: "Ene 26", ingresos: 33500, costoFond: 13400, opex: 7300, prov: 1280 },
  { m: "Feb 26", ingresos: 34100, costoFond: 13640, opex: 7400, prov: 1200 },
  { m: "Mar 26", ingresos: 35200, costoFond: 14080, opex: 7500, prov: 1100 },
  { m: "Abr 26", ingresos: 35600, costoFond: 14240, opex: 7100, prov: 1300 },
];

const DASH_FIN_PNL = [
  { label: "Ingresos por rentas", value: 27800, type: "in" },
  { label: "Comisiones", value: 4200, type: "in" },
  { label: "Intereses inversiones", value: 2100, type: "in" },
  { label: "Otros ingresos", value: 1500, type: "in" },
  { label: "TOTAL INGRESOS", value: 35600, type: "total" },
  { label: "Costo de fondeo", value: -14240, type: "out" },
  { label: "MARGEN FINANCIERO", value: 21360, type: "sub" },
  { label: "Gastos operativos", value: -7100, type: "out" },
  { label: "Provisiones / castigos", value: -1300, type: "out" },
  { label: "EBITDA", value: 12960, type: "sub" },
  { label: "Depreciación y amortización", value: -1180, type: "out" },
  { label: "Impuestos (ISR)", value: -3534, type: "out" },
  { label: "UTILIDAD NETA", value: 8246, type: "total" },
];

const DASH_FIN_INGRESOS = [
  { label: "Rentas arrendamiento", value: 78 },
  { label: "Comisiones apertura", value: 12 },
  { label: "Intereses inversiones", value: 6 },
  { label: "Otros (recuperaciones)", value: 4 },
];

const DASH_FIN_CARTERA_TREND = [
  { m: "May 25", v: 1620 },
  { m: "Jun 25", v: 1680 },
  { m: "Jul 25", v: 1740 },
  { m: "Ago 25", v: 1790 },
  { m: "Sep 25", v: 1825 },
  { m: "Oct 25", v: 1860 },
  { m: "Nov 25", v: 1880 },
  { m: "Dic 25", v: 1910 },
  { m: "Ene 26", v: 1925 },
  { m: "Feb 26", v: 1940 },
  { m: "Mar 26", v: 1948 },
  { m: "Abr 26", v: 1955 },
];

const DASH_FIN_BUDGET = [
  { kpi: "Ingresos", actual: 138400, budget: 132000 },
  { kpi: "Margen financiero", actual: 83040, budget: 79200 },
  { kpi: "EBITDA", actual: 50320, budget: 48400 },
  { kpi: "Utilidad neta", actual: 32100, budget: 30000 },
  { kpi: "Cartera promedio", actual: 1942000, budget: 1900000 },
];

const DASH_FIN_SECTORES = [
  { label: "Manufactura", value: 480 },
  { label: "Construcción", value: 420 },
  { label: "Transporte", value: 380 },
  { label: "Energía", value: 285 },
  { label: "Agroindustria", value: 175 },
  { label: "Salud", value: 95 },
  { label: "Tecnología", value: 80 },
  { label: "Otros", value: 40 },
];

// ═══════════════════════════════════════════════
// DASHBOARD FINANCIERO — UI HELPERS
// ═══════════════════════════════════════════════
function PnlCascade({ items }) {
  const totalIngresos = items.find(i => i.label === "TOTAL INGRESOS")?.value || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 70px", gap: 16, padding: "0 14px 8px", borderBottom: `1px solid ${T.border}` }}>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: T.textTertiary, letterSpacing: 0.8, textTransform: "uppercase" }}>Concepto</span>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: T.textTertiary, letterSpacing: 0.8, textTransform: "uppercase", textAlign: "right" }}>Importe</span>
        <span style={{ fontSize: 9.5, fontWeight: 700, color: T.textTertiary, letterSpacing: 0.8, textTransform: "uppercase", textAlign: "right" }}>% Ingresos</span>
      </div>
      {items.map((item, i) => {
        const isTotal = item.type === "total";
        const isSub = item.type === "sub";
        const isOut = item.type === "out";
        const big = isTotal || isSub;
        const valueColor = big ? T.navy : isOut ? T.red : T.text;
        const pct = (item.value / totalIngresos) * 100;
        const pctFmt = `${pct < 0 ? "(" : ""}${Math.abs(pct).toFixed(1)}%${pct < 0 ? ")" : ""}`;
        const isNeg = item.value < 0;
        return (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 70px",
            gap: 16,
            alignItems: "baseline",
            padding: big ? "11px 14px" : "6px 14px",
            borderTop: big ? `1px solid ${T.border}` : "none",
            borderBottom: isTotal ? `2px solid ${T.navy}` : "none",
            background: isTotal ? T.surfaceAlt : "transparent",
            marginTop: big ? 4 : 0,
          }}>
            <span style={{
              fontSize: big ? 12 : 11.5,
              fontWeight: big ? 800 : 500,
              color: big ? T.navy : T.text,
              letterSpacing: big ? 0.5 : 0,
              textTransform: big ? "uppercase" : "none",
              paddingLeft: big ? 0 : 14,
            }}>{item.label}</span>
            <span style={{
              fontSize: big ? 13 : 12,
              fontWeight: big ? 800 : 600,
              color: valueColor,
              fontFamily: "'JetBrains Mono', monospace",
              textAlign: "right",
              fontVariantNumeric: "tabular-nums",
            }}>{isNeg ? "(" : ""}{fmtShort(Math.abs(item.value) * 1000)}{isNeg ? ")" : ""}</span>
            <span style={{
              fontSize: 10.5,
              fontWeight: big ? 700 : 500,
              color: big ? T.textSecondary : T.textTertiary,
              fontFamily: "'JetBrains Mono', monospace",
              textAlign: "right",
              fontVariantNumeric: "tabular-nums",
            }}>{pctFmt}</span>
          </div>
        );
      })}
    </div>
  );
}

function BalanceColumn({ title, rows, total, totalLabel }) {
  const fmtBal = v => Math.abs(Math.round(v)).toLocaleString("en-US");
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ fontSize: 11, fontWeight: 800, color: T.navy, letterSpacing: 0.8, textTransform: "uppercase", paddingBottom: 8, borderBottom: `2px solid ${T.navy}`, marginBottom: 4 }}>{title}</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {rows.map((r, i) => {
          if (r.type === "section") {
            return (
              <div key={i} style={{ fontSize: 10, fontWeight: 700, color: T.textSecondary, letterSpacing: 0.6, textTransform: "uppercase", padding: "10px 0 4px", borderTop: i > 0 ? `1px solid ${T.borderLight}` : "none", marginTop: i > 0 ? 4 : 0 }}>{r.label}</div>
            );
          }
          if (r.type === "subtotal") {
            const isNeg = r.value < 0;
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "8px 12px", borderTop: `1px solid ${T.border}`, marginTop: 4, background: T.surfaceAlt, borderRadius: T.radiusSm, alignItems: "baseline" }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: T.navy, letterSpacing: 0.4, textTransform: "uppercase" }}>{r.label}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                  {isNeg ? "(" : ""}${fmtBal(r.value)}{isNeg ? ")" : ""}
                </span>
              </div>
            );
          }
          const isNeg = r.value < 0;
          return (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "5px 12px", alignItems: "baseline" }}>
              <span style={{ fontSize: 11.5, color: T.text }}>{r.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: isNeg ? T.red : T.text, fontFamily: "'JetBrains Mono', monospace", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                {isNeg ? "(" : ""}${fmtBal(r.value)}{isNeg ? ")" : ""}
              </span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", padding: "11px 12px", borderTop: `1px solid ${T.border}`, borderBottom: `3px double ${T.navy}`, background: T.surfaceAlt, marginTop: "auto", alignItems: "baseline" }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: T.navy, letterSpacing: 0.5, textTransform: "uppercase" }}>{totalLabel}</span>
        <span style={{ fontSize: 13.5, fontWeight: 900, color: T.navy, fontFamily: "'JetBrains Mono', monospace", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>${fmtBal(total)}</span>
      </div>
    </div>
  );
}

function HBarComposition({ entries }) {
  const total = entries.reduce((s, e) => s + e.value, 0) || 1;
  const max = Math.max(...entries.map(e => e.value));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {entries.map((e, i) => {
        const pct = (e.value / total) * 100;
        const barPct = (e.value / max) * 100;
        return (
          <div key={e.label} style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: T.text }}>{e.label}</span>
              <span style={{ fontSize: 12, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{pct.toFixed(1)}%</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: T.surfaceAlt, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${barPct}%`, background: T.navy, borderRadius: 3, transition: "width .8s ease" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function GroupedBars({ data, series, height = 130, valueFormatter = (n) => fmtShort(n * 1000) }) {
  const max = Math.max(...data.flatMap(d => series.map(s => d[s.key])));
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height, paddingBottom: 4 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 2, height: "100%", alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
              {series.map(s => {
                const h = (d[s.key] / max) * 100;
                return <div key={s.key} title={`${s.label}: ${valueFormatter(d[s.key])}`} style={{ flex: 1, height: `${h}%`, background: s.color, borderRadius: "2px 2px 0 0", minHeight: 2, transition: "height .8s ease" }} />;
              })}
            </div>
            <span style={{ fontSize: 9, color: T.textTertiary, whiteSpace: "nowrap" }}>{d.m || d.label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginTop: 8, flexWrap: "wrap" }}>
        {series.map(s => (
          <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color }} />
            <span style={{ color: T.textSecondary }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AreaTrend({ data, color = T.blue, height = 200, formatValue = v => `$${(v / 1000).toFixed(2)}B` }) {
  const max = Math.max(...data.map(d => d.v));
  const min = Math.min(...data.map(d => d.v));
  const range = max - min || 1;
  const yPct = (v) => 100 - ((v - min) / range) * 100;
  const w = 100 / Math.max(data.length - 1, 1);
  const points = data.map((d, i) => `${i * w},${yPct(d.v)}`).join(" ");
  const areaPath = `0,100 ${points} 100,100`;
  const valueTopPad = 22;
  return (
    <div>
      <div style={{ position: "relative", height: height + valueTopPad }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", top: valueTopPad, left: 0, width: "100%", height, display: "block" }}>
          <polygon points={areaPath} fill={color} fillOpacity="0.12" />
          <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          {data.map((d, i) => (
            <circle key={i} cx={i * w} cy={yPct(d.v)} r="2.2" fill={color} stroke="#fff" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {data.map((d, i) => {
          const leftPct = (i / Math.max(data.length - 1, 1)) * 100;
          const topPx = valueTopPad + (yPct(d.v) / 100) * height - 18;
          return (
            <span key={i} style={{
              position: "absolute",
              left: `${leftPct}%`,
              top: topPx,
              transform: "translateX(-50%)",
              fontSize: 9.5,
              fontWeight: 700,
              color: T.navy,
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: "nowrap",
              pointerEvents: "none",
            }}>{formatValue(d.v)}</span>
          );
        })}
      </div>
      <div style={{ display: "flex", marginTop: 6 }}>
        {data.map((d, i) => (
          <span key={i} style={{ fontSize: 9.5, color: T.textTertiary, flex: 1, textAlign: "center", fontWeight: 600 }}>{d.m}</span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// DASHBOARD FINANCIERO — SECTION
// ═══════════════════════════════════════════════
function DashboardFinancieroSection() {
  const carteraActual = DASH_FIN_CARTERA_TREND[DASH_FIN_CARTERA_TREND.length - 1].v;
  const carteraInicio = DASH_FIN_CARTERA_TREND[0].v;
  const crecYoY = ((carteraActual - carteraInicio) / carteraInicio) * 100;

  // Concentración por industria
  const totalCartera = QUANTO_OPS.reduce((s, o) => s + o.montoFinanciado, 0);
  const industrias = {};
  QUANTO_OPS.forEach(o => {
    const cl = CLIENTS.find(c => o.nombre.toUpperCase().includes(c.razonSocial.split(" SA")[0]));
    const act = cl ? cl.actividad : "Otros";
    industrias[act] = (industrias[act] || 0) + o.montoFinanciado;
  });
  const industriasSorted = Object.entries(industrias).sort((a, b) => b[1] - a[1]);
  const maxIndustria = industriasSorted[0][1];

  // Concentración por tipo de activo
  const activos = {};
  QUANTO_OPS.forEach(o => { activos[o.bien] = (activos[o.bien] || 0) + o.montoFinanciado; });
  const activosSorted = Object.entries(activos).sort((a, b) => b[1] - a[1]);
  const maxActivo = activosSorted[0][1];

  const indColors = ["#1F3A5F", "#3D6792", "#4A6B5C", "#8B7355", "#688CB3", "#6B5876", "#7A9684", "#5C5C5C", "#B8A07F", "#A4B8CF", "#9A8AAB"];
  const actColors = ["#3D6792", "#8B7355", "#4A6B5C", "#1F3A5F", "#6B5876", "#688CB3", "#5C5C5C", "#7A9684", "#B8A07F", "#A4B8CF", "#9A8AAB"];

  const palette = [T.blue, T.green, T.amber, T.purple, T.red, "#688CB3", "#9A8AAB", T.navy];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      {/* P&L cascade + Composición ingresos */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)", gap: 14, alignItems: "start" }}>
        <div style={opCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>P&L · Cascada del mes</h3>
            <span style={{ fontSize: 10, color: T.textTertiary, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>Abril 2026 · MXN</span>
          </div>
          <PnlCascade items={DASH_FIN_PNL} />
        </div>
        <div style={opCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Composición de ingresos</h3>
            <span style={{ fontSize: 10, color: T.textTertiary, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>% del total</span>
          </div>
          <HBarComposition entries={DASH_FIN_INGRESOS} />
        </div>
      </div>

      {/* Balance general */}
      <div style={opCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Balance general</h3>
          <span style={{ fontSize: 10, color: T.textTertiary, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>30 Abril 2026 · MXN millones</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "stretch" }}>
          <BalanceColumn
            title="Activos"
            totalLabel="Total activos"
            total={2550}
            rows={[
              { type: "section", label: "Activos circulantes" },
              { label: "Efectivo y equivalentes", value: 145 },
              { label: "Inversiones en valores", value: 285 },
              { label: "Cuentas por cobrar comerciales", value: 78 },
              { label: "Otros activos circulantes", value: 32 },
              { type: "subtotal", label: "Total circulante", value: 540 },
              { type: "section", label: "Activos no circulantes" },
              { label: "Cartera de arrendamiento bruta", value: 1955 },
              { label: "Estimación de incobrables", value: -55 },
              { label: "Mobiliario y equipo (neto)", value: 42 },
              { label: "Activos intangibles", value: 18 },
              { label: "Impuestos diferidos", value: 45 },
              { label: "Otros activos", value: 5 },
              { type: "subtotal", label: "Total no circulante", value: 2010 },
            ]}
          />
          <BalanceColumn
            title="Pasivos y capital"
            totalLabel="Total pasivo + capital"
            total={2550}
            rows={[
              { type: "section", label: "Pasivos circulantes" },
              { label: "Obligaciones financieras CP", value: 245 },
              { label: "Cuentas por pagar", value: 95 },
              { label: "Impuestos por pagar", value: 28 },
              { label: "Acumulados y otros", value: 12 },
              { type: "subtotal", label: "Total circulante", value: 380 },
              { type: "section", label: "Pasivos no circulantes" },
              { label: "Deuda bancaria LP", value: 1420 },
              { label: "Bursatilizaciones", value: 320 },
              { label: "Provisiones LP", value: 35 },
              { type: "subtotal", label: "Total no circulante", value: 1775 },
              { type: "subtotal", label: "Total pasivos", value: 2155 },
              { type: "section", label: "Capital contable" },
              { label: "Capital social", value: 220 },
              { label: "Reservas", value: 35 },
              { label: "Utilidades retenidas", value: 108 },
              { label: "Resultado del ejercicio", value: 32 },
              { type: "subtotal", label: "Total capital", value: 395 },
            ]}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.borderLight}`, fontSize: 10, color: T.textTertiary }}>
          <span style={{ fontWeight: 600 }}>Apalancamiento: <span style={{ color: T.navy, fontFamily: "'JetBrains Mono', monospace", fontWeight: 800 }}>5.46×</span></span>
          <span style={{ fontWeight: 600 }}>Liquidez: <span style={{ color: T.navy, fontFamily: "'JetBrains Mono', monospace", fontWeight: 800 }}>1.42×</span></span>
          <span style={{ fontWeight: 600 }}>Capital / activos: <span style={{ color: T.navy, fontFamily: "'JetBrains Mono', monospace", fontWeight: 800 }}>15.5%</span></span>
          <span style={{ fontStyle: "italic" }}>Cifras simuladas con fines ilustrativos</span>
        </div>
      </div>

      {/* Evolución de cartera */}
      <div style={opCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Evolución de cartera</h3>
            <p style={{ fontSize: 11, color: T.textTertiary, margin: "2px 0 0" }}>Saldo de cartera bruto · MXN millones</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>${(carteraActual / 1000).toFixed(2)}B</div>
            <div style={{ fontSize: 11, color: crecYoY >= 0 ? T.green : T.red, fontWeight: 700 }}>{crecYoY >= 0 ? "↑" : "↓"} {Math.abs(crecYoY).toFixed(1)}% vs hace 12m</div>
          </div>
        </div>
        <AreaTrend data={DASH_FIN_CARTERA_TREND} color={T.blue} />
      </div>

      {/* Plan vs Real */}
      <div style={opCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Plan vs Real · YTD 2026</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: T.surfaceAlt, border: `1px solid ${T.border}` }} />
              <span style={{ fontSize: 10.5, color: T.textSecondary, fontWeight: 600 }}>Plan</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: T.navy }} />
              <span style={{ fontSize: 10.5, color: T.textSecondary, fontWeight: 600 }}>Real</span>
            </div>
            <span style={{ fontSize: 10, color: T.textTertiary, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase" }}>4 meses · MXN</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${DASH_FIN_BUDGET.length}, 1fr)`, gap: 16 }}>
          {DASH_FIN_BUDGET.map(row => {
            const variancePct = ((row.actual - row.budget) / row.budget) * 100;
            const positive = variancePct >= 0;
            const maxV = Math.max(row.actual, row.budget);
            const minV = Math.min(row.actual, row.budget);
            const floor = minV * 0.88;
            const range = maxV - floor;
            const planH = ((row.budget - floor) / range) * 100;
            const realH = ((row.actual - floor) / range) * 100;
            return (
              <div key={row.kpi} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 10.5, fontWeight: 800, color: positive ? T.green : T.red, fontFamily: "'JetBrains Mono', monospace", padding: "3px 10px", borderRadius: 4, background: positive ? T.greenLight : T.redLight }}>
                  {positive ? "+" : ""}{variancePct.toFixed(1)}%
                </span>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 170, width: "100%", justifyContent: "center", borderBottom: `1px solid ${T.border}`, paddingBottom: 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, height: "100%", justifyContent: "flex-end", flex: 1, maxWidth: 42 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.textSecondary, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{fmtShort(row.budget * 1000)}</span>
                    <div style={{ width: "100%", height: `${planH}%`, background: T.surfaceAlt, border: `1px solid ${T.border}`, borderBottom: "none", borderRadius: "3px 3px 0 0", transition: "height .8s ease" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, height: "100%", justifyContent: "flex-end", flex: 1, maxWidth: 42 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", whiteSpace: "nowrap" }}>{fmtShort(row.actual * 1000)}</span>
                    <div style={{ width: "100%", height: `${realH}%`, background: T.navy, borderRadius: "3px 3px 0 0", transition: "height .8s ease" }} />
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: T.text, textAlign: "center", marginTop: 2 }}>{row.kpi}</span>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 10, color: T.textTertiary, margin: "14px 0 0", textAlign: "right", fontStyle: "italic" }}>Escala truncada para resaltar variaciones · Importes en etiquetas reflejan valores reales</p>
      </div>

      {/* Concentración: Industria + Tipo de Activo */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${T.blueLight}, ${T.purpleLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: T.blue }}>factory</span>
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: T.navy, margin: 0 }}>Concentración por Industria</h3>
                <p style={{ fontSize: 10, color: T.textTertiary, margin: "1px 0 0" }}>Distribución del financiamiento por sector</p>
              </div>
            </div>
            <div style={{ padding: "4px 12px", borderRadius: 20, background: T.blueLight, fontSize: 11, fontWeight: 700, color: T.blue }}>{industriasSorted.length} sectores</div>
          </div>
          <div style={{ padding: "16px 24px 20px" }}>
            {industriasSorted.map(([name, val], i) => {
              const pct = (val / totalCartera * 100);
              const barWidth = (val / maxIndustria * 100);
              const color = indColors[i % indColors.length];
              return (
                <div key={name} style={{ marginBottom: i < industriasSorted.length - 1 ? 12 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 3, height: 16, borderRadius: 2, background: color }} />
                      <span style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: 10, color: T.textTertiary }}>{fmtShort(val)}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", minWidth: 48, textAlign: "right" }}>{pct.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${barWidth}%`, borderRadius: 4, background: color, transition: "width .8s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "18px 24px", borderBottom: `1px solid ${T.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${T.purpleLight}, ${T.amberLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20, color: T.purple }}>precision_manufacturing</span>
              </div>
              <div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: T.navy, margin: 0 }}>Concentración por Tipo de Activo</h3>
                <p style={{ fontSize: 10, color: T.textTertiary, margin: "1px 0 0" }}>Distribución por tipo de bien financiado</p>
              </div>
            </div>
            <div style={{ padding: "4px 12px", borderRadius: 20, background: T.purpleLight, fontSize: 11, fontWeight: 700, color: T.purple }}>{activosSorted.length} tipos</div>
          </div>
          <div style={{ padding: "16px 24px 20px" }}>
            {activosSorted.map(([name, val], i) => {
              const pct = (val / totalCartera * 100);
              const barWidth = (val / maxActivo * 100);
              const color = actColors[i % actColors.length];
              return (
                <div key={name} style={{ marginBottom: i < activosSorted.length - 1 ? 12 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 3, height: 16, borderRadius: 2, background: color }} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: T.text }}>{name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ fontSize: 10, color: T.textTertiary }}>{fmtShort(val)}</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", minWidth: 48, textAlign: "right" }}>{pct.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${barWidth}%`, borderRadius: 4, background: color, transition: "width .8s ease" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}

// ═══════════════════════════════════════════════
// WORKING CAPITAL — DATA
// ═══════════════════════════════════════════════
const WC_BANCOS = [
  { banco: "BBVA México", cuenta: "Cheques operativa", saldo: 28400, color: T.blue },
  { banco: "Santander", cuenta: "Cheques operativa", saldo: 22100, color: T.red },
  { banco: "Banamex / Citi", cuenta: "Cheques fondos", saldo: 12800, color: T.green },
  { banco: "Banorte", cuenta: "Inversión vista 24h", saldo: 18400, color: T.amber },
  { banco: "BBVA México", cuenta: "Mesa dinero 28d", saldo: 45000, color: T.blue },
  { banco: "Santander", cuenta: "CETES 28d", saldo: 32500, color: T.red },
  { banco: "Banbajío", cuenta: "Mesa dinero", saldo: 14200, color: T.purple },
];

const WC_AR_AGING = [
  { bucket: "Al corriente", monto: 124500, color: T.green },
  { bucket: "1–30 días", monto: 12400, color: T.amber },
  { bucket: "31–60 días", monto: 4200, color: "#7A4848" },
  { bucket: "61–90 días", monto: 1800, color: T.red },
  { bucket: ">90 días", monto: 950, color: "#5C2929" },
];

const WC_AP_AGING = [
  { bucket: "Por vencer 7d", monto: 8400, color: T.amber },
  { bucket: "Por vencer 8–30d", monto: 18200, color: T.blue },
  { bucket: "Por vencer 31–60d", monto: 9100, color: T.green },
  { bucket: "Vencidas", monto: 1250, color: T.red },
];

// Detalle por cliente (Cuentas por cobrar) — montos en miles MXN
const WC_AR_CLIENTES = [
  { cliente: "ABC Aluminum", rfc: "ABC991012BF0", actividad: "Manufactura", ejecutivo: "Ramiro Magaña", al_corriente: 26800, d1_30: 2300, d31_60: 0, d61_90: 0, d90: 0 },
  { cliente: "Plásticos del Sureste", rfc: "PRS220317LL3", actividad: "Manufactura", ejecutivo: "Laura Soto", al_corriente: 18400, d1_30: 0, d31_60: 0, d61_90: 0, d90: 0 },
  { cliente: "Hospital San Vicente", rfc: "HSV050422FF1", actividad: "Salud", ejecutivo: "Carlos Mendoza", al_corriente: 13800, d1_30: 1500, d31_60: 0, d61_90: 0, d90: 0 },
  { cliente: "Solar Energy Sonora", rfc: "SES210603AA3", actividad: "Energía", ejecutivo: "Jorge Fuentes", al_corriente: 14100, d1_30: 0, d31_60: 0, d61_90: 0, d90: 0 },
  { cliente: "Minera Cobre Pacífico", rfc: "MCP120815MM5", actividad: "Construcción", ejecutivo: "Jorge Fuentes", al_corriente: 12200, d1_30: 0, d31_60: 0, d61_90: 0, d90: 0 },
  { cliente: "Grupo Constructor Pacífico", rfc: "GCP180523LA9", actividad: "Construcción", ejecutivo: "Carlos Mendoza", al_corriente: 10400, d1_30: 1100, d31_60: 0, d61_90: 0, d90: 0 },
  { cliente: "Tech Solutions GDL", rfc: "TSG170418PQ4", actividad: "Tecnología", ejecutivo: "Jorge Fuentes", al_corriente: 7800, d1_30: 1300, d31_60: 600, d61_90: 0, d90: 0 },
  { cliente: "AgroBajío Industrial", rfc: "ABI160910KP1", actividad: "Agropecuario", ejecutivo: "Laura Soto", al_corriente: 7200, d1_30: 800, d31_60: 700, d61_90: 0, d90: 0 },
  { cliente: "Distribuidora Pacífico", rfc: "DIP080718JK6", actividad: "Comercio", ejecutivo: "Laura Soto", al_corriente: 5400, d1_30: 1600, d31_60: 400, d61_90: 0, d90: 0 },
  { cliente: "Manufactura Textil Querétaro", rfc: "MTQ190501XX2", actividad: "Manufactura", ejecutivo: "Ana Ríos", al_corriente: 3200, d1_30: 1500, d31_60: 1100, d61_90: 600, d90: 0 },
  { cliente: "Logística Express MX", rfc: "LEM140312BB9", actividad: "Transporte", ejecutivo: "Carlos Mendoza", al_corriente: 2400, d1_30: 1100, d31_60: 700, d61_90: 600, d90: 350 },
  { cliente: "Servicios Logísticos Central", rfc: "SLC210918DD8", actividad: "Transporte", ejecutivo: "Carlos Mendoza", al_corriente: 1800, d1_30: 900, d31_60: 700, d61_90: 600, d90: 600 },
  { cliente: "Distribuidora Farmacéutica RB", rfc: "DFR181122RR4", actividad: "Salud", ejecutivo: "Jorge Fuentes", al_corriente: 1000, d1_30: 300, d31_60: 0, d61_90: 0, d90: 0 },
];

// Detalle por proveedor (Cuentas por pagar) — 32 proveedores · montos en miles MXN
const WC_AP_PROVEEDORES = [
  { proveedor: "SIEMENS MÉXICO", rfc: "SIE920731AB1", categoria: "Maquinaria industrial", saldo: 4200, vencer_7d: 1200, vencer_8_30d: 2400, vencer_31_60d: 600, vencidas: 0 },
  { proveedor: "CATERPILLAR MÉXICO", rfc: "CAT850412AC1", categoria: "Maquinaria pesada", saldo: 3800, vencer_7d: 800, vencer_8_30d: 2200, vencer_31_60d: 800, vencidas: 0 },
  { proveedor: "ABB MÉXICO", rfc: "ABB890215XY3", categoria: "Maquinaria industrial", saldo: 2400, vencer_7d: 0, vencer_8_30d: 1800, vencer_31_60d: 600, vencidas: 0 },
  { proveedor: "JOHN DEERE", rfc: "JDR910514FE2", categoria: "Maquinaria pesada", saldo: 2100, vencer_7d: 600, vencer_8_30d: 900, vencer_31_60d: 600, vencidas: 0 },
  { proveedor: "SCHNEIDER ELECTRIC", rfc: "APC910707AA5", categoria: "Tecnología / IT", saldo: 1950, vencer_7d: 0, vencer_8_30d: 1400, vencer_31_60d: 550, vencidas: 0 },
  { proveedor: "VOLVO TRUCKS", rfc: "VTM880619TR7", categoria: "Transporte", saldo: 1820, vencer_7d: 320, vencer_8_30d: 1100, vencer_31_60d: 400, vencidas: 0 },
  { proveedor: "KOMATSU LATINOAMÉRICA", rfc: "KOM920518DH9", categoria: "Maquinaria pesada", saldo: 1740, vencer_7d: 0, vencer_8_30d: 1240, vencer_31_60d: 500, vencidas: 0 },
  { proveedor: "SANDVIK MÉXICO", rfc: "SVM900812SD3", categoria: "Minería", saldo: 1620, vencer_7d: 0, vencer_8_30d: 1100, vencer_31_60d: 520, vencidas: 0 },
  { proveedor: "HPE TECNOLOGÍAS", rfc: "HPE950620TC8", categoria: "Tecnología / IT", saldo: 1480, vencer_7d: 480, vencer_8_30d: 700, vencer_31_60d: 300, vencidas: 0 },
  { proveedor: "ROCKWELL AUTOMATION", rfc: "RAM870612MN4", categoria: "Maquinaria industrial", saldo: 1320, vencer_7d: 0, vencer_8_30d: 1000, vencer_31_60d: 320, vencidas: 0 },
  { proveedor: "KENWORTH MEXICANA", rfc: "KME900425KW1", categoria: "Transporte", saldo: 1240, vencer_7d: 0, vencer_8_30d: 940, vencer_31_60d: 300, vencidas: 0 },
  { proveedor: "FREIGHTLINER MX", rfc: "FRM910303FR5", categoria: "Transporte", saldo: 1150, vencer_7d: 250, vencer_8_30d: 600, vencer_31_60d: 300, vencidas: 0 },
  { proveedor: "THERMO KING", rfc: "TKM920810TK2", categoria: "Refrigeración", saldo: 1100, vencer_7d: 0, vencer_8_30d: 800, vencer_31_60d: 300, vencidas: 0 },
  { proveedor: "INYECTORAS ENGEL", rfc: "ENG940510EN3", categoria: "Plásticos", saldo: 980, vencer_7d: 0, vencer_8_30d: 700, vencer_31_60d: 280, vencidas: 0 },
  { proveedor: "SIEMENS HEALTHCARE", rfc: "SHC200315SH7", categoria: "Equipo médico", saldo: 920, vencer_7d: 0, vencer_8_30d: 620, vencer_31_60d: 300, vencidas: 0 },
  { proveedor: "PICANOL TEXTIL", rfc: "PTX980612PN9", categoria: "Manufactura textil", saldo: 880, vencer_7d: 0, vencer_8_30d: 580, vencer_31_60d: 300, vencidas: 0 },
  { proveedor: "HINO MOTORS MX", rfc: "HMM940825HN6", categoria: "Transporte", saldo: 820, vencer_7d: 0, vencer_8_30d: 520, vencer_31_60d: 300, vencidas: 0 },
  { proveedor: "TOYOTA MATERIAL HANDLING", rfc: "TMH900218TY8", categoria: "Logística", saldo: 760, vencer_7d: 260, vencer_8_30d: 400, vencer_31_60d: 100, vencidas: 0 },
  { proveedor: "CARRIER COMMERCIAL", rfc: "CCM910424CR4", categoria: "Refrigeración", saldo: 720, vencer_7d: 0, vencer_8_30d: 500, vencer_31_60d: 220, vencidas: 0 },
  { proveedor: "CUMMINS MEXICANA", rfc: "CMM880515CM2", categoria: "Motores", saldo: 680, vencer_7d: 0, vencer_8_30d: 480, vencer_31_60d: 200, vencidas: 0 },
  { proveedor: "GE HEALTHCARE", rfc: "GEH900618GE5", categoria: "Equipo médico", saldo: 640, vencer_7d: 0, vencer_8_30d: 420, vencer_31_60d: 220, vencidas: 0 },
  { proveedor: "CASE NEW HOLLAND", rfc: "CNH950707CN1", categoria: "Maquinaria pesada", saldo: 600, vencer_7d: 0, vencer_8_30d: 380, vencer_31_60d: 220, vencidas: 0 },
  { proveedor: "MERCEDES-BENZ TRUCKS", rfc: "MBT890912MB7", categoria: "Transporte", saldo: 560, vencer_7d: 160, vencer_8_30d: 280, vencer_31_60d: 120, vencidas: 0 },
  { proveedor: "DELL TECHNOLOGIES MX", rfc: "DTM010320DL3", categoria: "Tecnología / IT", saldo: 520, vencer_7d: 0, vencer_8_30d: 320, vencer_31_60d: 200, vencidas: 0 },
  { proveedor: "BOBCAT MÉXICO", rfc: "BBC990515BC4", categoria: "Maquinaria pesada", saldo: 480, vencer_7d: 0, vencer_8_30d: 320, vencer_31_60d: 160, vencidas: 0 },
  { proveedor: "DAIKIN INDUSTRIAS", rfc: "DKI950818DK2", categoria: "Refrigeración", saldo: 440, vencer_7d: 0, vencer_8_30d: 280, vencer_31_60d: 160, vencidas: 0 },
  { proveedor: "ALFA LAVAL DE MÉXICO", rfc: "ALV880721AL6", categoria: "Procesos industriales", saldo: 420, vencer_7d: 0, vencer_8_30d: 280, vencer_31_60d: 140, vencidas: 0 },
  { proveedor: "EATON ELÉCTRICO", rfc: "ETN910410ET2", categoria: "Tecnología / IT", saldo: 380, vencer_7d: 0, vencer_8_30d: 250, vencer_31_60d: 130, vencidas: 0 },
  { proveedor: "FANUC ROBOTS", rfc: "FRC960320FN8", categoria: "Maquinaria industrial", saldo: 360, vencer_7d: 0, vencer_8_30d: 220, vencer_31_60d: 140, vencidas: 0 },
  { proveedor: "SANY HEAVY MX", rfc: "SHV120615SY9", categoria: "Maquinaria pesada", saldo: 340, vencer_7d: 0, vencer_8_30d: 200, vencer_31_60d: 140, vencidas: 0 },
  { proveedor: "VESTAS WIND SYSTEMS", rfc: "VWS080425VW3", categoria: "Energía", saldo: 320, vencer_7d: 0, vencer_8_30d: 210, vencer_31_60d: 110, vencidas: 0 },
  { proveedor: "HAULOTTE INDUSTRIAS", rfc: "HLT100819HL5", categoria: "Maquinaria industrial", saldo: 280, vencer_7d: 80, vencer_8_30d: 0, vencer_31_60d: 0, vencidas: 200 },
];

const WC_CREDIT_LINES = [
  { banco: "BBVA", linea: 500000, usado: 380000 },
  { banco: "Santander", linea: 300000, usado: 220000 },
  { banco: "Banorte", linea: 250000, usado: 175000 },
  { banco: "Banbajío", linea: 150000, usado: 95000 },
  { banco: "Banca Bursátil", linea: 400000, usado: 260000 },
  { banco: "Banamex", linea: 200000, usado: 110000 },
];

const WC_FLUJO_13W = [
  { sem: "S1", entrada: 18500, salida: 14200 },
  { sem: "S2", entrada: 14800, salida: 16500 },
  { sem: "S3", entrada: 22400, salida: 19200 },
  { sem: "S4", entrada: 19800, salida: 17600 },
  { sem: "S5", entrada: 15200, salida: 18900 },
  { sem: "S6", entrada: 21500, salida: 16800 },
  { sem: "S7", entrada: 18200, salida: 17200 },
  { sem: "S8", entrada: 24600, salida: 21400 },
  { sem: "S9", entrada: 17800, salida: 19500 },
  { sem: "S10", entrada: 22100, salida: 18400 },
  { sem: "S11", entrada: 19400, salida: 17800 },
  { sem: "S12", entrada: 25200, salida: 22600 },
  { sem: "S13", entrada: 18900, salida: 20100 },
];

const WC_PASIVOS_VENC = [
  { fecha: "2026-05-12", concepto: "Pago intereses BBVA línea revolvente", monto: 3200, tipo: "Banco" },
  { fecha: "2026-05-15", concepto: "Capital crédito Santander tramo 3", monto: 8500, tipo: "Banco" },
  { fecha: "2026-05-20", concepto: "Proveedor SIEMENS — adquisición equipo", monto: 4200, tipo: "Proveedor" },
  { fecha: "2026-05-22", concepto: "Cupón bono privado serie A", monto: 12400, tipo: "Bursátil" },
  { fecha: "2026-05-28", concepto: "Pago intereses Banorte", monto: 2900, tipo: "Banco" },
  { fecha: "2026-06-02", concepto: "Capital Banbajío tramo C", monto: 5100, tipo: "Banco" },
  { fecha: "2026-06-10", concepto: "Proveedor CATERPILLAR — entrega máquina", monto: 8800, tipo: "Proveedor" },
  { fecha: "2026-06-15", concepto: "Capital + intereses BBVA", monto: 15200, tipo: "Banco" },
  { fecha: "2026-06-22", concepto: "Renovación CEBURES serie B", monto: 28000, tipo: "Bursátil" },
  { fecha: "2026-07-05", concepto: "Renta arrendamiento corporativo", monto: 850, tipo: "Operativo" },
];

// ═══════════════════════════════════════════════
// WORKING CAPITAL — UI HELPERS
// ═══════════════════════════════════════════════
function CashFlowChart({ data, height = 160 }) {
  const max = Math.max(...data.flatMap(d => [d.entrada, d.salida]));
  let cum = 0;
  const cumPoints = data.map(d => { cum += (d.entrada - d.salida); return cum; });
  const cumMax = Math.max(...cumPoints, 0);
  const cumMin = Math.min(...cumPoints, 0);
  const cumRange = cumMax - cumMin || 1;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height, position: "relative" }}>
        {data.map((d, i) => {
          const neto = d.entrada - d.salida;
          const cumPos = cumPoints[i];
          const cumX = ((i + 0.5) / data.length) * 100;
          const cumY = 100 - ((cumPos - cumMin) / cumRange) * 80 - 10;
          return (
            <div key={d.sem} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, minWidth: 0, position: "relative", height: "100%", justifyContent: "flex-end" }}>
              <div style={{ display: "flex", gap: 1, height: "100%", alignItems: "flex-end", width: "100%", justifyContent: "center" }}>
                <div style={{ flex: 1, height: `${(d.entrada / max) * 100}%`, background: T.green, borderRadius: "2px 2px 0 0", minHeight: 2 }} title={`Entradas: ${fmtShort(d.entrada * 1000)}`} />
                <div style={{ flex: 1, height: `${(d.salida / max) * 100}%`, background: T.red, borderRadius: "2px 2px 0 0", minHeight: 2 }} title={`Salidas: ${fmtShort(d.salida * 1000)}`} />
              </div>
              <span style={{ fontSize: 9, color: T.textTertiary }}>{d.sem}</span>
              <span style={{ fontSize: 8, fontWeight: 800, color: neto >= 0 ? T.green : T.red, fontFamily: "'JetBrains Mono', monospace" }}>{neto >= 0 ? "+" : ""}{Math.round(neto / 100) / 10}M</span>
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: T.green }} /><span style={{ color: T.textSecondary }}>Entradas</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11 }}>
          <span style={{ width: 10, height: 10, borderRadius: 2, background: T.red }} /><span style={{ color: T.textSecondary }}>Salidas</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// WORKING CAPITAL — SECTION
// ═══════════════════════════════════════════════
function ArDetailView({ onBack }) {
  const totals = WC_AR_CLIENTES.reduce((s, c) => ({
    al_corriente: s.al_corriente + c.al_corriente,
    d1_30: s.d1_30 + c.d1_30,
    d31_60: s.d31_60 + c.d31_60,
    d61_90: s.d61_90 + c.d61_90,
    d90: s.d90 + c.d90,
  }), { al_corriente: 0, d1_30: 0, d31_60: 0, d61_90: 0, d90: 0 });
  const grandTotal = totals.al_corriente + totals.d1_30 + totals.d31_60 + totals.d61_90 + totals.d90;
  const morosos = WC_AR_CLIENTES.filter(c => (c.d31_60 + c.d61_90 + c.d90) > 0).length;
  const enMora = totals.d1_30 + totals.d31_60 + totals.d61_90 + totals.d90;
  const enMoraPct = (enMora / grandTotal) * 100;
  const columns = [
    { id: "cliente", label: "Cliente" },
    { id: "rfc", label: "RFC" },
    { id: "actividad", label: "Actividad" },
    { id: "ejecutivo", label: "Ejecutivo" },
    { id: "saldo", label: "Saldo total", sortValue: r => r.al_corriente + r.d1_30 + r.d31_60 + r.d61_90 + r.d90, defaultDir: "desc" },
    { id: "al_corriente", label: "Al corriente", defaultDir: "desc" },
    { id: "d1_30", label: "1–30 días", defaultDir: "desc" },
    { id: "d31_60", label: "31–60 días", defaultDir: "desc" },
    { id: "d61_90", label: "61–90 días", defaultDir: "desc" },
    { id: "d90", label: ">90 días", defaultDir: "desc" },
  ];
  const renderCell = (c, r) => {
    const total = r.al_corriente + r.d1_30 + r.d31_60 + r.d61_90 + r.d90;
    if (c.id === "cliente") return <span style={{ fontWeight: 700, color: T.text, fontSize: 12 }}>{r.cliente}</span>;
    if (c.id === "rfc") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textTertiary }}>{r.rfc}</span>;
    if (c.id === "actividad") return <span style={{ fontSize: 10, color: T.textSecondary }}>{r.actividad}</span>;
    if (c.id === "ejecutivo") return <span style={{ fontSize: 10, color: T.textSecondary }}>{r.ejecutivo}</span>;
    if (c.id === "saldo") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: T.navy }}>{fmtShort(total * 1000)}</span>;
    if (c.id === "al_corriente") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.al_corriente > 0 ? T.green : T.textTertiary }}>{r.al_corriente > 0 ? fmtShort(r.al_corriente * 1000) : "—"}</span>;
    if (c.id === "d1_30") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.d1_30 > 0 ? T.amber : T.textTertiary }}>{r.d1_30 > 0 ? fmtShort(r.d1_30 * 1000) : "—"}</span>;
    if (c.id === "d31_60") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.d31_60 > 0 ? "#7A4848" : T.textTertiary, fontWeight: r.d31_60 > 0 ? 700 : 400 }}>{r.d31_60 > 0 ? fmtShort(r.d31_60 * 1000) : "—"}</span>;
    if (c.id === "d61_90") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.d61_90 > 0 ? T.red : T.textTertiary, fontWeight: r.d61_90 > 0 ? 700 : 400 }}>{r.d61_90 > 0 ? fmtShort(r.d61_90 * 1000) : "—"}</span>;
    if (c.id === "d90") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.d90 > 0 ? "#5C2929" : T.textTertiary, fontWeight: r.d90 > 0 ? 800 : 400 }}>{r.d90 > 0 ? fmtShort(r.d90 * 1000) : "—"}</span>;
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <button onClick={onBack} style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: T.navy, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: "4px 0" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
        Capital de trabajo operativo
      </button>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.navy, margin: 0 }}>Cuentas por cobrar · Detalle por cliente</h2>
        <p style={{ fontSize: 12, color: T.textSecondary, margin: "4px 0 0" }}>Saldo y antigüedad de cartera por cliente · MXN</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <OpKpi icon="receipt_long" label="Saldo total CxC" value={fmtShort(grandTotal * 1000)} sub={`${WC_AR_CLIENTES.length} clientes`} accent={T.navy} />
        <OpKpi icon="check_circle" label="Al corriente" value={fmtShort(totals.al_corriente * 1000)} sub={`${((totals.al_corriente / grandTotal) * 100).toFixed(1)}% del saldo`} accent={T.green} />
        <OpKpi icon="warning" label="En mora" value={fmtShort(enMora * 1000)} sub={`${enMoraPct.toFixed(1)}% · ${morosos} clientes`} accent={T.amber} />
        <OpKpi icon="error" label=">90 días" value={fmtShort(totals.d90 * 1000)} sub={totals.d90 > 0 ? "Riesgo de incobrable" : "Sin saldos críticos"} accent={totals.d90 > 0 ? T.red : T.green} />
      </div>
      <ScrollTable
        columns={columns}
        rows={WC_AR_CLIENTES}
        gridCols="minmax(180px,1.6fr) 130px 120px 130px 110px 110px 100px 100px 100px 100px"
        minWidth={1280}
        renderCell={renderCell}
        defaultSortCol="saldo"
        defaultSortDir="desc"
      />
    </div>
  );
}

function ApDetailView({ onBack }) {
  const totals = WC_AP_PROVEEDORES.reduce((s, p) => ({
    saldo: s.saldo + p.saldo,
    vencer_7d: s.vencer_7d + p.vencer_7d,
    vencer_8_30d: s.vencer_8_30d + p.vencer_8_30d,
    vencer_31_60d: s.vencer_31_60d + p.vencer_31_60d,
    vencidas: s.vencidas + p.vencidas,
  }), { saldo: 0, vencer_7d: 0, vencer_8_30d: 0, vencer_31_60d: 0, vencidas: 0 });
  const provVencidos = WC_AP_PROVEEDORES.filter(p => p.vencidas > 0).length;
  const columns = [
    { id: "proveedor", label: "Proveedor" },
    { id: "rfc", label: "RFC" },
    { id: "categoria", label: "Categoría" },
    { id: "saldo", label: "Saldo total", defaultDir: "desc" },
    { id: "vencer_7d", label: "Por vencer ≤7d", defaultDir: "desc" },
    { id: "vencer_8_30d", label: "8–30 días", defaultDir: "desc" },
    { id: "vencer_31_60d", label: "31–60 días", defaultDir: "desc" },
    { id: "vencidas", label: "Vencidas", defaultDir: "desc" },
  ];
  const renderCell = (c, r) => {
    if (c.id === "proveedor") return <span style={{ fontWeight: 700, color: T.text, fontSize: 11 }}>{r.proveedor}</span>;
    if (c.id === "rfc") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: T.textTertiary }}>{r.rfc}</span>;
    if (c.id === "categoria") return <span style={{ fontSize: 10, color: T.textSecondary }}>{r.categoria}</span>;
    if (c.id === "saldo") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: T.navy }}>{fmtShort(r.saldo * 1000)}</span>;
    if (c.id === "vencer_7d") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.vencer_7d > 0 ? T.amber : T.textTertiary, fontWeight: r.vencer_7d > 0 ? 700 : 400 }}>{r.vencer_7d > 0 ? fmtShort(r.vencer_7d * 1000) : "—"}</span>;
    if (c.id === "vencer_8_30d") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.vencer_8_30d > 0 ? T.blue : T.textTertiary }}>{r.vencer_8_30d > 0 ? fmtShort(r.vencer_8_30d * 1000) : "—"}</span>;
    if (c.id === "vencer_31_60d") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.vencer_31_60d > 0 ? T.green : T.textTertiary }}>{r.vencer_31_60d > 0 ? fmtShort(r.vencer_31_60d * 1000) : "—"}</span>;
    if (c.id === "vencidas") return <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: r.vencidas > 0 ? T.red : T.textTertiary, fontWeight: r.vencidas > 0 ? 800 : 400 }}>{r.vencidas > 0 ? fmtShort(r.vencidas * 1000) : "—"}</span>;
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      <button onClick={onBack} style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: T.navy, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: "4px 0" }}>
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
        Capital de trabajo operativo
      </button>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: T.navy, margin: 0 }}>Cuentas por pagar · Detalle por proveedor</h2>
        <p style={{ fontSize: 12, color: T.textSecondary, margin: "4px 0 0" }}>Saldo y antigüedad por proveedor · MXN</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
        <OpKpi icon="payments" label="Saldo total CxP" value={fmtShort(totals.saldo * 1000)} sub={`${WC_AP_PROVEEDORES.length} proveedores`} accent={T.navy} />
        <OpKpi icon="schedule" label="Por vencer ≤7d" value={fmtShort(totals.vencer_7d * 1000)} sub="Pago crítico próximo" accent={T.amber} />
        <OpKpi icon="event" label="8–30 días" value={fmtShort(totals.vencer_8_30d * 1000)} sub="Pago programado" accent={T.blue} />
        <OpKpi icon="warning" label="Vencidas" value={fmtShort(totals.vencidas * 1000)} sub={provVencidos > 0 ? `${provVencidos} proveedor(es)` : "Sin vencidas"} accent={totals.vencidas > 0 ? T.red : T.green} />
      </div>
      <ScrollTable
        columns={columns}
        rows={WC_AP_PROVEEDORES}
        gridCols="minmax(180px,1.6fr) 120px minmax(140px,1fr) 110px 110px 110px 110px 100px"
        minWidth={1180}
        renderCell={renderCell}
        defaultSortCol="saldo"
        defaultSortDir="desc"
      />
    </div>
  );
}

function WorkingCapitalSection() {
  const [detail, setDetail] = useState(null); // null | "ar" | "ap"
  const cashTotal = WC_BANCOS.reduce((s, b) => s + b.saldo, 0);
  const cashLiq = WC_BANCOS.filter(b => b.cuenta.includes("operativa") || b.cuenta.includes("vista") || b.cuenta.includes("fondos")).reduce((s, b) => s + b.saldo, 0);
  const cashInv = cashTotal - cashLiq;

  const totalAR = WC_AR_AGING.reduce((s, a) => s + a.monto, 0);
  const arOk = WC_AR_AGING[0].monto;
  const arRiesgo = totalAR - arOk;
  const arRiesgoPct = (arRiesgo / totalAR) * 100;

  const totalAP = WC_AP_AGING.reduce((s, a) => s + a.monto, 0);
  const apVencidas = WC_AP_AGING.find(a => a.bucket === "Vencidas")?.monto || 0;

  const wcNeto = cashTotal + totalAR - totalAP;
  const dso = 12; // días promedio cobranza
  const dpo = 38;
  const ccc = dso - dpo;

  const totalLineas = WC_CREDIT_LINES.reduce((s, l) => s + l.linea, 0);
  const totalUsado = WC_CREDIT_LINES.reduce((s, l) => s + l.usado, 0);
  const utilizPct = (totalUsado / totalLineas) * 100;
  const disponible = totalLineas - totalUsado;

  const flujoNeto13w = WC_FLUJO_13W.reduce((s, w) => s + (w.entrada - w.salida), 0);
  const semanaCritica = WC_FLUJO_13W.find(w => (w.entrada - w.salida) < -2000);

  const tipoColors = { Banco: T.blue, Bursátil: T.purple, Proveedor: T.amber, Operativo: T.green };

  if (detail === "ar") return <ArDetailView onBack={() => setDetail(null)} />;
  if (detail === "ap") return <ApDetailView onBack={() => setDetail(null)} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .5s ease" }}>
      {/* Hero KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12 }}>
        <OpKpi icon="account_balance" label="Caja total disponible" value={fmtShort(cashTotal * 1000)} sub={`${WC_BANCOS.length} cuentas activas`} accent={T.navy} />
        <OpKpi icon="payments" label="Liquidez inmediata" value={fmtShort(cashLiq * 1000)} sub="Vista + 24h" accent={T.green} />
        <OpKpi icon="trending_up" label="Inversiones" value={fmtShort(cashInv * 1000)} sub="Plazo ≥ 28 días" accent={T.blue} />
        <OpKpi icon="receipt_long" label="Cuentas por cobrar" value={fmtShort(totalAR * 1000)} sub={`${arRiesgoPct.toFixed(1)}% en mora`} accent={T.amber} glow onClick={() => setDetail("ar")} />
        <OpKpi icon="payments" label="Cuentas por pagar" value={fmtShort(totalAP * 1000)} sub={apVencidas > 0 ? `${fmtShort(apVencidas * 1000)} vencidas` : "Sin vencidas"} accent={apVencidas > 0 ? T.red : T.purple} glow onClick={() => setDetail("ap")} />
        <OpKpi icon="schedule" label="Ciclo de conversión" value={`${ccc} d`} sub={`Cobro ${dso}d · Pago ${dpo}d`} accent={ccc < 0 ? T.green : T.amber} />
      </div>

      {/* Cash position + Credit lines */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)", gap: 14 }}>
        <div style={opCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Posición de caja por institución</h3>
            <span style={{ fontSize: 11, color: T.green, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(cashTotal * 1000)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[...WC_BANCOS].sort((a, b) => b.saldo - a.saldo).map((b, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1.4fr) 100px minmax(0, 1.4fr)", gap: 10, alignItems: "center", padding: "8px 10px", borderRadius: T.radiusSm, background: T.surfaceAlt }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: T.navy }}>{b.banco}</span>
                <span style={{ fontSize: 11, color: T.textSecondary }}>{b.cuenta}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: T.text, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{fmtShort(b.saldo * 1000)}</span>
                <div style={{ height: 5, borderRadius: 3, background: T.border, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(b.saldo / WC_BANCOS[0].saldo) * 100}%`, background: b.color, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={opCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Líneas de crédito</h3>
              <p style={{ fontSize: 11, color: T.textTertiary, margin: "2px 0 0" }}>Utilización por institución · MXN</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, color: T.textTertiary, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>Disponible</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: T.green, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(disponible * 1000)}</div>
            </div>
          </div>
          <div style={{ marginBottom: 14, padding: 10, background: T.blueLight, borderRadius: T.radiusSm, display: "flex", justifyContent: "space-between", fontSize: 11 }}>
            <span style={{ color: T.navy, fontWeight: 700 }}>Utilización global</span>
            <span style={{ color: T.navy, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{utilizPct.toFixed(1)}% · {fmtShort(totalUsado * 1000)} / {fmtShort(totalLineas * 1000)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {WC_CREDIT_LINES.map(l => {
              const pct = (l.usado / l.linea) * 100;
              const color = pct >= 85 ? T.red : pct >= 70 ? T.amber : T.green;
              return (
                <div key={l.banco}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 11 }}>
                    <span style={{ fontWeight: 700, color: T.text }}>{l.banco}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: T.navy, fontWeight: 700 }}>{fmtShort(l.usado * 1000)} / {fmtShort(l.linea * 1000)}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden", position: "relative" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4 }} />
                  </div>
                  <div style={{ fontSize: 9, color: T.textTertiary, marginTop: 2, fontWeight: 700 }}>{pct.toFixed(1)}% utilizada · {fmtShort((l.linea - l.usado) * 1000)} disponible</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Aging AR + AP */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
        <div style={opCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Antigüedad de cuentas por cobrar</h3>
            <span style={{ fontSize: 11, color: T.navy, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(totalAR * 1000)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {WC_AR_AGING.map(a => {
              const pct = (a.monto / totalAR) * 100;
              return (
                <div key={a.bucket} style={{ display: "grid", gridTemplateColumns: "120px minmax(0, 1fr) 90px 50px", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{a.bucket}</span>
                  <div style={{ height: 12, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: a.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{fmtShort(a.monto * 1000)}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: a.color, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{pct.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={opCard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Antigüedad de cuentas por pagar</h3>
            <span style={{ fontSize: 11, color: T.navy, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(totalAP * 1000)}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {WC_AP_AGING.map(a => {
              const pct = (a.monto / totalAP) * 100;
              return (
                <div key={a.bucket} style={{ display: "grid", gridTemplateColumns: "140px minmax(0, 1fr) 90px 50px", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.text }}>{a.bucket}</span>
                  <div style={{ height: 12, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: a.color, borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{fmtShort(a.monto * 1000)}</span>
                  <span style={{ fontSize: 11, fontWeight: 800, color: a.color, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{pct.toFixed(1)}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 13W cash flow */}
      <div style={opCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Proyección de flujo · 13 semanas</h3>
            <p style={{ fontSize: 11, color: T.textTertiary, margin: "2px 0 0" }}>Entradas vs salidas semanales · MXN</p>
          </div>
          <div style={{ display: "flex", gap: 18, textAlign: "right" }}>
            <div>
              <div style={{ fontSize: 9, color: T.textTertiary, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>Flujo neto 13s</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: flujoNeto13w >= 0 ? T.green : T.red, fontFamily: "'JetBrains Mono', monospace" }}>{flujoNeto13w >= 0 ? "+" : ""}{fmtShort(flujoNeto13w * 1000)}</div>
            </div>
            {semanaCritica && (
              <div>
                <div style={{ fontSize: 9, color: T.amber, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase" }}>⚠ Semana crítica</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: T.amber, fontFamily: "'JetBrains Mono', monospace" }}>{semanaCritica.sem}</div>
              </div>
            )}
          </div>
        </div>
        <CashFlowChart data={WC_FLUJO_13W} />
      </div>

      {/* Próximos vencimientos */}
      <div style={opCard}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: 0 }}>Vencimientos próximos · 90 días</h3>
          <span style={{ fontSize: 11, color: T.textTertiary }}>{WC_PASIVOS_VENC.length} compromisos</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {WC_PASIVOS_VENC.map((v, i) => {
            const days = Math.round((new Date(v.fecha) - new Date("2026-05-06")) / 86400000);
            const urgent = days <= 7;
            return (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 90px minmax(0, 1fr) 110px 70px", gap: 12, alignItems: "center", padding: "10px 12px", background: urgent ? T.amberLight : T.surfaceAlt, borderRadius: T.radiusSm, borderLeft: `3px solid ${tipoColors[v.tipo] || T.textSecondary}` }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: urgent ? T.amber : T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{v.fecha}</span>
                <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 3, background: `${tipoColors[v.tipo]}14`, color: tipoColors[v.tipo], fontWeight: 800, justifySelf: "start" }}>{v.tipo}</span>
                <span style={{ fontSize: 12, color: T.text, fontWeight: 500 }}>{v.concepto}</span>
                <span style={{ fontSize: 12, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>{fmtShort(v.monto * 1000)}</span>
                <span style={{ fontSize: 10, fontWeight: 800, color: urgent ? T.red : T.textSecondary, fontFamily: "'JetBrains Mono', monospace", textAlign: "right" }}>en {days}d</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brechas de liquidez */}
      <div style={opCard}>
        <h3 style={{ fontSize: 13, fontWeight: 800, color: T.navy, margin: "0 0 14px" }}>Brecha de liquidez por rango temporal</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
          {[
            { bucket: "≤ 7 días", entradas: 33300, salidas: 22200, color: T.green },
            { bucket: "8 – 30 días", entradas: 76800, salidas: 53700, color: T.blue },
            { bucket: "31 – 60 días", entradas: 71500, salidas: 64200, color: T.amber },
            { bucket: "61 – 90 días", entradas: 64600, salidas: 70500, color: T.red },
          ].map(b => {
            const neto = b.entradas - b.salidas;
            return (
              <div key={b.bucket} style={{ background: T.surfaceAlt, borderRadius: T.radiusSm, padding: 14, borderTop: `3px solid ${b.color}` }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: T.textTertiary, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: 8 }}>{b.bucket}</div>
                <div style={{ fontSize: 11, color: T.green, marginBottom: 2, fontFamily: "'JetBrains Mono', monospace" }}>↑ {fmtShort(b.entradas * 1000)}</div>
                <div style={{ fontSize: 11, color: T.red, marginBottom: 6, fontFamily: "'JetBrains Mono', monospace" }}>↓ {fmtShort(b.salidas * 1000)}</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: neto >= 0 ? T.green : T.red, fontFamily: "'JetBrains Mono', monospace" }}>{neto >= 0 ? "+" : ""}{fmtShort(neto * 1000)}</div>
                <div style={{ fontSize: 9, color: T.textTertiary, marginTop: 2 }}>{neto >= 0 ? "Superávit" : "Déficit"}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Capital de trabajo neto resumen */}
      <div style={{ ...opCard, background: `linear-gradient(135deg, ${T.blueLight}, ${T.surface})` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: T.text, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Capital de trabajo neto</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{fmtShort(wcNeto * 1000)}</div>
            <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 4 }}>Caja {fmtShort(cashTotal * 1000)} + AR {fmtShort(totalAR * 1000)} − AP {fmtShort(totalAP * 1000)}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 22 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, letterSpacing: 0.6, textTransform: "uppercase" }}>Prueba ácida</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: T.green, fontFamily: "'JetBrains Mono', monospace" }}>1.42×</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, letterSpacing: 0.6, textTransform: "uppercase" }}>Razón circulante</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: T.green, fontFamily: "'JetBrains Mono', monospace" }}>1.68×</div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, letterSpacing: 0.6, textTransform: "uppercase" }}>Días de caja</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>52 d</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// DETAIL VIEW
// ═══════════════════════════════════════════════
function DetailView({ client: c }) {
  const [tab, setTab] = useState("resumen");
  const tabs = [
    { id: "resumen", label: "Resumen" },
    { id: "empresa", label: "Empresa" },
    { id: "activo", label: "Información del Activo" },
    { id: "calificacion", label: "Calificación Ekatena" },
    { id: "financiero", label: "Financiero" },
    { id: "pasivos", label: "Pasivos" },
    { id: "buro", label: "Buró de Crédito" },
    { id: "conclusiones", label: "Análisis de Riesgos" },
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
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 28px", width: "100%", animation: "fadeIn .25s ease" }}>
        {tab === "resumen" && <TabResumen c={c} />}
        {tab === "empresa" && <TabEmpresa c={c} />}
        {tab === "activo" && <TabActivo c={c} />}
        {tab === "calificacion" && <TabCalificacion c={c} />}
        {tab === "financiero" && <TabFinanciero c={c} />}
        {tab === "pasivos" && <TabPasivos c={c} />}
        {tab === "buro" && <TabBuro c={c} />}
        {tab === "conclusiones" && <TabConclusiones c={c} />}
      </main>
    </>
  );
}

// -- EMPRESA (descripción general) --
function TabEmpresa({ c }) {
  const e = empresaFor(c);
  const servicios = SERVICIOS_BY_ACT[c.actividad] || ["Servicio principal", "Servicio secundario"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, animation: "fadeUp .4s ease" }}>
      <div style={{ ...card, gridColumn: "1 / -1" }}>
        {cardHead("Antecedentes")}
        <p style={{ padding: "14px 20px", fontSize: 13, color: T.text, lineHeight: 1.6, margin: 0 }}>{e.antecedentes}</p>
      </div>

      <div style={card}>
        {cardHead("Servicios y productos")}
        <div style={{ padding: 14 }}>
          {servicios.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderBottom: i < servicios.length - 1 ? `1px solid ${T.borderLight}` : "none" }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.blue }} />
              <span style={{ fontSize: 13, color: T.text }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={card}>
        {cardHead("Capacidad operativa", "Datos declarados por el cliente")}
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontSize: 10, color: T.textTertiary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Capacidad declarada</div>
            <div style={{ fontSize: 22, fontWeight: 900, color: T.navy, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>{e.capacidad}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: T.textTertiary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Antigüedad</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginTop: 4 }}>{c.antiguedad}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: T.textTertiary, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>Sector</div>
            <div style={{ fontSize: 13, color: T.text, marginTop: 4 }}>{c.giro}</div>
          </div>
        </div>
      </div>

      <div style={{ ...card, gridColumn: "1 / -1" }}>
        {cardHead("Instalaciones")}
        <div style={{ padding: 18, display: "grid", gridTemplateColumns: "180px 1fr", gap: 18, alignItems: "center" }}>
          {c.activo?.ilustracion ? (
            <img
              src={c.activo.ilustracion}
              alt={`Ilustración del activo — ${c.nombre}`}
              style={{ width: 180, height: 130, objectFit: "cover", borderRadius: T.radiusSm, border: `1px solid ${T.border}` }}
            />
          ) : (
            <div style={{ width: 180, height: 130, background: T.surfaceAlt, borderRadius: T.radiusSm, border: `1px dashed ${T.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: T.textTertiary }}>
              <span className="material-symbols-outlined" style={{ fontSize: 32 }}>image</span>
              <span style={{ fontSize: 10, marginTop: 6, fontWeight: 600 }}>Foto pendiente</span>
            </div>
          )}
          <div>
            <p style={{ fontSize: 13, color: T.text, lineHeight: 1.6, margin: 0 }}>{e.instalaciones}</p>
            <div style={{ marginTop: 12, fontSize: 11, color: T.textSecondary }}><strong>Domicilio:</strong> {c.direccion}</div>
          </div>
        </div>
      </div>

      <div style={{ ...card, gridColumn: "1 / -1" }}>
        {c.organigrama
          ? cardHead("Organigrama Directivo", "Estructura organizacional reportada por el cliente")
          : cardHead("Organigrama", "Visualización pendiente · cargar archivo desde drive")}
        {c.organigrama ? (
          <div style={{ padding: 18, background: T.surfaceAlt, overflowX: "auto" }}>
            <img
              src={c.organigrama}
              alt={`Organigrama directivo — ${c.nombre}`}
              style={{ width: "100%", minWidth: 720, height: "auto", borderRadius: T.radiusSm, border: `1px solid ${T.border}`, background: "#fff", display: "block" }}
            />
          </div>
        ) : (
          <div style={{ padding: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <div style={{ padding: "10px 22px", background: T.navy, color: "#fff", borderRadius: T.radiusSm, fontSize: 12, fontWeight: 700 }}>{c.obligadoSolidario || "Director General"}</div>
            <div style={{ width: 1, height: 22, background: T.border }} />
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
              {["Operaciones", "Finanzas", "Comercial", "Administración"].map(area => (
                <div key={area} style={{ padding: "8px 16px", background: T.blueLight, color: T.navy, borderRadius: T.radiusSm, fontSize: 11, fontWeight: 700, border: `1px solid ${T.blue}30` }}>{area}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -- CONCLUSIONES IA --
function TabConclusiones({ c }) {
  const r = generarConclusionesIA(c);
  const [comentarios, setComentarios] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, animation: "fadeUp .4s ease" }}>
      <div style={{ ...card, padding: 18, borderLeft: `4px solid ${T.blue}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: T.blue }}>psychology</span>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: T.navy, margin: 0 }}>Resumen ejecutivo · IA</h3>
        </div>
        <p style={{ fontSize: 13, color: T.text, margin: 0, lineHeight: 1.6 }}>
          {c.nombre} muestra un perfil <strong style={{ color: scoreColor(r.score) }}>{r.score >= 700 ? "controlado" : r.score >= 650 ? "moderado" : "elevado"}</strong> de riesgo con score Ekatena de <strong>{r.score}</strong>,
          cobertura de <strong>{r.cobertura.toFixed(1)}×</strong> y tendencia de ventas <strong>{r.tendVentas}</strong>. Margen EBITDA estimado en <strong>{(r.margen * 100).toFixed(1)}%</strong>.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        <ConclusionsBlock title="Fortalezas" icon="check_circle" color={T.green} items={r.fortalezas} />
        <ConclusionsBlock title="Riesgos detectados" icon="warning" color={T.red} items={r.riesgos} />
        <ConclusionsBlock title="Recomendaciones" icon="lightbulb" color={T.purple} items={r.recomendaciones} />
      </div>

      <div style={card}>
        {cardHead("Comentarios del equipo de Riesgos")}
        <div style={{ padding: 18 }}>
          <textarea value={comentarios} onChange={e => setComentarios(e.target.value)} rows={4}
            placeholder="Notas, validaciones o disclaimers del comité de riesgos..."
            style={{ ...inp, resize: "vertical", minHeight: 90 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
            <span style={{ fontSize: 11, color: T.textTertiary }}>Las conclusiones IA se actualizan al refrescar los EEFF del cliente.</span>
            <button style={{ padding: "9px 18px", background: T.navy, color: "#fff", border: "none", borderRadius: T.radiusSm, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Guardar comentarios</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// DETAIL VIEW (END)
// ═══════════════════════════════════════════════

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
  const [observaciones, setObservaciones] = useState(c.observaciones || "");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Hero strip — 3 cols always */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 14 }}>
        <div style={{ ...card, padding: 18, minWidth: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Razón Social</span>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", marginTop: 6, lineHeight: 1.25, wordBreak: "break-word" }}>{c.razonSocial}</div>
          <div style={{ fontSize: 11, color: T.textTertiary, fontFamily: "monospace", marginTop: 6 }}>{c.rfc}</div>
        </div>
        <div style={{ ...card, padding: 18, display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${sc}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 20, fontWeight: 900, color: sc, fontFamily: "'JetBrains Mono', monospace" }}>{c.calificacion.score}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Score Ekatena</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: sc, marginTop: 2 }}>Riesgo {c.calificacion.riesgo}</div>
            <div style={{ fontSize: 10, color: T.textTertiary, marginTop: 2 }}>Buró: {c.buroCredito.puntaje} · {c.buroCredito.gradoRiesgo}</div>
          </div>
        </div>
        <div style={{ ...card, padding: 18, minWidth: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8, marginBottom: 6 }}>Próximo Pago</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: c.diasParaPago <= 3 ? T.red : T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{c.proximoPago}</div>
          <div style={{ fontSize: 11, color: c.diasParaPago <= 3 ? T.red : T.textTertiary, fontWeight: c.diasParaPago <= 3 ? 700 : 500, marginTop: 4 }}>
            {c.diasParaPago <= 3 ? `⚠ Vence en ${c.diasParaPago} día${c.diasParaPago !== 1 ? "s" : ""}` : `En ${c.diasParaPago} días`}
          </div>
        </div>
      </div>

      {/* Datos generales + Cuadro Accionario · 2 cols */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)", gap: 14 }}>
        <div style={card}>
          {cardHead("Datos Generales")}
          <InfoRow label="Actividad / Giro" value={c.giro} accent />
          <InfoRow label="Constitución" value={`${c.fechaConstitucion} (${c.antiguedad})`} />
          <InfoRow label="Dirección" value={c.direccion} />
          <InfoRow label="Web" value={<a href={c.paginaWeb} target="_blank" rel="noreferrer" style={{ color: T.blue, textDecoration: "none", fontSize: 12 }}>{c.paginaWeb}</a>} />
          <InfoRow label="Obligado Solidario" value={c.obligadoSolidario} accent />
          <InfoRow label="Ejecutivo Comercial" value={c.ejecutivoComercial} />
        </div>
        <div style={card}>
          {cardHead("Cuadro Accionario")}
          {c.accionistas.map((a, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: i < c.accionistas.length - 1 ? `1px solid ${T.borderLight}` : "none", gap: 10 }}>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.nombre}</div>
                <div style={{ fontSize: 10, color: T.textTertiary, marginTop: 2 }}>{fmt(a.monto)}</div>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: a.porcentaje > 50 ? T.navy : T.textTertiary, fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>{a.porcentaje}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progreso + Observaciones · 2 cols */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)", gap: 14 }}>
        <div style={{ ...card, padding: 18 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8, marginBottom: 12 }}>Progreso de Pagos</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{c.pagosRealizados}/{c.pagosRealizados + c.pagosRestantes}</span>
            <span style={{ fontSize: 11, color: T.textTertiary }}>Saldo: {fmt(c.saldoPendiente)}</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: T.surfaceAlt, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progreso * 100}%`, borderRadius: 4, background: `linear-gradient(90deg, ${T.blue}, ${T.green})`, transition: "width 1s ease" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: T.textTertiary }}>
            <span>{c.pagosRealizados} realizados</span>
            <span>{c.pagosRestantes} restantes</span>
          </div>
        </div>
        <div style={{ ...card, padding: 18 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8, marginBottom: 8 }}>Observaciones</div>
          <textarea value={observaciones} onChange={e => setObservaciones(e.target.value)}
            placeholder="Escribe observaciones sobre este cliente..." rows={3}
            style={{ width: "100%", padding: "10px 12px", fontSize: 12, fontFamily: "inherit", color: T.text, background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 8, resize: "vertical", outline: "none", boxSizing: "border-box", lineHeight: 1.5, minHeight: 78 }}
            onFocus={e => e.target.style.borderColor = T.blue}
            onBlur={e => e.target.style.borderColor = T.border} />
        </div>
      </div>
    </div>
  );
}

// -- ACTIVO --
function TabActivo({ c }) {
  const a = c.activo;
  const contracts = contractsForClient(c);
  const [selectedId, setSelectedId] = useState("all");
  const selected = contracts.find(co => co.contrato === selectedId);
  const totalValor = contracts.reduce((s, co) => s + co.valorBienSinIVA, 0);
  const totalRenta = contracts.reduce((s, co) => s + co.rentasFijas, 0);
  const totalSaldo = contracts.reduce((s, co) => s + co.total, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {contracts.length > 0 && (
        <div style={{ ...card, padding: "14px 18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
            <div style={{ flex: "2 1 260px", minWidth: 0 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Activos del cliente</div>
              <select value={selectedId} onChange={e => setSelectedId(e.target.value)} style={{ ...inp, fontSize: 12, fontWeight: 600 }}>
                <option value="all">📋 Ver todos los contratos ({contracts.length})</option>
                {contracts.map(co => (
                  <option key={co.contrato} value={co.contrato}>{co.contrato} · {co.bien.length > 36 ? co.bien.slice(0,34) + "…" : co.bien}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, auto))", gap: 22, flex: "1 1 auto" }}>
              <ResumenStat label="Valor s/IVA" value={fmtShort(totalValor)} color={T.navy} />
              <ResumenStat label="Renta total" value={fmtShort(totalRenta)} color={T.green} />
              <ResumenStat label="Saldo" value={fmtShort(totalSaldo)} color={T.amber} />
            </div>
          </div>
        </div>
      )}

      {selectedId === "all" ? (
        <>
          {/* Contracts grid */}
          {contracts.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
              {contracts.map(co => (
                <button key={co.contrato} onClick={() => setSelectedId(co.contrato)} className="hover-lift"
                  style={{ ...card, padding: 0, cursor: "pointer", textAlign: "left", border: `1px solid ${T.border}`, fontFamily: "inherit", overflow: "hidden", minWidth: 0 }}>
                  <div style={{ padding: "12px 16px", borderBottom: `1px solid ${T.borderLight}`, background: T.surfaceAlt }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 800, color: T.navy, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{co.contrato}</span>
                      <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 3, background: T.blueLight, color: T.blue, fontWeight: 800, flexShrink: 0 }}>ID {co.idArr}</span>
                    </div>
                    <div style={{ fontSize: 11, color: T.textSecondary, marginTop: 5, lineHeight: 1.3 }}>{co.bien}</div>
                  </div>
                  <div style={{ padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <KpiSmall label="Valor s/IVA" value={fmtShort(co.valorBienSinIVA)} />
                    <KpiSmall label="Renta mensual" value={fmtShort(co.rentasFijas)} />
                    <KpiSmall label="Plazo" value={`${co.plazo} meses`} />
                    <KpiSmall label="Tasa / TIR" value={`${co.tasa}% / ${co.tir}%`} />
                    <KpiSmall label="Desembolso" value={co.fechaDesembolso} mono />
                    <KpiSmall label="Vencimiento" value={co.fechaVencimiento} mono />
                  </div>
                  <div style={{ padding: "9px 16px", borderTop: `1px solid ${T.borderLight}`, fontSize: 10, color: T.textTertiary, fontWeight: 700, letterSpacing: .8, textTransform: "uppercase", display: "flex", justifyContent: "space-between" }}>
                    <span>Ver detalle</span>
                    <span>→</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Existing expediente master view */}
          <div style={{ ...card, background: `linear-gradient(135deg, ${T.blueLight}, ${T.surface})`, padding: "18px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <div style={{ minWidth: 0, flex: "1 1 240px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Activo del expediente · USD</div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", margin: "4px 0 0" }}>{a.descripcionGeneral}</h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Total USD</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace" }}>{fmtUSD(a.totalGeneralUSD)}</div>
              </div>
            </div>
          </div>

          {a.ilustracion && (
            <div style={card}>
              {cardHead("Ilustración del Activo")}
              <div style={{ padding: 18, display: "flex", justifyContent: "center", background: T.surfaceAlt }}>
                <img
                  src={a.ilustracion}
                  alt={`Ilustración del activo — ${a.descripcionGeneral}`}
                  style={{ maxWidth: "100%", height: "auto", maxHeight: 460, borderRadius: T.radiusSm, border: `1px solid ${T.border}`, objectFit: "contain", background: "#fff" }}
                />
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
            {a.operaciones.map((op, oi) => (
              <div key={oi} style={card}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 18px", borderBottom: `1px solid ${T.borderLight}`, background: T.surfaceAlt }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: oi === 0 ? T.blue : T.amber }} />
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: T.navy, margin: 0, flex: 1 }}>{op.tipo}</h3>
                  <span style={{ fontSize: 14, fontWeight: 800, color: oi === 0 ? T.blue : T.amber, fontFamily: "'JetBrains Mono', monospace" }}>{fmtUSD(op.totalUSD)}</span>
                </div>
                {op.items.map((item, ii) => (
                  <div key={ii} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", borderBottom: ii < op.items.length - 1 ? `1px solid ${T.borderLight}` : "none", gap: 12 }}>
                    <span style={{ fontSize: 12, fontWeight: 500, color: T.text }}>{item.descripcion}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: T.textSecondary, fontFamily: "'Courier New', monospace", flexShrink: 0 }}>{fmtUSD(item.costoUSD)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div style={card}>
            {cardHead("Términos del Financiamiento (master)")}
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
                <div key={i} style={{ background: T.surface, padding: "11px 13px" }}>
                  <div style={{ fontSize: 9, fontWeight: 600, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .4, marginBottom: 3 }}>{item.l}</div>
                  <div style={{ fontSize: 12, fontWeight: item.b ? 800 : 600, color: item.b ? T.navy : T.text }}>{item.v}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : selected && <ContractDetailView contract={selected} />}
    </div>
  );
}

function KpiSmall({ label, value, mono }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 9, color: T.textTertiary, fontWeight: 700, letterSpacing: .8, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.navy, fontFamily: mono ? "'JetBrains Mono', monospace" : "inherit", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</div>
    </div>
  );
}

function ResumenStat({ label, value, color }) {
  return (
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 9, color: T.textTertiary, fontWeight: 700, letterSpacing: .8, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 16, fontWeight: 800, color, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{value}</div>
    </div>
  );
}

function ContractDetailView({ contract: co }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ ...card, background: `linear-gradient(135deg, ${T.blueLight}, ${T.surface})`, padding: "20px 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div style={{ minWidth: 0, flex: "1 1 240px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Contrato</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", margin: "4px 0 4px" }}>{co.contrato}</h2>
            <p style={{ fontSize: 12, color: T.textSecondary, margin: 0 }}>{co.bien}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: T.textTertiary, textTransform: "uppercase", letterSpacing: .8 }}>Valor s/IVA</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.navy, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>{fmt(co.valorBienSinIVA)}</div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        <div style={card}>
          {cardHead("Calendario")}
          <InfoRow label="Fecha desembolso" value={co.fechaDesembolso} mono />
          <InfoRow label="Fecha 1er pago" value={co.fecha1erPago} mono />
          <InfoRow label="Fecha vencimiento" value={co.fechaVencimiento} accent mono />
          <InfoRow label="Plazo" value={`${co.plazo} meses`} />
        </div>
        <div style={card}>
          {cardHead("Términos financieros")}
          <InfoRow label="Pago inicial" value={fmt(co.pagoInicial)} />
          <InfoRow label="Monto financiado" value={fmt(co.montoFinanciado)} accent />
          <InfoRow label="Tasa anual" value={`${co.tasa}%`} />
          <InfoRow label="TIR mensual" value={`${co.tir}%`} accent />
        </div>
        <div style={card}>
          {cardHead("Rentas")}
          <InfoRow label="Renta mensual" value={fmt(co.rentasFijas)} accent />
          <InfoRow label="Total rentas" value={fmt(co.totalRentas)} />
          <InfoRow label="Por devengar" value={fmt(co.rentaPorDevengar)} />
          <InfoRow label="Opción de compra" value={fmt(co.opcionCompra)} />
        </div>
        <div style={card}>
          {cardHead("Estatus de cuenta")}
          <InfoRow label="Saldo total" value={fmt(co.total)} accent />
          <InfoRow label="Al corriente" value={fmt(co.alCorriente)} />
          <InfoRow label="Vencido 30d" value={co.d30 > 0 ? fmt(co.d30) : "—"} />
          <InfoRow label="Vencido +90d" value={co.dmas90 > 0 ? fmt(co.dmas90) : "—"} />
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
const PASIVO_COLORS = {
  "BANAMEX": "#1F3A5F",
  "SANTANDER": "#7A4848",
  "BBVA": "#3D6792",
  "BANORTE": "#8B7355",
  "BANBAJIO": "#6B5876",
  "ACTIVE LEAS.": "#7A6A5A",
  "ENGEN CAP.": "#4A6B5C",
  "ARR. BANORTE": "#5C5C5C",
};

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
            const barColor = PASIVO_COLORS[d.institucion] || "#5C5C5C";
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < p.principales.length - 1 ? 10 : 0 }}>
                <span style={{ width: 90, fontSize: 11, fontWeight: 600, color: T.textSecondary, textAlign: "right", flexShrink: 0 }}>{d.institucion}</span>
                <div style={{ flex: 1, height: 24, background: T.surfaceAlt, borderRadius: 4, overflow: "hidden", position: "relative" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: barColor, borderRadius: 4 }} />
                </div>
                <span style={{ width: 50, fontSize: 11, fontWeight: 700, color: T.text, textAlign: "right", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}>{pct.toFixed(1)}%</span>
                <span style={{ width: 60, fontSize: 11, fontWeight: 600, color: T.textSecondary, textAlign: "right", flexShrink: 0 }}>{fmtShort(d.saldo)}</span>
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
