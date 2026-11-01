import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  CircleHelp,
  Cookie,
  Database,
  Github,
  Mail,
  Menu,
  Network,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const SHOW_SELECTED_WORK = false;

const assets = Array.from({ length: 256 }, (_, index) => {
  const row = Math.floor(index / 16);
  const column = index % 16;
  const value = (row * 17 + column * 29 + row * column * 3) % 31;
  if (value < 4) return "asset-tile tile-muted";
  if (value < 7) return "asset-tile tile-warm";
  if (value > 22) return "asset-tile tile-blue";
  return "asset-tile tile-soft";
});

function formatDuration(months: number) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts = [];

  if (years > 0) parts.push(`${years} ${years === 1 ? "year" : "years"}`);
  if (remainingMonths > 0) parts.push(`${remainingMonths} ${remainingMonths === 1 ? "month" : "months"}`);

  return parts.join(", ") || "Less than a month";
}

function currentRoleDuration(startYear: number, startMonth: number) {
  const now = new Date();
  const months = (now.getFullYear() - startYear) * 12 + now.getMonth() + 1 - startMonth;
  return formatDuration(Math.max(months, 0));
}

const roles = [
  {
    id: "experience-business-development",
    value: "Generating value",
    title: "Business Development Associate",
    company: "Keller Williams Realty",
    date: "May 2022 to Apr 2023",
    duration: "11 months",
    description:
      "Worked across business development, lead generation, and digital marketing in a remote environment.",
    bullets: [
      "Managed end to end lead generation and outreach activities.",
      "Developed customer engagement and follow up workflows.",
      "Supported digital marketing initiatives and business development operations.",
    ],
    tags: ["Cost Benefit Analysis", "Lead Generation", "MarTech", "Meta Business Suite", "Storytelling with Data", "Sales"],
    icon: ArrowRight,
    color: "blue",
  },
  {
    id: "experience-project-management",
    value: "Managing value",
    title: "Project Management Assistant",
    company: "ManiBot · Horizon Europe Robotics & Computer Vision",
    date: "Oct 2023 to Sep 2024",
    duration: "11 months",
    description:
      "Supported the coordination and execution of an international research and innovation project under the EU Horizon programme.",
    bullets: [
      "Coordinated project activities, deliverables, timelines, and cross functional communication.",
      "Developed standardized project management workflows and documentation.",
      "Contributed to technical reporting and collaboration across multiple work packages.",
    ],
    tags: ["Project Management", "Technical Writing", "Risk Management", "Stakeholder Management"],
    icon: Network,
    color: "indigo",
  },
  {
    id: "experience-data-analyst",
    value: "Measuring value",
    title: "Data Analyst",
    company: "Masoutis S.A.",
    date: "Jul 2023 to Oct 2024",
    duration: "1 year, 3 months",
    description:
      "Applied data analytics and statistical methods to support business intelligence, commercial strategy, and operational decision making.",
    bullets: [
      "Developed analytical solutions and reporting workflows to transform business data into actionable insights.",
      "Applied machine learning techniques to customer segmentation, recommendation systems, and predictive modeling.",
      "Collaborated with business stakeholders to translate analytical findings into practical business improvements.",
    ],
    tags: ["Python", "QlikView", "Power BI", "Customer Segmentation", "SoA Machine Learning", "Big Data", "Churn Predictive Analytics", "Association Rule Mining"],
    icon: Database,
    color: "blue",
  },
  {
    id: "experience-user-success",
    value: "Realizing value",
    title: "Associate, User Success Engineer",
    company: "Pfizer Digital · Data and AI Platforms",
    date: "Nov 2024 to May 2026",
    duration: "1 year, 6 months",
    description:
      "Contributed to the development and operation of enterprise data science platforms, bridging software engineering, platform operations, and user enablement.",
    bullets: [
      "Built automation and self service solutions to improve platform efficiency and developer experience.",
      "Worked on AI and ML platform capabilities, integrations, and operational tooling.",
      "Collaborated with engineering teams and stakeholders to improve platform adoption and reliability.",
      "Contributed to technical hiring, knowledge sharing, and internal AI initiatives.",
    ],
    tags: ["Platform Enablement", "MLflow", "Snowflake", "Tableau", "Dataiku", "MLOps", "Support Ops Analytics", "Data Modeling", "Git"],
    icon: ShieldCheck,
    color: "teal",
  },
  {
    id: "experience-machine-learning",
    value: "Engineering value",
    title: "Senior Associate, Machine Learning Engineer",
    company: "Pfizer Digital · Data and AI Platforms",
    date: "Jun 2026 to Present",
    duration: `${currentRoleDuration(2026, 6)} so far`,
    description:
      "Working at the intersection of machine learning and platform engineering, building and evolving the infrastructure, capabilities, and engineering foundations that power enterprise AI/ML ecosystems.",
    bullets: [
      "Platform Observability: Establishing visibility into platform health, performance, utilization, and operational efficiency through monitoring, telemetry, and analytics.",
      "Platform Governance: Strengthening platform reliability, security, standardization, and resource management through scalable governance practices.",
      "Platform Enablement: Engineering reusable capabilities, integrations, and self service solutions that simplify workflows and accelerate AI/ML development and adoption.",
    ],
    tags: ["ML Platform Engineering", "FastAPI", "AWS Bedrock", "Azure OpenAI", "Dataiku SDK", "Snowflake", "Distributed Systems", "Platform Observability"],
    icon: Sparkles,
    color: "orange",
  },
];

