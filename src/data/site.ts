export const SITE = {
  title: 'The Ātman Times',
  author: 'Swayam Sahoo',
  tagline:
    'The work of Swayam Sahoo: software engineer by day, board-game paglu by afternoon, tinkerer by night',
  description:
    'Swayam Sahoo, software engineer. Agent systems, ML pipelines and the odd small game. Open to SWE internships, Jan–Jun 2027.',
  place: 'Bhubaneswar, Odisha',
  email: 'swayam.sahoo.dev@gmail.com',
  resume: '/resume.pdf',
  availability: { what: 'a software engineering internship', when: 'Jan – Jun 2027', where: 'remote or on-site' },
} as const;

export interface Link {
  label: string;
  href: string;
}

export const SOCIALS = {
  github: { label: 'github', href: 'https://github.com/Swayam2004' },
  linkedin: { label: 'linkedin', href: 'https://www.linkedin.com/in/swayamsahoo1223' },
  lichess: { label: 'lichess', href: 'https://lichess.org/@/SwayamSahoo' },
  chesscom: { label: 'chess.com', href: 'https://www.chess.com/member/swayam1288' },
  itch: { label: 'itch.io', href: 'https://swayam2004.itch.io' },
} as const satisfies Record<string, Link>;

export const LEAD = {
  kicker: "Software Engineer · OUTR CSE '27",
  headline: 'Builds Agent Systems That Hold Up in Production',
  deck: "Agents, ML pipelines and the odd small game. Top 10 of 22,000 at Deloitte Hacksplosion. Amazon ML Summer School '26.",
  body: "Final-year CSE student at OUTR Bhubaneswar. Interned at Deloitte India on AI agent observability, summer 2026. SIH '24 finalist, one published paper on forest-fire spread. Plays chess at 1638 FIDE and types at 104 words a minute.",
} as const;

export interface Job {
  when: string;
  what: string;
}

export const EXPERIENCE: readonly Job[] = [
  { when: '2026.06–08', what: 'Deloitte India · Technology & Transformation intern' },
  { when: '2025.06–07', what: 'NTPC Kaniha · software development intern' },
  { when: '2023–2027', what: 'OUTR Bhubaneswar · B.Tech CSE · CGPA 9.55' },
];

export const TYPING_RECORD_WPM = 104;
