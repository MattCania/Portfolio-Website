import { useEffect, useRef, useState } from "react";

const skills = [
  {
    category: "Frontend",
    color: "#7F77DD",
    bg: "#EEEDFE",
    textColor: "#3C3489",
    items: [
      {
        name: "Full-Stack Development",
        tags: ["React", "Next.js", "Svelte", "Express", "NestJS"],
      },
      {
        name: "Frontend Development",
        tags: ["HTML", "CSS", "Modern JS Frameworks"],
      },
    ],
  },
  {
    category: "Backend & APIs",
    color: "#378ADD",
    bg: "#E6F1FB",
    textColor: "#0C447C",
    items: [
      {
        name: "Backend Development",
        tags: ["REST APIs", "Express", "Fastify"],
      },
      {
        name: "API Integration",
        tags: ["REST", "Third-party APIs"],
      },
    ],
  },
  {
    category: "Data & Databases",
    color: "#D85A30",
    bg: "#FAECE7",
    textColor: "#712B13",
    items: [
      {
        name: "Database Management",
        tags: ["Supabase", "Firebase", "MySQL", "PostgreSQL"],
      },
      {
        name: "Data & Spreadsheets",
        tags: ["Excel", "Office Suite"],
      },
    ],
  },
  {
    category: "Languages",
    color: "#D4537E",
    bg: "#FBEAF0",
    textColor: "#72243E",
    items: [
      {
        name: "Programming Languages",
        tags: ["JavaScript", "Kotlin", "Flutter", "Rust", "Go"],
      },
      {
        name: "OOP",
        tags: ["OOP Principles", "Design Patterns"],
      },
    ],
  },
  {
    category: "Networking",
    color: "#888780",
    bg: "#F1EFE8",
    textColor: "#444441",
    items: [
      {
        name: "Computer Networking",
        tags: ["TCP/IP", "HTTP/S", "DNS"],
      },
    ],
  },
  {
    category: "Soft Skills",
    color: "#1D9E75",
    bg: "#E1F5EE",
    textColor: "#085041",
    items: [
      {
        name: "Problem-Solving",
        tags: ["Critical Thinking", "Debugging", "System Design"],
      },
    ],
  },
];

function CategoryGroup({ group, index, animate }) {
  return (
    <div
      className="skill-wrap"
      style={{
        opacity: animate ? 1 : 0,
        transform: animate ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div
        className="skill-tile"
        style={{
          "--accent": group.color,
          "--accent-bg": group.bg,
          "--accent-text": group.textColor,
        }}
      >
        <span className="skill-ghost" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="skill-content">
          <p className="skill-index">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="skill-title">{group.category}</h3>

          <div className="skill-items">
            {group.items.map((skill) => (
              <div key={skill.name} className="skill-item">
                <p className="skill-name">
                  <span className="skill-dot" />
                  {skill.name}
                </p>
                <div className="skill-tags">
                  {skill.tags.map((tag) => (
                    <span key={tag} className="skill-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SkillChart() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimate(true), 100);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "100%",
      }}
    >
      <style>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
          width: 100%;
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: minmax(0, 1fr); }
        }

        .skills-eyebrow {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 12px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0d9488;
          margin: 0;
        }
        .skills-heading {
          font-size: clamp(2.25rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1;
          color: #09090b;
          margin: 4px 0 0;
        }
        .skills-heading span {
          color: transparent;
          -webkit-text-stroke: 2px #0d9488;
        }

        .skill-wrap {
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .skill-tile {
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          height: 100%;
          padding: 20px;
          background: #fff;
          color: #09090b;
          border: 1.5px solid #09090b;
          border-radius: 6px;
          cursor: default;
          transition: background-color 0.5s ease, color 0.5s ease;
        }
        .skill-tile::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          width: 28%;
          background: var(--accent);
          transition: width 0.6s ease;
        }
        .skill-tile:hover {
          background: #09090b;
          color: #fff;
        }
        .skill-tile:hover::before {
          width: 100%;
        }

        .skill-ghost {
          position: absolute;
          right: 8px;
          bottom: -28px;
          font-size: 120px;
          font-weight: 900;
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(9, 9, 11, 0.08);
          pointer-events: none;
          user-select: none;
          transition: -webkit-text-stroke-color 0.5s ease;
        }
        .skill-tile:hover .skill-ghost {
          -webkit-text-stroke-color: var(--accent);
        }

        .skill-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .skill-index {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          color: var(--accent);
          margin: 0;
        }
        .skill-title {
          font-size: 22px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          margin: 0 0 8px;
        }

        .skill-items {
          display: flex;
          flex-direction: column;
        }
        .skill-item {
          padding: 12px 0;
          border-top: 1px dashed rgba(9, 9, 11, 0.2);
          transition: border-color 0.5s ease;
        }
        .skill-tile:hover .skill-item {
          border-top-color: rgba(255, 255, 255, 0.2);
        }

        .skill-name {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 8px;
        }
        .skill-dot {
          width: 7px;
          height: 7px;
          background: var(--accent);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        .skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .skill-tag {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          padding: 3px 9px;
          border-radius: 999px;
          border: 1px solid transparent;
          background: var(--accent-bg);
          color: var(--accent-text);
          transition: all 0.3s ease;
        }
        .skill-tile:hover .skill-tag {
          background: transparent;
          color: #e4e4e7;
          border-color: #3f3f46;
        }
        .skill-tile:hover .skill-tag:hover {
          background: var(--accent);
          color: #09090b;
          border-color: var(--accent);
        }
      `}</style>

      <div>
        <p className="skills-eyebrow">Skills · Toolkit</p>
        <h1 className="skills-heading">
          Tools of the <span>Trade</span>
        </h1>
      </div>

      <div className="skills-grid">
        {skills.map((group, index) => (
          <CategoryGroup
            key={group.category}
            group={group}
            index={index}
            animate={animate}
          />
        ))}
      </div>
    </div>
  );
}