const values = [
  {
    title: "Amor fati",
    heading: "LOVE YOUR FATE",
    description:
      "As Friedrich Nietzsche put it, love your destiny. Don't wait for favorable circumstances. Take whatever life puts in your path and turn it into something meaningful.",
    note: "Love your fate.",
    tone: "orange",
  },
  {
    title: "Fail fast, learn faster",
    heading: "MAKE THE SMALLEST USEFUL TEST",
    description:
      "Try an idea early, notice what happens, and use what you learn to make the next step better.",
    note: "Progress comes from honest iteration.",
    tone: "blue",
  },
  {
    title: "The best opportunities look like tiny cards, not open doors.",
    heading: "YOUR FORTUNE",
    description:
      "Big opportunities rarely announce themselves. They often look like the boring task nobody else picked up.",
    note: "The best opportunities look like tiny cards, not open doors.",
    tone: "orange",
  },
  {
    title: "Master the boredom of repetition",
    heading: "LET THE SMALL THINGS ADD UP",
    description:
      "Small habits, repeated with care, turn good intentions into dependable craft.",
    note: "Consistency is its own kind of magic.",
    tone: "blue",
  },
  {
    title: "Embrace the shame of feedback",
    heading: "STAY OPEN TO THE NEXT VERSION",
    description:
      "Feedback can sting. Treat it as information, not a verdict, and let the next iteration do the talking.",
    note: "Be brave enough to keep learning.",
    tone: "orange",
  },
  {
    title: "Be prepared to be lucky",
    heading: "MAKE YOURSELF READY",
    description:
      "Luck is when preparation meets opportunity. The more prepared you are, the luckier you become.",
    note: "Prepare well, then leave room for surprise.",
    tone: "blue",
  },
];

const projects = [
  {
    name: "Platform health, at a glance",
    type: "DATA PLATFORM · OBSERVABILITY",
    description:
      "A practical platform health scoring system that makes the invisible visible, helping teams find idle assets, spot risk, and focus their time where it matters.",
    metric: "7,000",
    metricLabel: "pipelines flagged for review",
    icon: Database,
  },
  {
    name: "A better way to ask for help",
    type: "GENAI · DEVELOPER EXPERIENCE",
    description:
      "A self service governance hub and onboarding assistant that gives platform users clear answers and a faster path from question to action.",
    metric: "4,000+",
    metricLabel: "platform users supported",
    icon: CircleHelp,
  },
  {
    name: "From customer signals to action",
    type: "MACHINE LEARNING · RETAIL",
    description:
      "Customer analytics and recommendation models that connect everyday shopping signals to more relevant experiences and measurable business value.",
    metric: "€1M+",
    metricLabel: "monthly portfolio revenue",
    icon: Network,
  },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Mary Kanata, home">
        <span className="brand-dot" />
        Mary Kanata
        <span className="brand-role">/ Data &amp; AI</span>
      </a>
      <button
        className="menu-toggle"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={menuOpen ? "main-nav nav-open" : "main-nav"}>
        {[
          ...(SHOW_SELECTED_WORK ? [["Work", "#work"]] : []),
          ["Experience", "#experience"],
          ["Values", "#values"],
          ["Contact", "#contact"],
        ].map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function AssetHealthCard() {
  return (
    <div className="health-card">
      <div className="card-topline">
        <div>
          <span className="eyebrow">PLATFORM PULSE</span>
          <h2>Assets, in good shape.</h2>
        </div>
        <span className="live-indicator"><i /> Live snapshot</span>
      </div>
      <div className="health-score">
        <span>Overall health</span>
        <strong>78<span>/100</span></strong>
      </div>
      <div className="asset-grid" aria-label="Platform asset health visualization">
        {assets.map((tile, index) => (
          <span className={tile} key={index} />
        ))}
      </div>
      <div className="asset-legend">
        <span><i className="legend-blue" /> Healthy</span>
        <span><i className="legend-orange" /> Needs a look</span>
        <span><i className="legend-muted" /> Retire</span>
      </div>
      <div className="health-bottom">
        <span><Database size={14} /> 256 assets sampled</span>
        <span className="trend-up">↑ 12 pts this quarter</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero section-wrap" id="home">
      <div className="hero-copy">
        <p className="hero-kicker">DATA SCIENCE PLATFORM ENGINEER <span>·</span> 3+ YEARS BUILDING</p>
        <h1>
          I make Data &amp; AI platforms <em>cheaper to run, easier to adopt,</em> and faster to deliver value.
        </h1>
        <p className="hero-description">
          I build reliable, governed, and intelligent platforms that help data science and engineering teams do their best work.
        </p>
        <div className="hero-actions">
          <a className="button button-dark" href="#contact">Start a conversation <ArrowUpRight size={15} /></a>
          {SHOW_SELECTED_WORK && <a className="text-link" href="#work">See the work <ArrowDown size={14} /></a>}
        </div>
      </div>
      <div className="hero-visual">
        <AssetHealthCard />
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, emphasis }: { eyebrow?: string; title: string; emphasis?: string }) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title} {emphasis && <em>{emphasis}</em>}</h2>
      </div>
    </div>
  );
}

