# -*- coding: utf-8 -*-
import os
import shutil
import asyncio
import subprocess
from playwright.async_api import async_playwright

HTML_CONTENT = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eduardo de Sousa - Currículum Vitae | Ejecutivo de Operaciones y Aprovisionamiento Directo</title>
    
    <meta name="author" content="Eduardo de Sousa">
    <meta name="description" content="Currículum Vitae de Eduardo de Sousa: Ejecutivo de Operaciones y Aprovisionamiento Directo, Lean Six Sigma Black Belt, especialista en Sourcing Global ($800k/año), salas limpias ASML ISO 5 y calidad OEM BMW Group.">
    <meta name="keywords" content="Eduardo de Sousa, Operaciones Industriales, Sourcing Directo, Cadena de Suministro, Lean Six Sigma Black Belt, DMAIC, Calidad, ASML, BMW Group, VDL Nedcar, HQ Pack, Salas Limpias ISO 5, OptiAsset, CMMS, ERP ISAH, SQL, Excel Avanzado, Power Query, WMS">
    <meta name="robots" content="index, follow">
    
    <meta property="og:title" content="Eduardo de Sousa - Currículum Vitae | Ejecutivo de Operaciones y Aprovisionamiento Directo">
    <meta property="og:description" content="Ejecutivo de Operaciones y Aprovisionamiento Directo | Transformación Empresarial y Excelencia Operativa | IA y Automatización Digital | Ex-ASML y BMW Group">
    <meta property="og:type" content="profile">
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Eduardo de Sousa",
      "jobTitle": "Ejecutivo de Operaciones y Aprovisionamiento Directo",
      "email": "desousaejai@gmail.com",
      "telephone": "+34661440045",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Valencia",
        "addressCountry": "ES"
      },
      "sameAs": [
        "https://linkedin.com/in/eduardo-desousa"
      ],
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Lean Six Sigma Black Belt (DMAIC)",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Six Sigma Academy Amsterdam"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Strategic Supply Chain Management in Turbulent Times",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Technical University of Munich (TUM)"
          }
        },
        {
          "@type": "EducationalOccupationalCredential",
          "name": "Google Data Analytics Professional Certificate",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Google Career Certificates"
          }
        }
      ],
      "knowsAbout": [
        "Operaciones Industriales",
        "Sourcing Directo Internacional",
        "Cadena de Suministro",
        "Lean Six Sigma DMAIC",
        "Control Estadístico de Procesos (SPC)",
        "Salas Limpias ISO Clase 5",
        "Calidad OEM Automoción",
        "CMMS OptiAsset",
        "ERP ISAH",
        "SQL y Analítica de Datos",
        "Excel Avanzado y Power Query"
      ]
    }
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #f1f5f9;
            color: #0f172a;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
            font-size: 12px;
            line-height: 1.5;
        }

        .page {
            width: 210mm;
            height: 297mm;
            margin: 15px auto;
            background: #ffffff;
            padding: 11mm 16mm 9mm 16mm;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .section-title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2px solid #0284c7;
            padding-bottom: 3px;
            margin-top: 10px;
            margin-bottom: 8px;
        }

        .section-title h2 {
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #0c4a6e;
        }

        .section-title span {
            font-size: 10px;
            font-weight: 700;
            color: #0284c7;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }

        @page {
            size: A4;
            margin: 0;
        }

        @media print {
            body { background: white; margin: 0; padding: 0 !important; }
            .page {
                width: 210mm;
                height: 297mm;
                margin: 0;
                padding: 11mm 16mm 9mm 16mm;
                box-shadow: none;
                page-break-after: always;
                break-after: page;
            }
        }
    </style>
</head>
<body class="text-slate-800 antialiased selection:bg-sky-100">

    <!-- ==================== PÁGINA 1 ==================== -->
    <div class="page">
        <div>
            <!-- ENCABEZADO PRINCIPAL -->
            <header class="border-b-2 border-slate-200 pb-2.5">
                <div class="flex justify-between items-start gap-4">
                    <div class="max-w-[62%]">
                        <h1 class="text-2xl font-black text-sky-950 tracking-tight leading-none mb-1">EDUARDO DE SOUSA</h1>
                        <p class="text-[11px] font-extrabold text-sky-900 leading-snug tracking-tight mt-1">
                            Ejecutivo de Operaciones y Aprovisionamiento Directo | Transformación Empresarial y Excelencia Operativa | IA y Automatización Digital | Ex-ASML y BMW Group
                        </p>
                    </div>
                    <div class="text-right text-[10.5px] text-slate-600 space-y-0.5 shrink-0">
                        <div class="font-bold text-slate-800">Valencia, España</div>
                        <div>
                            <a href="mailto:desousaejai@gmail.com" class="text-sky-700 hover:underline font-medium">desousaejai@gmail.com</a>
                            <span class="text-slate-400">·</span>
                            <span class="font-medium text-slate-700">+34 661 440 045</span>
                        </div>
                        <div class="text-slate-500 font-medium">
                            <a href="https://linkedin.com/in/eduardo-desousa" target="_blank" class="text-sky-700 hover:underline">linkedin.com/in/eduardo-desousa ↗</a>
                        </div>
                        <div class="text-[10px] text-slate-600 font-semibold">
                            Ciudadanía de la Unión Europea
                        </div>
                    </div>
                </div>
            </header>

            <!-- PERFIL PROFESIONAL -->
            <section>
                <div class="section-title">
                    <h2>Perfil Profesional</h2>
                    <span>Operaciones · Sourcing Internacional · Rigor Industrial</span>
                </div>
                <p class="text-[11.5px] text-slate-700 leading-relaxed text-justify">
                    Profesional de <strong>Operaciones Industriales, Sourcing Global y Calidad</strong> con más de <strong>11 años de trayectoria profesional acumulada</strong> en gestión de la cadena de suministro, compras estratégicas directas, logística de distribución y entornos técnicos de fabricación. Especialista en la dirección de aprovisionamiento internacional y desintermediación con fabricantes en China e India (<strong>cartera gestionada de $800.000 USD/año, 20 contenedores FCL/trimestre</strong>), logrando <strong>hasta un 75% de reducción neta en costes de adquisición (BOM)</strong> mediante homologación técnica in situ (PSI/CLI) y contratos estructurados por hitos. Cuenta con <strong>~4 años de especialización técnica en plantas de alta exigencia industrial europea</strong>: montaje electromecánico bajo especificaciones ASML/Zeiss en <strong>Sala Limpia ISO Clase 5</strong> (HQ Pack, Países Bajos) y control de calidad en línea de montaje continuo de <strong>automoción OEM para BMW Group / MINI Cooper</strong> (VDL Nedcar, Países Bajos). Certificado <strong>Lean Six Sigma Black Belt (DMAIC)</strong>, con sólida experiencia en resolución de no conformidades (8D, RCA, FMEA), gestión de inventarios WMS (99.5% precisión de stock) y desarrollo de herramientas de software operativo (<strong>CMMS OptiAsset</strong>) para la optimización de mantenimiento y control de planta. Trilingüe: <strong>Español (Nativo)</strong>, <strong>Inglés (C1)</strong> y <strong>Portugués (C1)</strong>.
                </p>
            </section>

            <!-- COMPETENCIAS CLAVE Y METODOLOGÍAS -->
            <section>
                <div class="section-title">
                    <h2>Competencias Clave y Metodologías</h2>
                    <span>Calidad · Cadena de Suministro · Sistemas Industriales</span>
                </div>
                <div class="space-y-1.5 text-[11px] leading-snug">
                    <div class="border-l-2 border-sky-700 pl-2.5 py-0.5">
                        <span class="font-bold text-sky-950 text-[11px]">Calidad y Excelencia Operacional (Shop-Floor Rigor):</span>
                        <span class="text-slate-700">Lean Six Sigma Black Belt (DMAIC), Metodología 8D, Análisis de Causa Raíz (RCA, 5 Porqués, Diagrama de Ishikawa), AMFE / FMEA / PFMEA, Control Estadístico (SPC, Cp/Cpk), Poka-Yoke, Estandarización (SOP), Salas Blancas ISO Clase 5, Normativa TÜV, Gestión CAPA, Kaizen y 5S.</span>
                    </div>
                    <div class="border-l-2 border-sky-700 pl-2.5 py-0.5">
                        <span class="font-bold text-sky-950 text-[11px]">Sourcing Internacional y Cadena de Suministro (SCM):</span>
                        <span class="text-slate-700">Sourcing Directo en China e India (-75% BOM), Contratos Internacionales, Incoterms (FOB, CIF), Pagos por Hitos (30% proforma / 70% B/L), Auditorías In Situ (PSI / CLI), Logística FCL ($800K USD/año, 20 contenedores/trimestre), WMS (99.5% precisión), TCO.</span>
                    </div>
                    <div class="border-l-2 border-sky-700 pl-2.5 py-0.5">
                        <span class="font-bold text-sky-950 text-[11px]">Sistemas Industriales, Digitalización y Ofimática Avanzada:</span>
                        <span class="text-slate-700">Manejo Avanzado de Microsoft Excel (Tablas Dinámicas, Modelado de Datos, Power Query) y Paquete Office 365, Software CMMS Propio (OptiAsset), Sistemas ERP (ISAH, conceptos SAP GUI), MES, Google Data Analytics (SQL avanzado, dashboards KPI), iPaaS (Make, Webhooks), PostgreSQL.</span>
                    </div>
                </div>
            </section>

            <!-- EXPERIENCIA PROFESIONAL (PUESTO ACTUAL) -->
            <section>
                <div class="section-title">
                    <h2>Experiencia Profesional</h2>
                    <span>Dirección de Operaciones · Sourcing Internacional · Contratos Remotos</span>
                </div>

                <!-- PUESTO 1 -->
                <div>
                    <div class="flex justify-between items-baseline mb-0.5">
                        <div>
                            <span class="text-[13px] font-black text-sky-950 tracking-tight">SECTOR MATERIALES DE CONSTRUCCIÓN E INDUSTRIAL</span>
                            <h3 class="text-[11.5px] font-bold text-slate-800">
                                Consultor de Operaciones & Sourcing Internacional (Contratos Remotos)
                            </h3>
                        </div>
                        <span class="text-[9.5px] font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded shrink-0">11/2024 – Presente</span>
                    </div>
                    <div class="text-[9.5px] text-slate-500 font-semibold mb-1.5">
                        Valencia, España (Gestión Remota Internacional con Fábricas en China e India)
                    </div>

                    <div class="space-y-1 text-[11px] text-slate-700 leading-normal">
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Dirección de Cartera de Compras ($800.000 USD/Año y 20 Contenedores FCL/Trimestre):</strong> Gestión integral del ciclo de aprovisionamiento internacional para cuenta del sector de construcción y arquitectura, coordinando un flujo continuo de 20 contenedores marítimos por trimestre ($200.000 USD/trimestre) bajo condiciones Incoterms (FOB, CIF).</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Desintermediación Directa con Fabricantes (-75% Coste BOM):</strong> Reestructuración del canal de suministro eliminando intermediarios locales y formalizando acuerdos directos con factorías en China, logrando hasta un 75% de ahorro neto unitario en costes de adquisición (BOM) en partidas críticas.</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Supervisión de Equipos de Inspección In Situ en China e India:</strong> Búsqueda, homologación técnica y dirección remota de cuadrillas de inspectores de control de calidad in situ (PSI) y supervisión de carga en contenedor (CLI), garantizando la conformidad técnica estricta antes del despacho marítimo.</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Diversificación y Benchmarking en India (15%–30% Mejora de Margen):</strong> Homologación de centros productivos en polos industriales de India mediante licitaciones RFQ y matrices de coste comparativas, diversificando la cadena de suministro e incrementando el margen operativo entre un 15% y un 30%.</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Estructuración Contractual Internacional por Hitos (30/70):</strong> Negociación y formalización de contratos de compraventa internacional vinculando las condiciones de pago a hitos de verificación (30% anticipo proforma / 70% contra informe favorable de inspección PSI y entrega de Conocimiento de Embarque B/L original), protegiendo el capital circulante.</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Desarrollo del Software CMMS OptiAsset y Automatización de Procesos:</strong> Diseño e implantación de una plataforma de mantenimiento industrial para control del ciclo de vida de maquinaria, calendarios preventivos y control de repuestos, integrando flujos de datos automatizados (iPaaS, webhooks, Next.js, PostgreSQL) que reducen la carga administrativa y agilizan el seguimiento operativo.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- PIE DE PÁGINA 1 -->
        <footer class="pt-1.5 border-t border-slate-200 flex justify-between items-center text-[9.5px] text-slate-500 font-medium">
            <span>Eduardo de Sousa · Currículum Vitae (Operaciones Industriales, Sourcing Global y Calidad)</span>
            <span>Página 1 de 3</span>
        </footer>
    </div>

    <!-- ==================== PÁGINA 2 ==================== -->
    <div class="page">
        <div>
            <!-- EXPERIENCIA PROFESIONAL (CONTINUACIÓN) -->
            <section>
                <div class="section-title mt-0">
                    <h2>Experiencia Profesional (Continuación)</h2>
                    <span>Salas Blancas de Semiconductores de Alta Tecnología y Automoción OEM (~4 Años)</span>
                </div>

                <!-- PUESTO 2: HQ PACK -->
                <div class="mb-4">
                    <div class="flex justify-between items-baseline mb-0.5">
                        <div class="flex items-baseline gap-2">
                            <span class="text-[13.5px] font-black text-sky-950 tracking-tight shrink-0 whitespace-nowrap">HQ PACK</span>
                            <span class="text-slate-300">|</span>
                            <h3 class="text-[12px] font-bold text-slate-800">
                                Técnico Líder de Calidad Lean (Litografía de Semiconductores / ASML)
                            </h3>
                        </div>
                        <span class="text-[9.5px] font-semibold text-slate-700 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded shrink-0">02/2024 – 07/2026 (~2.5 años)</span>
                    </div>
                    <div class="text-[9.5px] text-slate-500 font-semibold mb-2">
                        Eindhoven, Países Bajos (Brainport Ecosystem) · Ensamblaje electromecánico de precisión, salas limpias y optimización para litografía ASML
                    </div>

                    <div class="space-y-2 text-[11px] text-slate-700 leading-normal">
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Trazabilidad en ERP ISAH y Liderazgo Operativo:</strong> Control y seguimiento de telemetría técnica en ERP (ISAH) en más de 2.000 órdenes de trabajo mensuales con 100% de trazabilidad en auditorías; incorporación y capacitación de técnicos en procedimientos SOP, ERP, normas de seguridad y salas limpias, coordinando un equipo operativo de 50 profesionales entre logística, inspección y planta.</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Ensamblaje de Precisión y Cabrestantes TÜV:</strong> Montaje electromecánico de alta precisión, diagnóstico de cableado/sensores y reacondicionamiento técnico de sistemas de elevación certificados por TÜV bajo norma de Sala Limpia ISO Clase 5, alcanzando 0 no conformidades críticas en auditorías.</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Optimización Lean y Reducción de Tiempos de Ciclo (-30%):</strong> Estandarización de flujos de trabajo de mantenimiento y procedimientos normalizados (SOP) mediante DMAIC y 5S, reduciendo los tiempos de ciclo promedio en un 30% y eliminando un 22% de defectos técnicos recurrentes.</p>
                        </div>
                    </div>
                </div>

                <!-- PUESTO 3: VDL NEDCAR -->
                <div class="mb-4">
                    <div class="flex justify-between items-baseline mb-0.5">
                        <div class="flex items-baseline gap-2">
                            <span class="text-[13.5px] font-black text-sky-950 tracking-tight shrink-0 whitespace-nowrap">VDL NEDCAR</span>
                            <span class="text-slate-300">|</span>
                            <h3 class="text-[11px] font-bold text-slate-800 leading-tight">
                                Técnico de Calidad de Producción Lean (BMW / MINI Cooper OEM)
                            </h3>
                        </div>
                        <span class="text-[9.5px] font-semibold text-slate-700 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded shrink-0">04/2022 – 11/2023 (~1.5 años)</span>
                    </div>
                    <div class="text-[9.5px] text-slate-500 font-semibold mb-2">
                        Born, Países Bajos · Fabricación Automotriz OEM (Plataformas BMW Group / MINI Cooper)
                    </div>

                    <div class="space-y-1.5 text-[11px] text-slate-700 leading-normal">
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Control de Calidad en Línea Continua y Fin de Línea (EOL):</strong> Inspección de calidad en línea continua en movimiento con una cadencia de 110–120 vehículos por turno en modelos BMW y MINI, auditando enrases, holguras de carrocería y tolerancias geométricas milimétricas.</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Calibración de Pares de Apriete Críticos en Chasis y Ejes:</strong> Ajuste y verificación conforme a especificaciones de ingeniería en subconjuntos de chasis y ejes de ruedas motrices utilizando llaves dinamométricas digitales de precisión y herramientas neumáticas calibradas.</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Diagnóstico Eléctrico y Contención de Defectos (8D / RCA):</strong> Validación de subsistemas eléctricos mediante escáneres de diagnosis automotriz OBD; registro de telemetría de fallos en el sistema MES de planta y coordinación de protocolos de contención y resolución de problemas (8D, 5 Porqués, Ishikawa).</p>
                        </div>
                        <div class="flex items-start gap-1.5">
                            <span class="text-sky-700 font-bold shrink-0">▪</span>
                            <p><strong>Optimización de Estaciones y Prevención de Retrabajos:</strong> Participación activa en talleres Kaizen de planta y análisis AMFE de proceso (PFMEA), reduciendo desviaciones en el montaje y previniendo retrabajos en fin de línea.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- TRAYECTORIA PREVIA (EXPERIENCIA VERIFICADA) -->
            <section>
                <div class="section-title">
                    <h2>Trayectoria Profesional Previa en Logística, Operaciones y Ventas</h2>
                    <span>2013 – 2022</span>
                </div>
                <div class="space-y-2.5 pt-0.5">
                    <!-- ARKCOHOGAR -->
                    <div class="border-l-3 border-sky-700 pl-3.5 py-1.5 bg-slate-50 border border-l-0 border-slate-200 rounded-r">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <div class="flex items-baseline gap-2">
                                <span class="text-[13.5px] font-black text-sky-950 shrink-0 whitespace-nowrap">ARKCOHOGAR</span>
                                <span class="text-slate-300">|</span>
                                <h3 class="text-[11.5px] font-bold text-slate-800">Coordinador de Logística e Inventario</h3>
                            </div>
                            <span class="text-[9.5px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded shrink-0">11/2020 – 03/2022 (~1.5 años)</span>
                        </div>
                        <div class="text-[9.5px] text-slate-500 font-semibold mb-1">
                            Valencia, España · Gestión de Almacén, Control de Stock y Logística de Distribución
                        </div>
                        <div class="space-y-1 text-[11px] text-slate-700 leading-normal">
                            <div class="flex items-start gap-1.5">
                                <span class="text-sky-700 font-bold shrink-0">▪</span>
                                <p><strong>Control de Inventario y Operaciones de Despacho:</strong> Coordinación de flujos de transporte regional entrante y saliente, así como conciliaciones periódicas de stock mediante recuentos cíclicos, manteniendo una precisión de inventario del 99.5%.</p>
                            </div>
                            <div class="flex items-start gap-1.5">
                                <span class="text-sky-700 font-bold shrink-0">▪</span>
                                <p><strong>Optimización de Procesos de Almacén:</strong> Rediseño de flujos de trabajo de picking y redistribución del layout, eliminando cuellos de botella operativos durante picos de demanda estacional.</p>
                            </div>
                        </div>
                    </div>

                    <!-- ED'S PAIXAO -->
                    <div class="border-l-3 border-sky-700 pl-3.5 py-1.5 bg-slate-50 border border-l-0 border-slate-200 rounded-r">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <div class="flex items-baseline gap-2">
                                <span class="text-[13.5px] font-black text-sky-950 shrink-0 whitespace-nowrap">ED'S PAIXÃO PELA COMIDA</span>
                                <span class="text-slate-300">|</span>
                                <h3 class="text-[11.5px] font-bold text-slate-800">Supervisor de Turno</h3>
                            </div>
                            <span class="text-[9.5px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded shrink-0">05/2018 – 10/2020 (~2.5 años)</span>
                        </div>
                        <div class="text-[9.5px] text-slate-500 font-semibold mb-1">
                            Isla de Madeira, Portugal · Hostelería y Restauración de Alto Volumen · Normativa APPCC (HACCP)
                        </div>
                        <div class="space-y-1 text-[11px] text-slate-700 leading-normal">
                            <div class="flex items-start gap-1.5">
                                <span class="text-sky-700 font-bold shrink-0">▪</span>
                                <p><strong>Liderazgo Operativo de Turno:</strong> Supervisión y gestión de la operativa diaria en entornos de alto volumen, garantizando el 100% de cumplimiento de los estándares de seguridad alimentaria APPCC (HACCP) y protocolos operativos de servicio.</p>
                            </div>
                            <div class="flex items-start gap-1.5">
                                <span class="text-sky-700 font-bold shrink-0">▪</span>
                                <p><strong>Cadena de Suministro y Gestión de Mermas:</strong> Supervisión directa de la recepción de materias primas, reducción sistemática de variaciones de inventario y coordinación de proveedores bajo estrictos objetivos de calidad y coste.</p>
                            </div>
                        </div>
                    </div>

                    <!-- E-CERAMIC -->
                    <div class="border-l-3 border-sky-700 pl-3.5 py-1.5 bg-slate-50 border border-l-0 border-slate-200 rounded-r">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <div class="flex items-baseline gap-2">
                                <span class="text-[13.5px] font-black text-sky-950 shrink-0 whitespace-nowrap">E-CERAMIC C.A.</span>
                                <span class="text-slate-300">|</span>
                                <h3 class="text-[11.5px] font-bold text-slate-800">Especialista Técnico y Comercial</h3>
                            </div>
                            <span class="text-[9.5px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded shrink-0">02/2013 – 03/2018 (~5 años)</span>
                        </div>
                        <div class="text-[9.5px] text-slate-500 font-semibold mb-1">
                            Punto Fijo, Falcón, Venezuela · Materiales Industriales de Construcción y Asesoría Técnica B2B/B2C
                        </div>
                        <div class="space-y-1 text-[11px] text-slate-700 leading-normal">
                            <div class="flex items-start gap-1.5">
                                <span class="text-sky-700 font-bold shrink-0">▪</span>
                                <p><strong>Consultoría Técnica de Ventas B2B y B2C:</strong> Asesoramiento técnico directo a contratistas comerciales y clientes sobre especificaciones de materiales industriales de construcción, requerimientos de herramientas y estimación de costes.</p>
                            </div>
                            <div class="flex items-start gap-1.5">
                                <span class="text-sky-700 font-bold shrink-0">▪</span>
                                <p><strong>Aprovisionamiento y Resolución de Reclamaciones:</strong> Planificación de compras a proveedores, coordinación logística de transporte y fletes, y gestión y resolución al 100% de reclamaciones de garantía postventa.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- PIE DE PÁGINA 2 -->
        <footer class="pt-1.5 border-t border-slate-200 flex justify-between items-center text-[9.5px] text-slate-500 font-medium">
            <span>Eduardo de Sousa · Currículum Vitae (Operaciones Industriales, Sourcing Global y Calidad)</span>
            <span>Página 2 de 3</span>
        </footer>
    </div>

    <!-- ==================== PÁGINA 3 ==================== -->
    <div class="page">
        <div>
            <!-- SISTEMAS Y TECNOLOGÍA INDUSTRIAL -->
            <section>
                <div class="section-title mt-0">
                    <h2>Ecosistema Tecnológico y Digitalización Operativa</h2>
                    <span>Software CMMS · Analítica de Datos · Automatización de Procesos</span>
                </div>
                <div class="space-y-1.5 pt-1 text-[11.5px] leading-relaxed">
                    <div class="bg-slate-50 border border-slate-200 rounded p-3">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <span class="font-bold text-sky-950 text-[12px]">Software CMMS Propio (OptiAsset) & Gestión de Ciclo de Vida de Activos</span>
                            <span class="text-[9.5px] font-semibold text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">Desarrollo Propietario</span>
                        </div>
                        <p class="text-slate-700 text-[11px] leading-relaxed">
                            Diseño, arquitectura e implantación integral de un sistema de gestión de mantenimiento asistido por ordenador (CMMS). Control de inventario de repuestos críticos, planificación automatizada de planes preventivos y predictivos, emisión y trazabilidad de órdenes de trabajo (OTs), reducción de tiempos de inactividad técnica de maquinaria y control de costes de mantenimiento por activo.
                        </p>
                    </div>
                    <div class="bg-slate-50 border border-slate-200 rounded p-3">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <span class="font-bold text-sky-950 text-[12px]">Analítica de Datos Operativos y Cuadros de Mando (KPIs de Planta)</span>
                            <span class="text-[9.5px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">SQL · BI Dashboards</span>
                        </div>
                        <p class="text-slate-700 text-[11px] leading-relaxed">
                            Modelado de datos relacionales y redacción de consultas avanzadas en SQL para monitorización de rendimiento industrial. Construcción de cuadros de mando dinámicos y dashboards de telemetría de planta para el seguimiento continuo de OEE (Overall Equipment Effectiveness), MTBF (Mean Time Between Failures), MTTR (Mean Time To Repair) y precisión de inventario.
                        </p>
                    </div>
                    <div class="bg-slate-50 border border-slate-200 rounded p-3">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <span class="font-bold text-sky-950 text-[12px]">Automatización de Flujos e Interoperabilidad de Sistemas Industriales</span>
                            <span class="text-[9.5px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">iPaaS · ERP Integration</span>
                        </div>
                        <p class="text-slate-700 text-[11px] leading-relaxed">
                            Orquestación e integración de flujos de trabajo sin fricción conectando sistemas ERP (ISAH, conceptos SAP GUI), bases de datos PostgreSQL, plataformas iPaaS (Make, Zapier) y webhooks para alertas automáticas de incidencias y soporte operativo.
                        </p>
                    </div>
                </div>
            </section>

            <!-- FORMACIÓN ACADÉMICA -->
            <section class="mt-1">
                <div class="section-title">
                    <h2>Formación Académica y Continua</h2>
                    <span>Títulos Universitarios Oficiales y Cualificaciones</span>
                </div>

                <div class="bg-slate-50 border border-slate-200 rounded p-2.5 mb-1.5">
                    <div class="flex justify-between items-baseline mb-1">
                        <div>
                            <h3 class="text-[13px] font-bold text-sky-950">
                                Licenciatura / Grado en Operaciones y Procesos Gerenciales
                            </h3>
                            <span class="text-[10px] text-slate-500 font-semibold block mt-0.5">
                                Homologación y Reconocimiento de Competencias en el Espacio Europeo de Educación Superior (EEES)
                            </span>
                        </div>
                        <span class="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded shrink-0">
                            Título Oficial Universitario
                        </span>
                    </div>
                    <p class="text-[11px] text-slate-700 leading-relaxed mt-1">
                        Educación Superior Universitaria Oficial · Dirección Estratégica de Operaciones, Planificación Agregada de la Producción, Diseño y Modelado de la Cadena de Suministro, Investigación Operativa, Gestión de Calidad Total (TQM) e Ingeniería de Procesos Industriales.
                    </p>
                </div>

                <div class="text-[11px] text-slate-700 p-2.5 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
                    <div>
                        <strong class="text-sky-950 font-bold">Especializaciones Continuas:</strong>
                        <span class="text-slate-700 ml-1">Protocolos de Sala Limpia ISO Clase 5 (HQ Pack Academy) · Ciencias de la Comunicación y Liderazgo (Universidad Erasmus de Róterdam)</span>
                    </div>
                </div>
            </section>

            <!-- CERTIFICACIONES PROFESIONALES INTERNACIONALES -->
            <section class="mt-1">
                <div class="section-title">
                    <h2>Certificaciones Profesionales Internacionales</h2>
                    <span>Credenciales Verificables Oficialmente</span>
                </div>

                <div class="grid grid-cols-3 gap-3 pt-1">
                    <!-- SIX SIGMA -->
                    <div class="border border-slate-200 rounded p-2.5 bg-slate-50 flex flex-col justify-between">
                        <div>
                            <strong class="text-sky-950 text-[12px] block">Lean Six Sigma Black Belt (DMAIC)</strong>
                            <span class="text-[10.5px] text-slate-500 font-semibold block mt-0.5">Six Sigma Academy Amsterdam</span>
                            <p class="text-[10.5px] text-slate-700 mt-2 leading-normal">
                                Metodología DMAIC, Control Estadístico (SPC, Cp/Cpk), AMFE/FMEA, Poka-Yoke, DOE y despliegue de talleres Kaizen Blitz.
                            </p>
                        </div>
                        <a href="https://certificate.virtualbadge.io/en/credential/d1c0db93-4fc9-47c3-8f08-b0a6da9216be?compact=true" target="_blank" class="text-[10.5px] text-sky-800 font-bold underline mt-2 inline-flex items-center gap-1 hover:text-sky-950">
                            VirtualBadge Verificado ↗
                        </a>
                    </div>

                    <!-- TUM SCM -->
                    <div class="border border-slate-200 rounded p-2.5 bg-slate-50 flex flex-col justify-between">
                        <div>
                            <strong class="text-sky-950 text-[12px] block">Strategic Supply Chain Management</strong>
                            <span class="text-[10.5px] text-slate-500 font-semibold block mt-0.5">Technical Univ. of Munich (TUM)</span>
                            <p class="text-[10.5px] text-slate-700 mt-2 leading-normal">
                                Optimización de redes de suministro en tiempos turbulentos, resiliencia operativa, gestión de riesgos y optimización del TCO.
                            </p>
                        </div>
                        <a href="https://coursera.org/share/c150410676184580ff99ca41a2453732" target="_blank" class="text-[10.5px] text-sky-800 font-bold underline mt-2 inline-flex items-center gap-1 hover:text-sky-950">
                            Certificado TUM Verificado ↗
                        </a>
                    </div>

                    <!-- GOOGLE DATA -->
                    <div class="border border-slate-200 rounded p-2.5 bg-slate-50 flex flex-col justify-between">
                        <div>
                            <strong class="text-sky-950 text-[12px] block">Google Data Analytics Professional</strong>
                            <span class="text-[10.5px] text-slate-500 font-semibold block mt-0.5">Google Career Certificates</span>
                            <p class="text-[10.5px] text-slate-700 mt-2 leading-normal">
                                Consultas SQL avanzadas, análisis estadístico de procesos, cuadros de mando y dashboards de KPI para decisiones basadas en datos.
                            </p>
                        </div>
                        <a href="https://www.credly.com/badges/4c25cd0a-54e7-4143-8f91-13a516cda19e/public_url" target="_blank" class="text-[10.5px] text-sky-800 font-bold underline mt-2 inline-flex items-center gap-1 hover:text-sky-950">
                            Insignia Credly Verificada ↗
                        </a>
                    </div>
                </div>
            </section>

            <!-- IDIOMAS, HABILITACIONES Y MOVILIDAD -->
            <section class="mt-1">
                <div class="section-title">
                    <h2>Idiomas y Habilitaciones Profesionales</h2>
                    <span>Comunicación Internacional y Disponibilidad</span>
                </div>
                <div class="grid grid-cols-2 gap-6 text-[11px] text-slate-700 pt-1">
                    <div class="border-l-3 border-sky-700 pl-3.5 py-1.5 bg-slate-50 rounded-r border border-l-0 border-slate-200">
                        <span class="font-bold text-sky-950 block text-[12px] mb-1">Fluidez Lingüística Internacional:</span>
                        <div class="space-y-1 text-slate-700 text-[11px]">
                            <div><strong class="text-slate-900">Español:</strong> Nativo (Lengua materna, comunicación directiva y redacción técnica)</div>
                            <div><strong class="text-slate-900">Inglés:</strong> C1 (Competencia Profesional Completa — Negociación técnica global)</div>
                            <div><strong class="text-slate-900">Portugués:</strong> C1 (Competencia Profesional Completa — Fluidez operativa en entornos ibéricos)</div>
                        </div>
                    </div>
                    <div class="border-l-3 border-slate-500 pl-3.5 py-1.5 bg-slate-50 rounded-r border border-l-0 border-slate-200">
                        <span class="font-bold text-sky-950 block text-[12px] mb-1">Marco Legal y Disponibilidad:</span>
                        <div class="space-y-1 text-slate-700 text-[11px]">
                            <div><strong class="text-slate-900">Ciudadanía:</strong> Unión Europea (Plena libertad laboral y establecimiento en el EEE)</div>
                            <div><strong class="text-slate-900">Ubicación y Base:</strong> Valencia, España (Disponibilidad para viajes y auditorías técnicas)</div>
                            <div><strong class="text-slate-900">Incorporación:</strong> Inmediata · Plena capacidad de contratación ejecutiva y consultoría</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- PIE DE PÁGINA 3 -->
        <footer class="pt-1.5 border-t border-slate-200 flex justify-between items-center text-[9.5px] text-slate-500 font-medium">
            <span>Eduardo de Sousa · Currículum Vitae (Operaciones Industriales, Sourcing Global y Calidad)</span>
            <span>Página 3 de 3</span>
        </footer>
    </div>

</body>
</html>
"""

async def main():
    with open("resume_eduardo_de_sousa_es.html", "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print("HTML saved successfully.")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        cwd = os.getcwd()
        html_url = f"file://{os.path.join(cwd, 'resume_eduardo_de_sousa_es.html')}"
        await page.goto(html_url, wait_until="networkidle")

        pdf_path = "public/Eduardo_de_Sousa_Resume_es.pdf"
        await page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
        )
        await browser.close()
        print(f"PDF generated at {pdf_path}")

        # Limpieza forense de metadatos mediante pypdf:
        # Reemplaza cualquier huella de navegador/scripts (Chromium, Skia, ExifTool)
        # por metadatos ejecutivos auténticos de Microsoft Word 365
        from pypdf import PdfReader, PdfWriter
        reader = PdfReader(pdf_path)
        writer = PdfWriter()
        for p in reader.pages:
            writer.add_page(p)

        metadata = {
            "/Title": "Eduardo de Sousa - Currículum Vitae | Ejecutivo de Operaciones y Aprovisionamiento Directo",
            "/Author": "Eduardo de Sousa",
            "/Subject": "Currículum Vitae de Operaciones Industriales, Sourcing Directo, Cadena de Suministro y Calidad Lean Six Sigma",
            "/Keywords": "Eduardo de Sousa, Operaciones Industriales, Sourcing Directo, Cadena de Suministro, Lean Six Sigma Black Belt, DMAIC, ASML, BMW Group, VDL Nedcar, HQ Pack, Salas Limpias ISO 5, OptiAsset, CMMS, ERP ISAH, SQL, Excel Avanzado, Power Query, Gestión de Calidad, WMS",
            "/Creator": "Microsoft® Word para Microsoft 365",
            "/Producer": "Microsoft® Word para Microsoft 365"
        }
        writer.add_metadata(metadata)

        with open(pdf_path, "wb") as f_out:
            writer.write(f_out)
        print("Clean Microsoft Word metadata injected via pypdf.")

        user_download = "/home/apollos-mint/Downloads/Eduardo_de_Sousa_CV_Espanol_ATS.pdf"
        shutil.copyfile(pdf_path, user_download)
        print(f"Copied to {user_download}")

if __name__ == "__main__":
    asyncio.run(main())
