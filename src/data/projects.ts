export interface Project {
  id: string;
  kicker: string;
  headline: string;
  name: string;
  summary: string;
  meta: string;
  link?: { label: string; href: string };
  stack: readonly string[];
  /** shown on the home page */
  featured: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    id: 'tars',
    kicker: 'Agents',
    name: 'TARS',
    headline: 'TARS turns paperwork into runbooks',
    summary:
      'Three agents read PDFs, docs and emails and write executable IT runbooks, with approval, dry-run and rollback.',
    meta: 'top 10 / 22k at Hacksplosion',
    link: { label: 'live', href: 'https://tars-seven-alpha.vercel.app' },
    stack: ['python', 'langgraph', 'fastapi', 'react'],
    featured: true,
  },
  {
    id: 'agent-observability',
    kicker: 'Production',
    name: 'Agent Observability',
    headline: 'Watching the agents, at Deloitte',
    summary:
      'Tracing, LLM-as-judge evals, an annotation queue and alerting. A parallel team was moved onto the project.',
    meta: 'internal',
    stack: ['langfuse', 'langgraph', 'postgres', 'docker'],
    featured: true,
  },
  {
    id: 'forest-fire',
    kicker: 'Science',
    name: 'Forest Fire Spread',
    headline: 'Forecasting where the fire goes next',
    summary:
      'ResUNet-A plus cellular automata for next-day risk maps at 30 m. 6 GB of imagery a day down to 220 MB. Published in MDPI Engineering Proceedings.',
    meta: 'ISRO BAH 2025',
    link: { label: 'published', href: 'https://www.mdpi.com/2673-4591/124/1/120' },
    stack: ['tensorflow', 'earth engine', 'flask'],
    featured: true,
  },
  {
    id: 'sketch2shape',
    kicker: 'Hackathon',
    name: 'Sketch2Shape',
    headline: 'Sketch to 3D mesh in a day',
    summary: 'ControlNet, rembg and TripoSR chained into one pipeline in 24 hours at TechZephyr, IIT Bhubaneswar.',
    meta: '24 h build',
    link: { label: 'repo', href: 'https://github.com/Swayam2004/sketch2shape-techzephyr' },
    stack: ['pytorch', 'controlnet', 'triposr'],
    featured: true,
  },
  {
    id: 'opd-saathi',
    kicker: 'Health',
    name: 'OPD Saathi',
    headline: 'A hospital queue that speaks Hindi',
    summary: 'OPD queueing and wayfinding for hospital outpatients, in Hindi and English.',
    meta: 'hackathon',
    link: { label: 'repo', href: 'https://github.com/Swayam2004/opd-saathi' },
    stack: ['react', 'node'],
    featured: false,
  },
  {
    id: 'sentinel',
    kicker: 'Agents',
    name: 'Sentinel',
    headline: 'Incident response with a human in the loop',
    summary: 'AI incident response with retrieval, a safety gate before actions, and human approval.',
    meta: 'hackathon',
    link: { label: 'repo', href: 'https://github.com/Swayam2004/sentinel-incident-response' },
    stack: ['mastra', 'qdrant', 'typescript'],
    featured: false,
  },
  {
    id: 'airalert',
    kicker: 'Data',
    name: 'AirAlert',
    headline: 'Air-quality alerts',
    summary: 'Air-quality monitoring with alerts when readings cross safe limits.',
    meta: 'side project',
    link: { label: 'repo', href: 'https://github.com/Swayam2004/AirAlert' },
    stack: ['python'],
    featured: false,
  },
  {
    id: 'research-scrapper',
    kicker: 'Tools',
    name: 'Research-Scrapper',
    headline: 'Collecting papers so nobody has to',
    summary: 'Scrapes and organises research papers and metadata for literature reviews.',
    meta: 'tool',
    link: { label: 'repo', href: 'https://github.com/Swayam2004/Research-Scrapper' },
    stack: ['python'],
    featured: false,
  },
  {
    id: 'agrotech',
    kicker: 'Hardware',
    name: 'AgroTech',
    headline: 'Sensors in the field',
    summary: 'Farm monitoring project: sensors, firmware and a dashboard.',
    meta: 'project',
    link: { label: 'repo', href: 'https://github.com/Swayam2004/AgroTech-All-Project-Files' },
    stack: ['iot', 'python'],
    featured: false,
  },
  {
    id: 'orel',
    kicker: 'Hardware',
    name: 'OREL drone',
    headline: 'Second place at Smart India Hackathon',
    summary: 'Drone build for SIH 2024 (hardware edition), placed 2nd.',
    meta: 'SIH 2024 · 2nd',
    stack: ['hardware'],
    featured: false,
  },
  {
    id: 'hackfest',
    kicker: 'Web',
    name: 'HackFest 1.0',
    headline: 'The site for a college hackathon',
    summary: 'Event website for HackFest 1.0.',
    meta: 'live',
    link: { label: 'live', href: 'https://hackfest-10-iota.vercel.app' },
    stack: ['react'],
    featured: false,
  },
];

export interface GameProject {
  name: string;
  note: string;
  href?: string;
}

export const GAMES: readonly GameProject[] = [
  { name: 'Game jams', note: 'GMTK, Brackeys and Kenney jams in Unity, 2023', href: 'https://swayam2004.itch.io' },
  { name: 'Zephyr-Quest', note: 'Small Unity adventure' },
  { name: 'Demolition Tycoon', note: 'Roblox tycoon, in progress' },
];