function WorkSection() {
  return (
    <section className="work-section section-wrap" id="work">
      <SectionHeading title="Selected work" />
      <p className="section-intro">A few problems I’ve had the pleasure of untangling. The best solutions make complex systems feel a little more human.</p>
      <div className="project-list">
        {projects.map(({ name, type, description, metric, metricLabel, icon: Icon }) => (
          <article className="project-card" key={name}>
            <div className="project-content">
              <p className="eyebrow">{type}</p>
              <h3>{name}</h3>
              <p className="project-description">{description}</p>
              <a className="project-link" href="#contact">Talk to me about this <ArrowUpRight size={14} /></a>
            </div>
            <div className="project-outcome">
              <div className="outcome-icon"><Icon size={19} /></div>
              <strong>{metric}</strong>
              <span>{metricLabel}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ValueJourney() {
  return (
    <div className="journey-card">
      <div className="journey-head">
        <div><p className="eyebrow">THE VALUE CHAIN, FIVE STOPS</p><p className="journey-subtitle">A winding route, always moving toward impact.</p></div>
      </div>
      <div className="journey-track">
        <svg className="journey-line" viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="journeyGradient" x1="0%" x2="100%"><stop offset="0%" stopColor="#2858d8" /><stop offset="53%" stopColor="#777c84" /><stop offset="100%" stopColor="#d0713d" /></linearGradient></defs>
          <path d="M22 146 C135 146 138 54 255 54 S368 166 480 166 S609 68 728 68 S865 139 978 139" />
        </svg>
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <a className={`journey-stop stop-${index + 1}`} href={`#${role.id}`} key={role.value}>
              <span className={`stop-icon ${role.color}`}><Icon size={16} /></span>
              <span className="stop-index">{role.value}</span>
              <strong>{role.title}</strong>
              <small>{role.company.split(" · ")[0]}</small>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <section className="experience-section section-wrap" id="experience">
      <SectionHeading title="Experience" />
      <p className="section-intro">My work has taken me across the full value chain: from generating, to managing it, to engineering it into the platform.</p>
      <ValueJourney />
      <div className="role-list">
        {roles.slice().reverse().map(({ id, value, title, company, date, duration, description, bullets, tags, icon: Icon, color }, index) => (
          <article className="role-card" id={id} key={title}>
            <div className="role-main">
              <div className={`role-icon ${color}`}><Icon size={17} /></div>
              <div className="role-details">
                <div className="role-label">{value}</div>
                <h3>{title}</h3>
                <p className="role-company">{company}</p>
                <p className="role-description">{description}</p>
                {bullets && (
                  <ul className="role-bullets">
                    {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                )}
                <div className="tag-list">{tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </div>
              <div
                className="role-date"
                tabIndex={0}
                aria-describedby={`role-duration-${index}`}
                aria-label={`${date.split(" to ")[0]} to ${date.split(" to ")[1]}, ${duration} in this role`}
              >
                <span>{date.split(" to ")[0]}</span>
                <div />
                <span className="role-date-end">{date.split(" to ")[1]}</span>
                <span className="date-duration" id={`role-duration-${index}`} role="tooltip">{duration} in this role</span>
              </div>
            </div>
            <span className={`role-watermark watermark-${index}`}><Icon size={70} /></span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ValuesSection() {
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  function toggleCard(index: number) {
    setFlippedCards((current) =>
      current.includes(index)
        ? current.filter((card) => card !== index)
        : [...current, index],
    );
  }

  return (
    <section className="values-section section-wrap" id="values">
      <SectionHeading title="Values" />
      <p className="section-intro">My operating system: how I approach problems, make decisions, and own outcomes.</p>
      <div className="values-grid">
        {values.map((value, index) => {
          const isFlipped = flippedCards.includes(index);
          return (
            <button
              className={`value-card${isFlipped ? " is-flipped" : ""}`}
              key={`${value.title}-${index}`}
              type="button"
              aria-pressed={isFlipped}
              aria-label={isFlipped ? `Show front of ${value.title} card` : `Flip ${value.title} card`}
              onClick={() => toggleCard(index)}
            >
              <span className="value-card-inner">
                <span className={`value-face value-front ${value.tone}`} aria-hidden={isFlipped}>
                  <span className="value-number">0{index + 1}</span>
                  <Cookie className="value-cookie" size={27} strokeWidth={1.5} />
                  <span className="value-title">{value.title}</span>
                </span>
                <span className="value-face value-back" aria-hidden={!isFlipped}>
                  <Cookie className="value-back-cookie" size={32} strokeWidth={1.5} />
                  <span className="fortune-slip">
                    <span className="fortune-label">{value.heading}</span>
                    <span className="fortune-copy">{value.description}</span>
                  </span>
                  <span className="fortune-note">{value.note}</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function ContactSection() {
  const headingFirstLine = "Have a tiny card";
  const headingSecondLine = "worth picking up?";
  const [typedCharacters, setTypedCharacters] = useState(0);
  const headingLength = headingFirstLine.length + headingSecondLine.length;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setTypedCharacters(headingLength);
      return;
    }

    const interval = window.setInterval(() => {
      setTypedCharacters((current) => {
        if (current >= headingLength) {
          window.clearInterval(interval);
          return current;
        }
        return current + 1;
      });
    }, 65);

    return () => window.clearInterval(interval);
  }, [headingLength]);

  return (
    <section className="contact-section section-wrap" id="contact">
      <div className="contact-copy">
        <h2 aria-label={`${headingFirstLine} ${headingSecondLine}`}>
          <span aria-hidden="true">
            {headingFirstLine.slice(0, Math.min(typedCharacters, headingFirstLine.length))}
            {typedCharacters < headingFirstLine.length && <span className="typing-caret" />}
          </span>
          <br />
          <em aria-hidden="true">
            {headingSecondLine.slice(0, Math.max(0, typedCharacters - headingFirstLine.length))}
            {typedCharacters >= headingFirstLine.length && typedCharacters < headingLength && <span className="typing-caret" />}
          </em>
        </h2>
        <p>I enjoy talking about data science platforms, MLOps, and the engineering behind AI products. If you're working on something interesting or just want to exchange ideas, feel free to reach out.</p>
      </div>
      <div className="contact-card">
        <div className="contact-card-head"><div><strong>Mary Kanata</strong><span>Data Science Platform Engineer</span></div></div>
        <a className="email-row" href="mailto:mariaakanata@gmail.com"><span className="email-icon"><Mail size={15} /></span><span><small>EMAIL</small>mariaakanata@gmail.com</span><ArrowUpRight size={15} /></a>
        <a className="email-row" href="https://www.linkedin.com/in/mary-kanata/" target="_blank" rel="noreferrer"><span className="email-icon linkedin-icon">in</span><span><small>LINKEDIN</small>Connect on LinkedIn</span><ArrowUpRight size={15} /></a>
        <a className="email-row" href="https://github.com/maryKanata" target="_blank" rel="noreferrer"><span className="email-icon"><Github size={15} /></span><span><small>GITHUB</small>Browse the code</span><ArrowUpRight size={15} /></a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <a className="footer-brand" href="#home"><span className="brand-dot" /> Mary Kanata</a>
      <span>© {new Date().getFullYear()} Mary Kanata · Data &amp; AI Platform Engineer</span>
      <a href="#home">Back to the top <ChevronRight size={13} /></a>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {SHOW_SELECTED_WORK && <WorkSection />}
        <ExperienceSection />
        <ValuesSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
