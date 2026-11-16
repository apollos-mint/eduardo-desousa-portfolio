# -*- coding: utf-8 -*-
import os
import shutil
import asyncio
import subprocess
from playwright.async_api import async_playwright
from pypdf import PdfReader, PdfWriter

HTML_CONTENT = """<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Eduardo de Sousa - Currículum Vitae | Programador de Datos (Python, PostgreSQL, ETL, Power BI)</title>
    
    <meta name="author" content="Eduardo de Sousa">
    <meta name="description" content="Currículum Vitae de Eduardo de Sousa: Programador de Datos especializado en Python (pandas), PostgreSQL, procesos ETL/ELT, modelado de datos y Power BI.">
    <meta name="keywords" content="Eduardo de Sousa, Programador de Datos, Python, pandas, PostgreSQL, SQL, ETL, ELT, Power BI, DAX, Data Warehousing, OptiAsset, CMMS, Procedimientos Almacenados, Triggers, Google Data Analytics">
    <meta name="robots" content="index, follow">
    
    <meta property="og:title" content="Eduardo de Sousa - Currículum Vitae | Programador de Datos (Python, PostgreSQL, ETL, Power BI)">
    <meta property="og:description" content="Programación de Datos, Python (pandas), PostgreSQL, Procesos ETL/ELT, Power BI y Google Data Analytics.">
    <meta property="og:type" content="profile">
    
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Eduardo de Sousa",
      "jobTitle": "Programador de Datos y Especialista en Automatización ETL",
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
          "name": "Google Data Analytics Professional Certificate",
          "recognizedBy": {
            "@type": "Organization",
            "name": "Google Career Certificates"
          }
        },
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
        }
      ],
      "knowsAbout": [
        "Python",
        "pandas",
        "PostgreSQL",
        "SQL avanzado",
        "Procesos ETL / ELT",
        "Power BI",
        "DAX",
        "Data Warehousing",
        "Modelado de datos",
        "Procedimientos almacenados y triggers",
        "OptiAsset CMMS",
        "Lean Six Sigma"
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
                            Programador de Datos & Automatización ETL | Python, PostgreSQL & Power BI | Transformación y Excelencia Operativa (Ex-ASML y BMW Group)
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
                    <span>Programación de Datos · Procesos ETL · Arquitectura PostgreSQL</span>
                </div>
                <p class="text-[11.5px] text-slate-700 leading-relaxed text-justify">
                    Profesional con más de <strong>11 años de trayectoria profesional acumulada</strong> combinando el <strong>desarrollo de soluciones de datos, automatización ETL/ELT y optimización de bases de datos relacionales</strong> con una sólida experiencia en entornos técnicos e industriales de alta exigencia. Especialista en programación con <strong>Python (especialmente pandas)</strong>, diseño y optimización de consultas complejas en <strong>PostgreSQL (relaciones entre tablas, índices, procedimientos almacenados y triggers)</strong> y construcción de cuadros de mando e informes en <strong>Power BI</strong>. Desarrollador de la arquitectura del software de gestión operativa y mantenimiento <strong>OptiAsset CMMS</strong> (integración PostgreSQL/Next.js y pipelines de ingesta ETL). Cuenta con <strong>~4 años de especialización técnica en plantas de alta exigencia industrial europea</strong>: litografía de semiconductores para ASML/Zeiss en <strong>Sala Limpia ISO Clase 5</strong> (HQ Pack) y control de calidad en línea continua de <strong>automoción OEM para BMW Group / MINI Cooper</strong> (VDL Nedcar). Certificado <strong>Google Data Analytics Professional</strong> (SQL avanzado y visualización) y <strong>Lean Six Sigma Black Belt (DMAIC)</strong>. Trilingüe: <strong>Español (Nativo)</strong>, <strong>Inglés (C1)</strong> y <strong>Portugués (C1)</strong>.
                </p>
            </section>

            <!-- COMPETENCIAS CLAVE Y METODOLOGÍAS -->
            <section>
                <div class="section-title">
                    <h2>Competencias Clave y Metodologías Técnicas</h2>
                    <span>Datos · ETL / ELT · PostgreSQL · Power BI · Calidad</span>
                </div>
                <div class="space-y-1.5 text-[11px] leading-snug">
                    <div class="border-l-2 border-sky-700 pl-2.5 py-0.5">
                        <span class="font-bold text-sky-950 text-[11px]">Programación de Datos, PostgreSQL y Procesos ETL/ELT:</span>
                        <span class="text-slate-700">Python (tratamiento y análisis de datos con <strong>pandas</strong>), <strong>PostgreSQL</strong> (consultas SQL complejas, JOINs, subconsultas, optimización de rendimiento, diseño de índices, procedimientos almacenados, funciones y triggers), desarrollo de <strong>procesos ETL/ELT</strong> (extracción, transformación, integración y carga de datos), conceptos de <strong>Data Warehousing</strong> y modelado de datos relacionales.</span>
                    </div>
                    <div class="border-l-2 border-sky-700 pl-2.5 py-0.5">
                        <span class="font-bold text-sky-950 text-[11px]">Visualización, Analítica y Ofimática Avanzada:</span>
                        <span class="text-slate-700"><strong>Microsoft Power BI</strong> (modelado de datos, DAX, diseño de cuadros de mando interactivos e informes para toma de decisiones), <strong>Google Data Analytics</strong> (análisis estadístico con SQL), <strong>Microsoft Excel Avanzado</strong> (Power Query, modelado y tablas dinámicas), Paquete Office 365, automatización de flujos con iPaaS (Make, Zapier, Webhooks).</span>
                    </div>
                    <div class="border-l-2 border-sky-700 pl-2.5 py-0.5">
                        <span class="font-bold text-sky-950 text-[11px]">Calidad del Dato y Rigor Metodológico (Shop-Floor & Lean):</span>
                        <span class="text-slate-700">Lean Six Sigma Black Belt (DMAIC), Control Estadístico de Procesos (SPC, Cp/Cpk), Análisis de Causa Raíz (RCA, 8D, Ishikawa), AMFE / PFMEA, estandarización de procesos (SOP), resolución autónoma de problemas de rendimiento y calidad de la información.</span>
                    </div>
                </div>
            </section>

            <!-- EXPERIENCIA PROFESIONAL (PUESTO ACTUAL) -->
            <section>
                <div class="section-title">
                    <h2>Experiencia Profesional</h2>
                    <span>Programación de Datos · Arquitectura PostgreSQL · Soluciones Operativas</span>
                </div>

                <!-- PUESTO 1 -->
                <div>
                    <div class="flex justify-between items-baseline mb-0.5">
                        <div>
                            <span class="text-[13px] font-black text-sky-950 tracking-tight">SECTOR MATERIALES DE CONSTRUCCIÓN E INDUSTRIAL</span>
                            <h3 class="text-[11.5px] font-bold text-slate-800">
                                Consultor de Operaciones & Especialista en Soluciones de Datos (Contratos Remotos)
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
                            <p><strong>Desarrollo de Software CMMS OptiAsset, Arquitectura PostgreSQL y Procesos ETL:</strong> Diseño y desarrollo de la capa de datos en <strong>PostgreSQL</strong>, optimizando consultas complejas y estructuras relacionales; construcción de <strong>procesos ETL/ELT</strong> para extracción, transformación y carga de métricas de telemetría de activos; scripts en <strong>Python (pandas)</strong> para tratamiento de datos y dashboards de rendimiento en <strong>Power BI</strong>.</p>
                        </div>
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
                            <p><strong>Estructuración Contractual Internacional por Hitos (30/70):</strong> Negociación y formalización de contratos de compraventa internacional vinculando las condiciones de pago a hitos de verificación (30% anticipo proforma / 70% contra informe favorable de inspección PSI y entrega de Conocimiento de Embarque B/L original).</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- PIE DE PÁGINA 1 -->
        <footer class="pt-1.5 border-t border-slate-200 flex justify-between items-center text-[9.5px] text-slate-500 font-medium">
            <span>Eduardo de Sousa · Currículum Vitae (Programación de Datos, PostgreSQL, ETL y Soluciones Operativas)</span>
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
            <span>Eduardo de Sousa · Currículum Vitae (Programación de Datos, PostgreSQL, ETL y Soluciones Operativas)</span>
            <span>Página 2 de 3</span>
        </footer>
    </div>

    <!-- ==================== PÁGINA 3 ==================== -->
    <div class="page">
        <div>
            <!-- SISTEMAS Y TECNOLOGÍA DE DATOS -->
            <section>
                <div class="section-title mt-0">
                    <h2>Ecosistema Tecnológico de Datos y Digitalización Operativa</h2>
                    <span>PostgreSQL · Python (pandas) · Procesos ETL/ELT · Power BI</span>
                </div>
                <div class="space-y-1.5 pt-1 text-[11.5px] leading-relaxed">
                    <div class="bg-slate-50 border border-slate-200 rounded p-2.5">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <span class="font-bold text-sky-950 text-[12px]">Arquitectura de Bases de Datos Relacionales (PostgreSQL)</span>
                            <span class="text-[9.5px] font-semibold text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">PostgreSQL · SQL Avanzado</span>
                        </div>
                        <p class="text-slate-700 text-[11px] leading-relaxed">
                            Diseño, modelado y optimización de bases de datos relacionales en <strong>PostgreSQL</strong> para la plataforma <strong>OptiAsset CMMS</strong>. Diseño de esquemas relacionales, normalización, optimización de consultas complejas (JOINs, subconsultas, agregaciones), creación y mantenimiento de <strong>índices</strong>, <strong>procedimientos almacenados, funciones y triggers</strong> para garantizar la integridad y el alto rendimiento transaccional.
                        </p>
                    </div>
                    <div class="bg-slate-50 border border-slate-200 rounded p-2.5">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <span class="font-bold text-sky-950 text-[12px]">Tratamiento de Datos con Python (pandas) y Procesos ETL/ELT</span>
                            <span class="text-[9.5px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">Python · pandas · ETL</span>
                        </div>
                        <p class="text-slate-700 text-[11px] leading-relaxed">
                            Desarrollo y mantenimiento de <strong>procesos ETL/ELT</strong> para extracción, transformación, integración y carga de datos desde diversas fuentes operativas. Automatización y tratamiento de estructuras de información mediante <strong>Python (especialmente utilizando la librería pandas)</strong>, garantizando la calidad, limpieza y consistencia del dato para análisis e informes técnicos.
                        </p>
                    </div>
                    <div class="bg-slate-50 border border-slate-200 rounded p-2.5">
                        <div class="flex justify-between items-baseline mb-0.5">
                            <span class="font-bold text-sky-950 text-[12px]">Business Intelligence y Cuadros de Mando en Microsoft Power BI</span>
                            <span class="text-[9.5px] font-semibold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded">Power BI · DAX · Dashboards</span>
                        </div>
                        <p class="text-slate-700 text-[11px] leading-relaxed">
                            Diseño, modelado e implantación de cuadros de mando e informes interactivos en <strong>Power BI</strong>. Creación de métricas e indicadores calculados mediante <strong>DAX</strong> y <strong>Power Query</strong>; integración de datos procedentes de almacenes relacionales (Data Warehousing) para la obtención de KPIs operativos y soporte en la toma de decisiones informadas.
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
                        Educación Superior Universitaria Oficial · Dirección Estratégica de Operaciones, Planificación Agregada, Modelado de la Cadena de Suministro, Investigación Operativa, Gestión de Calidad Total (TQM) e Ingeniería de Procesos.
                    </p>
                </div>

                <div class="text-[11px] text-slate-700 p-2 bg-slate-50 border border-slate-200 rounded flex items-center justify-between">
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
                    <!-- GOOGLE DATA -->
                    <div class="border border-slate-200 rounded p-2.5 bg-slate-50 flex flex-col justify-between">
                        <div>
                            <strong class="text-sky-950 text-[12px] block">Google Data Analytics Professional</strong>
                            <span class="text-[10.5px] text-slate-500 font-semibold block mt-0.5">Google Career Certificates</span>
                            <p class="text-[10.5px] text-slate-700 mt-1.5 leading-normal">
                                Consultas SQL avanzadas, análisis estadístico de procesos, cuadros de mando y dashboards de KPI para decisiones basadas en datos.
                            </p>
                        </div>
                        <a href="https://www.credly.com/badges/4c25cd0a-54e7-4143-8f91-13a516cda19e/public_url" target="_blank" class="text-[10.5px] text-sky-800 font-bold underline mt-2 inline-flex items-center gap-1 hover:text-sky-950">
                            Insignia Credly Verificada ↗
                        </a>
                    </div>

                    <!-- SIX SIGMA -->
                    <div class="border border-slate-200 rounded p-2.5 bg-slate-50 flex flex-col justify-between">
                        <div>
                            <strong class="text-sky-950 text-[12px] block">Lean Six Sigma Black Belt (DMAIC)</strong>
                            <span class="text-[10.5px] text-slate-500 font-semibold block mt-0.5">Six Sigma Academy Amsterdam</span>
                            <p class="text-[10.5px] text-slate-700 mt-1.5 leading-normal">
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
                            <p class="text-[10.5px] text-slate-700 mt-1.5 leading-normal">
                                Optimización de redes de suministro en tiempos turbulentos, resiliencia operativa, gestión de riesgos y optimización del TCO.
                            </p>
                        </div>
                        <a href="https://coursera.org/share/c150410676184580ff99ca41a2453732" target="_blank" class="text-[10.5px] text-sky-800 font-bold underline mt-2 inline-flex items-center gap-1 hover:text-sky-950">
                            Certificado TUM Verificado ↗
                        </a>
                    </div>
                </div>
            </section>

            <!-- MARCO LEGAL Y DISPONIBILIDAD -->
            <section class="mt-1">
                <div class="section-title">
                    <h2>Idiomas y Marco Profesional</h2>
                    <span>Comunicación Global y Estatus Legal UE</span>
                </div>
                <div class="grid grid-cols-2 gap-6 text-[11px] text-slate-700 pt-1">
                    <div class="border-l-3 border-sky-700 pl-3.5 py-1.5 bg-slate-50 rounded-r border border-l-0 border-slate-200">
                        <span class="font-bold text-sky-950 block text-[12px] mb-1">Fluidez Lingüística Internacional:</span>
                        <div class="space-y-1 text-slate-700 text-[11px]">
                            <div><strong class="text-slate-900">Español:</strong> Nativo (Lengua materna, redacción técnica y documentación)</div>
                            <div><strong class="text-slate-900">Inglés:</strong> C1 (Competencia Profesional Completa — Entornos técnicos internacionales)</div>
                            <div><strong class="text-slate-900">Portugués:</strong> C1 (Competencia Profesional Completa — Fluidez operativa)</div>
                        </div>
                    </div>
                    <div class="border-l-3 border-slate-500 pl-3.5 py-1.5 bg-slate-50 rounded-r border border-l-0 border-slate-200">
                        <span class="font-bold text-sky-950 block text-[12px] mb-1">Marco Legal y Disponibilidad:</span>
                        <div class="space-y-1 text-slate-700 text-[11px]">
                            <div><strong class="text-slate-900">Ciudadanía:</strong> Unión Europea (DNI en vigor, plena libertad laboral en España)</div>
                            <div><strong class="text-slate-900">Ubicación:</strong> Valencia, España (Residencia permanente, teletrabajo 100%)</div>
                            <div><strong class="text-slate-900">Incorporación:</strong> Inmediata · Seguridad Social española activa</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- PIE DE PÁGINA 3 -->
        <footer class="pt-1.5 border-t border-slate-200 flex justify-between items-center text-[9.5px] text-slate-500 font-medium">
            <span>Eduardo de Sousa · Currículum Vitae (Programación de Datos, PostgreSQL, ETL y Soluciones Operativas)</span>
            <span>Página 3 de 3</span>
        </footer>
    </div>

</body>
</html>
"""

