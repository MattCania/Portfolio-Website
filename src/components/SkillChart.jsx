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
        level: 95,
        tags: ["React", "Next.js", "Svelte", "Express", "NestJS"],
      },
      {
        name: "Frontend Development",
        level: 90,
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
        level: 85,
        tags: ["REST APIs", "Express", "Fastify"],
      },
      {
        name: "API Integration",
        level: 88,
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
        level: 82,
        tags: ["Supabase", "Firebase", "MySQL", "PostgreSQL"],
      },
      {
        name: "Data & Spreadsheets",
        level: 78,
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
        level: 85,
        tags: ["JavaScript", "Kotlin", "Flutter", "Rust", "Go"],
      },
      {
        name: "OOP",
        level: 87,
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
        level: 75,
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
        level: 92,
        tags: ["Critical Thinking", "Debugging", "System Design"],
      },
    ],
  },
];

function SkillCard({ name, level, tags, color, bg, textColor }) {
  return (
    <div
      style={{
        background: "white",
        border: "0.5px solid rgba(0,0,0,0.08)",
        borderRadius: "12px",
        padding: "14px 16px",
        transition: "border-color 0.2s, box-shadow 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,0,0,0.18)";
        e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#111" }}>
          {name}
        </span>
      </div>

      {/* Progress bar div removed */}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: "10px",
              padding: "2px 7px",
              borderRadius: "999px",
              background: bg,
              color: textColor,
              fontWeight: 500,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CategoryGroup({ group, animate }) {
  return (
    <div
      style={{
		background: "rgba(250, 250, 250, 0.25)",
        border: "0.5px solid rgba(0,0,0,0.06)",
        borderRadius: "16px",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <p
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          color: group.color,
          margin: 0,
        }}
      >
        {group.category}
      </p>
      {group.items.map((skill) => (
        <SkillCard
          key={skill.name}
          {...skill}
          color={group.color}
          bg={group.bg}
          textColor={group.textColor}
          animate={animate}
        />
      ))}
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
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="skills-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "12px",
        width: "100%",
      }}
    >
      <style>{`
        @media (max-width: 1024px) {
          .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 560px) {
          .skills-grid { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
        }
      `}</style>
      {skills.map((group) => (
        <CategoryGroup key={group.category} group={group} animate={animate} />
      ))}
    </div>
  );
}