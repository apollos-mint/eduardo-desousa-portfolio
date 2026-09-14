# Eduardo de Sousa - Staff Operations & High-Tech Portfolio Web Application

A high-performance, multilingual personal CV and portfolio web application built with **Next.js 15+ App Router**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Three.js**, and **Framer Motion**.

---

## 🌟 Key Features

1. **6-Language Direct Subpath Internationalization**:
   - 🇪🇸 Spanish: [`/es`](http://localhost:3000/es)
   - 🇬🇧 English: [`/en`](http://localhost:3000/en)
   - 🇵🇹 Portuguese: [`/pt`](http://localhost:3000/pt)
   - 🇳🇱 Dutch: [`/nl`](http://localhost:3000/nl)
   - 🇩🇪 German: [`/de`](http://localhost:3000/de)
   - 🇫🇷 French: [`/fr`](http://localhost:3000/fr)
   - *Direct Subpath Routing*: Accessing `/es`, `/en`, `/pt`, `/nl`, `/de`, or `/fr` loads immediately without routing loops. Root `/` redirects to the detected browser language or Spanish (`/es`).

2. **Exact CV Data Extraction & Localized Content**:
   - **HQ Pack (Eindhoven)**: Process & Maintenance Technician, Deputy Lead (ASML supply chain, Zeiss, Boeing, Airbus, ERP ISAH, 150+ monthly interventions, 30% cycle time reduction, 22% recurring defect reduction, TÜV inspections).
   - **VDL Nedcar (Born)**: Quality & Process Technician (Multi-platform EV/hybrid/ICE assembly, 110-120 cars/shift OEM validation, 15% defect reduction with RCA/8D).
   - **Independent Consulting**: Global Sourcing & Factory Capability Auditing (China, India, Netherlands, Spain; supplier vetting, risk scoring, SLA contracts).
   - **Arkcohogar (Valencia)**: Inventory & Logistics Coordinator (99.5% stock accuracy).
   - **Ed's Paixão (Madeira)**: Shift Supervisor (HACCP & food safety excellence).
   - **E-Ceramic (Venezuela)**: Commercial & Technical Sales Specialist.
   - **Academic Degree & Certifications**: Licenciado en Operaciones y Procesos Gerenciales, Lean Six Sigma Black Belt, ISO 9001:2015 Lead Auditor, Google Data Analytics, VCA VOL Safety (Netherlands), LMU Munich (Supply Chain Resilience), and Erasmus University Rotterdam (Communication Science).

3. **Interactive Main Page & Dedicated Dynamic Pages**:
   - Every experience, certification, and skill is an interactive card linking to a dedicated page:
     - `/[lang]/experience/[slug]` (e.g. `/es/experience/hq-pack`, `/en/experience/vdl-nedcar`)
     - `/[lang]/skills/[slug]` (e.g. `/en/skills/lean-six-sigma-dmaic`, `/es/skills/iso-9001-compliance`)
     - `/[lang]/education/[slug]` (e.g. `/pt/education/bachelor-operations-management`)
     - `/[lang]/contact` (Direct communication hub)

4. **GPU-Accelerated 3D & Micro-Animations**:
   - **HeroScene**: Interactive Three.js particle constellation and geometric wireframe node reacting to cursor coordinates and scrolling.
   - **TopicVisualizer**: Contextual 3D environments tailored to cleanrooms (ASML nodes), automotive assembly lines, global supply chain maps, and quality shields.
   - **Interactive Contact Hub**: One-click WhatsApp message builder, instant vCard generator, and simulated executive inquiry modal with particle confetti.

---

## 🚀 Quick Start & Local Execution

### 1. Clone the repository & navigate to directory:
```bash
git clone https://github.com/apollos-mint/eduardo-desousa-portfolio.git
cd eduardo-desousa-portfolio
```

### 2. Install dependencies (already installed):
```bash
npm install
```

### 3. Start the Development Server (with Turbopack):
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build and Run Production:
```bash
npm run build
npm run start
```

---

## 📂 Project Architecture

```
eduardo-desousa-portfolio/
├── src/
│   ├── app/
│   │   ├── [lang]/
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── education/[slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── experience/[slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── skills/[slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── HeroScene.tsx
│   │   │   └── TopicVisualizer.tsx
│   │   ├── navigation/
│   │   │   ├── Footer.tsx
│   │   │   └── Header.tsx
│   │   ├── sections/
│   │   │   ├── ContactSection.tsx
│   │   │   ├── EducationCertificatesSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── SkillsMatrixSection.tsx
│   │   │   └── SpecialFeatureSection.tsx
│   │   └── ui/
│   │       └── InteractiveBackground.tsx
│   ├── data/
│   │   └── cv-data.ts
│   ├── lib/
│   │   ├── i18n.ts
│   │   └── utils.ts
│   ├── middleware.ts
│   └── types/
│       └── index.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```