async def main():
    html_path = "resume_eduardo_de_sousa_datos_ats.html"
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(HTML_CONTENT)
    print("HTML saved successfully.")

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        cwd = os.getcwd()
        html_url = f"file://{os.path.join(cwd, html_path)}"
        await page.goto(html_url, wait_until="networkidle")

        pdf_path = "public/Eduardo_de_Sousa_CV_Datos_ATS.pdf"
        await page.pdf(
            path=pdf_path,
            format="A4",
            print_background=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
        )
        await browser.close()
        print(f"Raw PDF generated at {pdf_path}")

        # Limpieza forense de metadatos mediante pypdf
        reader = PdfReader(pdf_path)
        writer = PdfWriter()
        for p in reader.pages:
            writer.add_page(p)

        metadata = {
            "/Title": "Eduardo de Sousa - Currículum Vitae | Programador de Datos (Python, PostgreSQL, ETL, Power BI)",
            "/Author": "Eduardo de Sousa",
            "/Subject": "Currículum Vitae de Programación de Datos, Python (pandas), PostgreSQL, Procesos ETL/ELT y Power BI",
            "/Keywords": "Eduardo de Sousa, Programador de Datos, Python, pandas, PostgreSQL, SQL, ETL, ELT, Power BI, DAX, Data Warehousing, OptiAsset, CMMS, Modelado de Datos, Procedimientos Almacenados, Triggers, Google Data Analytics, Administración Pública, Teletrabajo España",
            "/Creator": "Microsoft® Word para Microsoft 365",
            "/Producer": "Microsoft® Word para Microsoft 365"
        }
        writer.add_metadata(metadata)

        with open(pdf_path, "wb") as f_out:
            writer.write(f_out)
        print("Clean Microsoft Word metadata injected via pypdf.")

        user_download = "/home/apollos-mint/Downloads/Eduardo_de_Sousa_CV_Datos_ATS.pdf"
        shutil.copyfile(pdf_path, user_download)
        print(f"Copied to {user_download}")

if __name__ == "__main__":
    asyncio.run(main())
