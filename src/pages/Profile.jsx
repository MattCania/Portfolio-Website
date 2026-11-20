import { useState, useEffect } from "react";
import ProfileImg from "../assets/profileImg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faGithub,
  faItchIo,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faAngleDoubleRight,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../partials/Header";
import MouseEffect from "./MouseEffect";
import SkillChart from "../components/SkillChart";
export default function ProfilePage() {
  const [isHover, setIsHover] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isInView, setIsInView] = useState({
    welcomeContent: false,
    missionContent: false,
    projectsContent: false,
    skillsContent: false,
  });

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSectionInView = (entries) => {
    entries.forEach((entry) => {
      // In view = at least half the element is visible OR the element covers at least half the viewport.
      // The first handles short elements (mission), the second handles tall ones (projects).
      const coversHalfViewport =
        entry.intersectionRect.height >= window.innerHeight * 0.5;
      setIsInView((prevState) => ({
        ...prevState,
        [entry.target.id]:
          entry.isIntersecting &&
          (entry.intersectionRatio >= 0.5 || coversHalfViewport),
      }));
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleSectionInView, {
      root: null,
      rootMargin: "0px",
      threshold: Array.from({ length: 21 }, (_, i) => i / 20),
    });

    // Only elements with an id are tracked (id is the key in isInView)
    const sections = document.querySelectorAll(".section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const skills = [
    {
      link: "https://www.instagram.com/mattcans/",
      icon: faInstagram,
    },
    {
      link: "https://www.facebook.com/Matthew.Cania24",
      icon: faFacebook,
    },
    {
      link: "https://github.com/MattCania",
      icon: faGithub,
    },
    {
      link: "https://itch.io/dashboard",
      icon: faItchIo,
    },
    {
      link: "https://www.linkedin.com/in/cania-matthew-gabriel-m-284648306/",
      icon: faLinkedin,
    },
  ];

  const navigation = [
    {
      label: "Mission",
      id: "mission",
    },
    {
      label: "Projects",
      id: "projects",
    },
    {
      label: "Skills",
      id: "skills",
    },
  ];

  const projects = [
    {
      title: "UCC",
      subtitle: "Student Attendance System",
      period: "March – August 2025",
      stack: [
        "ReactJS",
        "ExpressJS",
        "MySQL",
        "Sequelize",
        "ESP32",
        "RC522",
        "AS608",
      ],
      points: [
        "Developed a student attendance web system using RFID-based verification, enabling professors to monitor student attendance against their assigned class schedules.",
        "Built a full-stack application using ReactJS, ExpressJS, and MySQL, with Sequelize ORM for database interaction.",
        "Integrated an ESP32-based attendance device using the RC522 RFID reader and AS608 fingerprint sensor, connected to a locally hosted website for attendance verification.",
      ],
    },
    {
      title: "GoFare",
      subtitle: "Transportation Management System",
      period: "March – August 2025",
      stack: [
        "ReactJS",
        "ExpressJS",
        "Firebase",
        "C# .NET",
        "Kotlin",
        "Stripe",
        "RC522",
        "NFC",
      ],
      points: [
        "Developed a simulated transportation and fare management system featuring a kiosk-based passenger experience, RFID identification, and NFC-enabled payment capabilities.",
        "Built a C# .NET kiosk application simulating a transportation station and fare processing system, alongside a Kotlin mobile banking application integrated with the Stripe API for payments.",
        "Developed a full-stack administrative dashboard using ReactJS and ExpressJS, with Firebase as the cloud database for passenger management, RFID monitoring, and card status tracking, including registered, unregistered, banned, and lost cards.",
        "Integrated the RC522 RFID module to read RFID cards and NFC-compatible mobile devices for passenger identification and payment simulation.",
      ],
    },
    {
      title: "Nutribin",
      subtitle: "Excess Food Composting and Fertilizer Monitoring System",
      period: "December 2025 – April 2026",
      stack: ["ReactJS", "NestJS", "Flutter", "ESP32", "IoT"],
      points: [
        "Developed an IoT-based biodegradable waste management system that processes food waste through grinding, mixing, and filtration while monitoring its conversion into compost fertilizer.",
        "Built a full-stack monitoring platform using ReactJS and NestJS, allowing users to monitor their composting devices and administrators to manage and monitor deployed units.",
        "Developed a Flutter mobile application for accessible, real-time device and compost monitoring.",
        "Integrated an ESP32-based control system with servo motors, a brushless DC grinder motor, relay modules, and sensors including DHT22, NPK, load cell, soil moisture, reed switch, and ultrasonic sensors.",
        "Implemented sensor-based monitoring and hardware automation, including metal waste detection and camera-triggered AI waste identification.",
      ],
    },
    {
      title: "ARIS",
      subtitle: "Accomplishment Report and Information System",
      period: "August 2026 – Present",
      stack: [
        "ReactJS",
        "NestJS",
        "Tauri",
        "ESP32",
        "ZKTeco",
        "Google Meet",
        "AI",
      ],
      points: [
        "Developed a digitized Accomplishment Report (AR) and Daily Time Record (DTR) submission and management system, streamlining report submission, validation, rejection, resubmission, and approval while reducing manual errors and payroll-related delays.",
        "Implemented AI-assisted accomplishment report generation through Google Meet integration, automating meeting transcription and report preparation to reduce manual encoding.",
        "Developed a full-stack administrative web application using ReactJS and NestJS, supporting user management, authenticator and biometric assignment, and Accomplishment Report and DTR validation.",
        "Built a ReactJS desktop application packaged with Tauri, providing professors and staff with report submission, DTR monitoring, Google Meet integration, AI-assisted report filling, meeting verification, and authenticator-based identity verification.",
        "Integrated ESP32 devices for biometric data transmission across the local network and implemented authenticator-based verification as an additional security layer for meeting and attendance-related workflows.",
        "Integrated a ZKTeco biometric attendance device to simulate and synchronize biometric attendance data with the system.",
      ],
    },
  ];

  return (
    <section className="flex flex-col justify-start items-center w-full min-h-screen bg-zinc-950 overflow-x-hidden scroll-smooth">
      <MouseEffect
        circleCount={isMobile ? 50 : 100}
        circlePx={isMobile ? 2 : 5}
        lerp={isHover ? 0.5 : 0.75}
        isInView={isInView}
      />
      <Header
        scrollToSection={scrollToSection}
        navigation={navigation}
        isInView={isInView}
      />

      {/* WELCOME — dark */}
      <div
        id="welcome"
        className={`flex flex-col justify-center items-center h-screen w-full gap-4 flex-shrink-0 bg-zinc-950`}
      >
        <div
          id="welcomeContent"
          className={`section flex flex-col ${isInView.welcomeContent ? "opacity-100" : "opacity-0"} transition-opacity duration-1000 w-3/4 lg:w-1/3 justify-start items-start z-1`}
        >
          <h1
            className={`section text-white font-black text-xl md:text-2xl lg:text-5xl ${isInView.welcomeContent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-20px]"} text-6xl font-semibold transition-all duration-[2000ms]`}
          >
            Matthew Gabriel Cania
          </h1>
          <p
            className={`section flex justify-start items-center gap-2 w-full h-auto text-white text-md lg:text-2xl border-b-1 border-white ${isInView.welcomeContent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-20px]"} font-semibold transition-all duration-[3000ms]`}
          >
            Full Stack Devloper
            <button
              className="flex justify-center items-center w-6 h-6 cursor-pointer hover:text-teal-400 transition-all duration-300 outline-none"
              onClick={() => scrollToSection("mission")}
              onMouseOver={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </p>
          <div
            className={`section flex justify-start items-center gap-2 ${isInView.welcomeContent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-20px]"} font-semibold transition-all duration-[4000ms] p-1`}
          >
            {skills.map((item, index) => (
              <a
                key={index}
                className="flex text-center justify-center items-center text-xl lg:text-2xl text-teal-400 rounded-md p-1 hover:bg-teal-400 hover:text-zinc-950 transition-all duration-300"
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                href={item.link}
              >
                <FontAwesomeIcon icon={item.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* MISSION — light */}
      <div
        id="mission"
        className={`flex flex-col justify-center items-center min-h-screen w-full gap-4 flex-shrink-0 bg-white py-16`}
      >
        <div
          id="missionContent"
          className={`section flex flex-col justify-center items-start w-5/6 lg:w-1/2 ${isInView.missionContent ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
        >
          <h1
            className={`section ${isInView.missionContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"} text-3xl md:text-4xl lg:text-6xl font-semibold transition-all duration-[2000ms]`}
          >
            I want to create websites
          </h1>

          <h1
            className={`section ${isInView.missionContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"} text-3xl md:text-4xl lg:text-6xl font-semibold transition-all duration-[3000ms]`}
          >
            That solves
          </h1>
          <h1
            className={`section ${isInView.missionContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"} text-3xl md:text-4xl lg:text-6xl font-semibold transition-all duration-[4000ms]`}
          >
            Real world problems
          </h1>
          <button
            className={`section outline-none flex text-center justify-center items-center my-2 ${isInView.missionContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-20px]"} text-2xl md:text-3xl lg:text-4xl font-semibold rounded-xl hover:bg-zinc-950 hover:text-white cursor-pointer`}
            style={{
              transition:
                "transform 4500ms ease, opacity 4500ms ease, color 1000ms ease, background-color 1000ms ease",
              transform: isInView.missionContent
                ? "translateY(0)"
                : "translateY(-20px)",
            }}
            onClick={() => scrollToSection("projects")}
            onMouseOver={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <FontAwesomeIcon icon={faForward} />
          </button>
        </div>
      </div>

      {/* PROJECTS INDEX — dark. Rows invert on hover and jump to each project screen */}
      <div
        id="projects"
        className={`flex flex-col justify-center items-center w-full min-h-screen flex-shrink-0 bg-zinc-950 py-16`}
      >
        <div
          id="projectsContent"
          className={`section flex flex-col w-5/6 lg:w-3/4 z-1 ${isInView.projectsContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} transition-all duration-[1500ms]`}
        >
          <p className="font-mono text-teal-400 text-xs lg:text-sm tracking-widest uppercase mb-2">
            Projects · 2025 – Present
          </p>
          <h1 className="text-white font-black text-5xl md:text-7xl lg:text-8xl leading-none mb-10">
            Selected{" "}
            <span
              style={{ WebkitTextStroke: "2px #2dd4bf", color: "transparent" }}
            >
              Work
            </span>
          </h1>

          <div className="flex flex-col border-t border-zinc-700">
            {projects.map((project, index) => (
              <button
                key={index}
                className="group flex items-center gap-4 lg:gap-8 py-4 lg:py-6 px-2 border-b border-zinc-700 text-left text-white hover:bg-white hover:text-zinc-950 hover:px-6 transition-all duration-500 cursor-pointer outline-none"
                onClick={() => scrollToSection(`projectScreen${index}`)}
                onMouseOver={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <span className="font-mono text-sm text-teal-400 group-hover:text-teal-600 transition-colors duration-500">
                  0{index + 1}
                </span>
                <span className="flex-1 text-2xl md:text-3xl lg:text-5xl font-semibold">
                  {project.title}
                </span>
                <span className="hidden md:block font-mono text-xs lg:text-sm opacity-60">
                  {project.period}
                </span>
                <FontAwesomeIcon
                  className="transition-transform duration-500 group-hover:translate-x-2"
                  icon={faAngleDoubleRight}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT SCREENS — alternate light / dark (index 0 = light, 1 = dark, ...) */}
      {projects.map((project, index) => {
        const dark = index % 2 === 1;
        const visible = isInView[`project${index}`];
        const accent = dark ? "text-teal-400" : "text-teal-600";
        const chipStyle = dark
          ? "border-zinc-600 text-zinc-300 hover:bg-teal-400 hover:text-zinc-950 hover:border-teal-400"
          : "border-zinc-300 text-zinc-700 hover:bg-zinc-950 hover:text-white hover:border-zinc-950";

        return (
          <div
            key={index}
            id={`projectScreen${index}`}
            className={`relative flex justify-center items-center w-full min-h-screen flex-shrink-0 overflow-hidden py-24 ${dark ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"}`}
          >
            {/* Ghost numeral */}
            <span
              aria-hidden="true"
              className={`absolute select-none pointer-events-none font-black leading-none text-[45vw] lg:text-[30vw] bottom-0 translate-y-1/4 ${index % 2 === 0 ? "right-0" : "left-0"}`}
              style={{
                color: "transparent",
                WebkitTextStroke: `2px ${dark ? "rgba(45, 212, 191, 0.25)" : "rgba(9, 9, 11, 0.12)"}`,
              }}
            >
              0{index + 1}
            </span>

            <div
              id={`project${index}`}
              className={`section relative z-1 grid grid-cols-1 lg:grid-cols-5 items-center gap-8 lg:gap-12 w-5/6 lg:w-3/4 transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`}
            >
              <div
                className={`flex flex-col lg:col-span-2 transition-all duration-[1500ms] ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              >
                <p
                  className={`font-mono text-xs tracking-widest uppercase mb-3 ${accent}`}
                >
                  {project.period}
                </p>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-none">
                  {project.title}
                </h1>
                <h2 className="text-lg lg:text-xl italic font-medium mt-3 opacity-70">
                  {project.subtitle}
                </h2>
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`border rounded-full px-3 py-1 text-xs font-mono transition-all duration-300 ${chipStyle}`}
                      onMouseOver={() => setIsHover(true)}
                      onMouseLeave={() => setIsHover(false)}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="flex flex-col lg:col-span-3">
                {project.points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className={`flex gap-4 py-3 border-b transition-all duration-700 ${dark ? "border-zinc-800" : "border-zinc-200"} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    style={{ transitionDelay: `${300 + pointIndex * 120}ms` }}
                  >
                    <span className={`font-mono text-xs pt-1 ${accent}`}>
                      {String(pointIndex + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-sm lg:text-base font-light ${dark ? "text-zinc-300" : "text-zinc-700"}`}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-1 flex justify-center items-center w-10 h-10 rounded-full cursor-pointer outline-none transition-all duration-300 ${dark ? "hover:bg-white hover:text-zinc-950" : "hover:bg-zinc-950 hover:text-white"}`}
              onClick={() =>
                scrollToSection(
                  index < projects.length - 1
                    ? `projectScreen${index + 1}`
                    : "skills",
                )
              }
              onMouseOver={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              <FontAwesomeIcon
                className="rotate-90"
                icon={faAngleDoubleRight}
              />
            </button>
          </div>
        );
      })}

      {/* SKILLS — light */}
      <div
        id="skills"
        className={`flex flex-col justify-center items-center w-full gap-4 flex-shrink-0 bg-white p-2 lg:p-0`}
        style={{
          height: "auto",
          minHeight: "100vh",
        }}
      >
        <div
          id="skillsContent"
          className={`section flex flex-col lg:flex-row justify-center items-center gap-4 h-full w-full lg:w-3/4 z-1 ${isInView.skillsContent ? "opacity-100" : "opacity-0"} transition-opacity duration-1500`}
        >
          <div
            className={`section flex flex-col justify-center items-center w-5/6 lg:w-1/3 h-3/4 ${isInView.skillsContent ? "opacity-100" : "opacity-0"} transition-opacity duration-1500`}
          >
            <img
              className="w-1/2 md:w-1/4 lg:w-3/4 rounded-full z-1"
              draggable={false}
              src={ProfileImg}
              alt=""
            />

            <h1 className="w-full text-center items-center justify-center text-3xl font-semibold text-black z-1 my-2">
              Matthew Gabriel M Cania
            </h1>
            <h1 className="w-full text-justify items-center justify-center text-lg font-normal text-black z-1 ">
              Motivated IT student focused on full-stack development and
              database systems, seeking an internship to contribute to
              real-world software projects while further developing practical
              engineering skills.
            </h1>
          </div>

          <div
            className={`section flex flex-col justify-center items-start gap-2 h-3/4 w-full lg:w-3/4 ${isInView.skillsContent ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
          >
            <SkillChart />
          </div>
        </div>
      </div>
    </section>
  );
}
